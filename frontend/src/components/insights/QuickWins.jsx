import {
  Zap,
} from "lucide-react";

function QuickWins({
  quickWins,
}) {

  return (

<div
className="
bg-white
dark:bg-zinc-900
rounded-2xl
p-6
mb-8
border
border-zinc-200
dark:border-zinc-800
shadow-sm
">

<h2
className="
text-2xl
font-bold
text-zinc-900
dark:text-white
mb-6
">
Quick Wins
</h2>

<div className="grid md:grid-cols-2 gap-4">

{quickWins.map(
(item,index)=>(

<div
key={index}

className="
bg-zinc-100
dark:bg-zinc-800
rounded-xl
p-4
flex
gap-3
hover:scale-[1.02]
transition-all
">

<Zap
size={18}
className="
text-yellow-500
mt-1
"
/>

<p
className="
text-zinc-600
dark:text-zinc-300
">
{item}
</p>

</div>

))}

</div>

</div>

);

}

export default QuickWins;