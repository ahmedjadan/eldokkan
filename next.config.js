module.exports = {
    images : {
        domains: ['res.cloudinary.com']
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
      },
}