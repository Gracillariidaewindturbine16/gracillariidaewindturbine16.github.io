document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. 中英雙語切換邏輯 (支援 LocalStorage 記憶)
  // =========================================================
  const langToggleBtn = document.getElementById("langToggle");
  const body = document.body;

  // 讀取先前儲存的語言設定（預設為繁體中文 lang-zh）
  const savedLang = localStorage.getItem("loopvity_lang");
  if (savedLang) {
    body.className = savedLang;
  }

  // 點擊右上角按鈕時切換
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      if (body.classList.contains("lang-en")) {
        body.className = "lang-zh";
        localStorage.setItem("loopvity_lang", "lang-zh");
      } else {
        body.className = "lang-en";
        localStorage.setItem("loopvity_lang", "lang-en");
      }
    });
  }

  // =========================================================
  // 2. 滾動淡入動畫 (Intersection Observer)
  // =========================================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => observer.observe(el));

  // =========================================================
  // 3. 自動讀取 Decap CMS 內容 (動態更新首頁文字與聯絡資訊)
  // =========================================================
  fetch("./content/home.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON file not found or network error");
      }
      return response.json();
    })
    .then(data => {
      // 更新主視覺副標題 (Eyebrow)
      const eyebrowEn = document.querySelector(".hero-eyebrow.en");
      const eyebrowZh = document.querySelector(".hero-eyebrow.zh");
      if (eyebrowEn && data.hero_eyebrow_en) eyebrowEn.innerText = data.hero_eyebrow_en;
      if (eyebrowZh && data.hero_eyebrow_zh) eyebrowZh.innerText = data.hero_eyebrow_zh;

      // 更新主視覺大標題 (Title，將換行符號轉為 <br>)
      const heroTitleEn = document.querySelector(".hero-title.en");
      const heroTitleZh = document.querySelector(".hero-title.zh");
      if (heroTitleEn && data.hero_title_en) {
        heroTitleEn.innerHTML = data.hero_title_en.replace(/\n/g, "<br>");
      }
      if (heroTitleZh && data.hero_title_zh) {
        heroTitleZh.innerHTML = data.hero_title_zh.replace(/\n/g, "<br>");
      }

      // 更新簡介說明 (Subtitle)
      const heroSubEn = document.querySelector(".hero-subtitle.en");
      const heroSubZh = document.querySelector(".hero-subtitle.zh");
      if (heroSubEn && data.hero_subtitle_en) heroSubEn.innerText = data.hero_subtitle_en;
      if (heroSubZh && data.hero_subtitle_zh) heroSubZh.innerText = data.hero_subtitle_zh;

      // 更新 WhatsApp 聯絡資訊與按鈕連結
      if (data.whatsapp_phone) {
        const rawNumber = data.whatsapp_phone.replace(/\D/g, "");
        const waButtons = document.querySelectorAll(".whatsapp-btn");
        waButtons.forEach(btn => {
          btn.href = `https://wa.me/${rawNumber}`;
        });

        const waTextSpan = document.querySelector(".info-item i.fa-whatsapp + span");
        if (waTextSpan) waTextSpan.innerText = data.whatsapp_phone;
      }

      // 更新聯絡信箱
      if (data.contact_email) {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
          link.href = `mailto:${data.contact_email}`;
          if (link.innerText.includes("@")) {
            link.innerText = data.contact_email;
          }
        });

        const emailTextSpan = document.querySelector(".info-item i.fa-envelope + span");
        if (emailTextSpan) emailTextSpan.innerText = data.contact_email;
      }
    })
    .catch(() => {
      // 若尚未建立 content/home.json，靜默保留 HTML 原生靜態文案
    });
});
