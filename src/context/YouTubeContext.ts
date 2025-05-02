import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { getChannelId, getChannelDetails, getChannelVideos, searchChannelVideos } from '../services/youtubeService';
import { YouTubeState, YouTubeAction, YouTubeVideo } from '../types';

// Initial state
const initialState: YouTubeState = {
  videos: [],
  selectedVideo: null,
  channel: null,
  isLoading: true,
  error: null,
  searchQuery: '',
};

// Create context
const YouTubeContext = createContext<{
  state: YouTubeState;
  dispatch: React.Dispatch<YouTubeAction>;
  selectVideo: (video: YouTubeVideo | null) => void;
  searchVideos: (query: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  selectVideo: () => null,
  searchVideos: () => null,
});

// Reducer function
const youtubeReducer = (state: YouTubeState, action: YouTubeAction): YouTubeState => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'SET_SELECTED_VIDEO':
      return { ...state, selectedVideo: action.payload };
    case 'SET_CHANNEL':
      return { ...state, channel: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

// Provider component
export const YouTubeProvider: React.FC<{ children: ReactNode; channelUsername: string }> = ({
  children,
  channelUsername,
}) => {
  const [state, dispatch] = useReducer(youtubeReducer, initialState);

  // Get channel ID
  const { data: channelId, isError: channelIdError } = useQuery(
    ['channelId', channelUsername],
    () => getChannelId(channelUsername),
    {
      retry: 2,
      onError: (error) => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch channel ID.' });
        dispatch({ type: 'SET_LOADING', payload: false });
      },
    }
  );

  // Get channel details
  const { data: channelDetails } = useQuery(
    ['channelDetails', channelId],
    () => getChannelDetails(channelId!),
    {
      enabled: !!channelId,
      onSuccess: (data) => {
        dispatch({ type: 'SET_CHANNEL', payload: data });
      },
      onError: () => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch channel details.' });
      },
    }
  );

  // Get channel videos
  const { data: videos, refetch: refetchVideos } = useQuery(
    ['channelVideos', channelId, state.searchQuery],
    () => 
      state.searchQuery 
        ? searchChannelVideos(channelId!, state.searchQuery) 
        : getChannelVideos(channelId!),
    {
      enabled: !!channelId,
      onSuccess: (data) => {
        dispatch({ type: 'SET_VIDEOS', payload: data });
        dispatch({ type: 'SET_LOADING', payload: false });
      },
      onError: () => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch videos.' });
        dispatch({ type: 'SET_LOADING', payload: false });
      },
      refetchInterval: 3 * 60 * 1000, // Refetch every 3 minutes
    }
  );

  // Function to select a video
  const selectVideo = (video: YouTubeVideo | null) => {
    dispatch({ type: 'SET_SELECTED_VIDEO', payload: video });
  };

  // Function to search videos
  const searchVideos = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  return (
    <YouTubeContext.Provider value={{ state, dispatch, selectVideo, searchVideos }}>
      {children}
    </YouTubeContext.Provider>
  );
};

// Custom hook for using the YouTube context
export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
};
