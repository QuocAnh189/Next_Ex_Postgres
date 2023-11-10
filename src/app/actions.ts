'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const getEx = async (id: string) => {
    try {
        const data: any = await sql`SELECT * FROM myblog WHERE _id=${id}`;
        const { rows: ex } = data;
        return ex;
    } catch (error) {
        return `Failed ${JSON.stringify(error)}`;
    }
};

export const getExs = async () => {
    try {
        const data: any = await sql`SELECT * FROM myblog`;
        const { rows: exs } = data;
        return exs;
    } catch (error) {
        return `Failed ${JSON.stringify(error)}`;
    }
};

export const createEx = async (formValues: IBlog) => {
    try {
        const result = await sql`INSERT INTO myblog (_id, avatar, name, description, age, CreatedAt) VALUES (${formValues._id},${formValues.avatar},${
            formValues.name
        },${formValues.description},${formValues.age},${JSON.stringify(new Date())});`;
        revalidatePath('/page/home');
        return 'Success';
    } catch (error) {
        console.log({ error });
        return `Failed ${JSON.stringify(error)}`;
    }
};

export const updateEx = async (blog: IBlog) => {
    try {
        await sql`UPDATE myblog SET name=${blog.name},avatar=${blog.avatar},age=${blog.age},description=${blog.description} WHERE _id = ${blog._id}`;
        revalidatePath('/page/home');
        return 'success';
    } catch (error) {
        console.log(error);
        return `Failed ${JSON.stringify(error)}`;
    }
};

export const changeDisLikeEx = async (id: string, dislike: boolean) => {
    try {
        await sql`UPDATE myblog SET dislike = ${dislike} WHERE _id = ${id}`;
        revalidatePath('/page/home');
        return 'success';
    } catch (error) {
        console.log(error);
        return `Failed ${JSON.stringify(error)}`;
    }
};

export const deleteEx = async (id: string) => {
    try {
        await sql`DELETE FROM myblog WHERE _id=${id};`;
        revalidatePath('/page/home');
        return 'Success';
    } catch (error) {
        console.log(error);
        return `Failed ${JSON.stringify(error)}`;
    }
};
