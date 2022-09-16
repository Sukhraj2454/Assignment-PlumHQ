const express = require("express")
const multer = require('multer')

const orgController = require("../controllers/orgController")


const upload = multer({ dest: 'tmp/csv/' })
const orgRouter = express.Router()


orgRouter.post('/', orgController.addOrg)
orgRouter.post('/:org/members/upload', upload.single('file'), orgController.upload)
orgRouter.get('/', orgController.getPaginatedData)

module.exports = { orgRouter }