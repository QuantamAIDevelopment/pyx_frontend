'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface TranslationSet {
  [key: string]: string | TranslationSet
}

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

interface I18nContextType {
  currentLanguage: string
  availableLanguages: Language[]
  translations: TranslationSet
  translate: (key: string, params?: Record<string, string>) => string
  setLanguage: (language: string) => Promise<void>
  formatDate: (date: Date) => string
  formatTime: (date: Date) => string
  formatNumber: (number: number) => string
  formatCurrency: (amount: number, currency?: string) => string
  isRTL: boolean
  loading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Language definitions
const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', rtl: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false }
]

// Default English translations
const DEFAULT_TRANSLATIONS: TranslationSet = {
  common: {
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    close: 'Close',
    open: 'Open',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    search: 'Search',
    clear: 'Clear',
    help: 'Help',
    settings: 'Settings'
  },
  pyx: {
    greeting: 'Hello! I\'m PyX, your AI assistant.',
    askQuestion: 'Ask me anything about QAID...',
    thinking: 'PyX is thinking...',
    voiceCommand: 'Voice command',
    startListening: 'Start listening',
    stopListening: 'Stop listening',
    speaking: 'Speaking...',
    clearChat: 'Clear chat',
    tutorial: 'Tutorial',
    examples: 'Examples',
    help: 'Help',
    settings: 'Settings',
    analytics: 'Analytics',
    voiceSettings: 'Voice Settings',
    language: 'Language',
    theme: 'Theme',
    responseStyle: 'Response Style',
    concise: 'Concise',
    detailed: 'Detailed',
    technical: 'Technical',
    autoSpeak: 'Auto-speak responses',
    continuousListening: 'Continuous listening',
    noiseReduction: 'Noise reduction'
  },
  agent: {
    create: 'Create Agent',
    edit: 'Edit Agent',
    delete: 'Delete Agent',
    test: 'Test Agent',
    deploy: 'Deploy Agent',
    marketplace: 'Marketplace',
    myAgents: 'My Agents',
    popularAgents: 'Popular Agents',
    categories: 'Categories',
    search: 'Search agents...',
    filter: 'Filter',
    sort: 'Sort',
    rating: 'Rating',
    downloads: 'Downloads',
    price: 'Price',
    free: 'Free',
    premium: 'Premium',
    description: 'Description',
    features: 'Features',
    examples: 'Examples',
    documentation: 'Documentation',
    support: 'Support',
    reviews: 'Reviews',
    install: 'Install',
    uninstall: 'Uninstall',
    update: 'Update'
  },
  api: {
    documentation: 'API Documentation',
    reference: 'Reference',
    examples: 'Examples',
    playground: 'Playground',
    authentication: 'Authentication',
    rateLimit: 'Rate Limit',
    endpoints: 'Endpoints',
    requests: 'Requests',
    responses: 'Responses',
    errors: 'Errors',
    testing: 'Testing',
    sdk: 'SDK',
    webhooks: 'Webhooks'
  },
  dashboard: {
    overview: 'Overview',
    analytics: 'Analytics',
    usage: 'Usage',
    performance: 'Performance',
    billing: 'Billing',
    settings: 'Settings',
    profile: 'Profile',
    security: 'Security',
    notifications: 'Notifications',
    integrations: 'Integrations',
    logs: 'Logs',
    activity: 'Activity',
    stats: 'Statistics',
    trends: 'Trends',
    insights: 'Insights'
  },
  errors: {
    networkError: 'Network connection error',
    serverError: 'Server error occurred',
    authError: 'Authentication failed',
    validationError: 'Validation error',
    notFound: 'Resource not found',
    forbidden: 'Access forbidden',
    timeout: 'Request timeout',
    unknown: 'Unknown error occurred',
    tryAgain: 'Please try again',
    contactSupport: 'Contact support if the problem persists'
  },
  messages: {
    welcome: 'Welcome to QAID!',
    goodbye: 'Thank you for using QAID!',
    saved: 'Changes saved successfully',
    deleted: 'Item deleted successfully',
    created: 'Item created successfully',
    updated: 'Item updated successfully',
    processing: 'Processing your request...',
    completed: 'Task completed successfully',
    failed: 'Task failed to complete',
    retry: 'Retrying...',
    offline: 'You are currently offline',
    online: 'Connection restored'
  }
}

interface I18nProviderProps {
  children: React.ReactNode
  defaultLanguage?: string
}

