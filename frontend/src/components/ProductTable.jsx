// =====================================
// FILE: src/components/ProductTable.jsx
// =====================================

import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Package,
  AlertTriangle,
  ChevronRight
} from "lucide-react"

function ProductTable({ products=[] }) {

const navigate=useNavigate()

const visibleProducts=
[...products]
.sort(
(a,b)=>
(b.overallScore||0)-
(a.overallScore||0)
)
.slice(0,4)


const getVisibility=(score)=>{

if(score>=80){

return{
label:"High",
color:"text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
}

}

if(score>=60){

return{
label:"Medium",
color:"text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
}

}

return{
label:"Low",
color:"text-red-500 bg-red-50 dark:bg-red-500/10"
}

}

return(

<div className="
glass-panel
rounded-3xl
p-6
border
border-slate-200
dark:border-white/5
">

{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-5
pb-4
border-b
border-slate-200
dark:border-white/5
">

<div>

<h2 className="
text-xl
font-semibold
text-slate-900
dark:text-white
">
Product Overview
</h2>

<p className="
text-sm
text-slate-500
mt-1
">
Top AI analyzed products
</p>

</div>

<button
onClick={()=>
navigate("/products")
}
className="
text-indigo-500
text-sm
font-medium
flex
items-center
gap-1
"
>

View all

<ArrowRight size={14}/>

</button>

</div>


{visibleProducts.length===0 ?(

<div className="
h-[250px]
flex
flex-col
items-center
justify-center
">

<Package
size={32}
className="text-slate-400"
/>

<p className="
mt-3
text-slate-500
">
No products found
</p>

</div>

):(

<div className="overflow-hidden">

{/* TABLE HEAD */}

<div className="
grid
grid-cols-12
px-5
pb-3
text-xs
font-medium
text-slate-500
border-b
border-slate-200
dark:border-white/5
">

<div className="col-span-5">
Product
</div>

<div className="col-span-2 text-center">
AI Score
</div>

<div className="col-span-1 text-center">
Issues
</div>

<div className="col-span-2 text-center">
Visibility
</div>

<div className="col-span-2 text-right">
Action
</div>

</div>


{/* ROWS */}

<div className="divide-y divide-slate-200 dark:divide-white/5">

{visibleProducts.map(product=>{

const score=
product.overallScore||0

const issues=
product.aiProblems?.length||0

const visibility=
getVisibility(score)

return(

<div
key={product._id}
className="
grid
grid-cols-12
items-center
px-5
py-5
hover:bg-slate-50
dark:hover:bg-white/[0.02]
transition
"
>

{/* PRODUCT */}

<div className="
col-span-5
flex
items-center
gap-4
min-w-0
">

<div className="
w-12
h-12
rounded-xl
overflow-hidden
bg-slate-100
dark:bg-white/5
shrink-0
">

{product.images?.[0] ?(

<img
src={product.images[0]}
className="
w-full
h-full
object-cover
"
/>

):(

<div className="
w-full
h-full
flex
justify-center
items-center
">

<Package size={16}/>

</div>

)}

</div>


<div className="min-w-0">

<h3 className="
text-sm
font-medium
truncate
text-slate-900
dark:text-white
">

{product.title}

</h3>

<p className="
text-xs
text-slate-500
mt-1
">

₹{product.price}

</p>

</div>

</div>


{/* SCORE */}

<div className="
col-span-2
text-center
">

<div className="
inline-flex
w-10
h-10
rounded-full
items-center
justify-center
bg-indigo-50
dark:bg-indigo-500/10
text-indigo-500
font-semibold
text-sm
">

{score}

</div>

</div>


{/* ISSUES */}

<div className="
col-span-1
text-center
text-orange-500
text-sm
font-medium
">

<div className="
flex
justify-center
items-center
gap-1
">

<AlertTriangle size={14}/>

{issues}

</div>

</div>


{/* VISIBILITY */}

<div className="
col-span-2
text-center
">

<span
className={`
text-xs
px-3
py-1
rounded-full
${visibility.color}
`}
>

{visibility.label}

</span>

</div>


{/* ACTION */}

<div className="
col-span-2
flex
justify-end
">

<button
onClick={()=>
navigate(
`/products/${product._id}`
)
}
className="
w-9
h-9
rounded-xl
bg-slate-100
dark:bg-white/5
hover:bg-indigo-500
hover:text-white
transition
flex
items-center
justify-center
"
>

<ChevronRight size={16}/>

</button>

</div>

</div>

)

})}

</div>

</div>

)}

</div>

)

}

export default ProductTable