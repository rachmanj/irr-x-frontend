"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ScrollArea className="h-full py-6">
                <div className="px-3 py-4">
                    <Link href="/dashboard" className="flex items-center pl-2.5 mb-5">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Your Logo
                        </span>
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/dashboard"
                                className={cn(
                                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                                    pathname === "/dashboard" && "bg-gray-100 dark:bg-gray-700"
                                )}
                            >
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        {/* Add more menu items as needed */}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    )
} 