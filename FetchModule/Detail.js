module.exports = async function Detail(ID) {
    const BaseURL='https://api.mangadex.org'

    try{
        const res=await fetch(`${BaseURL}/manga/${ID}`)
        const Data=await res.json()
        if(!Data.data){
            console.log('invalid Obejct Detail')
            return Data

        }else{
            console.log('✔️Getting Fecth Detail Data')

            return Data
        }
    }catch(error){
        console.log('Failed Fetching Data')
        return ('Failed Get Detail Datas')

    }finally{
        console.log('Fetching Done')
        console.log(`${BaseURL}/manga/${ID}`)

    }
}