#  IceShot

**IceShot** is a sleek and simple Firefox extension that captures **visible** and **full-page** screenshots — even on tall, scroll-heavy pages. Just click and go. No bloated editors. No BS.

---

##  Features

- 🖥️ **Full Page Screenshot** — Automatically scrolls and stitches your entire page into one image.
- 👁️ **Visible Area Screenshot** — Captures only what's currently on screen.
- 📋 **Copy to Clipboard** — One-click clipboard access for fast sharing.
- 💾 **Download & Print** — Save or print your screenshot instantly.
- 🚧 **Coming Soon**:
  - Crop tool
  - Annotations
  - PDF export
  - Region capture

---

## 🛠️ How It Works

- Full-page screenshots are taken in slices as IceShot scrolls down, then seamlessly stitched together on a canvas.
- Visible screenshots are captured instantly and shown in a clean viewer with copy/download buttons.
- Firefox limitations (like `about:` pages and AMO) are detected automatically — we gray out the buttons and show a friendly warning.

---

## ⚙️ Installation

### From Source
1. Clone or download this repo.
2. Open Firefox → `about:debugging`
3. Click **"Load Temporary Add-on"**
4. Select any file in the extension folder (like `manifest.json`)
5. You're in. The IceShot icon should show up in your toolbar.

---

##  Why IceShot?

- Doesn't inject analytics, trackers, or external APIs.
- Pure client-side logic — fast and lightweight.
- Great for devs, designers, and chronic screenshot hoarders.
- Feels native, looks clean, and just works.

---

## ⚠️ Firefox Limitations

Due to Firefox security policies, screenshots can't be taken on certain pages:

- `about:*`, `file:*`, `addons.mozilla.org`, etc.
- IceShot detects this and disables the buttons with a helpful tooltip.

---

## File Structure
iceshot/
├── background.js # Handles screenshot logic & tab messaging
├── content_script.js # Injected to scroll/get page info
├── popup.html # The popup UI with buttons
├── popup.js # Main popup logic
├── visible.html # Viewer for visible screenshots
├── visible.js # Logic for showing visible screenshot
├── copypage.html # Viewer for full-page stitched canvas
├── copypage.js # Logic for drawing full page
├── icons/ # Extension icon(s)
└── manifest.json # Extension config


---

##  Built With

- Plain JavaScript (no frameworks)
- Firefox WebExtension APIs
- Love for doing things the hard way

---
## 📸 IceShot Previews

**Visible Screenshot (UI View):**  
![Visible Screenshot](https://raw.githubusercontent.com/maddogg1991/IceShot/main/IceShot%20Previews/Screenshot%20from%202025-07-15%2005-52-48.png)

**Visible Screenshot (Updated UI):**  
![Visible Screenshot](https://raw.githubusercontent.com/maddogg1991/IceShot/main/IceShot%20Previews/Screenshot%20from%202025-07-15%2005-53-48.png)

**Screenshot Mode Menu:**  
![Menu Screenshot](https://raw.githubusercontent.com/maddogg1991/IceShot/main/IceShot%20Previews/Screenshot%20from%202025-07-15%2005-54-32.png)

**Full Page Screenshot Example:**  
![Full Page Screenshot](https://raw.githubusercontent.com/maddogg1991/IceShot/main/IceShot%20Previews/fullpage-screenshot.png)

**Visible Area Screenshot Example:**  
![Visible Area Screenshot](https://raw.githubusercontent.com/maddogg1991/IceShot/main/IceShot%20Previews/visible-screenshot(1).png)
---

## 📬 Feedback / Ideas?

Open an issue or scream into the void. Either works.

---

##  License

MIT. Steal it, fork it, improve it — just don’t resell it with a different name and a worse UI.

