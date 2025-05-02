import React from 'react';
import { Users, Video } from 'lucide-react';
import { YouTubeChannel } from '../types';

interface ChannelInfoProps {
  channel: YouTubeChannel;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({ channel }) => {
  // Format subscriber count with commas and abbreviate if very large
  const formatSubscriberCount = (count: string) => {
    const num = parseInt(count, 10);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Channel avatar */}
        <div className="shrink-0">
          <img
            src={channel.thumbnails.medium?.url || channel.thumbnails.default?.url}
            alt={`${channel.title} avatar`}
            className="w-24 h-24 rounded-full object-cover border-4 border-red-600"
          />
        </div>
        
        {/* Channel info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{channel.title}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300 mb-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{formatSubscriberCount(channel.subscriberCount)} subscribers</span>
            </div>
            <div className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>{parseInt(channel.videoCount, 10).toLocaleString()} videos</span>
            </div>
          </div>
          
          <p className="text-gray-400 mb-4 line-clamp-2 md:line-clamp-none">
            {channel.description}
          </p>
          
          <div>
            <a
              href={`https://www.youtube.com/${channel.customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full font-semibold transition-colors duration-300"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
