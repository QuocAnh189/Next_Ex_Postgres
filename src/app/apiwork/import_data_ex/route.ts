// 'use server';

// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { revalidatePath } from 'next/cache';

// export async function GET() {
//     try {
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699412622/334051984_3538504303032537_58771249030900257_n_lz9ove.jpg','Trương Nguyễn Phước Trí','Bạn này đến từ Huế mộng mơ nhưng không mơ mộng như tôi nghĩ , thật thất vọng khi có mối tình như thế này',3,false,'4/13/2006');`;
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699412618/287025798_1049025669385295_5966010202439613241_n_vdxd4q.jpg','Lê Văn Duy','Bạn này lúc yêu tôi không yêu cho lắm.',3,true,'4/13/2006');`;
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699412616/180539280_1421472171531304_1122113589738042327_n_dttios.jpg','Nguyễn Minh Nhật','Bạn này ở Đà Nẵng , tôi không thích nhưng người muốn mở rộng mối quan hệ',3,false,'4/13/2006');`;
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699412607/150019589_1360502140983409_7746736301991057729_n_feem7c.jpg','Phan Ngọc Phước','Bạn này giàu tình cảm nhưng nghèo tiền',3,true,'4/13/2006');`;
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699412621/244051929_2995551894023050_3339734551184003087_n_ursnvq.jpg','Nguyễn Văn Quốc Tuấn','Bạn này rất thích nói đạo lí',3,false,'4/13/2006');`;
//         await sql`INSERT INTO iii (_id, avatar, name, description, age, dislike, CreatedAt) VALUES (${uuidv4()},'https://res.cloudinary.com/dfl3qnj7z/image/upload/v1699413453/z9epffilyf4of4d2skql.jpg','Trần Phước Anh Quốc','Hehe , bạn này tuyệt vời thôi rồi !',3,true,'4/13/2006');`;
//         revalidatePath('/page/home');
//         return NextResponse.json({ message: 'Import successfully' }, { status: 200 });
//     } catch (error) {
//         console.log({ error });
//         return `Failed ${JSON.stringify(error)}`;
//     }
// }
