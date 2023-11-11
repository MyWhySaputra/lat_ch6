const express = require('express')
const router = express.Router()
const storage = require("../lib/multer");
const { Create, Upload } = require('../controller/user.controller')

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *      - "User"
 *     summary: example to create user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/users/register', Create)

/**
 * @swagger
 * /api/v2/users/upload-image:
 *   post:
 *     tags:
 *      - "User"
 *     summary: example to upload image
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.post('/users/upload-image', storage.image.single("images"), Upload)


module.exports = router