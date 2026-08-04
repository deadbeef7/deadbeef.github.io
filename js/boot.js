/*
========================================================

                boot.js

Handles the BIOS boot animation and
reveals the website.

========================================================
*/

"use strict";

class BootManager {

    constructor() {

        this.screen = $("#boot-screen");
        this.output = $("#boot-output");
        this.cursor = $("#boot-cursor");
        this.enter = $("#boot-enter");

        this.site = $("#site");

        this.running = false;
        this.finished = false;
        this.skip = false;

        this.charSpeed = 18;
        this.lineDelay = 140;

        this.lines = [

            "AYOUB BIOS v2.1",
            "",
            "CPU............................OK",
            "Memory.........................8192 MB",
            "Graphics.......................PowerVR GE8320",
            "Storage........................Detected",
            "Filesystem.....................Mounted",
            "Terminal.......................Ready",
            "",
            "Loading Linux kernel...",
            "",
            "Mounting /home/ayoub...",
            "",
            "Connecting to The Wired...",
            "",
            "CONNECTED.",
            "",
            "Welcome back, Ayoub.",
            "",
            "System Ready."

        ];

    }

    async start() {

        if (this.running) return;

        this.running = true;

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                this.skipBoot();

            }

        });

        for (const line of this.lines) {

            if (this.skip) break;

            await this.type(line);

            this.output.innerHTML += "\n";

            await sleep(this.lineDelay);

        }

        if (this.skip) {

            this.output.textContent = this.lines.join("\n");

        }

        this.finished = true;

        this.enter.classList.add("show");

    }

    async type(text) {

        for (const character of text) {

            if (this.skip) return;

            this.output.innerHTML += character;

            await sleep(this.charSpeed);

        }

    }

    skipBoot() {

        this.skip = true;

    }

    async reveal() {

        if (!this.finished) return;

        this.screen.classList.add("power-off");

        await sleep(700);

        this.screen.style.display = "none";

        this.site.classList.add("visible");

        this.animatePanels();

    }

    animatePanels() {

        const panels = $all(".panel");

        panels.forEach((panel, index) => {

            panel.style.opacity = "0";

            panel.style.transform = "translateY(40px)";

            setTimeout(() => {

                panel.style.transition = ".7s";

                panel.style.opacity = "1";

                panel.style.transform = "translateY(0px)";

            }, index * 120);

        });

    }

}
