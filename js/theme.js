/*
========================================================

                theme.js

Controls the website theme.

Orange
Wired
Future themes

========================================================
*/

"use strict";

class ThemeManager {

    constructor() {

        this.current = "orange";

    }

    setOrange() {

        document.body.classList.remove("wired");

        this.current = "orange";

        console.log("Theme: Orange");

    }

    setWired() {

        document.body.classList.add("wired");

        this.current = "wired";

        console.log("Theme: Wired");

    }

    toggle() {

        if (this.current === "orange") {

            this.setWired();

        } else {

            this.setOrange();

        }

    }

    flash() {

        document.body.classList.add("crt-flash");

        setTimeout(() => {

            document.body.classList.remove("crt-flash");

        }, 120);

    }

    glitch(duration = 1500) {

        document.body.classList.add("glitch");

        setTimeout(() => {

            document.body.classList.remove("glitch");

        }, duration);

    }

}
