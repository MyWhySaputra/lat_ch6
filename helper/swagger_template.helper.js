const swaggerDefinition = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Testing FGA Issue',
            version: '1.0.0',
            description: 'Your API description',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
            {
                url: 'http://localhost:3000',
            },

        ],
    },
    apis: [
        './routes/user.route.js',
        './routes/auth.route.js'
    ],

}

module.exports = swaggerDefinition