import { auth } from "@clerk/nextjs/server"

import { db } from "@/lib/db"

export const currentProfile = async ({ req }) => {
    const { userId } = await auth(req);

    if (!userId) {
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile
}