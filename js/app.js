/*
========================================================

                app.js

Main Application

========================================================
*/

"use strict";

class App{

constructor(){

this.boot=new BootManager();

this.theme=new ThemeManager();

this.fs=new FileSystem();

this.terminal=new Terminal(

this.fs,

this.theme

);
  this.eggs = new EasterEggs(this);

}

init(){

this.boot.start();

this.terminal.init();
this.eggs.init();

document.addEventListener("keydown",(event)=>{

if(event.key==="Enter" && this.boot.finished){

this.boot.reveal();

}

});

$("#boot-enter").addEventListener("click",()=>{

this.boot.reveal();

});

}

}

window.addEventListener(

"DOMContentLoaded",

()=>{

const app=new App();

app.init();

window.app=app;

}

);
