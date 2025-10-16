const API_ENDPOINTS = {
    backend: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!,
    url: process.env.BASE_BACKEND_URL!,
    login: process.env.NEXT_PUBLIC_LOGIN_ENDPOINT!,
    getAllAccounts: process.env.NEXT_PUBLIC_GET_ALL_ACCOUNTS_ENDPOINT!,
    getEmailsByAccountId: process.env.NEXT_PUBLIC_GET_EMAILS_BY_ACCOUNT_ID_ENDPOINT!,
};

export default API_ENDPOINTS;