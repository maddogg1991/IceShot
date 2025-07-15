// background.js – handles full-page screenshot capture

// Capture full-page screenshot by scrolling and stitching visible slices
async function captureFullPage(tab) {
  // Always start from the top
  await chrome.tabs.sendMessage(tab.id, { action: "SCROLL_TO", y: 0 });
  await delay(500);

  const pageInfo = await new Promise(resolve =>
    chrome.tabs.sendMessage(tab.id, { action: "GET_PAGE_INFO" }, resolve)
  );

  if (!pageInfo || !pageInfo.height || !pageInfo.viewportHeight) {
    alert("Could not retrieve page info.");
    return;
  }

  const { height, viewportHeight } = pageInfo;

  // If the page fits in the viewport, skip the slicing circus
  if (height <= viewportHeight) {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, dataUrl => {
      if (!dataUrl) {
        alert("❌ Failed to capture screenshot.");
        return;
      }

      chrome.storage.local.set({ visibleShot: dataUrl }, () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("visible.html") });
      });
    });
    return;
  }

  // Otherwise, scroll through and capture slices
  const slices = [];
  const count = Math.ceil(height / viewportHeight);

  for (let i = 0; i < count; i++) {
    const y = i * viewportHeight;
    await chrome.tabs.sendMessage(tab.id, { action: "SCROLL_TO", y });
    await delay(500);

    const dataUrl = await new Promise((resolve, reject) => {
      chrome.tabs.captureVisibleTab(null, { format: "png" }, result => {
        if (!result) return reject("Capture failed");
        resolve(result);
      });
    });

    slices.push({ dataUrl, y });
  }

  // Save slices to local storage and open the stitching page
  await chrome.storage.local.set({ fullSlices: slices });
  chrome.tabs.create({ url: chrome.runtime.getURL("copypage.html") });
}

// Simple delay utility
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Handle message from popup to initiate full-page capture
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "START_FULL_SCREENSHOT") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) captureFullPage(tabs[0]);
    });
  }
});
