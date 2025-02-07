const express = require('express')
const client= require('../../config/whatsapp')
const path = require('path');

const router = express.Router()
const fs = require('fs');
  
router.get('/status', async(req,res)=>{
    console.log('status')
    const status=await client.getState()
    if(status!='CONNECTED'){
        console.log('not connected')
        return res.json({
          status

        })
    }
    const clientInfo= client.info
    const {pushname, wid,platform}=clientInfo
    return res.json({
      status,
      pushname,
      clientId:wid._serialized,
      platform
    })
})
  
router.get('/logout', async(req,res)=> {
  try { 
    const status=await client.getState();
    console.log(status);
    await client.logout();
    await client.initialize();
    return res.json({
      status:'successfully logged out',
      online: status
    })
  } catch(err) {
    res.json({ 
      status  : "error",
      message : err 
    });
    console.log(err);
  }
})

module.exports= router