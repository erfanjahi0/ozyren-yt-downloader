FROM node:18-bullseye

# Install yt-dlp and ffmpeg
RUN apt-get update && apt-get install -y ffmpeg python3-pip && \
    pip3 install yt-dlp && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
