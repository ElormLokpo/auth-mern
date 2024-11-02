import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../../interface/controller.interface";
import { IAuth } from "./auth.types";
import { GenerateResponse } from "../../helpers/response.gen";
import { AuthModel } from "./auth.model";
import { GenerateToken } from "../../helpers/token.helper";
import { ComparePassword, HashPassword } from "../../helpers/hash.password";
import { sendOTPEmail } from "../../helpers/email.sender";
import { ValidateOtp } from "../../helpers/otp.helper";


export class AuthController implements IController {
    public path = "/auth";
    public router = Router();

    constructor() {
        this.router.post(`${this.path}/register`, this.RegisterUser)
        this.router.post(`${this.path}/login`, this.LoginUser)
        this.router.post(`${this.path}/validate-otp`, this.ValidateOtp)
        this.router.post(`${this.path}/request-otp`, this.RequestOtp)
        this.router.post(`${this.path}/reset-password`, this.ResetPassword)
        this.router.patch(`${this.path}/update`, this.UpdateUser)
        this.router.delete(`${this.path}/delete`, this.DeleteUser)

    }

    private async RegisterUser(req: Request, res: Response, next: NextFunction) {
        const { email, password, firstname, lastname } = req.body as IAuth;

        if (!email || !password || !firstname || !lastname) {
            let response = GenerateResponse("Email, password , firstname and lastname are required", false, {})
            res.status(200).json(response);
            next();
        } else {
            let email_check = await AuthModel.findOne({ email });

            if (email_check) {
                let response = GenerateResponse(`User with email: ${email} already exists`, false, {})
                res.status(200).json(response);
                next();

            } else {
                let otp = await sendOTPEmail(email)

                req.body.password = await HashPassword(password);
                req.body.otp = otp;

                let auth_mutation = await AuthModel.create(req.body as IAuth);
                let response_body = {
                    id: auth_mutation._id,
                    fullname: auth_mutation.firstname + " " + auth_mutation.lastname + " " + auth_mutation.othernames,
                    email: auth_mutation.email,
                    email_verified: auth_mutation.email_verified,
                    mobile: auth_mutation.mobile,
                    country: auth_mutation.country,
                    address: auth_mutation.address,
                    profile_picture: auth_mutation.profile_picture

                }
                let token = await GenerateToken({ id: auth_mutation._id })

                let response = GenerateResponse(`User registered successfully`, true, {
                    token,
                    response_body
                })
                res.status(200).json(response);
                next();
            }


        }

    }


    private async LoginUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as IAuth;

        if (!email || !password) {
            let response = GenerateResponse("Email and password are required", false, {})
            res.status(200).json(response);
            next();
        }

        let email_check = await AuthModel.findOne({ email }).select("+password");
        if (!email_check) {
            let response = GenerateResponse(`User with email: ${email} does not exist`, false, {})
            res.status(200).json(response);
            next();
        }

        //hanlde unverfied email

        let password_check = await ComparePassword(password, email_check.password);

        if (!password_check) {
            let response = GenerateResponse(`Incorrect Password`, false, {})
            res.status(200).json(response);
            next();
        }

        let response_body = {
            id: email_check._id,
            fullname: email_check.firstname + " " + email_check.lastname + " " + email_check.othernames,
            email: email_check.email,
            email_verified: email_check.email_verified,
            mobile: email_check.mobile,
            country: email_check.country,
            address: email_check.address,
            profile_picture: email_check.profile_picture
        }

        let token = await GenerateToken({ id: email_check._id })

