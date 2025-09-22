import AuthenticatedLayout from '@/components/features/authenticated-layout'
import { ReactNode } from 'react'

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthenticatedLayout>
            {children}
        </AuthenticatedLayout>
    )
}

export default PrivateLayout