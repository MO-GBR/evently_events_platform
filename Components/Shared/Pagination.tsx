"use client";

import { formUrlQuery } from '@/Lib/Utils/formQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

type PaginationProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter();
    const searcParams = useSearchParams();

    const onClickHere = (btnType: string) => {
        const pageValue = btnType === "next"
            ? Number(page) + 1
            : Number(page) - 1;
        
        const newUrl = formUrlQuery({
            params: searcParams.toString(),
            key: urlParamName || "page",
            value: pageValue.toString()
        });

        router.push(newUrl, {scroll: false});
    };
  return (
    <div className='flexCenter border-2 border-primary-500 rounded-full'>
        <button
            className='myBtn myBtnColored w-[100px]'
            onClick={() => onClickHere("prev")}
            disabled={Number(page) <= 1}
        >Previous</button>
        <p className='p-1 rounded-full flexCenter w-[50px] h-[50px] bg-violet-600 text-white text-center font-bold mx-5'>{page}</p>
        <button
            className='myBtn myBtnColored w-[100px]'
            onClick={() => onClickHere("next")}
            disabled={Number(page) >= totalPages}
        >Next</button>
    </div>
  )
}

export default Pagination