        let response = GenerateResponse(`Login successful`, true, {
            token,
            response_body
        })
        res.status(200).json(response);
        next();
    }


    private async ValidateOtp(req: Request, res: Response, next: NextFunction) {
        let { otp, email } = req.body;

        let email_check = await AuthModel.findOne({ email });
        if (!email_check) {
            let response = GenerateResponse(`User with email: ${email} does not exist`, false, {})
            res.status(200).json(response);
            next();
        } else {

            if (email_check.otp && Object.keys(email_check).length > 0) {
                let validate_otp = ValidateOtp(otp, email_check.otp);
                if (validate_otp) {
                    await AuthModel.findByIdAndUpdate(email_check._id, { email_verified: true, otp: {} }, { new: true })

                    let response = GenerateResponse(`Otp verfied successfully`, true, {
                        id: email_check._id,
                        fullname: email_check.firstname + " " + email_check.lastname + " " + email_check.othernames,
                        email: email_check.email,
                        email_verified: email_check.email_verified,
                        mobile: email_check.mobile,
                        country: email_check.country,
                        address: email_check.address,
                        profile_picture: email_check.profile_picture

                    })
                    res.status(200).json(response);
                    next();
                } else {

                    let response = GenerateResponse(`Invalid Otp`, false, {})
                    res.status(200).json(response);
                    next();
                }
            } else {
                let response = GenerateResponse(`Kindly request new otp`, false, {})
                res.status(200).json(response);
                next();
            }

        }

    }


    private async RequestOtp(req: Request, res: Response, next: NextFunction) {
        let { email } = req.body;

        let email_check = await AuthModel.findOne({ email });
        if (!email_check) {
            let response = GenerateResponse(`User with email: ${email} does not exist`, false, {})
            res.status(200).json(response);
            next();
        }
        else {
            let otp = await sendOTPEmail(email)

            if (otp && Object.keys(otp).length > 0) {
                let update_body = { otp }

                await AuthModel.findByIdAndUpdate(email_check._id, update_body, { new: true })

                let response = GenerateResponse(`Otp sent successfully`, true, {})
                res.status(200).json(response);
                next();
            } else {
                let response = GenerateResponse(`Something went wrong..Please try again`, false, {})
                res.status(200).json(response);
                next();
            }


        }

    }

    private async ResetPassword(req: Request, res: Response, next: NextFunction) {
        let { email, password } = req.body;

        let email_check = await AuthModel.findOne({ email }).select("+password");
        if (!email_check) {
            let response = GenerateResponse(`User with email: ${email} does not exist`, false, {})
            res.status(200).json(response);
            next();
        } else {


            if (email_check.otp.otp_code) {
                let response = GenerateResponse(`Otp not validated`, false, {})
                res.status(200).json(response);
                next();
            } else {
                let compare_password = await ComparePassword(password, email_check.password);

                if (compare_password == true) {
                    let response = GenerateResponse(`New password cannot be the same as the old password.`, false, {})
                    res.status(200).json(response);
                    next();
                } else {

                    let hashedPassword = await HashPassword(password)
                    await AuthModel.findByIdAndUpdate(email_check._id, { password: hashedPassword }, { new: true });

                    let response = GenerateResponse(`Password reset successfully`, true, {})
                    res.status(200).json(response);
                    next();
                }

            }



        }


    }


    private async UpdateUser(req: Request, res: Response, next: NextFunction) {
        let { id } = req.body;

        let userData = await AuthModel.findById(id);
        if (!userData) {
            let response = GenerateResponse(`User does not exist`, false, {})
            res.status(200).json(response);
            next();
        } else {
            let user_mutation = await AuthModel.findByIdAndUpdate(id, req.body.data, { new: true })
            let response = GenerateResponse(`User updated successfully`, true, user_mutation)
            res.status(200).json(response);
            next();
        }
    }


    private async DeleteUser(req: Request, res: Response, next: NextFunction) {
        let { id } = req.body;

        let userData = await AuthModel.findById(id);
        if (!userData) {
            let response = GenerateResponse(`User does not exist`, false, {})
            res.status(200).json(response);
            next();
        } else {
            let user_mutation = await AuthModel.findByIdAndDelete(id)
            let response = GenerateResponse(`User deleted successfully`, true, user_mutation)
            res.status(200).json(response);
            next();
        }
    }


}