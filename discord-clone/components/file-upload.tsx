"use client"

import { X } from "lucide-react"
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (value: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                const uploadedUrl = res?.[0]?.url;
                if (uploadedUrl) {
                    onChange(uploadedUrl); // Pass the new value to the parent
                }
                
                console.log("Files: ", res);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
                alert(`ERROR! ${error.message}`);
            }}
        />
    )
    
}
