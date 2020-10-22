const currentPage =  location.pathname
const menuItems = document.querySelectorAll("header .links a")
console.log(currentPage)


for (item of menuItems) {
    if(currentPage == item.getAttribute("href")) {
        item.classList.add("active")
    }
}

console.log('oi')