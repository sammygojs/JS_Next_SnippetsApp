import React from 'react'
import {db} from '@/app/db'
import { Snippet } from '@prisma/client';
import { notFound } from 'next/navigation';

interface SnippetShowPageProps{
    params: {
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    await new Promise((r)=> setTimeout(r, 2000));


    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}
    });
    
    if(!snippet){
        return notFound();
    }

    // console.log(props);
    return (
        <div>
            <div className='flex m-4 justify-between items-center'>
                <h1 className='text-xl font-bold'>{snippet.title}</h1>
                <div>
                    <button className='p-2 border rounded'>Edit</button>
                    <button className='p-2 border rounded'>Delete</button>
                </div>
            </div>
            <pre className='p-3 border rounded bg-gray-200 border-gray-200 text-black'>
                <code>{snippet.code}</code>
            </pre>
        </div>
    )
}
