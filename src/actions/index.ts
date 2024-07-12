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

// export async function editSnippet(){
//     console.log('edit snippet called')
// }
