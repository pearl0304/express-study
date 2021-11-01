import {Router} from "express"
import {userController} from "../controllers/user_ctrl.js"
import multer from "multer"

const router = Router()
const upload = multer({dest:'uploads/'})

router.get('/',userController.getUsers)
router.param('id',userController.getParam)
router.get('/:id',userController.getUserId)
router.post('/:id/profile',upload.single('userProfile'),userController.postProfile)

router.post('/',userController.post)


export default router