import { Button } from "@/components/button";
import { GoDotFill } from "react-icons/go";

export const HomePage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="mb-2">
                    <img className="rounded-full" src="https://placehold.co/200x200" />
                </div>
                <div className="text-lg font-semibold">Johnson Yaw Amedzo</div>
                <div className="text-sm mb-2">johsnon.yaw@gmail.com</div>

                <div className="text-xs mb-3 flex items-center gap-2">
                    <p>GM-192-245</p>
                    <p><GoDotFill /></p>
                    <p>Ghana</p>
                    <p><GoDotFill /></p>
                    <p>02334332322</p>
                </div>

                
                    <Button content="Logout" handler={()=>{}} />
                
            </div>
        </div>
    )
}