// ==UserScript==
// @name        Memeflag Delouser
// @namespace   MemeflagDelouser
// @description This userscript automatically hides and marks posters who use memeflags when posting to hide their country of origin.
// @version     1
// @grant       none
// @include     http://*.4chan.org/*
// @include     https://*.4chan.org/*
// ==/UserScript==


function addCSS() {
  let css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/gh/DelouseMemeFlags/MemeflagDelouser@master/src/inject/inject.css';
  document.head.appendChild(css);
}


function addJS() {
  let head = document.getElementsByTagName('body')[0];
  let js = document.createElement('script');
  js.src = 'https://cdn.jsdelivr.net/gh/DelouseMemeFlags/MemeflagDelouser@master/src/inject/inject.js';
  document.head.appendChild(js);
  js.onload = function() {extension();};
}


addCSS();
addJS();
