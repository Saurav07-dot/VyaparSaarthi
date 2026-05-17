import { Star } from "lucide-react";

function InsightHero({
  overallHealth,
  storeStatus,
  summary,
  storeRating,
}) {

  return (

<div
className="
bg-gradient-to-r
from-violet-600
to-indigo-600
dark:from-violet-700
dark:to-indigo-900
rounded-3xl
p-8
mb-8
text-white
shadow-lg
">

<div className="flex flex-col lg:flex-row justify-between items-center gap-8">

<div>

<p className="uppercase text-sm tracking-widest text-indigo-100 mb-2">
Store Health
</p>

<h1 className="text-5xl font-bold mb-3">
{overallHealth}/100
</h1>

<div className="flex items-center gap-4 mb-5 flex-wrap">

<span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm">
{storeStatus}
</span>

<div className="flex items-center gap-2">

<div className="flex gap-1">

{[1,2,3,4,5].map((star)=>(

<Star
key={star}
size={18}
className={
star<=Math.round(storeRating)
?
"fill-yellow-400 text-yellow-400"
:
"text-white/40"
}
/>

))}

</div>

<span>
{storeRating}
</span>

</div>

</div>

<p className="max-w-2xl text-indigo-100 leading-relaxed">
{summary}
</p>

</div>

<div
className="
w-40
h-40
rounded-full
border-[8px]
border-white/20
flex
items-center
justify-center
">

<div className="text-center">

<p className="text-4xl font-bold">
{overallHealth}
</p>

<p>
Overall
</p>

</div>

</div>

</div>

</div>

);

}

export default InsightHero;