'use client';
import { useState } from 'react';

//components
import CartBlog from 'src/components/CardBlog';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//redux
import { useAppSelector } from 'src/redux/hooks';

//filter
import filter from 'lodash.filter';

const Favorite = () => {
    const blogs = useAppSelector((state) => state.blog.blogs);
    const [exs, setExs] = useState<IBlog[]>(blogs);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const contains = ({ name }: { name: any }, query: string) => {
            if (name.toLowerCase().includes(query)) {
                return true;
            }
            return false;
        };

        const value = e.target.value;
        const formatQuery = value.toLowerCase();
        const filterData = filter(blogs, (category) => {
            return contains(category, formatQuery);
        });
        setExs(filterData);
    };

    return (
        <div className='relative flex flex-1 py-5 flex-row flex-wrap gap-4'>
            <div className='absolute right-0 top-0'>
                <Form className='d-flex'>
                    <Form.Control onChange={(e) => handleChange(e)} type='search' placeholder='Search' className='me-2' aria-label='Search' />
                    <Button variant='outline-success'>Search</Button>
                </Form>
            </div>
            {exs?.length && exs?.map((ex: IBlog) => !ex.dislike && <CartBlog key={ex?._id} blog={ex} />)}
        </div>
    );
};

export default Favorite;
