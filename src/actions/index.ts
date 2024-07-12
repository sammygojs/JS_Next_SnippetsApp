'use server'
//server actions

import {db} from '@/db'
import { redirect } from 'next/navigation'

export async function editSnippet(id: number, code: string){
    await db.snippet.update({
        where: {id},
        data: {code}
    })

    redirect(`/snippets/${id}`)
    // console.log(id, code);
}

export async function deleteSnippet(id: number){
   await db.snippet.delete({
    where:{id}
   } )

   redirect('/')
}
