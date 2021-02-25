
//let prevpageUrl = document.referrer;
let currentPage = window.location.pathname;


let currentPageIndex = currentPage.lastIndexOf(".")
let currentPageName = currentPage.slice(1, currentPageIndex);




// set the location of the current page
let locationTitle = document.querySelector(".current-page");

console.log(locationTitle);

locationTitle.innerHTML = (`<P><a href="main.html">Main Page</a> >> "${currentPageName.toUpperCase()}"</P>`)

































/*if i have many nested page i will use this method */
//let firstIndex = getIndexes(prevpageUrl, "/")
//let secondIndex = getIndexes(prevpageUrl, ".")
//let currentPageIndex = getIndexes(currentPage, ".")
//let prevPageName = prevpageUrl.slice(firstIndex, secondIndex);

// function getIndexes(target, symbol) {
//     let index = target.lastIndexOf(symbol)
//     return index;
// }
