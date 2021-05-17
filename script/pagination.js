/*============================================*/
// pagination
/*============================================*/

const paginationLeft = document.querySelector(".pagination-left");
const paginationRight = document.querySelector(".pagination-right");


//let singleItem;
let getpage = 0;
let pagiArray;

// set the bagination numbers of the pages
function setPaginationAndItemsAmount(items) {

    // elemeent DOM
    const paginationContainer = document.querySelector(".pagination");
    const paginationWrapper = document.querySelector(".pag-wrapper");
    const paginationNum = paginationContainer.querySelector(".numbers");
    let status_info = paginationContainer.querySelector(".items-status-info");

    let showingItems = 20;

    for (let i = 1; i <= Math.ceil(items.length / showingItems); i++) {

        if (paginationNum && (items.length / showingItems > 1)) {
            paginationWrapper.style.display = 'block';

            if (i === 1) {
                paginationNum.innerHTML =
                    `<span class="page-number black-focus">${i}</span>`;
            } else {
                paginationNum.innerHTML += `<span class="page-number">${i}</span>`;
            }
        }
    }


    if (status_info && items.length > showingItems) {
        status_info.innerHTML =
            `<small><i><strong>${showingItems}</strong> of <strong>${items.length}</strong> total<i/></small>`
    } else {
        paginationWrapper.style.display = 'none';
        status_info.innerHTML =
            `<small><i><strong>${items.length}</strong> total Items<i/></small>`
    }

    paginationRight.addEventListener("click", nextPage);
    paginationLeft.addEventListener("click", prevPage);


    // add event to paginationNum numbers
    //if (paginationNum) 
    pagiArray = Array.prototype.slice.call(paginationNum.children);

    //if (pagiArray) 
    pagiArray.forEach(num => {
        num.addEventListener("click", (e) => {
            console.log("num");
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



// console.log(currentPage);


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






// let showingItems = 20;
// for (let i = 1; i <= Math.ceil(items.length / showingItems); i++) {
//     if (paginationNum && (items.length / showingItems > 1)) {
//         if (i === 1) {
//             paginationNum.innerHTML += `<span class="page-number black-focus">${i}</span>`;
//         } else {
//             paginationNum.innerHTML += `<span class="page-number">${i}</span>`;
//         }
//     } else {
//         if (document.querySelector(".pagination")) {
//             document.querySelector(".pagination").innerHTML =
//                 `<div class="items-status-info"></div>`;
//         }
//     }
// }

// let status_info = document.querySelector(".items-status-info");

// if (status_info && items.length > showingItems) {
//     console.log("it's bigger");
//     status_info.innerHTML =
//         `<small><i><strong>${showingItems}</strong> of <strong>${items.length}</strong> total<i/></small>`
// } else {
//     status_info.innerHTML =
//         `<small><i><strong>${items.length}</strong> total Items<i/></small>`
// }