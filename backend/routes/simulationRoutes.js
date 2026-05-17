const router=
require("express")
.Router();

const{
simulateAI
}=require(
"../controllers/simulationController"
);

router.post(
"/",
simulateAI
);

module.exports=
router;