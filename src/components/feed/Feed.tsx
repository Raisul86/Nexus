import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { useFeed } from '../../hooks/useFeed';
import { Loader2 } from 'lucide-react';

export const Feed = () => {
  const { posts, loading } = useFeed();

  // Mock stories for visual polish
  const stories = [
    { id: 1, name: 'Create Story', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me', isCreate: true },
    { id: 2, name: 'Alice Smith', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Bob Johnson', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Sarah Wilson', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', thumb: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="max-w-[680px] w-full mx-auto px-4 py-4">
      {/* Stories */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {stories.map(story => (
          <div key={story.id} className="min-w-[110px] h-[190px] rounded-xl overflow-hidden relative shadow-md cursor-pointer group">
            {story.isCreate ? (
              <div className="h-full bg-white flex flex-col">
                <div className="h-3/4 overflow-hidden">
                  <img src={story.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="h-1/4 relative flex items-center justify-center bg-white">
                  <div className="absolute -top-4 w-8 h-8 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white text-xl font-bold">
                    +
                  </div>
                  <span className="text-[12px] font-semibold mt-2">Create story</span>
                </div>
              </div>
            ) : (
              <>
                <img src={story.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-blue-600 overflow-hidden">
                  <img src={story.img} alt="" className="w-full h-full" />
                </div>
                <div className="absolute bottom-3 left-3 text-white text-[12px] font-semibold drop-shadow-md">
                  {story.name}
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <CreatePost />

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 && (
            <div className="bg-white p-10 rounded-xl text-center shadow-sm">
              <p className="text-gray-500 font-medium italic">No posts yet. Be the first to share something!</p>
            </div>
          )}
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
