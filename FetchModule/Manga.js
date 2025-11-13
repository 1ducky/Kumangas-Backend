module.exports = async function Newer(Limit,Offset=0,Order=null,Filter=null) {
    const BaseURL='https://api.mangadex.org'
    const limit=Limit || 10
    try{
        const res=await fetch(`${BaseURL}/manga?limit=${limit}&offset=${Offset}&includes[]=cover_art${Order}${Filter}`)
        const Data=await res.json()
        if(!Array.isArray(Data.data) || Data.data.length === 0){
            console.log('invalid Obejct')
            return Data

        }else{
            console.log('Getting Fecth Data')
            console.log(`Limit=${Limit} offset=${Offset}`)

            return Data
        }
    }catch(error){
        console.log('Failed Fetching Data')
        return ('Something Went Wrong')
    }finally{
        console.log('Fetching Done')
    }
}