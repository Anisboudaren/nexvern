 
"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import ProjectPopCard from "@/components/Project-pop-card"
import ProjectCard2 from "@/components/Projet-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const sampleProjects = [
  {
    id: "1",
    projectId: "1",
    title: "Bookingz.one — Booking Management with AI",
    description:
      "Bookingz.one is a smart booking platform with an AI-powered booking bot. Built for service businesses, it's fully customizable, scalable, and ready for partners to grow and profit with.",
    category: "AI",
    teamSize: 1,
    stage: "MVP Stage",
    stageColor: "#22d3ee",
    founder: "Jason Lee",
    datePosted: "2024-06-29",
    website: "https://bookingz.one",
    status: "Development",
    marginRate: "15-25%",
    roles: [
      {
        title: "Growth Partner",
        description: "Help scale our platform and acquire new customers",
      },
      {
        title: "Chief Technology Officer",
        description: "Lead technical strategy and development team",
      },
      {
        title: "Chief Marketing Officer",
        description: "Drive marketing strategy and brand growth",
      },
    ],
    image: "https://chekin.com/wp-content/uploads/2022/12/booking.com_-768x432.jpeg",
  },
  {
    id: "2",
    projectId: "2",
    title: "EcoFleet — Sustainable Fleet Management",
    description:
      "EcoFleet is revolutionizing the logistics space with real-time electric fleet management software that helps businesses cut emissions and save on costs.",
    category: "GreenTech",
    teamSize: 4,
    stage: "Seed Stage",
    stageColor: "#4ade80",
    founder: "Amira Chen",
    datePosted: "2024-05-20",
    website: "https://ecofleet.io",
    status: "Raising Funds",
    marginRate: "10-18%",
    roles: [
      {
        title: "Lead Engineer",
        description: "Build and optimize our routing engine",
      },
      {
        title: "Sustainability Advisor",
        description: "Guide product decisions toward eco impact",
      },
    ],
    image:
      "https://electroverse.com/_next/image?url=https%3A%2F%2Fassets.electricjuice.octopus.energy%2F4560x1900%2Ffe546fcd40%2Fworld-ev-day-fleets.jpg%2Fm%2F1728x0&w=1536&q=75",
  },
  {
    id: "3",
    projectId: "3",
    title: "TutorHive — Community-Driven Micro-Learning",
    description:
      "TutorHive connects learners with subject matter experts for fast, effective tutoring. Designed for remote-first education and community-driven learning.",
    category: "EdTech",
    teamSize: 6,
    stage: "Launch Ready",
    stageColor: "#c084fc",
    founder: "Noah Ibrahim",
    datePosted: "2024-06-10",
    website: "https://tutorhive.org",
    status: "Pre-Launch",
    marginRate: "20%",
    roles: [
      {
        title: "Community Manager",
        description: "Grow and moderate the tutor network",
      },
      {
        title: "Product Designer",
        description: "Craft intuitive and joyful learning UX",
      },
    ],
    image:
      "https://assets.techrepublic.com/uploads/2021/04/remote-working-devices-laptop-smartphone-collaboration-mobility.jpg",
  },
]

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-semibold text-foreground relative inline-block">
        {title}
        <span className="absolute left-0 bottom-[-10px] w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      </h2>
    </div>
  )
}

