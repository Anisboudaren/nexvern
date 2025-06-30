/* eslint-disable @next/next/no-img-element */
'use client';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, User, LogOut, Menu, X, Bell, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import ProjectFormCard from './project-form-card';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, me, setIsLoggedIn, setMe } = useAuth();

  const Logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      if (!res.ok) {
        throw new Error('Logout failed');
      }

      setIsLoggedIn(false);
      setMe(null);

      router.push('/login'); // Redirect to login page after logout
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  console.log('isLoggedIn:', isLoggedIn);
  console.log('User Info:', me);
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/home" className="flex items-center gap-2 sm:gap-3">
              <img src="/logo-purple.png" alt="Nexvern Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">Nexvern</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Discover
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Projects
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                /* Desktop Logged In State */
                <>
                  <ProjectFormCard />

                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          3
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="p-3 border-b">
                        <h3 className="font-semibold text-sm">Notifications</h3>
                      </div>
                      <DropdownMenuItem className="p-3">
                        <div>
                          <p className="text-sm font-medium">New project match!</p>
                          <p className="text-xs text-gray-500">
                            EcoFleet is looking for a Lead Engineer
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3">
                        <div>
                          <p className="text-sm font-medium">Message received</p>
                          <p className="text-xs text-gray-500">Jason Lee sent you a message</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3">
                        <div>
                          <p className="text-sm font-medium">Project updated</p>
                          <p className="text-xs text-gray-500">
                            TutorHive changed their requirements
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-3 text-center text-purple-600">
                        View all notifications
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Messages */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                          2
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="p-3 border-b">
                        <h3 className="font-semibold text-sm">Messages</h3>
                      </div>
                      <DropdownMenuItem className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Jason Lee</p>
                            <p className="text-xs text-gray-500">
                              Interested in partnering with you...
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Amira Chen</p>
                            <p className="text-xs text-gray-500">Thanks for your application!</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-3 text-center text-purple-600">
                        View all messages
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center border border-purple-400">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-gray-700 hidden xl:block">{me?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>My Projects</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => Logout()}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                /* Desktop Logged Out State */
                <>
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/login')}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push('/signup')}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 lg:hidden">
            {isLoggedIn && (
              <>
                {/* Mobile Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    <DropdownMenuItem className="p-3">
                      <div>
                        <p className="text-sm font-medium">New project match!</p>
                        <p className="text-xs text-gray-500">
                          EcoFleet is looking for a Lead Engineer
                        </p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <div>
                        <p className="text-sm font-medium">Message received</p>
                        <p className="text-xs text-gray-500">Jason Lee sent you a message</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-3 text-center text-purple-600">
                      View all
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Messages */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold text-sm">Messages</h3>
                    </div>
                    <DropdownMenuItem className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Jason Lee</p>
                          <p className="text-xs text-gray-500">Interested in partnering...</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-3 text-center text-purple-600">
                      View all
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 mb-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="border-t border-gray-100 pt-4">
              {isLoggedIn ? (
                /* Mobile Logged In State */
                <>
                  {/* Create Project Button */}
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 w-full mb-4">
                    <Plus className="w-4 h-4" />
                    Create Project
                  </Button>

                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center border border-purple-400">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{me?.name}</p>
                      <p className="text-gray-500 text-sm">{me?.email}</p>
                    </div>
                  </div>

                  {/* User Menu Items */}
                  <div className="flex flex-col gap-1">
                    <a
                      href="/profile"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                    <a
                      href="/my-projects"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Projects
                    </a>
                    <a
                      href="/settings"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </a>
                    <button
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors px-4 py-3 rounded-lg text-left flex items-center gap-3"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        Logout();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                /* Mobile Logged Out State */
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/login');
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/signup');
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
