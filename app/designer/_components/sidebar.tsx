import AppSidebar from "./app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Sidebar() {
  return (
    <SidebarProvider
      defaultOpen={false}
      className="w-[40px] h-full bg-white border-r border-gray-200"
    >
      <AppSidebar />
    </SidebarProvider>
  )
}
