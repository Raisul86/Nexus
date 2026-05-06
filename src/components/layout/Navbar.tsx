import { Search, Bell, MessageSquare, Menu, User as UserIcon, LogOut, Home, Users, Store, Clapperboard, Layers } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../lib/firebase';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const Navbar = () => {
  const { profile } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav id="navbar" className="sticky top-0 z-50 w-full h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[var(--color-brand-primary)] text-white p-1.5 rounded-lg">
          <Layers size={24} strokeWidth={2.5} />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight hidden sm:block">Nexus</span>
        <div className="ml-2 relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Nexus"
            className="block w-64 pl-10 pr-3 py-1.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-8">
        <NavIcon icon={<Home size={24} />} active />
        <NavIcon icon={<Users size={24} />} />
        <NavIcon icon={<Clapperboard size={24} />} />
        <NavIcon icon={<Store size={24} />} />
      </div>

      <div className="flex items-center gap-2">
        <IconButton icon={<Menu size={20} />} className="xl:hidden" />
        <IconButton icon={<MessageSquare size={20} />} />
        <IconButton icon={<Bell size={20} />} />
        
        <div className="relative ml-2">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1 focus:outline-none"
          >
            <img 
              src={profile?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
            />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-[60]"
              >
                <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  <img 
                    src={profile?.photoURL} 
                    className="w-10 h-10 rounded-full" 
                    alt="" 
                  />
                  <div>
                    <p className="font-semibold text-sm">{profile?.displayName}</p>
                    <p className="text-xs text-gray-500">See your profile</p>
                  </div>
                </div>
                <div className="h-px bg-gray-200 my-2 mx-1" />
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg text-sm text-red-600 transition-colors"
                >
                  <div className="bg-red-100 p-2 rounded-full">
                    <LogOut size={18} />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

const NavIcon = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <button className={cn(
    "p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center relative group",
    active ? "text-[var(--color-brand-primary)]" : "text-gray-500 hover:bg-gray-100"
  )}>
    {icon}
    {active && (
      <motion.div 
        layoutId="nav-active" 
        className="absolute bottom-[-10px] left-0 right-0 h-1 bg-[var(--color-brand-primary)] rounded-t-full"
      />
    )}
    <div className="absolute -bottom-10 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Home
    </div>
  </button>
);

const IconButton = ({ icon, className }: { icon: React.ReactNode; className?: string }) => (
  <button className={cn("p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700", className)}>
    {icon}
  </button>
);
