const Product = require("../models/Product");
const User    = require("../models/User");

// ─────────────────────────────────────────────────────────────────
// THE CORE IDEA:
//
// Simulates what AI shopping agents (ChatGPT, Gemini, Perplexity)
// do when a user searches for a product.
//
// Two signals decide if a product appears:
//
//   RELEVANCE       — does this product match the query?
//   DISCOVERABILITY — can AI actually find/understand this product?
//                     (your AI-computed score from DB)
//
// Both must be high. Low discoverability = AI won't surface it,
// even if it's the right product. That's the whole point of the tool.
//
// SYNONYM RULE: expand only to what a word IS, never to what it
// is associated with. "trekking" = "hiking". NOT "outdoor", "trail",
// "mountain", "shoes", "backpack" etc. Over-expansion causes the
// exact bug in screenshot (shoes showing for "trekking poles").
// ─────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "a","an","the","i","me","my","we","our","you","your",
  "is","are","was","were","be","been","have","has","had",
  "do","does","did","will","would","could","should","may","might",
  "and","or","but","for","with","in","on","at","to","of","from",
  "best","top","good","great","nice","cheap","affordable","budget",
  "show","find","get","want","need","looking","give","suggest",
  "recommend","buy","purchase","some","any","please","something",
  "anything","products","items","thing","things",
]);

