/*============================================*/
// navbar
/*============================================*/
// my elements
const navTitles = document.querySelectorAll(".category li");
const header = document.querySelector("header");
const landing = document.querySelector(".landing-page");
const gbp = document.querySelector(".languges");

const log = document.querySelector("#log");
const logIcon = document.querySelector(".user-icon");
const logSection = document.querySelector(".LOG")

const langSection = document.querySelector(".GBP")

const slider = document.querySelector(".slider-goods");
const bagLogo = document.querySelector(".bag-logo");

const menuList = document.querySelector(".menu-list");
const humberger = document.querySelector(".humberg");

//======= show and hide sliders  ========// 
let elements = [];
bagLogo.addEventListener("click", () => {
    if (menuList.classList.contains("show")) {
        showHide(elements[0], elements[1]);
    }
    elements[0] = slider;
    elements[1] = "100%";
    showHide(slider, "100%");
});

humberger.addEventListener("click", () => {
    if (slider.classList.contains("show")) {
        showHide(elements[0], elements[1]);
    }
    elements[0] = menuList;
    elements[1] = "-100%";
    showHide(menuList, "-100%");
});

document.querySelectorAll(".slider-cls").forEach(fa => {
    fa.addEventListener("click", () => {
        showHide(elements[0], elements[1]);
    })
})


function showHide(target, show, hide = "0") {
    if (target.classList.contains("show")) {
        target.style.transform = `translateX(${show})`;
        target.classList.remove("show");
    } else {
        target.style.transform = `translateX(${hide})`;
        target.classList.add("show");
    }
}

//======= show and hide log in && contries ========// 
// add evenet to log in btn
log.addEventListener("click", (e) => {
    e.preventDefault();
    toggelClass(logSection);
});

logIcon.addEventListener("click", () => {
    toggelClass(logSection);
});

// add event to contries btn
gbp.addEventListener("click", () => {
    toggelClass(langSection);
});

/*========lang in menu bar======*/
const menuGbp = document.querySelector("#gbp");
menuGbp.addEventListener("click", () => {
    const contries = document.querySelector(".menu-contries")
    contries.classList.toggle("show-lang")
    let direction = contries.classList.contains("show-lang") ? "up" : "down";
    menuGbp.lastElementChild.setAttribute("class", `fas fa-angle-${direction}`);
})


//======= helper functions ========// 
// toggle classes
function toggelClass(item) {
    item.classList.toggle("show-log");
}

// check the click area in the document
document.addEventListener("click", (e) => {
    let element = e.target;

    if (elements.length > 0) {
        if (!ckeckArea(element) && (elements[0].classList.contains("show"))) {
            showHide(elements[0], elements[1]);
        }
    }

    if ((!checksection(element))) {
        logSection.classList.remove("show-log");
        langSection.classList.remove("show-log");
    }
});

// helper function to check the position of the mouse click
function ckeckArea(element) {
    while (element &&
        (element = element.parentElement)
        && element !== document) {
        if (element.classList.contains("slider-goods")
            || element.classList.contains("humberg")
            || element.classList.contains("menu-list")
            || element.classList.contains("bag-logo")) {
            return true;
        }
    }
}
// helper function to check the position of the mouse click
function checksection(element) {
    while (element
        && (element = element.parentElement)
        && element !== document
    ) {
        if (element.dataset.kind == "GBP"
            || element.dataset.kind == "LOG") {
            return true
        }
    }
}


//=================== hover lists ========================// 
// set the section of the nav to an objects
let section = {
    "MENS": document.querySelector(".MENS"),
    "WOMENS": document.querySelector(".WOMENS"),
    "ACCESSORIES": document.querySelector(".ACCESSORIES"),
    "DISCOVER": document.querySelector(".DISCOVER")
};

//======= fixe navbar ========// 
// fixe vabar and all the elements
// document.addEventListener("scroll", () => {
//     const navbar = document.querySelector(".navbar");
//     let navHeight = navbar.offsetHeight;


//     // if (window.pageYOffset > 0 && navHeight + 100 > window.pageYOffset) {
//     //     landing.style.cssText = `z-index : 5;`
//     // } else {
//     //     landing.style.cssText = `z-index : 1;`
//     // }

