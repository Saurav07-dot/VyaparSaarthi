import axios
from "axios";

export const runSimulation=
async(query)=>{

const user=

JSON.parse(

sessionStorage.getItem(
"user"
)

);

console.log(
"user:",
user
);

const res=

await axios.post(

"http://localhost:5000/api/simulation",

{

query,

email:
user?.email

}

);

return res.data;

}