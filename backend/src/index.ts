import "dotenv/config";
import { App } from "./app";
import { PingController } from "./entities/ping/ping.controller";
import { AuthController } from "./entities/auth/auth.controller";


const app = new App([
    new PingController(), 
    new AuthController()
]);
app.listen();