"use client";

import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Filter,
  Building,
  Users,
  Star,
  ExternalLink,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Link from "next/link";

interface FindJobsClientProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Mock job data - in a real app, this would come from an API
const mockJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    description: "Join our team to build cutting-edge web applications using React, Node.js, and cloud technologies.",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    posted: "2 days ago",
    applicants: 45,
    rating: 4.8,
    remote: true,
    urgent: false
  },
  {
    id: 2,
    title: "Frontend React Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    description: "Build beautiful, responsive user interfaces for our growing SaaS platform.",
    tags: ["React", "JavaScript", "CSS", "Figma"],
    posted: "1 week ago",
    applicants: 23,
    rating: 4.5,
    remote: true,
    urgent: true
  },
  {
    id: 3,
    title: "Backend Python Developer",
    company: "DataFlow Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $150k",
    description: "Develop scalable backend systems and APIs using Python, Django, and PostgreSQL.",
    tags: ["Python", "Django", "PostgreSQL", "Docker"],
    posted: "3 days ago",
    applicants: 67,
    rating: 4.7,
    remote: false,
    urgent: false
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $160k",
    description: "Manage cloud infrastructure and CI/CD pipelines for high-traffic applications.",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform"],
    posted: "5 days ago",
    applicants: 34,
    rating: 4.6,
    remote: true,
    urgent: false
  },
  {
    id: 5,
    title: "Mobile App Developer",
    company: "MobileFirst",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$70 - $100/hr",
    description: "Create cross-platform mobile applications using React Native and Flutter.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    posted: "1 day ago",
    applicants: 12,
    rating: 4.4,
    remote: true,
    urgent: true
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$85k - $125k",
    description: "Design intuitive user experiences for web and mobile applications.",
    tags: ["Figma", "Sketch", "Prototyping", "User Research"],
    posted: "4 days ago",
    applicants: 28,
    rating: 4.9,
    remote: true,
    urgent: false
  }
];

const jobStats = {
  totalJobs: 1247,
  newThisWeek: 89,
  remoteJobs: 892,
  avgSalary: "$115k"
};

export default function FindJobsClient({ searchParams = {} }: FindJobsClientProps) {
  const theme = useContext(ThemeContext);
  const isDark = (theme as any)?.mode === "dark";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  useEffect(() => {
    let filtered = mockJobs;

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(job => job.type.toLowerCase() === selectedType);
    }

    if (selectedLocation !== "all") {
      if (selectedLocation === "remote") {
        filtered = filtered.filter(job => job.remote);
      } else {
        filtered = filtered.filter(job => !job.remote);
      }
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedType, selectedLocation]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Find Your Dream Job
          </h1>
          <p className="text-center text-sm text-gray-500 mt-2">
  (This page is just for demo — the data shown here is not real)
</p>

          <p className={`text-lg md:text-xl mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover amazing opportunities in tech and advance your career
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Briefcase, label: "Total Jobs", value: jobStats.totalJobs.toLocaleString() },
              { icon: TrendingUp, label: "New This Week", value: jobStats.newThisWeek },
              { icon: MapPin, label: "Remote Jobs", value: jobStats.remoteJobs.toLocaleString() },
              { icon: DollarSign, label: "Avg Salary", value: jobStats.avgSalary }
            ].map((stat, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${
                  isDark ? 'text-orange-400' : 'text-orange-500'
                }`} />
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`p-6 rounded-lg mb-8 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
            </div>

            {/* Job Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            >
              <option value="all">All Job Types</option>
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="part-time">Part-time</option>
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Found <span className="font-semibold text-orange-500">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:border-orange-500' 
                : 'bg-white border-gray-200 hover:border-orange-300'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Building className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{job.type}</span>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, index) => (
                          <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full ${
                            isDark 
                              ? 'bg-orange-900 text-orange-200' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className={`h-4 w-4 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                          <span className={`font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {job.applicants} applicants
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {job.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {job.posted}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isDark
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <button className={`px-8 py-3 rounded-lg font-medium border transition-all duration-200 ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}>
              Load More Jobs
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className={`h-16 w-16 mx-auto mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No jobs found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
