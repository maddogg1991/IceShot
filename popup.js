document.addEventListener("DOMContentLoaded", () => {
  const btnFull = document.getElementById("btnFull");
  const btnVisible = document.getElementById("btnVisible");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0]?.url || "";

    const isBlocked =
      url.startsWith("about:") ||
      url.startsWith("file:") ||
      url.startsWith("chrome:") ||
      url.startsWith("moz-extension:") ||
      url.startsWith("moz-nullprincipal:") || // Firefox doing Firefox things
      url.includes("addons.mozilla.org");      // AMO blocks everything

    if (isBlocked) {
      [btnFull, btnVisible].forEach((btn) => {
        btn.disabled = true;
        btn.title = "⚠️ Screenshots not allowed on this page.";
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      });
    }
  });

  btnFull.onclick = () => {
    chrome.runtime.sendMessage({ action: "START_FULL_SCREENSHOT" });
  };

  btnVisible.onclick = () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (!dataUrl) {
        alert("❌ Failed to capture tab.");
        return;
      }

      chrome.storage.local.set({ visibleShot: dataUrl }, () => {
        chrome.tabs.create({
          url: chrome.runtime.getURL("visible.html"),
        });
      });
    });
  };
});
