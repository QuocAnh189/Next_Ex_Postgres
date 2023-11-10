/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            'scontent.fsgn2-8.fna.fbcdn.net',
            'platform-lookaside.fbsbx.com',
            'scontent.fsgn21-1.fna.fbcdn.net',
            'images.unsplash.com'
        ]
    },
    typescript:{
        ignoreBuildErrors:true
    }
};

module.exports = nextConfig;
