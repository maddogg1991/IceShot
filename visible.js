// Load the saved visible screenshot from storage
chrome.storage.local.get("visibleShot", ({ visibleShot }) => {
  if (!visibleShot) {
    console.error("🚫 No screenshot found.");
    document.body.innerHTML += `<p style="color: red;">No screenshot data found.</p>`;
    return;
  }

  console.log("✅ Loaded visibleShot");

  const img = document.getElementById("screenshot");
  img.src = visibleShot;

  // Copy to clipboard
  document.getElementById("copyBtn").onclick = async () => {
    try {
      const blob = await (await fetch(visibleShot)).blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      alert("✅ Copied to clipboard!");
    } catch (err) {
      console.error("❌ Copy failed:", err);
      alert("❌ Copy failed: " + err.message);
    }
  };

  // Download image
  document.getElementById("downloadBtn").onclick = () => {
    const link = document.createElement("a");
    link.href = visibleShot;
    link.download = "visible-screenshot.png";
    link.click();
  };
  document.getElementById("printBtn").onclick = () => {
  const win = window.open("");
  win.document.write(`<img src="${visibleShot}" style="max-width:100%"/>`);
  win.document.close();
  win.focus();
  win.print();
  win.close();
};

});
