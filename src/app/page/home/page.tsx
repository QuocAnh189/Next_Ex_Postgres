'use client';
import { useEffect, useState } from 'react';

//call api
import { getExs } from 'src/app/actions';

//components
import CartBlog from 'src/components/CardBlog';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//redux
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchBlogs } from 'src/redux/slices/blogSlice';

//filter
import filter from 'lodash.filter';

const Home = () => {
    const dispatch = useAppDispatch();
    const [exs, setExs] = useState<IBlog[]>([]);

    useEffect(() => {
        getExs()
            .then((res) => {
                setExs(res);
                dispatch(fetchBlogs(res));
            })
            .catch(() => {
                setExs([]);
                dispatch(fetchBlogs([]));
            });
    }, [dispatch]);

    const blogs = useAppSelector((state) => state.blog.blogs);
    useEffect(() => {
        setExs(blogs);
    }, [blogs]);

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
        <div className='relative flex self-center py-5 flex-row flex-wrap gap-4 w-full'>
            <div className='absolute right-0 top-0'>
                <Form className='d-flex'>
                    <Form.Control onChange={(e) => handleChange(e)} type='search' placeholder='Search' className='me-2' aria-label='Search' />
                    <Button variant='outline-success'>Search</Button>
                </Form>
            </div>
            {exs.length !== 0 ? exs.map((blog: IBlog) => <CartBlog key={blog?._id} blog={blog} />) : 'No result'}
        </div>
    );
};

export default Home;