//     if (navHeight < window.pageYOffset) {
//         fixeNavbar(navbar, "fixed");
//     } else {
//         fixeNavbar(navbar, "absolute");
//         navbar.style.position = `${"relative"}`;
//         slider.style.cssText = `top: 0; position:absolute;`
//         menuList.style.cssText = `top: 0; position:absolute;`
//     }
// });

/// call back function to set the position of navbar
// function fixeNavbar(navbar, position) {
//     navbar.style.position = `${position}`;
//     slider.style.cssText = `Top: 4.4rem; position:${position};`
//     menuList.style.cssText = `Top: 4.4rem; position:${position};`
// }
//======= fixe navbar ========// 

//======= show lists ========// 
// add event to the document to get the position of the cursor
document.querySelector("body").addEventListener("mouseover", (e) => {
    // check if the cursore in above the title
    let target = checkElement(e.target, Object.getOwnPropertyNames(section));
    if (target) {
        changeHeight(50);
        hideSection(section);
        showSection(section[target]);
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
function showSection(elements) {
    if (elements) {
        elements.style.cssText = "transform:translateY(0);";
    }
}

/// helper functio hide all sections 
function hideSection(section) {
    for (let i in section) {
        section[i].style.cssText = "transform:translateY(-140%);";
    }
    //landing.classList.remove("darken");
}

/// helper function to chnge the width of target <li>
function changeHeight(height) {
    navTitles.forEach((li => {
        if (li.firstElementChild) li.firstElementChild.style.padding = `${height}px 0`;

    }))
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
        img.style.transform = `translateX(${getBullet * (-180)}%)`;
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








// // set the inner Html of chart 
// function AddChartContent(id, img, title, price) {
//     chart().innerHTML += `
//     <section class="chart-items-container" id="${id}">
//     <section class="chart-item">
//     <span class="cls-btn cls-item-btn"><i class="fas fa-times slider-cls"></i></span>
//     <img src=${img} class="chart-item-img" alt="item">
//     <div class="chart-item-info">
//     <h5 class="item-title">${title}</h5>
//     <form class="quantity-form">
//                 <label for="quantity">Quantity :</label>
//                 <input type="number" value="1" class="amount-input" min="1" max="20"/>
//     </form>
//     <p class="item-price">Item ${price}</p>
//     <p class="total-price">Total ${price} </p>
//     </div>
//     </section>
//     <div class="btns-section">
//     <button class="buy-item">Buy Now</button>
//     <button class="remove-item">Remove</button>
//     </div>
//     </section> `
// }




//let chartAmount = document.querySelector("#items-number");
// let cartStatus = document.querySelector(".cart-status").children[1];


//console.log(chartAmount);


// // // helper function get the current items container after every change
// const chart = () => {
//     return document.querySelector(".empty-card");
// }

// // console.log(chartContent());

// // local storage
// /*============================================*/
// function addLocalStorage(amount, items) {
//     let amountInfo = amount;
//     let chartContent = getCurrentStorage();
//     chartContent.push(items);
//     let storageItem = JSON.stringify(chartContent);
//     localStorage.setItem("content", storageItem);
//     localStorage.setItem("amount", JSON.stringify(amountInfo));
// }

// ///// helper function to get the current storage
// function getCurrentStorage() {
//     if (localStorage.getItem("content")) {
//         return JSON.parse(localStorage.getItem("content"));
//     } else {
//         return [];
//     }
// }

// //delete an item from local storage 
// function deleteStorageItem(id) {
//     let amount = JSON.parse(localStorage.getItem("amount"));
//     let content = JSON.parse(localStorage.getItem("content"));
//     let newAmount = content.filter(am => {
//         if (am.id !== id) { return am }
//     })
//     localStorage.setItem("content", JSON.stringify(newAmount));
//     localStorage.setItem("amount", JSON.stringify(amount - 1));
// }

// /*============================================*/
// // load local storage 
// if (localStorage.length) {
//     let amount = JSON.parse(localStorage.getItem("amount"));
//     let content = JSON.parse(localStorage.getItem("content"));
//     if (amount) {
//         amountNumber = amount;
//         chartAmount.innerHTML = `${amount}`
//         chartAmount.style.backgroundColor = "#00a7a7ce"
//         cartStatus.innerHTML = `${amount} Items`
//         cartStatus.style.backgroundColor = "#00a7a7ce";

//         for (i of content) {
//             AddChartContent(i.id, i.img, i.title, i.price);
//         }
//     }
// }

