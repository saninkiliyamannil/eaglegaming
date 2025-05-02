import axios from 'axios';
import { YouTubeVideo, YouTubeChannel } from '../types';

const API_KEY = 'AIzaSyD4C46iM_FEJYpY-ukvNdDidxQiXUtD3UU'; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Get a channel ID from a custom URL or handle
 */
export const getChannelId = async (channelUsername: string): Promise<string> => {
  // Remove @ symbol if present
  const username = channelUsername.startsWith('@') 
    ? channelUsername.substring(1) 
    : channelUsername;

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: username,
        type: 'channel',
        key: API_KEY,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].id.channelId;
    }
    throw new Error('Channel not found');
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    throw error;
  }
};

/**
 * Get channel details
 */
export const getChannelDetails = async (channelId: string): Promise<YouTubeChannel> => {
  try {
    const response = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'snippet,statistics',
        id: channelId,
        key: API_KEY,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const channelData = response.data.items[0];
      return {
        id: channelData.id,
        title: channelData.snippet.title,
        description: channelData.snippet.description,
        customUrl: channelData.snippet.customUrl,
        thumbnails: channelData.snippet.thumbnails,
        subscriberCount: channelData.statistics.subscriberCount,
        videoCount: channelData.statistics.videoCount,
      };
    }
    throw new Error('Channel details not found');
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};

/**
 * Get latest videos from a channel
 */
export const getChannelVideos = async (
  channelId: string, 
  maxResults = 12
): Promise<YouTubeVideo[]> => {
  try {
    // First, get the playlist ID (uploads playlist)
    const channelResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'contentDetails',
        id: channelId,
        key: API_KEY,
      },
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const uploadsPlaylistId = 
      channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Then get the videos from that playlist
    const response = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults,
        key: API_KEY,
      },
    });

    if (!response.data.items) {
      return [];
    }

    // Process each video to get the desired format
    return response.data.items.map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw error;
  }
};

/**
 * Search videos within a channel
 */
export const searchChannelVideos = async (
  channelId: string,
  query: string,
  maxResults = 12
): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        channelId,
        q: query,
        maxResults,
        type: 'video',
        key: API_KEY,
      },
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error('Error searching channel videos:', error);
    throw error;
  }
};