import { generateUploadDropzone, generateUploadButton } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const convertFileToUrl = (file: File) => URL.createObjectURL(file)