import axios
from "axios";

const askVoiceAI=
async(
storeId,
question
)=>{

const res=
await axios.post(

"http://localhost:5000/api/voice/ask",

{
storeId,
question
}

);

return res.data;

};

export default
askVoiceAI;