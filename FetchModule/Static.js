module.exports = async function Static(ID) {
    const BaseURL='https://api.mangadex.org'

    try{
        const res=await fetch(`${BaseURL}/statistics/manga/${ID}`)
        const Data=await res.json()
        if(!Data.statistics || Object.keys(Data.statistics).length === 0){
            console.log('invalid Obejct Static')
            return Data

        }else{
            console.log('✔️Getting Fecth Statistics Data')

            return Data
        }
    }catch(error){
        console.log('Failed Fetching Data')
        console.log(`${BaseURL}/manga/${ID}`)
        return ('Failed Get Detail Datas')

    }finally{
        console.log('Fetching Done')
        console.log(`${BaseURL}/statistics/manga/${ID}`)
    }
}