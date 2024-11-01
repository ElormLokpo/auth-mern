export interface IAuthNavigationContext {
    otpPageBlock: boolean,
    setOtpPageBlock: (param: boolean) => void,
    isResetPassword: boolean,
    setIsResetPassword: (param: boolean) => void
}