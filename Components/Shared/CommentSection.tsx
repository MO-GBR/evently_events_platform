'use client'

import React from 'react'
import Comment from '@/Components/Shared/Comment';
import Image from 'next/image'
import { IComment, IEvent } from '@/Lib/Database/Models/EventModel';
import { addComment } from '@/Lib/Actions/EventActions';
import { useRouter } from 'next/navigation'



const CommentSection = ({event}: {event: IEvent}) => {
    const ShareComment = addComment.bind(null, event._id);
    const router = useRouter();
    const handleClick = () => {
        setTimeout(() => {
            router.refresh();
        }, 500);
    };
    return (
        <div className='w-full'>
            <p className='h3-bold w-full text-center'>Comments</p>
            <form className='flexBetween m-5 border border-blue-500 w-[90%] rounded-full' action={ShareComment} onSubmit={handleClick}>
                <input type='text' className='border-none outline-none w-[80%] ml-10' placeholder='Share a comment' name="comment" />
                <div>
                    <button className='bg-blue-500 p-3 rounded-full flexCenter w-full' type="submit">
                        <p className='text-white font-bold'>Share</p>
                    </button>
                </div>
            </form>
            {
                event?.comments.length === 0
                    ? (
                        <div className='w-full text-center'>
                            <h1 className='font-bold text-5xl m-5'>There is no comments on this event</h1>
                        </div>
                    ) : (
                        <div className='flexCenter flex-col'>
                            <p className='w-full font-bold text-center'>Comments: {event?.comments.length}</p>
                            {
                                event?.comments.map((comment: IComment, index: number) => (
                                    <Comment key={index} comment={comment} />
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default CommentSection