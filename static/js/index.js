const viewMoreButtons = document.querySelectorAll(".entry__view-more");
const viewLessButtons = document.querySelectorAll(".entry__view-less");
const entrySmall = document.querySelectorAll(".entry--small");
const entryBig = document.querySelectorAll(".entry--big");

for(let btn of viewMoreButtons) {
    btn.addEventListener("click", function(){
        entrySmall[Array.prototype.indexOf.call(viewMoreButtons, btn)].classList.add("noDisplay");
        entrySmall[Array.prototype.indexOf.call(viewMoreButtons, btn)].classList.remove("entry");
        entryBig[Array.prototype.indexOf.call(viewMoreButtons, btn)].classList.add("entry");
        entryBig[Array.prototype.indexOf.call(viewMoreButtons, btn)].classList.remove("noDisplay");
    });
};

for(let btn of viewLessButtons) {
    btn.addEventListener("click", function(){
        entrySmall[Array.prototype.indexOf.call(viewLessButtons, btn)].classList.remove("noDisplay");
        entrySmall[Array.prototype.indexOf.call(viewLessButtons, btn)].classList.add("entry");
        entryBig[Array.prototype.indexOf.call(viewLessButtons, btn)].classList.add("noDisplay");
        entryBig[Array.prototype.indexOf.call(viewLessButtons, btn)].classList.remove("entry");
    });
};