'use client';
import { useState } from 'react';

//component
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { updateEx } from 'src/app/actions';

//redux
import { useAppDispatch } from 'src/redux/hooks';
import { updateBlog } from 'src/redux/slices/blogSlice';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blog: IBlog;
    setBlog: (value: IBlog) => void;
}

const UpdateModal: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState<string>();

    const handleUpdate = async () => {
        if (!file) {
            const data: any = await updateEx(blog);
            if (data === 'success') {
                dispatch(updateBlog(blog));
                console.log(blog);
                toast.success('Update succeed');
                setShowModalUpdate(false);
            }
        } else {
            const formData = new FormData();
            formData.append('file', file!);
            formData.append('upload_preset', 'imagequizapp');
            formData.append('cloud_name', 'dfl3qnj7z');
            fetch(`https://api.cloudinary.com/v1_1/dfl3qnj7z/image/upload`, {
                method: 'post',
                body: formData
            })
                .then((response) => response.json())
                .then((data) => {
                    const newBlog: IBlog = { ...blog, avatar: data.secure_url };

                    updateEx(newBlog);
                    return newBlog;
                })
                .then((res) => {
                    dispatch(updateBlog(res));
                    setShowModalUpdate(false);
                    toast.success('Create succeed');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
    };

    return (
        <>
            <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New A Blogs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={blog?.name} name='name' type='text' placeholder='Enter Name...' onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control name='avatar' type='file' placeholder='Choose file...' onChange={(e: any) => setFile(e.target?.files[0])} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control value={blog?.age} name='age' type='text' placeholder='Enter Age...' onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={blog?.description} name='description' as='textarea' rows={3} onChange={handleChangeForm} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModalUpdate}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateModal;
