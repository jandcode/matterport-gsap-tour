'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { TourStep } from '@/types/tour';

gsap.registerPlugin(Observer);

interface TourOverlayProps {
    steps: TourStep[];
    onStepChange: (index: number) => void;
    isLoading: boolean;
}

export default function TourOverlay({ steps, onStepChange, isLoading }: TourOverlayProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const transitionOverlayRef = useRef<HTMLDivElement>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        const obs = Observer.create({
            target: containerRef.current,
            type: "wheel,touch,pointer",
            onDown: () => !isTransitioning && nextStep(),
            onUp: () => !isTransitioning && prevStep(),
            tolerance: 50,
            preventDefault: false
        });

        return () => obs.kill();
    }, [isLoading, isTransitioning, currentStepIndex]);

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            animateStepChange(currentStepIndex + 1);
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            animateStepChange(currentStepIndex - 1);
        }
    };

    const animateStepChange = (newIndex: number) => {
        setIsTransitioning(true);

        const tl = gsap.timeline({
            onComplete: () => setIsTransitioning(false)
        });

        // 1. Fade out current text
        tl.to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentStepIndex(newIndex);
                onStepChange(newIndex);
            }
        }, 0);

        // 2. Fade in new text
        tl.fromTo(textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "+=0.1"
        );
    };

    if (isLoading) {
        return (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
                <div className="relative">
                    <div className="w-24 h-24 border-t-white border-white/10 border-4 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
                <h2 className="mt-12 text-2xl font-extralight tracking-[0.3em] uppercase italic">Matterport</h2>
                <p className="mt-2 text-white/30 tracking-[0.4em] text-[10px] uppercase">Engineered Experience</p>
            </div>
        );
    }

    const currentStep = steps[currentStepIndex];

    return (
        <>
            <div ref={containerRef} className="absolute inset-0 z-40 pointer-events-auto flex flex-col justify-end p-8 pb-16 md:p-16 mb-[env(safe-area-inset-bottom)] select-none touch-none">
                {/* Background Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div ref={textRef} className="relative z-10 max-w-2xl">
                    <span className="text-white/60 text-sm uppercase tracking-widest mb-2 block">
                        Step {currentStepIndex + 1} of {steps.length}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        {currentStep.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-lg">
                        {currentStep.description}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-white/30" />
                        <span className="text-xs text-white/40 uppercase tracking-widest">Swipe up to explore</span>
                    </div>
                </div>

                {/* Progress Line */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 transition-all duration-500 ${i === currentStepIndex ? 'h-8 bg-white' : 'h-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
