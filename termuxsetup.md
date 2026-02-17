# 📱 Termux Setup for OZYREN YT Music Downloader

Run your own high‑quality audio downloader directly on your Android phone using Termux.

## 1. Install Termux
- Download Termux from [F-Droid](https://f-droid.org/en/packages/com.termux/) (recommended) or the [GitHub releases](https://github.com/termux/termux-app/releases).
- Install the APK and open the app.

## 2. Update packages
pkg update && pkg upgrade -y

## 3. Install dependencies
pkg install -y nodejs ffmpeg python git
pip install yt-dlp

## 4. Clone the repository
git clone https://github.com/YOUR_USERNAME/ozyren-yt-downloader.git
cd ozyren-yt-downloader
*Replace `YOUR_USERNAME` with your actual GitHub username.*

## 5. Install Node.js dependencies
npm install

## 6. Start the server
npm start
You should see: `✅ OZYREN server running at http://localhost:3000`

## 7. Access the web interface
- Open any browser on your phone and go to `http://localhost:3000`.
- Paste a YouTube or YouTube Music link, click **Extract**, then **Download Audio**.

## 8. Keep the server running (optional)
- Use `tmux` to keep the server alive after closing Termux:
  pkg install tmux
  tmux new -s ozyren
  npm start
- Detach with `Ctrl+B, D`; reattach later with `tmux attach -t ozyren`.

---

**✅ Your OZYREN downloader is now live on your Android device!**
