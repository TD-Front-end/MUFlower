'use strict'
const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    get:(req,res)=>{
        let sql = "SELECT FlowerID, FlowerName, Color,imgeFlower, Unit, Price, CategoryName, SupplierName from flower, category, supplier where flower.CategoryID = category.CategoryID and supplier.SupplierID = flower.SupplierID"
        db.query(sql,(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse)
        })
    },
    detail:(req,res)=>{
        let sql ='SELECT * from flower, category, supplier where flower.CategoryID = category.CategoryID and supplier.SupplierID = flower.SupplierID and FlowerID = ?'
        db.query(sql,[req.params.FlowerID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json(reqponse[0])
        })
    },
    update:(req,res)=>{
        let data = req.body;
        let flowerID = req.params.FlowerID;
        let sql = 'UPDATE flower SET ? WHERE FlowerID = ?'
        db.query(sql, [data, flowerID], (err,response) => {
            if (err) {
                res.json({errormessage: err})
            }
                res.json({message: 'Update success!'})
        })
    },
    insert:(req,res)=>{
        let data = req.body;        
        let sql = 'INSERT INTO flower SET ?'        
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
        let sql ='DELETE from flower where FlowerID =?'
        db.query(sql,[req.params.FlowerID],(err,reqponse)=>{
            if(err){
                throw err                
            }
            res.json({message:'Delete success!'})
        })
    }
}