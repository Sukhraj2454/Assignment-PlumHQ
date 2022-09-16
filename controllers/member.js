const validator = require('validator')


const getMember = (data) => {

    const obj = {
        "EmployeeId": data[0],
        "FirstName": data[1],
        "MiddleName": data[2],
        "LastName": data[3],
        "Email": data[4],
        "DOB": data[5],
        "Gender": data[6],
        "org_name": data[7]
    }

    if (!validator.isEmail(obj['Email']))
        throw new Error("Invalid Email Address.")

    if (!validator.isAlpha(obj['FirstName']))
        throw new Error("Invalid First Name.")

    if (obj['MiddleName'] != "" && !validator.isAlpha(obj['MiddleName']))
        throw new Error("Invalid Middle Name.")

    if (!validator.isAlpha(obj['LastName']))
        throw new Error("Invalid Last Name.")

    if (!validator.isInt(obj['EmployeeId']))
        throw new Error("Invalid Employee Id.")

    if (!validator.isDate(obj['DOB'], format = 'DD/MM/YYYY'))
        throw new Error("Invalid DOB. Must be of Format: DD/MM/YYYY.")

    if (!validator.isIn(obj['Gender'], ['Male', 'Female', 'Other']))
        throw new Error("Invalid Gender.")

    return obj
}

module.exports = getMember;