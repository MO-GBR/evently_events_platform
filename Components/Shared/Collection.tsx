import { IEvent } from '@/Lib/Database/Models/EventModel'
import React from 'react'
import Card from './Card';
import Pagination from './Pagination';
import Ticket from './Ticket';
import { getOneEvent } from '@/Lib/Actions/EventActions';


type CollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType: string
};

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    urlParamName,
    collectionType
}: CollectionProps) => {
    return (
        <>
            {
                collectionType === 'cards' && (
                    data.length > 0 ? (
                        <div className='flex flex-col items-center gap-10'>
                            <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                                {
                                    data.map((event, index) => (
                                        <li key={index} className="flex justify-center">
                                            <Card event={event} />
                                        </li>
                                    ))
                                }
                            </ul>
                            {
                                totalPages > 1 && (
                                    <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                                )
                            }
                        </div>
                    ) : (
                        <div className='flexCenter wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                            <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                            <p className="p-regular-14">{emptyStateSubtext}</p>
                        </div>
                    )
                )
            }
            {
                collectionType === 'tickets' && (
                    data.length > 0 ? (
                        <div className='flex flex-col items-center gap-10'>
                            <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                                {
                                    data.map((event, index) => (
                                        <li key={index} className="flex justify-center">
                                            <Ticket event={event} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ) : (
                        <div className='flexCenter wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                            <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                            <p className="p-regular-14">{emptyStateSubtext}</p>
                        </div>
                    )
                )
            }
        </>
    )
}

export default Collection