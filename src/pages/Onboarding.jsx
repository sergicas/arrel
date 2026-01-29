import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calculator, User, Target } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    focus: 'physical',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      navigate('/dashboard');
    }
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-bg-primary)]">
      {/* Progress Indicator */}
      <div className="w-full max-w-md mb-12 flex justify-between items-center text-sm text-[var(--color-text-muted)] font-mono">
        <span className={step >= 1 ? 'text-[var(--color-accent-blue)]' : ''}>01 IDENTITY</span>
        <div className="h-px flex-1 bg-[var(--color-border)] mx-4 relative">
          <div
            className="absolute left-0 top-0 h-full bg-[var(--color-accent-blue)] transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
        <span className={step >= 2 ? 'text-[var(--color-accent-blue)]' : ''}>02 CHRONOLOGY</span>
        <div className="h-px flex-1 bg-[var(--color-border)] mx-4 relative">
          <div
            className="absolute left-0 top-0 h-full bg-[var(--color-accent-blue)] transition-all duration-500"
            style={{ width: step === 3 ? '100%' : '0%' }}
          ></div>
        </div>
        <span className={step >= 3 ? 'text-[var(--color-accent-blue)]' : ''}>03 TARGET</span>
      </div>

      <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
        {/* Step 1: Name */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center space-x-3 text-[var(--color-accent-blue)] mb-4">
              <User size={24} />
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Subject Identity
              </h2>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              Enter designation for protocol tracking.
            </p>
            <input
              type="text"
              name="name"
              placeholder="Name or Alias"
              value={formData.name}
              onChange={handleInput}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)] rounded p-4 text-white focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
              autoFocus
            />
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center space-x-3 text-[var(--color-accent-blue)] mb-4">
              <Calculator size={24} />
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Chronological Status
              </h2>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              Current age is required for baseline calibration.
            </p>
            <input
              type="number"
              name="age"
              placeholder="Age in years"
              value={formData.age}
              onChange={handleInput}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)] rounded p-4 text-white focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
              autoFocus
            />
          </div>
        )}

        {/* Step 3: Focus */}
        {step === 3 && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center space-x-3 text-[var(--color-accent-blue)] mb-4">
              <Target size={24} />
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Priority Vector
              </h2>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              Select primary aging vector to target immediately.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {['Physical', 'Mental', 'Emotional', 'Social', 'Intellectual'].map((area) => (
                <button
                  key={area}
                  onClick={() => setFormData({ ...formData, focus: area.toLowerCase() })}
                  className={`p-3 rounded border text-left transition-all ${
                    formData.focus === area.toLowerCase()
                      ? 'border-[var(--color-accent-blue)] bg-[rgba(0,240,255,0.1)] text-white'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-secondary)]'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={(step === 1 && !formData.name) || (step === 2 && !formData.age)}
            className="btn btn-primary w-full md:w-auto overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'INITIALIZE' : 'PROCEED'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
