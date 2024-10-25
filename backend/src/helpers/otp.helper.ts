export const otpExpired = (startTime: Date, expirationTime: number): boolean => {
    return new Date().getTime() - startTime.getTime() >= expirationTime;
}


export const ValidateOtp = (otp_user: number, otp_database: any) => {

    let otp_expired = otpExpired(otp_database.created_at, otp_database.expiration_time);

    if (otp_user === otp_database.code && otp_expired == false) {
        return true
    } else {
        return false;
    }
}