function WeakProductsTable({
  weakProducts,
}) {

  return (

    <div className="bg-[#1e293b] rounded-2xl p-6 mb-8 overflow-x-auto">

      <h2 className="text-2xl font-bold text-white mb-6">
        Products Losing Potential
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700 text-left">

            <th className="pb-4 text-slate-400">
              Product
            </th>

            <th className="pb-4 text-slate-400">
              Score
            </th>

            <th className="pb-4 text-slate-400">
              Main Issue
            </th>

            <th className="pb-4 text-slate-400">
              Opportunity
            </th>

          </tr>

        </thead>

        <tbody>

          {weakProducts.map(
            (product, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="py-5 text-white font-medium">
                  {product.title}
                </td>

                <td className="py-5">

                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    {product.score}
                  </span>

                </td>

                <td className="py-5 text-slate-300">
                  {product.issue}
                </td>

                <td className="py-5 text-green-400">
                  {product.opportunity}
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default WeakProductsTable;