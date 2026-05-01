console.log("🔥 ADS SCRAPER DOM AKTIF");

let adsData = [];
let observer = null;

// ======================
// SCAN FUNCTION
// ======================
function scanAds() {
  const cards = document.querySelectorAll("div[role='article']");

  let newCount = 0;

  cards.forEach(card => {
    try {
      const text = card.innerText;

      if (!text || text.length < 30) return;

      // ambil brand (biasanya baris pertama)
      const brand = text.split("\n")[0];

      // ambil body
      const body = text;

      // ambil image
      let image = "";
      const img = card.querySelector("img");
      if (img && img.src && img.src.startsWith("http")) {
        image = img.src;
      }

      // unik key biar ga double
      const key = brand + body.slice(0, 50);

      const exists = adsData.find(a => a.key === key);
      if (exists) return;

      adsData.push({
        key,
        brand,
        body,
        image
      });

      newCount++;

    } catch (e) {}
  });

  if (newCount > 0) {
    console.log("🔥 IKLAN BARU:", newCount);
    console.log("📊 TOTAL:", adsData.length);

    chrome.storage.local.set({ adsData });
  }
}

// ======================
// START OBSERVER
// ======================
function startObserver() {
  if (observer) return;

  observer = new MutationObserver(() => {
    scanAds();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log("🚀 OBSERVER START");
}

// ======================
// STOP OBSERVER
// ======================
function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
    console.log("🛑 OBSERVER STOP");
  }
}

// ======================
// MESSAGE LISTENER
// ======================
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {

  if (req.action === "start") {
    adsData = [];
    chrome.storage.local.set({ adsData });

    startObserver();
    scanAds();

    sendResponse({ status: "started" });
  }

  if (req.action === "stop") {
    stopObserver();
    sendResponse({ status: "stopped", total: adsData.length });
  }

  if (req.action === "getAds") {
    sendResponse({ data: adsData });
  }

});