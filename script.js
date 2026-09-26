/* =========================
   Chapter navigation
   ========================= */

const TOTAL_CHAPTERS = 3;

function createArrow(symbol) {

    const arrow = document.createElement("span");

    arrow.className = "nav-arrow";
    arrow.textContent = symbol;

    return arrow;

}

function createNavButton(label, href, extraClass, arrowBefore, arrowAfter) {

    const button = document.createElement("button");

    button.className = `text-button ${extraClass}`;
    button.addEventListener("click", () => {
        window.location.href = href;
    });

    if (arrowBefore) {
        button.appendChild(createArrow(arrowBefore));
    }

    const labelSpan = document.createElement("span");

    labelSpan.className = "nav-label";
    labelSpan.textContent = label;
    button.appendChild(labelSpan);

    if (arrowAfter) {
        button.appendChild(createArrow(arrowAfter));
    }

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
        nav.appendChild(createNavButton(`Kafli ${current - 1}`, `kafli${current - 1}.html`, "nav-prev", "←"));
    }

    nav.appendChild(createNavButton("Heim", "index.html", "nav-home"));

    if (current < TOTAL_CHAPTERS) {
        nav.appendChild(createNavButton(`Kafli ${current + 1}`, `kafli${current + 1}.html`, "nav-next", null, "→"));
    }

}

buildChapterNav();


/* =========================
   Site footer
   ========================= */

function buildFooter() {

    const footer = document.getElementById("site-footer");

    if (!footer) {
        return;
    }

    const aboutButton = document.createElement("button");

    aboutButton.className = "text-button";
    aboutButton.addEventListener("click", () => {
        window.location.href = "about.html";
    });

    const labelSpan = document.createElement("span");

    labelSpan.className = "nav-label";
    labelSpan.textContent = "Um þessa síðu";
    aboutButton.appendChild(labelSpan);

    footer.appendChild(aboutButton);

}

buildFooter();


/* =========================
   Video cards
   ========================= */

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {

    card.addEventListener("click", () => {

        const videoId = card.dataset.videoId;
        const activityUrl = card.dataset.activity;

        openVideo(videoId, activityUrl);

    });

});


/* =========================
   Open video
   ========================= */

function openVideo(videoId, activityUrl) {

    const modal = document.getElementById("video-modal");
    const player = document.getElementById("youtube-player");
    const activityButton = document.getElementById("activity-button");

    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    if (activityUrl) {
        modal.dataset.activityUrl = activityUrl;
        activityButton.classList.remove("hidden");
    } else {
        delete modal.dataset.activityUrl;
        activityButton.classList.add("hidden");
    }

    showVideoView();
    modal.classList.remove("hidden");

}


/* =========================
   Close video
   ========================= */

function closeVideo() {

    const modal = document.getElementById("video-modal");
    const player = document.getElementById("youtube-player");

    showVideoView();

    player.src = "";
    modal.classList.add("hidden");

}


/* =========================
   Show video / activity view
   ========================= */

function showActivityView() {

    const modal = document.getElementById("video-modal");
    const activityPlayer = document.getElementById("activity-player");

    activityPlayer.src = modal.dataset.activityUrl;

    document.querySelector(".video-container").classList.add("hidden");
    document.getElementById("activity-button").classList.add("hidden");
    document.querySelector(".activity-container").classList.remove("hidden");

    modal.classList.add("activity-mode");

}

function showVideoView() {

    const modal = document.getElementById("video-modal");
    const activityPlayer = document.getElementById("activity-player");

    activityPlayer.src = "";

    document.querySelector(".activity-container").classList.add("hidden");
    document.querySelector(".video-container").classList.remove("hidden");

    if (modal.dataset.activityUrl) {
        document.getElementById("activity-button").classList.remove("hidden");
    }

    modal.classList.remove("activity-mode");

}


/* =========================
   Close video when clicking
   outside the player
   ========================= */

const videoModal = document.getElementById("video-modal");

if (videoModal) {

    videoModal.addEventListener("click", function(event) {

        if (event.target === this && !this.classList.contains("activity-mode")) {
            closeVideo();
        }

    });

}
