import { IComment } from '@/Lib/Database/Models/EventModel';
import Image from 'next/image'
import React from 'react'

const Comment = ({ comment }: { comment: IComment }) => {
    return (
        <div className='border border-gray-400 rounded-2xl p-5 m-5 shadow-xl'>
            <div className='flex items-center'>
                <Image src={comment.userAvatar} alt='comment avatar' width={50} height={50} className='img w-[50px] rounded-full' />
                <p className='font-bold m-3'>{comment.userName}</p>
            </div>
            <div>
                {comment.userComment}
            </div>
        </div>
    )
}

export default Comment