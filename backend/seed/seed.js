require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/kasparo";

// ── Schemas ──────────────────────────────────────────────────────────────────

const UserSchema = new mongoose.Schema(
  {
    email:   { type: String, required: true, unique: true },
    password:{ type: String, required: true },
    storeId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const StoreSchema = new mongoose.Schema({
  storeId:   { type: String, required: true, unique: true },
  storeName: String,
  email:     { type: String, required: true, unique: true },
  domain:    String,
  category:  String,
  policies: {
    returnPolicy:   String,
    shippingPolicy: String,
    warrantyPolicy: String,
  },
  faqs: [{ question: String, answer: String }],
  overallScores: {
    aiDiscoverability:   { type: Number, default: 0 },
    productClarity:      { type: Number, default: 0 },
    trustSignals:        { type: Number, default: 0 },
    conversionReadiness: { type: Number, default: 0 },
  },
});

const ProductSchema = new mongoose.Schema({
  id:          String,
  storeId:     { type: String, required: true, index: true },
  title:       String,
  description: String,
  category:    String,
  price:       Number,
  currency:    String,
  reviews:     Number,
  rating:      Number,
  tags:        [String],
  images:      [String],
  inStock:     Boolean,
  material:       String,
  targetGender:   String,
  sizes:          [String],
  dimensions:     String,
  weightCapacity: String,
  petType:        String,
  suitableFor:    String,
  weight:         String,
  ingredients:    [String],
  skinType:       String,
  keyIngredients: [String],
  volume:         String,
  roastLevel:     String,
  origin:         String,
  process:        String,
  tastingNotes:   [String],
  brewMethods:    [String],
  scores: {
    clarity:         { type: Number, default: null },
    discoverability: { type: Number, default: null },
    trust:           { type: Number, default: null },
    conversion:      { type: Number, default: null },
  },
  classification: { type: String, enum: ["Great", "Good", "Worst", null], default: null },
  aiProblems:      [String],
  recommendations: [String],
});

const User    = mongoose.model("User",    UserSchema);
const Store   = mongoose.model("Store",   StoreSchema);
const Product = mongoose.model("Product", ProductSchema);

// ── Seed data ─────────────────────────────────────────────────────────────────
// Each store has an email; a matching User is created with the same email.
// Default password for all seed users: "password123"
// Change these before going to production!

const DEFAULT_PASSWORD = "password123";

const stores = [
  {
    storeId:   "peaktrail",
    storeName: "PeakTrail Gear",
    email:     "imsauravkumar95@gmail.com",
    domain:    "peaktrail.myshopify.com",
    category:  "Outdoor & Hiking",
    policies: {
      returnPolicy:   "",
      shippingPolicy: "Ships in 5-7 business days.",
      warrantyPolicy: "",
    },
    faqs: [],
    overallScores: { aiDiscoverability: 0, productClarity: 0, trustSignals: 0, conversionReadiness: 0 },
  },
  {
    storeId:   "luminos_skincare",
    storeName: "Luminos Skincare",
    email:     "admin@luminosskin.com",
    domain:    "luminosskin.myshopify.com",
    category:  "Skincare & Beauty",
    policies: {
      returnPolicy:   "Returns accepted within 30 days if product is unopened and in original packaging.",
      shippingPolicy: "Free shipping on orders above ₹999. Delivered in 3-5 days.",
      warrantyPolicy: "",
    },
    faqs: [
      { question: "Are your products dermatologist tested?", answer: "Yes, all Luminos products are dermatologist tested and approved for sensitive skin." },
      { question: "Do you use parabens or sulfates?",        answer: "No. All our formulations are paraben-free and sulfate-free." },
    ],
    overallScores: { aiDiscoverability: 0, productClarity: 0, trustSignals: 0, conversionReadiness: 0 },
  },
  {
    storeId:   "deskcraft",
    storeName: "DeskCraft Home Office",
    email:     "admin@deskcraft.com",
    domain:    "deskcraft.myshopify.com",
    category:  "Home Office & Furniture",
    policies: {
      returnPolicy:   "10-day return window for undamaged items. Customer bears return shipping cost.",
      shippingPolicy: "Ships within 3 business days. Large furniture items may take 7-10 days.",
      warrantyPolicy: "1-year manufacturing defect warranty on all furniture items.",
    },
    faqs: [
      { question: "Do you provide assembly services?", answer: "Yes, assembly service is available in select cities for an additional ₹499." },
    ],
    overallScores: { aiDiscoverability: 0, productClarity: 0, trustSignals: 0, conversionReadiness: 0 },
  },
  {
    storeId:   "pawsome_pets",
    storeName: "Pawsome Pets",
    email:     "admin@pawsomepets.com",
    domain:    "pawsomepets.myshopify.com",
    category:  "Pet Supplies",
    policies: {
      returnPolicy:   "",
      shippingPolicy: "Standard delivery in 4-6 days. Express available for ₹99 extra.",
      warrantyPolicy: "",
    },
    faqs: [
      { question: "Are your pet food products FSSAI certified?", answer: "Yes, all edible pet products sold on Pawsome are FSSAI certified." },
    ],
    overallScores: { aiDiscoverability: 0, productClarity: 0, trustSignals: 0, conversionReadiness: 0 },
  },
  {
    storeId:   "brewlab_coffee",
    storeName: "BrewLab Coffee Co.",
    email:     "admin@brewlabcoffee.com",
    domain:    "brewlabcoffee.myshopify.com",
    category:  "Food & Beverage",
    policies: {
      returnPolicy:   "Due to food safety, we do not accept returns on coffee products. If your order arrives damaged, contact us within 48 hours with photos.",
      shippingPolicy: "All orders dispatched within 24 hours. Delivered in 2-4 business days. Free shipping above ₹799.",
      warrantyPolicy: "",
    },
    faqs: [
      { question: "How long does your coffee stay fresh after roasting?", answer: "Our coffee is best consumed within 4-6 weeks of the roast date. All bags include a one-way valve to preserve freshness." },
      { question: "Do you offer subscriptions?",    answer: "Yes! Subscribe & Save plans are available with 10% discount and free shipping on every order." },
      { question: "Are your coffees single origin?", answer: "We offer both single origin and blended options. Single origin coffees are labelled with farm and region details." },
    ],
    overallScores: { aiDiscoverability: 0, productClarity: 0, trustSignals: 0, conversionReadiness: 0 },
  },
];

const products = [
  // ── PeakTrail Gear ──────────────────────────────────────────────────────────
  {
    id: "pt-001", storeId: "peaktrail", title: "TrailBlaze X",
    description: "Premium outdoor footwear.",
    category: "Shoes", price: 4999, currency: "INR", reviews: 2, rating: 3.1,
    tags: ["outdoor"],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    material: "", targetGender: "", sizes: [], inStock: true,
  },
  {
    id: "pt-002", storeId: "peaktrail", title: "Waterproof Hiking Shoes for Men",
    description: "Waterproof trekking shoes designed for rocky terrain and mountain hiking. Features anti-slip sole, breathable mesh lining, and reinforced toe cap. Suitable for trails up to 4000m altitude.",
    category: "Shoes", price: 4599, currency: "INR", reviews: 143, rating: 4.7,
    tags: ["waterproof", "trekking", "hiking", "mens"],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1520316587275-5e4f06f355e6?w=800&q=80",
    ],
    material: "Synthetic leather, mesh", targetGender: "Men", sizes: ["7","8","9","10","11"], inStock: true,
  },
  {
    id: "pt-003", storeId: "peaktrail", title: "Summit Pro Backpack 45L",
    description: "Carry your adventure gear with ease.",
    category: "Bags", price: 3499, currency: "INR", reviews: 11, rating: 3.8,
    tags: ["backpack"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    material: "", targetGender: "", sizes: [], inStock: true,
  },
  {
    id: "pt-004", storeId: "peaktrail", title: "Lightweight Trekking Poles - Aluminium, Foldable, Anti-Shock",
    description: "Foldable aluminium trekking poles with anti-shock mechanism and ergonomic grip. Adjustable height from 100cm to 135cm. Includes carrying bag. Ideal for mountain treks, trail running, and backpacking.",
    category: "Accessories", price: 1899, currency: "INR", reviews: 78, rating: 4.5,
    tags: ["trekking poles", "foldable", "aluminium", "anti-shock"],
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    material: "Aluminium 7075", targetGender: "Unisex", sizes: ["One Size"], inStock: true,
  },
  {
    id: "pt-005", storeId: "peaktrail", title: "Fleece Jacket",
    description: "Stay warm on cold trails.",
    category: "Apparel", price: 2199, currency: "INR", reviews: 5, rating: 3.3,
    tags: ["jacket"],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"],
    material: "", targetGender: "", sizes: [], inStock: false,
  },
  {
    id: "pt-006", storeId: "peaktrail", title: "Hydration Pack 2L - Leak-Proof Water Bladder for Hiking",
    description: "2-litre hydration bladder pack with leak-proof seal, insulated tube, and easy-clean wide mouth. BPA-free food grade material. Fits most 30L-50L backpacks. Keeps water cold for up to 4 hours.",
    category: "Accessories", price: 1299, currency: "INR", reviews: 204, rating: 4.8,
    tags: ["hydration", "water bladder", "BPA-free", "hiking"],
    images: [
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    material: "BPA-free TPU", targetGender: "Unisex", sizes: ["2L"], inStock: true,
  },

  // ── Luminos Skincare ────────────────────────────────────────────────────────
  {
    id: "ls-001", storeId: "luminos_skincare", title: "Vitamin C Brightening Face Serum 30ml - Hyperpigmentation & Dark Spots",
    description: "10% Vitamin C serum with hyaluronic acid and niacinamide. Fades dark spots, brightens skin tone, and boosts collagen production. Suitable for all skin types. Apply 2-3 drops every morning before sunscreen. Results visible in 4 weeks.",
    category: "Serums", price: 799, currency: "INR", reviews: 512, rating: 4.6,
    tags: ["vitamin c", "brightening", "serum", "dark spots", "hyperpigmentation"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    ],
    skinType: "All skin types", keyIngredients: ["Vitamin C 10%", "Hyaluronic Acid", "Niacinamide"], volume: "30ml", inStock: true,
  },
  {
    id: "ls-002", storeId: "luminos_skincare", title: "Face Wash",
    description: "Gentle cleanser for daily use.",
    category: "Cleansers", price: 349, currency: "INR", reviews: 19, rating: 3.5,
    tags: ["face wash"],
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"],
    skinType: "", keyIngredients: [], volume: "", inStock: true,
  },
  {
    id: "ls-003", storeId: "luminos_skincare", title: "SPF 50 Sunscreen with PA++++ - No White Cast, Lightweight",
    description: "Broad spectrum SPF 50 PA++++ sunscreen. Ultra-lightweight, non-greasy formula that leaves no white cast. Water resistant for up to 80 minutes. Suitable for oily and combination skin. Reef-safe formula.",
    category: "Sunscreen", price: 549, currency: "INR", reviews: 889, rating: 4.8,
    tags: ["sunscreen", "SPF 50", "no white cast", "PA++++", "oily skin"],
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    ],
    skinType: "Oily, Combination", keyIngredients: ["Zinc Oxide", "Titanium Dioxide"], volume: "50g", inStock: true,
  },
  {
    id: "ls-004", storeId: "luminos_skincare", title: "Moisturizer",
    description: "Keeps skin soft and hydrated.",
    category: "Moisturizers", price: 499, currency: "INR", reviews: 7, rating: 3.2,
    tags: ["moisturizer"],
    images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&q=80"],
    skinType: "", keyIngredients: [], volume: "", inStock: true,
  },
  {
    id: "ls-005", storeId: "luminos_skincare", title: "Retinol Night Cream 0.3% - Anti-Ageing, Fine Lines & Wrinkles",
    description: "0.3% encapsulated retinol night cream with squalane and ceramides. Reduces fine lines and wrinkles with nightly use. Encapsulated retinol ensures slow release for minimum irritation. Start with 2x/week and build to nightly. Not recommended during pregnancy.",
    category: "Night Creams", price: 999, currency: "INR", reviews: 234, rating: 4.5,
    tags: ["retinol", "anti-ageing", "night cream", "wrinkles", "fine lines"],
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=800&q=80",
    ],
    skinType: "All skin types (except sensitive beginners)", keyIngredients: ["Retinol 0.3%", "Squalane", "Ceramides"], volume: "50ml", inStock: true,
  },
  {
    id: "ls-006", storeId: "luminos_skincare", title: "Lip Balm",
    description: "Moisturising lip balm.",
    category: "Lip Care", price: 149, currency: "INR", reviews: 3, rating: 3.0,
    tags: [],
    images: ["https://images.unsplash.com/photo-1586495777744-4e6232bf4796?w=800&q=80"],
    skinType: "", keyIngredients: [], volume: "", inStock: false,
  },
  {
    id: "ls-007", storeId: "luminos_skincare", title: "Niacinamide 10% + Zinc 1% Pore Minimising Serum - Oil Control",
    description: "10% Niacinamide with 1% Zinc PCA serum. Controls excess sebum, minimises pores, and reduces blemishes. Suitable for oily and acne-prone skin. Lightweight water-based formula. Use twice daily after cleansing.",
    category: "Serums", price: 649, currency: "INR", reviews: 677, rating: 4.7,
    tags: ["niacinamide", "zinc", "pore minimising", "oil control", "acne"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80",
    ],
    skinType: "Oily, Acne-Prone", keyIngredients: ["Niacinamide 10%", "Zinc PCA 1%"], volume: "30ml", inStock: true,
  },

  // ── DeskCraft Home Office ───────────────────────────────────────────────────
  {
    id: "dc-001", storeId: "deskcraft", title: "Standing Desk",
    description: "Good for working at home.",
    category: "Desks", price: 18999, currency: "INR", reviews: 8, rating: 3.6,
    tags: ["desk"],
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"],
    dimensions: "", material: "", weightCapacity: "", inStock: true,
  },
  {
    id: "dc-002", storeId: "deskcraft", title: "Electric Height-Adjustable Standing Desk 140x70cm - Dual Motor, Memory Presets",
    description: "Dual-motor electric standing desk with 4-memory height presets. Height adjustable from 72cm to 120cm. Solid MDF desktop (140x70cm) with scratch-resistant surface. Anti-collision safety mechanism. Supports up to 80kg. Includes cable management tray. Assembles in under 30 minutes.",
    category: "Desks", price: 24999, currency: "INR", reviews: 312, rating: 4.7,
    tags: ["standing desk", "electric", "height adjustable", "dual motor", "home office"],
    images: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c5?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1587212805209-3fa3f1ce7c22?w=800&q=80",
    ],
    dimensions: "140cm x 70cm x 72-120cm", material: "MDF top, Steel frame", weightCapacity: "80kg", inStock: true,
  },
  {
    id: "dc-003", storeId: "deskcraft", title: "Ergonomic Mesh Office Chair with Lumbar Support - Adjustable Armrests",
    description: "Breathable mesh back ergonomic office chair. Features adjustable lumbar support, 3D armrests, tilt tension control, and seat height adjustment (45-55cm). Rated for 8 hours of continuous use. 5-star base with smooth-rolling PU casters. Max load: 120kg.",
    category: "Chairs", price: 12499, currency: "INR", reviews: 541, rating: 4.6,
    tags: ["ergonomic chair", "mesh chair", "lumbar support", "office chair"],
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
      "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=800&q=80",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&q=80",
    ],
    dimensions: "62cm x 65cm x 105-115cm", material: "Breathable mesh, Nylon base", weightCapacity: "120kg", inStock: true,
  },
  {
    id: "dc-004", storeId: "deskcraft", title: "Monitor Stand",
    description: "Raise your monitor height.",
    category: "Accessories", price: 1299, currency: "INR", reviews: 22, rating: 3.9,
    tags: ["monitor stand"],
    images: ["https://images.unsplash.com/photo-1527443224154-c4a573d1b8af?w=800&q=80"],
    dimensions: "", material: "", weightCapacity: "", inStock: true,
  },
  {
    id: "dc-005", storeId: "deskcraft", title: "Dual Monitor Stand - Gas Spring Arms, 17-32 inch Screens",
    description: "Dual monitor gas spring arm stand. Compatible with 17-32 inch monitors up to 8kg each. Full motion: tilt ±45°, swivel 360°, rotate 90° for portrait mode. VESA 75x75 and 100x100 compatible. C-clamp and grommet mount included. Reduces desk clutter and improves posture.",
    category: "Accessories", price: 4999, currency: "INR", reviews: 198, rating: 4.5,
    tags: ["dual monitor stand", "gas spring", "VESA", "monitor arm"],
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&q=80",
    ],
    dimensions: "Arm reach: 45cm per arm", material: "Aluminium alloy", weightCapacity: "8kg per arm", inStock: true,
  },
  {
    id: "dc-006", storeId: "deskcraft", title: "Desk Organiser",
    description: "Organise your desk items neatly.",
    category: "Accessories", price: 699, currency: "INR", reviews: 14, rating: 3.4,
    tags: ["organiser"],
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"],
    dimensions: "", material: "", weightCapacity: "", inStock: true,
  },
  {
    id: "dc-007", storeId: "deskcraft", title: "Anti-Fatigue Standing Mat 90x60cm - Memory Foam, Bevelled Edges",
    description: "Memory foam anti-fatigue mat designed for standing desk users. Dimensions 90x60cm, 20mm thick. Bevelled edges prevent tripping. Non-slip bottom. Reduces leg fatigue and lower back strain by up to 50%. Waterproof and easy-clean surface. Comes with a 2-year warranty.",
    category: "Accessories", price: 2499, currency: "INR", reviews: 167, rating: 4.6,
    tags: ["anti-fatigue mat", "standing mat", "memory foam", "standing desk"],
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    dimensions: "90cm x 60cm x 2cm", material: "Memory foam, PU leather top", weightCapacity: "", inStock: true,
  },

  // ── Pawsome Pets ────────────────────────────────────────────────────────────
  {
    id: "pp-001", storeId: "pawsome_pets", title: "Dog Food",
    description: "Healthy food for your dog.",
    category: "Dog Food", price: 899, currency: "INR", reviews: 6, rating: 3.2,
    tags: ["dog food"],
    images: ["https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&q=80"],
    petType: "", suitableFor: "", weight: "", ingredients: [], inStock: true,
  },
  {
    id: "pp-002", storeId: "pawsome_pets", title: "Royal Canin Maxi Adult Dry Dog Food - Large Breeds 25kg+, 4kg Pack",
    description: "Royal Canin Maxi Adult dry kibble formulated for large breed dogs (25kg+) aged 15 months to 5 years. Supports muscle mass maintenance with 25% protein content. EPA & DHA omega fatty acids promote healthy skin and coat. Promotes digestive health. 4kg resealable pack.",
    category: "Dog Food", price: 2199, currency: "INR", reviews: 423, rating: 4.8,
    tags: ["dog food", "large breed", "dry kibble", "Royal Canin", "adult dog"],
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    ],
    petType: "Dog", suitableFor: "Large breeds 25kg+, Age 15 months to 5 years", weight: "4kg",
    ingredients: ["Dehydrated poultry protein", "Maize", "Rice", "Maize flour", "Chicken fat", "Fish oil"], inStock: true,
  },
  {
    id: "pp-003", storeId: "pawsome_pets", title: "Cat Litter - Odour Control",
    description: "Clumping cat litter with odour control.",
    category: "Cat Supplies", price: 599, currency: "INR", reviews: 31, rating: 3.7,
    tags: ["cat litter"],
    images: ["https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80"],
    petType: "Cat", suitableFor: "", weight: "", ingredients: [], inStock: true,
  },
  {
    id: "pp-004", storeId: "pawsome_pets", title: "Bentonite Clumping Cat Litter 10kg - 99% Dust Free, Activated Charcoal Odour Control",
    description: "Premium bentonite cat litter with activated charcoal. Forms tight clumps for easy scooping, reduces waste and extends litter life. 99% dust-free formula safe for cats and owners with respiratory sensitivity. Unscented. Suitable for multiple cats. 10kg bag covers approx. 4-6 weeks for single cat.",
    category: "Cat Supplies", price: 1299, currency: "INR", reviews: 289, rating: 4.6,
    tags: ["cat litter", "bentonite", "clumping", "odour control", "dust free"],
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800&q=80",
    ],
    petType: "Cat", suitableFor: "All cats, multi-cat households", weight: "10kg",
    ingredients: ["Bentonite clay", "Activated charcoal"], inStock: true,
  },
  {
    id: "pp-005", storeId: "pawsome_pets", title: "Pet Carrier Bag",
    description: "Travel bag for your pet.",
    category: "Travel", price: 1499, currency: "INR", reviews: 9, rating: 3.4,
    tags: ["carrier"],
    images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"],
    petType: "", suitableFor: "", weight: "", ingredients: [], inStock: true,
  },
  {
    id: "pp-006", storeId: "pawsome_pets", title: "Airline-Approved Pet Carrier - Up to 6kg, Foldable, Ventilated Mesh",
    description: "IATA-compliant airline-approved pet carrier for cats and small dogs up to 6kg. Foldable design for easy storage. 4-sided ventilated mesh panels for airflow. Waterproof base with removable fleece mat. Fits under most airline seats (40cm x 25cm x 25cm). Dual zippered entry.",
    category: "Travel", price: 2999, currency: "INR", reviews: 156, rating: 4.5,
    tags: ["pet carrier", "airline approved", "cat carrier", "small dog", "travel"],
    images: [
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&q=80",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80",
    ],
    petType: "Cat, Small Dogs", suitableFor: "Pets up to 6kg", weight: "Carrier weight: 0.8kg", ingredients: [], inStock: true,
  },

  // ── BrewLab Coffee Co. ──────────────────────────────────────────────────────
  {
    id: "bl-001", storeId: "brewlab_coffee", title: "Ethiopia Yirgacheffe Light Roast - Single Origin Whole Bean Coffee 250g",
    description: "Single origin Ethiopian Yirgacheffe coffee, light roasted to highlight its natural floral and fruity notes. Tasting notes: jasmine, bergamot, and blueberry. Washed process. Altitude: 1800-2200m. Roasted in small batches and dispatched within 24 hours of roasting. Best for pour-over, V60, and AeroPress.",
    category: "Whole Bean Coffee", price: 699, currency: "INR", reviews: 341, rating: 4.8,
    tags: ["ethiopia", "yirgacheffe", "light roast", "single origin", "pour over", "whole bean"],
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80",
      "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80",
    ],
    roastLevel: "Light", origin: "Yirgacheffe, Ethiopia", process: "Washed",
    tastingNotes: ["Jasmine", "Bergamot", "Blueberry"], weight: "250g",
    brewMethods: ["Pour Over", "V60", "AeroPress"], inStock: true,
  },
  {
    id: "bl-002", storeId: "brewlab_coffee", title: "House Blend",
    description: "Our popular everyday coffee blend.",
    category: "Ground Coffee", price: 449, currency: "INR", reviews: 18, rating: 3.6,
    tags: ["blend", "coffee"],
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"],
    roastLevel: "", origin: "", process: "", tastingNotes: [], weight: "", brewMethods: [], inStock: true,
  },
  {
    id: "bl-003", storeId: "brewlab_coffee", title: "Cold Brew Concentrate 500ml - Ready to Dilute, 14-Hour Steep",
    description: "Small-batch cold brew concentrate steeped for 14 hours using coarsely ground Arabica beans. Dilute 1:1 with water or milk for a smooth, low-acidity iced coffee. Each 500ml bottle makes 8-10 cups. No added sugar, preservatives, or artificial flavours. Refrigerate after opening, consume within 7 days.",
    category: "Ready to Drink", price: 349, currency: "INR", reviews: 512, rating: 4.7,
    tags: ["cold brew", "concentrate", "iced coffee", "no sugar", "ready to drink"],
    images: [
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
      "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=800&q=80",
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80",
    ],
    roastLevel: "Medium", origin: "Arabica blend", process: "Cold steeped 14 hours",
    tastingNotes: ["Dark chocolate", "Smooth", "Low acidity"], weight: "500ml",
    brewMethods: ["Dilute 1:1"], inStock: true,
  },
  {
    id: "bl-004", storeId: "brewlab_coffee", title: "Coffee",
    description: "Good coffee.",
    category: "Ground Coffee", price: 399, currency: "INR", reviews: 4, rating: 3.0,
    tags: [],
    images: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"],
    roastLevel: "", origin: "", process: "", tastingNotes: [], weight: "", brewMethods: [], inStock: true,
  },
  {
    id: "bl-005", storeId: "brewlab_coffee", title: "Coorg Medium Roast - Indian Single Origin Ground Coffee 200g",
    description: "Medium roasted ground coffee from Coorg (Kodagu), Karnataka — India's coffee belt. Estate-grown Arabica at 1000-1200m altitude. Tasting notes: caramel, milk chocolate, and light citrus. Drip grind suitable for filter coffee, French press, and espresso machines. Vacuum packed for maximum freshness.",
    category: "Ground Coffee", price: 549, currency: "INR", reviews: 228, rating: 4.5,
    tags: ["coorg", "india", "medium roast", "ground coffee", "arabica", "filter coffee"],
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    ],
    roastLevel: "Medium", origin: "Coorg, Karnataka, India", process: "Wet processed",
    tastingNotes: ["Caramel", "Milk chocolate", "Light citrus"], weight: "200g",
    brewMethods: ["Filter", "French Press", "Espresso"], inStock: true,
  },
  {
    id: "bl-006", storeId: "brewlab_coffee", title: "V60 Pour Over Coffee Dripper Kit - Includes 40 Filters, Glass Server",
    description: "Hario-style V60 pour over dripper set. Includes size 02 dripper, 600ml glass server, 40 unbleached paper filters, and a measuring scoop. Compatible with most cup sizes. Makes 1-3 cups per brew. Ideal for light and medium roast coffees. Heat-resistant borosilicate glass server.",
    category: "Brewing Equipment", price: 1499, currency: "INR", reviews: 94, rating: 4.4,
    tags: ["pour over", "V60", "dripper", "brewing kit", "glass server"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ],
    roastLevel: "", origin: "", process: "", tastingNotes: [], weight: "Dripper + 600ml server",
    brewMethods: ["Pour Over"], inStock: true,
  },
  {
    id: "bl-007", storeId: "brewlab_coffee", title: "Instant Coffee Sachet Pack",
    description: "Quick coffee on the go.",
    category: "Instant Coffee", price: 249, currency: "INR", reviews: 11, rating: 3.3,
    tags: ["instant coffee"],
    images: ["https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800&q=80"],
    roastLevel: "", origin: "", process: "", tastingNotes: [], weight: "", brewMethods: [], inStock: true,
  },
];

// ── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB:", MONGO_URI);

    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Store.deleteMany({}),
      Product.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Insert stores
    await Store.insertMany(stores);
    console.log(`📦 Inserted ${stores.length} stores`);

    // Insert products
    await Product.insertMany(products);
    console.log(`🛍️  Inserted ${products.length} products`);

    // Create one User per store, hashing the shared default password
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    const users = stores.map((s) => ({
      email:    s.email,
      password: hashedPassword,
      storeId:  s.storeId,
    }));
    await User.insertMany(users);
    console.log(`👤 Inserted ${users.length} users`);

    console.log("\n✅ Seed complete!\n");
    console.log("Login credentials (password for all: password123)\n");
    stores.forEach((s) =>
      console.log(`  ${s.storeName.padEnd(24)} → ${s.email}`)
    );
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected");
  }
}

seed();