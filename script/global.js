


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
                contenItems.sort((a, b) => a.price - b.price);
                loadPages(0, contenItems);
                break;
            case "price--":
                contenItems.sort((a, b) => b.price - a.price);
                loadPages(0, contenItems);
                break;
            case "alph++":
                sortingLetter("plus");
                loadPages(0, contenItems);
                break;
            case "alph--":
                sortingLetter("mines");
                loadPages(0, contenItems);
                break;
            default:
                break;
        }
    }
    // helper function for sorting letters A-Z Z-A
    function sortingLetter(direc) {
        contenItems.sort((a, b) => {
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
    <section class="single-item" id=${item[i].id} data-kind=${item[i].kind}>
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
function AddChartContent(id, img, title, price, amount, kind) {
    let color = checkForColor(kind);
    chartContent().innerHTML += `
    <section class="chart-items-container" id="${id}" style=background-color:${color} >
    <section class="chart-item">
    <button class="cls-btn cls-item-btn"><i class="fas fa-times"></i></button>
    <img src=${img} class="chart-item-img" alt="item"/>
    <div class="chart-item-info">
    <h5 class="item-title">${title}</h5>
    <form class="quantity-form">
                <label for="quantity">Quantity :</label>
                <input type="number" value=${amount || 1} class="amount-input" min="1" max="20"/>
    </form>
    <p class="item-price">Item Price : ${price} £</p>
    <p class="total-price">Total Price : ${(Number(price) * (Number(amount) || 1)) || price} £</p>
    </div>
    </section>
    <div class="btns-section">
    <button class="buy-item">Buy Now</button>
    <button class="remove-item">Remove</button>
    </div>
    </section> `
}

// set the color of the item in the chart
const checkForColor = (targetKind) => {
    if (targetKind === "men") {
        return "#e6fcff"
    } else if (targetKind === "women") {
        return "#ffd2e9"
    } else if (targetKind === "accessories") {
        return "#bfffdf"
    } else if (targetKind === "discover") {
        return "#fff6b6"
    }
}


// function for remove item from chart 
function getTheItemToRemove(e, Targetbtn) {
    // e.stopPropagation()

    if (Targetbtn.classList.contains("remove-item")) {
        let id = e.target.parentElement.parentElement.id;
        removeItem(e, e.target.parentElement.parentElement, id);
    } else if (Targetbtn.classList.contains("cls-item-btn")) {
        let id = e.currentTarget.parentElement.parentElement.id;
        //console.log(e.currentTarget.parentElement.parentElement);
        removeItem(e, e.currentTarget.parentElement.parentElement, id)
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
    let originalPrice = Number(originalPriceItem.match(/\d+/g));

    //let originalPrice = Number(originalPriceItem.match(/\d+/g).join(""));
    btn.parentElement.nextElementSibling.nextElementSibling.textContent =
        `Total Price : ${originalPrice * btn.value} £`
}


/*============================================*/
// add items to chart
/*============================================*/
//const chart = document.querySelector(".chart-content");
let amountNumber = 0;
function addToChart(item) {

    // let getAmountFromStorage = JSON.parse(localStorage.getItem("content"));

    // let targetItemAmout = getAmountFromStorage.filter(target => {
    //     if (target.id === item.id) {
    //         return target.amount
    //     }
    // });

    // console.log(targetItemAmout);

    //if (handelAmounts()) console.log(handelAmounts())

    let image = item.firstElementChild.firstElementChild;
    let title = item.children[1].firstElementChild;
    let price = item.children[1].lastElementChild.textContent.match(/\d+/g);
    let amount = 1;
    let kind = item.dataset.kind;


    AddChartContent(item.id, image.src, title.textContent, price, amount, kind);
    addAmount();
    // Add to locale storage
    addLocalStorage(
        amountNumber,
        {
            id: item.id,
            img: image.src,
            title: title.textContent,
            price: price[0],
            kind: kind
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
function setPaginationAndItemsAmount() {
    let showingItems = 20;
    for (let i = 1; i <= Math.ceil(contenItems.length / showingItems); i++) {
        if (paginationNum && (contenItems.length / showingItems > 1)) {
            if (i === 1) {
                paginationNum.innerHTML += `<span class="page-number black-focus">${i}</span>`;
            } else {
                paginationNum.innerHTML += `<span class="page-number">${i}</span>`;
            }
        } else {
            if (document.querySelector(".pagination")) document.querySelector(".pagination").innerHTML = `<div class="items-status-info"></div>`;
        }
    }
    let status_info = document.querySelector(".items-status-info");
    if (status_info) status_info.innerHTML =
        `<small><i><strong>${showingItems}</strong> of <strong>${contenItems.length}</strong> total<i/></small>`
}

setPaginationAndItemsAmount();

if (paginationRight) paginationRight.addEventListener("click", nextPage);
// next page function
function nextPage() {
    if (getpage < pagiArray.length - 1) {
        getpage++;
        itemsContainer.innerHTML = "";
        loadPages(getpage * 20, contenItems)
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
        loadPages(getpage * 20, contenItems)
    }
    checkFocus(paginationLeft);
    checkFocus(paginationRight);
    getCurrentList();
    view === "list" ? styleList("l") : styleList("g");
}

if (paginationLeft) {
    if (getpage === 0) {
        paginationLeft.classList.remove("black-focus");
        paginationRight.classList.add("black-focus");
    }
}

// focus cursores
function checkFocus(target) {
    if (target.classList.contains("pagination-left")) {
        console.log(true);
        if (getpage === 0) {
            paginationLeft.classList.remove("black-focus");
        } else {
            paginationLeft.classList.add("black-focus");
        }
    } else {
        if (getpage === pagiArray.length - 1) {
            paginationRight.classList.remove("black-focus");
        } else {
            paginationRight.classList.add("black-focus");
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
            loadPages(itemsNum, contenItems);
            checkFocus(paginationLeft);
            checkFocus(paginationRight);
            getCurrentList()
            view === "list" ? styleList("l") : styleList("g");
        });
    });
}
