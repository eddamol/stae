/* =========================
   Chapter navigation
   ========================= */

const TOTAL_CHAPTERS = 3;

function createNavButton(label, href) {

    const button = document.createElement("button");

    button.textContent = label;
    button.addEventListener("click", () => {
        window.location.href = href;
    });

    return button;

}

function buildChapterNav() {

    const chapterPage = document.querySelector("[data-chapter]");
    const nav = document.getElementById("chapter-nav");

    if (!chapterPage || !nav) {
        return;
    }

    const current = Number(chapterPage.dataset.chapter);

    if (current > 1) {
        nav.appendChild(createNavButton(`Kafli ${current - 1}`, `kafli${current - 1}.html`));
    }

    nav.appendChild(createNavButton("Heim", "index.html"));

    if (current < TOTAL_CHAPTERS) {
        nav.appendChild(createNavButton(`Kafli ${current + 1}`, `kafli${current + 1}.html`));
    }

}

buildChapterNav();


/* =========================
   Video cards
   ========================= */

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {

    card.addEventListener("click", () => {

        const videoId = card.dataset.videoId;

        openVideo(videoId);

    });

});


/* =========================
   Open video
   ========================= */

function openVideo(videoId) {

    const modal = document.getElementById("video-modal");
    const player = document.getElementById("youtube-player");

    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    modal.classList.remove("hidden");

}


/* =========================
   Close video
   ========================= */

function closeVideo() {

    const modal = document.getElementById("video-modal");
    const player = document.getElementById("youtube-player");

    player.src = "";

    modal.classList.add("hidden");

}


/* =========================
   Close video when clicking
   outside the player
   ========================= */

const videoModal = document.getElementById("video-modal");

if (videoModal) {

    videoModal.addEventListener("click", function(event) {

        if (event.target === this) {
            closeVideo();
        }

    });

}
