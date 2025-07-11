/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { ExternalLink, Calendar, Users, Building, Heart, Copy, Check, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProjectType } from '@/types';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RoleType } from '@/types';
interface ProjectPopCardProps {
  project: ProjectType;
}

export default function ProjectPopCard({ project }: ProjectPopCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopy = async () => {
    const projectInfo = `${project.title}
Category: ${project.category}
Founder: ${project.founder}
Stage: ${project.stage}
Team Size: ${project.teamSize}
Status: ${project.status}
${project.website ? `Website: ${project.website}` : ''}

${project.description}

Available Roles:
${project.roles
  .map(role => `• ${role.title}${role.description ? `: ${role.description}` : ''}`)
  .join('\n')}
`;

    try {
      await navigator.clipboard.writeText(projectInfo);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleApplyClick = (role: RoleType) => {
    setSelectedRole(role);
    setIsApplicationOpen(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success animation

    if (showSuccessAnimation) {
      // Reset the application state
      setIsApplicationOpen(false);
      setShowSuccessAnimation(false);
    }
    setShowSuccessAnimation(!showSuccessAnimation);
  };

  return (
    <>
      {/* Main Card */}
      <Card className="w-full max-w-2xl pt-0 mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Project Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={project.image || '/nexvern-cover.png'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge
              className="text-white font-medium px-3 py-1"
              style={{ backgroundColor: project.stageColor }}
            >
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
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
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
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center justify-between gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 hover:bg-muted/50"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  }`}
                />
                <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
              </Button>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="flex items-center gap-2">
                    <span>Show More</span>
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2 hover:bg-muted/50"
              >
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
        </CardContent>
      </Card>
      {/* Professional Popup Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle className="sr-only">{project.title} - Project Details</DialogTitle>
        <DialogContent className="md:min-w-6xl md:max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            <div className="relative">
              {/* Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-6">
                  <Badge
                    className="text-white font-medium px-3 py-1"
                    style={{ backgroundColor: project.stageColor }}
                  >
                    {project.stage}
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                  <p className="text-lg opacity-90">Founded by {project.founder}</p>
                </div>
              </div>

              {/* Content - Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Half - Project Information */}
                <div className="p-6 space-y-6 border-r">
                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-sm font-semibold">{project.category}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="text-sm font-semibold">{project.teamSize} members</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Posted</p>
                      <p className="text-sm font-semibold">{formatDate(project.datePosted)}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="h-6 w-6 mx-auto mb-2 rounded-full bg-green-500" />
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-semibold">{project.status}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">About This Project</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-muted">
                        <span className="text-muted-foreground">Current Stage</span>
                        <Badge style={{ backgroundColor: project.stageColor, color: 'white' }}>
                          {project.stage}
                        </Badge>
                      </div>
                      <div className="flex justify-between py-2 border-b border-muted">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="font-medium">{project.teamSize} members</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-muted">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    {project.website && (
                      <Button asChild className="w-full" size="lg">
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsSaved(!isSaved)}
                        className="flex-1 flex items-center gap-2"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isSaved ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                        {isSaved ? 'Saved' : 'Save Project'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCopy}
                        className="flex items-center gap-2 bg-transparent"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Info
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Half - Roles and Opportunities */}
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
                    <p className="text-muted-foreground mb-6">
                      We&apos;re looking for talented individuals to help us grow and succeed.
                    </p>
                  </div>

                  {/* Available Roles */}
                  {project.roles.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">
                        Open Positions ({project.roles.length})
                      </h4>
                      <div className="space-y-4">
                        {project.roles.map((role, index) => (
                          <div
                            key={index}
                            className="p-5 rounded-lg border bg-card hover:shadow-md transition-all duration-200 hover:border-primary/20"
                          >
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-lg font-semibold text-foreground">
                                  {role.title}
                                </h5>
                                {role.description && (
                                  <p className="text-muted-foreground mt-2 leading-relaxed">
                                    {role.description}
                                  </p>
                                )}
                              </div>
                              <Button
                                className="w-full"
                                size="lg"
                                onClick={() => handleApplyClick(role)}
                              >
                                Apply for {role.title}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Founder Info */}
                  <div className="mt-8 p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Founded by</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {project.founder
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{project.founder}</p>
                        <p className="text-sm text-muted-foreground">Founder & CEO</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-primary/20 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Interested in learning more about this project?
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Founder
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* Application Dialog */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogContent className="max-w-[calc(100vw-50px)] overflow-hidden">
          {!showSuccessAnimation ? (
            <>
              <DialogHeader>
                <h1 className="text-lg font-semibold">Apply for {selectedRole?.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Submit your application for {selectedRole?.title} at {project.title}
                </p>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    onChange={e => console.log('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    onChange={e => console.log('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Message / Cover Letter</Label>
                  <Textarea
                    id="note"
                    placeholder="Tell us why you're interested in this role and what you can bring to the team..."
                    onChange={e => console.log('note', e.target.value)}
                    className="min-h-24 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 flex items-center gap-2"
                    onClick={handleApplicationSubmit}
                  >
                    <Send className="h-4 w-4" />
                    Submit Application
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsApplicationOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              {/* Success Animation */}
              <div className="relative">
                {/* Flying Paper Animation */}

                {/* Big Check Mark */}
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in-50 fade-in-0 duration-500">
                  <Check className="h-12 w-12 text-white animate-in zoom-in-75 fade-in-0 duration-700 delay-300" />
                </div>

                {/* Pulse Ring Animation */}
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/20 animate-ping" />
              </div>

              {/* Success Message */}
              <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in-0 duration-500 delay-500">
                <h3 className="text-xl font-bold text-green-600">Application Sent!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Your application for <span className="font-medium">{project.roles[0].title}</span>{' '}
                  has been sent to <span className="font-medium">{project.founder}</span>.
                </p>
                <p className="text-sm text-muted-foreground">
                  They will review your application and contact you soon!
                </p>
              </div>

              {/* Confetti-like dots */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100" />
              <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200" />
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce delay-150" />

              {/* OK Button */}
              <Button className="mt-4" onClick={handleApplicationSubmit}>
                Okay , Got it!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
