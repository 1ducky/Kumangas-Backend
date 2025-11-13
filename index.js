const express=require('express')


//Fetch
const Manga =require('./FetchModule/Manga')

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
        const Order=Object.entries(Data.order)
            .map(([key,value]) => `&order[${key}]=${value}`).join('')
        const Fillter =Object.entries(Data.filter).map(([key,value]) => `&${key}=${value}`)
        const result = await Manga(Limit,Offset,Order,Fillter)
        

        

        return res.status(200).json({
            Status : 'Success',
            param: Order,
            response : result.response,
            data : result.data,
            limit : Limit,
            offset : Offset,
            total: result.total
            // total : result.total
        })
    }catch{
        const Data= req?.body?.request || null
        const Order=Object.entries(Data.order)
            .map(([key,value]) => `&order[${key}]=${value}`).join('')
        const Fillter =Object.entries(Data.fillter).map(([key,value]) => `&${key}=${value}`)
        return res.status(500).json({
            massage : "Internal Error",
            "error" : Order
        })
    }
})

App.use((req,res) => {
    return res.status(404).json({ massage : "Endpoint Not Found"})
})

App.listen(port, () =>{
    console.log("Service Running At Port: ", port)
})