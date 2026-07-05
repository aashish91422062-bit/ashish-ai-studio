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

/* ==========================================
   Part : 2/4
   Navigation & Dashboard
========================================== */

/* Navigation */

function goTo(page){
    window.location.href = page;
}

/* Dashboard Buttons */

const dashboardButtons = document.querySelectorAll(".dashboard-btn");

dashboardButtons.forEach(function(btn){

    btn.addEventListener("click", function(){

        const page = btn.getAttribute("data-page");

        if(page){
            goTo(page);
        }

    });

});

/* Common Buttons */

const homeBtn = document.getElementById("homeBtn");

if(homeBtn){

    homeBtn.addEventListener("click",function(){

        goTo("index.html");

    });

}

/* Contact Button */

const contactBtn = document.getElementById("contactBtn");

if(contactBtn){

    contactBtn.addEventListener("click",function(){

        goTo("contact.html");

    });

}

/* ==========================================
   Part : 3/4
   Forms & User Actions
========================================== */

/* Login Form */

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Login feature will be connected soon.");

window.location.href="dashboard.html";

});

}

/* Signup Form */

const signupForm = document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Account created successfully.");

window.location.href="login.html";

});

}

/* Contact Form */

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Your message has been received.");

contactForm.reset();

});

}

/* AI Buttons */

const aiButtons=document.querySelectorAll(".ai-btn");

aiButtons.forEach(function(button){

button.addEventListener("click",function(){

alert("This AI feature will be available after API integration.");

});

});

/* ==========================================
   Part : 4/4
   Utilities & Final
========================================== */

/* Loading Effect */

window.addEventListener("load", function () {
    document.body.classList.add("fade-in");
});

/* Smooth Scroll */

document.querySelectorAll('a[href^="#"]').forEach(function(link){

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

/* Future Dark Mode */

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

}

/* Future Notification */

function showNotification(message){

    alert(message);

}

/* Version */

console.log("Ashish AI Studio");
console.log("Version : V2.0 FINAL");
console.log("Status : Ready for AI Integration");

/* ==========================================
   End of script.js V2.0 FINAL
========================================== */
