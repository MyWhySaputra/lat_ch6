const qr = require('node-qr-image')
const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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

    var qr_png = qr.image(amount, { type: "png" });
    qr_png.pipe(
        require("fs").createWriteStream(
            `./public/qr/${message.toLowerCase()}.png`
        )
    );

    const payload = {
        user_id: Number(req.user.id),
        amount,
        payment_link: qr_png
    }

    try {
        
        await prisma.transaction.create({
            data: payload
        });

        const transactionView = await prisma.user.findUnique({
            where: {
                user_id: payload.user_id
            },
            select: {
                user_id: true,
                amount: true,
                payment_link: true,
                is_paid: true
            },
        });

        let resp = ResponseTemplate(transactionView, 'success', null, 200)
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