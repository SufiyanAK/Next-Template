import ProcessScreen from "@/screens/process-screen";

export const metadata = {
    title: 'QBOTZ | Process',
    description: 'Process automation page',
};

const ProcessPage = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;

    return <ProcessScreen id={id} />;
};

export default ProcessPage;