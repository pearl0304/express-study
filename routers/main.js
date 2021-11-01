import {Router} from "express";
import user from "../routers/user_router.js"
import admin from "../routers/admin_router.js"
const router = Router();


router.get('/',(_,res)=>{res.render('index')})
router.use('/user',user);
router.use('/admin',admin);

export default router