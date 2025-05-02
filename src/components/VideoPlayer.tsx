import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { YouTubeVideo } from '../types';

interface VideoPlayerProps {
  video: YouTubeVideo;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  // Format the published date
  const publishedDate = formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true });
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <div className="flex items-center text-gray-400 mb-4">
          <span>{publishedDate}</span>
          <span className="mx-2">•</span>
          <span>{video.channelTitle}</span>
        </div>
        
        <div className="mt-4 bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="whitespace-pre-line text-gray-300">
            {video.description || 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;