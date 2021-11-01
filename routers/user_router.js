import {Router} from "express"
import {userController} from "../controllers/user_ctrl.js"

const router = Router()

router.get('/',userController.getUsers)
router.param('id',userController.getParam)
router.get('/:id',userController.getUserId)
router.post('/:id/profile',userController.postProfile)

router.post('/',userController.post)


export default router