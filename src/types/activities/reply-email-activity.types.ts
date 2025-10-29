// * Initial state interface for Reply Email Activity
export interface ReplyEmailActivityStates {
    emailAccount: string;
    useSharedMailbox: boolean;
    emailToReply: string;
    htmlContent: string;
    replyToAll: string;
    saveAsDraft: string;
}

// * Initial state for Reply Email Activity
export const initialReplyEmailActivityStates: ReplyEmailActivityStates = {
    emailAccount: '',
    useSharedMailbox: false,
    emailToReply: '',
    htmlContent: '',
    replyToAll: '',
    saveAsDraft: '',
};