/*
====================================================

                Ayoub Portfolio
                  script.js
                  Part 1

Boot Manager
CRT Startup
Reveal Animation

====================================================
*/

const bootScreen = document.getElementById("boot-screen");
const bootOutput = document.getElementById("boot-output");
const bootCursor = document.getElementById("boot-cursor");
const bootEnter = document.getElementById("boot-enter");

const site = document.getElementById("site");


function whoami(){

println("");

println("Ayoub");

println("IT Enthusiast");

println("Linux User");

println("Reverse Engineer");

println("Operating System Enjoyer");

println("");

}

function neofetch(){

println(`
                 ayoub@wired
────────────────────────────────────

OS: AyoubOS 1.0

Kernel: Linux 6.x

WM: Hyprland

Editor: Vim

Shell: bash

Language: C/C++

Location: Morocco

Theme: Orange

Status: ONLINE

Anime: Bleach

────────────────────────────────────
`);

}

async function lain(){

const lines=[

"Present Day...",

"Present Time...",

"",

"Let's all love Lain."

];

for(const line of lines){

await typeTerminal(line);

}

document.body.classList.add("glitch");

setTimeout(()=>{

document.body.classList.remove("glitch");

},2500);

}

async function typeTerminal(text){

return new Promise(resolve=>{

let i=0;

const p=document.createElement("pre");

terminalOutput.appendChild(p);

function write(){

if(i<text.length){

p.textContent+=text[i];

i++;

terminalOutput.scrollTop=terminalOutput.scrollHeight;

setTimeout(write,40);

}else{

resolve();

}

}

write();

});

}

function wiredMode(){

document.body.classList.add("wired");

println("");

println("CONNECTED TO THE WIRED");

println("");

}

function orangeMode(){

document.body.classList.remove("wired");

println("Disconnected.");

}

function hack(target){

println("");

println("Connecting...");

setTimeout(()=>println("Bypassing firewall..."),700);

setTimeout(()=>println("Decrypting..."),1400);

setTimeout(()=>println("Access denied."),2400);

}

function sudo(command){

if(command=="rm -rf /"){

println("");

println("Nice try.");

println("Permission denied.");

return;

}

println("sudo: command not permitted");

}

function reboot(){

location.reload();

}

let historyIndex=0;

terminalInput.addEventListener("keydown",function(e){

if(e.key=="ArrowUp"){

historyIndex=Math.max(0,historyIndex-1);

terminalInput.value=history[historyIndex]||"";

}

if(e.key=="ArrowDown"){

historyIndex=Math.min(history.length,historyIndex+1);

terminalInput.value=history[historyIndex]||"";

}

});

const konami=[

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

let k=0;

document.addEventListener("keydown",(e)=>{

if(e.key===konami[k]){

k++;

}else{

k=0;

}

if(k===konami.length){

developerMode();

k=0;

}

});

function developerMode(){

println("");

println("Developer Mode Unlocked.");

println("");

document.body.classList.toggle("wired");

}

setInterval(()=>{

if(Math.random()<0.25){

document.body.classList.add("glitch");

setTimeout(()=>{

document.body.classList.remove("glitch");

},120);

}

},6000);


/*======================================
            SETTINGS
======================================*/

const TYPE_SPEED = 18;
const LINE_DELAY = 140;

/*======================================
            BOOT TEXT
======================================*/

const bootLines = [

"AYOUB BIOS v1.0",
"",
"CPU ............... OK",
"Memory ............ 8192 MB",
"Storage ........... OK",
"Framebuffer ....... OK",
"Networking ........ OK",
"Filesystem ........ OK",
"Terminal .......... OK",
"",
"Loading Linux kernel...",
"",
"Mounting /home/ayoub...",
"",
"Connecting to the Wired...",
"",
"Handshake complete.",
"",
"Welcome, Ayoub.",
"",
"System ready."

];

/*======================================
            TYPEWRITER
======================================*/

let currentLine = 0;

async function typeBoot(){

    while(currentLine < bootLines.length){

        await typeLine(bootLines[currentLine]);

        bootOutput.innerHTML += "\n";

        currentLine++;

        await sleep(LINE_DELAY);

    }

    bootEnter.classList.add("show");

}

function typeLine(text){

    return new Promise(resolve=>{

        let i = 0;

        function write(){

            if(i < text.length){

                bootOutput.innerHTML += text.charAt(i);

                i++;

                setTimeout(write,TYPE_SPEED);

            }

            else{

                resolve();

            }

        }

        write();

    });

}

/*======================================
            HELPERS
======================================*/

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/*======================================
        POWER ON EFFECT
======================================*/

let bootFinished = false;

bootEnter.addEventListener("click",startWebsite);

document.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        startWebsite();

    }

});

async function startWebsite(){

    if(bootFinished) return;

    if(currentLine < bootLines.length) return;

    bootFinished = true;

    bootScreen.classList.add("power-off");

    await sleep(700);

    bootScreen.style.display="none";

    site.classList.add("active");

    introAnimation();

}

/*======================================
        INTRO ANIMATION
======================================*/

