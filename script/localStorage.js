// load the current functionality
window.addEventListener("DOMContentLoaded", () => {
    loadPages(0, contenItems);
    itemsActions(chartContent());

    amountInput();
    amountInput().forEach(input => {
        input.addEventListener("click", (input) => {
            handelAmounts(input.target)
        });
    });


});

function amountInput() {
    console.log(Array.prototype.slice.call(document.querySelectorAll(".amount-input")));
    return Array.prototype.slice.call(document.querySelectorAll(".amount-input"));
}

amountInput().map(input => {
    input.addEventListener("click", (input) => {
        handelAmounts(input)
    });
});


function handelAmounts(input) {
    let itemValue = input.value
    let itemId = input.parentElement.parentElement.parentElement.parentElement.id;
    editLocalStorage(itemValue, itemId);

    //  return itemValue;
}




// helper function fo hold item functinality
function itemsActions(content) {
    let closeBtns = Array.prototype.slice.call(content.querySelectorAll(".cls-item-btn"));
    let removeBtns = Array.prototype.slice.call(content.querySelectorAll(".remove-item"));
    let incraeseBtn = Array.prototype.slice.call(content.querySelectorAll(".amount-input"));

    closeBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            chartContent();
            getTheItemToRemove(e, e.currentTarget);
        })
    })

    removeBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            getTheItemToRemove(e, e.currentTarget);
        })
    })

    incraeseBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            increaseItems(btn);
        })
    })
}

// local storage
/*============================================*/
function addLocalStorage(amount, items) {
    let amountInfo = amount;
    let chartContent = getCurrentStorage();
    chartContent.push(items);
    let storageItem = JSON.stringify(chartContent);
    localStorage.setItem("content", storageItem);
    localStorage.setItem("amount", JSON.stringify(amountInfo));
}

///// helper function to get the current storage
function getCurrentStorage() {
    amountInput();

    if (localStorage.getItem("content")) {
        return JSON.parse(localStorage.getItem("content"));
    } else {
        return [];
    }
}


//edit local storage
function editLocalStorage(value, id) {
    let currentStorage = getCurrentStorage();


    if (currentStorage) {
        currentStorage = currentStorage.map(item => {
            if (item.id === id) {
                item.amount = value;
            }
            return item;
        });
    }
    localStorage.setItem("content", JSON.stringify(currentStorage));
}



//delete an item from local storage 
function deleteStorageItem(id) {
    let amount = JSON.parse(localStorage.getItem("amount"));
    let content = JSON.parse(localStorage.getItem("content"));
    let newAmount = content.filter(am => {
        if (am.id !== id) { return am }
    })
    localStorage.setItem("content", JSON.stringify(newAmount));
    localStorage.setItem("amount", JSON.stringify(amount - 1));
}

/*============================================*/
// load local storage 
if (localStorage.length) {
    let amount = JSON.parse(localStorage.getItem("amount"));
    let content = JSON.parse(localStorage.getItem("content"));
    if (amount) {
        amountNumber = amount;
        chartAmount.innerHTML = `${amount}`
        chartAmount.style.backgroundColor = "#00a7a7ce"
        cartStatus.innerHTML = `${amount} Items`
        cartStatus.style.backgroundColor = "#00a7a7ce";

        for (i of content) {
            AddChartContent(i.id, i.img, i.title, i.price, i.amount, i.kind);
        }
    }
}





























































































































// //let prevpageUrl = document.referrer;
// let currentPage = window.location.pathname;

// let currentPageIndex = currentPage.lastIndexOf(".")
// let currentPageName = currentPage.slice(1, currentPageIndex);

// // set the location of the current page
// let locationTitle = document.querySelector(".current-page");

// console.log(currentPageName);

// locationTitle.innerHTML = (`<P><a href="main.html">Main Page</a> >> "${currentPageName.toUpperCase()}"</P>`)


// let images = document.querySelector(".image");


// document.addEventListener("DOMContentLoaded", () => {

//     if (images) {
//         console.log(images.firstElementChild);
//         images.firstElementChild.src = "../img/loading.gif";
//     }
// })


// window.addEventListener("load", () => {
//     if (images) {
//         console.log(images.firstElementChild);

//         images.firstElementChild.src = "https://cdn11.bigcommerce.com/s-iyqvgyco/product_images/uploaded_images/mens-cat-img.jpg"
//     }
// })

/*if i have many nested page i will use this method */
//let firstIndex = getIndexes(prevpageUrl, "/")
//let secondIndex = getIndexes(prevpageUrl, ".")
//let currentPageIndex = getIndexes(currentPage, ".")
//let prevPageName = prevpageUrl.slice(firstIndex, secondIndex);

// function getIndexes(target, symbol) {
//     let index = target.lastIndexOf(symbol)
//     return index;
// }













