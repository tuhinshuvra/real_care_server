export interface TErrorSources {
    path: string;
    message: string;
}

export interface TErrorResposne {
    statusCode?: number;
    success: boolean;
    message: string;
    errorSources: TErrorSources[];
    errors?: unknown;
}


