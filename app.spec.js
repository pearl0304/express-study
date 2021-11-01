import { expect } from "@jest/globals"
import supertest  from "supertest"
import App from "./app.js"
const app = new App().app

const request = supertest(app)
test('retrieve user json', async ()=>{
    const result = await request.get('/user/1').accept('application/json')
    
    expect(result.body).toMatchObject({
        nickname: expect.any(String)
    })
})

test('retrieve user page', async()=>{
    const result = await request.get('/user/1').accept('text/html')

    expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test('update nickname', async()=>{
    const newNickname ='newNickname'
    const res = await request.post('/user/1/nickname').send({nickname : newNickname})
    expect(res.status).toBe(200)

    const userResult = request.get('/user/1/nickname').accept('application/json')
    expect((await userResult).status).toBe(200)
    expect((await userResult).body).toMatchObject({
        nickname: newNickname
    })
})