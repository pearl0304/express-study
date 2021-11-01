import express from "express";
import router from "./routers/main.js"


class App {
    constructor(){
        this.app =express();

        // setting View Engine
        this.setViewEngine();

        // setting Middleware
        this.setMiddleware();

        // setting Router
        this.getRouting();

        // setting Error Handler
        this.errorHandler();
    }

    setViewEngine(){
        this.app.set('views', 'src/views')
        this.app.set('view engine' , 'pug')
    }

    setMiddleware(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
        this.app.use('/public',express.static('src/public'))
        this.app.use('/uploads',express.static('/uploads'))
    }

    getRouting(){
        this.app.use(router)
    }

    errorHandler(){
        this.app.use((err,req,res,next)=>{
            res.statusCode = err.statusCode || 500
            res.send(err.message)
        })
    }
}

export default App