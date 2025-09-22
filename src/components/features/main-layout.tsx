'use client';

import { persistor, store } from "@/store/store";
import { MantineProvider } from "@mantine/core"
import { ReactNode } from "react"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <MantineProvider>
                        {children}
                </MantineProvider>
            </PersistGate>
        </Provider>
    )
}

export default MainLayout