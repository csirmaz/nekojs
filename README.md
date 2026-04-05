
A JavaScript reimplementation of the classic Neko desktop pet for the web.


## About

[Neko](https://en.wikipedia.org/wiki/Neko_(software)) is a classic desktop
pet that follows your mouse cursor around the screen.  This JavaScript
version brings the cat to web pages.

Based on
https://github.com/louisabraham/nekojs

The original source code (in the `nkosrc4/` folder) was downloaded from
[web.archive.org](https://web.archive.org/web/20050330224958fw_/http://www.angelfire.com/ct/neko/download.html).

## This version

A simplified version of Neko in `dist/neko.js`. It only moves if `neko.goto(x,y)` is called.


### Features

- 💤 **Idle animations** - Falls asleep when you stop moving
- 🎨 **Pixel-perfect** - Uses original 32x32 pixel sprites
- ⚡ **Lightweight** - ~38KB uncompressed with sprites embedded (brotli compressed to ~14KB)
- 🚀 **Zero dependencies** - Pure vanilla JavaScript

## Usage


```javascript
const neko = createNeko({
  speed: 24,                 // Pixels per logic tick (default: 24, 5 ticks/sec)
  fps: 120,                  // Render frame rate (default: 120)
  behaviorMode: 0,           // 0=chase, 1=run away, 2=random, 3=pace, 4=ball chase
  idleThreshold: 6,          // Distance to consider idle (default: 6)
  allowBehaviorChange: true, // Click to cycle behaviors (default: true)
  startX: 0,                 // Initial X position (OBLIGATORY)
  startY: 0                  // Initial Y position (OBLIGATORY)
});

neko.goto(100, 100);

neko.start();
neko.stop();
neko.destroy();
```

## License

This JavaScript implementation is licensed under **GNU General Public License v3.0**, respecting the original Neko license.

See [LICENSE.md](LICENSE.md) for full details.
