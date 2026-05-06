/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { RightBar } from './components/layout/RightBar';
import { Feed } from './components/feed/Feed';
import { Login } from './components/Login';

function NexusApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-blue-600 font-bold font-display text-xl animate-pulse">Nexus</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-gray)]">
      <Navbar />
      <div className="flex flex-1 pt-14 lg:pt-0">
        <Sidebar />
        <main className="flex-1 min-h-screen xl:ml-[360px] lg:mr-[360px]">
          <Feed />
        </main>
        <RightBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NexusApp />
    </AuthProvider>
  );
}
