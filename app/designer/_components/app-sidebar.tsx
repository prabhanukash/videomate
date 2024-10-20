'use client';
import React, { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarContent,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import NavUser from './nav-user';
import {
  CirclePlus,
  PanelsTopLeft,
  Layers3,
  Rss,
  Video,
  GalleryHorizontalEnd,
  LayoutGrid,
  X
} from 'lucide-react';
// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: ''
  },
  navMain: [
    {
      title: 'Create',
      url: '#',
      icon: CirclePlus,
      isActive: true
    },
    {
      title: 'Templates',
      url: '#',
      icon: PanelsTopLeft,
      isActive: false
    },
    {
      title: 'Layers',
      url: '#',
      icon: Layers3,
      isActive: false
    },
    {
      title: 'Slides',
      url: '#',
      icon: GalleryHorizontalEnd,
      isActive: false
    },
    {
      title: 'Animator',
      url: '#',
      icon: Video,
      isActive: false
    },
    {
      title: 'Feeds',
      url: '#',
      icon: Rss,
      isActive: false
    },
    {
      title: 'Sizes',
      url: '#',
      icon: LayoutGrid,
      isActive: false
    }
  ],
  mails: [
    {
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Meeting Tomorrow',
      date: '09:34 AM',
      teaser:
        'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.'
    },
    {
      name: 'Alice Smith',
      email: 'alicesmith@example.com',
      subject: 'Re: Project Update',
      date: 'Yesterday',
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps."
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      subject: 'Weekend Plans',
      date: '2 days ago',
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?"
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
      subject: 'Re: Question about Budget',
      date: '2 days ago',
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?"
    },
    {
      name: 'Michael Wilson',
      email: 'michaelwilson@example.com',
      subject: 'Important Announcement',
      date: '1 week ago',
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future."
    },
    {
      name: 'Sarah Brown',
      email: 'sarahbrown@example.com',
      subject: 'Re: Feedback on Proposal',
      date: '1 week ago',
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?"
    },
    {
      name: 'David Lee',
      email: 'davidlee@example.com',
      subject: 'New Project Idea',
      date: '1 week ago',
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?"
    },
    {
      name: 'Olivia Wilson',
      email: 'oliviawilson@example.com',
      subject: 'Vacation Plans',
      date: '1 week ago',
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave."
    },
    {
      name: 'James Martin',
      email: 'jamesmartin@example.com',
      subject: 'Re: Conference Registration',
      date: '1 week ago',
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end."
    },
    {
      name: 'Sophia White',
      email: 'sophiawhite@example.com',
      subject: 'Team Dinner',
      date: '1 week ago',
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences."
    }
  ]
};

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="flex h-full overflow-hidden" {...props}>
      {/* Icon sidebar */}
      <Sidebar
        collapsible="icon"
        variant="sidebar"
        className="w-[var(--sidebar-width-icon)] border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <NavUser />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Content sidebar */}
      <SidebarInset className="relative flex-1">
        {data.navMain.map((item) => (
          <Sidebar
            key={item.title}
            collapsible="none"
            className={`absolute inset-y-0 left-0 w-64 border-r transition-all duration-300 ease-in-out ${
              activeItem.title === item.title && open ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <SidebarHeader className="flex justify-between items-center">
              <h2 className="px-4 py-2 text-lg font-semibold">{item.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="mr-2">
                <X className="h-4 w-4" />
              </Button>
            </SidebarHeader>
            <SidebarContent>
              <p className="px-4 py-2">Configuration for {item.title}</p>
              {/* Add more specific content for each item here */}
            </SidebarContent>
          </Sidebar>
        ))}
      </SidebarInset>
    </Sidebar>
  );
}
