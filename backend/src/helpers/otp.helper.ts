export const generateOtp = ()=>{
    let otp_code = Math.floor(100000 + Math.random() * 900000);
    let expiration_time =  5 * 60 * 1000
    let created_at = Date.now();

    return {otp_code, expiration_time, created_at}
}

export const otpExpired = (startTime: Date, expirationTime: number): boolean => {
   

    return new Date().getTime() - startTime.getTime() >= expirationTime;
}


export const ValidateOtp = (otp_user: number, otp_database: any) => {

    let otp_expired = otpExpired(otp_database.created_at, otp_database.expiration_time);

    if (otp_user == otp_database.otp_code && otp_expired == false) {
        return true
    } else {
        return false;
    }
}