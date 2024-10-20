'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import { PanelsTopLeft, LayoutPanelLeft, Settings, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DashboardSideBar() {
  const pathname = usePathname();

  // Define a variable for the common class names
  const activeClassName =
    'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50';

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex flex-col h-[80px] justify-center border-b px-3 w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyan-200 rounded-md flex items-center justify-center text-xl font-bold text-cyan-600">
              BP
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Bhanu Prakash Workspace</span>
              {/* <div className="flex items-center text-sm">
                <span className="text-gray-500">Free Plan</span>
                <Button variant="link" className="text-blue-500 p-0 h-auto" asChild>
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className="flex flex-col h-[80px] justify-center border-b px-3 w-full mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-xl font-bold text-white">
                  BP
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Bhanu Prakash&apos;s Project</span>
                </div>
              </div>
            </div>
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  [activeClassName]: pathname === '/dashboard'
                }
              )}
              href="/dashboard">
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <PanelsTopLeft className="h-3 w-3" />
              </div>
              Designs
            </Link>
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  [activeClassName]: pathname === '/dashboard/projects'
                }
              )}
              href="/dashboard/projects">
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <LayoutPanelLeft className="h-3 w-3" />
              </div>
              Custom Templates
            </Link>

            <Separator className="my-3" />
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  [activeClassName]: pathname === '/dashboard/settings'
                }
              )}
              href="/dashboard/settings"
              id="onboarding">
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Settings className="h-3 w-3" />
              </div>
              Project Settings
            </Link>
          </nav>
        </div>
        <div className="flex flex-col justify-end p-4">
          {/* include invite icon here    */}
          <Button variant="secondary" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite to project
          </Button>
        </div>
      </div>
    </div>
  );
}
