
let cartStatus = document.querySelector(".cart-status").children[1];
let chartAmount = document.querySelector("#items-number");
const itemsContainer = document.querySelector(".items-tabel");


// load the current functionality
window.addEventListener("DOMContentLoaded", () => {

    let currentPagePath = window.location.pathname
    let currentPageIndex = window.location.pathname.lastIndexOf("/");
    let currentPageSecIndex = window.location.pathname.lastIndexOf(".");
    let currentPage = currentPagePath.substring(currentPageIndex + 1, currentPageSecIndex);


    if (currentPage !== 'search') {
        loadPages(0, contenItems);
        itemsActions(chartContent());
        amountInput();
        amountInput().forEach(input => {
            input.addEventListener("click", (input) => {
                handelAmounts(input.target)
            });
        });
        setPaginationAndItemsAmount(contenItems);
    } else {
        setPaginationAndItemsAmount([]);
    }


});

// helper function get the current items container after every change
const chartContent = () => {
    return document.querySelector(".empty-card");
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

    if (Targetbtn.classList.contains("remove-item")) {
        let id = e.target.parentElement.parentElement.id;
        removeItem(e, e.target.parentElement.parentElement, id);
    } else if (Targetbtn.classList.contains("cls-item-btn")) {
        let id = e.currentTarget.parentElement.parentElement.id;
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



