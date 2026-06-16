import {fetch as nitroFetch} from "react-native-nitro-fetch";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpRequest = {
    url: string;
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: string;
};

export function request({url, method = "GET", headers, body}: HttpRequest) {
    return nitroFetch(url, {
        body,
        headers,
        method,
    });
}

export function getHttpClientName() {
    return "Nitro Fetch";
}
