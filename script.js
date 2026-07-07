// Ashish AI Studio V4

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

let menuOpen = false;

menuBtn.addEventListener("click", () => {

    if (!menuOpen) {

        sideMenu.style.left = "0";

        menuOpen = true;

    } else {

        sideMenu.style.left = "-260px";

        menuOpen = false;

    }

});

// Menu के बाहर क्लिक करने पर Menu बंद हो जाएगा

document.addEventListener("click", function(e){

    if(
        menuOpen &&
        !sideMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){

        sideMenu.style.left="-260px";

        menuOpen=false;

    }

});
