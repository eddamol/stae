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
