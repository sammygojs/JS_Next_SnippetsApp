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
    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}
    });
    
    if(!snippet){
        return notFound();
    }

    // console.log(props);
    return (
        <div>{snippet.title}</div>
    )
}
