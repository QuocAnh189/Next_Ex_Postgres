//routes
import Link from 'next/link';
import React from 'react';

//components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <Navbar expand='lg' className='bg-body-tertiary'>
            <Container fluid>
                <Navbar.Brand href='/'>Ex Store</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto my-2 my-lg-0 flex flex-row gap-4' style={{ maxHeight: '100px' }} navbarScroll>
                        <Link href='/page/home' className='no-underline'>
                            Home
                        </Link>
                        <Link href='/page/favorite' className='no-underline'>
                            My favorite
                        </Link>
                        <Link href='/page/dislike' className='no-underline'>
                            Dislike
                        </Link>
                        <Link href='/page/list' className='no-underline'>
                            CheckList
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
