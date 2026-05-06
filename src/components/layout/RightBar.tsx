import { Video, Search, MoreHorizontal, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const RightBar = () => {
  const contacts = [
    { name: 'Sarah Wilson', online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'John Doe', online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { name: 'Alice Smith', online: false, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { name: 'Bob Johnson', online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { name: 'Charlie Brown', online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  ];

  return (
    <aside id="rightbar" className="fixed right-0 top-14 w-[360px] h-[calc(100vh-56px)] hidden lg:block overflow-y-auto p-4">
      <div className="mb-4">
        <h3 className="text-gray-500 font-semibold text-lg mb-4">Birthdays</h3>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
          <div className="bg-blue-100 p-2 rounded-lg">🎁</div>
          <p className="text-sm"><b>Sarah Wilson</b> has a birthday today.</p>
        </div>
      </div>

      <div className="h-px bg-gray-300 my-4" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-semibold text-lg">Contacts</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <Video size={18} className="cursor-pointer hover:bg-gray-200 rounded-full" />
          <Search size={18} className="cursor-pointer hover:bg-gray-200 rounded-full" />
          <MoreHorizontal size={18} className="cursor-pointer hover:bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="space-y-1">
        {contacts.map((contact, idx) => (
          <ContactItem key={idx} {...contact} />
        ))}
      </div>
    </aside>
  );
};

const ContactItem = ({ name, img, online }: { name: string; img: string; online: boolean }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors relative group">
    <div className="relative">
      <img src={img} alt="" className="w-9 h-9 rounded-full border border-gray-100" />
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full translate-x-1/4 translate-y-1/4" />
      )}
    </div>
    <span className="font-semibold text-[15px]">{name}</span>
  </div>
);
