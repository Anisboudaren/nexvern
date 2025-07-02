/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';

import { useState } from 'react';
import { Plus, Upload, X, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Role {
  title: string;
  description?: string;
  compensation: string;
}

interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  stage: string;
  stageColor: string;
  founder: string;
  datePosted: string;
  website?: string;
  status: string;
  marginRate?: string;
  roles: Role[];
  image: string;
}

interface ProjectFormCardProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit?: (data: ProjectFormData) => void;
}

const stageOptions = [
  { value: 'Idea Stage', label: 'Idea Stage', color: '#ef4444' },
  { value: 'MVP Stage', label: 'MVP Stage', color: '#22d3ee' },
  { value: 'Growth Stage', label: 'Growth Stage', color: '#10b981' },
  { value: 'Scale Stage', label: 'Scale Stage', color: '#8b5cf6' },
];

const categoryOptions = [
  'Artificial Intelligence',
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'SaaS',
  'Mobile App',
  'Web Platform',
  'Other',
];

const statusOptions = [
  'Planning',
  'Active Development',
  'Beta Testing',
  'Live/Production',
  'Seeking Investment',
  'Paused',
];

const compensationOptions = [
  'Paid',
  'Unpaid',
  'Equity Only',
  'Paid + Equity',
  'Commission Based',
  'Revenue Share',
  'To Be Discussed',
];

