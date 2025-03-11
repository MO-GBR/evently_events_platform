import Button from '@/Components/UI/Button'
import Image from 'next/image'
import React from 'react'
import Search from '@/Components/Shared/Search';
import CategoryFilter from '@/Components/Shared/CategoryFilter';
import { getAllEvents } from '@/Lib/Actions/EventActions';
import Collection from '@/Components/Shared/Collection';
import { PageProps } from '@/Types';

const Home = async ({ searchParams }: PageProps) => {
  const search = await searchParams;
  const page = Number(search?.page) || 1;
  const searchText = (search?.query as string) || "";
  const category = (search?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    limit: 6,
    page,
  });

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold'>Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className='p-regular-20'>Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button title='Explore Now' href='#events' />
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>
        <div className='w-full flexCenter'>
          <Search placeholder='Search .....' />
          <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
          collectionType='cards'
        />
      </section>
    </>
  )
}

export default Home