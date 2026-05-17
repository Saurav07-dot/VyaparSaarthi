function ProductScoreBadge({
  classification,
}) {

  let color =
    "bg-zinc-700 text-zinc-200";

  if (classification === "Great") {
    color =
      "bg-emerald-500/10 text-emerald-400";
  }

  if (classification === "Good") {
    color =
      "bg-yellow-500/10 text-yellow-400";
  }

  if (classification === "Worst") {
    color =
      "bg-red-500/10 text-red-400";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border border-white/10 ${color}`}
    >
      {classification || "Pending"}
    </span>
  );
}

export default ProductScoreBadge;