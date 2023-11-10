'use client';

import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

//components
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from 'src/components/Header';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <div className='flex flex-1 flex-col justify-between'>
                    <Header />
                    <Container>{children}</Container>
                    <ToastContainer
                        position='bottom-center'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                    />
                </div>
            </body>
        </html>
    );
}
