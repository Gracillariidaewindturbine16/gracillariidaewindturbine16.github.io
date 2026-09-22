document.addEventListener("DOMContentLoaded", () => {
  // 1. 中英雙語切換邏輯
  const langToggleBtn = document.getElementById("langToggle");
  const body = document.body;
  
  // 讀取 LocalStorage 記憶的語言
  const savedLang = localStorage.getItem("loopvity_lang");
  if (savedLang) {
    body.className = savedLang;
  }

  // 點擊按鈕切換
  langToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("lang-en")) {
      body.className = "lang-zh";
      localStorage.setItem("loopvity_lang", "lang-zh");
    } else {
      body.className = "lang-en";
      localStorage.setItem("loopvity_lang", "lang-en");
    }
  });

  // 2. 滾動淡入動畫 (Intersection Observer)
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});
