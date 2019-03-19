const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var _aud = require('../models/jnsTest/apiUserData');


var dbRepoSqlite = {};





dbRepoSqlite.connectTest = function () {

    //C:\Users\joneb\Documents\GitHub\jns\db\JNS.db

    /*
    if (fs.existsSync('./db/JNS.db')) {
    console.log('true');
    }
    */
    let _db = new sqlite3.Database('./db/JNS.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return
        }
        console.log('Connected to the database.');
    });


    _db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });






}










dbRepoSqlite.getUserData = function (id) {

    return new Promise(function (resolve, reject) {

        let _ad = new _aud();


        let _db = new sqlite3.Database('./db/JNS.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            console.log('Connected to the database.');
        });

        let sql = `SELECT *  FROM "main"."users" where id = ?`;
        let _id = id;


        _db.get(sql, [_id], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // console.log(row);
            _ad.user = row;

            resolve(dbRepoSqlite.getUserCustomerData(_ad, _db));

            // ? console.log(row.id, row.name)
            // : console.log(`No playlist found with the id ${playlistId}`);

        });



    })


}


dbRepoSqlite.getUserCustomerData = function (_ad, _db) {

    return new Promise(function (resolve, reject) {


        let sql_customer = `SELECT *  FROM "main"."customers" where id = ?`;
        let _id = _ad.user.id;

        _db.get(sql_customer, [_id], (err, row) => {
            if (err) {
                throw err;
            }
            // console.log(rows);
            _ad.customer = row;
            resolve(dbRepoSqlite.getUserStatusData(_ad, _db));
        });

   
    })


}




dbRepoSqlite.getUserStatusData = function (_ad, _db) {

    return new Promise(function (resolve, reject) {


        let sql = `SELECT *  FROM "main"."comments"`;

        _db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            // console.log(rows);
            _ad.status = rows;
            resolve(dbRepoSqlite.getUserOrderData(_ad, _db));
        });

     
    })


}




dbRepoSqlite.getUserOrderData = function (_ad, _db) {

    return new Promise(function (resolve, reject) {


        let sql_orders = `SELECT *  FROM "main"."orders"`;

        _db.all(sql_orders, [], (err, rows) => {
            if (err) {
                throw err;
            }
            // console.log(rows);
            _ad.orders = rows;
        });

        _db.close((err) => {
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            console.log('Close the database connection.');
            resolve(_ad);
        });

    })


}




module.exports = dbRepoSqlite;