interface SearchFilters {
  query: string
  category: string
  teamSize: string
  stage: string
  status: string
  sortBy: string
}

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    teamSize: "all",
    stage: "all",
    status: "all",
    sortBy: "newest",
  })

  const [showMyProjects, setShowMyProjects] = useState(false)

  // Get unique values for filter options
  const categories = [...new Set(sampleProjects.map((p) => p.category))]
  const stages = [...new Set(sampleProjects.map((p) => p.stage))]
  const statuses = [...new Set(sampleProjects.map((p) => p.status))]

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = sampleProjects.filter((project) => {
      // Search query filter
      if (filters.query) {
        const searchTerm = filters.query.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(searchTerm)
        const matchesDescription = project.description.toLowerCase().includes(searchTerm)
        const matchesFounder = project.founder.toLowerCase().includes(searchTerm)
        const matchesCategory = project.category.toLowerCase().includes(searchTerm)

        if (!matchesTitle && !matchesDescription && !matchesFounder && !matchesCategory) {
          return false
        }
      }

      // Category filter
      if (filters.category !== "all" && project.category !== filters.category) {
        return false
      }

      // Team size filter
      if (filters.teamSize !== "all") {
        const teamSize = project.teamSize
        switch (filters.teamSize) {
          case "1":
            if (teamSize !== 1) return false
            break
          case "2-5":
            if (teamSize < 2 || teamSize > 5) return false
            break
          case "6-10":
            if (teamSize < 6 || teamSize > 10) return false
            break
          case "10+":
            if (teamSize <= 10) return false
            break
        }
      }

      // Stage filter
      if (filters.stage !== "all" && project.stage !== filters.stage) {
        return false
      }

      // Status filter
      if (filters.status !== "all" && project.status !== filters.status) {
        return false
      }

      return true
    })

    // Sort projects
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime())
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "team-size":
        filtered.sort((a, b) => b.teamSize - a.teamSize)
        break
    }

    return filtered
  }, [filters])

  const clearSearch = () => {
    setFilters({
      query: "",
      category: "all",
      teamSize: "all",
      stage: "all",
      status: "all",
      sortBy: "newest",
    })
    setShowMyProjects(false)
  }

  const hasActiveFilters =
    filters.query ||
    filters.category !== "all" ||
    filters.teamSize !== "all" ||
    filters.stage !== "all" ||
    filters.status !== "all" ||
    showMyProjects

  return (
    <div className="bg-muted min-h-svh flex flex-col">
      {/* Top bar
      <div className="flex justify-end items-center p-4">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 text-sm">
          <img src="/logo-purple.png" alt="Nexvern Logo" className="w-5 h-5" />
          <span className="text-gray-700">You are logged in</span>
        </div>
      </div> */}

      {/* Search and Filter Section */}
      <section className="bg-white border-b border-gray-200 px-6 md:px-10 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Platform Branding */}
          <div className="text-center mb-8">
            {/* <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/logo-purple.png" alt="Nexvern Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">Nexvern</h1>
            </div> */}
            <p className="text-gray-600">Discover and connect with innovative startups</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for a specific project..."
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              className="pl-12 pr-12 py-3 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
            />
            {filters.query && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, query: "" }))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>

            <Button
              variant={showMyProjects ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMyProjects(!showMyProjects)}
              className={
                showMyProjects
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              MY PROJECTS
            </Button>

            <Select
              value={filters.category}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.teamSize}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, teamSize: value }))}
            >
              <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="TEAM SIZE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="1">Solo (1)</SelectItem>
                <SelectItem value="2-5">Small (2-5)</SelectItem>
                <SelectItem value="6-10">Medium (6-10)</SelectItem>
                <SelectItem value="10+">Large (10+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.stage} onValueChange={(value) => setFilters((prev) => ({ ...prev, stage: value }))}>
              <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="STAGE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="STATUS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
            >
              <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="team-size">Team Size</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Projects matching filters: <span className="font-semibold text-gray-900">{filteredProjects.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Rendering based on search/filters */}
      {hasActiveFilters ? (
        /* Search Results Section */
        <section className="px-6 md:px-10 pt-8 pb-10">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              {filters.query ? `Search Results for "${filters.query}"` : "Filtered Projects"}
            </h2>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard2 key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-medium mb-2 text-gray-700">No projects found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Original Sections */
        <>
          {/* Active Startups Section */}
          <section className="px-6 md:px-10 pt-6">
            <SectionTitle title="Active Startups" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-8xl mx-auto">
              {sampleProjects.slice(0, 3).map((project, idx) => (
                <ProjectCard2 key={idx} project={project} />
              ))}
            </div>
          </section>

          {/* Explore Opportunities Section */}
          <section className="px-6 md:px-10 pt-14 pb-10">
            <SectionTitle title="Explore Opportunities" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-8xl mx-auto">
              {sampleProjects.slice(0, 3).map((project, idx) => (
                <ProjectPopCard key={idx} project={project} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
