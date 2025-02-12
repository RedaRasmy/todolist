'use client'

import { ReactNode } from 'react'

export default function layout({children}:{
    children:ReactNode
}) {
    return (
        <div
        className='bg-neutral-950 w-full h-[100dvh]
        flex justify-center items-center dark
        '
        >
            {children}
        </div>
    )
}
