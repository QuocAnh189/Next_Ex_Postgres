'use client';

import { useState } from 'react';

//components
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreateModal from './Create';
import UpdateModal from './Update';
import Delete from './Delete';
import Image from 'next/image';

//call api
import { changeDisLikeEx } from 'src/app/actions';

//redux
import { useAppDispatch } from 'src/redux/hooks';
import { updateBlog } from 'src/redux/slices/blogSlice';
import { InitBlog } from 'src/styles/blog';
import avatar from '../../public';

interface IProps {
    blogs: IBlog[];
}

const AppTable: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const { blogs } = props;

    const [blog, setBlog] = useState<IBlog>(InitBlog);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const handleOpenModalEdit = (blog: IBlog) => {
        setBlog(blog);
        setShowModalUpdate(true);
    };

    const handleChangeDislike = async (blog: IBlog) => {
        const newBlog: IBlog = { ...blog, dislike: !blog.dislike };
        const data = await changeDisLikeEx(blog._id, !blog.dislike);
        if (data === 'success') {
            console.log(newBlog);
            dispatch(updateBlog(newBlog));
        }
    };

    return (
        <>
            <div className='mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Ex Blogs</h3>
                <Button variant='secondary' onClick={() => setShowModalCreate(true)}>
                    Add New
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Id</th>
                        <th>Name</th>
                        <th className='max-w-[200px]'>Description</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((blog: IBlog, index) => {
                        return (
                            <tr key={blog?._id}>
                                <td className='text-center'>{index}</td>
                                <td>
                                    <div className='flex items-center h-full gap-4'>
                                        <Image
                                            src={blog.avatar! || avatar}
                                            alt=''
                                            className='rounded-full object-cover w-[40px] h-[40px]'
                                            width={40}
                                            height={40}
                                        />
                                        {blog?.name}
                                    </div>
                                </td>
                                <td className='max-w-[200px] text-justify'>{blog?.description}</td>
                                <td className='text-center'>{blog?.age}</td>
                                <td className='text-center'>
                                    <Button onClick={() => handleChangeDislike(blog)} variant={blog.dislike ? 'primary' : 'success'} className='w-[100px]'>
                                        {blog.dislike ? 'UnDislike' : 'DisLike'}
                                    </Button>
                                    <Button
                                        variant='warning'
                                        className='mx-3'
                                        onClick={() => {
                                            handleOpenModalEdit(blog);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => {
                                            setBlog(blog);
                                            setShowModalDelete(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />

            <UpdateModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} blog={blog!} setBlog={setBlog} />

            <Delete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} blog={blog!} />
        </>
    );
};

export default AppTable;
