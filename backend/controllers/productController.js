const Product = require("../models/Product");


const getProducts = async (req,res)=>{

try{

const products=
await Product.find({

storeId:
req.params.storeId

});

res.json(products);

}
catch(error){

res.status(500)
.json({

message:
"Failed to fetch products"

});

}

};



const getSingleProduct =
async(req,res)=>{

try{

const product=
await Product.findById(
req.params.id
);

if(!product){

return res.status(404)
.json({

message:
"Product not found"

});

}

res.json(product);

}
catch(error){

res.status(500)
.json({

message:
"Failed to fetch product"

});

}

};




const applyAIUpdate=
async(req,res)=>{

try{

const product=
await Product.findById(
req.params.id
);

if(!product){

return res.status(404)
.json({

message:
"Product not found"

});

}



/* update generated content */

product.title=

product.aiAnalysis
?.generatedTitle
||
product.title;


product.description=

product.aiAnalysis
?.generatedDescription
||
product.description;



/* recalculate scores */


const clarity=

Math.min(

100,

product.title.length
+15

);



const discoverability=

Math.min(

100,

(
product.aiAnalysis
?.seoKeywords
?.length||0
)

*12

);



const trust=

Math.min(

100,

(
product.rating||0
)

*20

);



const conversion=

Math.round(

(

clarity+

discoverability+

trust

)/3

);



product.scores={

clarity,

discoverability,

trust,

conversion

};



product.overallScore=

Math.round(

(

clarity+

discoverability+

trust+

conversion

)/4

);
if(product.overallScore>=80){

product.classification=
"Excellent";

}
else if(
product.overallScore>=60
){

product.classification=
"Good";

}
else if(
product.overallScore>=40
){

product.classification=
"Average";

}
else{

product.classification=
"worst";

}


product.aiAnalysis.summary=

"AI improvements applied successfully. Product content optimized and score recalculated.";



await product.save();

res.json(product);

}
catch(error){

console.log(error);

res.status(500)
.json({

message:
error.message

});

}

};



module.exports={

getProducts,

getSingleProduct,

applyAIUpdate

};