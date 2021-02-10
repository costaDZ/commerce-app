/*============================================*/
// navbar
/*============================================*/
// my elements
const navTitles = document.querySelectorAll(".category li");
const header = document.querySelector("header");
const landing = document.querySelector(".landing-page");
const gbp = document.querySelector(".languges");
const log = document.querySelector("#log");

const slider = document.querySelector(".slider-goods");
const bagLogo = document.querySelector(".bag-logo");

//======= show and hide slider slider ========// 
bagLogo.addEventListener("click", () => {
    showHide("show");
    landing.style.filter = "brightness(0.5)";

});

document.querySelector(".fa-times").addEventListener("click", () => {
    showHide("hide");
});

document.addEventListener("click", (e) => {
    let element = e.target;
    if (!ckeckArea(element)) {
        showHide("hide");
    }
});

function showHide(order) {
    order === "show" ? slider.style.transform = "translateX(0%)"
        : slider.style.transform = "translateX(100%)"
    landing.style.filter = "";
}

/// helper function to check the position of the mouse click
function ckeckArea(element) {
    while (element &&
        (element = element.parentElement)
        && element !== document) {
        if (element.classList.contains("slider-goods")
            || element.classList.contains("bag-logo")) {
            return true;
        }
    }
}
//======= show and hide slider slider ========// 

//======= show and hide log in && contries ========// 
// add evenet to log in btn
log.addEventListener("click", (e) => {
    e.preventDefault();
    showTarget(log, ".LOG");
})

// add event to contries btn
gbp.addEventListener("click", () => {
    showTarget(gbp, ".GBP");
});

///callback function
function showTarget(target, cla) {
    document.querySelector(`${cla}`).style.transform = "translateY(0)";
    target.style.height = `113px`;
}
//======= show and hide log in && contries ========// 

//=================== hover lists ========================// 
// set the section of the nav to an objects
let section = {
    "MENS": document.querySelector(".MENS"),
    "WOMENS": document.querySelector(".WOMENS"),
    "ACCESSORIES": document.querySelector(".ACCESSORIES"),
    "DISCOVER": document.querySelector(".DISCOVER"),
    "GBP": document.querySelector(".GBP"),
    "LOG": document.querySelector(".LOG"),
};


//======= fixe navbar ========// 
// fixe vabar and all the elements
document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    let navHeight = navbar.offsetHeight;

    console.log(window.pageYOffset);
    if (navHeight < window.pageYOffset) {
        fixeNavbar(navbar, "fixed");
    } else {
        fixeNavbar(navbar, "absolute");
        navbar.style.position = `${"relative"}`;
    }
});

/// call back function to set the position of navbar
function fixeNavbar(navbar, position) {
    for (s in section) {
        section[s].style.position = `${position}`;
    }
    navbar.style.position = `${position}`;
    slider.style.position = `${position}`;
}
//======= fixe navbar ========// 

//======= show lists ========// 
// add event to the document to get the position of the cursor
document.querySelector("body").addEventListener("mouseover", (e) => {
    // check if the cursore in above the title
    let target = checkElement(e.target, Object.getOwnPropertyNames(section));
    if (target) {
        hideSection(section);
        showSection(section[target]);
        changeHeight(100);
    } else {
        hideSection(section);
        changeHeight(0);
    }
});

///helper function to check the aria of the target [text + content and the classes of parent element]
function checkElement(target, section) {
    while (target !== document && (target = target.parentElement)) {
        for (sec of (section)) {
            if (target.classList.contains(sec)
                || target.textContent === sec) {
                return sec;
            }
        }
    }
    return false;
}

/// helper function to trgger the targe section
function showSection(test) {
    if (test) {
        test.style.transform = "translateY(0%)";
        landing.classList.add("darken");
    }
}

/// helper functio hide all sections 
function hideSection(section) {
    for (let i in section) {
        section[i].style.transform = "translateY(-103%)";
        gbp.style.height = `0`;
        log.style.height = `0`;
    }
    landing.classList.remove("darken");
}



/// helper function to chnge the width of target <li>
function changeHeight(height) {
    navTitles.forEach(li => li.style.height = `${height}px`);
}


//======= slider image ========//
const arrows = document.querySelectorAll(".arrow");
const imageItems = document.querySelectorAll(".item");
const bullets = document.querySelectorAll(".bullet");

let getBullet = 1;

// add gay color to an arrow when loading the document
if (getBullet === 0) arrows[1].style.color = "gray";

//=========> set the events to my arrows
arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        if (arrow.classList.contains("fa-long-arrow-alt-right")) {
            changeItem(0);
        } else {
            changeItem(3);
        }
        clearInterval(interval);
    });
});

//==========> add events to bullets
bullets.forEach(b => {
    b.addEventListener("click", () => { hoverbullet(b) });
});

/// helper function t active the target bullet
function hoverbullet(b) {
    getBullet = [...bullets].indexOf(b);
    changeItem(getBullet);
    clearBullets(getBullet);
    checkPosition(getBullet)
}
// set the transform automatic
let interval = setInterval(() => {
    getBullet++;
    if (getBullet >= imageItems.length - 1) {
        getBullet = 0;
    }
    changeItem(getBullet);
}, 3000)

// function to chnge items
function changeItem(position) {
    // chek the position
    if (getBullet !== position) {
        position === 0 ? getBullet -= 1 : getBullet += 1;
    }
    imageItems.forEach(img => {
        img.style.transform = `translateX(${getBullet * (-200)}%)`;
    });
    clearBullets(getBullet);
    checkPosition(getBullet);
}

/// hlper function to clear all the bullets
function clearBullets(target) {
    bullets.forEach(b => {
        b.classList.remove("active");
    });
    // active the target bullet
    [...bullets][target].classList.add("active");
}

/// helper function to check the position
function checkPosition(pos) {
    if (pos === 3) {
        arrows[0].style.color = "gray";
        arrows[1].removeAttribute("style");

    } else if (pos === 0) {
        arrows[1].style.color = "gray";
        arrows[0].removeAttribute("style");

    } else {
        arrows[0].removeAttribute("style");
        arrows[1].removeAttribute("style");
    }
}



