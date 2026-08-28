/* =========================================
   LẤY CÁC PHẦN TỬ HTML
========================================= */
const intro = document.getElementById("intro");
const flowerScene = document.getElementById("flowerScene");
const letterScene = document.getElementById("letterScene");
const nextButton = document.getElementById("nextButton");
const letterButton = document.getElementById("letterButton");
const music = document.getElementById("backgroundMusic");
const musicPlayer = document.querySelector(".music-player");
const flowerContainer = document.getElementById("flowers-container");
const heartContainer = document.getElementById("hearts-container");
const endingScene = document.getElementById("endingScene");
const endingButton = document.getElementById("endingButton");
const endingImage1 = document.getElementById("endingImage1");
const endingImage2 = document.getElementById("endingImage2");
/* =========================================
   HÀM CHUYỂN MÀN HÌNH
========================================= */
function showScene(scene) {
    document.querySelectorAll(".scene").forEach(function(sceneItem) {
        sceneItem.classList.remove("active");
    });
    scene.classList.add("active");
}

/* =========================================
   BẬT NHẠC
========================================= */
function startMusic() {
    music.volume = 0.7;

    music.currentTime = 0;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise
            .then(function () {
                console.log("🎵 Music đang phát");
                console.log("Paused:", music.paused);
                console.log("Volume:", music.volume);
                console.log("Current time:", music.currentTime);
            })
            .catch(function (error) {
                console.error("❌ Không phát được nhạc:", error);
            });
    }
}

/* =========================================
   TẠO HOA RƠI
========================================= */
function createFlower() {
    const flower = document.createElement("div");
    flower.className = "falling-flower";

    const flowers = ["🌸", "🌷", "🌹", "🩵", "🌼", "💮"];

    const randomFlower = Math.floor(Math.random() * flowers.length);
    flower.innerText = flowers[randomFlower];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = (15 + Math.random() * 25) + "px";
    flower.style.animationDuration = (5 + Math.random() * 5) + "s";

    document.getElementById("flowers-container").appendChild(flower);

    setTimeout(function() {
        flower.remove();
    }, 10000);
}

/* =========================================
   TẠO TIM BAY
========================================= */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 10000);
}

/* =========================================
   NÚT "TIẾP TỤC"
========================================= */
nextButton.addEventListener("click", function() {
    showScene(flowerScene);
    startMusic();
    for (let i = 0; i < 15; i++) {
        setTimeout(createFlower, i * 150);
    }
    
});

/* =========================================
   NÚT "MỞ THƯ"
========================================= */
letterButton.addEventListener("click", function() {
    showScene(letterScene);
    startMusic();
    musicPlayer.classList.add("show");

    // for (let i = 0; i < 10; i++) {
    //     setTimeout(createHeart, i * 200);
    // }
    
    clearInterval(flowerInterval);
    clearInterval(heartInterval);
    flowerContainer.innerHTML = "";
    heartContainer.innerHTML = "";
    flowerContainer.classList.add("hidden");
    heartContainer.classList.add("hidden");
});

/* =========================================
   HOA RƠI LIÊN TỤC
========================================= */
// setInterval(createFlower, 1200);
const flowerInterval = setInterval(createFlower, 1200);

// /* =========================================
//    TIM BAY LIÊN TỤC
// ========================================= */
// setInterval(createHeart, 2500);
const heartInterval = setInterval(createHeart, 2500);

/* =========================================
   SCENE 4 - KẾT
========================================= */

endingButton.addEventListener("click", function() {
    // TẮT NHẠC khi sang Scene 4
    music.pause();
    music.currentTime = 0;
    musicPlayer.classList.remove("show");

    // Chuyển sang Scene 4
    showScene(endingScene);

    // Reset ảnh
    endingImage1.classList.remove("show");
    endingImage2.classList.remove("show");

    // Ảnh 1 xuất hiện
    setTimeout(function() {
        endingImage1.classList.add("show");
    }, 300);

    // Sau 3 giây, ảnh 2 xuất hiện
    setTimeout(function() {
        endingImage2.classList.add("show");
    }, 1800);

});