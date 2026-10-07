// ==========================================
// PHOTOGRAPHY COLLECTION
// ==========================================


// Store all photographs

let photos = [];


// Store current filters

let currentFilters = {
    type: "all",
    time: "all",
    medium: "all",
    location: "all"
};


// ==========================================
// GET ELEMENTS
// ==========================================

const filterSelects =
    document.querySelectorAll(
        ".filter-select"
    );


const resetButton =
    document.getElementById(
        "reset-filters"
    );


const sortMenu =
    document.getElementById(
        "sort"
    );


// ==========================================
// LOAD PHOTOGRAPHS
// ==========================================

fetch("data.json")

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Could not load data.json"
            );

        }

        return response.json();

    })


    .then(data => {

        photos = data;

        console.log(
            "Photographs loaded:",
            photos
        );

        applyFilters();

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


    // Clear current photographs

    grid.innerHTML = "";


    // Update photograph count

    document.getElementById(
        "photo-count"
    ).textContent =
        photoList.length +
        " photographs";


    // If no photographs match

    if (photoList.length === 0) {

        grid.innerHTML = `
            <div class="no-results">
                No photographs match
                these filters.
            </div>
        `;

        return;

    }


    // Create photograph cards

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


        // Image error

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


        // Open modal when photograph is clicked

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
// FILTER DROPDOWNS
// ==========================================

filterSelects.forEach(select => {


    select.addEventListener(
        "change",
        function() {


            // Find filter category

            const group =
                this.dataset.group;


            // Find selected value

            const value =
                this.value;


            // Save selected filter

            currentFilters[group] =
                value;


            // Apply filters

            applyFilters();


        }
    );


});


// ==========================================
// RESET FILTERS
// ==========================================

resetButton.addEventListener(
    "click",
    function() {


        // Reset filter data

        currentFilters = {

            type: "all",

            time: "all",

            medium: "all",

            location: "all"

        };


        // Reset dropdown menus

        filterSelects.forEach(
            select => {

                select.value = "all";

            }
        );


        // Reset sort menu

        sortMenu.value =
            "original";


        // Show all photographs again

        applyFilters();


    }
);


// ==========================================
// SORT MENU
// ==========================================

sortMenu.addEventListener(
    "change",
    function() {

        applyFilters();

    }
);


// ==========================================
// APPLY FILTERS
// ==========================================

function applyFilters() {


    // Start with every photograph

    let results =
        [...photos];


    // ======================================
    // PHOTOGRAPHY TYPE
    // ======================================

    if (
        currentFilters.type !== "all"
    ) {

        results =
            results.filter(photo => {


                if (
                    !photo.photography_type
                ) {

                    return false;

                }


                return (

                    photo.photography_type
                        .toLowerCase() ===

                    currentFilters.type
                        .toLowerCase()

                );


            });

    }


    // ======================================
    // TIME PERIOD
    // ======================================

    if (
        currentFilters.time !== "all"
    ) {

        results =
            results.filter(photo => {


                const year =
                    getYear(
                        photo.time_period
                    );


                if (year === 0) {

                    return false;

                }


                // 1800s

                if (
                    currentFilters.time ===
                    "1800"
                ) {

                    return (
                        year >= 1800 &&
                        year <= 1899
                    );

                }


                // 1900–1949

                if (
                    currentFilters.time ===
                    "1900"
                ) {

                    return (
                        year >= 1900 &&
                        year <= 1949
                    );

                }


                // 1950–1999

                if (
                    currentFilters.time ===
                    "1950"
                ) {

                    return (
                        year >= 1950 &&
                        year <= 1999
                    );

                }


                // 2000–Present

                if (
                    currentFilters.time ===
                    "2000"
                ) {

                    return year >= 2000;

                }


                return true;


            });

    }


    // ======================================
    // MEDIUM
    // ======================================

    if (
        currentFilters.medium !== "all"
    ) {

        results =
            results.filter(photo => {


                if (!photo.medium) {

                    return false;

                }


                const medium =
                    photo.medium
                        .toLowerCase();


                // Digital

                if (
                    currentFilters.medium ===
                    "digital"
                ) {

                    return medium.includes(
                        "digital"
                    );

                }


                // Color Film

                if (
                    currentFilters.medium ===
                    "color"
                ) {

                    return (

                        medium.includes(
                            "color"
                        ) ||

                        medium.includes(
                            "kodachrome"
                        )

                    );

                }


                // Black + White

                if (
                    currentFilters.medium ===
                    "black-and-white"
                ) {

                    return (

                        medium.includes(
                            "black-and-white"
                        ) ||

                        medium.includes(
                            "black and white"
                        ) ||

                        medium.includes(
                            "black & white"
                        )

                    );

                }


                // Silver Print

                if (
                    currentFilters.medium ===
                    "silver"
                ) {

                    return medium.includes(
                        "silver"
                    );

                }


                return true;


            });

    }


    // ======================================
    // LOCATION
    // ======================================

    if (
        currentFilters.location !== "all"
    ) {

        results =
            results.filter(photo => {


                if (!photo.location) {

                    return false;

                }


                const location =
                    photo.location
                        .toLowerCase();


                // UNITED STATES

                if (
                    currentFilters.location ===
                    "united states"
                ) {

                    return (

                        location.includes(
                            "united states"
                        ) ||

                        location.includes(
                            "usa"
                        ) ||

                        location.includes(
                            "new york"
                        ) ||

                        location.includes(
                            "chicago"
                        ) ||

                        location.includes(
                            "washington"
                        ) ||

                        location.includes(
                            "alabama"
                        ) ||

                        location.includes(
                            "maine"
                        ) ||

                        location.includes(
                            "houston"
                        ) ||

                        location.includes(
                            "texas"
                        ) ||

                        location.includes(
                            "georgia"
                        ) ||

                        location.includes(
                            "south carolina"
                        )

                    );

                }


                // EUROPE

                if (
                    currentFilters.location ===
                    "europe"
                ) {

                    return (

                        location.includes(
                            "france"
                        ) ||

                        location.includes(
                            "england"
                        ) ||

                        location.includes(
                            "paris"
                        ) ||

                        location.includes(
                            "london"
                        ) ||

                        location.includes(
                            "italy"
                        ) ||

                        location.includes(
                            "germany"
                        ) ||

                        location.includes(
                            "spain"
                        )

                    );

                }


                // ASIA

                if (
                    currentFilters.location ===
                    "asia"
                ) {

                    return (

                        location.includes(
                            "india"
                        ) ||

                        location.includes(
                            "pakistan"
                        ) ||

                        location.includes(
                            "kuwait"
                        ) ||

                        location.includes(
                            "afghanistan"
                        ) ||

                        location.includes(
                            "china"
                        ) ||

                        location.includes(
                            "japan"
                        )

                    );

                }


                // AFRICA

                if (
                    currentFilters.location ===
                    "africa"
                ) {

                    return (

                        location.includes(
                            "ethiopia"
                        ) ||

                        location.includes(
                            "africa"
                        )

                    );

                }


                // AUSTRALIA

                if (
                    currentFilters.location ===
                    "australia"
                ) {

                    return location.includes(
                        "australia"
                    );

                }


                return true;


            });

    }


    // ======================================
    // SORT
    // ======================================

    const sortValue =
        sortMenu.value;


    // NEWEST → OLDEST

    if (
        sortValue === "newest"
    ) {

        results.sort(
            function(a, b) {

                return (
                    getYear(
                        b.time_period
                    ) -
                    getYear(
                        a.time_period
                    )
                );

            }
        );

    }


    // OLDEST → NEWEST

    else if (
        sortValue === "oldest"
    ) {

        results.sort(
            function(a, b) {

                return (
                    getYear(
                        a.time_period
                    ) -
                    getYear(
                        b.time_period
                    )
                );

            }
        );

    }


    // PHOTOGRAPHER A → Z

    else if (
        sortValue === "photographer-az"
    ) {

        results.sort(
            function(a, b) {

                const photographerA =
                    a.photographer
                        ? a.photographer.trim()
                        : "";

                const photographerB =
                    b.photographer
                        ? b.photographer.trim()
                        : "";

                return photographerA.localeCompare(
                    photographerB,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                );

            }
        );

    }


    // PHOTOGRAPHER Z → A

    else if (
        sortValue === "photographer-za"
    ) {

        results.sort(
            function(a, b) {

                const photographerA =
                    a.photographer
                        ? a.photographer.trim()
                        : "";

                const photographerB =
                    b.photographer
                        ? b.photographer.trim()
                        : "";

                return photographerB.localeCompare(
                    photographerA,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                );

            }
        );

    }


    // Display final results

    displayPhotos(results);

}


// ==========================================
// GET YEAR
// ==========================================

function getYear(value) {


    if (!value) {

        return 0;

    }


    const text =
        String(value);


    const year =
        text.match(
            /\d{4}/
        );


    if (year) {

        return Number(
            year[0]
        );

    }


    return 0;

}


// ==========================================
// OPEN PHOTO MODAL
// ==========================================

function openModal(photo) {


    // IMAGE

    const modalImage =
        document.getElementById(
            "modal-image"
        );


    modalImage.src =
        photo.image;


    modalImage.alt =
        photo.title;


    // TITLE

    document.getElementById(
        "modal-title"
    ).textContent =
        photo.title;


    // PHOTOGRAPHER

    document.getElementById(
        "modal-photographer"
    ).textContent =
        photo.photographer;


    // DATE / TIME PERIOD

    document.getElementById(
        "modal-year"
    ).textContent =
        photo.time_period;


    // LOCATION

    document.getElementById(
        "modal-location"
    ).textContent =
        photo.location;


    // PHOTOGRAPHY TYPE

    document.getElementById(
        "modal-type"
    ).textContent =
        photo.photography_type;


    // MEDIUM

    document.getElementById(
        "modal-medium"
    ).textContent =
        photo.medium;


    // ARTICLE / SOURCE LINK

    const modalLink =
        document.getElementById(
            "modal-link"
        );


    if (photo.link) {

        modalLink.href =
            photo.link;

        modalLink.style.display =
            "inline-block";

    }

    else {

        modalLink.href =
            "#";

        modalLink.style.display =
            "none";

    }


    // SHOW MODAL

    document.getElementById(
        "photo-modal"
    ).classList.add(
        "show"
    );


    // Prevent collection page behind
    // modal from scrolling

    document.body.style.overflow =
        "hidden";

}


// ==========================================
// CLOSE MODAL BUTTON
// ==========================================

document.getElementById(
    "close-modal"
).addEventListener(
    "click",
    function(event) {


        event.stopPropagation();


        closeModal();


    }
);


// ==========================================
// CLOSE MODAL BY CLICKING DARK BACKGROUND
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
// CLOSE MODAL
// ==========================================

function closeModal() {


    document.getElementById(
        "photo-modal"
    ).classList.remove(
        "show"
    );


    // Turn normal page scrolling back on

    document.body.style.overflow =
        "";

}

// ==========================================
// PHOTOGRAPHER BIOGRAPHIES
// ==========================================

const artists = [

    {
        name: "Akram Zaatari",
        years: "Born 1966",
        image: "Akram Zaatari.jpg",
        bio: "Akram Zaatari is a Lebanese artist whose work investigates photography, archives, memory, and the ways images record personal and social histories. His projects frequently examine existing photographic collections and their cultural meanings.",
        link: "https://www.kurimanzutto.com/artists/akram-zaatari#tab:slideshow;tab-1:slideshow"
    },

    {
        name: "Bill Brandt",
        years: "1904–1983",
        image: "bill-brandt.jpg",
        bio: "Bill Brandt was a British photographer whose work ranged from social documentary photography to portraiture, landscape, and experimental studies of the human body. His photographs of British life became an important record of the twentieth century.",
        link: "https://www.moma.org/artists/740-bill-brandt"
    },

 {
        name: "Cameron Spencer",
        years: "Contemporary photographer",
        image: "cameron spencer.jpeg",
        bio: "Cameron Spencer is an Australian sports photographer known for capturing the energy, emotion, and decisive moments of major sporting events. As a staff photographer for Getty Images, he has covered the Olympic Games, Rugby and FIFA World Cups, international cricket, and other competitions around the world. His photographs have been published internationally in newspapers, magazines, and sports publications.",
        link: "http://www.cameronjspencer.com/about"
    },

     {
        name: "Camille Menzies",
        years: "Contemporary Photographer",
        image: "camillemenzies.webp",
        bio: "A Furman University graduate and sports photographer, they spent four years working as the student team photographer and coaches’ assistant for Furman Football. With a background in media studies and visual strategy, their work combines a passion for sports with photography and visual storytelling. Their experience working closely with a Division I football program has shaped an approach focused on capturing the energy, emotion, and unique moments that define sports.",
        link: "https://camillemenzies.squarespace.com/"
    },

    {
        name: "Gordon Parks",
        years: "1912–2006",
        image: "gordon-parks.jpg",
        bio: "Gordon Parks was an American photographer, filmmaker, writer, and composer. His photography documented race, poverty, inequality, fashion, and American life while combining journalism with a highly distinctive visual approach.",
        link: "https://www.gordonparksfoundation.org/"
    },

    {
        name: "Henri Cartier-Bresson",
        years: "1908–2004",
        image: "Henri Cartier-Bresson.webp",
        bio: "Henri Cartier-Bresson was a French photographer and a major figure in twentieth-century photography. His approach to street photography emphasized observation, geometry, timing, and what became widely known as the decisive moment.",
        link: "https://www.magnumphotos.com/photographer/henri-cartier-bresson/"
    },

    {
        name: "Jerry Takigawa",
        years: "Contemporary photographer",
        image: "jerry-takigawa.jpeg",
        bio: "Jerry Takigawa is an American photographer whose work explores identity, memory, environmental issues, and Japanese American history. His projects often combine photography with archival material and carefully constructed visual narratives.",
        link: "https://takigawaphoto.com/"
    },

    {
        name: "Lewis Hine",
        years: "1874–1940",
        image: "lewis-hine.jpeg",
        bio: "Lewis Hine was an American sociologist and photographer who used photography as a tool for social reform. His photographs of child laborers documented working conditions across the United States and helped build public support for child labor reform.",
        link: "https://www.icp.org/browse/archive/constituents/lewis-wickes-hine"
    },

    {
        name: "Louis Daguerre",
        years: "1787–1851",
        image: "louis-daguerre.jpg",
        bio: "Louis Daguerre was a French artist and inventor whose experiments helped establish one of the earliest practical photographic processes. The daguerreotype, announced in 1839, became an important milestone in the development of photography.",
        link: "https://www.britannica.com/biography/Louis-Daguerre"
    },

    {
        name: "Morgan Hancock",
        years: "Contemporary Photographer",
        image: "morganhancock.jpg",
        bio: "Morgan Hancock is a Victoria-based photographer with experience across a wide range of subject matter, including major sporting events, political moments, community stories, corporate functions, and editorial features. His work has been published globally in newspapers, magazines, books, and advertising campaigns. ",
        link: "https://www.morganhancockphoto.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafpWHASW5D0cD123It2cFfShaVMwmXbCd7Tcp0mQees3ADa3LInCBJw9LkB3g_aem_4PGA_vGFp_BkerWYhUBudA"
    },

    {
        name: "Neil Leifer",
        years: "Born 1942",
        image: "neil-leifer.webp",
        bio: "Neil Leifer is an American photographer whose images helped define modern sports photography. He is particularly known for photographing boxing and for creating some of the most recognizable images of Muhammad Ali.",
        link: "https://neilleifer.com/"
    },

    {
        name: "Nine François",
        years: "Contemporary Photographer",
        image: "ninefrancois.jpeg",      
        bio: "Nine Francois is an Austin-based photographer and educator whose work explores photography as a form of visual storytelling. She holds a Master of Fine Arts in photography from the University of Texas at Austin, and her work has been exhibited and published internationally. In addition to creating her own photographs, Francois has taught photography at several Texas universities and leads community projects and workshops centered on creativity, photography, writing, and meaningful storytelling.",  
        link: "https://ninefrancois.com/about/"
    },

    {
        name: "Patty Carroll",
        years: "Contemporary photographer",
        image: "patty-carroll.webp",
        bio: "Patty Carroll is an American photographer known for highly constructed, colorful scenes exploring domesticity, identity, consumer culture, and the expectations placed on women. Her staged photographs often overwhelm their figures with household objects and elaborate environments.",
        link: "https://www.pattycarroll.com/"
    },

    {
        name: "Philippe Halsman",
        years: "1906–1979",
        image: "philippe-halsman.jpg",
        bio: "Philippe Halsman was a portrait photographer known for inventive and often surreal images of major twentieth-century figures. His photographs combined careful technical control with humor, movement, and experimentation.",
        link: "https://philippehalsman.com/"
    },

     {
        name: "Réhahn",
        years: "Contemporary Photographer",
        image: "rehan.jpeg",      
        bio: "Réhahn is a French photographer known for combining fine art and documentary photography to explore people, culture, and traditions around the world. Based in Hoi An, Vietnam, his work emphasizes building meaningful connections with his subjects and telling the stories behind their portraits. His long-term Precious Heritage Project documents Vietnam’s diverse ethnic groups and works to preserve and share their cultural traditions through photography, stories, and artifacts.",  
        link: "https://www.rehahnphotographer.com/biography-rehahn/"
    },

    {
        name: "Richard Avedon",
        years: "1923–2004",
        image: "Richard Avedon.jpg",
        bio: "Richard Avedon was an American fashion and portrait photographer known for stripped-down portraiture, expressive movement, and experimentation. His work helped transform both fashion photography and photographic portraiture.",
        link: "https://www.avedonfoundation.org/"
    },

    {
    name: "Robert Weingarten",
    years: "Born 1941",
    image: "robertw.jpg",
    bio: "Robert Weingarten is an American photographer whose work ranges from traditional black-and-white photography to experimental digital compositions. After a career in finance, he committed himself fully to photography and has since explored landscape, portraiture, identity, and photographic manipulation. His work has been exhibited internationally and is held in major museum collections.",
    link: "https://www.robertweingarten.com/bio"
    },

    {
        name: "Robert Frank",
        years: "1924–2019",
        image: "robert-frank.jpg",
        bio: "Robert Frank was a Swiss-American photographer and filmmaker whose influential book The Americans presented a personal and unconventional view of postwar American life. His loose, observational approach challenged established ideas about documentary photography.",
        link: "https://www.icp.org/browse/archive/constituents/robert-frank"
    },

    {
        name: "Sebastião Salgado",
        years: "1944–2025",
        image: "Sebastião-Salgado.jpg",
        bio: "Sebastião Salgado was a Brazilian documentary photographer whose large-scale black-and-white projects examined labor, migration, inequality, landscapes, and the relationship between people and the natural world.",
        link: "https://www.icp.org/browse/archive/constituents/sebastiao-salgado"
    },

    {
        name: "Steve McCurry",
        years: "Born 1950",
        image: "steve-mccurry.jpeg",
        bio: "Steve McCurry is an American photographer known for richly colored documentary and portrait photography. His work frequently explores people, culture, conflict, and everyday life around the world. His portrait Afghan Girl became one of the most recognizable photographs published by National Geographic.",
        link: "https://www.stevemccurry.com/"
    },

    {
    name: "Tom Jenkins",
    years: "Contemporary photographer",
    image: "tomj.webp",
    bio: "Tom Jenkins is a British sports photographer who has spent more than three decades documenting major sporting events and athletes around the world. Working primarily for The Guardian, he has photographed multiple Olympic Games and football World Cups as well as a wide range of professional sports. His photography is known for capturing decisive moments, emotion, and the atmosphere surrounding competition, and his work has earned numerous international sports photography awards.",
    link: "https://www.tomjenkinsphoto.com/about"
},

    {
        name: "Tony Walsh",
        years: "Contemporary Photographer",
        image: "tonywalsh.webp",
        bio: "Tony is currently working as a photographer at the University of Georgia Athletic Association. He is responsible for the daily photo coverage of all 21 sports which includes photographing, editing, and archiving. He is also responsible for studio photography for promotional campaigns where images are used for social media, posters, advertisements, and more.",
        link: "https://www.tonywalshphoto.com/"
    },

    {
        name: "Vivian Maier",
        years: "1926–2009",
        image: "vivian-maier.jpg",
        bio: "Vivian Maier was an American street photographer whose enormous body of photographs was largely unknown during her lifetime. Her images document everyday urban life through portraits, reflections, gestures, architecture, and carefully observed moments.",
        link: "https://www.vivianmaier.com/"
    },

    {
        name: "Walter Iooss Jr.",
        years: "Born 1943",
        image: "walter.webp",
        bio: "Walter Iooss Jr. is an American photographer known for his influential sports photography. Over a career spanning decades, he has photographed major athletes and sporting events, including an extensive body of work featuring Michael Jordan.",
        link: "https://www.walteriooss.com/"
    }

];


// ==========================================
// ARTIST CAROUSEL VARIABLES
// ==========================================

let currentArtist = 0;


const artistTrack =
    document.getElementById(
        "artist-carousel-track"
    );


const artistPrev =
    document.getElementById(
        "artist-prev"
    );


const artistNext =
    document.getElementById(
        "artist-next"
    );


const artistCounter =
    document.getElementById(
        "artist-counter"
    );


const artistDots =
    document.getElementById(
        "artist-dots"
    );


// ==========================================
// CREATE ARTIST CARDS
// ==========================================

function createArtistCarousel() {

    artistTrack.innerHTML = "";

    artistDots.innerHTML = "";


    artists.forEach(
        function(artist, index) {


            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "artist-card"
            );


            card.innerHTML = `

                <div class="artist-image-wrap">

                    <img
                        src="${artist.image}"
                        alt="${artist.name}"
                        class="artist-image"
                    >

                </div>


                <div class="artist-info">

                    <div class="artist-number">
                        PHOTOGRAPHER
                        ${String(index + 1).padStart(2, "0")}
                    </div>


                    <h3 class="artist-name">
                        ${artist.name}
                    </h3>


                    <div class="artist-years">
                        ${artist.years}
                    </div>


                    <p class="artist-bio">
                        ${artist.bio}
                    </p>


                    <a
                        href="${artist.link}"
                        class="artist-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more about
                        ${artist.name} →
                    </a>

                </div>

            `;


            artistTrack.appendChild(
                card
            );


            // CREATE DOT

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";


            dot.classList.add(
                "artist-dot"
            );


            dot.setAttribute(
                "aria-label",
                `View ${artist.name}`
            );


            dot.addEventListener(
                "click",
                function() {

                    currentArtist =
                        index;

                    updateArtistCarousel();

                }
            );


            artistDots.appendChild(
                dot
            );


        }
    );


    updateArtistCarousel();

}


// ==========================================
// UPDATE ARTIST CAROUSEL
// ==========================================

function updateArtistCarousel() {


    artistTrack.style.transform =
        `translateX(-${currentArtist * 100}%)`;


    artistCounter.textContent =
        `${currentArtist + 1} / ${artists.length}`;


    const dots =
        document.querySelectorAll(
            ".artist-dot"
        );


    dots.forEach(
        function(dot, index) {


            dot.classList.toggle(
                "active",
                index === currentArtist
            );


        }
    );

}


// ==========================================
// NEXT ARTIST
// ==========================================

artistNext.addEventListener(
    "click",
    function() {


        currentArtist++;


        if (
            currentArtist >=
            artists.length
        ) {

            currentArtist = 0;

        }


        updateArtistCarousel();

    }
);


// ==========================================
// PREVIOUS ARTIST
// ==========================================

artistPrev.addEventListener(
    "click",
    function() {


        currentArtist--;


        if (
            currentArtist < 0
        ) {

            currentArtist =
                artists.length - 1;

        }


        updateArtistCarousel();

    }
);


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {


        if (
            event.key === "ArrowRight"
        ) {

            currentArtist++;

            if (
                currentArtist >=
                artists.length
            ) {

                currentArtist = 0;

            }

            updateArtistCarousel();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            currentArtist--;

            if (
                currentArtist < 0
            ) {

                currentArtist =
                    artists.length - 1;

            }

            updateArtistCarousel();

        }


    }
);


// ==========================================
// START ARTIST CAROUSEL
// ==========================================

createArtistCarousel();