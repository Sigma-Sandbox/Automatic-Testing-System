export interface User {
    id: string;
    username: string;
    // name:string;
    // surname:string;
}

export interface UserSchema {
    authData?: User;
}
