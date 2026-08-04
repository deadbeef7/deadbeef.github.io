/*
========================================================

                eastereggs.js

Hidden features
Developer mode
Website secrets

========================================================
*/

"use strict";

class EasterEggs {

    constructor(app) {

        this.app = app;

        this.logo = $("#logo");

        this.clicks = 0;

        this.developerMode = false;

        this.konamiIndex = 0;

        this.konami = [

            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a"

        ];

    }

    init() {

        this.logoClicks();

        this.konamiCode();

        this.idleMessage();

        console.log("%cWelcome to The Wired.", "color:#ff7700");

    }

    /*==================================================
    Logo
    ==================================================*/

    logoClicks() {

        this.logo.addEventListener("click", () => {

            this.clicks++;

            if (this.clicks < 5)
                return;

            this.clicks = 0;

            const old = this.logo.textContent;

            this.logo.textContent = "玲音";

            document.body.classList.add("glitch");

            setTimeout(() => {

                this.logo.textContent = old;

                document.body.classList.remove("glitch");

            }, 2000);

        });

    }

    /*==================================================
    Konami Code
    ==================================================*/

    konamiCode() {

        document.addEventListener("keydown", (event) => {

            if (event.key === this.konami[this.konamiIndex]) {

                this.konamiIndex++;

            }

            else {

                this.konamiIndex = 0;

            }

            if (this.konamiIndex !== this.konami.length)
                return;

            this.konamiIndex = 0;

            this.unlockDeveloper();

        });

    }

    unlockDeveloper() {

        if (this.developerMode)
            return;

        this.developerMode = true;

        this.app.theme.setWired();

        this.app.terminal.print("");

        this.app.terminal.print("================================");

        this.app.terminal.print("Developer Mode Enabled");

        this.app.terminal.print("Experimental commands unlocked.");

        this.app.terminal.print("================================");

        this.app.terminal.print("");

    }

    /*==================================================
    Idle
    ==================================================*/

    idleMessage() {

        let timer;

        const reset = () => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                document.body.classList.add("glitch");

                this.app.terminal.print("");

                this.app.terminal.print("...someone is watching from The Wired...");

                this.app.terminal.print("");

                setTimeout(() => {

                    document.body.classList.remove("glitch");

                }, 1500);

            }, 60000);

        };

        [

            "mousemove",

            "keydown",

            "click",

            "touchstart"

        ].forEach(event => {

            document.addEventListener(event, reset);

        });

        reset();

    }

}
