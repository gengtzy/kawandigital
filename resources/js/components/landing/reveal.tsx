import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
};

export default function Reveal({
    children,
    className,
    delayMs = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reducedMotion || typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -36px 0px',
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={
                isVisible && delayMs > 0
                    ? { transitionDelay: `${delayMs}ms` }
                    : undefined
            }
            className={cn(
                'transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0',
                className,
            )}
        >
            {children}
        </div>
    );
}