export default function ProjectFormCard({ initialData, onSubmit }: ProjectFormCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    id: initialData?.id || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    teamSize: initialData?.teamSize || 1,
    stage: initialData?.stage || '',
    stageColor: initialData?.stageColor || '#22d3ee',
    founder: initialData?.founder || '',
    datePosted: initialData?.datePosted || new Date().toISOString().split('T')[0],
    website: initialData?.website || '',
    status: initialData?.status || '',
    marginRate: initialData?.marginRate || '',
    roles: initialData?.roles || [],
    image: initialData?.image || '',
  });

  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');
  const [collapsedRoles, setCollapsedRoles] = useState<Set<number>>(new Set());

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStageChange = (selectedStage: string) => {
    const stageOption = stageOptions.find(opt => opt.value === selectedStage);
    if (stageOption) {
      setFormData(prev => ({
        ...prev,
        stage: stageOption.label,
        stageColor: stageOption.color,
      }));
    }
  };

  const addRole = () => {
    const newIndex = formData.roles.length;
    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { title: '', description: '', compensation: '' }],
    }));
    // Automatically expand the new role
    setCollapsedRoles(prev => {
      const newSet = new Set(prev);
      newSet.delete(newIndex);
      return newSet;
    });
  };

  const updateRole = (index: number, field: keyof Role, value: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => (i === index ? { ...role, [field]: value } : role)),
    }));
  };

  const removeRole = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index),
    }));
  };

  const toggleRoleCollapse = (index: number) => {
    setCollapsedRoles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to submit project');
      }
      const data = await res.json();
      onSubmit?.(data);
      setIsOpen(false);
    } catch (error) {
      console.error('Project submission error:', error);
      // Optionally show error to user
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show preview (optional but nice)
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result); // this is fine for preview
    };
    reader.readAsDataURL(file);

    // 2. Upload to Vercel Blob
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Image upload failed');
      }

      const blob = await res.json();
      const uploadedUrl = blob.url;

      // 3. Save the URL for the project (in form state)
      handleInputChange('image', uploadedUrl); // ✅ pass real hosted URL
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  return (
    <>
      {/* Trigger Card */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </DialogTrigger>
        <DialogTitle className="sr-only">Create/Edit Project</DialogTitle>
        {/* Form Dialog */}
        <DialogContent className="md:min-w-6xl md:max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                {/* Live Preview Header */}
                <div className="relative h-64 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview || '/placeholder.svg'}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Upload project image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Stage Badge Preview */}
                  {formData.stage && (
                    <div className="absolute top-4 left-6">
                      <div
                        className="px-3 py-1 rounded text-white text-sm font-medium"
                        style={{ backgroundColor: formData.stageColor }}
                      >
                        {formData.stage}
                      </div>
                    </div>
                  )}

                  {/* Image Upload Button */}
                  <div className="absolute top-4 right-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 cursor-pointer"
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          {imagePreview ? 'Change Image' : 'Upload Image'}
                        </span>
                      </Button>
                    </label>
                  </div>

                  {/* Live Preview Title and Founder */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <h2 className="text-3xl font-bold">{formData.title || 'Your Project Title'}</h2>
                    <p className="text-lg opacity-90">
                      {formData.founder ? `Founded by ${formData.founder}` : 'Founded by You'}
                    </p>
                  </div>
                </div>

                {/* Content - Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Half - Project Information with Live Preview */}
                  <div className="p-6 space-y-6 border-r">
                    {/* Live Preview Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-semibold">{formData.category || 'Not set'}</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Team Size</p>
                        <p className="font-semibold">{formData.teamSize} members</p>
                      </div>
                    </div>

                    {/* Basic Info Form */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Project Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter project title"
                            value={formData.title}
                            onChange={e => handleInputChange('title', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="founder">Founder Name</Label>
                          <Input
                            id="founder"
                            placeholder="Your name"
                            value={formData.founder}
                            onChange={e => handleInputChange('founder', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={value => handleInputChange('category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryOptions.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stage">Project Stage</Label>
                          <Select value={formData.stage} onValueChange={handleStageChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                              {stageOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: option.color }}
                                    />
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <Input
                            id="teamSize"
                            type="number"
                            min="1"
                            value={formData.teamSize}
                            onChange={e =>
                              handleInputChange('teamSize', Number.parseInt(e.target.value) || 1)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={formData.status}
                            onValueChange={value => handleInputChange('status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(status => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Description with Live Preview */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project, its goals, and what makes it unique..."
                        value={formData.description}
                        onChange={e => handleInputChange('description', e.target.value)}
                        className="min-h-32 resize-none"
                        required
                      />
                      {formData.description && (
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                          <p className="text-sm leading-relaxed">{formData.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Additional Details</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://your-website.com"
                            value={formData.website}
                            onChange={e => handleInputChange('website', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="marginRate">Margin Rate (Optional)</Label>
                          <Input
                            id="marginRate"
                            placeholder="e.g., 15-25%"
                            value={formData.marginRate}
                            onChange={e => handleInputChange('marginRate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="datePosted">Date Posted</Label>
                          <Input
                            id="datePosted"
                            type="date"
                            value={formData.datePosted}
                            onChange={e => handleInputChange('datePosted', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Half - Roles */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Open Positions</h3>
                      <Button type="button" onClick={addRole} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Role
                      </Button>
                    </div>

                    {formData.roles.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No roles added yet.</p>
                        <p className="text-sm">
                          Click &quot;Add Role&quot; to create your first position.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.roles.map((role, index) => {
                          const isCollapsed = collapsedRoles.has(index);
                          return (
                            <div
                              key={index}
                              className="rounded-lg border bg-muted/30 overflow-hidden"
                            >
                              {/* Role Header - Always Visible */}
                              <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => toggleRoleCollapse(index)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <Label className="text-sm font-medium">
                                      {role.title || `Role ${index + 1}`}
                                    </Label>
                                  </div>
                                  <div className="flex gap-2">
                                    {role.compensation && (
                                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                        {role.compensation}
                                      </span>
                                    )}
                                    {role.description && (
                                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                        Has description
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={e => {
                                      e.stopPropagation();
                                      removeRole(index);
                                    }}
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    {isCollapsed ? (
                                      <Plus className="h-4 w-4" />
                                    ) : (
                                      <X className="h-4 w-4 rotate-45" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Role Content - Collapsible */}
                              {!isCollapsed && (
                                <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 fade-in-0 duration-200">
                                  <div className="space-y-2">
                                    <Label htmlFor={`role-title-${index}`}>Position Title</Label>
                                    <Input
                                      id={`role-title-${index}`}
                                      placeholder="e.g., Chief Technology Officer"
                                      value={role.title}
                                      onChange={e => updateRole(index, 'title', e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`role-compensation-${index}`}>
                                      Compensation
                                    </Label>
                                    <Select
                                      value={role.compensation}
                                      onValueChange={value =>
                                        updateRole(index, 'compensation', value)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select compensation type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {compensationOptions.map(compensation => (
                                          <SelectItem key={compensation} value={compensation}>
                                            {compensation}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`role-description-${index}`}>
                                      Description (Optional)
                                    </Label>
                                    <Textarea
                                      id={`role-description-${index}`}
                                      placeholder="Describe the role responsibilities and requirements..."
                                      value={role.description}
                                      onChange={e =>
                                        updateRole(index, 'description', e.target.value)
                                      }
                                      className="min-h-20 resize-none"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="pt-6 border-t space-y-4">
                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1" size="lg">
                          {initialData?.id ? 'Update Project' : 'Create Project'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                          size="lg"
                        >
                          Cancel
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        By creating this project, you agree to our terms of service and privacy
                        policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
