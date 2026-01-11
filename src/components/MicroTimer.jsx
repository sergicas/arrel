import React, { useState, useEffect } from 'react';

const MicroTimer = ({ duration, onComplete, label = "Observació" }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (onComplete) onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    const progress = ((duration - timeLeft) / duration) * 100;

    return (
        <div className="flex flex-col items-center justify-center w-full py-12 animate-fade-in">
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                {/* SVG Ring */}
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="96" cy="96" r="88"
                        className="stroke-border fill-none"
                        strokeWidth="2"
                    />
                    <circle
                        cx="96" cy="96" r="88"
                        className="stroke-primary fill-none transition-all duration-1000 ease-linear"
                        strokeWidth="2"
                        strokeDasharray={553} // 2 * PI * 88
                        strokeDashoffset={553 - (553 * progress) / 100}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-mono font-light text-primary tracking-tighter">
                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>
            </div>

            {!isActive && timeLeft === duration && (
                <button
                    onClick={() => setIsActive(true)}
                    className="btn btn-primary px-8"
                >
                    Iniciar {label}
                </button>
            )}

            {isActive && (
                <p className="text-tertiary text-xs uppercase tracking-widest animate-pulse">
                    Mantenir Silenci
                </p>
            )}

            {timeLeft === 0 && (
                <p className="text-accent text-xs uppercase tracking-widest">
                    Completat
                </p>
            )}
        </div>
    );
};

export default MicroTimer;
