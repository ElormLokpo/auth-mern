export const baseUrl = import.meta.env.VITE_BACKEND_ENDPOINT;


export const routes = {
    auth:{
        register:"/auth/register",
        login:"/auth/login",
        otp:"/auth/otp",
        otp_email:"/auth/reset-password/email",
        otp_password: "/auth/reset-password/password"
    },
    home:"/home"
}