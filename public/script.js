const API_BASE = ''; // empty because same origin

async function fetchInfo() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) return showStatus('❌ Please enter a URL', 'error');

  showStatus('⏳ Fetching video info...', 'info');
  document.getElementById('fetchBtn').disabled = true;
  document.getElementById('downloadBtn').disabled = true;

  try {
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unknown error');

    // Update preview
    document.getElementById('thumbnail').src = data.thumbnail;
    document.getElementById('title').textContent = data.title;
    document.getElementById('channel').textContent = `Channel: ${data.channel}`;
    const mins = Math.floor(data.duration / 60);
    const secs = data.duration % 60;
    document.getElementById('duration').textContent = `Duration: ${mins}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('preview').classList.remove('hidden');
    document.getElementById('downloadBtn').disabled = false;
    showStatus('✅ Ready to download!', 'success');

    // Store URL for download
    window.currentVideoUrl = url;
  } catch (err) {
    showStatus('❌ ' + err.message, 'error');
  } finally {
    document.getElementById('fetchBtn').disabled = false;
  }
}

async function downloadAudio() {
  const url = window.currentVideoUrl;
  if (!url) return showStatus('❌ No video selected', 'error');

  const format = document.getElementById('formatSelect').value;
  const quality = document.getElementById('qualitySelect').value;

  showStatus('⏳ Preparing download...', 'info');
  document.getElementById('downloadBtn').disabled = true;

  try {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, format, quality })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Download failed');
    }

    // Trigger file download
    const blob = await res.blob();
    const contentDisposition = res.headers.get('Content-Disposition');
    const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || `audio.${format}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);

    showStatus('✅ Download started!', 'success');
  } catch (err) {
    showStatus('❌ ' + err.message, 'error');
  } finally {
    document.getElementById('downloadBtn').disabled = false;
  }
}

function showStatus(msg, type) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.style.background = type === 'error' ? 'rgba(255,80,80,0.2)' : type === 'info' ? 'rgba(255,215,0,0.2)' : 'rgba(80,255,80,0.2)';
}
