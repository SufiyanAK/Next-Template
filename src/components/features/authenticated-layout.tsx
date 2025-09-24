import { Box } from "@mantine/core"
import { FC, ReactNode } from "react"
import HeaderComponent from "../common/header"

interface AuthenticatedLayoutProps {
    children?: ReactNode
}

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
    return (
        <Box style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box style={{ flexShrink: 0 }}>
                <HeaderComponent />
            </Box>
            <Box style={{
                flex: 1,
                minHeight: 'calc(100vh - 66px)'
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default AuthenticatedLayout