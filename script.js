document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. 中英雙語切換邏輯
  // ==========================================
  const langToggleBtn = document.getElementById("langToggle");
  const body = document.body;
  
  // 檢查用戶之前是否選擇過語言 (存在 LocalStorage 中)
  const savedLang = localStorage.getItem("loopvity_lang");
  if (savedLang) {
    body.className = savedLang; // 套用 'lang-en' 或 'lang-zh'
  }

  // 點擊按鈕時切換語言
  langToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("lang-en")) {
      body.classList.replace("lang-en", "lang-zh");
      localStorage.setItem("loopvity_lang", "lang-zh");
    } else {
      body.classList.replace("lang-zh", "lang-en");
      localStorage.setItem("loopvity_lang", "lang-en");
    }
  });


  // ==========================================
  // 2. Apple 風格滾動淡入動畫 (Intersection Observer)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // 當元素露出 15% 時觸發動畫
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 動畫執行一次後就取消觀察，節省效能
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 取得所有帶有 fade-in 類別的元素並開始觀察
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

});
