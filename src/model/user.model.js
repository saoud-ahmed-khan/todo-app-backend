const mongoose= require ("mongoose")
const schema= mongoose.Schema


const userschema= new schema({
    username:{
        require:true,
        trim:true,
        lowercase:true,
        type:String,
        unique: true
    },
    password:{
        type:String,
        trim:true,
        require:true,
        minlength:8,
    }
}, {timestamps:true});
exports.userModel= mongoose.model("user",userschema)