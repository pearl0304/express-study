import multer from "multer"
const upload = multer({dest:'uploads/'})

const users = {
    1:{
        user_id : 'kylie',
        nick : 'hello_kylie',
        profileImageKey : undefined
    },
    2:{
        user_id : 'joy',
        nick: 'sunshine_joy',
        profileImageKey : undefined
    },
    3:{
        user_id : 'kate',
        nick : 'pretty_kate',
        profileImageKey : undefined
    }
}

export const userController = {

    getUsers: (req,res)=>{
        res.send('User list')
    },

    getParam:async(req,res,next,value)=>{
        try{
            const user =users[value]
            // console.log(user)
            if(!user){
                const err = new Error()
                err.statusCode = 404
                throw err
            }
            req.user=user
            next();
        }catch(e){
            next(e)
        }
    },

    getUserId: (req,res)=>{
        const resMimeType = req.accepts(['json','html'])

        if(resMimeType === 'json'){
            res.send(req.user)
        }else if(resMimeType === 'html'){
            res.render('user_feed',{
                user_no : req.params.id,
                user_id : req.user.user_id,
                nick: req.user.nick,
                profileImageURL : `/uploads/${req.user.profileImageKey}`             
            })
        }        
    },
    
    postProfile:(req, res)=>{
        const { user } = req
        const {filename} = req.file 
        user.profileImageKey = filename
        res.send(`user profile image upload : ${filename}`)
    },

    post: (req,res)=>{
        res.send('post 방식')}
}

