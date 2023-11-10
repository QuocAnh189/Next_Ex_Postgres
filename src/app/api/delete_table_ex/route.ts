import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';


async function GET() {
    try {
        await sql`DROP TABLE aaa`;
        // console.log('delete');
        // await sql`DELETE FROM aaa`;
        revalidatePath('/page/home');
        return NextResponse.json({ message: 'Delete Successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
