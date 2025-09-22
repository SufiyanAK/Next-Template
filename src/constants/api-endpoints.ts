const API_ENDPOINTS = {
    auth: process.env.BASE_URL + process.env.AUTH_LOGIN_API!,
    traceAndTrack: process.env.BASE_URL + process.env.TRACE_AND_TRACK_URL!,
    baseUrl: process.env.NEXT_PUBLIC_API_URL
};

export default API_ENDPOINTS;