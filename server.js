import App from "./app.js";
const app = new App().app;
const PORT = 5000; 

app.listen(PORT,()=>{
    console.log(`Sever Connetion SUCCESS http://localhost:${PORT}`)
})
