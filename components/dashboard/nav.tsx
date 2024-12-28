"use client"

import Link from "next/link"
import { Bell, MessageSquare, Menu, ChevronDown, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { menuConfig } from "@/config/menu"

export function DashboardNav({ className }: { className?: string }) {
    const { data: session, status } = useSession()

    console.log('Nav Status:', status)
    console.log('Nav Session:', session)
    console.log('Nav User:', session?.user)
    console.log('Nav Roles:', session?.user?.roles)

    // Show loading state while checking auth
    if (status === "loading") {
        return <nav className={`bg-black ${className}`}>
            <div className="px-3 py-2 text-gray-300">Loading...</div>
        </nav>
    }

    // Hide nav if not authenticated
    if (status === "unauthenticated" || !session) {
        console.log('Not authenticated')
        return null
    }

    // Ensure we have roles
    if (!session.user?.roles) {
        console.log('No roles found in session')
        return <nav className={`bg-black ${className}`}>
            <div className="px-3 py-2 text-gray-300">No roles available</div>
        </nav>
    }

    // If session roles are missing, try to get from cookie
    const userRoles = session?.user?.roles || (() => {
        const storedRoles = localStorage.getItem('user_roles')
        return storedRoles ? JSON.parse(storedRoles) : []
    })()

    console.log('User Roles:', userRoles)

    return (
        <nav className={`bg-black ${className}`}>
            <div className="px-3 py-2 text-gray-300">
                <div className="flex items-center justify-between">
                    {/* User info */}
                    <div className="flex items-center space-x-4">
                        {userRoles.map((role) => (
                            menuConfig[role as keyof typeof menuConfig] && (
                                <DropdownMenu key={role}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center ml-2 text-gray-300 hover:text-white hover:bg-transparent">
                                            {Object.values(menuConfig[role as keyof typeof menuConfig])[0].label}
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {Object.values(menuConfig[role as keyof typeof menuConfig])[0].items.map((item) => (
                                            <DropdownMenuItem key={item.href}>
                                                <Link href={item.href} className="w-full">
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        ))}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-transparent">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-transparent">
                            <MessageSquare className="h-5 w-5" />
                        </Button>

                        {/* Profile Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt={session.user.name || ""} />
                                        <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
} 