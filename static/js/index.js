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

// Drag and Drop
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container__entries");

function getDrapAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        };
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", async () => {
        draggable.classList.remove("dragging");
        const data = {
            "id" : draggable.dataset.entry,
            "newStatus": draggable.parentElement.id
        }
        const requestOptions = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch("/", requestOptions)
            .then(function(response) {
                if(response.ok) return response.text();
                throw new Error('Something went wrong.');
            })
            .then(function(text) {console.log('Request successful', text);})  
            .catch(function(error) {console.log('Request failed', error);});
    });
});

containers.forEach(container => {
    container.addEventListener("dragover", e => {
        e.preventDefault();
        const afterElement = getDrapAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        };
    });
});