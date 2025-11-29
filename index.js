const express=require('express')

//Fetch
const Manga =require('./FetchModule/Manga')
const Detail = require('./FetchModule/Detail')
const Static = require('./FetchModule/Static')
const Feed = require('./FetchModule/Feed')

const App= express()
const port=1000

App.use(express.json())


App.get('/', (req,res) =>
{
    res.send('Api Running')
})

App.get('/manga', async (req,res) => {
    const result = await Manga(5,0)
    res.send(result)
})

App.post('/detail', async (req,res) =>{
    try{

        const Data= req?.body?.request || null
        const ID = Data?.uid || null
    
        // chackeing Request
        if (!Data || !ID) {
            return res.status(400).json({
                massage : "Bad Request"
            })
        }
        
        const Limit= Data?.limit | 0
        const Offset=Data?.offset | 0
        const Order=Object.entries(Data.order || {})
            .map(([key,value]) => `&order[${key}]=${value}`).join('')

        const Advanced=Object.entries(Data.advanced || {})
            .map(([key,value]) => `&${key}[]=${value}`).join('')

        const Fillter =Object.entries(Data.filter || {})
            .map(([key,value]) => `&${key}=${value}`).join('')

        // const result = await Detail(ID,Limit,Offset,Order,Fillter,Advanced)
        const [DetailDatas,StaticDatas,FeedDatas] = await Promise.allSettled([
            Detail(ID),
            Static(ID),
            Feed(ID,Limit,Offset,Order,Fillter,Advanced)
        ])
        
        return res.status(200).json({
            Status : 'Success',
            param: [Order,Fillter],
            response : 'Detail',
            data : [
                {details : DetailDatas},
                {static : StaticDatas},
                {feed : FeedDatas}
            ],
            limit : Limit,
            offset : Offset,

            // total : result.total
        })
    }catch(err){
        const Data= req?.body?.request || {}
        const Order=Object.entries(Data.order || {})
            .map(([key,value]) => `&order[${key}]=${value}`).join('')
        const Fillter =Object.entries(Data.fillter || {}).map(([key,value]) => `&${key}=${value}`)
        return res.status(500).json({
            massage : "Internal Error",
            "param" : [Order,Fillter],
            "details" : err
        })
    }
})


App.post('/manga', async (req,res) =>{
    try{

        const Data= req?.body?.request || null
    
        // chackeing Request
        if (!Data) {
            return res.status(400).json({
                massage : "Bad Request"
            })
        }
    
        const Limit= Data?.limit | 0
        const Offset=Data?.offset | 0
        const Order=Object.entries(Data.order || {})
            .map(([key,value]) => `&order[${key}]=${value}`).join('')

        const Advanced=Object.entries(Data.advanced || {})
            .map(([key,value]) => `&${key}[]=${value}`).join('')

        const Fillter =Object.entries(Data.filter || {})
            .map(([key,value]) => `&${key}=${value}`).join('')

        const result = await Manga(Limit,Offset,Order,Fillter,Advanced)
        
        return res.status(200).json({
            Status : 'Success',
            param: [Order,Fillter],
            response : result.response,
            data : result.data,
            limit : Limit,
            offset : Offset,
            total: result.total
            // total : result.total
        })
    }catch(err){
        const Data= req?.body?.request || {}
        const Order=Object.entries(Data.order || {})
            .map(([key,value]) => `&order[${key}]=${value}`).join('')
        const Fillter =Object.entries(Data.fillter || {}).map(([key,value]) => `&${key}=${value}`)
        return res.status(500).json({
            massage : "Internal Error",
            "param" : [Order,Fillter],
            "details" : err
        })
    }
})

App.use((req,res) => {
    return res.status(404).json({ massage : "Endpoint Not Found"})
})

App.listen(port, () =>{
    console.log("Service Running At Port: ", port)
})