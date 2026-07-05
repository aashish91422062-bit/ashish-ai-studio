/* ==========================================
   Ashish AI Studio
   Version : V2.0 FINAL
   File : script.js
   Part : 1/4
========================================== */

document.addEventListener("DOMContentLoaded", function () {

console.log("Ashish AI Studio V2.0 Loaded");

/* Welcome Message */

const pageTitle = document.title;

console.log("Current Page : " + pageTitle);

/* All Buttons */

const buttons = document.querySelectorAll("button");

buttons.forEach(function(button){

button.addEventListener("mouseenter",function(){

button.style.transform="scale(1.03)";

});

button.addEventListener("mouseleave",function(){

button.style.transform="scale(1)";

});

});

});
