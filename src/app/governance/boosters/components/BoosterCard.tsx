import { ReactElement } from "react";
import { XDAIIcon } from "@/app/core/components/Icons/TokenIcons"; // Temporary for testing purposes
import Button from "@/app/core/components/Button/Button"

export function BoosterCard({
    iconName,
    boosterName,
    verified,
    boostAmmount,
    boostAmmountSubtitle,
    description,
    expiration,
    experationUrgent = false,
}:{
    iconName: string;
    boosterName: string;
    verified: boolean;
    boostAmmount: string;
    boostAmmountSubtitle: string;
    description: string;
    expiration: number | undefined;
    experationUrgent: boolean;
}) {
    return(
        <div>
            <span>{boosterName}</span>
            {getIcon(iconName)}
            {verified ? "Yay, you did it" : "DO IT FOR POWER"}
            <div>
                <span>{boostAmmount}</span>
                <span>{boostAmmountSubtitle}</span>
            </div>
            <p>{description}</p>
            {viewButton(verified)}
            {expiry(expiration, experationUrgent)}
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