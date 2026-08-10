/*
========================================================

                terminal.js
                Part 1

Core terminal engine
Input handling
History
Command parser

========================================================
*/

"use strict";

class Terminal {

    constructor(filesystem, theme) {

        this.fs = filesystem;
        this.theme = theme;

        this.output = document.querySelector("#terminal-output");
        this.input = document.querySelector("#terminal-command");
        this.prompt = document.querySelector(".terminal-input span");

        this.history = [];
        this.historyIndex = 0;

        this.commandCounter = 0;

        this.busy = false;

    }

    /*=========================================
        Initialization
    =========================================*/

    init() {

        this.updatePrompt();

        this.print("");
        this.print("========================================");
        this.print("        AyoubOS Terminal v2.1");
        this.print("========================================");
        this.print("");
        this.print("Welcome to my interactive portfolio.");
        this.print("");
        this.print("Type 'tutorial' if you're new.");
        this.print("Type 'help' to list commands.");
        this.print("");

        this.input.focus();

        this.input.addEventListener("keydown", (event) => {

            if (this.busy)
                return;

            switch (event.key) {

                case "Enter":
                    this.submit();
                    break;

                case "ArrowUp":
                    event.preventDefault();
                    this.historyUp();
                    break;

                case "ArrowDown":
                    event.preventDefault();
                    this.historyDown();
                    break;

                case "Tab":
                    event.preventDefault();
                    this.complete();
                    break;

            }

        });

    }

    /*=========================================
        Prompt
    =========================================*/

    updatePrompt() {

        this.prompt.textContent =
            `ayoub@wired:${this.fs.prompt()}$`;

    }

    /*=========================================
        Output
    =========================================*/

    print(text = "") {

        const pre = document.createElement("pre");

        pre.textContent = text;

        this.output.appendChild(pre);

        this.output.scrollTop =
            this.output.scrollHeight;

    }

    async type(text, speed = 20) {

        this.busy = true;

        const pre = document.createElement("pre");

        this.output.appendChild(pre);

        for (const ch of text) {

            pre.textContent += ch;

            this.output.scrollTop =
                this.output.scrollHeight;

            await sleep(speed);

        }

        this.busy = false;

    }

    command(text) {

        this.print(

`${this.prompt.textContent} ${text}`

        );

    }

    clear() {

        this.output.innerHTML = "";

    }

    /*=========================================
        Input
    =========================================*/

    submit() {

        const value =
            this.input.value.trim();

        if (value === "")
            return;

        this.command(value);

        this.history.push(value);

        this.historyIndex =
            this.history.length;

        this.execute(value);

        this.input.value = "";

    }

    /*=========================================
        History
    =========================================*/

    historyUp() {

        if (!this.history.length)
            return;

        this.historyIndex--;

        if (this.historyIndex < 0)
            this.historyIndex = 0;

        this.input.value =
            this.history[this.historyIndex];

    }

    historyDown() {

        if (!this.history.length)
            return;

        this.historyIndex++;

        if (this.historyIndex >= this.history.length) {

            this.historyIndex =
                this.history.length;

            this.input.value = "";

            return;

        }

        this.input.value =
            this.history[this.historyIndex];

    }

    /*=========================================
        Tab completion
    =========================================*/

    complete() {

        const commands = [

            "help",
            "tutorial",
            "clear",
            "ls",
            "pwd",
            "cd",
            "cat",
            "tree",
            "history",
            "echo",
            "date",
            "whoami",
            "uname",
            "neofetch",
            "github",
            "spacehey",
            "wired",
            "orange",
            "lain",
            "hack",
            "sudo",
            "reboot"

        ];

        const value =
            this.input.value.trim();

        const match = commands.find(cmd =>
            cmd.startsWith(value)
        );

        if (match)
            this.input.value = match;

    }

    /*=========================================
        Parser
    =========================================*/

    execute(line) {

        this.commandCounter++;

        if (this.commandCounter % 5 === 0) {

            this.randomHint();

        }

        const args =
            line.split(" ");

        const command =
            args.shift().toLowerCase();

        switch (command) {

            case "help":
                this.help();
                break;

            case "tutorial":
                this.tutorial();
                break;

            case "clear":
                this.clear();
                break;

            case "pwd":
                this.print(this.fs.pwd());
                break;

            case "ls":
                this.ls();
                break;

            case "cd":
                this.cd(args[0]);
                break;

            case "cat":
                this.cat(args[0]);
                break;

            case "tree":
                this.tree();
                break;

            case "history":
                this.historyCommand();
                break;

            case "echo":
                this.echo(args.join(" "));
                break;

            case "date":
                this.date();
                break;

            case "whoami":
                this.whoami();
                break;

            case "uname":
                this.uname();
                break;

            case "neofetch":
                this.neofetch();
                break;

            case "github":
                this.github();
                break;

            case "spacehey":
                this.spacehey();
                break;

            case "wired":
                this.wired();
                break;

            case "orange":
                this.orange();
                break;

            case "lain":
                this.lain();
                break;

            case "hack":
                this.hack(args.join(" "));
                break;

            case "sudo":
                this.sudo(args.join(" "));
                break;

            case "reboot":
                this.reboot();
                break;

            default:
                this.unknown(command);

        }

    }

    /*=========================================
        Filesystem
    =========================================*/

    ls() {

        const list = this.fs.ls();

        list.forEach(item => {

            this.print(item);

        });

    }

    cd(folder) {

        if (this.fs.cd(folder)) {

            this.updatePrompt();

        } else {

            this.print("Directory not found.");

        }

    }

