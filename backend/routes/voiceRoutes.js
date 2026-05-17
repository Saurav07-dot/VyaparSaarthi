const express=
require("express");

const router=
express.Router();

const{
askVoice
}=require(
"../controllers/voiceController"
);

router.post(
"/ask",
askVoice
);

module.exports=
router;