// ─────────────────────────────────────────────────────────────────
// SYNONYMS
// Rule: only expand to what the word literally IS or means.
// Never expand to what it is related to or used with.
// "trekking poles" → poles, sticks. NOT shoes, hydration, backpacks.
// ─────────────────────────────────────────────────────────────────
const SYNONYMS = {

  // ── Footwear ──────────────────────────────────────────────────
  shoe:             ["shoe","shoes","footwear"],
  shoes:            ["shoes","shoe","footwear"],
  sneaker:          ["sneaker","sneakers","shoe","shoes","footwear"],
  boot:             ["boot","boots","footwear"],
  sandal:           ["sandal","sandals","footwear"],
  footwear:         ["footwear","shoe","shoes","boot","boots","sneaker","sandal"],
  "hiking shoe":    ["hiking shoe","hiking shoes","trekking shoe","trekking shoes","trail shoe"],
  "trekking shoe":  ["trekking shoe","trekking shoes","hiking shoe","hiking shoes","trail shoe"],

  // ── Outdoor / Hiking ──────────────────────────────────────────
  // TIGHT: hiking/trekking only expand to each other, nothing else
  hiking:           ["hiking","trekking"],
  trekking:         ["trekking","hiking"],
  trek:             ["trek","trekking","hiking"],
  trail:            ["trail","trails"],
  outdoor:          ["outdoor","outdoors"],
  mountain:         ["mountain","mountains","alpine"],
  waterproof:       ["waterproof","water-resistant","water resistant"],

  // Poles — very specific, only expands to poles/sticks
  poles:            ["poles","trekking poles","hiking poles","walking poles","pole"],
  "trekking poles": ["trekking poles","hiking poles","walking poles","trekking pole"],
  "hiking poles":   ["hiking poles","trekking poles","walking poles","hiking pole"],

  // Bags
  backpack:         ["backpack","rucksack","daypack"],
  bag:              ["bag","bags","backpack","rucksack","daypack"],

  // Hydration — only water-carrying products
  hydration:        ["hydration","water bladder","hydration pack"],
  "water bladder":  ["water bladder","hydration pack","bladder"],

  // Clothing
  jacket:           ["jacket","jackets"],
  fleece:           ["fleece","fleece jacket"],
  coat:             ["coat","coats","jacket"],

  // ── Skincare ──────────────────────────────────────────────────
  // Each word maps only to what it IS, not what it treats
  serum:            ["serum","serums","face serum"],
  "vitamin c":      ["vitamin c","vit c","ascorbic"],
  vitaminc:         ["vitamin c","vit c","ascorbic"],
  brightening:      ["brightening","brightener"],
  "dark spots":     ["dark spots","hyperpigmentation","dark spot"],
  darkspots:        ["dark spots","hyperpigmentation"],
  sunscreen:        ["sunscreen","sunblock","spf","sun protection"],
  spf:              ["spf","sunscreen","sunblock","spf50"],
  moisturizer:      ["moisturizer","moisturiser","face cream"],
  moisturiser:      ["moisturizer","moisturiser","face cream"],
  cleanser:         ["cleanser","face wash","facewash"],
  "face wash":      ["face wash","cleanser","facewash"],
  facewash:         ["face wash","cleanser","facewash"],
  retinol:          ["retinol","retinoids"],
  "anti aging":     ["anti-ageing","anti aging","anti-aging"],
  antiaging:        ["anti-ageing","anti aging","anti-aging"],
  "anti-aging":     ["anti-ageing","anti aging","anti-aging"],
  wrinkles:         ["wrinkles","fine lines","wrinkle"],
  "fine lines":     ["fine lines","wrinkles"],
  niacinamide:      ["niacinamide"],
  acne:             ["acne","acne-prone","pimple","breakout","blemish"],
  pore:             ["pore","pores","pore minimising","pore minimizing"],
  oily:             ["oily skin","oily","oil control"],
  "night cream":    ["night cream","night moisturiser","night moisturizer"],

  // ── Home Office ───────────────────────────────────────────────
  desk:             ["desk","workstation"],
  "standing desk":  ["standing desk","height adjustable desk","sit-stand desk","electric desk"],
  chair:            ["chair","chairs"],
  "office chair":   ["office chair","ergonomic chair","mesh chair"],
  ergonomic:        ["ergonomic","lumbar support"],
  monitor:          ["monitor","screen","display"],
  "monitor stand":  ["monitor stand","monitor arm","screen stand","desk mount"],
  "monitor arm":    ["monitor arm","monitor stand","screen stand"],
  mat:              ["mat","floor mat"],
  "anti fatigue":   ["anti-fatigue mat","anti fatigue mat","standing mat"],
  "anti-fatigue":   ["anti-fatigue mat","anti fatigue mat","standing mat"],
  organiser:        ["organiser","organizer","desk organiser"],
  organizer:        ["organiser","organizer","desk organiser"],

  // ── Pets ──────────────────────────────────────────────────────
  dog:              ["dog","dogs","canine"],
  "dog food":       ["dog food","dog kibble","dry dog food"],
  dogfood:          ["dog food","dog kibble","dry dog food"],
  cat:              ["cat","cats","feline","kitten"],
  "cat litter":     ["cat litter","cat sand","litter"],
  litter:           ["cat litter","cat sand","litter"],
  carrier:          ["carrier","pet carrier"],
  "pet carrier":    ["pet carrier","cat carrier","dog carrier","airline approved pet"],

  // ── Coffee ────────────────────────────────────────────────────
  coffee:           ["coffee","espresso","arabica","cafe"],
  "cold brew":      ["cold brew","cold-brew","iced coffee"],
  coldbrew:         ["cold brew","cold-brew","iced coffee"],
  espresso:         ["espresso","coffee"],
  "pour over":      ["pour over","pour-over","v60","drip coffee"],
  v60:              ["v60","pour over","dripper"],
  "light roast":    ["light roast","light roasted"],
  "dark roast":     ["dark roast","dark roasted"],
  "medium roast":   ["medium roast","medium roasted"],
  instant:          ["instant coffee","instant","sachet"],
  ethiopian:        ["ethiopia","ethiopian","yirgacheffe"],
  yirgacheffe:      ["yirgacheffe","ethiopia","ethiopian"],
  "single origin":  ["single origin","single-origin"],
  coorg:            ["coorg","kodagu","karnataka"],
  fruity:           ["fruity","fruit"],
  floral:           ["floral","jasmine","bergamot"],
};

// ─────────────────────────────────────────────────────────────────
// GENDER & SKIN TYPE MAPS
// ─────────────────────────────────────────────────────────────────
const GENDER_VARIANTS = {
  men:    ["men","male","man","gents","mens"],
  women:  ["women","female","woman","ladies","womens"],
  kids:   ["kids","child","children","boy","girl","baby","infant","toddler"],
};

const SKIN_TYPE_VARIANTS = {
  oily:        ["oily","acne-prone","combination","sebum"],
  dry:         ["dry","dehydrated","flaky"],
  sensitive:   ["sensitive","reactive","redness"],
  combination: ["combination","oily","dry"],
};

