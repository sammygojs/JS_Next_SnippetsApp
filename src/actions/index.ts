"use server";
//server actions

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });

    revalidatePath(`/snippets/${id}`)
    redirect(`/snippets/${id}`);
    // console.log(id, code);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });

    revalidatePath('/');
    redirect("/");
}

export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    try {
        //check the user's input and make sure they're valid
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        if (typeof title !== "string" || title.length < 3) {
            return {
                message: "Title must be longer",
            };
        }

        if (typeof code !== "string" || code.length < 10) {
            return {
                message: "Code must be longer",
            };
        }

        //Create a new record in the db
        const snippet = await db.snippet.create({
            data:{
                title,
                code
            }
        })
        // console.log(snippet)

        
        // throw new Error("Failed to save to Database.");
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Something went wrong'
            }
        }
    }
    //redirect back to root root route
    revalidatePath('/');
    redirect("/");
}
