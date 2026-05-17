import {
Mic,
MicOff,
X,
Loader2
}
from "lucide-react";

function VoiceModal({

open,
close,
question,
startListening,
loading,
listening

}){

if(!open)return null;

return(

<div className="
fixed
inset-0
z-50

bg-black/40
backdrop-blur-sm

flex
items-center
justify-center
">

<div className="

bg-white
dark:bg-[#171717]

w-[430px]

rounded-[32px]

shadow-2xl

overflow-hidden

border

border-zinc-200
dark:border-zinc-800

">

<div className="

flex
justify-between
items-center

px-6
py-5

border-b

border-zinc-200
dark:border-zinc-800

">

<div>

<h2 className="
font-bold
text-xl
text-zinc-800
dark:text-white
">

Kasparo Assistant

</h2>

<p className="
text-xs
text-green-500
">

● Online

</p>

</div>

<button
onClick={close}
className="
text-zinc-500
hover:text-red-500
"
>

<X/>

</button>

</div>


<div className="
px-6
py-8
">

<div className="
flex
justify-center
mb-8
">

<div className={`

w-28
h-28

rounded-full

bg-gradient-to-r

from-violet-600
to-indigo-600

flex
items-center
justify-center

shadow-[0_0_50px_rgba(124,58,237,.5)]

transition-all
duration-500

${
listening
?
"scale-110 animate-pulse"
:
""
}

${
loading
?
"animate-bounce"
:
""
}

`}>

{

listening ?

<MicOff
size={36}
className="text-white"
/>

:

<Mic
size={36}
className="text-white"
/>

}

</div>

</div>


<div className="
text-center
min-h-[70px]
">

{

question ?

<>

<p className="
text-xs
text-zinc-400
mb-2
">

You said

</p>

<p className="
text-zinc-700
dark:text-zinc-200
font-medium
">

"{question}"

</p>

</>

:

<p className="
text-zinc-500
">

Tap below and start speaking

</p>

}

</div>



<div className="
mt-6
flex
justify-center
">

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

rounded-2xl

bg-gradient-to-r

from-violet-600
to-indigo-600

text-white

font-medium

"

>

{

loading ?

<div className="
flex
justify-center
items-center
gap-2
">

<Loader2
size={18}
className="
animate-spin
"
/>

Analyzing store...

</div>

:

listening ?

"Listening..."

:

"Tap To Speak"

}

</button>

</div>

</div>

</div>

</div>

)

}

export default VoiceModal;