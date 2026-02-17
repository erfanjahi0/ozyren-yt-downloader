const express = require('express');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure downloads directory exists
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir);

// Helper: run yt-dlp and return promise
function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp ${args}`, { maxBuffer: 1024 * 1024 * 50 }, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

// API: Get video metadata
app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    const output = await runYtDlp(`--dump-json "${url}"`);
    const data = JSON.parse(output);
    res.json({
      title: data.title,
      channel: data.uploader,
      duration: data.duration,
      thumbnail: data.thumbnail,
      videoId: data.id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
});

// API: Download audio
app.post('/api/download', async (req, res) => {
  try {
    const { url, format = 'mp3', quality = '0' } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    const outputTemplate = path.join(downloadsDir, '%(title)s.%(ext)s');
    // quality '0' = best, we can also map quality select to bitrate, but keep best
    await runYtDlp(`-x --audio-format ${format} --audio-quality ${quality} -o "${outputTemplate}" "${url}"`);

    // Find the most recent file in downloads
    const files = fs.readdirSync(downloadsDir)
      .map(f => ({ name: f, time: fs.statSync(path.join(downloadsDir, f)).mtimeMs }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0) throw new Error('No file downloaded');
    const latest = files[0].name;
    const filePath = path.join(downloadsDir, latest);

    res.download(filePath, latest, (err) => {
      if (err) console.error(err);
      // Delete file after sending (optional, to save space)
      fs.unlink(filePath, () => {});
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Cleanup old files every hour
setInterval(() => {
  const now = Date.now();
  fs.readdirSync(downloadsDir).forEach(f => {
    const filePath = path.join(downloadsDir, f);
    const stat = fs.statSync(filePath);
    if (now - stat.mtimeMs > 3600000) fs.unlink(filePath, () => {});
  });
}, 3600000);

app.listen(PORT, () => {
  console.log(`✅ OZYREN server running at http://localhost:${PORT}`);
});
