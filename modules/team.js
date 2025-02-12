const mongoose= require('mongoose');

const newteam= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    teamimage:{
        type:String,
        required:true
    },
},
{timestamps:true});

const TEAM = mongoose.model('team', newteam);

module.exports = TEAM;