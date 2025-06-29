"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Calendar, Users, Building, Heart, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Role {
  title: string
  description?: string
}

interface Project {
  id: string
  title: string
  description: string
  category: string
  teamSize: number
  stage: string
  stageColor: string
  founder: string
  datePosted: string
  website?: string
  status: string
  marginRate?: string
  roles: Role[]
  image: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleCopy = async () => {
    const projectInfo = `${project.title}
Category: ${project.category}
Founder: ${project.founder}
Stage: ${project.stage}
Team Size: ${project.teamSize}
Status: ${project.status}
${project.website ? `Website: ${project.website}` : ""}

${project.description}

Available Roles:
${project.roles.map((role) => `• ${role.title}${role.description ? `: ${role.description}` : ""}`).join("\n")}
`

    try {
      await navigator.clipboard.writeText(projectInfo)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card className="w-full pt-0 max-w-2xl mx-auto overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <Badge className="text-white font-medium px-3 py-1" style={{ backgroundColor: project.stageColor }}>
            {project.stage}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold leading-tight">{project.title}</h3>

          {/* Summary Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Team: {project.teamSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.datePosted)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Founded by <span className="font-medium text-foreground">{project.founder}</span>
            </p>
            {project.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between w-full gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-2 hover:bg-muted/50"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
              />
              <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 hover:bg-muted/50"
            >
              <span>{isExpanded ? "Show Less" : "Show More"}</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={handleCopy} className="flex items-center gap-2 hover:bg-muted/50">
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </Button>
          </div>

          
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-6 animate-in slide-in-from-top-4 fade-in-0 duration-500 ease-out">
            <Separator />

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Project Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span className="font-medium">{project.teamSize} members</span>
                  </div>
                  {project.marginRate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Margin Rate:</span>
                      <span className="font-medium">{project.marginRate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Available Roles */}
            {project.roles.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Available Roles</h4>
                <div className="space-y-2">
                  {project.roles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                      <div>
                        <h5 className="font-medium">{role.title}</h5>
                        {role.description && <p className="text-sm text-muted-foreground mt-1">{role.description}</p>}
                      </div>
                      <Button size="sm" className="ml-4">
                        Apply
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
