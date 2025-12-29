/**
 * Neko.js - A JavaScript implementation of the classic Neko desktop pet
 *
 * Based on Neko98 by David Harvey (1998)
 * Original Neko by Masayuki Koba
 *
 * This JavaScript implementation created by AI (Claude) from the original C++ source
 * Licensed under GPL v3 (see LICENSE.md)
 */

(function() {
    'use strict';

    // Animation states (matching original Neko.h enum)
    const NekoState = {
        STOP: 0,
        WASH: 1,
        SCRATCH: 2,
        YAWN: 3,
        SLEEP: 4,
        AWAKE: 5,
        U_MOVE: 6,      // Up
        D_MOVE: 7,      // Down
        L_MOVE: 8,      // Left
        R_MOVE: 9,      // Right
        UL_MOVE: 10,    // Up-Left
        UR_MOVE: 11,    // Up-Right
        DL_MOVE: 12,    // Down-Left
        DR_MOVE: 13,    // Down-Right
        U_CLAW: 14,     // Clawing upward (at top boundary)
        D_CLAW: 15,     // Clawing downward (at bottom boundary)
        L_CLAW: 16,     // Clawing left (at left boundary)
        R_CLAW: 17      // Clawing right (at right boundary)
    };

    // Behavior modes (matching original Action enum)
    const BehaviorMode = {
        CHASE_MOUSE: 0,
        RUN_AWAY_FROM_MOUSE: 1,
        RUN_AROUND_RANDOMLY: 2,
        PACE_AROUND_SCREEN: 3,
        RUN_AROUND: 4
    };

    // Animation timing constants (in frames)
    const STOP_TIME = 4;
    const WASH_TIME = 10;
    const SCRATCH_TIME = 4;
    const YAWN_TIME = 3;
    const AWAKE_TIME = 3;
    const CLAW_TIME = 10;

    // Sprite size
    const SPRITE_SIZE = 32;

    class Neko {
        constructor(options = {}) {
            // Configuration
            this.speed = options.speed || 10;
            this.behaviorMode = options.behaviorMode || BehaviorMode.CHASE_MOUSE;
            this.idleThreshold = options.idleThreshold || 8;

            // State
            this.state = NekoState.STOP;
            this.frameCount = 0;
            this.animationFrame = 0;
            this.tickCount = 0;

            // Position
            this.x = options.startX || 0;
            this.y = options.startY || 0;
            this.targetX = this.x;
            this.targetY = this.y;

            // Bounds
            this.boundsWidth = window.innerWidth - SPRITE_SIZE;
            this.boundsHeight = window.innerHeight - SPRITE_SIZE;

            // Mouse tracking
            this.mouseX = 0;
            this.mouseY = 0;

            // DOM element
            this.element = null;
            this.spriteImages = [];

            // Animation lookup table (maps state to sprite indices)
            // Format: [frame1_index, frame2_index]
            this.animationTable = [
                [30, 30],  // STOP - uses sleep frame
                [27, 27],  // WASH
                [25, 26],  // SCRATCH
                [28, 29],  // YAWN
                [30, 31],  // SLEEP
                [0, 0],    // AWAKE
                [1, 2],    // U_MOVE
                [9, 10],   // D_MOVE
                [13, 14],  // L_MOVE
                [5, 6],    // R_MOVE
                [15, 16],  // UL_MOVE
                [3, 4],    // UR_MOVE
                [11, 12],  // DL_MOVE
                [7, 8],    // DR_MOVE
                [17, 18],  // U_CLAW
                [21, 22],  // D_CLAW
                [23, 24],  // L_CLAW
                [19, 20]   // R_CLAW
            ];

            // Additional state for behaviors
            this.idleFrameCount = 0;
            this.cornerIndex = 0;
            this.ballX = 0;
            this.ballY = 0;
            this.ballVX = 0;
            this.ballVY = 0;

            this.init();
        }

        init() {
            // Create the neko element
            this.element = document.createElement('div');
            this.element.className = 'neko';
            this.element.style.position = 'fixed';
            this.element.style.width = SPRITE_SIZE + 'px';
            this.element.style.height = SPRITE_SIZE + 'px';
            this.element.style.imageRendering = 'pixelated';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '999999';
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';

            // Create image element
            const img = document.createElement('img');
            img.style.width = '100%';
            img.style.height = '100%';
            this.element.appendChild(img);

            document.body.appendChild(this.element);

            // Track mouse position
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            // Update bounds on resize
            window.addEventListener('resize', () => {
                this.boundsWidth = window.innerWidth - SPRITE_SIZE;
                this.boundsHeight = window.innerHeight - SPRITE_SIZE;
            });

            // Random starting position
            this.x = Math.random() * this.boundsWidth;
            this.y = Math.random() * this.boundsHeight;
            this.updatePosition();

            // Animation loop
            this.running = false;
            this.intervalId = null;
        }

        start() {
            if (this.running) return;
            this.running = true;

            // Update at ~20fps (matching original 200ms timer)
            this.intervalId = setInterval(() => {
                this.update();
            }, 100);
        }

        stop() {
            this.running = false;
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        setSprites(sprites) {
            this.spriteImages = sprites;
            this.updateSprite();
        }

        updateSprite() {
            if (this.spriteImages.length === 0) return;

            // Get the current animation frame index
            let frameIndex;
            if (this.state === NekoState.SLEEP) {
                // Slower animation for sleep
                frameIndex = this.animationTable[this.state][(this.tickCount >> 2) & 0x1];
            } else {
                // Normal animation speed
                frameIndex = this.animationTable[this.state][this.tickCount & 0x1];
            }

            // Update the image
            const img = this.element.querySelector('img');
            if (img && this.spriteImages[frameIndex]) {
                img.src = this.spriteImages[frameIndex];
            }
        }

        updatePosition() {
            this.element.style.left = Math.round(this.x) + 'px';
            this.element.style.top = Math.round(this.y) + 'px';
        }

        update() {
            this.tickCount++;

            // Update behavior based on mode
            switch (this.behaviorMode) {
                case BehaviorMode.CHASE_MOUSE:
                    this.chaseMouse();
                    break;
                case BehaviorMode.RUN_AWAY_FROM_MOUSE:
                    this.runAwayFromMouse();
                    break;
                case BehaviorMode.RUN_AROUND_RANDOMLY:
                    this.runRandomly();
                    break;
                case BehaviorMode.PACE_AROUND_SCREEN:
                    this.paceAroundScreen();
                    break;
                case BehaviorMode.RUN_AROUND:
                    this.runAround();
                    break;
            }

            // Update animation frame
            this.updateSprite();
            this.updatePosition();
        }

        chaseMouse() {
            this.runTowards(this.mouseX, this.mouseY);
        }

        runAwayFromMouse() {
            const dx = this.x - this.mouseX;
            const dy = this.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Run away!
                const awayX = this.x + dx * 2;
                const awayY = this.y + dy * 2;
                this.runTowards(awayX, awayY);
            } else {
                this.idle();
            }
        }

        runRandomly() {
            if (this.isIdle()) {
                if (Math.random() < 0.02) {
                    // Pick a random target
                    this.targetX = Math.random() * this.boundsWidth;
                    this.targetY = Math.random() * this.boundsHeight;
                }
            }
            this.runTowards(this.targetX, this.targetY);
        }

        paceAroundScreen() {
            const corners = [
                [0, 0],
                [this.boundsWidth, 0],
                [this.boundsWidth, this.boundsHeight],
                [0, this.boundsHeight]
            ];

            const target = corners[this.cornerIndex % 4];
            const dx = this.x - target[0];
            const dy = this.y - target[1];
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.idleThreshold) {
                this.cornerIndex++;
            }

            this.runTowards(target[0], target[1]);
        }

        runAround() {
            // Simulate bouncing ball
            if (this.ballVX === 0 && this.ballVY === 0) {
                this.ballX = Math.random() * this.boundsWidth;
                this.ballY = Math.random() * this.boundsHeight;
                this.ballVX = (Math.random() - 0.5) * 20;
                this.ballVY = (Math.random() - 0.5) * 20;
            }

            this.ballX += this.ballVX;
            this.ballY += this.ballVY;

            // Bounce off walls
            if (this.ballX < 0 || this.ballX > this.boundsWidth) {
                this.ballVX = -this.ballVX;
                this.ballX = Math.max(0, Math.min(this.boundsWidth, this.ballX));
            }
            if (this.ballY < 0 || this.ballY > this.boundsHeight) {
                this.ballVY = -this.ballVY;
                this.ballY = Math.max(0, Math.min(this.boundsHeight, this.ballY));
            }

            this.runTowards(this.ballX, this.ballY);
        }

        runTowards(targetX, targetY) {
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.idleThreshold) {
                this.idle();
                return;
            }

            // Wake up if sleeping/idle
            if (this.isIdle()) {
                this.state = NekoState.AWAKE;
                this.frameCount = 0;
            }

            // Calculate direction
            const direction = this.calculateDirection(dx, dy);

            // Move towards target
            const moveSpeed = Math.min(this.speed, distance);
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * moveSpeed;
            this.y += Math.sin(angle) * moveSpeed;

            // Clamp to bounds and check for boundary collisions
            const atBoundary = this.clampToBounds();

            if (atBoundary) {
                // Scratching at boundary
                if (this.x <= 0) {
                    this.state = NekoState.L_CLAW;
                } else if (this.x >= this.boundsWidth) {
                    this.state = NekoState.R_CLAW;
                } else if (this.y <= 0) {
                    this.state = NekoState.U_CLAW;
                } else if (this.y >= this.boundsHeight) {
                    this.state = NekoState.D_CLAW;
                }
                this.frameCount = 0;
            } else {
                this.state = direction;
                this.frameCount = 0;
            }
        }

        calculateDirection(dx, dy) {
            // Calculate angle and map to 8 directions
            const angle = Math.atan2(dy, dx);
            const deg = angle * 180 / Math.PI;

            // Normalize to 0-360
            const normalized = (deg + 360) % 360;

            // Map to 8 directions (45-degree increments)
            if (normalized >= 337.5 || normalized < 22.5) {
                return NekoState.R_MOVE;
            } else if (normalized >= 22.5 && normalized < 67.5) {
                return NekoState.DR_MOVE;
            } else if (normalized >= 67.5 && normalized < 112.5) {
                return NekoState.D_MOVE;
            } else if (normalized >= 112.5 && normalized < 157.5) {
                return NekoState.DL_MOVE;
            } else if (normalized >= 157.5 && normalized < 202.5) {
                return NekoState.L_MOVE;
            } else if (normalized >= 202.5 && normalized < 247.5) {
                return NekoState.UL_MOVE;
            } else if (normalized >= 247.5 && normalized < 292.5) {
                return NekoState.U_MOVE;
            } else {
                return NekoState.UR_MOVE;
            }
        }

        clampToBounds() {
            let atBoundary = false;

            if (this.x < 0) {
                this.x = 0;
                atBoundary = true;
            } else if (this.x > this.boundsWidth) {
                this.x = this.boundsWidth;
                atBoundary = true;
            }

            if (this.y < 0) {
                this.y = 0;
                atBoundary = true;
            } else if (this.y > this.boundsHeight) {
                this.y = this.boundsHeight;
                atBoundary = true;
            }

            return atBoundary;
        }

        idle() {
            this.idleFrameCount++;
            this.frameCount++;

            // State machine for idle animations
            switch (this.state) {
                case NekoState.AWAKE:
                    if (this.frameCount >= AWAKE_TIME) {
                        this.state = NekoState.STOP;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.STOP:
                    if (this.frameCount >= STOP_TIME) {
                        this.state = NekoState.WASH;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.WASH:
                    if (this.frameCount >= WASH_TIME) {
                        this.state = NekoState.SCRATCH;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.SCRATCH:
                    if (this.frameCount >= SCRATCH_TIME) {
                        this.state = NekoState.YAWN;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.YAWN:
                    if (this.frameCount >= YAWN_TIME) {
                        this.state = NekoState.SLEEP;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.SLEEP:
                    // Stay asleep
                    break;

                case NekoState.U_CLAW:
                case NekoState.D_CLAW:
                case NekoState.L_CLAW:
                case NekoState.R_CLAW:
                    if (this.frameCount >= CLAW_TIME) {
                        this.state = NekoState.STOP;
                        this.frameCount = 0;
                    }
                    break;

                default:
                    // Any movement state should go to AWAKE
                    this.state = NekoState.AWAKE;
                    this.frameCount = 0;
                    break;
            }
        }

        isIdle() {
            return this.state === NekoState.STOP ||
                   this.state === NekoState.WASH ||
                   this.state === NekoState.SCRATCH ||
                   this.state === NekoState.YAWN ||
                   this.state === NekoState.SLEEP ||
                   this.state === NekoState.AWAKE;
        }

        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    // Export to global scope
    window.Neko = Neko;
    window.NekoState = NekoState;
    window.BehaviorMode = BehaviorMode;

    // Auto-start if data-autostart is present
    if (document.currentScript && document.currentScript.hasAttribute('data-autostart')) {
        window.addEventListener('DOMContentLoaded', () => {
            window.neko = new Neko();
            window.neko.start();
        });
    }
})();
