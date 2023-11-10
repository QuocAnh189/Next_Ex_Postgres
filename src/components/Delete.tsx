'use client';

//components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteEx } from 'src/app/actions';

//redux
import { useAppDispatch } from 'src/redux/hooks';
import { deleteBlog } from 'src/redux/slices/blogSlice';

interface IProps {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    blog: IBlog;
}

const Example: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const { showModalDelete, setShowModalDelete, blog } = props;

    const handleDelete = async (blogId: string) => {
        const data = await deleteEx(blogId);
        if (data === 'Success') {
            dispatch(deleteBlog(blog));
            setShowModalDelete(false);
            toast.success('Delete succeed');
        }
    };

    return (
        <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{blog?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this blog ?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowModalDelete(false)}>
                    Cancel
                </Button>
                <Button variant='danger' onClick={() => handleDelete(blog?._id!)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Example;
