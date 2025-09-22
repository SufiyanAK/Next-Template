import { Box } from "@mantine/core"
import { FC, ReactNode } from "react"
import HeaderComponent from "../common/header"

interface AuthenticatedLayoutProps {
    children?: ReactNode
}

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
    return (
        <Box>
            <div>
                <HeaderComponent />
            </div>
            {children}
        </Box>
    )
}

export default AuthenticatedLayout