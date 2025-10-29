'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface DashboardContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
    const [activeTab, setActiveTab] = useState('accounts');

    return (
        <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </DashboardContext.Provider>
    );
};