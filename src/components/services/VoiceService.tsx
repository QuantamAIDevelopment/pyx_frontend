'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface VoiceServiceConfig {
  speechRecognitionLang: string
  speechSynthesisVoice: string
  speechRate: number
  speechPitch: number
  speechVolume: number
  autoSpeak: boolean
  continuousListening: boolean
  noiseReduction: boolean
}

interface VoiceServiceType {
  // Speech Recognition
  isListening: boolean
  isSupported: boolean
  hasPermission: boolean
  permissionState: 'unknown' | 'granted' | 'denied' | 'prompt'
  startListening: () => Promise<void>
  stopListening: () => void
  transcript: string
  confidence: number
  
  // Speech Synthesis
  isSpeaking: boolean
  speak: (text: string) => Promise<void>
  stopSpeaking: () => void
  
  // Configuration
  config: VoiceServiceConfig
  updateConfig: (newConfig: Partial<VoiceServiceConfig>) => void
  
  // Voice Commands
  registerVoiceCommand: (command: string, handler: () => void) => void
  unregisterVoiceCommand: (command: string) => void
  
  // Audio Analysis
  audioLevel: number
  isNoiseDetected: boolean
  
  // Permission Management
  requestPermission: () => Promise<boolean>
  checkPermission: () => Promise<'granted' | 'denied' | 'prompt'>
}

const VoiceServiceContext = createContext<VoiceServiceType | undefined>(undefined)

export function useVoiceService() {
  const context = useContext(VoiceServiceContext)
  if (!context) {
    throw new Error('useVoiceService must be used within a VoiceServiceProvider')
  }
  return context
}

interface VoiceServiceProviderProps {
  children: React.ReactNode
}

