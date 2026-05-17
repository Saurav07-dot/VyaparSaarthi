function WeakProductsTable({
  weakProducts,
}) {

return (

<div
className="
bg-white
dark:bg-zinc-900
rounded-2xl
p-6
mb-8
overflow-x-auto
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
Products Losing Potential
</h2>

<table className="w-full">

<thead>

<tr
className="
border-b
border-zinc-200
dark:border-zinc-800
text-left
">

<th className="pb-4 text-zinc-500">
Product
</th>

<th className="pb-4 text-zinc-500">
Score
</th>

<th className="pb-4 text-zinc-500">
Main Issue
</th>

<th className="pb-4 text-zinc-500">
Opportunity
</th>

</tr>

</thead>

<tbody>

{weakProducts.map(
(product,index)=>(

<tr
key={index}

className="
border-b
border-zinc-200
dark:border-zinc-800
hover:bg-zinc-50
dark:hover:bg-zinc-800
transition
">

<td
className="
py-5
font-medium
text-zinc-900
dark:text-white
">
{product.title}
</td>

<td className="py-5">

<span
className="
bg-red-100
dark:bg-red-500/20
text-red-600
dark:text-red-400
px-3
py-1
rounded-full
text-sm
">

{product.score}

</span>

</td>

<td
className="
py-5
text-zinc-600
dark:text-zinc-300
">
{product.issue}
</td>

<td
className="
py-5
text-green-600
dark:text-green-400
font-medium
">
{product.opportunity}
</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default WeakProductsTable;