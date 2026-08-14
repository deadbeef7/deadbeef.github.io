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

        // faster typing but still readable; CSS handles visual size
        this.charSpeed = 9;
        this.lineDelay = 140;

        this.lines = [

            "プレゼントーデイ、プレセントータイム",
            "",
            "CPU............................OK",
            "Memory.........................8192 MB",
            "Graphics.......................PowerVR GE8320",
            "Filesystem.....................Mounted",
            "Terminal.......................Ready",
            "Loading Linux kernel...",
            "Connecting to The Wired...",
            "CONNECTED.",
            "Welcome back, System Ready."

        ];

        // store handlers so we can remove them later
        this._onTap = null;
        this._onEnterClick = null;

    }

    async start() {

        if (this.running) return;

        this.running = true;

        // Ensure the boot overlay is visible and site hidden in case CSS or other scripts changed
        try {
            if (this.screen && this.screen.style) {
                this.screen.style.display = 'flex';
                this.screen.style.zIndex = '2147483647';
                this.screen.style.pointerEvents = 'auto';
            }
            if (this.site && this.site.style) {
                this.site.style.opacity = '0';
                this.site.style.visibility = 'hidden';
                this.site.style.pointerEvents = 'none';
            }
        } catch (e) {
            // ignore
        }

        // keyboard skip (Escape)
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.skipBoot();
            }
        });

        // click/touch on boot screen: skip while typing, reveal when finished
        this._onTap = (e) => {
            if (!this.screen) return;
            if (this.finished) {
                // single-tap reveal: if finished or skip is already true reveal immediately
                this.reveal();
            } else {
                // if not finished, skip and reveal immediately (one-tap UX)
                this.skipBoot();
                this.reveal();
            }
        };

        if (this.screen && this.screen.addEventListener) {
            this.screen.addEventListener("click", this._onTap, { passive: true });
            this.screen.addEventListener("touchstart", this._onTap, { passive: true });
        }

        // Enter button behavior: skip during typing, reveal after finished
        this._onEnterClick = () => {
            if (!this.finished) {
                this.skipBoot();
                this.reveal();
            } else {
                this.reveal();
            }
        };

        if (this.enter && this.enter.addEventListener) {
            this.enter.addEventListener("click", this._onEnterClick, { passive: true });
        }

        for (const line of this.lines) {

            if (this.skip) break;

            await this.type(line);

            // preserve original usage of innerHTML for typed characters
            this.output.innerHTML += "\n";

            await sleep(this.lineDelay);

        }

        if (this.skip) {
            // if the user skipped, ensure the full output is visible
            this.output.textContent = this.lines.join("\n");
        }

        this.finished = true;

        if (this.enter && this.enter.classList) this.enter.classList.add("show");

    }

    async type(text) {

        for (const character of text) {

            if (this.skip) return;

            this.output.innerHTML += character;

            await sleep(this.charSpeed);

        }

    }

    skipBoot() {

        if (this.skip) return;

        this.skip = true;

        // immediately show full output and reveal the Enter UI
        try {
            this.output.textContent = this.lines.join("\n");
        } catch (e) {
            // ignore errors if output not ready
        }

        this.finished = true;
        try { this.enter.classList.add("show"); } catch (e) {}

    }

    async reveal() {

        if (!this.finished) return;

        // remove temporary listeners so they don't fire after hide
        try {
            if (this.screen && this._onTap) {
                this.screen.removeEventListener("click", this._onTap);
                this.screen.removeEventListener("touchstart", this._onTap);
            }
            if (this.enter && this._onEnterClick) {
                this.enter.removeEventListener("click", this._onEnterClick);
            }
        } catch (e) {}

        this.screen.classList.add("power-off");

        await sleep(700);

        try {
            // hide overlay and reveal site with inline styles to avoid CSS race conditions
            if (this.screen && this.screen.style) this.screen.style.display = 'none';
            if (this.site && this.site.style) {
                this.site.style.opacity = '1';
                this.site.style.visibility = 'visible';
                this.site.style.pointerEvents = 'auto';
                this.site.style.display = 'block';
            }
        } catch (e) {}

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
