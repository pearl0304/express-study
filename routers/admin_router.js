import {Router} from "express";
const router = Router();

router.get('/',(_,res)=>{
    res.send('ADMIN :: MAIN PAGE!')
})

router.get('/products',(_,res)=>{
    res.send('get Product')
})

export default router