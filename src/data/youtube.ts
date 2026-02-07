export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

const CHANNEL_ID = 'UCpOIi12e0eNpcu9yeMVo3TA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function fetchVideos(): Promise<Video[]> {
  const videos: Video[] = [];

  try {
    const response = await fetch(FEED_URL);
    const xml = await response.text();

    // Parse XML entries using regex (lightweight, no dependencies)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const videoIdRegex = /<yt:videoId>([^<]+)<\/yt:videoId>/;
    const titleRegex = /<title>([^<]+)<\/title>/;

    let match;
    while ((match = entryRegex.exec(xml)) !== null && videos.length < 10) {
      const entry = match[1];
      const videoIdMatch = entry.match(videoIdRegex);
      const titleMatch = entry.match(titleRegex);

      if (videoIdMatch && titleMatch) {
        const id = videoIdMatch[1];
        videos.push({
          id,
          title: titleMatch[1],
          thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`
        });
      }
    }
  } catch (error) {
    console.error('Failed to fetch YouTube feed:', error);
  }

  return videos;
}