export function VoiceServiceProvider({ children }: VoiceServiceProviderProps) {
  const [config, setConfig] = useState<VoiceServiceConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pyx-voice-config')
      return saved ? JSON.parse(saved) : {
        speechRecognitionLang: 'en-US',
        speechSynthesisVoice: 'default',
        speechRate: 1.0,
        speechPitch: 1.0,
        speechVolume: 1.0,
        autoSpeak: false,
        continuousListening: false,
        noiseReduction: true
      }
    }
    return {
      speechRecognitionLang: 'en-US',
      speechSynthesisVoice: 'default',
      speechRate: 1.0,
      speechPitch: 1.0,
      speechVolume: 1.0,
      autoSpeak: false,
      continuousListening: false,
      noiseReduction: true
    }
  })

  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isNoiseDetected, setIsNoiseDetected] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [permissionState, setPermissionState] = useState<'unknown' | 'granted' | 'denied' | 'prompt'>('unknown')

  const [recognition, setRecognition] = useState<any>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
  const [voiceCommands, setVoiceCommands] = useState<Map<string, () => void>>(new Map())
  // Removed unused audioContext state
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)

  // Check for browser support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const speechSynthesis = window.speechSynthesis
      
      if (SpeechRecognition && speechSynthesis) {
        setIsSupported(true)
        setSynthesis(speechSynthesis)
        
        // Initialize speech recognition (but don't start it)
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = config.speechRecognitionLang
        
        recognition.onstart = () => {
          setIsListening(true)
          setTranscript('')
        }
        
        recognition.onresult = (event: any) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            const confidence = event.results[i][0].confidence
            
            if (event.results[i].isFinal) {
              finalTranscript += transcript
              setConfidence(confidence)
            } else {
              interimTranscript += transcript
            }
          }
          
          setTranscript(finalTranscript + interimTranscript)
          
          if (finalTranscript) {
            checkVoiceCommands(finalTranscript.toLowerCase().trim())
          }
        }
        
        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            setPermissionState('denied')
            setHasPermission(false)
          }
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
          if (config.continuousListening && hasPermission) {
            setTimeout(() => startListening(), 100)
          }
        }
        
        setRecognition(recognition)
      }
    }
  }, [config.speechRecognitionLang, config.continuousListening, hasPermission])

  // Check microphone permission
  const checkPermission = useCallback(async (): Promise<'granted' | 'denied' | 'prompt'> => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      return 'prompt'
    }

    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      const state = permission.state as 'granted' | 'denied' | 'prompt'
      setPermissionState(state)
      setHasPermission(state === 'granted')
      return state
    } catch (error) {
      // Fallback: assume we need to prompt
      return 'prompt'
    }
  }, [])

  // Request microphone permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Permission granted
      setPermissionState('granted')
      setHasPermission(true)
      
      // Stop the stream immediately - we just needed it for permission
      stream.getTracks().forEach(track => track.stop())
      
      return true
    } catch (error) {
      setPermissionState('denied')
      setHasPermission(false)
      return false
    }
  }, [])

  // Initialize audio analysis only when needed and permission is granted
  const initializeAudioAnalysis = useCallback(async () => {
    if (!hasPermission || !config.noiseReduction) {
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)
      
      analyser.fftSize = 256
      source.connect(analyser)
      
      // Removed setAudioContext(audioContext) since audioContext state is unused
      setAnalyser(analyser)
      
      // Start audio level monitoring
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const updateAudioLevel = () => {
        if (analyser && isListening) {
          analyser.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
          setAudioLevel(average / 255)
          setIsNoiseDetected(average > 50)
          requestAnimationFrame(updateAudioLevel)
        }
      }
      updateAudioLevel()
    } catch (error) {
      // Audio analysis failed - this is not critical, so just log it
      if (typeof error === 'object' && error !== null && 'message' in error) {
        console.debug('Audio analysis could not be initialized:', (error as { message: string }).message)
      } else {
        console.debug('Audio analysis could not be initialized:', error)
      }
    }
  }, [hasPermission, config.noiseReduction, isListening])

  const startListening = useCallback(async (): Promise<void> => {
    if (!recognition || !isSupported) {
      throw new Error('Speech recognition not supported')
    }
    
    try {
      // Check/request permission first
      if (!hasPermission) {
        const granted = await requestPermission()
        if (!granted) {
          throw new Error('Microphone permission denied')
        }
      }
      
      // Initialize audio analysis if needed
      if (config.noiseReduction && !analyser) {
        await initializeAudioAnalysis()
      }
      
      recognition.start()
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string' && (error as any).message.includes('permission')) {
        throw new Error('Microphone permission is required for voice recognition')
      }
      throw error
    }
  }, [recognition, isSupported, hasPermission, requestPermission, config.noiseReduction, analyser, initializeAudioAnalysis])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
    }
  }, [recognition])

  const speak = useCallback(async (text: string): Promise<void> => {
    if (!synthesis || !isSupported) {
      throw new Error('Speech synthesis not supported')
    }
    
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      synthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = config.speechRate
      utterance.pitch = config.speechPitch
      utterance.volume = config.speechVolume
      utterance.lang = config.speechRecognitionLang
      
      // Set voice if specified
      if (config.speechSynthesisVoice !== 'default') {
        const voices = synthesis.getVoices()
        const voice = voices.find(v => v.name === config.speechSynthesisVoice)
        if (voice) {
          utterance.voice = voice
        }
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true)
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        resolve()
      }
      
      utterance.onerror = (error) => {
        setIsSpeaking(false)
        reject(error)
      }
      
      synthesis.speak(utterance)
    })
  }, [synthesis, isSupported, config])

  const stopSpeaking = useCallback(() => {
    if (synthesis) {
      synthesis.cancel()
      setIsSpeaking(false)
    }
  }, [synthesis])

  const registerVoiceCommand = useCallback((command: string, handler: () => void) => {
    setVoiceCommands(prev => new Map(prev).set(command.toLowerCase(), handler))
  }, [])

  const unregisterVoiceCommand = useCallback((command: string) => {
    setVoiceCommands(prev => {
      const newMap = new Map(prev)
      newMap.delete(command.toLowerCase())
      return newMap
    })
  }, [])

  const checkVoiceCommands = useCallback((transcript: string) => {
    for (const [command, handler] of voiceCommands) {
      if (transcript.includes(command)) {
        handler()
        break
      }
    }
  }, [voiceCommands])

  const updateConfig = useCallback((newConfig: Partial<VoiceServiceConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig }
      if (typeof window !== 'undefined') {
        localStorage.setItem('pyx-voice-config', JSON.stringify(updated))
      }
      return updated
    })
  }, [])

  // Register default voice commands
  useEffect(() => {
    const defaultCommands = new Map([
      ['open chat', () => {
        window.dispatchEvent(new CustomEvent('pyx-voice-command', { detail: { command: 'open-chat' } }))
      }],
      ['close chat', () => {
        window.dispatchEvent(new CustomEvent('pyx-voice-command', { detail: { command: 'close-chat' } }))
      }],
      ['clear chat', () => {
        window.dispatchEvent(new CustomEvent('pyx-voice-command', { detail: { command: 'clear-chat' } }))
      }],
      ['help', () => {
        window.dispatchEvent(new CustomEvent('pyx-voice-command', { detail: { command: 'help' } }))
      }],
      ['stop listening', () => {
        stopListening()
      }],
      ['stop speaking', () => {
        stopSpeaking()
      }]
    ])
    
    setVoiceCommands(defaultCommands)
  }, [stopListening, stopSpeaking])

  // Check permission on mount
  useEffect(() => {
    checkPermission()
  }, [checkPermission])

  return (
    <VoiceServiceContext.Provider value={{
      isListening,
      isSupported,
      hasPermission,
      permissionState,
      startListening,
      stopListening,
      transcript,
      confidence,
      isSpeaking,
      speak,
      stopSpeaking,
      config,
      updateConfig,
      registerVoiceCommand,
      unregisterVoiceCommand,
      audioLevel,
      isNoiseDetected,
      requestPermission,
      checkPermission
    }}>
      {children}
    </VoiceServiceContext.Provider>
  )
}

