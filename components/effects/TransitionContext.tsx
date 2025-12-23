'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionContextType {
    isTransitioning: boolean;
    setTransitioning: (active: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setTransitioning] = useState(false);

    return (
        <TransitionContext.Provider value={{ isTransitioning, setTransitioning }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (context === undefined) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
}
