// ==UserScript==
// @name         [css] BetterFont-V2
// @homepageURL  https://github.com/WellWells/better-font
// @version      v20251211
// @description  Improved Font Rendering and Style Customization for a Better Reading Experience
// @author       WellsTsai
// @match        *://*/*
// @exclude      *://bobondemon.github.io/*
// @exclude      *://cloud.google.com/*
// @exclude      *://developers.google.com/*
// @exclude      *://docs.google.com/*
// @exclude      *://*.fonts/*
// @exclude      *://*fonts.*
// @exclude      *://icloud.com/*
// @exclude      *://justfont/*
// @exclude      *://leetcode.com/*
// @exclude      *://live.com/*
// @exclude      *://materialdesignicons.com/*
// @exclude      *://microsoft.com/*
// @exclude      *://office.com/*
// @exclude      *://pictogrammers.github.io/*
// @exclude      *://play.google.com/*
// @exclude      *://regex101.com/*
// @exclude      *://remotedesktop.google.com/*
// @exclude      *://term.ptt.cc/*
// @exclude      *://w3schools.com/*
// @exclude      *://mui.com/*
// @exclude      *://*cloudflare.dev/*
// @exclude      *://*google.com/maps/*
// Development & Code Editors
// @exclude      *://codesandbox.io/*
// @exclude      *://stackblitz.com/*
// @exclude      *://replit.com/*
// @exclude      *://glitch.com/*
// @exclude      *://vercel.com/*
// @exclude      *://netlify.com/*
// Design & Graphics
// @exclude      *://figma.com/*
// @exclude      *://canva.com/*
// @exclude      *://sketch.com/*
// @exclude      *://adobe.com/*
// @exclude      *://fontawesome.com/*
// Banking & Finance
// @exclude      *://*bank*.com/*
// @exclude      *://*banking*.com/*
// @exclude      *://paypal.com/*
// @exclude      *://stripe.com/*
// Communication & Productivity
// @exclude      *://teams.microsoft.com/*
// @exclude      *://outlook.live.com/*
// @exclude      *://notion.so/*
// @exclude      *://slack.com/*
// @exclude      *://discord.com/*
// @exclude      *://zoom.us/*
// Online IDEs & Learning
// @exclude      *://hackerrank.com/*
// @exclude      *://codewars.com/*
// @exclude      *://exercism.org/*
// @exclude      *://freecodecamp.org/*
// Special Characters & Icons
// @exclude      *://nerdfonts.com/*
// @exclude      *://iconify.design/*
// @exclude      *://ionic.io/ionicons/*

// @run-at       document-start
// ==/UserScript==

