export enum AppComponents {
    ACTION = 'action',
    RESPONSE = 'response',
    EVENT = 'event',
    AUTH = 'auth',
}

export interface AppInterface {
    _id: string;
    workspace_id: string;
    user_id: string;
    app_name: string;
    require_whitelist: boolean;
    active: boolean;
    __v: number;
    status: string;
    envs: any[];
    actions: any[];
}