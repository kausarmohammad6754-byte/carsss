// ===========================
// LUXE MOTORS JAVASCRIPT
// ===========================


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("open");

        const opened = navMenu.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", opened);
        menuToggle.textContent = opened ? "✕" : "☰";

    });

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";

        });

    });

}


// CAR SEARCH AND BRAND FILTER

const carSearch = document.getElementById("carSearch");
const brandFilter = document.getElementById("brandFilter");
const carCards = document.querySelectorAll(".car-card");
const noCars = document.getElementById("noCars");


function filterCars() {

    const query = carSearch.value.trim().toLowerCase();
    const brand = brandFilter.value;

    let visibleCount = 0;

    carCards.forEach(function (card) {

        const name = card.dataset.name.toLowerCase();
        const cardBrand = card.dataset.brand;

        const matchesName = name.includes(query);

        const matchesBrand =
            brand === "all" || cardBrand === brand;

        const visible = matchesName && matchesBrand;

        card.hidden = !visible;

        if (visible) {
            visibleCount++;
        }

    });

    noCars.hidden = visibleCount !== 0;

}


carSearch.addEventListener("input", filterCars);
brandFilter.addEventListener("change", filterCars);


// FAVOURITE BUTTONS

document.querySelectorAll(".favorite").forEach(function (button) {

    button.addEventListener("click", function () {

        const active = button.classList.toggle("active");

        button.textContent = active ? "♥" : "♡";

        button.setAttribute("aria-pressed", active);

    });

});


// CAR DETAILS POPUP

const carDialog = document.getElementById("carDialog");
const dialogCarName = document.getElementById("dialogCarName");
const closeDialog = document.getElementById("closeDialog");
const dialogBook = document.getElementById("dialogBook");
const selectedCar = document.getElementById("selectedCar");


document.querySelectorAll(".details-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        const carName = button.dataset.car;

        dialogCarName.textContent = carName;

        dialogBook.href = "#contact";

        if (carDialog.showModal) {
            carDialog.showModal();
        } else {
            alert(carName + "\nContact the showroom for details.");
        }

    });

});


closeDialog.addEventListener("click", function () {
    carDialog.close();
});


dialogBook.addEventListener("click", function () {

    const carName = dialogCarName.textContent;

    const matchingOption = Array.from(selectedCar.options).find(
        option => option.textContent === carName
    );

    if (matchingOption) {
        selectedCar.value = matchingOption.value;
    }

    carDialog.close();

});


carDialog.addEventListener("click", function (event) {

    if (event.target === carDialog) {
        carDialog.close();
    }

});


// TEST DRIVE FORM

const testDriveForm = document.getElementById("testDriveForm");
const formMessage = document.getElementById("formMessage");
const appointmentDate = document.getElementById("appointmentDate");


// Prevent selecting past dates in the date picker.

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

appointmentDate.min = localToday;


testDriveForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const car = selectedCar.value;
    const date = appointmentDate.value;

    if (!name || !email || !phone || !car || !date) {

        formMessage.textContent =
            "Please complete all fields before submitting.";

        return;

    }

    formMessage.textContent =
        "Thank you, " + name + "! Your demo request for " +
        car + " on " + date +
        " has been recorded in this page session only. " +
        "Please contact the showroom to confirm your appointment.";

    testDriveForm.reset();

    appointmentDate.min = localToday;

});