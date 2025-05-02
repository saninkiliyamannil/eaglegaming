import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import VideoGallery from './components/VideoGallery';
import { YouTubeProvider } from './context/YouTubeContext';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YouTubeProvider channelUsername="@LemonPUBGYT">
        <Layout>
          <VideoGallery />
        </Layout>
      </YouTubeProvider>
    </QueryClientProvider>
  );
}

export default App;