"use client"

import React from 'react'
import { formUrlQuery, removeKeysFromQurey } from '@/Lib/Utils/formQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/Constants';

const CategoryFilter = () => {

    const searchParams = useSearchParams();
    
    const router = useRouter();

    const onSelectCategory = (category: string) => {
        let newUrl = '';
  
        if(category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQurey({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }
  
        router.push(newUrl, { scroll: false });
    }
    return (
        <div className='flexCenter min-h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2 mt-2 m-5'>
            <p className='font-bold'>Filter By Category:</p>
            <select onChange={(e) => onSelectCategory(e.target.value)} className='w-[70%] border-none outline-none m-3 p-2 rounded-full cursor-pointer'>
                <option>All</option>
                {
                    categories.map((category, index) => (
                        <option key={index}>{category.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default CategoryFilter