(function () {
    "use strict";

    // ==================== Configuration ====================
    const CONFIG = {
        debug: false,
        defaultFont: "lihei pro",
        monospaceFont: "Menlo",
        
        // Pages that should use monospace fonts (e.g., code editors)
        monospaceSites: new Set([
            "github.com",
            "greasyfork.org",
            "codepen.io",
            "w3schools.com",
            "jsfiddle.net",
            "gitlab.com",
            "bitbucket.org",
            "stackoverflow.com"
        ]),
        
        // Languages to exclude (e.g., right-to-left or Cyrillic scripts)
        excludedLanguages: new Set(["fa-ir", "ru", "ar", "he"]),
        
        // Class name patterns to ignore (icons, buttons, etc.)
        ignoredClasses: new Set([
            "K3JSBVB-r-e", "O4", "rating", "vjs", "jump-top-box", "social_btn",
            "pe-7s", "la", "fa", "f7-icons", "Icon", "ico", "material-icons",
            "DPvwYc", "Xm9Bod", "ynvm8", "goog-inline-block", "share", "article-vote-controls",
            "btn", "indicator", "Logo", "logo", "lg-icon", "_3Kzp1", "ni", "sf",
            "se", "anchorjs", "fui", "nav-toggle", "fc_meta", "show", "i-", "mjx", "docon", "o365cs", "chroma",
            // Icon libraries
            "mdi", "bi", "ti", "ri", "iconify",
        ]),
        
        // Class/ID patterns that indicate code blocks (more generic approach)
        codeBlockPatterns: new Set([
            "code", "highlight", "syntaxhighlighter", "CodeMirror", "monaco",
            "ace_editor", "prism", "hljs", "language-", "sourceCode"
        ]),
        
        // Event action attributes to ignore
        ignoredEventActions: new Set(["search"])
    };

    // ==================== Helper Functions ====================
    const URL = window.location.hostname;
    const LANG = (document.documentElement.lang || "").toLowerCase();

    const isBlacklisted = (list, value) => list.has(value);
    const isPageUseMonospace = (list, value) => list.has(value);
    
    const log = (...args) => {
        if (CONFIG.debug) console.log('[BetterFont]', ...args);
    };

    // ==================== Early Exit Conditions ====================
    if (isBlacklisted(CONFIG.excludedLanguages, LANG)) {
        log(`Skipped - Language blacklisted: ${LANG}`);
        return;
    }

    // ==================== Selector Generation ====================
    const buildCSSSelector = () => {
        // 1. Exclude elements with specific class patterns
        const classSelectors = [...CONFIG.ignoredClasses]
            .map(cls => `:not([class*="${cls}"])`)
            .join("");
        
        // 2. Exclude elements with specific event actions
        const eventActionSelectors = [...CONFIG.ignoredEventActions]
            .map(action => `:not([eventaction*="${action}"])`)
            .join("");
        
        // 3. Exclude code block containers by class/id patterns
        const codeBlockSelectors = [...CONFIG.codeBlockPatterns]
            .map(pattern => `:not([class*="${pattern}"]):not([id*="${pattern}"])`)
            .join("");
        
        // 4. Use :not(:is()) for semantic exclusions - more elegant approach
        const semanticExclusions = [
            // Icon and decorative elements
            'i', 'em', 'svg', 'button',
            // Code and technical content (these should keep monospace)
            'pre', 'code', 'kbd', 'samp', 'var', 'tt',
            // Form inputs (users expect system fonts here)
            'input', 'textarea', 'select', 'option',
            // Quotations and styled text
            'blockquote', 'q',
            // Font and span (often used for icons/special styling)
            'font', 'span'
        ];
        
        const semanticSelector = `:not(:is(${semanticExclusions.join(', ')}))`;
        
        // 5. Exclude elements with special attributes (attribute-based exclusion)
        const attributeExclusions = [
            ':not([contenteditable])',           // Editable content
            ':not([contenteditable="true"])',    // Explicitly editable
            ':not([role="textbox"])',            // ARIA textbox role
            ':not([role="button"])',             // ARIA button role
            ':not([aria-label*="icon"])',        // Elements labeled as icons
            ':not([data-icon])',                 // Elements with icon data attributes
            ':not([translate="no"])',            // Content that shouldn't be translated (often technical)
        ].join('');
        
        // Combine all selectors
        return `*${classSelectors}${eventActionSelectors}${codeBlockSelectors}${semanticSelector}${attributeExclusions}`;
    };

    // ==================== Font Application ====================
    const getFontFamily = () => {
        if (isPageUseMonospace(CONFIG.monospaceSites, URL)) {
            return `"${CONFIG.monospaceFont}", "${CONFIG.defaultFont}"`;
        }
        return `"${CONFIG.defaultFont}"`;
    };

    const applyFont = () => {
        try {
            const selector = buildCSSSelector();
            const fontFamily = getFontFamily();
            const cssRule = `${selector} { font-family: ${fontFamily} !important; font-weight: normal; }`;
            
            const styleElement = document.createElement("style");
            styleElement.id = "better-font-v2";
            styleElement.textContent = cssRule;
            
            log('CSS Rule:', cssRule);
            
            if (document.head) {
                document.head.appendChild(styleElement);
                log('Font applied successfully');
            } else {
                // Fallback for early execution
                const observer = new MutationObserver((mutations, obs) => {
                    if (document.head) {
                        document.head.appendChild(styleElement);
                        log('Font applied successfully (delayed)');
                        obs.disconnect();
                    }
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
            }
        } catch (error) {
            console.error('[BetterFont] Error applying font:', error);
        }
    };

    // ==================== Initialization ====================
    applyFont();
})();
