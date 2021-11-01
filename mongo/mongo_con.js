import { MongoClient} from "mongodb"
import dotenv from "dotenv"
dotenv.config();


const uri = `mongodb+srv://kylie:${process.env.MONGO_PASSWORD}@cluster0.sehaq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



main()

async function main(){
    await client.connect()

    // create document
    const users = client.db("test").collection("users");
    const cities = client.db("test").collection("cities")
    

    await users.deleteMany({}) 
    await cities.deleteMany({})

    await cities.insertMany([
        {
            name : 'seoul',
            population : 1000
        },
        {
            name : 'busan',
            population : 350
        }
    ])

    await users.insertMany([
        {
            name : 'Gyu Yeon',
            bitrhdayYear : 1995,
            city : 'busan'
        },
        {
            name : 'Jin Ju',
            birthdayYear : 1994,
            city : 'busan'
        },
        {
            name : 'foo',
            birthdayYear : 1990,
            contacts : [
                {
                    type : 'phone',
                    number : '+821000001111'
                },
                {
                    type : 'home',
                    number : '+821023334444'
                }
            ],
            city:'seoul'
        },
    ])

    // await users.updateOne({
    //     name : 'foo'
    // },{
    //     $set:{
    //         name :'Baz'
    //     }
    // })

    // await users.deleteOne({
    //     name : 'foo'
    // })

    // const cursor = users.find(
    //     {
    //         'contacts.type':'phone'
    //     }
    // )


    // city 이름으로 user와 필드 합치기
    const cursor = users.aggregate([
        {
            $lookup:{
                from : 'cities',
                localField : 'city',
                foreignField : 'name',
                as : "city_info"
            }
        },
    ])


    await cursor.forEach(console.log)


    await client.close()
}