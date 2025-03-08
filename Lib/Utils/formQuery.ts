import { UrlQueryParams, RemoveUrlQueryParams } from '@/Types';
import qs from 'query-string';

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
    const currentUrl = qs.parse(params);

    currentUrl[key] = value;

    const result = qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl
        },
        {
            skipNull: true
        }
    );

    return result;
};

export const removeKeysFromQurey = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach(key => {
        delete currentUrl[key];
    });

    const result = qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl
        },
        {
            skipNull: true
        }
    );

    return result;
};