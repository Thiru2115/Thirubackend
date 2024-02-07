var location=require('../model/location ')

exports.getAllLocations=async(req,res)=>{
    try{
        var data=await location.find();
        res.status(200).send(data)

    }catch{
        res.status(500).send("sever side error")
    }

}