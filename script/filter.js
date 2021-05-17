

/*============================================*/
// display items system
/*============================================*/
//===============================//
/* change the view text content */
//===============================//
const displayInput = document.querySelector("#view");
let windowWidth = window.innerWidth;
if (windowWidth < 700 && displayInput === true) {
    displayInput.children[0].textContent = "hide Details";
    displayInput.children[1].textContent = "Show Details";
    displayInput.previousElementSibling.textContent = "Show / Hide details"
}

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