    cat(file) {

        const content =
            this.fs.cat(file);

        if (content === null) {

            this.print("File not found.");

            return;

        }

        this.print(content);

    }

    /*=========================================
        PART 2 CONTINUES HERE
    =========================================*/
    /*=========================================
        Help
    =========================================*/

    help() {

        this.print(`
==============================

AyoubOS Commands

==============================

Filesystem

ls
pwd
cd
cat
tree

System

help
tutorial
clear
history
date
whoami
uname
echo

Portfolio

neofetch
github
spacehey

Themes

wired
orange

Fun

lain
hack
sudo
reboot

Tip:
Type "tutorial" if you're new.

`);

    }

    /*=========================================
        Tutorial
    =========================================*/

    tutorial() {

        this.print(`
========================================

Terminal Tutorial

========================================

Navigation

ls
    List files

pwd
    Show current directory

cd projects
    Enter a directory

cd ..
    Go back

cat about.txt
    Read a text file

Useful Commands

help
tutorial
neofetch
tree
history

Fun Commands

wired
orange
lain
hack internet

Portfolio

github
spacehey

Have fun exploring :)

`);

    }

    /*=========================================
        Tree
    =========================================*/

    tree() {

        this.print(`
~

├── about.txt
├── anime.txt
├── notes.txt
├── skills.json
├── projects
│   ├── android.txt
│   ├── vita.txt
│   └── portfolio.txt
└── gallery
    ├── lain.gif
    ├── bleach.gif
    └── wired.gif

`);

    }

    /*=========================================
        History
    =========================================*/

    historyCommand() {

        if (this.history.length === 0) {

            this.print("History is empty.");

            return;

        }

        this.history.forEach((command, index) => {

            this.print(

`${index + 1}  ${command}`

            );

        });

    }

    /*=========================================
        Echo
    =========================================*/

    echo(text) {

        this.print(text);

    }

    /*=========================================
        Date
    =========================================*/

    date() {

        this.print(

new Date().toString()

        );

    }

    /*=========================================
        Whoami
    =========================================*/

    whoami() {

        this.print("Ayoub");
        this.print("IT Enthusiast");
        this.print("Linux User");
        this.print("Randomly Reverse Engineer");

    }

    /*=========================================
        Uname
    =========================================*/

    uname() {

        this.print(

"Linux wired 6.16.0 AyoubOS x86_64 GNU/Linux"

        );

    }

    /*=========================================
        Neofetch
    =========================================*/

    neofetch() {

        this.print(`

                 ayoub@wired
────────────────────────────────────

OS:        AyoubOS 2.1

Kernel:    Linux 6.x

Shell:     Ayoub Shell

Terminal:  Portfolio Terminal

WM:        Hyprland

Editor:    Vim

Languages:

• C

• C++

• JavaScript

Focus:

• Linux

• Android

• Reverse Engineering

• Graphics Programming

Anime:

Bleach

Serial Experiments Lain

────────────────────────────────────

`);

    }

    /*=========================================
        Portfolio Links
    =========================================*/

    github() {

        window.open(
            "https://github.com/deadbeef7",
            "_blank"
        );

    }

    spacehey() {

        window.open(
            "https://spacehey.com/0xdeadbeef_ayoub",
            "_blank"
        );

    }

    /*=========================================
        Themes
    =========================================*/

    wired() {

        this.theme.setWired();

        this.print("");
        this.print("Connected to The Wired.");
        this.print("");

    }

    orange() {

        this.theme.setOrange();

        this.print("Orange mode restored.");

    }

    /*=========================================
        Hack Simulator
    =========================================*/

    async hack(target) {

        if (!target)
            target = "localhost";

        this.busy = true;

        const messages = [

            `Connecting to ${target}...`,
            "Scanning ports...",
            "Looking for vulnerabilities...",
            "Attempting privilege escalation...",
            "Uploading payload...",
            "Downloading classified files...",
            "",
            "ERROR",
            "ACCESS DENIED"

        ];

        for (const line of messages) {

            await this.type(line, 35);

        }

        this.busy = false;

    }

    /*=========================================
        Lain
    =========================================*/

    async lain() {

        this.busy = true;

        await this.type("Present Day...", 45);

        await sleep(500);

        await this.type("Present Time...", 45);

        await sleep(700);

        await this.type("please browse j946@5488aa97464", 45);

        this.theme.setWired();

        document.body.classList.add("glitch");

        setTimeout(() => {

            document.body.classList.remove("glitch");

        }, 2000);

        this.busy = false;

    }

    /*=========================================
        sudo
    =========================================*/

    sudo(command) {

        if (command === "rm -rf /") {

            this.print("");
            this.print("Nice try :)");
            this.print("Permission denied, or is it ?");

            return;

        }

        if (command === "make me a sandwich") {

            this.print("Okay.");

            return;

        }

        this.print("sudo: permission denied");

    }

    /*=========================================
        Reboot
    =========================================*/

    reboot() {

        location.reload();

    }

    /*=========================================
        Unknown Command
    =========================================*/

    unknown(command) {

        this.print(
            `Unknown command: ${command}`
        );

        this.print(
            "Type 'help' to list available commands."
        );

    }

    /*=========================================
        Random Hint
    =========================================*/

    randomHint() {

        const hints = [

            "Tip: Try 'tutorial'.",
            "Hint: Type 'lain'.",
            "Hint: Try 'neofetch'.",
            "Did you know? Press ↑ for command history.",
            "Hint: 'wired' changes the theme.",
            "There are hidden commands...",
            "Try exploring the filesystem."

        ];

        const hint =
            hints[Math.floor(Math.random() * hints.length)];

        this.print("");
        this.print(hint);
        this.print("");

    }

}
