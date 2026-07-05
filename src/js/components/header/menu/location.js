let mylocation = document.querySelector(".location");
let locationModal = document.querySelector(".locationModal");
let locationModalOverlay = document.querySelector(".locationModalOverlay");
let locationClose = document.querySelector(".locationClose");


function CloseModal() {
    locationModalOverlay.classList.replace("flex", "hidden");
    document.body.classList.remove("overflow-hidden");
}

mylocation.addEventListener("click", () => {
    locationModalOverlay.classList.replace("hidden", "flex");
    document.body.classList.add("overflow-hidden");
});
locationClose.addEventListener("click", () => {
    CloseModal();
});
locationModalOverlay.addEventListener("click", () => {
    CloseModal();
});
locationModal.addEventListener("click", (e) => {
    e.stopPropagation();
});
