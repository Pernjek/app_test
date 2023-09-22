/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: "numbers.cui4gprfreze.eu-north-1.rds.amazonaws.com",
      port: 3306,
      user: "number_guessing",
      password: "number_guessing",
      database: "numbers",
    },
    secret: "app12341234app",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "/api", // production api
  },
};

module.exports = nextConfig;
