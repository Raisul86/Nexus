import { Home, Users, Store, Clapperboard, Layers, Bookmark, Clock, ChevronDown, UserSquare2, Megaphone, HeartPulse } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const { profile } = useAuth();

  const links = [
    { icon: <img src={profile?.photoURL} className="w-9 h-9 rounded-full" />, label: profile?.displayName, isProfile: true },
    { icon: <Users size={28} className="text-blue-500" />, label: 'Friends' },
    { icon: <Clock size={28} className="text-blue-400" />, label: 'Memories' },
    { icon: <Bookmark size={28} className="text-purple-500" />, label: 'Saved' },
    { icon: <Users size={28} className="text-blue-500" />, label: 'Groups' },
    { icon: <Clapperboard size={28} className="text-red-500" />, label: 'Video' },
    { icon: <Store size={28} className="text-blue-500" />, label: 'Marketplace' },
    { icon: <Megaphone size={28} className="text-orange-500" />, label: 'Ad Centre' },
    { icon: <HeartPulse size={28} className="text-red-400" />, label: 'Blood Donations' },
  ];

  return (
    <aside id="sidebar" className="fixed left-0 top-14 w-[360px] h-[calc(100vh-56px)] hidden xl:block overflow-y-auto p-2 scrollbar-hide hover:scrollbar-default transition-all">
      <div className="flex flex-col gap-0.5">
        {links.map((link, idx) => (
          <SidebarItem key={idx} icon={link.icon} label={link.label} />
        ))}
        <SidebarItem 
          icon={<div className="bg-gray-200 p-1.5 rounded-full"><ChevronDown size={20} /></div>} 
          label="See more" 
        />
      </div>
      
      <div className="h-px bg-gray-300 my-4 mx-2" />
      
      <div className="px-4">
        <h3 className="text-gray-500 font-semibold text-lg mb-2">Your shortcuts</h3>
        <p className="text-xs text-gray-500 mt-8">
          Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  · More  · Meta © 2026
        </p>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer group">
    <div className="w-9 h-9 flex items-center justify-center">
      {icon}
    </div>
    <span className="font-semibold text-[15px] group-hover:text-black">{label}</span>
  </button>
);