function introAnimation(){

    document.querySelectorAll(".panel").forEach((panel,index)=>{

        panel.style.opacity="0";

        panel.style.transform="translateY(30px)";

        setTimeout(()=>{

            panel.style.transition="all .7s";

            panel.style.opacity="1";

            panel.style.transform="translateY(0)";

        },index*120);

    });

}

/*======================================
        RANDOM CRT FLICKER
======================================*/

setInterval(()=>{

    document.body.classList.add("crt-flash");

    setTimeout(()=>{

        document.body.classList.remove("crt-flash");

    },55);

},12000);

/*======================================
        START
======================================*/

typeBoot();

/*====================================================

                Mini Shell

====================================================*/

const terminalInput =
document.getElementById("terminal-command");

const terminalOutput =
document.getElementById("terminal-output");

/*========================================

Filesystem

========================================*/

const filesystem={

"/home/ayoub":{

type:"dir",

children:[

"about.txt",

"skills.json",

"anime.txt",

"projects",

"gallery",

"contact.log"

]

},

"/home/ayoub/projects":{

type:"dir",

children:[

"android.txt",

"vita.txt"

]

},

"/home/ayoub/gallery":{

type:"dir",

children:[

"lain.gif",

"bleach.gif"

]

},

"about.txt":`

Name: Ayoub

Location: Morocco

Occupation: IT Enthusiast

Linux user.

Reverse engineer.

Graphics programmer.

`,

"skills.json":`

{

"Linux":"Advanced",

"C++":"Advanced",

"Reverse Engineering":"Advanced",

"Android":"Advanced",

"Graphics":"Intermediate"

}

`,

"anime.txt":`

Favorite Anime

--------------

Bleach

Serial Experiments Lain

Fate

Persona

Sword Art Online

`,

"contact.log":`

GitHub

https://github.com/deadbeef7

SpaceHey

https://spacehey.com/0xdeadbeef_ayoub

`,

"android.txt":`

Android Kernel Tweaks

---------------------

Recovered Galaxy Tab A7 Lite

GitHub Codespaces

Static LZ4

GPU Overclock

PowerVR Rogue GE8320

`,

"vita.txt":`

PlayStation Vita

Linux Port

Framebuffer

Reverse Engineering

GPU Research

`

};

let currentPath="/home/ayoub";

const history=[];

/*========================================

Prompt

========================================*/

function updatePrompt(){

document.querySelector(".terminal-input span")
.textContent=

`ayoub@wired:${currentPath.replace("/home/ayoub","~")}$`;

}

updatePrompt();

/*========================================

Print

========================================*/

function println(text=""){

const line=document.createElement("pre");

line.textContent=text;

terminalOutput.appendChild(line);

terminalOutput.scrollTop=
terminalOutput.scrollHeight;

}

function printCommand(cmd){

println(

`${document.querySelector(".terminal-input span").textContent} ${cmd}`

);

}
terminalInput.addEventListener("keydown",function(e){

if(e.key!=="Enter") return;

const command=
terminalInput.value.trim();

history.push(command);

printCommand(command);

execute(command);

terminalInput.value="";

});

function execute(command){

const args=
command.split(" ");

const cmd=args[0].toLowerCase();

switch(cmd){

case "help":

help();

break;

case "whoami":
    whoami();
    break;

case "date":
    println(new Date().toString());
    break;

case "neofetch":
    neofetch();
    break;

case "github":
    window.open("https://github.com/deadbeef7");
    println("Opening GitHub...");
    break;

case "spacehey":
    window.open("https://spacehey.com/0xdeadbeef_ayoub");
    println("Opening SpaceHey...");
    break;

case "projects":
    cd("projects");
    ls();
    break;

case "skills":
    cat("skills.json");
    break;

case "lain":
    lain();
    break;

case "wired":
    wiredMode();
    break;

case "orange":
    orangeMode();
    break;

case "reboot":
    reboot();
    break;

case "hack":
    hack(args.slice(1).join(" "));
    break;

case "sudo":
    sudo(args.slice(1).join(" "));
    break;

case "ls":

ls();

break;

case "pwd":

println(currentPath);

break;

case "cd":

cd(args[1]);

break;

case "cat":

cat(args[1]);

break;

case "clear":

terminalOutput.innerHTML="";

break;

case "history":

history.forEach(c=>println(c));

break;

default:

println(

`Unknown command: ${cmd}`

);

println(

"Type 'help'"

);

}

}

function help(){

println(`

Commands

--------

help

ls

pwd

cd

cat

clear

history

date

neofetch

projects

skills

github

spacehey

lain

bleach

wired

orange

reboot

`);

}

function ls(){

const dir=
filesystem[currentPath];

dir.children.forEach(file=>{

println(file);

});

}

function cd(folder){

if(!folder){

currentPath="/home/ayoub";

updatePrompt();

return;

}

if(folder==".."){

if(currentPath!="/home/ayoub"){

currentPath="/home/ayoub";

}

updatePrompt();

return;

}

const newPath=currentPath+"/"+folder;

if(filesystem[newPath]){

currentPath=newPath;

updatePrompt();

}

else{

println("Directory not found.");

}

}

function cat(file){

if(!file){

println("Usage: cat file");

return;

}

if(filesystem[file]){

println(filesystem[file]);

}

else{

println("File not found.");

}

}

