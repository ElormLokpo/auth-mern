import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { IController } from "interface/controller.interface";


export class App{
    public app:express.Express;   


    constructor(controllers: IController[]){
        this.app = express();
        this.initializeMiddleware();
        this.InitializeControllers(controllers);
        this.ConnectDatabase();
    }

    private initializeMiddleware(){
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }


    private ConnectDatabase(){
        mongoose.Promise = Promise; 
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected")
        mongoose.connection.on("error",(error:Error)=>console.log(error));
    }

    private InitializeControllers(controllers:IController[]){
        controllers.forEach(controller=> this.app.use("/", controller.router))
    }


    public listen(){
        const PORT = process.env.PORT;
        this.app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`))
    }

}