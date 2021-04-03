


let cartStatus = document.querySelector(".cart-status").children[1];
let chartAmount = document.querySelector("#items-number");
const itemsContainer = document.querySelector(".items-tabel");


// helper function get the current items container after every change
const chartContent = () => {
    return document.querySelector(".empty-card");
}


//===============================//
/* change the view text content */
//===============================//
const displayInput = document.querySelector("#view");
let windowWidth = window.innerWidth;
if (windowWidth < 700) {
    displayInput.children[0].textContent = "hide Details";
    displayInput.children[1].textContent = "Show Details";
    displayInput.previousElementSibling.textContent = "Show / Hide details"
}


/*============================================*/
// filter items 
/*============================================*/
const sort = document.querySelector("#sort");
if (sort) {
    sort.addEventListener("change", () => {
        let situation = sort.value;
        sortList(situation);
        view === "list" ? styleList("l") : styleList("g");
    })
    // function to sort the items
    function sortList(direction) {
        switch (direction) {
            case "price++":
                menItems.sort((a, b) => a.price - b.price);
                loadPages(0, menItems);
                break;
            case "price--":
                menItems.sort((a, b) => b.price - a.price);
                loadPages(0, menItems);
                break;
            case "alph++":
                sortingLetter("plus");
                loadPages(0, menItems);
                break;
            case "alph--":
                sortingLetter("mines");
                loadPages(0, menItems);
                break;
            default:
                break;
        }
    }
    // helper function for sorting letters A-Z Z-A
    function sortingLetter(direc) {
        menItems.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase() && direc === "plus") {
                return -1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase() && direc === "mines") {
                return 1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase() && direc === "plus") {
                return 1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase() && direc === "mines") {
                return -1;
            }
            return 0;
        })
    }
}





// add  functionality chart items
/*============================================*/
function loadPages(category, item) {
    // loading items
    setMainContent(category, item);
    // add items to chart
    let items = Array.prototype.slice.call(document.querySelectorAll(".overlay-msg"));
    items.forEach(item => {
        item.addEventListener("click", () => {
            let singleItem = item.parentElement.parentElement;
            chartContent();
            let chartCont = chartContent().querySelectorAll(".chart-items-container");
            let test = testItem(singleItem.id, chartCont);
            if (!test) {
                addToChart(singleItem)
                itemsActions(chartContent())
            } else {
                alert("This item exist in the chart Already");
                // add prompt section in the future
            }
        })
    })
}


// function to add the HTML to the main container
function setMainContent(category, item) {
    if (itemsContainer) {
        itemsContainer.innerHTML = "";
        for (let i = category; (i < category + 20 && i < item.length); i++) {
            itemsContainer.innerHTML += `
    <section class="single-item" id=${item[i].id}>
    <div class="img">
    <img src="${item[i].img}" alt=${item[i].title} />
    <div class="overlay-msg">Add to chart <i class="fas fa-shopping-cart"></i></div>
    </div>
    <div class="item-info">
    <h6>${item[i].title} ${item[i].id}</h6>
    <p class="item-desc" style="display:none;">${item[i].descreption}</p>
    <h6 class="prix">Price: ${item[i].price} £</h6>
    </div>
    </section>`
        }
    }


}


// set the inner Html of chart 
function AddChartContent(id, img, title, price) {
    chartContent().innerHTML += `
    <section class="chart-items-container" id="${id}">
    <section class="chart-item">
    <span class="cls-btn cls-item-btn"><i class="fas fa-times slider-cls"></i></span>
    <img src=${img} class="chart-item-img" alt="item">
    <div class="chart-item-info">
    <h5 class="item-title">${title}</h5>
    <form class="quantity-form">
                <label for="quantity">Quantity :</label>
                <input type="number" value="1" class="amount-input" min="1" max="20"/>
    </form>
    <p class="item-price">Item ${price}</p>
    <p class="total-price">Total ${price} </p>
    </div>
    </section>
    <div class="btns-section">
    <button class="buy-item">Buy Now</button>
    <button class="remove-item">Remove</button>
    </div>
    </section> `
}



// function for remove item from chart 
function getTheItemToRemove(e, Targetbtn) {
    if (Targetbtn.classList.contains("remove-item")) {
        let id = e.target.parentElement.parentElement.id;
        removeItem(e, e.target.parentElement.parentElement, id);
    } else if (Targetbtn.classList.contains("cls-btn")) {
        let id = e.target.parentElement.parentElement.parentElement.id;
        removeItem(e, e.target.parentElement.parentElement.parentElement, id)
    }
}



// helper function to remove items from the chart by btns or icons
function removeItem(e, target, id) {
    e.stopPropagation();
    subAmount();
    target.remove();
    deleteStorageItem(id);
}

//function for encrease cart status
function addAmount() {
    amountNumber++;
    chartAmount.innerHTML = `${amountNumber}`
    chartAmount.style.backgroundColor = "#00a7a7ce"
    cartStatus.innerHTML = `${amountNumber} Items`
    cartStatus.style.backgroundColor = "#00a7a7ce";
}

