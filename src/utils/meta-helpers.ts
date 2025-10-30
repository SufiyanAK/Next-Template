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
