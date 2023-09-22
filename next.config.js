/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'sql.freedb.tech',
            port: 3306,
            user: 'freedb_number_guessing',
            password: '#b!?2WRs*%4fCNG',
            database: 'freedb_number_guessing'
        },
        secret: 'app12341234app'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig