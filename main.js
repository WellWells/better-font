// ==UserScript==
// @name         [css] BetterFont
// @homepageURL  https://github.com/WellWells/better-font
// @version      20231228
// @description  Improved Font Rendering and Style Customization for a Better Reading Experience
// @author       WellsTsai
// @include      *://*
// @run-at       document-start
// ==/UserScript==

(function () {
    "use strict";

    // Change the flag is want to debug.
    const IS_DEBUG = true

    const BLACK_LIST = [
        "leetcode.com", "regex101.com", "w3schools.com",
        "bobondemon.github.io", "iamchucky.github.io", "pictogrammers.github.io",
        "fonts", "justfont", "materialdesignicons.com",
        "docs.google.com", "remotedesktop.google.com", "developers.google.com", "cloud.google.com", "play.google.com",
        "icloud.com", "microsoft.com", "live.com", "office.com",
        "term.ptt.cc", "wellstsai.com",
    ];

    const LANG_LIST = ["fa-ir", "ru"];
    const URL = window.location.hostname;
    const LANG = document.documentElement.lang.toLowerCase();
    const URL_MATCH = RegExp(BLACK_LIST.join("|")).exec(URL);
    const LANG_MATCH = RegExp(LANG_LIST.join("|")).exec(LANG);

    if (URL_MATCH || LANG_MATCH) {
        if (IS_DEBUG) console.log(`[Font/Debug] The font remains unchanged due to:${URL_MATCH ? URL_MATCH : LANG_MATCH}`);
        return false;
    }

    const FILTER = {
        class: [
            "K3JSBVB-r-e", "O4", "rating", "vjs", "jump-top-box", "social_btn",
            "pe-7s", "la", "fa", "f7-icons", "Icon", "ico", "material-icons",
            "DPvwYc", "Xm9Bod", "ynvm8", "goog-inline-block", "share", "article-vote-controls",
            "btn", "indicator", "Logo", "logo", "lg-icon", "_3Kzp1", "ni", "sf",
            "se", "anchorjs", "fui", "nav-toggle", "fc_meta", "show", "i-", "mjx", "docon", "o365cs"
        ],
        eventaction: ["search"],
    }

    const IGNORE_TAGS = ["i", "em", "button", "font", "span", "svg", "blockquote"];

    function getIgnoredSelectors(filter) {
        return Object.entries(filter).map(([key, values]) => {
            return values.map(value => `:not([${key}*="${value}"])`).join("");
        }).join("");
    }

    const ignoredSelectors = getIgnoredSelectors(FILTER);
    const ignoredTags = IGNORE_TAGS.map(tag => `:not(${tag})`).join("");
    const css = document.createElement("style");
    css.innerText = `*${ignoredSelectors}${ignoredTags}{font-family: "LiHei Pro" !important; font-weight: normal !important;} textarea {font-family: inherit!important;}`;
    document.head.appendChild(css);
    console.log(css.innerText);
})();
