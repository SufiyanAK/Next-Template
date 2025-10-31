import ProcessScreen from "@/screens/process-screen";
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'RPA | Process',
    description: 'Process automation page',
};

// Server-side function to validate process exists
async function validateProcess(id: string) {
    // Validate if ID is a valid number
    const processId = parseInt(id, 10);
    if (isNaN(processId) || processId <= 0) {
        return false;
    }

    try {
        // Get auth token from cookies for API request
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken')?.value;

        if (!token) {
            return false;
        }

        // Make API call to verify process exists
        const apiUrl = process.env.NEXT_PUBLIC_GET_PROCESS_BY_ID_ENDPOINT?.replace('{id}', id);
        const response = await fetch(apiUrl!, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache to always get fresh data
        });

        // If API returns 404 or any error, process doesn't exist
        return response.ok;
    } catch (error) {
        console.error('Error validating process:', error);
        return false;
    }
}

const ProcessPage = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;

    // Validate process exists - if not, show not-found page
    const isValid = await validateProcess(id);
    if (!isValid) {
        notFound(); // This renders the not-found.tsx component
    }

    return <ProcessScreen id={id} />;
};

export default ProcessPage;