'use strict'
const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    get:(req,res)=>{
        let sql = "SELECT * from category"
        db.query(sql,(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse)
        })
    },
    detail:(req,res)=>{
        let sql ='SELECT * from category where CategoryID =?'
        db.query(sql,[req.params.CategoryID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse[0])
        })
    },
    update:(req,res)=>{
        let data = req.body;
        let CategoryID = req.params.CategoryID;
        let sql = 'UPDATE category SET ? WHERE CategoryID = ?'
        db.query(sql, [data, CategoryID], (err,response) => {
            if (err) {
                res.json({errormessage: err})
            }
                res.json({message: 'Update success!'})
        })
    },
    insert:(req,res)=>{
        let data = req.body;        
        let sql = 'INSERT INTO category SET ?'        
        db.query(sql, [data], (err, result, fields) => { 
            if (err) {
                throw err
            }  
            console.log("result ====>" + result); 
            //console.log("fields ====>" + fields);     
            res.json({message: 'Insert success and id = ' + result.insertId})       
        })
    },
    delete: (req,res)=>{
        let sql ='DELETE from category where CategoryID =?'
        db.query(sql,[req.params.CategoryID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json({message:'Delete success!'})
        })
    }
}