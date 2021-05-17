
// search DOM element
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const resultContainer = document.querySelector(".items-tabel");
const errorMsg = document.querySelector(".error-msg");



// add event to search btn
searchBtn.addEventListener("click", e => {
    e.preventDefault();
    if (searchInput.value) {
        searchItem(searchInput.value);
        errorMsg.style.display = "none";
        searchInput.style.cssText = "border-bottom: 1px solid black;"

    } else {
        errorMsg.style.display = "block";
        searchInput.style.cssText = "border-bottom: 1px solid red;"
    }
})


// display the target content depent on the inpu value
const searchItem = (value) => {
    let foundItems = contenItems.filter(item => item.title.toLowerCase().slice(0, value.length) === value.toLowerCase());
    loadPages(0, foundItems);
    setPaginationAndItemsAmount(foundItems);
    getpage = 0;
}


