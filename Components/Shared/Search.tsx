"use client"

import { formUrlQuery, removeKeysFromQurey } from '@/Lib/Utils/formQuery';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const Search = () => {
    const [ query, setQuery ] = useState("");

    const searchParams = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            let newUrl = '';

            if(query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "query",
                    value: query
                })
            } else {
                newUrl = removeKeysFromQurey({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }

            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, searchParams, router]);
    return (
        <div className='flexCenter min-h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2 mt-2 m-5'>
            <Image src="/assets/icons/search.svg" alt='search' width={24} height={24} />
            <input
                type='text'
                placeholder='Search .....'
                onChange={(e) => setQuery(e.target.value)}
                className='p-regular-16 w-full m-3 p-2 border-none outline-none bg-transparent'
            />
        </div>
    )
}

export default Search