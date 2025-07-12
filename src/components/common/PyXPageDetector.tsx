'use client'

import { useEffect } from 'react'
import { usePyX } from '../layout/PyXContextProvider'

interface PyXPageDetectorProps {
  currentPath: string
}

export function PyXPageDetector({ currentPath }: PyXPageDetectorProps) {
  const { setCurrentPage } = usePyX()

  useEffect(() => {
    // Map URL paths to page contexts
    const getPageContext = (path: string): string => {
      if (path === '/' || path === '/home') return 'home'
      if (path === '/agents' || path === '/marketplace') return 'marketplace'
      if (path.startsWith('/agent/')) return 'agent-detail'
      if (path === '/create-agent') return 'create-agent'
      if (path === '/agent-builder' || path === '/builder') return 'agent-builder'
      if (path === '/visual-builder') return 'agent-builder'
      if (path.startsWith('/api')) return 'api'
      if (path === '/dashboard') return 'dashboard'
      if (path === '/workflow-builder' || path === '/flows') return 'flow-builder'
      if (path === '/upload-agent' || path === '/upload') return 'upload'
      if (path === '/developer' || path.startsWith('/developer')) return 'developer-mode'
      if (path === '/testing-lab') return 'developer-mode'
      if (path === '/documentation' || path === '/docs') return 'api'
      if (path === '/tutorials') return 'developer-mode'
      
      return 'default'
    }

    const pageContext = getPageContext(currentPath)
    setCurrentPage(pageContext)
  }, [currentPath, setCurrentPage])

  return null // This component doesn't render anything
}