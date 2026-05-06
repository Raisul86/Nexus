import { Video, Image, Smile, Send, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/useFeed';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getPostIdeaSuggestion } from '../../services/gemini';

export const CreatePost = () => {
  const { profile } = useAuth();
  const { createPost } = useFeed();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await createPost(content);
    setContent('');
    setAiSuggestion(null);
    setIsSubmitting(false);
  };

  const handleGenIdea = async () => {
    setIsGeneratingIdea(true);
    const idea = await getPostIdeaSuggestion();
    setAiSuggestion(idea || 'No ideas right now.');
    setIsGeneratingIdea(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex gap-3 items-center">
        <img src={profile?.photoURL} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex-1 relative">
           <button 
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-left px-4 py-2.5 rounded-full transition-colors flex items-center justify-between"
          >
            <span>What's on your mind, {profile?.displayName?.split(' ')[0]}?</span>
          </button>
          <button 
            onClick={handleGenIdea}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
            title="Get AI Suggestions"
          >
            {isGeneratingIdea ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {aiSuggestion && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold flex items-center gap-1"><Sparkles size={14} /> AI Suggestions</span>
              <button onClick={() => setAiSuggestion(null)} className="text-blue-400 hover:text-blue-600">×</button>
            </div>
            <p className="whitespace-pre-wrap">{aiSuggestion}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-px bg-gray-200 my-3" />
      
      <div className="flex items-center justify-between">
        <PostOption icon={<Video className="text-red-500" />} label="Live video" />
        <PostOption icon={<Image className="text-green-500" />} label="Photo/video" />
        <PostOption icon={<Smile className="text-yellow-500" />} label="Feeling/activity" />
      </div>

      <div className="mt-4 flex gap-2">
         <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          className="w-full bg-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows={2}
         />
         <button 
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
         >
          <Send size={20} />
         </button>
      </div>
    </div>
  );
};

const PostOption = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group">
    {icon}
    <span className="text-gray-500 font-semibold text-sm group-hover:text-black">{label}</span>
  </button>
);
