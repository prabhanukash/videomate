import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <SidebarProvider
      defaultOpen={false}
      className="w-[40px] h-full bg-white border-r border-gray-200">
      <AppSidebar />
    </SidebarProvider>
  );
};

export default Sidebar;
