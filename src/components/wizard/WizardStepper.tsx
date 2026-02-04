// ===============================================
// JUNGLE YOURSELF - WIZARD STEPPER COMPONENT
// Step indicator for multi-step forms
// ===============================================

import { Check } from 'lucide-react';

interface Step {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface WizardStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export type { Step };

export default function WizardStepper({ steps, currentStep, className = '' }: WizardStepperProps) {
  return (
    <nav aria-label="Progress" className={`mb-8 ${className}`}>
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <li 
              key={step.id} 
              className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
            >
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div 
                  className={`absolute top-4 left-8 -ml-px w-full h-0.5 sm:w-20 ${
                    isCompleted ? 'bg-moss' : 'bg-sand'
                  }`}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex flex-col items-center group">
                {/* Step Circle */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isCompleted
                      ? 'bg-moss text-warm-white'
                      : isCurrent
                      ? 'bg-forest text-warm-white ring-2 ring-offset-2 ring-forest'
                      : 'bg-sand text-charcoal/60'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </span>

                {/* Step Label */}
                <span 
                  className={`mt-2 text-sm font-medium ${
                    isCurrent ? 'text-forest' : isCompleted ? 'text-moss' : 'text-charcoal/60'
                  }`}
                >
                  {step.name || step.title}
                </span>

                {/* Description (optional) */}
                {step.description && (
                  <span className="hidden sm:block text-xs text-charcoal/50 mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
