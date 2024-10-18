import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../../interface/controller.interface";
import { IAuth } from "./auth.types";
import { GenerateResponse } from "../../helpers/response.gen";
import { AuthModel } from "./auth.model";
import { GenerateToken } from "../../helpers/token.helper";
import { ComparePassword, HashPassword } from "../../helpers/hash.password";


export class AuthController implements IController {
    public path = "/auth";
    public router = Router();

    constructor() {
        this.router.post(`${this.path}/register`, this.RegisterUser),
            this.router.post(`${this.path}/login`, this.LoginUser)
    }

    private async RegisterUser(req: Request, res: Response, next: NextFunction) {
        const { email, password, firstname, lastname } = req.body as IAuth;

        if (!email || !password || !firstname || !lastname) {
            let response = GenerateResponse("Email, password , firstname and lastname are required", false, {})
            res.status(200).json(response);
            next();
        }

        let email_check = await AuthModel.findOne({ email });
        if (email_check) {
            let response = GenerateResponse(`User with email: ${email} already exists`, false, {})
            res.status(200).json(response);
            next();
        }

        //Implemnt verify email

        req.body.password = await HashPassword(password);
        let auth_mutation = await AuthModel.create(req.body as IAuth);
        let response_body = {
            id: auth_mutation._id,
            fullname: auth_mutation.firstname + " " + auth_mutation.lastname + " " + auth_mutation.othernames,
            email: auth_mutation.email
        }

        let token = await GenerateToken({ id: auth_mutation._id })

        let response = GenerateResponse(`User registered successfully`, true, {
            token,
            response_body
        })
        res.status(200).json(response);
        next();

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
            fullname: email_check.firstname + " " +email_check.lastname + " " +email_check.othernames,
            email: email_check.email
        }

        let token = await GenerateToken({ id: email_check._id })

        let response = GenerateResponse(`Login successful`, true, {
            token,
            response_body
        })
        res.status(200).json(response);
        next();
    }


}