'use client'

import { useState } from 'react'
import { PromptEntryPage } from '../pages/PromptEntryPage'
import { InputExampleSelectionPage } from '../pages/InputExampleSelectionPage'
import { OutputExampleSelectionPage } from '../pages/OutputExampleSelectionPage'
import { CredentialConfigPage } from '../pages/CredentialConfigPage'
import { AgentGenerationOutputPage } from '../pages/AgentGenerationOutputPage'

interface AgentBuilderFlowProps {
  onBack: () => void
  onComplete: (agentConfig: any) => void
  onUseAPI: (agentData: any) => void
}

interface FlowData {
  prompt: string
  inputOption: any
  outputOption: any
  credentials: {
    agentName?: string
    [key: string]: any
  }
}

export function AgentBuilderFlow({ onBack, onComplete, onUseAPI }: AgentBuilderFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowData, setFlowData] = useState<FlowData>({
    prompt: '',
    inputOption: null,
    outputOption: null,
    credentials: {}
  })

  const handlePromptNext = (prompt: string) => {
    setFlowData(prev => ({ ...prev, prompt }))
    setCurrentStep(1)
  }

  const handleInputNext = (inputOption: any) => {
    setFlowData(prev => ({ ...prev, inputOption }))
    setCurrentStep(2)
  }

  const handleOutputNext = (outputOption: any) => {
    setFlowData(prev => ({ ...prev, outputOption }))
    setCurrentStep(3)
  }

  const handleCredentialsNext = (credentials: any) => {
    setFlowData(prev => ({ ...prev, credentials }))
    setCurrentStep(4)
  }

  const handleEdit = () => {
    // Navigate to visual builder with current configuration
    onComplete({
      ...flowData,
      action: 'edit'
    })
  }

  const handleDeploy = () => {
    // Deploy the agent
    onComplete({
      ...flowData,
      action: 'deploy'
    })
  }

  const handleUseAPI = () => {
    // Navigate to API access page with agent data
    const agentData = {
      id: 'agent_' + Math.random().toString(36).substring(2, 15),
      name: flowData.credentials?.agentName || 'My AI Agent',
      description: flowData.prompt || 'AI Agent created with QAID',
      category: flowData.inputOption?.badge || 'General'
    }
    onUseAPI(agentData)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  switch (currentStep) {
    case 0:
      return (
        <PromptEntryPage 
          onNext={handlePromptNext}
          onBack={onBack}
        />
      )
    case 1:
      return (
        <InputExampleSelectionPage 
          prompt={flowData.prompt}
          onNext={handleInputNext}
          onBack={handleBack}
        />
      )
    case 2:
      return (
        <OutputExampleSelectionPage 
          onNext={handleOutputNext}
          onBack={handleBack}
        />
      )
    case 3:
      return (
        <CredentialConfigPage 
          inputOption={flowData.inputOption}
          outputOption={flowData.outputOption}
          onNext={handleCredentialsNext}
          onBack={handleBack}
        />
      )
    case 4:
      return (
        <AgentGenerationOutputPage 
          prompt={flowData.prompt}
          inputOption={flowData.inputOption}
          outputOption={flowData.outputOption}
          credentials={flowData.credentials}
          onEdit={handleEdit}
          onDeploy={handleDeploy}
          onUseAPI={handleUseAPI}
          onBack={handleBack}
        />
      )
    default:
      return null
  }
}