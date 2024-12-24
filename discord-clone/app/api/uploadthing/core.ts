import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async ({ req }) => {
    const { userId } = await auth(req);
    if (!userId) throw new Error("Unauthorized")
    return { userId: userId};
}

export const ourFileRouter = {
    serverImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        },
    })
        .middleware(async ({req}) => handleAuth(req))
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf", ]) 
        .middleware(async ({req}) => handleAuth(req))
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
