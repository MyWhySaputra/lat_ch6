const { HashPassword, ComparePassword } = require('../helper/hash_pass_helper')
const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

async function Create(req, res) {

    const { name, email, password, address } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name,
        email,
        password: hashPass,
        address
    }

    const emailUser = await prisma.user.findUnique({
        where: {email: payload.email},
    });

    if (emailUser) {
        let resp = ResponseTemplate(null, 'Email already exist', null, 404)
        res.json(resp)
        return
    }

    try {
        
        await prisma.user.create({
            data: payload,
        });

        const userView = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                address: true
            },
        });

        let resp = ResponseTemplate(userView, 'success', null, 200)
        res.json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return

    }
}

async function Upload(req, res) {

    
    
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`



    return res.status(200).json({
        status: true,
        message: 'success',
        data: {
            imageUrl
        }
    })
}

module.exports = {
    Create,
    Upload
}