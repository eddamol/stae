/* =========================
   Video data
   ========================= */

const chapters = {
    1: {
        title: "Kafli 1",
        videos: [
            {
                title: "Vextir - Reikna",
                id: "jtGOnkXHSrM"
            },
            {
                title: "Vaxtavextir - Reikna",
                id: "U1JGbluy2SM"
            },
            {
                title: "Vaxtadagar og bankaár",
                id: "k8Z51JVta8o"
            }
        ]
    },

    2: {
        title: "Kafli 2",
        videos: []
    },

    3: {
        title: "Kafli 3",
        videos: []
    }
};


/* =========================
   Display video cards
   ========================= */

function displayVideos(videos) {

    const videoGrid = document.getElementById("video-grid");

    if (!videoGrid) {
        return;
    }

    videoGrid.innerHTML = "";

    videos.forEach(video => {

        const card = document.createElement("div");

        card.className = "video-card";

        card.innerHTML = `
            <img
                src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg"
                alt="${video.title}"
            >

            <p class="video-card-title">
                ${video.title}
            </p>
        `;

        card.addEventListener("click", () => {
            openVideo(video.id);
        });

        videoGrid.appendChild(card);
    });
}


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
   Close modal by clicking
   outside the video
   ========================= */

const videoModal = document.getElementById("video-modal");

if (videoModal) {

    videoModal.addEventListener("click", function(event) {

        if (event.target === this) {
            closeVideo();
        }

    });
}


/* =========================
   Determine current chapter
   ========================= */

const currentPage = window.location.pathname;

if (currentPage.endsWith("kafli1.html")) {
    displayVideos(chapters[1].videos);
}

if (currentPage.endsWith("kafli2.html")) {
    displayVideos(chapters[2].videos);
}

if (currentPage.endsWith("kafli3.html")) {
    displayVideos(chapters[3].videos);
}
