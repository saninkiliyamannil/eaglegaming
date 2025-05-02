// YouTube API types
export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnails {
  default: YouTubeThumbnail;
  medium: YouTubeThumbnail;
  high: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  thumbnails: YouTubeThumbnails;
  subscriberCount: string;
  videoCount: string;
}

// Application state types
export interface YouTubeState {
  videos: YouTubeVideo[];
  selectedVideo: YouTubeVideo | null;
  channel: YouTubeChannel | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

export type YouTubeAction =
  | { type: 'SET_VIDEOS'; payload: YouTubeVideo[] }
  | { type: 'SET_SELECTED_VIDEO'; payload: YouTubeVideo | null }
  | { type: 'SET_CHANNEL'; payload: YouTubeChannel | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string };