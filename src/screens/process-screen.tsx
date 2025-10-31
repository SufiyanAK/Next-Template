'use client';

import AssignEmailActivityComponent from '@/components/features/dashboard/processes/activities/assign-email-activity-component';
// import EmailToActivityComponent from '@/components/features/dashboard/email-to-activity-component';
import ERPConfigActivityComponent from '@/components/features/dashboard/processes/activities/erp-config-activity-component';
import ProcessTabComponent from '@/components/features/dashboard/process-tab';
import ReadEmailActivityComponent from '@/components/features/dashboard/processes/activities/read-email-activity-component';
import ReplyEmailActivityComponent from '@/components/features/dashboard/processes/activities/reply-email-activity-component';
import { Box } from '@mantine/core';
import { useState } from 'react';

const ProcessScreen = ({ id }: { id: string }) => {
    const [readEmailModalOpened, setReadEmailModalOpened] = useState(false);
    const [replyEmailModalOpened, setReplyEmailModalOpened] = useState(false);
    // const [emailToModalOpened, setEmailToModalOpened] = useState(false);
    const [erpConfigModalOpened, setErpConfigModalOpened] = useState(false);
    const [assignEmailModalOpened, setAssignEmailModalOpened] = useState(false);


    const handleActivityConfig = (nodeId: string, activityType: string) => {
        if (activityType === 'read-email') {
            setReadEmailModalOpened(true);
            return;
        }
        if (activityType === 'reply-email') {
            setReplyEmailModalOpened(true);
            return;
        }
        if (activityType === 'erp-config') {
            setErpConfigModalOpened(true);
            return;
        }
        if (activityType === 'assign') {
            setAssignEmailModalOpened(true);
            return;
        }

    };

    return (
        <Box style={{ height: '100%', overflow: 'hidden' }}>
            <ProcessTabComponent onActivityConfig={handleActivityConfig} />

            {/* Read Email Activity Modal */}
            <ReadEmailActivityComponent
                opened={readEmailModalOpened}
                onClose={() => setReadEmailModalOpened(false)}
            />
            <ReplyEmailActivityComponent opened={replyEmailModalOpened} onClose={() => setReplyEmailModalOpened(false)} />
            {/* <EmailToActivityComponent opened={emailToModalOpened} onClose={() => setEmailToModalOpened(false)} /> */}
            <ERPConfigActivityComponent opened={erpConfigModalOpened} onClose={() => setErpConfigModalOpened(false)} />
            <AssignEmailActivityComponent opened={assignEmailModalOpened} onClose={() => setAssignEmailModalOpened(false)} />
        </Box>
    );
};

export default ProcessScreen;