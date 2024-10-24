

export interface IAuthState{
    token: string, 
    currentUser: Object, 

}

export interface IInitialState {
    value: IAuthState
} 