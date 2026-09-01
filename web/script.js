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

    const flowers = ["🌸", "🌷", "🌹", "🌼"];

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
   SCENE 4 - KẾT & BẮT ĐẦU VẼ TRÁI TIM
========================================= */
endingButton.addEventListener("click", function() {
    // TẮT NHẠC khi sang Scene 4
    music.pause();
    music.currentTime = 0;
    musicPlayer.classList.remove("show");

    // Chuyển sang Scene 4
    showScene(endingScene);

    // BẮT ĐẦU HIỆU ỨNG TRÁI TIM CANVAS
    startHeartAnimation();

    // Reset và hiển thị ảnh Scene 4
    endingImage2.classList.remove("show");

    setTimeout(function() {
        endingImage2.classList.add("show");
    }, 800);
});

/* =========================================
   CẤU HÌNH TRÁI TIM CANVAS (ENGINE SCENE 4)
========================================= */
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let animationFrameId = null;

// Hàm điều chỉnh kích thước Canvas theo màn hình
function resizeCanvas() {
    if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

// Cấu hình trái tim
const settings = {
    particles: {
        length: 500, // Số lượng hạt
        duration: 2, // Thời gian sống (giây)
        velocity: 100, // Tốc độ
        effect: -0.75,
        size: 30, // Kích thước hạt
    },
};

// Khởi tạo Point
const Point = (function () {
    function Point(x, y) {
        this.x = (typeof x !== 'undefined') ? x : 0;
        this.y = (typeof y !== 'undefined') ? y : 0;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.length = function (length) {
        if (typeof length == 'undefined')
            return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    };
    Point.prototype.normalize = function () {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    };
    return Point;
})();

// Quản lý Hạt (Particle)
const Particle = (function () {
    function Particle() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
    }
    Particle.prototype.initialize = function (x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
    };
    Particle.prototype.update = function (deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
    };
    Particle.prototype.draw = function (context, image) {
        function ease(t) {
            return (--t) * t * t + 1;
        }
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    };
    return Particle;
})();

// Pool quản lý các hạt
const ParticlePool = (function () {
    let particles, firstActive = 0, firstFree = 0, duration = settings.particles.duration;

    function ParticlePool(length) {
        particles = new Array(length);
        for (let i = 0; i < particles.length; i++) particles[i] = new Particle();
    }
    ParticlePool.prototype.add = function (x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);
        firstFree++;
        if (firstFree == particles.length) firstFree = 0;
        if (firstActive == firstFree) firstActive++;
        if (firstActive == particles.length) firstActive = 0;
    };
    ParticlePool.prototype.update = function (deltaTime) {
        let i;
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++) particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++) particles[i].update(deltaTime);
            for (i = 0; i < firstFree; i++) particles[i].update(deltaTime);
        }
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
            firstActive++;
            if (firstActive == particles.length) firstActive = 0;
        }
    };
    ParticlePool.prototype.draw = function (context, image) {
        let i;
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++) particles[i].draw(context, image);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++) particles[i].draw(context, image);
            for (i = 0; i < firstFree; i++) particles[i].draw(context, image);
        }
    };
    return ParticlePool;
})();

// Tạo hình trái tim nhỏ
const imageHeart = (function () {
    const canvasMat = document.createElement('canvas');
    const contextMat = canvasMat.getContext('2d');
    canvasMat.width = settings.particles.size;
    canvasMat.height = settings.particles.size;

    function to(t) {
        return new Point(
            160 * Math.pow(Math.sin(t), 3),
            130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
    }
    contextMat.beginPath();
    let t = -Math.PI;
    let p = to(t);
    contextMat.moveTo(settings.particles.size / 2 + p.x * settings.particles.size / 350, settings.particles.size / 2 - p.y * settings.particles.size / 350);
    while (t < Math.PI) {
        t += 0.01;
        p = to(t);
        contextMat.lineTo(settings.particles.size / 2 + p.x * settings.particles.size / 350, settings.particles.size / 2 - p.y * settings.particles.size / 350);
    }
    contextMat.closePath();
    contextMat.fillStyle = '#ea80b0';
    contextMat.fill();

    const img = new Image();
    img.src = canvasMat.toDataURL();
    return img;
})();

// Vòng lặp vẽ animation
const particles = new ParticlePool(settings.particles.length);
const particleRate = settings.particles.length / settings.particles.duration;
let renderTime;

function pointOnHeart(t) {
    return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
    );
}

function renderCanvasHeart() {
    animationFrameId = requestAnimationFrame(renderCanvasHeart);

    const newTime = new Date().getTime() / 1000;
    const deltaTime = newTime - (renderTime || newTime);
    renderTime = newTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const amount = particleRate * deltaTime;
    for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity);
        particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
    }

    particles.update(deltaTime);
    particles.draw(ctx, imageHeart);
}

function startHeartAnimation() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    if (!animationFrameId) {
        renderTime = new Date().getTime() / 1000;
        renderCanvasHeart();
    }
}