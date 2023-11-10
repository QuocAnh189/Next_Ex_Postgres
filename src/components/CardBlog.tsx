'use client';

//routes
import Link from 'next/link';
import Image from 'next/image';

//components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//react-icon
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import avatar from '../../public';

interface CartBlogProp {
    blog: IBlog;
}

const CartBlog: React.FC<CartBlogProp> = (props: CartBlogProp) => {
    const { blog } = props;

    return (
        <Card className='w-[18em] px-3 flex flex-col'>
            <Card.Header>Ex: {blog?.name}</Card.Header>
            <Image src={blog.avatar || avatar} alt='' className='object-cover h-[200px]' width={250} height={200} />
            <Card.Body className='flex flex-col justify-between'>
                <Card.Title>Age: {blog?.age}</Card.Title>
                <Card.Text className='h-14rem text-justify overflow-hidden overflow-ellipsis'>{blog?.description}</Card.Text>
                <div className='flex w-full justify-center items-center'>
                    <Button variant='primary' className='flex-2'>
                        <Link className='btn btn-primary' href={`/page/${blog?._id}`}>
                            View Detail
                        </Link>
                    </Button>
                    {blog.dislike ? <AiOutlineDislike className='h-10 flex-1' /> : <AiOutlineLike className='h-10 flex-1' />}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CartBlog;
