'use client'

import { useEffect } from 'react'
import { usePyX } from '../layout/PyXContextProvider'

interface PyXPageDetectorProps {
  currentPath: string
}

// Path to page context mapping
const PATH_CONTEXT_MAP: Record<string, string> = {
  '/': 'home',
  '/home': 'home',
  '/agents': 'marketplace',
  '/marketplace': 'marketplace',
  '/create-agent': 'create-agent',
  '/agent-builder': 'agent-builder',
  '/builder': 'agent-builder',
  '/visual-builder': 'agent-builder',
  '/dashboard': 'dashboard',
  '/workflow-builder': 'flow-builder',
  '/flows': 'flow-builder',
  '/upload-agent': 'upload',
  '/upload': 'upload',
  '/developer': 'developer-mode',
  '/testing-lab': 'developer-mode',
  '/documentation': 'api',
  '/docs': 'api',
  '/tutorials': 'developer-mode'
}

export function PyXPageDetector({ currentPath }: PyXPageDetectorProps) {
  const { setCurrentPage } = usePyX()

  useEffect(() => {
    // Get page context from path mapping
    const getPageContext = (path: string): string => {
      // Check exact matches first
      if (PATH_CONTEXT_MAP[path]) {
        return PATH_CONTEXT_MAP[path]
      }
      
      // Check path patterns
      if (path.startsWith('/agent/')) return 'agent-detail'
      if (path.startsWith('/api')) return 'api'
      if (path.startsWith('/developer')) return 'developer-mode'
      
      return 'default'
    }

    const pageContext = getPageContext(currentPath)
    setCurrentPage(pageContext)
  }, [currentPath, setCurrentPage])

  return null // This component doesn't render anything
}