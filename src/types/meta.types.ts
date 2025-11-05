// * Meta Enums
export interface MetaEnums {
    id: number;
    label: string;
    value: string;
    type: 'EMAIL_FILTERS' | 'EMAIL_FOLDERS' | 'EMAIL_PROPERITES' | 'REQUEST_METHODS' | 'DATA_STRUCTURES' | 'AUTH_TYPES';
    valueType: string | [] | null
    // createdAt: string;
    // updatedAt: string;
}

// * Meta Enum Types
export interface MetaEnumTypes {
    EMAIL_FILTERS: 'EMAIL_FILTERS';
    EMAIL_FOLDERS: 'EMAIL_FOLDERS';
    EMAIL_PROPERITES: 'EMAIL_PROPERITES';
    REQUEST_METHODS: 'REQUEST_METHODS';
    DATA_STRUCTURES: 'DATA_STRUCTURES';
    AUTH_TYPES: 'AUTH_TYPES';
}

// * Meta Enum Process Categories
export interface MetaEnumProcessCategories {
    id: number;
    name: string;
    description: string | null;
}

// * Meta Enum States
export interface MetaEnumStates {
    enums: Array<MetaEnums>;
    enumTypes: MetaEnumTypes;
    processCategories: Array<MetaEnumProcessCategories>;
}