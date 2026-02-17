# ☁️ Deploy OZYREN to Render (Free) via GitHub

Deploy your own public instance of OZYREN YT Music Downloader with a single click.

## 1. Fork the repository
1. Go to [https://github.com/YOUR_USERNAME/ozyren-yt-downloader](https://github.com/YOUR_USERNAME/ozyren-yt-downloader) (replace with your repo).
2. Click the **Fork** button (top right) to create your own copy.

## 2. Create a Render account
- Go to [render.com](https://render.com) and sign up for free (use GitHub for quick login).

## 3. Deploy using Blueprint (render.yaml)
1. In the Render dashboard, click **New +** → **Blueprint**.
2. Connect your GitHub account and select the forked repository.
3. Render will automatically detect the `render.yaml` file.
4. Click **Apply** – the service will be built and deployed.
5. After a few minutes, you’ll receive a public URL like:  
   `https://ozyren-yt-downloader.onrender.com`

## 4. (Optional) Enable manual deploys via GitHub Actions
If you want to trigger deployments manually (e.g., after code changes):

### 4.1 Get your Render Service ID
- In Render, go to your service → **Settings**.
- Copy the **Service ID** (looks like `srv-xxxxxxxxxxxx`).

### 4.2 Create a Render API Key
- Go to [Render API Keys](https://dashboard.render.com/u/api-keys).
- Click **Create API Key**, name it `ozyren-deploy`, and copy the key.

### 4.3 Add secrets to your GitHub repository
- On GitHub, go to your repo → **Settings** → **Secrets and variables** → **Actions**.
- Click **New repository secret** for each:
  - **Name**: `RENDER_SERVICE_ID` → **Value**: your Service ID
  - **Name**: `RENDER_API_KEY` → **Value**: your API key

### 4.4 Run the workflow
- Go to your repo → **Actions** → **Deploy to Render** (on the left).
- Click **Run workflow** → choose branch → **Run workflow**.
- This will trigger a new deployment on Render.

---

**✅ Your OZYREN downloader is now live on the cloud!**
