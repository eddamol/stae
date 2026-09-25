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
   Page navigation
   ========================= */

function showChapter(chapterNumber) {

    const homePage = document.getElementById("home-page");
    const chapterPage = document.getElementById("chapter-page");
    const chapterTitle = document.getElementById("chapter-title");

    homePage.classList.add("hidden");
    chapterPage.classList.remove("hidden");

    const chapter = chapters[chapterNumber];

    chapterTitle.textContent = chapter.title;

    displayVideos(chapter.videos);
}


function showHome() {

    const homePage = document.getElementById("home-page");
    const chapterPage = document.getElementById("chapter-page");

    chapterPage.classList.add("hidden");
    homePage.classList.remove("hidden");
}


/* =========================
   Display video cards
   ========================= */

function displayVideos(videos) {

    const videoGrid = document.getElementById("video-grid");

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
   Close video when clicking
   outside the player
   ========================= */

document.getElementById("video-modal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeVideo();
    }

});
