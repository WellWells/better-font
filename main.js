// ==UserScript==
// @name         [css] BetterFont
// @homepageURL  https://github.com/WellWells/better-font
// @version      20240604
// @description  Improved Font Rendering and Style Customization for a Better Reading Experience
// @author       WellsTsai
// @include      *://*
// @run-at       document-start
// ==/UserScript==

(function () {
    "use strict";

    // 設定是否啟用除錯模式
    const IS_DEBUG = false;

    // 黑名單網站列表
    const BLACK_LIST = [
        "leetcode.com", "regex101.com", "w3schools.com",
        "bobondemon.github.io", "iamchucky.github.io", "pictogrammers.github.io",
        "fonts", "justfont", "materialdesignicons.com",
        "docs.google.com", "remotedesktop.google.com", "developers.google.com", "cloud.google.com", "play.google.com",
        "icloud.com", "microsoft.com", "live.com", "office.com",
        "term.ptt.cc", "wellstsai.com"
    ];

    const MONOSPACE_PAGE = [
        "wikipedia.org"
    ];

    // 語言黑名單
    const LANG_LIST = ["fa-ir", "ru"];

    // 獲取當前網站和語言
    const URL = window.location.hostname;
    const LANG = document.documentElement.lang.toLowerCase();

    // 匹配黑名單
    const isBlacklisted = (list, value) => list.some(item => value.includes(item));
    // 匹配 Monospace 名單
    const isPageUseMonospace = (list, value) => list.some(item => value.includes(item));

    if (isBlacklisted(BLACK_LIST, URL) || isBlacklisted(LANG_LIST, LANG)) {
        if (IS_DEBUG) console.log(`[Font/Debug] 字體未更改，因為在黑名單中: ${URL} 或語言: ${LANG}`);
        return;
    }

    // 過濾器配置
    const FILTER = {
        class: [
            "K3JSBVB-r-e", "O4", "rating", "vjs", "jump-top-box", "social_btn",
            "pe-7s", "la", "fa", "f7-icons", "Icon", "ico", "material-icons",
            "DPvwYc", "Xm9Bod", "ynvm8", "goog-inline-block", "share", "article-vote-controls",
            "btn", "indicator", "Logo", "logo", "lg-icon", "_3Kzp1", "ni", "sf",
            "se", "anchorjs", "fui", "nav-toggle", "fc_meta", "show", "i-", "mjx", "docon", "o365cs"
        ],
        eventaction: ["search"]
    };

    const IGNORE_TAGS = ["i", "em", "button", "font", "span", "svg", "blockquote"];

    // 生成忽略選擇器
    const getIgnoredSelectors = (filter) => {
        return Object.entries(filter).map(([key, values]) =>
            values.map(value => `:not([${key}*="${value}"])`).join("")
        ).join("");
    };

    // 設置樣式
    const ignoredSelectors = getIgnoredSelectors(FILTER);
    const ignoredTags = IGNORE_TAGS.map(tag => `:not(${tag})`).join("");
    const css = document.createElement("style");

    const fontFamily = isPageUseMonospace(MONOSPACE_PAGE, URL) ? `"Noto Sans Mono", "Noto Sans TC"` : `"lihei pro"`
    css.innerText = `*${ignoredSelectors}${ignoredTags} { font-family: ${fontFamily} !important; font-weight: normal !important; } textarea { font-family: inherit !important; }`;

    document.head.appendChild(css);

    if (IS_DEBUG) console.log(css.innerText);
})();
