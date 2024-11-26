const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

const authorizeRoles = require('../middlewares/role')


router.get('/admin',verifyToken,authorizeRoles("admin"),(req,res) => {
    return res.status(200).json({msg:"welcome admin"})
})

router.get('/manager',verifyToken,authorizeRoles("admin","manager"),(req,res) => {
    return res.status(200).json({msg:"welcome manager"})
})

router.get('/user',verifyToken,authorizeRoles("admin","manager","user"),(req,res) => {
    return res.status(200).json({msg:"welcome user"})
})



module.exports = router