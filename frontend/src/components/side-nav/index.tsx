import { FaShieldAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { PiImageLight } from "react-icons/pi";
import { PiRocketLaunchLight } from "react-icons/pi";
import {useState} from "react"

const navItemsArr = [
    
    {
        icon: <LuUser />,
        headText:"Basic Information",
        descText: "Kindly provide basic information.",
        showLine: true,
        stateProps: "active"

    },
    {
        icon: <MdOutlineEmail />,
        headText: "Verify Email",
        descText: "Check email for 4 digit code to verify.",
        showLine: true,
        stateProps: "disabled"

    },
    {
        icon: <PiImageLight />,
        headText: "Profile Picture",
        descText: "Provide a profile picture. This is optional.",
        showLine: true,
        stateProps: "disabled"
        
    },
    {
        icon: <PiRocketLaunchLight />,
        headText: "Welcome to SecureGate",
        descText: "Thank you for creating an account with us.",
        showLine: false,
        stateProps: "disabled"
    }
]


export const SideNav = () => {
    return (
        <div className="p-5 h-full rounded bg-stone-100">
            <div className="flex gap-1 items-center mb-9 text-lg font-bold">
                <FaShieldAlt />
                <p>SecureGate</p>
            </div>

            <div>
                <NavItems navItems={navItemsArr} />
            </div>
        </div>
    )
}

const NavItems = ({ navItems }: { navItems: Object[] }) => {
    return navItems.map((item, index) => <NavItem key={index} item={item} />)
}

const NavItem = ({item}:{item:any}) => {
    const [state, setState] = useState("")

    return (<button className={`mb-3 ${item.stateProps  == "disabled" ?  "text-stone-400" : "text-stone-700"} ${ item.stateProps=="disabled" && "hover:cursor-not-allowed"} flex text-left gap-2`} disabled={item.stateProps=="disabled"? true: false}>
        <div>
            <div className="mb-1 border bg-white p-1.5 rounded">
                {item.icon}
            </div>
            <div className="flex items-center justify-center">
                {item.showLine && <PiLineVerticalLight />}
            </div>
        </div>

        <div className="text-[0.75rem]">
            <p className="font-bold">{item.headText}</p>
            <p className="">{item.descText}</p>
        </div>
    </button>)
}