
const fs = require('fs')
const csv = require('fast-csv')

const { pool } = require('../connectors/DBConnector')


const Organisations = require('../modals/organisations')
const Member = require('../modals/members')
const getMember = require('./member')
const { type } = require('os')


module.exports.addOrg = async function (req, res, next) {
    const org_name = req.body.organisation
    try {
        await Organisations.create({ org_name: org_name })
        res.status(200).send("Organisation Added.")
    }
    catch (err) {
        next(err)
    }
}

module.exports.upload = function (req, res, next) {

    const org = req.params['org']
    const ErrorRows = []
    let rowNo = 0, rowCt = -1
    csv.parseFile(req.file.path)
        .on('data', async row => {
            row.push(org)
            if (rowNo != 0) {
                try {
                    const value = getMember(row)
                    await Member.create(value)
                        .catch(error => {
                            ErrorRows.push({ 'row': rowNo, 'message': error.message })
                        })
                }
                catch (error) {
                    ErrorRows.push({ 'row': rowNo, 'message': error })
                }
            }
            rowNo = rowNo + 1;
            if (rowNo == rowCt)
                res.send(ErrorRows)
        })
        .on('end', rowCount => {
            fs.unlinkSync(req.file.path);
            rowCt = rowCount
        })
}

module.exports.getPaginatedData = (req, res, next) => {
    const pageNumber = req.query.page
    const size = req.query.size

    Member.findAll({
        offset: pageNumber * size,
        limit: size
    }).then(result =>
        res.send(result))
        .catch(err => next(err))
}