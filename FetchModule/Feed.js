module.exports = async function Feed(ID,Limit,Offset=0,Order='',Filter='',Advanced='') {
    const BaseURL='https://api.mangadex.org'
    const limit=Limit || 10
    try{
        const res=await fetch(`${BaseURL}/manga/${ID}/feed?limit=${limit}&offset=${Offset}&includes[]=cover_art${Order}${Filter}${Advanced}`)
        const Data=await res.json()
        if(!Array.isArray(Data.data)){
            console.log("Invalid Object Feed");
            return Data;
        } else {
            console.log("✔️Fetched Feed Data");
            return Data;
        }

    }catch(error){
        console.log('Failed Fetching Data')
        return ('Feiled Fetch Feed Datas')
    }finally{
        console.log('Fetching Done')
        console.log(`${BaseURL}/manga/${ID}/feed?limit=${limit}&offset=${Offset}&includes[]=cover_art${Order}${Filter}${Advanced}`)
    }
}