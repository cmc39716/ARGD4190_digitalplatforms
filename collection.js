// ==========================================
// PHOTOGRAPHY COLLECTION
// ==========================================


// Store all photographs from data.json
let photos = [];

// Current photography type filter
let currentFilter = "all";



// ==========================================
// LOAD PHOTOGRAPHS FROM JSON
// ==========================================

fetch("data.json")

    .then(response => {

        // Check that data.json was found
        if (!response.ok) {

            throw new Error(
                "Could not load data.json"
            );

        }

        // Convert JSON into JavaScript data
        return response.json();

    })

    .then(data => {

        // Save JSON photographs
        photos = data;

        console.log(
            "Photographs loaded:",
            photos
        );

        // Show photographs
        displayPhotos(photos);

    })

    .catch(error => {

        console.error(
            "ERROR LOADING PHOTOS:",
            error
        );

        document.getElementById(
            "photo-count"
        ).textContent =
            "Could not load photographs";

    });



// ==========================================
// DISPLAY PHOTOGRAPHS
// ==========================================

function displayPhotos(photoList) {


    const grid =
        document.getElementById(
            "photo-grid"
        );


    // Remove old photographs
    grid.innerHTML = "";


    // Update photograph count
    document.getElementById(
        "photo-count"
    ).textContent =
        photoList.length +
        " photographs";


    // Create one card for every photograph
    photoList.forEach(photo => {


        const card =
            document.createElement(
                "article"
            );


        card.classList.add(
            "photo-card"
        );


        card.innerHTML = `

            <div class="photo-container">

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                    class="photo-image"
                >

                <div class="photo-overlay">
                    View Photo
                </div>

            </div>


            <div class="photo-title">
                ${photo.title}
            </div>


            <div class="photo-photographer">
                ${photo.photographer}
            </div>


            <div class="photo-year">
                ${photo.time_period}
            </div>

        `;


        // Show error if an individual image
        // filename cannot be found
        const image =
            card.querySelector(
                ".photo-image"
            );


        image.addEventListener(
            "error",
            function() {

                console.error(
                    "IMAGE NOT FOUND:",
                    photo.image
                );

            }
        );


        // Open modal when card is clicked
        card.addEventListener(
            "click",
            function() {

                openModal(photo);

            }
        );


        grid.appendChild(card);


    });

}



// ==========================================
// FILTER BUTTONS
// ==========================================

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(button => {


    button.addEventListener(
        "click",
        function() {


            // Remove active style
            // from every button
            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // Add active style
            // to clicked button
            this.classList.add(
                "active"
            );


            // Get filter from HTML
            currentFilter =
                this.dataset.filter;


            applyFilters();


        }
    );


});



// ==========================================
// SORT MENU
// ==========================================

const sortMenu =
    document.getElementById(
        "sort"
    );


sortMenu.addEventListener(
    "change",
    function() {

        applyFilters();

    }
);



// ==========================================
// APPLY FILTER + SORT
// ==========================================

function applyFilters() {


    // Make copy of photographs
    let results = [...photos];



    // -----------------------------
    // FILTER
    // -----------------------------

    if (
        currentFilter !== "all"
    ) {


        results =
            results.filter(photo => {


                return (
                    photo.photography_type &&
                    photo.photography_type
                        .toLowerCase() ===
                    currentFilter
                        .toLowerCase()
                );


            });


    }



    // -----------------------------
    // SORT
    // -----------------------------

    const sortValue =
        sortMenu.value;


    if (
        sortValue === "newest"
    ) {


        results.sort(
            function(a, b) {

                return (
                    getYear(b.time_period) -
                    getYear(a.time_period)
                );

            }
        );


    }


    else if (
        sortValue === "oldest"
    ) {


        results.sort(
            function(a, b) {

                return (
                    getYear(a.time_period) -
                    getYear(b.time_period)
                );

            }
        );


    }



    // Display filtered/sorted photographs
    displayPhotos(results);


}



// ==========================================
// GET YEAR FOR SORTING
// ==========================================

function getYear(value) {


    // If there is no date
    if (!value) {

        return 0;

    }


    // Convert value to text
    const text =
        String(value);


    // Find a four-digit year
    const year =
        text.match(/\d{4}/);


    if (year) {

        return Number(year[0]);

    }


    return 0;


}



// ==========================================
// OPEN PHOTO MODAL
// ==========================================

function openModal(photo) {


    // Photo
    const modalImage =
        document.getElementById(
            "modal-image"
        );


    modalImage.src =
        photo.image;


    modalImage.alt =
        photo.title;



    // Title
    document.getElementById(
        "modal-title"
    ).textContent =
        photo.title;



    // Photographer
    document.getElementById(
        "modal-photographer"
    ).textContent =
        photo.photographer;



    // Date
    document.getElementById(
        "modal-year"
    ).textContent =
        photo.time_period;



    // Location
    document.getElementById(
        "modal-location"
    ).textContent =
        photo.location;



    // Photography Type
    document.getElementById(
        "modal-type"
    ).textContent =
        photo.photography_type;



    // Medium
    document.getElementById(
        "modal-medium"
    ).textContent =
        photo.medium;



    // Show modal
    document.getElementById(
        "photo-modal"
    ).classList.add(
        "show"
    );


}



// ==========================================
// CLOSE MODAL BUTTON
// ==========================================

document.getElementById(
    "close-modal"
).addEventListener(
    "click",
    function(event) {


        // Prevent card click
        event.stopPropagation();


        closeModal();


    }
);



// ==========================================
// CLOSE MODAL BY CLICKING BACKGROUND
// ==========================================

document.getElementById(
    "photo-modal"
).addEventListener(
    "click",
    function(event) {


        if (
            event.target === this
        ) {

            closeModal();

        }


    }
);



// ==========================================
// CLOSE MODAL WITH ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {


        if (
            event.key === "Escape"
        ) {

            closeModal();

        }


    }
);



// ==========================================
// CLOSE MODAL FUNCTION
// ==========================================

function closeModal() {


    document.getElementById(
        "photo-modal"
    ).classList.remove(
        "show"
    );


}