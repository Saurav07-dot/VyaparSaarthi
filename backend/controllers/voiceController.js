const Product=
require("../models/Product");

const Store=
require("../models/Store");

const {
askStoreAssistant
}=require(
"../services/voiceAssistantService"
);

const askVoice=
async(req,res)=>{

try{

const{
question,
storeId
}=req.body;


const store=
await Store.findOne({
storeId
});

const products=
await Product.find({
storeId
});

if(!store){

return res
.status(404)
.json({

success:false,

message:
"Store not found"

});

}


const storeData={

storeName:
store.storeName,

category:
store.category,

policies:
store.policies||{},

faqs:
store.faqs||[],

overallScores:
store.overallScores||{},

products

};


const answer=
await askStoreAssistant(

storeData,
question

);

res.json({

success:true,

answer

});

}
catch(error){

console.log(error);

res.status(500)
.json({

success:false,

message:
error.message

});

}

};

module.exports={

askVoice

};