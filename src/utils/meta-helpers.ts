import { MetaEnums } from "@/types/meta.types";

/**
 * Converts meta items to select dropdown format
 */
export const metaToSelectFormat = (items: MetaEnums[]) => {
    return items.map(item => ({
        value: item.value,
        label: item.label
    }));
};

/**
 * Formats email folders for dropdown
 */
export const getEmailFoldersSelect = (items: MetaEnums[]) => {
    const folders = items.filter(item => item.type === 'EMAIL_FOLDERS');
    return metaToSelectFormat(folders);
};

/**
 * Formats email filters for dropdown
 */
export const getEmailFiltersSelect = (items: MetaEnums[]) => {
    const filters = items.filter(item => item.type === 'EMAIL_FILTERS');
    return metaToSelectFormat(filters);
};

/**
 * Formats email output properties for dropdown
 */
export const getEmailOutputPropertiesSelect = (items: MetaEnums[]) => {
    const props = items.filter(item => item.type === 'EMAIL_PROPERITES');
    return metaToSelectFormat(props);
};

/**
 * Formats request methods for dropdown
 */
export const getRequestMethodsSelect = (items: MetaEnums[]) => {
    const methods = items.filter(item => item.type === 'REQUEST_METHODS');
    return metaToSelectFormat(methods);
}

/**
 * Formats data structure methods for dropdown
 */
export const getDataStructuresSelect = (items: MetaEnums[]) => {
    const dataStructure = items.filter(item => item.type === 'DATA_STRUCTURES');
    return metaToSelectFormat(dataStructure);
}

/**
 * Formats Auth types for dropdown
 */
export const getAuthTypesSelect = (items: MetaEnums[]) => {
    const authTypes = items.filter(item => item.type === 'AUTH_TYPES');
    return metaToSelectFormat(authTypes);
}