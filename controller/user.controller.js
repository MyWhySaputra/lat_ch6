const { HashPassword, ComparePassword } = require('../helper/hash_pass_helper')
const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

async function UploadPicture(req, res) {
    const stringFile = req.file.buffer.toString("base64")

    const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
    });

    const payload = {
        profile_picture: uploadFile.url
    }

    try {
        
        await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: payload
        })

        const userView = await prisma.user.findUnique({
            where: {
                id: Number(req.user.id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile_picture: true,
                address: true
            },
        });

        let resp = ResponseTemplate(userView, 'success', null, 200)
        res.status(200).json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return

    }
}

async function CreateTransaction(req, res) {
    const { amount } = req.body

    const payload = {
        user_id: Number(req.user.id),
        amount,
        
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
            data: payload
        });

        const userView = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                name: true,
                email: true
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

module.exports = {
    UploadPicture,
    CreateTransaction
}