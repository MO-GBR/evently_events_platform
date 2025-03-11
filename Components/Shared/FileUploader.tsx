'use client'

import { UploadDropzone, UploadButton } from '@/Lib/uploadthing'
import React, { Dispatch, SetStateAction } from 'react'

const FileUploader = ({ setFile, uploadType }: { setFile: Dispatch<SetStateAction<string>>, uploadType: string }) => {
    return (
        <div>
            {
                uploadType === 'zone'
                    ? (
                        <>
                            <UploadDropzone
                                endpoint="imageUploader"
                                className='block max-md:hidden'
                                onClientUploadComplete={(res) => {
                                    console.log("File Url: >>>", res[0].ufsUrl);
                                    setFile(res[0].ufsUrl)
                                }}
                                onUploadError={(error: Error) => {
                                    console.log(`ERROR! ${error.message}`);
                                }}
                            />
                            <UploadButton
                                endpoint="imageUploader"
                                className='hidden max-md:block'
                                onClientUploadComplete={(res) => {
                                    console.log("File Url: >>>", res[0].ufsUrl);
                                    setFile(res[0].ufsUrl)
                                }}
                                onUploadError={(error: Error) => {
                                    console.log(`ERROR! ${error.message}`);
                                }}
                            />
                        </>
                    ) : (
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log("File Url: >>>", res[0].ufsUrl);
                                setFile(res[0].ufsUrl)
                            }}
                            onUploadError={(error: Error) => {
                                console.log(`ERROR! ${error.message}`);
                            }}
                        />
                    )

            }
        </div>
    )
}

export default FileUploader