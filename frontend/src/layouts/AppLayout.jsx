import Sidebar from '../components/Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-mist lg:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
