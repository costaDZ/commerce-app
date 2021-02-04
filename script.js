/*=================navbar=====================*/
// hover efect 
const navTitles = document.querySelectorAll(".category li");
const header = document.querySelector("header");

document.querySelector("body").addEventListener("mouseover", (e) => {
    let section = {
        "MENS": document.querySelector(".MENS"),
        "WOMENS": document.querySelector(".WOMENS")
    };
    // check if the cursore in above the title
    let target = checkParentElement(e.target, Object.getOwnPropertyNames(section));

    if (target) {
        hideSection(section);
        showSection(section[target]);
    } else {
        hideSection(section);
    }

});

///helper function to chech the aria of the target
function checkParentElement(target, section) {
    for (; target && target !== document; target = target.parentElement) {
        for (sec of section) {
            if (target.classList.contains(sec) || target.textContent == sec) {
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
        changeHeight(100);
    }
}

// helper functio hide all sections 
function hideSection(section) {
    for (let i in section) {
        section[i].style.transform = "translateY(-102%)";
        changeHeight(0);
    }
}

/// helper function to chnge the width of target <li>
function changeHeight(width) {
    navTitles.forEach(li => { li.style.height = `${width}px`; })
}






// if ((checkParentElement(e.target, "MENS"))) {
//     mensSection.style.transform = "translateY(0)";
//     changeHeight(100);
// } else {
//     changeHeight(0);
//     mensSection.style.transform = "translateY(-102%)";
// }

// if ((checkParentElement(e.target, "WOMENS"))) {
//     womenSection.style.transform = "translateY(0)";
//     changeHeight(100);
// } else {
//     changeHeight(0);
//     womenSection.style.transform = "translateY(-102%)";
// }






//===================== image slider=================//
const arrows = document.querySelectorAll(".arrow");
/// select items
const imageItems = document.querySelectorAll(".item");
///selet bullets
const bullets = document.querySelectorAll(".bullet");

//let position = 0;
let getBullet = 1;

// add gay color to an arrow when loading the document
if (getBullet === 0) {
    arrows[1].style.color = "gray";
}

//=========> set the events to my arrows
arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        if (arrow.classList.contains("fa-long-arrow-alt-right")) {
            changeTheItem(0);
        } else {
            changeTheItem(3);
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
    //get the index of the current bullet
    getBullet = [...bullets].indexOf(b);
    // change the position
    changeTheItem(getBullet);
    // clear all the color of the bullet
    clearBullets(getBullet);
    // change the number of the posotion 
    checkPosition(getBullet)
}

let interval = setInterval(() => {
    getBullet++;
    if (getBullet >= imageItems.length - 1) {
        getBullet = 0;
    }
    changeTheItem(getBullet);
}, 3000)

// function to chnge items
function changeTheItem(position) {
    // chek the position
    if (getBullet !== position) {
        position === 0 ? getBullet -= 1 : getBullet += 1;
    }
    imageItems.forEach(img => {
        img.style.transform = `translateX(${getBullet * (-200)}%)`;
    });
    // call the helper functions
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

