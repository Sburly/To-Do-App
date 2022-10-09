const openAddNewModalButtons = document.querySelectorAll("[data-modal-target='#addNewModal']");
const closeAddNewModalButtons = document.querySelectorAll("[data-close-button]");
const addNewOverlay = document.querySelector("#overlayAddNew");
const tagContainer = document.querySelector(".add-new.tags__list");
const input = document.querySelector(".add-new.modal__tags-input");
const closeTagButtons = document.querySelectorAll(".tag.add-new-tag__close-button");
let hiddenInput = document.querySelector("#add-new-tags__input--hidden");
let tags = [];

function openAddNewModal(modal) {
    if(modal == null) return;
    modal.classList.add("active");
    addNewOverlay.classList.add("active");
};

function closeAddNewModal(modal) {
    if(modal == null) return;
    modal.classList.remove("active");
    addNewOverlay.classList.remove("active");
};

openAddNewModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget); // This allows us to access html properties as if they were js objects
        openAddNewModal(modal);
    });
});

closeAddNewModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".to-do__modal"); 
        closeAddNewModal(modal);
    });
});

addNewOverlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".to-do__modal.active");
    modals.forEach(modal => {
        closeAddNewModal(modal);
    });
});

function createTag(label) {
    const li = document.createElement("li");
    li.setAttribute("class", "tag");
    const span = document.createElement("span");
    span.innerText = label.trim();
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "button--transparent button--close add-new-tag__close-button")
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-item", label);
    closeButton.innerHTML = "&times";
    li.appendChild(span);
    li.appendChild(closeButton);
    return li;
};

function updateHidden() {
    hiddenInput.value = "";
    let values = [];
    for(let tag of tags) {
        tag = tag.trim();
        values.push(tag);
    };
    hiddenInput.value = values.join("%,%");
}

function reset() {
    document.querySelectorAll(".tag").forEach(function(tag){
        tag.parentElement.removeChild(tag);
    });
};

function addTags() {
    reset();
    tags.slice().reverse().forEach(function(tag) {
        const input = createTag(tag);
        tagContainer.prepend(input);
    });
};

input.addEventListener("keyup", function(e){
    if(e.key == " " && input.value.trim().length !== 0) {
        tags.push(input.value);
        addTags();
        updateHidden();
        input.value = "";
    };
});

document.addEventListener("click", function(e){
    if(e.target.classList.contains("add-new-tag__close-button")) {
        const value = e.target.getAttribute("data-item");
        const index = tags.indexOf(value);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    };
});