export function I18nProvider({ children, defaultLanguage = 'en' }: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
  const [translations, setTranslations] = useState<TranslationSet>(DEFAULT_TRANSLATIONS)
  const [loading, setLoading] = useState(false)

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0]
  const isRTL = currentLang.rtl

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('pyx-language')
      if (savedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage)
      } else {
        // Auto-detect browser language
        const browserLanguage = navigator.language.split('-')[0]
        if (SUPPORTED_LANGUAGES.find(lang => lang.code === browserLanguage)) {
          setCurrentLanguage(browserLanguage)
        }
      }
    }
  }, [])

  // Load translations for current language
  useEffect(() => {
    if (currentLanguage !== 'en') {
      loadTranslations(currentLanguage)
    }
  }, [currentLanguage])

  // Update document direction for RTL languages
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
      document.documentElement.lang = currentLanguage
    }
  }, [currentLanguage, isRTL])

  const loadTranslations = async (languageCode: string) => {
    setLoading(true)
    
    try {
      // In a real app, you'd fetch from an API or import language files
      // For now, we'll use mock translations
      const mockTranslations = await fetchTranslations(languageCode)
      setTranslations(mockTranslations)
    } catch (error) {
      console.error('Failed to load translations:', error)
      // Fallback to English if translation loading fails
      setTranslations(DEFAULT_TRANSLATIONS)
    } finally {
      setLoading(false)
    }
  }

  const setLanguage = async (language: string) => {
    if (SUPPORTED_LANGUAGES.find(lang => lang.code === language)) {
      setCurrentLanguage(language)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('pyx-language', language)
      }
      
      // Load translations if not English
      if (language !== 'en') {
        await loadTranslations(language)
      } else {
        setTranslations(DEFAULT_TRANSLATIONS)
      }
    }
  }

  const translate = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to key if translation not found
        console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`)
        return key
      }
    }
    
    let result = typeof value === 'string' ? value : key
    
    // Replace parameters in the translation
    if (params) {
      Object.entries(params).forEach(([param, replacement]) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), replacement)
      })
    }
    
    return result
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat(currentLanguage, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat(currentLanguage).format(number)
  }

  const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'currency',
      currency
    }).format(amount)
  }

  return (
    <I18nContext.Provider value={{
      currentLanguage,
      availableLanguages: SUPPORTED_LANGUAGES,
      translations,
      translate,
      setLanguage,
      formatDate,
      formatTime,
      formatNumber,
      formatCurrency,
      isRTL,
      loading
    }}>
      {children}
    </I18nContext.Provider>
  )
}

// Language selector component
export function LanguageSelector() {
  const { currentLanguage, availableLanguages, setLanguage} = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-lg">
          {availableLanguages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
        <span className="text-sm">
          {availableLanguages.find(lang => lang.code === currentLanguage)?.name}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            {availableLanguages.map(language => (
              <button
                key={language.code}
                onClick={() => {
                  setLanguage(language.code)
                  setIsOpen(false)
                }}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  language.code === currentLanguage ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div>
                  <div className="text-sm font-medium">{language.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{language.nativeName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to fetch translations (mock implementation)
async function fetchTranslations(languageCode: string): Promise<TranslationSet> {
  // In a real app, this would fetch from an API or import language files
  // For now, return mock translations based on language
  
  const mockTranslations: Record<string, Partial<TranslationSet>> = {
    es: {
      common: {
        yes: 'Sí',
        no: 'No',
        ok: 'OK',
        cancel: 'Cancelar',
        save: 'Guardar',
        delete: 'Eliminar',
        edit: 'Editar',
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        warning: 'Advertencia',
        info: 'Información',
        close: 'Cerrar',
        open: 'Abrir',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        submit: 'Enviar',
        search: 'Buscar',
        clear: 'Limpiar',
        help: 'Ayuda',
        settings: 'Configuración'
      },
      pyx: {
        greeting: 'Hola! Soy PyX, tu asistente de IA.',
        askQuestion: 'Pregúntame sobre QAID...',
        thinking: 'PyX está pensando...',
        voiceCommand: 'Comando de voz',
        startListening: 'Comenzar a escuchar',
        stopListening: 'Dejar de escuchar',
        speaking: 'Hablando...',
        clearChat: 'Limpiar chat',
        tutorial: 'Tutorial',
        examples: 'Ejemplos',
        help: 'Ayuda',
        settings: 'Configuración',
        analytics: 'Análisis',
        voiceSettings: 'Configuración de voz',
        language: 'Idioma',
        theme: 'Tema',
        responseStyle: 'Estilo de respuesta',
        concise: 'Conciso',
        detailed: 'Detallado',
        technical: 'Técnico',
        autoSpeak: 'Hablar automáticamente',
        continuousListening: 'Escucha continua',
        noiseReduction: 'Reducción de ruido'
      }
    },
    fr: {
      common: {
        yes: 'Oui',
        no: 'Non',
        ok: 'OK',
        cancel: 'Annuler',
        save: 'Sauvegarder',
        delete: 'Supprimer',
        edit: 'Modifier',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        warning: 'Avertissement',
        info: 'Information',
        close: 'Fermer',
        open: 'Ouvrir',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent',
        submit: 'Soumettre',
        search: 'Rechercher',
        clear: 'Effacer',
        help: 'Aide',
        settings: 'Paramètres'
      },
      pyx: {
        greeting: 'Bonjour! Je suis PyX, votre assistant IA.',
        askQuestion: 'Demandez-moi à propos de QAID...',
        thinking: 'PyX réfléchit...',
        voiceCommand: 'Commande vocale',
        startListening: 'Commencer à écouter',
        stopListening: 'Arrêter d\'écouter',
        speaking: 'Parlant...',
        clearChat: 'Effacer le chat',
        tutorial: 'Tutoriel',
        examples: 'Exemples',
        help: 'Aide',
        settings: 'Paramètres',
        analytics: 'Analyses',
        voiceSettings: 'Paramètres vocaux',
        language: 'Langue',
        theme: 'Thème',
        responseStyle: 'Style de réponse',
        concise: 'Concis',
        detailed: 'Détaillé',
        technical: 'Technique',
        autoSpeak: 'Parler automatiquement',
        continuousListening: 'Écoute continue',
        noiseReduction: 'Réduction du bruit'
      }
    }
  }

  // Merge with default translations
  const baseTranslations = { ...DEFAULT_TRANSLATIONS }
  const languageTranslations = mockTranslations[languageCode] || {}
  
  return mergeTranslations(baseTranslations, languageTranslations)
}

function mergeTranslations(base: TranslationSet, override: Partial<TranslationSet>): TranslationSet {
  const result = { ...base }
  
  Object.entries(override).forEach(([key, value]) => {
    if (typeof value === 'object' && typeof result[key] === 'object') {
      result[key] = { ...result[key], ...value }
    } else {
      if (value !== undefined) {
        result[key] = value
      }
    }
  })
  
  return result
}