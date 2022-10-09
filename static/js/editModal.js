// Tags
const inputEdit = document.querySelectorAll(".edit.modal__tags-input");
let tagsEdit = [];

function populateEdit(tags){
    for(let tag of tags.split(",")) {
        tagsEdit.push(tag);
    };
};

function createTagEdit(label, id) {
    const li = document.createElement("li");
    li.setAttribute("class", "tag");
    li.setAttribute("data-entry", id);
    const span = document.createElement("span");
    span.innerText = label.trim();
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "button--transparent button--close edit-tag__close-button")
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-entry", id);
    closeButton.setAttribute("data-entry", id);
    closeButton.setAttribute("data-item", label.trim());
    closeButton.innerHTML = "&times";
    li.appendChild(span);
    li.appendChild(closeButton);
    return li;
};

function updateHiddenEdit(id) {
    const hidden = document.querySelector(`#edit-tags__input--hidden[data-entry=\'${id}\']`)
    hidden.value = "";
    let values = [];
    for(let tag of tagsEdit) {
        tag = tag.trim();
        values.push(tag);
    };
    hidden.value = values.join("%,%");
};

function resetEdit(id) {
    document.querySelectorAll(`.tag[data-entry=\'${id}\']`).forEach(function(tag){
        tag.parentElement.removeChild(tag);
    });
};

function addTagsEdit(id) {
    resetEdit(id);
    tagsEdit.slice().reverse().forEach(function(tag) {
        const input = createTagEdit(tag, id);
        document.querySelector(`.edit.tags__list[data-entry=\'${id}\']`).prepend(input);
    });
};

for(let input of inputEdit) {
    input.addEventListener("keyup", function(e){
        if(e.key == " " && input.value.trim().length !== 0) {
            tagsEdit.push(input.value.trim());
            addTagsEdit(input.dataset.entry);
            updateHiddenEdit(input.dataset.entry);
            input.value = "";
        };
    });
};

document.addEventListener("click", function(e){
    if(e.target.classList.contains("edit-tag__close-button")) {
        const value = e.target.getAttribute("data-item");
        const index = tagsEdit.indexOf(value);
        tagsEdit = [...tagsEdit.slice(0, index), ...tagsEdit.slice(index + 1)];
        addTagsEdit(e.target.dataset.entry);
        updateHiddenEdit(e.target.dataset.entry);
    };
});

// Modal
const openEditModalButtons = document.querySelectorAll("[data-modal-target='#editModal']");
const closeEditModalButtons = document.querySelectorAll("[data-close-button]");
const editOverlay = document.querySelector("#overlayEdit");

function openEditModal(modal) {
    if(modal == null) return;
    modal.classList.add("active");
    editOverlay.classList.add("active");
};

function closeEditModal(modal) {
    if(modal == null) return;
    modal.classList.remove("active");
    editOverlay.classList.remove("active");
};

openEditModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        tagsEdit = [];
        populateEdit(button.dataset.entryTags);
        addTagsEdit(button.id);
        updateHiddenEdit(button.id);
        const editModals = document.querySelectorAll(button.dataset.modalTarget); // This allows us to access html properties as if they were js objects
        for(let modal of editModals){
            const id = button.id;
            if(id == modal.dataset.entryTarget){
                openEditModal(modal);
                break;
            };
        };
    });
});

closeEditModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".to-do__modal"); 
        closeEditModal(modal);
    });
});

editOverlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".to-do__modal.active");
    modals.forEach(modal => {
        closeEditModal(modal);
    });
});