// ─────────────────────────────────────────────────────────────────
// PARSE QUERY
// ─────────────────────────────────────────────────────────────────
function parseQuery(raw) {
  const q = raw.toLowerCase().trim();

  let maxPrice = null;
  const maxMatch = q.match(/(?:under|below|less\s+than|upto|up\s+to|within|max)\s+(?:rs\.?|inr|₹)?\s*(\d+)/i);
  if (maxMatch) maxPrice = Number(maxMatch[1]);

  let minPrice = null;
  const minMatch = q.match(/(?:above|over|more\s+than|starting\s+from|min)\s+(?:rs\.?|inr|₹)?\s*(\d+)/i);
  if (minMatch) minPrice = Number(minMatch[1]);

  const rangeMatch = q.match(/between\s+(?:rs\.?|inr|₹)?\s*(\d+)\s+and\s+(?:rs\.?|inr|₹)?\s*(\d+)/i);
  if (rangeMatch) { minPrice = Number(rangeMatch[1]); maxPrice = Number(rangeMatch[2]); }

  let gender = null;
  for (const [key, variants] of Object.entries(GENDER_VARIANTS)) {
    if (variants.some(v => q.includes(v))) { gender = key; break; }
  }

  let skinType = null;
  for (const [key, variants] of Object.entries(SKIN_TYPE_VARIANTS)) {
    if (variants.some(v => q.includes(v))) { skinType = key; break; }
  }

  const cleaned = q
    .replace(/(?:between\s+(?:rs\.?|inr|₹)?\s*\d+\s+and\s+(?:rs\.?|inr|₹)?\s*\d+)/gi, "")
    .replace(/(?:under|below|less\s+than|upto|up\s+to|within|above|over|more\s+than|starting\s+from|min|max)\s+(?:rs\.?|inr|₹)?\s*\d+/gi, "")
    .replace(/(?:rs\.?|inr|₹)\s*\d+/gi, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Extract multi-word phrases first (most specific)
  const phrases = [];
  // Sort by length descending so longer phrases take priority
  const phraseKeys = Object.keys(SYNONYMS)
    .filter(k => k.includes(" "))
    .sort((a, b) => b.length - a.length);

  for (const phrase of phraseKeys) {
    if (cleaned.includes(phrase)) phrases.push(phrase);
  }

  // Then single words, skipping anything already covered by a phrase
  const phraseCoveredText = phrases.join(" ");
  const singleWords = cleaned
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w) && !phraseCoveredText.split(" ").includes(w));

  return { keywords: [...phrases, ...singleWords], maxPrice, minPrice, gender, skinType };
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function expand(word) { return SYNONYMS[word] || [word]; }

function hits(text, variants) {
  if (!text) return false;
  const t = text.toLowerCase();
  return variants.some(v => t.includes(v));
}

function hitsArr(arr, variants) {
  if (!arr?.length) return false;
  return arr.some(item => hits(String(item), variants));
}

// ─────────────────────────────────────────────────────────────────
// RELEVANCE — how well does the product match the query? (0-100)
// ─────────────────────────────────────────────────────────────────
function computeRelevance(product, parsed) {
  let score     = 0;
  let titleHits = 0;
  let anyMatch  = false;

  for (const word of parsed.keywords) {
    const variants = expand(word);

    const inTitle       = hits(product.title,             variants);
    const inCategory    = hits(product.category,          variants);
    const inTags        = hitsArr(product.tags,           variants);
    const inKeyIngred   = hitsArr(product.keyIngredients, variants);
    const inSkinType    = hits(product.skinType,          variants);
    const inSuitableFor = hits(product.suitableFor,       variants);
    const inIngredients = hitsArr(product.ingredients,    variants);
    const inMaterial    = hits(product.material,          variants);
    const inTastingNote = hitsArr(product.tastingNotes,   variants);
    const inDescription = hits(product.description,       variants);

    if (inTitle)       { score += 60; titleHits++; anyMatch = true; }
    if (inCategory)    { score += 45; anyMatch = true; }
    if (inTags)        { score += 35; anyMatch = true; }
    if (inKeyIngred)   { score += 30; anyMatch = true; }
    if (inSkinType)    { score += 25; anyMatch = true; }
    if (inSuitableFor) { score += 20; anyMatch = true; }
    if (inIngredients) { score += 18; anyMatch = true; }
    if (inMaterial)    { score += 15; anyMatch = true; }
    if (inTastingNote) { score += 15; anyMatch = true; }
    if (inDescription) { score += 10; anyMatch = true; }
  }

  if (!anyMatch) return { relevance: 0, titleHits, anyMatch };

  // Normalise against best-case (every keyword hits title)
  const maxPossible = parsed.keywords.length * 60;
  const relevance   = Math.min(Math.round((score / maxPossible) * 100), 100);

  return { relevance, titleHits, anyMatch };
}

