'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Checkbox } from '../common/ui/checkbox'
import { Separator } from '../common/ui/separator'
import { Progress } from '../common/ui/progress'
import { 
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  // MapPin,
  // Calendar,
  // Phone,
  Mail,
  Globe,
  Linkedin,
  Github,
  // ExternalLink,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  Send,
  // Building,
  Clock,
  // DollarSign,
  Sparkles,
  // Target,
  // Star,
  // Award,
  // Book,
  // Zap,
  // Heart,
  // Coffee
} from 'lucide-react'

interface JobApplicationPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
  jobId?: string
}

interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
}

export function JobApplicationPage({ onViewChange , jobId = 'sr-ai-engineer' }: JobApplicationPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    portfolio: '',
    
    // Job Preferences
    desiredSalary: '',
    availableStartDate: '',
    workAuthorization: '',
    relocationWillingness: '',
    remotePreference: '',
    
    // Cover Letter & Additional Info
    coverLetter: '',
    whyJoin: '',
    additionalInfo: '',
    
    // Files
    resume: null as File | null,
    coverLetterFile: null as File | null,
    portfolioFile: null as File | null,
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    communicationConsent: false
  })

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: '1',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ])

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
  ])

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const jobDetails = {
    'sr-ai-engineer': {
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: 'Rs150000 - Rs22000',
      remote: true
    },
    'fullstack-engineer': {
      title: 'Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: 'Rs12000 - Rs16000',
      remote: true
    },
    'product-manager': {
      title: 'Senior Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: 'Rs140000 - Rs180000',
      remote: false
    }
  }

  const currentJob = jobDetails[jobId as keyof typeof jobDetails] || jobDetails['sr-ai-engineer']

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Experience', icon: Briefcase },
    { id: 3, title: 'Education', icon: GraduationCap },
    { id: 4, title: 'Skills & Portfolio', icon: Code },
    { id: 5, title: 'Cover Letter', icon: FileText },
    { id: 6, title: 'Review & Submit', icon: CheckCircle }
  ]

  const totalSteps = steps.length
  const progressPercentage = (currentStep / totalSteps) * 100

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }])
  }

  const removeWorkExperience = (id: string) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter(exp => exp.id !== id))
    }
  }

  const updateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setWorkExperience(workExperience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }])
  }

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id))
    }
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return workExperience.some(exp => exp.company && exp.position)
      case 3:
        return education.some(edu => edu.institution && edu.degree)
      case 4:
        return skills.length > 0
      case 5:
        return formData.coverLetter.length > 50
      case 6:
        return formData.termsAccepted && formData.privacyAccepted
      default:
        return true
    }
  }

  const handleSubmit = () => {
    if (canProceedToNext()) {
      setSubmitted(true)
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', { formData, workExperience, education, skills })
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps && canProceedToNext()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest in the <strong>{currentJob.title}</strong> position. 
                We've received your application and will review it shortly.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>We'll review your application within 3-5 business days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>You'll receive an email confirmation shortly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>If selected, our recruiting team will contact you</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => onViewChange('careers')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Careers
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#FF620A] to-[#993B06]"
                  onClick={() => onViewChange('dashboard')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explore QAID
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onViewChange('careers')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold">Apply for {currentJob.title}</h1>
              <p className="text-sm text-muted-foreground">{currentJob.department} • {currentJob.location}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Step {currentStep} of {totalSteps}</div>
              <div className="text-xs text-muted-foreground">{steps[currentStep - 1].title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Progress value={progressPercentage} className="w-full h-2" />
          <div className="flex justify-between mt-3">
            {steps.map((step) => {
              const IconComponent = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center ${
                    isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isActive ? 'border-primary bg-primary/10' : 
                    isCompleted ? 'border-green-600 bg-green-50' : 'border-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <IconComponent className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Let's start with your basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Current Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Online Presence (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/yourprofile"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub Profile</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="github"
                          value={formData.github}
                          onChange={(e) => handleInputChange('github', e.target.value)}
                          placeholder="github.com/yourusername"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Website/Portfolio</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Work Experience */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <CardDescription>
                  Tell us about your professional background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Experience #{index + 1}</h3>
                      {workExperience.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(exp.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company *</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <Label>Position *</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                          placeholder="Job title"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                        placeholder="City, State/Country"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                        />
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onCheckedChange={(checked) => updateWorkExperience(exp.id, 'current', checked as boolean)}
                          />
                          <Label htmlFor={`current-${exp.id}`} className="text-sm">
                            Currently working here
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addWorkExperience}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Experience
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Education */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
                <CardDescription>
                  Share your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Education #{index + 1}</h3>
                      {education.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University or School name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree *</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Bachelor's, Master's, PhD, etc."
                        />
                      </div>
                      <div>
                        <Label>Field of Study</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="Computer Science, Engineering, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Start Year</Label>
                        <Input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Year</Label>
                        <Input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addEducation}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Skills & Portfolio */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Skills & Portfolio
                </CardTitle>
                <CardDescription>
                  Showcase your technical skills and upload relevant documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Technical Skills *</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., Python, React, Machine Learning)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button onClick={addSkill} disabled={!newSkill.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">Add at least one skill to continue</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">File Uploads</h3>
                  
                  <div>
                    <Label>Resume/CV *</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload your resume (PDF, DOC, DOCX - Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                        className="hidden"
                        id="resume-upload"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('resume-upload')?.click()}
                      >
                        Choose File
                      </Button>
                      {formData.resume && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Portfolio (Optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload portfolio or work samples (PDF - Max 10MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload('portfolioFile', e.target.files?.[0] || null)}
                        className="hidden"
                        id="portfolio-upload"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('portfolio-upload')?.click()}
                      >
                        Choose File
                      </Button>
                      {formData.portfolioFile && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.portfolioFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Job Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Desired Salary Range</Label>
                      <Input
                        value={formData.desiredSalary}
                        onChange={(e) => handleInputChange('desiredSalary', e.target.value)}
                        placeholder="e.g., $120k - $150k"
                      />
                    </div>
                    <div>
                      <Label>Available Start Date</Label>
                      <Input
                        type="date"
                        value={formData.availableStartDate}
                        onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Work Authorization Status</Label>
                    <Select onValueChange={(value) => handleInputChange('workAuthorization', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your work authorization status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-citizen">US Citizen</SelectItem>
                        <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                        <SelectItem value="h1b">H1B Visa</SelectItem>
                        <SelectItem value="opt">F1 OPT</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="sponsorship-required">Require Sponsorship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Remote Work Preference</Label>
                    <Select onValueChange={(value) => handleInputChange('remotePreference', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your remote work preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote-only">Remote Only</SelectItem>
                        <SelectItem value="hybrid">Hybrid (2-3 days remote)</SelectItem>
                        <SelectItem value="office-preferred">Office Preferred</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Cover Letter */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Cover Letter & Motivation
                </CardTitle>
                <CardDescription>
                  Tell us why you're interested in this role and QAID
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Cover Letter *</Label>
                  <Textarea
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    placeholder="Tell us about your background, relevant experience, and why you're interested in this position..."
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.coverLetter.length}/2000 characters (minimum 50 required)
                  </p>
                </div>

                <div>
                  <Label>Why do you want to join QAID?</Label>
                  <Textarea
                    value={formData.whyJoin}
                    onChange={(e) => handleInputChange('whyJoin', e.target.value)}
                    placeholder="What excites you about our mission and company culture?"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Additional Information (Optional)</Label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any additional information you'd like to share (projects, achievements, etc.)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Review & Submit
                </CardTitle>
                <CardDescription>
                  Please review your application and accept our terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Application Summary */}
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold">Application Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Position:</span> {currentJob.title}
                    </div>
                    <div>
                      <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {formData.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {formData.phone}
                    </div>
                    <div>
                      <span className="font-medium">Experience:</span> {workExperience.filter(exp => exp.company).length} positions
                    </div>
                    <div>
                      <span className="font-medium">Education:</span> {education.filter(edu => edu.institution).length} entries
                    </div>
                    <div>
                      <span className="font-medium">Skills:</span> {skills.length} listed
                    </div>
                    <div>
                      <span className="font-medium">Resume:</span> {formData.resume ? '✓ Uploaded' : '✗ Not uploaded'}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Terms and Agreements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{' '}
                        <button className="text-blue-600 hover:underline">Terms of Service</button>
                        {' '}and{' '}
                        <button className="text-blue-600 hover:underline">Privacy Policy</button>
                        {' '}*
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacyAccepted}
                        onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
                      />
                      <Label htmlFor="privacy" className="text-sm leading-relaxed">
                        I consent to QAID processing my personal data for recruitment purposes *
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="communication"
                        checked={formData.communicationConsent}
                        onCheckedChange={(checked) => handleInputChange('communicationConsent', checked as boolean)}
                      />
                      <Label htmlFor="communication" className="text-sm leading-relaxed">
                        I would like to receive updates about QAID and future opportunities (optional)
                      </Label>
                    </div>
                  </div>
                </div>

                {!canProceedToNext() && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800">Please complete required fields</h4>
                      <p className="text-sm text-red-700">
                        You must accept the terms of service and privacy policy to submit your application.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06]"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}