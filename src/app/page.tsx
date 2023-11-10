//images
import Image from 'next/image';
import avatar from './images';

//routes
import Link from 'next/link';

//components
import Navbar from 'src/components/Navbar';

const Home = async () => {
    return (
        <div className='mx-auto'>
            <section className='w-full h-full mx-auto my-auto flex flex-col items-center'>
                <Navbar />
                <Image
                    className='w-[300px] h-[300px] border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8 object-cover'
                    src={avatar}
                    alt='Dave Gray'
                    priority={true}
                />
                <p className='mb-12 text-3xl text-center dark:text-white'>
                    Hello and Welcome 👋&nbsp;
                    <span className='whitespace-nowrap'>
                        I am
                        <span className='font-bold'> Anh Quốc</span>.
                    </span>
                </p>
                <p className='text-4xl text-center'>Have a good day.This is Blog about my Ex</p>

                <Link
                    href='/page/home'
                    className='w-[10em] flex flex-row gap-2 no-underline text-white alight-center px-6 py-2 bg-slate-600 font-black items-center justify-center rounded-xl text-center'
                >
                    Get Started
                </Link>
            </section>
        </div>
    );
};

export default Home;
