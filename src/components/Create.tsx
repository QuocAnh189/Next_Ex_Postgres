'use client';

import React, { useState } from 'react';

//components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

//id
import { v4 as uuidv4 } from 'uuid';

//redux
import { useAppDispatch } from 'src/redux/hooks';
import { addBlog } from 'src/redux/slices/blogSlice';

//animation
import { motion } from 'framer-motion';
import { createEx } from 'src/app/actions';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}

const CreateModal: React.FC<IProps> = (props: IProps) => {
    const { showModalCreate, setShowModalCreate } = props;

    const dispatch = useAppDispatch();

    const [formBlog, setFormBlog] = useState<IBlog>({
        _id: uuidv4(),
        name: '',
        avatar: '',
        description: '',
        age: 0,
        dislike: false,
        createdat: ''
    });
    const [file, setFile] = useState<string>();

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormBlog({ ...formBlog, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
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
                const newBlog: IBlog = { ...formBlog, avatar: data.secure_url };

                createEx(newBlog);
                return newBlog;
            })
            .then((res) => {
                dispatch(addBlog(res));
                setShowModalCreate(false);
                toast.success('Create succeed');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const dropIn = {
        hidden: {
            y: '-100vh'
        },
        visible: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25
            }
        },
        exit: {
            y: '100vh',
            opacity: 0
        }
    };

    return (
        <motion.div variants={dropIn}>
            <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New A Ex Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type='text' placeholder='Enter Name...' onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control name='avatar' type='file' placeholder='Enter Name...' onChange={(e: any) => setFile(e.target?.files[0])} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control name='age' type='text' placeholder='Enter Age...' onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' as='textarea' rows={3} onChange={handleChangeForm} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModalCreate(false)}>
                        Close
                    </Button>
                    {/* {isLoading ? (
                        <Spinner animation='border' />
                    ) : (
                        <Button variant='primary' onClick={handleSave}>
                            Save
                        </Button>
                    )} */}
                    <Button variant='primary' onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </motion.div>
    );
};

export default CreateModal;
