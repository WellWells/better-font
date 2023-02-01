# BetterFont

![GitHub version](https://img.shields.io/badge/version-20231228-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Description

The **BetterFont** UserScript enhances font rendering and allows for style customization, providing an improved reading experience on various websites.

## Features

- Improved font rendering
- Style customization for better readability
- Excludes specific websites and languages from font changes

## Installation

1. Install a browser extension that supports UserScripts (e.g., Tampermonkey, Greasemonkey).
2. Click [here](https://raw.githubusercontent.com/WellWells/better-font/main/main.js) to install the script.

## Usage

Once installed, the script will automatically apply font improvements and style customization on supported websites.

## Exclusions

The script excludes font changes on specific websites and for certain languages to ensure compatibility.

### Excluded Websites

- leetcode.com
- regex101.com
- w3schools.com
- ...

### Excluded Languages

- fa-ir
- ru

## Debugging

To enable debug mode, set the `IS_DEBUG` flag to `true` in the script.

```javascript
// Change the flag if you want to debug.
const IS_DEBUG = true;
```

## Customization

To customize the default font, fork the repository and modify the script. The script defaults to using LiHei Pro, so you can change it to another font, such as "Comic Sans MS," to personalize the font style.