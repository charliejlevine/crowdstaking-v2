interface Boost {
    iconName: string;
    boosterName: string;
    verified: boolean;
    boostAmmount: string;
    boostAmmountSubtitle: string;
    description: string;
    expiration: Date;
    expirationUrgent: boolean;
    progress: BoostProgress[];
    requirements: BoostRequirement[];
}

interface BoostProgress {
    name: string;
    subtitle: string;
    achieved: boolean;
}

interface BoostRequirement {
    name: string;
    achieved: boolean;
}

const boostData: Boost[] = [
    {
        iconName: "star",
        boosterName: "Super Boost",
        verified: true,
        boostAmmount: "10%",
        boostAmmountSubtitle: "Extra Power",
        description: "Gives you a 10% increase in strength.",
        expiration: new Date("2025-12-31"), // Example future expiration date
        expirationUrgent: false,
        progress: [
            {
                name: "First Milestone",
                subtitle: "Complete 5 tasks",
                achieved: true
            },
            {
                name: "Final Goal",
                subtitle: "Reach 100 points",
                achieved: false
            }
        ],
        requirements: [
            {
                name: "Sign up for membership",
                achieved: true
            },
            {
                name: "Complete onboarding tutorial",
                achieved: false
            }
        ]
    },
    {
        iconName: "flame",
        boosterName: "Fire Boost",
        verified: false,
        boostAmmount: "5%",
        boostAmmountSubtitle: "Burning Passion",
        description: "Gives you a 5% speed boost.",
        expiration: new Date("2025-06-30"),
        expirationUrgent: true, // Expiring soon
        progress: [
            {
                name: "Warm-up",
                subtitle: "Run 1km",
                achieved: true
            },
            {
                name: "Sprint Finish",
                subtitle: "Run 5km",
                achieved: false
            }
        ],
        requirements: [
            {
                name: "Join a running group",
                achieved: false
            }
        ]
    }
];
export { boostData };