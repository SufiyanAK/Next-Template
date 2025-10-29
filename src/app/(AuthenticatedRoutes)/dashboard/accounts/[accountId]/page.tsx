import EmailViewerScreen from '@/screens/email-viewer-screen';

interface EmailViewerPageProps {
    params: Promise<{
        accountId: string;
    }>;
}

export async function generateMetadata({ params }: EmailViewerPageProps) {
    const { accountId } = await params;
    return {
        title: `RPA | Account ${accountId} Emails`,
        description: `Email viewer for account ${accountId}`,
    };
}

const EmailViewerPage = async ({ params }: EmailViewerPageProps) => {
    const { accountId } = await params;
    return <EmailViewerScreen accountId={parseInt(accountId)} />;
};

export default EmailViewerPage;