'use strict'
const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    get:(req,res)=>{
        let sql = "SELECT * from receipt"
        db.query(sql,(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse)
        })
    },
    detail:(req,res)=>{
        let sql ='SELECT * from receipt where ReceiptID =?'
        db.query(sql,[req.params.ReceiptID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse[0])
        })
    },
    insert:(req,res)=>{
        let data = req.body;        
        let sql = 'INSERT INTO receipt SET ?'        
        db.query(sql, [data], (err, result, fields) => { 
            if (err) {
                throw err
            }  
            console.log("result ====>" + result); 
            //console.log("fields ====>" + fields);     
            res.json({message: 'Insert success and id = ' + result.insertId})       
        })
    },
    insertDetail:(req,res)=>{
        var data;
        var sql;
        if (Array.isArray(req.body)) {
            data = req.body.map((item)=>[item.ReceiptID, item.FlowerID, item.Price]);
            sql = 'INSERT INTO receiptdetail value ?' 
        }
        else {
            data = req.body;
            sql = 'INSERT INTO receiptdetail set ?' 
        }        
               
        db.query(sql, [data], (err, result, fields) => { 
            if (err) {
                throw err
            }  
            res.json({message: 'Insert success and id = ' + result.insertId})       
        })
    },
    getReceiptDetaildetail:(req,res)=>{
        let sql ='SELECT * from receiptdetail where ReceiptID =?'
        db.query(sql,[req.params.ReceiptID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse)
        })
    }
}