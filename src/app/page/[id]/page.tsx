'use client';
import { useState } from 'react';

//components
import Card from 'react-bootstrap/Card';

//call api
import { getEx } from 'src/app/actions';

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
    const [ex, setEx] = useState<IBlog>();
    getEx(params.id).then((res) => {
        setEx(res[0]);
    });

    return (
        ex && (
            <Card className='text-center'>
                <Card.Title>{ex?.name}</Card.Title>
                <Card.Img variant='top' src={ex?.avatar} alt='' className='h-[500px] object-cover' />
                <Card.Body>
                    <Card.Text>{ex?.description}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>Age: {ex?.age}</Card.Footer>
            </Card>
        )
    );
};

export default ViewDetailBlog;
