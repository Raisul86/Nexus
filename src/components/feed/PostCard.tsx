import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../lib/utils';
import { useFeed } from '../../hooks/useFeed';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface PostCardProps {
  post: any;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { toggleLike } = useFeed();
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    const likeRef = doc(db, 'posts', post.id, 'likes', user.uid);
    return onSnapshot(likeRef, (doc) => {
      setLiked(doc.exists());
    });
  }, [post.id, user]);

  const handleLike = () => {
    toggleLike(post.id, liked);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <img src={post.authorPhoto} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-gray-900 text-[15px] hover:underline cursor-pointer">{post.authorName}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                <span>{post.createdAt?.toDate ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'Just now'}</span>
                <span>·</span>
                <Globe size={12} />
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="mt-3 text-[15px] text-gray-800 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {post.mediaURL && (
        <div className="w-full bg-gray-100 border-y border-gray-100">
          <img src={post.mediaURL} alt="" className="w-full h-auto max-h-[600px] object-cover" />
        </div>
      )}

      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 group cursor-pointer">
          <div className="bg-blue-500 p-1 rounded-full">
            <ThumbsUp size={10} className="text-white fill-white" />
          </div>
          <span className="text-sm text-gray-500 font-medium group-hover:underline">{post.likesCount || 0}</span>
        </div>
        <div className="flex gap-3 text-gray-500 text-sm">
          <span className="hover:underline cursor-pointer">{post.commentsCount || 0} comments</span>
          <span className="hover:underline cursor-pointer">0 shares</span>
        </div>
      </div>

      <div className="px-1 py-1 flex items-center justify-between">
        <PostAction 
          active={liked}
          onClick={handleLike}
          icon={<ThumbsUp size={20} className={cn(liked && "fill-blue-600")} />} 
          label="Like" 
        />
        <PostAction icon={<MessageCircle size={20} />} label="Comment" />
        <PostAction icon={<Share2 size={20} />} label="Share" />
      </div>
    </motion.div>
  );
};

const PostAction = ({ icon, label, onClick, active }: { icon: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors cursor-pointer",
      active ? "text-blue-600" : "text-gray-500 hover:bg-gray-100"
    )}
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </button>
);
