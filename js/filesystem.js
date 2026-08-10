/*
========================================================

                filesystem.js

Virtual Linux filesystem used by the
portfolio terminal.

========================================================
*/

"use strict";

class FileSystem {

    constructor() {

        this.home = "/home/ayoub";

        this.cwd = this.home;

        /*=========================================
        Directories
        =========================================*/

        this.directories = {

            "/": [
                "home",
                "etc",
                "usr",
                "bin"
            ],

            "/home": [
                "ayoub"
            ],

            "/home/ayoub": [
                "about.txt",
                "skills.json",
                "anime.txt",
                "projects",
                "gallery",
                "notes.txt"
            ],

            "/home/ayoub/projects": [
                "android.txt",
                "vita.txt",
                "portfolio.txt"
            ],

            "/home/ayoub/gallery": [
                "lain.gif",
                "bleach.gif",
                "wired.gif"
            ]

        };

        /*=========================================
        Files
        =========================================*/

        this.files = {

            "about.txt":

`Name: Ayoub

Location: Morocco

Linux User

Reverse Engineer

Graphics Programmer

Welcome to The Wired.
`,

            "skills.json":

`{
    "Linux":"Advanced",
    "C":"Advanced",
    "C++":"Advanced",
    "JavaScript":"Advanced",
    "Android Tweaking":"Advanced",
    "Reverse Engineering":"Advanced"
}`,

            "anime.txt":

`Favorite Anime

- Bleach
- Serial Experiments Lain
- Fate
- Persona
- Sword Art Online
- JJK
`,

            "notes.txt":

`Things to do

- Finish portfolio (done)
- Reverse engineer more hardware
- Build my own OS
- Get a job
`,

            "android.txt":

`Android Kernel Tweaks

• Root
• TWRP
• Static LZ4
• GPU Overclock
• Bootloader Research
`,

            "vita.txt":

`PlayStation Vita Linux

Framebuffer

Kernel Research

GPU Driver Experiments
`,

            "portfolio.txt":

`This website was built entirely
using HTML, CSS and JavaScript.

No frameworks.
No libraries.
Just code.
`

        };

    }

    /*=========================================
    Current Directory
    =========================================*/

    pwd() {

        return this.cwd;

    }

    /*=========================================
    Prompt
    =========================================*/

    prompt() {

        return this.cwd.replace(this.home, "~");

    }

    /*=========================================
    Directory Exists
    =========================================*/

    exists(path) {

        return this.directories[path] !== undefined;

    }

    /*=========================================
    List Directory
    =========================================*/

    ls() {

        return this.directories[this.cwd] || [];

    }

    /*=========================================
    Change Directory
    =========================================*/

    cd(folder) {

        if (!folder || folder === "~") {

            this.cwd = this.home;

            return true;

        }

        if (folder === "/") {

            this.cwd = "/";

            return true;

        }

        if (folder === "..") {

            if (this.cwd === "/")
                return true;

            const split = this.cwd.split("/");

            split.pop();

            this.cwd = split.join("/") || "/";

            return true;

        }

        let target;

        if (folder.startsWith("/")) {

            target = folder;

        } else {

            target = this.cwd + "/" + folder;

        }

        if (this.exists(target)) {

            this.cwd = target;

            return true;

        }

        return false;

    }

    /*=========================================
    Read File
    =========================================*/

    cat(file) {

        if (!file)
            return null;

        return this.files[file] || null;

    }

    /*=========================================
    Is File
    =========================================*/

    isFile(name) {

        return this.files[name] !== undefined;

    }

    /*=========================================
    Is Directory
    =========================================*/

    isDirectory(name) {

        const path = this.cwd + "/" + name;

        return this.directories[path] !== undefined;

    }

}