//function for decrease cart status
function subAmount() {
    amountNumber--;
    chartAmount.innerHTML = `${amountNumber}`
    cartStatus.innerHTML = `${amountNumber} Items`
    if (amountNumber === 0) {
        chartAmount.style.backgroundColor = "red"
        cartStatus.style.backgroundColor = "gray";
    }
}

//// function for incraese Btns
function increaseItems(btn) {
    let originalPriceItem = btn.parentElement.nextElementSibling.textContent;
    let originalPrice = Number(originalPriceItem.match(/\d+/g).join(""));
    btn.parentElement.nextElementSibling.nextElementSibling.textContent =
        `Total Price : ${originalPrice * btn.value} £`
}


/*============================================*/
// add items to chart
/*============================================*/
//const chart = document.querySelector(".chart-content");
let amountNumber = 0;
function addToChart(item) {
    let image = item.firstElementChild.firstElementChild;
    let title = item.children[1].firstElementChild;
    let price = item.children[1].lastElementChild;
    AddChartContent(item.id, image.src, title.textContent, price.textContent);
    addAmount();
    // Add to locale storage
    addLocalStorage(
        amountNumber,
        {
            id: item.id,
            img: image.src,
            title: title.textContent,
            price: price.textContent
        }
    );
}

/*============================================*/
// display items system
/*============================================*/
let view;
// set the event in the select field
if (displayInput) {
    displayInput.addEventListener("change", () => {
        view = displayInput.value;
        if (view === 'grid') {
            itemsContainer.style.display = "grid";
            styleList("g");
        } else if (view === 'list') {
            itemsContainer.style.display = "inline-table";
            styleList("l");
        }
    })
}

// get the current displayed list
let getCurrentList = () => {
    return Array.prototype.slice.call(document.querySelectorAll(".single-item"));
}
// set the display style of the items
let styleList = (order) => {
    getCurrentList().forEach(item => {
        if (order === "l") {
            item.classList.add("list");
            item.children[1].children[1].style.display = "block";
        } else if (order === "g") {
            item.classList.remove("list");
            item.children[1].children[1].style.display = "none";
        }
    })

}

/*============================================*/
// pagination
/*============================================*/
// elemeent DOM
const paginationNum = document.querySelector(".numbers");
const paginationLeft = document.querySelector(".pagination-left");
const paginationRight = document.querySelector(".pagination-right");

//let singleItem;
let getpage = 0;

// set the bagination numbers of the pages

for (let i = 1; i <= Math.ceil(menItems.length / 20); i++) {
    if (paginationNum) paginationNum.innerHTML += `<span class="page-number">${i}</span>`
}



if (paginationRight) paginationRight.addEventListener("click", nextPage);
// next page function
function nextPage() {
    if (getpage < pagiArray.length - 1) {
        getpage++;
        itemsContainer.innerHTML = "";
        loadPages(getpage * 20, menItems)
    }
    if (getpage === pagiArray.length - 2) {
        paginationRight.classList.add("black-focus");
    }
    checkFocus(paginationLeft);
    checkFocus(paginationRight);
    getCurrentList();
    view === "list" ? styleList("l") : styleList("g");
}

if (paginationLeft) paginationLeft.addEventListener("click", prevPage);
// previous page function
function prevPage() {
    if (getpage > 0) {
        getpage--;
        itemsContainer.innerHTML = "";
        loadPages(getpage * 20, menItems)
    }
    checkFocus(paginationLeft);
    checkFocus(paginationRight);
    getCurrentList();
    view === "list" ? styleList("l") : styleList("g");
}

// focus cursores
function checkFocus(target) {
    if (target.textContent === "<<") {
        if (getpage === 0) {
            paginationLeft.classList.add("black-focus");
        } else {
            paginationLeft.classList.remove("black-focus");
        }
    } else if (target.textContent === ">>") {
        if (getpage === pagiArray.length - 1) {
            paginationRight.classList.add("black-focus");
        } else {
            paginationRight.classList.remove("black-focus");
        }
    }
    focusNumbers();
}

// hover numbers
function focusNumbers() {
    pagiArray.forEach(num => {
        if (Number(num.textContent) === getpage + 1) {
            num.classList.add("black-focus");
        } else {
            num.classList.remove("black-focus");
        }
    })
}


// helper function test if the items existe in the chart
function testItem(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return true;
        }
    }
}

// add event to paginationNum numbers
let pagiArray;
if (paginationNum) {
    pagiArray = Array.prototype.slice.call(paginationNum.children);
}
if (pagiArray) {
    pagiArray.forEach(num => {
        num.addEventListener("click", (e) => {
            getpage = Number(pagiArray.indexOf(e.currentTarget));
            let itemsNum = 20 * getpage;
            itemsContainer.innerHTML = "";
            loadPages(itemsNum, menItems);
            checkFocus(paginationLeft);
            checkFocus(paginationRight);
            getCurrentList()
            view === "list" ? styleList("l") : styleList("g");
        });
    });
}
