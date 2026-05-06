import { Layers } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { motion } from 'motion/react';

export const Login = () => {
  return (
    <div className="min-h-screen bg-[var(--color-surface-gray)] flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left"
        >
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <div className="bg-[var(--color-brand-primary)] text-white p-3 rounded-2xl shadow-xl shadow-blue-500/30">
              <Layers size={48} strokeWidth={2.5} />
            </div>
            <h1 className="font-display font-bold text-6xl text-[var(--color-brand-primary)] tracking-tight">Nexus</h1>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight mb-4">
            Connect with friends and the world around you on Nexus.
          </h2>
          <p className="text-xl text-gray-600 font-normal">
            Nexus helps you build meaningful connections and share what matters most in real-time.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-[450px] mx-auto w-full border border-white"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-500">Sign in to join the conversation</p>
            </div>
            
            <button
               onClick={() => signInWithGoogle()}
               className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all font-semibold text-gray-700 shadow-sm group"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase tracking-widest font-bold">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <p className="text-center text-sm text-gray-500 p-4">
              Nexus is a privacy-first social platform. Join millions of users worldwide.
            </p>
            
            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="font-semibold text-gray-800 hover:underline cursor-pointer">Create a Page for a celebrity, brand or business.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
