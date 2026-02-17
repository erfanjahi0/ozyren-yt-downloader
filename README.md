# 🎵 OZYREN YT Music Downloader

**High‑quality audio extraction from YouTube & YouTube Music**



## ✨ Features
- Supports **YouTube** and **YouTube Music** links.
- Extracts audio in **MP3**, **M4A**, or **WebM**.
- Choose quality: **Best (320kbps)**, 192kbps, or 128kbps.
- Live preview of video title, channel, thumbnail, and duration.
- Beautiful **glass‑morphism UI** – fully responsive.
- Runs **locally on Android (Termux)** or **globally on Render**.
- **No third‑party APIs** – uses `yt‑dlp` directly.

## 🚀 Quick Start

### Local (Node.js)
1. Install [Node.js](https://nodejs.org) (≥18), [ffmpeg](https://ffmpeg.org), and [yt‑dlp](https://github.com/yt-dlp/yt-dlp).
2. Clone the repo and install dependencies:
   ```bash
   
   git clone https://github.com/erfanjahi0/ozyren-yt-downloader.git
   cd ozyren-yt-downloader
   npm install
   ```
4. Start the server:
   npm start
5. Visit `http://localhost:3000` in your browser.

### 📱 Android (Termux)
See **[termuxsetup.md](termuxsetup.md)** for step‑by‑step instructions.

### ☁️ Cloud (Render)
See **[githubsetup.md](githubsetup.md)** for one‑click deployment.

## 📁 Project Structure
ozyren-yt-downloader/
├── public/               # Frontend files (HTML, CSS, JS)
├── server.js             # Express backend
├── package.json
├── Dockerfile            # Container definition
├── render.yaml           # Render blueprint
├── .github/workflows/    # GitHub Actions (optional)
├── termuxsetup.md        # Android setup guide
├── githubsetup.md        # Cloud deployment guide
└── README.md             # This file

## ⚙️ How it works
1. User pastes a YouTube/YouTube Music URL.
2. Backend runs `yt‑dlp --dump-json` to fetch metadata.
3. Preview is shown in the UI.
4. User selects format/quality and clicks **Download**.
5. Backend runs `yt‑dlp -x --audio-format ...` to extract audio.
6. File is sent to the browser and automatically deleted from server.

## ⚠️ Legal & Ethical
- This tool is intended for **personal, educational use** only.
- Respect copyright – only download content you have the right to.
- Downloading from YouTube may violate their Terms of Service; use responsibly.

## 🧰 Requirements
- Node.js 18+
- ffmpeg
- yt-dlp (Python package)

## 📄 License
MIT – free to use, modify, and distribute.  
**Not affiliated with YouTube or Google.**

---

**Made with ❤️ by OZYREN**
