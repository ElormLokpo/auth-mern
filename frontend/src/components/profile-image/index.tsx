import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/services/api/auth";
import { toast } from "sonner";

export const ProfileImage = () => {
    let [imgUrl, setImgUrl] = useState("https://placehold.co/200x200")
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const authState = useSelector((state: any) => state.auth.value);
    console.log(authState)

    useEffect(()=>{
        setImgUrl(authState.currentUser.profile_picture)

    }, [authState])

    const handleImageUpload = async (e: any) => {

        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

        await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`, formData)
            .then(async (response: any) => {
                let { data } = await updateUser({ id: authState.currentUser.id, data: { profile_picture: response.data.secure_url } })
                
                if(data?.success == true){
                    setImgUrl(response.data.secure_url)
                    toast.success("Profile picture set.")
                }else{
                    toast.error("Something went wrong")
                }
            
            })
    }

    return (
        <div className="mb-2">
            <img className="rounded-full w-[11rem] h-[11rem]" src={imgUrl} />

            <div className="flex items-center justify-center relative -top-4">
                <label htmlFor="image-file-input" className="border hover:bg-gray-100 hover:cursor-pointer bg-white rounded-full w-[2rem] h-[2rem] flex justify-center items-center p-2">
                    <FiCamera />
                    <input id="image-file-input" type="file" hidden onChange={handleImageUpload} />
                </label>
            </div>
        </div>
    )
}