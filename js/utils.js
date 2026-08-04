/*
========================================================

                utils.js

Common utility functions used across the project.

========================================================
*/

"use strict";

/*=========================================
DOM Helpers
=========================================*/

function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

/*=========================================
Sleep
=========================================*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*=========================================
Random Number
=========================================*/

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*=========================================
Clamp
=========================================*/

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/*=========================================
Typewriter
=========================================*/

async function typeText(element, text, speed = 20) {

    element.textContent = "";

    for (const char of text) {

        element.textContent += char;

        await sleep(speed);

    }

}

/*=========================================
Create Element
=========================================*/

function create(tag, className = "") {

    const element = document.createElement(tag);

    if (className)
        element.className = className;

    return element;

}

/*=========================================
Scroll To Bottom
=========================================*/

function scrollBottom(element) {

    element.scrollTop = element.scrollHeight;

}
