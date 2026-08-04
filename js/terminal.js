/*
========================================================

                terminal.js

Part 1

Terminal Engine
Input
History
Filesystem Integration

========================================================
*/

"use strict";

class Terminal {

    constructor(filesystem, theme) {

        this.fs = filesystem;
        this.theme = theme;

        this.output = $("#terminal-output");
        this.input = $("#terminal-command");
        this.promptElement = $(".terminal-input span");

        this.history = [];
        this.historyIndex = 0;

        this.busy = false;

    }

    /*==================================================
    Initialize
    ==================================================*/

    init() {

        this.updatePrompt();

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
                    this.tabComplete();
                    break;

            }

        });

    }

    /*==================================================
    Prompt
    ==================================================*/

    updatePrompt() {

        this.promptElement.textContent =
            `ayoub@wired:${this.fs.prompt()}$`;

    }

    /*==================================================
    Printing
    ==================================================*/

    print(text = "") {

        const pre = document.createElement("pre");

        pre.textContent = text;

        this.output.appendChild(pre);

        scrollBottom(this.output);

    }

    printCommand(command) {

        this.print(
`${this.promptElement.textContent} ${command}`
        );

    }

    async type(text, speed = 18) {

        this.busy = true;

        const pre = document.createElement("pre");

        this.output.appendChild(pre);

        for (const character of text) {

            pre.textContent += character;

            scrollBottom(this.output);

            await sleep(speed);

        }

        this.busy = false;

    }

    clear() {

        this.output.innerHTML = "";

    }

    /*==================================================
    Input
    ==================================================*/

    submit() {

        const command =
            this.input.value.trim();

        if (command === "")
            return;

        this.printCommand(command);

        this.history.push(command);

        this.historyIndex = this.history.length;

        this.execute(command);

        this.input.value = "";

    }

    /*==================================================
    History
    ==================================================*/

    historyUp() {

        if (this.history.length === 0)
            return;

        this.historyIndex--;

        if (this.historyIndex < 0)
            this.historyIndex = 0;

        this.input.value =
            this.history[this.historyIndex];

    }

    historyDown() {

        if (this.history.length === 0)
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

    /*==================================================
    Tab Completion
    ==================================================*/

    tabComplete() {

        const commands = [

            "help",
            "clear",
            "ls",
            "pwd",
            "cd",
            "cat",
            "history",
            "date",
            "whoami",
            "uname",
            "tree",
            "echo",
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

        const match =
            commands.find(command =>
                command.startsWith(value)
            );

        if (match)
            this.input.value = match;

    }

    /*==================================================
    Command Parser
    ==================================================*/

    execute(line) {

        const args =
            line.split(" ");

        const command =
            args.shift().toLowerCase();

        switch (command) {

            case "help":
                this.help();
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
            case "tutorial":
                  this.tutorial();
                  break;
              
              case "tree":
                  this.tree();
                  break;
              
              case "echo":
                  this.echo(args.join(" "));
                  break;
              
              case "history":
                  this.historyCommand();
                  break;
              
              case "date":
                  this.date();
                  break;
              
              case "uname":
                  this.uname();
                  break;
              
              case "whoami":
                  this.whoami();
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
              
              case "neofetch":
                  this.neofetch();
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

    /*==================================================
    Filesystem Commands
    ==================================================*/

    ls() {

        const files =
            this.fs.ls();

        files.forEach(file => {

            this.print(file);

        });

    }

    tutorial() {
      
      this.print(`
      
      ============================
      
      Terminal Tutorial
      
      ============================
      
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
      
          Read a file
      
      Useful
      
      help
      
      neofetch
      
      history
      
      tree
      
      Fun
      
      wired
      
      orange
      
      lain
      
      hack internet
      
      Portfolio
      
      github
      
      spacehey
      
      Enjoy exploring!
      
      `);
      
      }

    cd(folder) {

        if (this.fs.cd(folder)) {

            this.updatePrompt();

        } else {

            this.print(
"Directory not found."
            );

        }

    }

    cat(file) {

        const content =
            this.fs.cat(file);

        if (!content) {

            this.print(
"File not found."
            );

            return;

        }

        this.print(content);

    }

    /*==================================================
    Help
    ==================================================*/

    help() {

        this.print(

`Available Commands

help

clear

ls

pwd

cd

cat

history

date

whoami

uname

tree

echo

neofetch

github

spacehey

wired

orange

lain

hack

sudo

reboot`

        );

    }

    /*==================================================
    Unknown
    ==================================================*/

    unknown(command) {

        this.print(

    `Unknown command:

      ${command}

    Type "help".`

        );

    }
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
  echo(text) {

    this.print(text);

    }
  date() {

  this.print(new Date().toString());

  }
  whoami() {

    this.print("Ayoub");

    this.print("IT Enthusiast");

    this.print("Linux User");

  }
  uname() {

  this.print(

  "Linux wired 6.16.0 AyoubOS x86_64 GNU/Linux"

  );

    uname() {

this.print(

"Linux wired 6.16.0 AyoubOS x86_64 GNU/Linux"

);

  }

 historyCommand() {

this.history.forEach((command,index)=>{

this.print(

`${index+1}  ${command}`

);

this.print("press lain did you know there are hidden commands ?");

});

}
    github(){

window.open(

"https://github.com/deadbeef7",

"_blank"

);

}


    spacehey(){

window.open(

"https://spacehey.com/0xdeadbeef_ayoub",

"_blank"

);

}
  }
}
/*==================================================
Neofetch
==================================================*/

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

Language:  C, C++, JavaScript

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

/*==================================================
Theme
==================================================*/

wired(){

this.theme.setWired();

this.print("");

this.print("Connected to The Wired.");

this.print("");

}

orange(){

this.theme.setOrange();

this.print("Orange mode restored.");

}

/*==================================================
Hack
==================================================*/

async hack(target){

if(!target){

target="localhost";

}

this.busy=true;

const steps=[

`Connecting to ${target}...`,

"Scanning ports...",

"Searching vulnerabilities...",

"Attempting privilege escalation...",

"Injecting payload...",

"Downloading secrets...",

"ERROR",

"Access denied."

];

for(const step of steps){

await this.type(step,40);

}

this.busy=false;

}

/*==================================================
Lain
==================================================*/

async lain(){

this.busy=true;

await this.type("Present Day...",45);

await sleep(500);

await this.type("Present Time...",45);

await sleep(700);

await this.type("Let's all love Lain.",45);

this.theme.setWired();

document.body.classList.add("glitch");

setTimeout(()=>{

document.body.classList.remove("glitch");

},2500);

this.busy=false;

}

/*==================================================
sudo
==================================================*/

sudo(command){

if(command==="rm -rf /"){

this.print("");

this.print("Nice try :)");

this.print("Permission denied.");

return;

}

this.print("sudo: permission denied");

}

/*==================================================
Reboot
==================================================*/

reboot(){

location.reload();

}

/*==================================================
Hints
==================================================*/

hint(){

const hints=[

'Tip: try "tutorial".',

'Hint: type "lain".',

'Hint: the Japanese title is clickable.',

'Did you know? Press ↑ for command history.',

'Tip: try "wired".'

];

this.print("");

this.print(

hints[random(0,hints.length-1)]

);

}
