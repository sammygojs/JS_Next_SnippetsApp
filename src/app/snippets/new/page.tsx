import React from 'react'

import { db } from '@/db'
import { redirect } from 'next/navigation';

export default function SnippetCreatePage() {
    async function createSnippet(formData: FormData){
        //needs to be a server action
        'use server';

        //check the user's input and make sure they're valid
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        //Create a new record in the db
        const snippet = await db.snippet.create({
            data:{
                title,
                code
            }
        })
        console.log(snippet)

        //redirect back to root root route
        redirect('/');
    }

    // notFound();


    return (
        <form action={createSnippet}>
            <h3 className='font-bold m-3'>Create a Snippet</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                <label className='w-12' htmlFor="tit;e">
                        Title
                    </label>

                    <textarea
                        name="title"
                        className='border rounded p-2 w-full'
                        id="title"
                    />

                    <label className='w-12' htmlFor="code">
                        Code
                    </label>

                    <textarea
                        name="code"
                        className='border rounded p-2 w-full'
                        id="code"
                    />
                    <button type='submit' className='rounded p-2 bg-blue-200'>
                        Create
                    </button>
                </div>
            </div>
        </form>
    )
}
