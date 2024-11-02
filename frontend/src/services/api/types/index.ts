export interface IAuth{
    firstname:string, 
    lastname:string, 
    othernames?:string
    email: string, 
    email_verified?:boolean,
    mobile?:string, 
    password:string, 
    gender?: string,
    address?:string, 
    zip_code?:number,
    country?:string, 
    profile_picture?:string,
    otp?:any
}

export interface IResponse {
    message: string, 
    success: boolean, 
    data: any
}