// ─────────────────────────────────────────────────────────────────
// DISCOVERABILITY — from your AI-computed score in DB (0-100)
// This is the real gate: if your AI scored it low, AI won't show it.
// ─────────────────────────────────────────────────────────────────
function computeDiscoverability(product) {
  const s = product.scores;

  // Real AI score exists — use it directly, it's the truth
  if (s && s.discoverability > 0) return s.discoverability;

  // Score is 0 = not yet analyzed. Give a conservative estimate
  // so unanalyzed products don't compete with analyzed ones.
  let estimate = 30;
  if (product.description?.length > 150) estimate += 10;
  if (product.tags?.length > 2)          estimate += 8;
  if (product.images?.length > 1)        estimate += 5;
  return Math.min(estimate, 50); // hard cap without real AI analysis
}

// ─────────────────────────────────────────────────────────────────
// FINAL VISIBILITY SCORE (0-95)
//
// Geometric mean of relevance × discoverability.
// Both must be high — low discoverability kills visibility even if
// the product perfectly matches the query. That IS the simulation.
// ─────────────────────────────────────────────────────────────────
function computeVisibility(relevance, discoverability) {
  const r = relevance       / 100;
  const d = discoverability / 100;
  return Math.round(
   (r * Math.pow(d,0.7)) * 100
);
}

// ─────────────────────────────────────────────────────────────────
// SCORE ONE PRODUCT
// ─────────────────────────────────────────────────────────────────
function scoreProduct(product, parsed) {

  // Hard price filters
  if (parsed.maxPrice !== null && product.price > parsed.maxPrice) return null;
  if (parsed.minPrice !== null && product.price < parsed.minPrice) return null;

  // Relevance check
  const { relevance, titleHits, anyMatch } = computeRelevance(product, parsed);
  if (!anyMatch) return null;

  // Gender filter — hard reject wrong gender (unisex always passes)
  if (parsed.gender && product.targetGender) {
    const tg = product.targetGender.toLowerCase();
    if (!tg.includes("unisex")) {
      const wanted = GENDER_VARIANTS[parsed.gender] || [parsed.gender];
      if (!wanted.some(v => tg.includes(v))) return null;
    }
  }

  // Skin type filter — hard reject wrong skin type ("all" always passes)
  if (parsed.skinType && product.skinType) {
    const ps = product.skinType.toLowerCase();
    if (!ps.includes("all")) {
      const wanted = SKIN_TYPE_VARIANTS[parsed.skinType] || [parsed.skinType];
      if (!wanted.some(v => ps.includes(v))) return null;
    }
  }

  // Discoverability from DB
  const discoverability = computeDiscoverability(product);

  // Final visibility
  let visibility = computeVisibility(relevance, discoverability);

  // Out of stock penalty
  if (product.inStock === false) visibility = Math.max(visibility - 12, 0);

  // Threshold — must clear this to show in results
  // title hit = higher confidence needed; category/tag only = slightly lower
  const threshold = titleHits > 0 ? 20 : 15;
  if (visibility < threshold) return null;

  return {
    id:              product._id,
    title:           product.title,
    image:           product.images?.[0] || null,
    price:           product.price,
    currency:        product.currency || "INR",
    rating:          product.rating   || null,
    reviews:         product.reviews  || null,
    inStock:         product.inStock  ?? true,
    classification:  product.classification || null,
    chance:          visibility,       // shown as "AI Visibility %" in UI
    discoverability,                   // merchant sees WHY their score matters
  };
}

// ─────────────────────────────────────────────────────────────────
// MAIN CONTROLLER
// ─────────────────────────────────────────────────────────────────
exports.simulateAI = async (req, res) => {
  try {
    const { query, email } = req.body;

    if (!query || !email) {
      return res.status(400).json({ message: "query and email are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const products = await Product.find({ storeId: user.storeId });
    if (!products.length) return res.json([]);

    const parsed = parseQuery(query);

    console.log(`[simulateAI] "${query}"`, {
      keywords: parsed.keywords,
      maxPrice: parsed.maxPrice,
      minPrice: parsed.minPrice,
      gender:   parsed.gender,
      skinType: parsed.skinType,
    });

    const results = products
      .map(p => scoreProduct(p, parsed))
      .filter(Boolean)
      .sort((a, b) => b.chance - a.chance);

    console.log(`[simulateAI] ${results.length}/${products.length} visible`);

    return res.json(results);

  } catch (err) {
    console.error("[simulateAI] error:", err);
    return res.status(500).json({ message: "simulation failed" });
  }
};