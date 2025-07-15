(async function() {
  const { fullSlices } = await new Promise(resolve =>
    chrome.storage.local.get("fullSlices", resolve)
  );

  if (!fullSlices || !fullSlices.length) {
    document.body.innerHTML += "<h2 style='color:red;'>⚠️ No screenshots found!</h2>";
    return;
  }

  // Determine canvas width from the first slice
  const width = await new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width);
    img.src = fullSlices[0].dataUrl;
  });

  // Calculate total height based on slices
  const totalHeight = fullSlices.reduce((max, { y }) => Math.max(max, y), 0) + window.innerHeight;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = totalHeight;

  // Draw each slice at its vertical position
  for (const { dataUrl, y } of fullSlices) {
    await new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, y);
        resolve();
      };
      img.src = dataUrl;
    });
  }

  // Copy to clipboard
  document.getElementById("copyBtn").onclick = () => {
    canvas.toBlob(async blob => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        alert("✅ Copied to clipboard!");
      } catch (err) {
        alert("❌ Copy failed: " + err.message);
      }
    }, "image/png");
  };

  // Download as PNG
  document.getElementById("downloadBtn").onclick = () => {
    const link = document.createElement("a");
    link.download = "fullpage-screenshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Print the screenshot
  document.getElementById("printBtn").onclick = () => {
    const dataUrl = canvas.toDataURL("image/png");
    const printWindow = window.open();
    printWindow.document.write(`<img src="${dataUrl}" style="width:100%">`);
    printWindow.print();
  };
})();
