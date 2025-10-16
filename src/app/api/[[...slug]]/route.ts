import API_ENDPOINTS from '@/constants/api-endpoints';
import { NextRequest, NextResponse } from 'next/server';

// Function to handle the proxy logic
async function proxyRequest(req: NextRequest, method: string) {
    // Extract the path after /api/backend/rpa/v1
    const apiPath = req.nextUrl.pathname.replace(/^\/api\/backend\/rpa\/v1/, '');
    const url = API_ENDPOINTS.url + apiPath + req.nextUrl.search;

    // Only extract the headers we need: Content-Type and Authorization
    const filteredHeaders: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    // Add Authorization header if it exists
    const authHeader = req.headers.get('Authorization');

    if (authHeader) {
        filteredHeaders.Authorization = authHeader;
    }

    let body: string | undefined;

    // Handle request body properly for different methods
    if (method !== 'GET' && method !== 'HEAD') {
        try {
            // Try to parse as JSON first
            const jsonData = await req.json();
            body = JSON.stringify(jsonData);
            console.log("Request payload: =>>>>>>>>", jsonData);
        } catch {
            // If it's not JSON, fall back to text
            console.log("Not JSON payload, using text");
            const requestClone = req.clone();
            body = await requestClone.text();
        }
    }

    const response = await fetch(url, {
        method,
        headers: filteredHeaders,
        body,
    });

    console.log("Response status:", response.status);

    if (response.ok) {
        const json = await response.json();
        return new NextResponse(JSON.stringify(json), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        return new NextResponse(errorText, { status: response.status });
    }
}

// Export named functions for each HTTP method
export async function GET(request: NextRequest) {
    return await proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
    return await proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
    return await proxyRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
    return await proxyRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
    return await proxyRequest(request, 'DELETE');
}