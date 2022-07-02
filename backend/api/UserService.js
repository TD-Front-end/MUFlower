const util = require('util')
const mysql = require('mysql')
const db = require('./db')

module.exports = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO user(UserID, FirstName,LastName, Email, PassWord) values(?,?,?,?,?)',
            [
                data.UserID,
                data.FirstName,
                data.LastName,
                data.Email,
                data.PassWord
            ],

            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            }
        );
    },
    getUserByEmailr: (data, callback) => {
        db.query(
            'select * from user where Email=?',
            [data],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }

};