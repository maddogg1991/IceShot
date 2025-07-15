// content_script.js – injected into the page to help with scrolling and dimension info

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "GET_PAGE_INFO") {
    sendResponse({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight
    });
  }

  else if (msg.action === "SCROLL_TO") {
    window.scrollTo(0, msg.y);
    // Let the scroll settle before responding
    setTimeout(() => sendResponse({ done: true }), 300);
    return true; // keeps message channel open
  }
});