// Voice interaction component
export function VoiceInteraction() {
  const {
    isListening,
    isSupported,
    hasPermission,
    permissionState,
    startListening,
    stopListening,
    transcript,
    confidence,
    isSpeaking,
    audioLevel,
    isNoiseDetected,
    requestPermission
  } = useVoiceService()

  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false)

  const handleVoiceToggle = async () => {
    if (isListening) {
      stopListening()
      return
    }

    if (!hasPermission) {
      setShowPermissionPrompt(true)
      return
    }

    try {
      await startListening()
    } catch (error) {
      console.error('Failed to start voice recognition:', error)
      if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string' && (error as any).message.includes('permission')) {
        setShowPermissionPrompt(true)
      }
    }
  }

  const handlePermissionRequest = async () => {
    const granted = await requestPermission()
    setShowPermissionPrompt(false)
    
    if (granted) {
      try {
        await startListening()
      } catch (error) {
        console.error('Failed to start listening after permission granted:', error)
      }
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="voice-interaction">
      {/* Permission prompt */}
      {showPermissionPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Microphone Permission Required</h3>
            <p className="text-gray-600 mb-4">
              To use voice features, PyX needs access to your microphone. Your audio is processed locally and not stored.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handlePermissionRequest}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Allow Microphone
              </button>
              <button
                onClick={() => setShowPermissionPrompt(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleVoiceToggle}
          className={`p-2 rounded-full transition-all duration-200 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : hasPermission
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-400 hover:bg-gray-500 text-white'
          }`}
          title={
            !hasPermission ? 'Grant microphone permission' :
            isListening ? 'Stop listening' : 'Start listening'
          }
        >
          {isListening ? '🛑' : '🎤'}
        </button>
        
        {/* Permission status indicator */}
        {permissionState === 'denied' && (
          <div className="text-xs text-red-600">
            Microphone blocked
          </div>
        )}
        
        {/* Audio level indicator */}
        {isListening && hasPermission && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 transition-all duration-100 rounded-full"
                style={{ height: `${audioLevel * 100}%` }}
              />
            </div>
            {isNoiseDetected && (
              <span className="text-xs text-yellow-600">Noise detected</span>
            )}
          </div>
        )}
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-blue-600">Speaking...</span>
          </div>
        )}
      </div>
      
      {/* Transcript display */}
      {transcript && (
        <div className="mt-2 p-2 bg-gray-100 rounded-lg">
          <div className="text-sm text-gray-700">{transcript}</div>
          {confidence > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Confidence: {(confidence * 100).toFixed(1)}%
            </div>
          )}
        </div>
      )}
    </div>
  )
}