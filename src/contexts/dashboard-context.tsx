'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ProcessUpdatePayload } from '@/types/process.types';

interface DashboardContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    processData: Partial<ProcessUpdatePayload> | null;
    setProcessData: (data: Partial<ProcessUpdatePayload> | null) => void;
    onSaveProcess?: () => void;
    setOnSaveProcess: (callback: (() => void) | undefined) => void;
    onPublishProcess?: () => void;
    setOnPublishProcess: (callback: (() => void) | undefined) => void;
    isSaving: boolean;
    setIsSaving: (saving: boolean) => void;
    isPublishing: boolean;
    setIsPublishing: (publishing: boolean) => void;
    currentProcessId: string | null;
    setCurrentProcessId: (id: string | null) => void;
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
    const [processData, setProcessData] = useState<Partial<ProcessUpdatePayload> | null>(null);
    const [onSaveProcess, setOnSaveProcess] = useState<(() => void) | undefined>(undefined);
    const [onPublishProcess, setOnPublishProcess] = useState<(() => void) | undefined>(undefined);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    // Initialize from localStorage and persist changes
    const [currentProcessId, setCurrentProcessId] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('currentProcessId');
        }
        return null;
    });

    // Persist currentProcessId to localStorage whenever it changes
    useEffect(() => {
        if (currentProcessId) {
            localStorage.setItem('currentProcessId', currentProcessId);
        }
    }, [currentProcessId]);

    return (
        <DashboardContext.Provider
            value={{
                activeTab,
                setActiveTab,
                processData,
                setProcessData,
                onSaveProcess,
                setOnSaveProcess,
                onPublishProcess,
                setOnPublishProcess,
                isSaving,
                setIsSaving,
                isPublishing,
                setIsPublishing,
                currentProcessId,
                setCurrentProcessId
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};