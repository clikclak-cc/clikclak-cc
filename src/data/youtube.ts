import { XMLParser } from 'fast-xml-parser';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

const CHANNEL_ID = 'UCpOIi12e0eNpcu9yeMVo3TA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await fetch(FEED_URL);
    const xml = await response.text();

    const parser = new XMLParser();
    const result = parser.parse(xml);

    const entries = result?.feed?.entry;
    if (!entries) return [];

    const entryList = Array.isArray(entries) ? entries : [entries];

    return entryList.slice(0, 10).map((entry: any) => {
      const id = entry['yt:videoId'];
      const title = entry.title || '';
      return {
        id,
        title,
        thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });
  } catch (error) {
    console.error('Failed to fetch YouTube feed:', error);
    return [];
  }
}
