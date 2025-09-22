'use server';

// import AuthService from "@/lib/auth-service/auth-service";
import { apiPost } from "./api-requests";
import { toast } from "sonner";

export const handleRefreshToken = async (message: string): Promise<boolean> => {
    try {
        // const accessToken = AuthService.getAccessToken();
        // const refreshToken = AuthService.getRefreshToken();

        // if (!accessToken || !refreshToken) {
        // logout("Session Expired", "No valid tokens found");
        // return false;
        // }

        const response = await apiPost('/auth/refresh-token', {
            // accessToken,
            // refreshToken
        });

        const { status } = response;

        console.log("Response from refresh token API: ", response);

        if (status === 200) {
            // Update tokens using AuthService
            // AuthService.setTokens(data.data.accessToken, data.data.refreshToken);
            toast.success("Token Refreshed", {
                description: "Session has been renewed",
            });

            window.location.reload();
            return true; // Return success
        }

        if (status === 401) {
            console.log(message);
            // logout("Session Expired", message);
            window.location.reload();
            return false;
        }

        return false;
    } catch (error) {
        console.error("Refresh token failed:", error);
        // logout("Session Expired", "Unable to refresh session");
        return false;
    }
};