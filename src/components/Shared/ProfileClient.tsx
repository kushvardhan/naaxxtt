"use client";

import { 
  User, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Mail, 
  Trophy, 
  MessageSquare, 
  HelpCircle,
  Eye,
  Star,
  TrendingUp,
  Award,
  Target,
  Zap,
  Clock,
  BarChart3,
  Activity
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

interface ProfileClientProps {
  userInfo: {
    user: {
      _id: string;
      clerkId: string;
      name: string;
      username: string;
      email: string;
      image: string;
      about?: string;
      location?: string;
      portfolioWebsite?: string;
      reputation: number;
      joinedAt: string;
    };
    totalQuestions: number;
    totalAnswers: number;
    badges: {
      GOLD: number;
      SILVER: number;
      BRONZE: number;
    };
    reputation: number;
  };
}

export default function ProfileClient({ userInfo }: ProfileClientProps) {
  const theme = useContext(ThemeContext);
  const isDark = (theme as any)?.mode === "dark";
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const joinDate = new Date(userInfo.user.joinedAt);
  const daysSinceJoined = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const stats = [
    {
      icon: HelpCircle,
      label: "Questions",
      value: userInfo.totalQuestions,
      color: "text-blue-500",
      bgColor: isDark ? "bg-blue-900/20" : "bg-blue-50"
    },
    {
      icon: MessageSquare,
      label: "Answers",
      value: userInfo.totalAnswers,
      color: "text-green-500",
      bgColor: isDark ? "bg-green-900/20" : "bg-green-50"
    },
    {
      icon: Trophy,
      label: "Reputation",
      value: userInfo.reputation,
      color: "text-orange-500",
      bgColor: isDark ? "bg-orange-900/20" : "bg-orange-50"
    },
    {
      icon: Calendar,
      label: "Days Active",
      value: daysSinceJoined,
      color: "text-purple-500",
      bgColor: isDark ? "bg-purple-900/20" : "bg-purple-50"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Gold Badges",
      count: userInfo.badges.GOLD,
      color: "text-yellow-500",
      bgColor: isDark ? "bg-yellow-900/20" : "bg-yellow-50"
    },
    {
      icon: Award,
      title: "Silver Badges",
      count: userInfo.badges.SILVER,
      color: "text-gray-400",
      bgColor: isDark ? "bg-gray-800/20" : "bg-gray-50"
    },
    {
      icon: Award,
      title: "Bronze Badges",
      count: userInfo.badges.BRONZE,
      color: "text-amber-600",
      bgColor: isDark ? "bg-amber-900/20" : "bg-amber-50"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`rounded-2xl p-8 mb-8 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-white to-orange-50 border border-orange-100'
        } shadow-xl transition-all duration-300 hover:shadow-2xl`}>
          
          {/* Real-time Clock */}
          <div className="flex justify-end mb-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-white'
            } shadow-md`}>
              <Clock className="h-4 w-4 text-orange-500" />
              <span className={`text-sm font-mono ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Image
                src={userInfo.user.image}
                alt={userInfo.user.name}
                width={150}
                height={150}
                className="relative rounded-full border-4 border-orange-500 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-6 h-6 border-2 border-white animate-pulse"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              } animate-fadeIn`}>
                {userInfo.user.name}
              </h1>
              
              <p className={`text-xl mb-4 ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              } font-medium`}>
                @{userInfo.user.username}
              </p>

              {userInfo.user.about && (
                <p className={`text-lg mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } max-w-2xl leading-relaxed`}>
                  {userInfo.user.about}
                </p>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {userInfo.user.email}
                  </span>
                </div>
                
                {userInfo.user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {userInfo.user.location}
                    </span>
                  </div>
                )}

                {userInfo.user.portfolioWebsite && (
                  <Link 
                    href={userInfo.user.portfolioWebsite}
                    target="_blank"
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-sm">Portfolio</span>
                  </Link>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Joined {joinDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-xl p-6 ${
                isDark ? 'border border-gray-700' : 'border border-gray-200'
              } shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 animate-slideInUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {stat.value.toLocaleString()}
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className={`rounded-2xl p-8 mb-8 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-white to-purple-50 border border-purple-100'
        } shadow-xl`}>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-8 w-8 text-orange-500" />
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`${achievement.bgColor} rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 animate-bounceIn`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <achievement.icon className={`h-12 w-12 ${achievement.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {achievement.count}
                </div>
                <div className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl p-8 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
        } shadow-xl`}>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-8 w-8 text-orange-500" />
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: HelpCircle, label: "Ask Question", href: "/ask-question", color: "blue" },
              { icon: Eye, label: "View Activity", href: `/profile/${userInfo.user.clerkId}`, color: "green" },
              { icon: Star, label: "Saved Questions", href: "/collection", color: "yellow" },
              { icon: Target, label: "Browse Tags", href: "/tags", color: "purple" }
            ].map((action, index) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                } border ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                } animate-slideInRight`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <action.icon className="h-6 w-6 text-orange-500" />
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-bounceIn { animation: bounceIn 0.8s ease-out; }
      `}</style>
    </div>
  );
}
