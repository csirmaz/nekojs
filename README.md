# <img src="nkosrc4/Neko98/Res/Awake.ico" width="32" alt="Neko" style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"> Neko.js

A JavaScript implementation of the classic Neko desktop pet for the web.

[**Live Demo**](https://louisabraham.github.io/nekojs/) | [Installation](#installation) | [API](#api)

## About

Neko is a classic desktop pet that follows your mouse cursor around the screen. Originally created by **Masayuki Koba** for X-Windows and ported to Windows 95/98 by **David Harvey** in 1998, this JavaScript version brings the **beloved** cat to modern web browsers.

### Features

- 🎯 **Follows your cursor** - Chases your mouse around the page
- 💤 **Idle animations** - Falls asleep when you stop moving
- 🐾 **Faithful recreation** - Matches original Neko98 state machine and behavior
- 🎨 **Pixel-perfect** - Uses original 32x32 pixel sprites
- ⚡ **Lightweight** - Only ~38KB uncompressed with sprites embedded (brotli compressed to ~14KB)
- 🚀 **Zero dependencies** - Pure vanilla JavaScript
- 🖱️ **Interactive** - Click to change behavior modes

## Installation

### Quick Start (Auto-start)

Add this single line to your HTML to automatically start Neko:

```html
<script src="https://louisabraham.github.io/nekojs/neko.js" data-autostart></script>
```

### Manual Control

For more control over initialization:

```html
<script src="https://louisabraham.github.io/nekojs/neko.js"></script>
<script>
  // Create and start Neko with custom options
  const neko = createNeko({
    speed: 24,              // Pixels per logic tick at 5 ticks/sec (default: 24)
    behaviorMode: 0,        // 0 = chase mouse (see Behavior Modes below)
    idleThreshold: 6        // Distance threshold to consider idle (default: 6)
  });
</script>
```

### Local Installation

Download [`neko.js`](https://louisabraham.github.io/nekojs/neko.js) directly or build from source:

```bash
git clone https://github.com/louisabraham/nekojs.git
cd nekojs
python3 build.py
```

Then include the generated `docs/neko.js` in your project.

## API

### Creating Neko

```javascript
const neko = createNeko(options);
```

**Options:**
- `speed` (number, default: 24) - Movement speed in pixels per logic tick (5 ticks/second)
- `fps` (number, default: 120) - Render frame rate for smooth interpolation
- `behaviorMode` (number, default: 0) - Behavior pattern (see below)
- `idleThreshold` (number, default: 6) - Distance threshold for idle detection
- `allowBehaviorChange` (boolean, default: true) - Allow clicking Neko to cycle behaviors
- `startX` (number) - Initial X position
- `startY` (number) - Initial Y position

### Interactive Mode

**Click on Neko to change its behavior!** By default, clicking the cat cycles through all behavior modes. You can disable this:

```javascript
const neko = createNeko({
  allowBehaviorChange: false  // Disable click-to-change
});
```

### Behavior Modes

```javascript
neko.behaviorMode = 0;  // Chase Mouse (default)
neko.behaviorMode = 1;  // Run Away From Mouse
neko.behaviorMode = 2;  // Run Around Randomly
neko.behaviorMode = 3;  // Pace Around Screen
neko.behaviorMode = 4;  // Run Around (chase invisible ball)
```

### Methods

```javascript
neko.start();          // Start the animation loop
neko.stop();           // Stop the animation loop
neko.destroy();        // Remove Neko from the page
neko.cycleBehavior();  // Manually cycle to next behavior
```

### Properties

```javascript
neko.x            // Current X position
neko.y            // Current Y position
neko.state        // Current animation state
neko.running      // Whether animation is running
neko.behaviorMode // Current behavior mode
```

## Building from Source

### Prerequisites

- Python 3.6+
- Pillow (PIL) library: `pip3 install Pillow`

### Build Process

```bash
# Clone the repository
git clone https://github.com/louisabraham/nekojs.git
cd nekojs

# Run the build script
python3 build.py

# Output will be generated at docs/neko.js
```

The build script:
1. Converts ICO sprites from the original Neko98 to PNG
2. Encodes sprites as base64 data URIs
3. Bundles sprites with JavaScript code
4. Outputs a single file to `docs/neko.js`

## Development

### Project Structure

```
nekojs/
├── src/
│   └── neko.js          # Main JavaScript implementation
├── docs/
│   ├── index.md         # GitHub Pages landing page
│   └── neko.js          # Built bundle (generated)
├── nkosrc4/             # Original Neko98 source (reference)
├── build.py             # Build script
├── README.md
└── LICENSE.md
```

### Implementation Details

This JavaScript version faithfully recreates the original Neko98 behavior:

- **18 animation states** - Stop, Wash, Scratch, Yawn, Sleep, Awake, 8 directional movements, 4 directional clawing
- **State machine** - Transitions between idle animations (Stop → Wash → Scratch → Yawn → Sleep)
- **5 behavior modes** - Chase mouse, run away, random, pace, and ball-chasing
- **Boundary detection** - Claws at screen edges when blocked
- **Smooth animation** - 120fps rendering with 5fps logic tick (matching original timing)

## Credits

- **Original Neko:** Masayuki Koba (X-Windows version)
- **Windows Port:** David Harvey (1998) - Neko98
- **JavaScript Implementation:** Louis Abraham (2025)
- **Source:** Original code from [web.archive.org](https://web.archive.org/web/20050330224958fw_/http://www.angelfire.com/ct/neko/download.html)

## How This Project Was Made

This project was originally created through AI-assisted "vibe coding" with Claude, then refined with manual improvements.

### Initial AI Generation

The first version was generated by Claude Sonnet 4 from the original Neko98 C++ source code using four prompts:

<details>
<summary><strong>Prompt 1: Initial Implementation</strong></summary>

```
I want to build a modern web version of neko.

I put the original implementation of neko in @nkosrc4/

Start by exploring the codebase and fully document what it does, then reimplement as much as possible in js.

Implement a simple JS version. Avoid using any external libraries except if absolutely necessary. If there is a build step (probably mostly for minification), use a simple one.

Use the orignal sprites from @nkosrc4/Neko98/Res/, add them to the build so that in the end one can just include a single js file that loads very fast (maybe it does network requests but it should be very fast). Maybe you can bundle or compress the sprites to make loading faster.

I will serve the repository using github pages in a docs/ folder. The build process should output a single docs/neko.js file.

Create a README.md file and a pretty looking docs/index.html to present the project. Properly credit the original code downloaded from https://web.archive.org/web/20050330224958fw_/http://www.angelfire.com/ct/neko/download.html. Include installation instructions in both.

Create a simple LICENSE.md file that respects the original license of the code and credits the original author. If you can, put a modern GPL license on the JS code.

Finally, the README.md and the index.html should include the fact that the code was produced fully by this prompt (after downloading and uncompressing nkosrc4 and converting some documentation `classes.doc` to `classes.txt`). Include the prompt verbatim.

You should use git and commit regularly. Don't commit the original source.
```

</details>

<details>
<summary><strong>Prompt 2: Bug Fix (Sprite Mapping)</strong></summary>

After the initial implementation, diagonal movements showed incorrect sprites. Two screenshots were provided showing the bug:

```
There is a bug in the movement handling, it is supposed to go up left in the first
image and down left in the second. Think to identify the source of the bug and check
the logic of all sprite indexing.
```

</details>

<details>
<summary><strong>Prompt 3: Documentation Update</strong></summary>

```
Finally update README.md and index.html to document the previous error and the
prompt that fixed it (explain that I pasted two screenshots), and also include
the current prompt. I want people to know everything about the creation process
so include every prompt in the docs. Also mention which model was used (claude 4.5).
This is the reported usage, report only the important stats on the webpage (even
if this prompt will be included fully)

Total cost: $1.42 Total duration (API): 9m 34s Total duration (wall): 20m 34s
Total code changes: 1442 lines added, 37 lines removed Usage by model:
claude-haiku: 30.9k input, 5.6k output, 179.8k cache read, 41.0k cache write ($0.1279)
claude-opus-4-5: 901 input, 109 output, 0 cache read, 0 cache write ($0.0072)
claude-sonnet: 146 input, 24.5k output, 1.8m cache read, 100.2k cache write ($1.28)
```

</details>

<details>
<summary><strong>Prompt 4: GitHub Integration</strong></summary>

```
I have now configured the github remote. Update the links where suitable. Don't
forget to update README.md and index.html to include this prompt. Mention that
just before this, the total cost was

Total cost: $2.07 Total duration (API): 11m 27s Total duration (wall): 26m 49s
Total code changes: 1554 lines added, 51 lines removed Usage by model:
claude-haiku: 32.1k input, 5.7k output, 179.8k cache read, 41.0k cache write ($0.1297)
claude-opus-4-5: 901 input, 109 output, 0 cache read, 0 cache write ($0.0072)
claude-sonnet: 174 input, 29.0k output, 2.8m cache read, 171.8k cache write ($1.94)

mostly because the conversation is getting long and I didn't compact it at all.
I'm also using the most expensive Claude Opus 4.5 model.

Commit and push your changes.
```

</details>

### Manual Improvements

The plan was to try to let the AI fully implement the project, but it was not able to do so.

After the initial AI generation, significant work with a human in the loop was done to fix bugs and add features:

- **Rewrote movement system** - Complete rewrite for more realistic movement matching the original C++ implementation for state changes and animation timing while allowing for smooth movement at **higher** FPS.
- **Fixed wall clawing bug** - Movement deltas were floating-point causing direction flickering that reset state counters; converted to integers like original C++
- **Fixed boundary detection** - Changed from `window.innerWidth` to `document.documentElement.clientWidth` to exclude scrollbars
- **Added click-to-change behavior** - Click on Neko to cycle through all 5 behavior modes
- **Fixed click detection** - Changed from `click` to `mousedown` event so clicks register even when cat is moving

## License

This JavaScript implementation is licensed under **GNU General Public License v3.0**, respecting the original Neko license.

See [LICENSE.md](LICENSE.md) for full details.

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

[View Demo](https://louisabraham.github.io/nekojs/) | [GitHub](https://github.com/louisabraham/nekojs)
