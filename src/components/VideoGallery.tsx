import React from 'react';
import { useYouTube } from '../context/YouTubeContext';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import ChannelInfo from './ChannelInfo';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const VideoGallery: React.FC = () => {
  const { state } = useYouTube();
  const { videos, selectedVideo, isLoading, error, channel, searchQuery } = state;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (videos.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No videos found</h2>
        <p className="text-gray-500">No videos match your search for "{searchQuery}"</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No videos available</h2>
        <p className="text-gray-500">The channel hasn't uploaded any videos yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Channel information */}
      {channel && <ChannelInfo channel={channel} />}

      {/* Selected video player */}
      {selectedVideo && (
        <div className="mb-8">
          <VideoPlayer video={selectedVideo} />
        </div>
      )}

      {/* Video grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {searchQuery ? `Search Results: ${searchQuery}` : 'Latest Videos'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;