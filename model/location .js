let mongoose=require('mongoose')

var locationSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    city_id:{
        type:Number,
        require:true
    },
    location_id:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    country_name:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("locationData",locationSchema)