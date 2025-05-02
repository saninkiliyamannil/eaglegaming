import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Play } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { useYouTube } from '../context/YouTubeContext';

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { selectVideo, state } = useYouTube();
  const isSelected = state.selectedVideo?.id === video.id;

  const handleClick = () => {
    selectVideo(video);
    // Scroll to top if not already at the top
    if (window.scrollY > 100) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get the highest quality thumbnail available
  const thumbnail = 
    video.thumbnails.maxres?.url || 
    video.thumbnails.high?.url || 
    video.thumbnails.medium?.url || 
    video.thumbnails.default?.url;

  // Format the published date
  const publishedDate = formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true });

  return (
    <div 
      className={`
        group rounded-lg overflow-hidden shadow-lg transition-all duration-300 
        ${isSelected ? 'ring-2 ring-red-500 scale-[1.02]' : 'hover:scale-[1.03]'}
        bg-gray-800 hover:shadow-xl cursor-pointer
      `}
      onClick={handleClick}
    >
      {/* Thumbnail container with overlay */}
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-red-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {publishedDate}
        </div>
      </div>
      
      {/* Video information */}
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-red-400 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {video.description || 'No description available'}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;