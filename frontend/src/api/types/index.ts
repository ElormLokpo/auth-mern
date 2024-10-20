export interface IAuth{
    firstname:string, 
    lastname:string, 
    othernames?:string
    email: string, 
    email_verfied?:boolean,
    mobile?:string, 
    password:string, 
    gender?: string,
    location?:string, 
    zip_code?:number,
    country?:string, 
    profile_picture?:string
}

