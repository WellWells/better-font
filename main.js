// ==UserScript==
// @name         [css]BetterFont
// @version      20210208
// @description  Font Change
// @author       WellsTsai
// @include      *://*
// ==/UserScript==

(function() {
    'use strict';

    var blackList = [
        'w3schools.com','term.ptt.cc','iamchucky.github.io','mathway','remotedesktop.google.com','regex101.com','docs.google.com','bobondemon.github.io'
    ]
    var langList = ['fa-ir','ru'];
    var url = window.location.hostname;

    var match = RegExp(blackList.join('|')).exec(url);
    if (match) {console.log('字體不更換，原因：'+match);return false;}

    if (url.indexOf('fonts') !== -1) {console.log('字體不更換，原因：'+match);return false;}

    var lang=document.documentElement.lang.toLowerCase();
    match = RegExp(langList.join('|')).exec(lang);
    if (match) {console.log('字體不更換，原因：'+match);return false;}

    var css = document.createElement('style');
    var head = document.head;

    css.type = 'text/css';
    var filterName = ['class'];
    var filterValue = [
        ['K3JSBVB-r-e','O4','rating','vjs','jump-top-box','social_btn','pe-7s','la',
         'fa','f7-icons','Icon','ico','material-icons','DPvwYc','Xm9Bod',
         'ynvm8','goog-inline-block','share','article-vote-controls',
         'btn','indicator','Logo','logo','lg-icon','_3Kzp1','ni','sf','se','anchorjs','fui','fc_meta','show','i-','mjx']
    ];
    var text = '*';

    for (var i=0;i<filterName.length;i++){
        for(var j=0;j<filterValue[i].length;j++){
            text = text + `:not([`+filterName[i]+`*="` + filterValue[i][j] + `"])`;
        }
    }

    text=text + `:not(i):not(em):not(button):not(font):not(svg):not(blockquote){font-family: "儷黑 Pro" !important;font-weight: normal !important;}`;
    css.innerText = text;
    //console.log(text);
    head.appendChild(css);
})();




