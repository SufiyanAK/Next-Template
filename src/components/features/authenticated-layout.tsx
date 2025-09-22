import { Box } from "@mantine/core"
import { FC, ReactNode } from "react"

interface AuthenticatedLayoutProps {
    children?: ReactNode
}

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default AuthenticatedLayout