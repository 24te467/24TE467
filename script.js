// スクロールプログレスバー
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress");
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progress.style.width = scrollPercent + "%";
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Intersection Observerでアニメーション
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});

// 画像遅延読み込み（Lazy Loading）
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });
}