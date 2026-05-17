import { useState } from "react";

import {
Mic,
MicOff,
Minimize2,
Sparkles
}
from "lucide-react";

import askVoiceAI
from "../services/voiceService";

function VoiceAssistant(){

const [open,setOpen]=
useState(false);

const [listening,setListening]=
useState(false);

const [loading,setLoading]=
useState(false);

const [question,setQuestion]=
useState("");

const speak=(msg,userInput="")=>{

window.speechSynthesis.cancel();

msg=
msg
.replace(/\*\*/g,"")
.replace(/\*/g,"")
.replace(/#/g,"")
.replace(/\n/g," ");

const speech=
new SpeechSynthesisUtterance(
msg
);

speech.rate=
0.92;

speech.pitch=
1;

speech.volume=
1;


/*
Language based on what USER spoke
*/

const hindiChars=
/[\u0900-\u097F]/;

if(
hindiChars.test(
userInput
)
){

speech.lang=
"hi-IN";

}else{

speech.lang=
"en-IN";

}


/*
KEEP SAME VOICE
*/

const applyVoice=()=>{

const voices=
window
.speechSynthesis
.getVoices();


const selectedVoice=

voices.find(
v=>
v.name==="Google हिन्दी"
);


if(selectedVoice){

speech.voice=
selectedVoice;

}

window
.speechSynthesis
.speak(
speech);

};


const voices=
window
.speechSynthesis
.getVoices();

if(
voices.length
){

applyVoice();

}else{

window
.speechSynthesis
.onvoiceschanged=
applyVoice;

}

};

const openAssistant=
()=>{

setOpen(true);

speak(

"Hello, I am your personal store assistant. How can I help you today?"

);

};



const startListening=()=>{

const SpeechRecognition=

window.SpeechRecognition||
window.webkitSpeechRecognition;


const recognition=
new SpeechRecognition();


/*
important fix
*/

recognition.lang=
"en-IN";


recognition.continuous=
false;

recognition.interimResults=
false;

recognition.maxAlternatives=
1;


setListening(true);



recognition.onresult=
async(e)=>{

const text=
e.results[0][0]
.transcript;


setQuestion(
text
);


const user=
JSON.parse(

sessionStorage
.getItem(
"user"
)

);


try{

setLoading(
true
);


const data=
await askVoiceAI(

user.storeId,

text

);


if(data){

speak(
data.answer,
text
);

}

}
catch(error){

console.log(
error
);

}


setListening(false);

setLoading(false);

};



recognition.onerror=
()=>{

setListening(false);

setLoading(false);

};


recognition.onend=
()=>{

setListening(false);

};


recognition.start();

};



return(

<div
className="
fixed
bottom-6
right-6
z-50
"
>

{
!open&&

<button
onClick={
openAssistant
}

className="

h-14
px-5

rounded-full

bg-white

dark:bg-zinc-900

shadow-xl

border

border-zinc-200

dark:border-zinc-800

flex
items-center
gap-3

hover:scale-105
transition-all

"

>

<div

className="

w-8
h-8

rounded-full

bg-gradient-to-r

from-violet-600
to-indigo-600

flex
items-center
justify-center

"

>

<Sparkles
size={16}
className="
text-white
"
/>

</div>

<div className="flex flex-col leading-tight">

<span
className="
font-medium
text-zinc-700
dark:text-white
"
>
Saarthi Assist
</span>

<div className="text-[10px] text-slate-500 dark:text-zinc-500 transition-colors duration-300">
Your personalized voice assistant
</div>

</div>
</button>

}



{
open&&

<div

className="

w-[320px]

bg-white

dark:bg-[#171717]

rounded-[24px]

border

border-zinc-200

dark:border-zinc-800

shadow-2xl

overflow-hidden

"

>

<div
className="
px-4
py-3

border-b

flex
justify-between
items-center
"
>

<div
className="
flex
items-center
gap-3
"
>

<div

className="

w-9
h-9

rounded-full

bg-gradient-to-r

from-violet-600
to-indigo-600

flex
justify-center
items-center

"

>

<Sparkles
size={15}
className="
text-white
"
/>

</div>

<div>

<p
className="
font-semibold
text-zinc-800
dark:text-white
"
>

Kasparo Assistant

</p>

<p
className="
text-xs
text-green-500
"
>

● Online

</p>

</div>

</div>

<button
onClick={()=>
setOpen(false)
}
>

<Minimize2
size={18}
/>

</button>

</div>

<div className="p-4">

<button

onClick={
startListening
}

disabled={
loading
}

className="

w-full

h-12

rounded-xl

bg-gradient-to-r

from-violet-600
to-indigo-600

text-white

font-medium

flex
justify-center
items-center
gap-2

"

>

{

loading ?

"Analyzing..."

:

listening ?

<>

<MicOff/>

Listening...

</>

:

<>

<Mic/>

Tap to Speak

</>

}

</button>


{
question&&

<div
className="
mt-4

rounded-xl

bg-zinc-100
dark:bg-zinc-900

px-4
py-3
"
>

<p
className="
text-xs
text-zinc-400
"
>

You

</p>

<p>

"{question}"

</p>

</div>

}

</div>

</div>

}

</div>

)

}

export default VoiceAssistant;