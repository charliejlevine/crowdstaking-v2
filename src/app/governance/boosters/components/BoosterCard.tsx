import { ReactElement } from "react";
import { XDAIIcon } from "@/app/core/components/Icons/TokenIcons"; // Temporary for testing purposes
import Button from "@/app/core/components/Button/Button"
import Tooltip from "@/app/core/components/Tooltip";

export function BoosterCard({
    iconName,
    boosterName,
    verified,
    boostAmmount,
    boostAmmountSubtitle,
    description,
    expiration,
    expirationUrgent = false,
}:{
    iconName: string;
    boosterName: string;
    verified: boolean;
    boostAmmount: string;
    boostAmmountSubtitle: string;
    description: string;
    expiration: number | undefined;
    expirationUrgent: boolean;
}) {
    return(
        <div className="
            w-full flex flex-col justify-center items-center justify-between
            rounded-[15px] p-[20px]
            border border-breadgray-light-grey dark:border-breadgray-burnt 
            bg-breadgray-ultra-white dark:bg-breadgray-grey200
            text-breadgray-rye
            dark:text-breadgray-grey
            ">
            <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                    {getIcon(iconName)}
                    <span className="uppercase text-[20px] shrink-[5]">{boosterName}</span>
                </div>
                <div className="bg-red-500 ml-auto ml-[12px]">
                    {verified ? "Verified" : "Unverified" }
                </div>
            </div>
            
            {boostPowerSection(boostAmmount, boostAmmountSubtitle)}
            <p>{description}</p>
            {viewButton(verified)}
            {expiry(expiration, expirationUrgent)}
        </div>
    )
}

function boostPowerSection(ammount: string, subtitle: string): ReactElement {
    return (
        <div className="
            h-[145px] w-full relative
            flex flex-col justify-center items-center 
            rounded-lg 
            bg-white dark:bg-breadgray-pitchblack
            p-4 text-center
            ">
            <div className="
                absolute inset-0 
                bg-[radial-gradient(50%_90%_at_50%_110%,rgba(232,115,211,0.3)_0%,rgba(64,38,56,0)_100%)]
                ">
                {/* This element simply adds the gradient. It has opacity and layers ontop of the solid background */}
            </div>
            <p className="font-bold text-[30px] bread-pink-text-gradient">{ammount}</p>
            <div className="flex items-center gap-2">
                <p className="block text-[16px] pb-[5px]">{subtitle}</p>
                <Tooltip>YO, wassup dog</Tooltip>
            </div>
        </div>
    )
}

function getIcon(iconName: string): ReactElement {
    return <XDAIIcon />
}

function viewButton(verified: boolean): ReactElement {
    if (verified) {
        return <Button onClick={() => alert("Oh YEAH! VIP")}>Verified View</Button>
    } else {
        return <Button onClick={() => alert("Oh you're interested are ya?")}>View</Button>
    }
}

function expiry(
    expiration: number | undefined, 
    expirationUrgent: boolean
): ReactElement | undefined {
    if (!expiration) {
        return undefined
    }
    return <span>{expiration} days until expiration {expirationUrgent ? "URGENT" : ""}</span>
}