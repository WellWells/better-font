# BetterFont-V2

![GitHub version](https://img.shields.io/badge/version-20251211-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Description

The **BetterFont-V2** UserScript enhances font rendering and provides intelligent style customization for an improved reading experience across websites. It automatically applies optimized fonts while intelligently excluding icons, code blocks, and special elements.

## Features

- **Smart Font Replacement** - Automatically applies "LiHei Pro" for better readability
- **Code-Aware** - Uses monospace fonts (Menlo) on developer-focused websites
- **Intelligent Exclusions** - Automatically excludes icons, buttons, inputs, and other UI elements
- **Multi-Language Support** - Excludes incompatible languages (RTL scripts, Cyrillic, etc.)
- **High Performance** - Injects styles at document-start for flicker-free rendering
- **Highly Configurable** - Extensive configuration options for customization

## Installation

1. Install a UserScript manager (e.g., [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), or Greasemonkey).
2. Create a new script in your UserScript manager.
3. Copy and paste the contents of `userscript.user.js`.
4. Save the script (Ctrl+S or Cmd+S).
5. Refresh any webpage to see the changes.

## Usage

Once installed, the script automatically runs on all websites (except those in the exclusion list). No manual action required.

### Font Application Logic

- **General Websites**: Uses "LiHei Pro" font
- **Code Websites**: Uses "Menlo" monospace font with "LiHei Pro" as fallback

### Monospace-Enabled Websites

The script automatically enables monospace fonts on:

- github.com
- greasyfork.org
- codepen.io
- w3schools.com
- jsfiddle.net
- gitlab.com
- bitbucket.org
- stackoverflow.com

## Exclusions

### Excluded Websites

The script excludes the following categories to ensure compatibility:

**Development & Code Editors**
- codesandbox.io, stackblitz.com, replit.com, glitch.com, vercel.com, netlify.com

**Design & Graphics**
- figma.com, canva.com, sketch.com, adobe.com, fontawesome.com

**Banking & Finance**
- Sites matching `*bank*.com`, `*banking*.com`, paypal.com, stripe.com

**Communication & Productivity**
- teams.microsoft.com, outlook.live.com, notion.so, slack.com, discord.com, zoom.us

**Online IDEs & Learning**
- leetcode.com, hackerrank.com, codewars.com, exercism.org, freecodecamp.org

**Microsoft & Google Services**
- microsoft.com, office.com, live.com, docs.google.com, cloud.google.com, etc.

**Special Characters & Icons**
- nerdfonts.com, materialdesignicons.com, iconify.design, ionic.io/ionicons

**Other Services**
- regex101.com, term.ptt.cc, icloud.com, mui.com, and more

See the full list in the `@exclude` directives at the top of the script.

### Excluded Languages

- `fa-ir` (Persian)
- `ru` (Russian)
- `ar` (Arabic)
- `he` (Hebrew)

### Automatically Excluded Elements

The script intelligently excludes:

1. **Semantic Elements**: `i`, `em`, `svg`, `button`, `input`, `textarea`, `select`, `pre`, `code`, `kbd`, etc.
2. **Icon Classes**: Elements with class names containing `fa`, `mdi`, `bi`, `ti`, `ri`, `icon`, `iconify`, etc.
3. **Code Blocks**: Elements with class/id containing `code`, `highlight`, `CodeMirror`, `monaco`, `prism`, `hljs`, etc.
4. **Special Attributes**: `contenteditable`, `role="button"`, `data-icon`, `aria-label*="icon"`, etc.

## Debugging

To enable debug mode, modify the script:

```javascript
const CONFIG = {
    debug: true,  // Change to true
    // ...
};
```

With debug mode enabled, check the browser console (F12) to see:
- Applied CSS rules
- Font application status
- Excluded languages and other diagnostic information

## Customization

### Change Default Font

Fork the repository and modify the `CONFIG` object:

```javascript
const CONFIG = {
    debug: false,
    defaultFont: "lihei pro",        // Change to your preferred font
    monospaceFont: "Menlo",          // Change monospace font
    // ...
};
```

For example, to use Comic Sans MS:

```javascript
defaultFont: "Comic Sans MS",
```

### Add Code Websites

Add domains to the `monospaceSites` set:

```javascript
monospaceSites: new Set([
    "github.com",
    "greasyfork.org",
    "your-coding-site.com",  // Add your site
    // ...
]),
```

### Exclude Additional Websites

Add exclusion rules at the top of the script:

```javascript
// @exclude      *://example.com/*
```

### Customize Excluded Elements

Modify the configuration sets:

```javascript
ignoredClasses: new Set([
    // Add your custom class patterns
    "your-icon-class",
]),

codeBlockPatterns: new Set([
    // Add your custom code block patterns
    "your-code-pattern",
]),
```

## Compatibility

Tested and working on:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

## License

This project is licensed under the MIT License.

## Author

**WellsTsai**

- GitHub: [@WellWells](https://github.com/WellWells)
- Homepage: [better-font](https://github.com/WellWells/better-font)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

If this script improved your reading experience, please give it a ⭐️!
