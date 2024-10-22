import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/button";

export const GoogleComponent = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-12 items-center gap-1 mb-2">
                <hr className="col-span-5" />
                <div className="col-span-2">
                    <p className="text-center">or</p>
                </div>

                <hr className="col-span-5" />
            </div>


            <div className="mb-6">
                <Button icon={<FcGoogle />} style_type="misc" content="Continue with Google" handler={() => { }} />
            </div>

        </div>
    )
}