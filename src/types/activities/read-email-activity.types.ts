export interface ReadEmailActivityStates {
    receiverAddress: string;
    emailFolder: string;
    filterSubject: string;
    filterCondition: string;
    filterValue: string;
}

export const initialReadEmailActivityStates: ReadEmailActivityStates = {
    receiverAddress: '',
    emailFolder: 'Inbox',
    filterSubject: '',
    filterCondition: 'contains',
    filterValue: '',
}