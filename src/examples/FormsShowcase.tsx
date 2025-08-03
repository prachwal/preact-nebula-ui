import { useState } from 'preact/hooks'
import { Input, Label, Textarea } from '../../nebula'

// Mock icons for demonstration
const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const EmailIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const EyeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

export const FormsShowcase = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    search: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string) => (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    setFormData(prev => ({ ...prev, [field]: target.value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    if (validateForm()) {
      alert('Form submitted successfully!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Forms Foundation Showcase
        </h1>
        <p className="text-xl text-gray-600">
          Interactive demo of Input, Label, Textarea, and FieldError components
        </p>
      </div>

      {/* Form Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Form Example</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" required size="md">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={errors.name}
              leftIcon={<UserIcon />}
              size="md"
            />
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" required size="md">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              leftIcon={<EmailIcon />}
              size="md"
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" required size="md">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              helperText="Must be at least 8 characters long"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <EyeIcon />
                </button>
              }
              size="md"
            />
          </div>

          {/* Bio Field */}
          <div>
            <Label htmlFor="bio" size="md">
              Bio (Optional)
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleInputChange('bio')}
              error={errors.bio}
              maxLength={500}
              showCharCount
              autoResize
              minRows={3}
              maxRows={8}
              helperText="Share a brief description about yourself"
              size="md"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </section>

      {/* Input Variants Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default */}
          <div>
            <Label>Default State</Label>
            <Input
              placeholder="Default input"
              variant="default"
            />
          </div>

          {/* Success */}
          <div>
            <Label>Success State</Label>
            <Input
              placeholder="Success input"
              variant="success"
              helperText="Great! This looks good."
            />
          </div>

          {/* Error */}
          <div>
            <Label>Error State</Label>
            <Input
              placeholder="Error input"
              variant="error"
              error="Something went wrong"
            />
          </div>
        </div>
      </section>

      {/* Input Sizes Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Sizes</h2>
        
        <div className="space-y-4">
          <div>
            <Label size="sm">Small Input</Label>
            <Input
              size="sm"
              placeholder="Small size input"
              leftIcon={<SearchIcon />}
            />
          </div>

          <div>
            <Label size="md">Medium Input (Default)</Label>
            <Input
              size="md"
              placeholder="Medium size input"
              leftIcon={<SearchIcon />}
            />
          </div>

          <div>
            <Label size="lg">Large Input</Label>
            <Input
              size="lg"
              placeholder="Large size input"
              leftIcon={<SearchIcon />}
            />
          </div>
        </div>
      </section>

      {/* Input Types Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label>Text Input</Label>
            <Input type="text" placeholder="Enter text..." />
          </div>

          <div>
            <Label>Email Input</Label>
            <Input type="email" placeholder="Enter email..." />
          </div>

          <div>
            <Label>Password Input</Label>
            <Input type="password" placeholder="Enter password..." />
          </div>

          <div>
            <Label>Number Input</Label>
            <Input type="number" placeholder="Enter number..." />
          </div>

          <div>
            <Label>Tel Input</Label>
            <Input type="tel" placeholder="Enter phone..." />
          </div>

          <div>
            <Label>URL Input</Label>
            <Input type="url" placeholder="https://..." />
          </div>
        </div>
      </section>

      {/* Textarea Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Textarea Features</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auto-resize */}
          <div>
            <Label>Auto-resize Textarea</Label>
            <Textarea
              placeholder="Start typing and watch it grow..."
              autoResize
              minRows={2}
              maxRows={6}
              helperText="This textarea will automatically resize as you type"
            />
          </div>

          {/* Character counter */}
          <div>
            <Label>Character Counter</Label>
            <Textarea
              placeholder="Write something with character limit..."
              maxLength={200}
              showCharCount
              helperText="Maximum 200 characters allowed"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Features</h2>
        
        <div className="space-y-6">
          {/* Required field */}
          <div>
            <Label htmlFor="required-field" required>
              Required Field with Proper Association
            </Label>
            <Input
              id="required-field"
              placeholder="This field is required"
              helperText="Notice the red asterisk and proper labeling"
            />
          </div>

          {/* Error with ARIA */}
          <div>
            <Label htmlFor="error-field">
              Field with Error Announcement
            </Label>
            <Input
              id="error-field"
              placeholder="Field with error"
              error="This error will be announced to screen readers"
            />
          </div>

          {/* Disabled field */}
          <div>
            <Label disabled htmlFor="disabled-field">
              Disabled Field
            </Label>
            <Input
              id="disabled-field"
              disabled
              value="This field is disabled"
              helperText="Notice how the label styling matches the disabled state"
            />
          </div>
        </div>
      </section>

      {/* Live Search Demo */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Search Example</h2>
        
        <div>
          <Label htmlFor="search">
            Search Components
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Try typing 'input', 'textarea', or 'label'..."
            value={formData.search}
            onChange={handleInputChange('search')}
            leftIcon={<SearchIcon />}
            helperText={`${formData.search ? `Searching for: "${formData.search}"` : 'Start typing to search'}`}
          />
          
          {formData.search && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Search Results:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {['Input', 'Label', 'Textarea', 'FieldError'].filter(item => 
                  item.toLowerCase().includes(formData.search.toLowerCase())
                ).map(item => (
                  <li key={item}>• {item} component</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Integration Example */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Real-world Integration</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            This demonstrates how all components work together in a realistic form scenario with:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Validation:</strong> Real-time error handling and display</li>
            <li><strong>Accessibility:</strong> Proper ARIA attributes and screen reader support</li>
            <li><strong>User Experience:</strong> Clear visual feedback and helpful messaging</li>
            <li><strong>Responsive Design:</strong> Works on all screen sizes</li>
            <li><strong>Performance:</strong> Efficient re-rendering and state management</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
