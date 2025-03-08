import Button from '@/Components/UI/Button'
import React from 'react'

const Profile = () => {
    return (
        <>
            <section className='bg-violet-300'>
                <div className='wrapper flexCenter'>
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <Button title='Explore More Events' href='#' />
                </div>
            </section>
        </>
    )
}

export default Profile