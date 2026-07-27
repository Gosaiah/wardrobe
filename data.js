/* ALTER — shared core data: catalog, images, brands, outfits, resolvers.
   Loaded by wardrobe_v2_18.html (Outfits) and outfit_proposals.html (Proposals).
   SINGLE SOURCE OF TRUTH — edit items and outfits here; both pages read this file.
   Bump DATA_VERSION whenever WARDROBE_DATA or OUTFITS_DEFAULT change so caches refresh. */

const BRANDS = {
  ORTTU:{label:"Orttu",dot:"dot-orttu",tag:"tag-orttu"},
  MINOAR:{label:"Minoar",dot:"dot-minoar",tag:"tag-minoar"},
  RYVK:{label:"RYVK",dot:"dot-ryvk",tag:"tag-ryvk"},
  FRKM:{label:"FRKM",dot:"dot-frkm",tag:"tag-frkm"},
  YASAR:{label:"Ya|Sar",dot:"dot-yasar",tag:"tag-yasar"},
  ARAHANT:{label:"Arahant",dot:"dot-arahant",tag:"tag-arahant"},
  CRAFTD:{label:"CRAFTD",dot:"dot-frkm",tag:"tag-frkm"},
  GASPER:{label:"Gasper",dot:"dot-minoar",tag:"tag-minoar"},
  DERNHOLT:{label:"Dernholt",dot:"dot-yasar",tag:"tag-yasar"},
  SASAIA:{label:"Sasaia",dot:"dot-yasar",tag:"tag-yasar"},
  JAKCUZ:{label:"Jakcuz",dot:"dot-yasar",tag:"tag-yasar"},
  KOE:{label:"Kids of Eden",dot:"dot-ryvk",tag:"tag-ryvk"},
  AMAZON:{label:"Amazon",dot:"dot-frkm",tag:"tag-frkm"},
  HILARYDUFF:{label:"Hilary Duff",dot:"dot-ryvk",tag:"tag-ryvk"},
  TECHWEAR:{label:"Techwear Official",dot:"dot-minoar",tag:"tag-minoar"},
  ZARA:{label:"Zara",dot:"dot-frkm",tag:"tag-frkm"},
  TOGAVIRILIS:{label:"Toga Virilis",dot:"dot-yasar",tag:"tag-yasar"},
  DRMARTENS:{label:"Dr. Martens",dot:"dot-minoar",tag:"tag-minoar"},
  ALO:{label:"Alo",dot:"dot-frkm",tag:"tag-frkm"},
  MUAZOE:{label:"Muazoe",dot:"dot-ryvk",tag:"tag-ryvk"},
};

const BRAND_URLS = {
  ORTTU:"https://orttu.com",MINOAR:"https://minoar.com",RYVK:"https://ryvkstudio.com",
  FRKM:"https://frkm-scd.com",YASAR:"https://ya-sar.com",ARAHANT:"https://www.etsy.com/shop/ArahantStudio",
  CRAFTD:"https://craftdlondon.com",GASPER:"https://gasper.co",
  DERNHOLT:"https://dernholt.com",SASAIA:"https://sasaia.com",
  JAKCUZ:"https://www.amazon.com/stores/Jakcuz/MensShoes/page/AA52872A-0DC9-4C8A-AB12-5DC9F36233BA",
  KOE:"https://kidsofedenla.com",
  AMAZON:"https://www.amazon.com/dp/B0GXDQ1J8N",
  HILARYDUFF:"https://shop.hilaryduff.com/products/mature-photo-tee",
  TECHWEAR:"https://techwearofficial.com",
  TOGAVIRILIS:"https://www.ssense.com/en-us/men/designers/toga-virilis",
  DRMARTENS:"https://www.drmartens.com",
  ALO:"https://www.aloyoga.com",
  MUAZOE:"https://www.muazoe.com"
};

const IMAGES = {
  "New York Jersey Pants":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/1-7_9a8eeee2-36e9-43e7-a575-16eb717b1b05.jpg?v=1729253591",
  "Brunello Pants":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/31Subject-photo-2_b9602a90-516b-431c-a883-abaff3931578.jpg?v=1664459691",
  "Roberto Pants":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/22_1a50a9e6-0274-4348-8bc1-1a5a5dfd1b7e.jpg?v=1671137917",
  "Jesse Top with Scarf":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/55-1_76076a1a-1fef-4bef-86c8-0dd59f36d277.jpg?v=1720214602",
  "Cambridge Skirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/73Subject-photo-2.jpg?v=1671135726",
  "Alejandro Cardigan":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/4_0dfb9b5b-8cde-4711-878c-b65738add53b.jpg?v=1671019814",
  "Christian Shirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/Subject-photo45.jpg?v=1666769684",
  "Roberto Jacket":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/Subject-phot3o69.jpg?v=1662360379",
  "Addams Skirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/11_bfa063cd-f1ab-41e7-ba12-86ce49c76881.jpg?v=1682420753",
  "Porto Long Shirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/18-7_c13b0692-4966-41f8-869a-bd225617e7cf.jpg?v=1689578387",
  "Raphael Shirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/7_5a1decb4-ffa7-4f32-b51a-3d865a54cccf.jpg?v=1663012732",
  "Raphael Jacket":"https://cdn.shopify.com/s/files/1/0033/3676/5493/products/7_5a1decb4-ffa7-4f32-b51a-3d865a54cccf.jpg?v=1663012732",
  "Emanuel Shirt":"https://orttu.com/cdn/shop/files/Emanuel-shirt-w.jpg?v=1722521294",
  "Star Neck Lace Shirt":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/Orttu2_b63b6182-fdd3-425d-a0a2-0989b488717e.jpg?v=1722860216",
  "Walker Denim Skirt":"https://orttu.com/cdn/shop/files/denim-skirt.jpg?v=1721380712",
  "Star Neck Shirt Couture":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/star-neck-couture-shirt.jpg?v=1722959711",
  "Garson Pants":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/4-15_4699ff2b-ac46-4bfb-a691-cf1f50ff863c.jpg?v=1760093103",
  "Star Neck Cardigan Sleeveless":"https://cdn.shopify.com/s/files/1/0033/3676/5493/files/2-10_33001647-139a-4616-a5c4-851098b3c6f2.jpg?v=1720195581",
  "Aspect Layered Construct Skirt Trousers":"https://media.minoar.com/2021/08/Aspect-Layered-Construct-Skirt-Trousers-2.jpg",
  "Quark Linen Cargo Layered Skirt Trousers":"https://media.minoar.com/2020/07/Quark-Linen-Cargo-Layered-Skirt-Trousers-1-2.jpg",
  "Aspect Ripstop Alternated Trousers":"https://media.minoar.com/2021/08/Aspect-Ripstop-Alternated-Trousers-4.jpg",
  "Layered Sleeveless Collar Shirt":"https://media.minoar.com/2019/05/Layered-Sleeveless-Collar-Shirt-5-1.jpg",
  "Layered Sleeveless White Collar Shirt":"https://media.minoar.com/2019/05/Layered-Sleeveless-White-Collar-Shirt-3-1.jpg",
  "Elongated Trigon Shirt":"https://media.minoar.com/2022/05/Minoar-Elongated-Trigon-Shirt-2.jpg",
  "Trigon Layered Sleeveless Shirt":"https://media.minoar.com/2022/05/Trigon-Layered-Sleeveless-Shirt-Ghost.jpg",
  "Trigon Layered Linen Trousers":"https://media.minoar.com/2022/05/Minoar-Trigon-Layered-Linen-Trousers-2.jpg",
  "Wide Layered Crushed Cropped Pants":"https://media.minoar.com/2022/05/Minoar-Wide-Layered-Crushed-Cropped-Pants-1-1.jpg",
  "Graphite External Bias Cargo Trousers":"https://media.minoar.com/2022/05/Minoar-Graphite-External-Bias-Cargo-Trousers-1.jpg",
  "Division Cut Linear Collar Shirt":"https://media.minoar.com/2022/05/Minoar-Division-Cut-Linear-Shirt-2-1.jpg",
  "Fiber Bond Magma Tech Hood Cardigan":"https://media.minoar.com/2024/11/Fiber_Bond_Magma_Tech_Hood_Cardigan_1.jpg",
  "Reverse Edge Construct Jogger":"https://media.minoar.com/2024/11/Minoar_Reverse_Edge_Construct_Jogger_MNR-5.jpg",
  "External Cropped Loose Grey Trousers":"https://media.minoar.com/2021/08/External-Cropped-Loose-Grey-Trousers-2.jpg",
  "Cargo Volume Transform Denim Skirt":"https://media.minoar.com/2024/11/Cargo_Volume_Transform_Denim_Skirt_1.jpg",
  "Reverse Edge Hood Buckle Cardigan":"https://media.minoar.com/2024/11/Reverse_Edge_Hood_Buckle_Cardigan_MNR-11.jpg",
  "Nuance Dyed Refract Segment Track Pants":"https://media.minoar.com/2022/05/Nuance-Dyed-Refract-Segment-Track-Pants-1.jpg",
  "Sleeveless Collar Shirt":"https://media.minoar.com/2018/05/sleeveless-raw-shirt-standing-collar-black-dark_1-1.jpg",
  "Trigon Black Layers Volume Pants":"https://media.minoar.com/2022/05/Minoar-Trigon-Layered-Volume-Pants-1.jpg",
  "Hexa Long Layers Sleeveless Coat":"https://media.minoar.com/2023/12/Minoar-BLACK-LONG-DENIM-HEXA-COAT-1-1.jpg",
  "25FW Layered Belt Apron Skirt":"https://cdn.shopify.com/s/files/1/0607/0494/8305/files/1_b1a049d4-0de0-4da2-a6dc-8ab4dfb1df49.jpg?v=1755683858",
  "Sheer Contrast Floral Print Shirts":"https://cdn.shopify.com/s/files/1/0714/6848/2717/files/SheerContrastFloralPrintShirts_1.jpg?v=1761904504",
  "Fever Arc Sequin Embroidery Vest":"https://cdn.shopify.com/s/files/1/0714/6848/2717/files/FeverArcSequinEmbroideryVest_1.jpg?v=1780040848",
  "Obscure Cloak Fringe Crop Top":"https://cdn.shopify.com/s/files/1/0714/6848/2717/files/ObscureCloakFringeCropTop_1.jpg",
  "Prism Flow Tulle Wide Leg Pants":"https://cdn.shopify.com/s/files/1/0714/6848/2717/files/PrismFlowTulleWideLegPants_1.jpg?v=1780040845",
  "Tone Wave Wide Leg Pants":"https://cdn.shopify.com/s/files/1/0714/6848/2717/files/ToneWaveWideLegPants_1.jpg?v=1763970300",
  "Zipped Tall Boots":"https://cdn.shopify.com/s/files/1/0653/3683/6274/files/boots-2-1.jpg?v=1735836468",
  "Side-Zip Goat Leather Boots":"https://cdn.shopify.com/s/files/1/0653/3683/6274/files/side_zip_goat_leather_boots_1.jpg?v=1739387263",
  "Magi Sentient Robe":"https://i.etsystatic.com/24446956/r/il/ada9fd/2891345427/il_1080xN.2891345427_ab5z.jpg",
  "Rope Wrap Ring":"https://cdn.shopify.com/s/files/1/2219/3483/files/2024-07-02_12-09-44_B_R8_S4__2Kx2K.jpg",
  "Matte Onyx Stone Bracelet":"https://cdn.shopify.com/s/files/1/2219/3483/products/MatteOnyx_Gold_Angle1.png",
  "Double Belcher Bracelet":"https://cdn.shopify.com/s/files/1/2219/3483/files/2024-07-2510-59-00_B_R8_S4__2Kx2K.jpg",
  "Rope + Cuban Bracelet Set":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/3mmr-4mmc-g.jpg?v=1726316558",
  "Lapis Set":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/voidlaset-g_aec7c70e-e657-4edc-808c-4b0ba3e7318c.jpg?v=1764242884",
  "Antique Ring":"https://cdn.shopify.com/s/files/1/2219/3483/files/Antique-ring-gold.jpg?v=1742477115",
  "Arrow Pendant":"https://cdn.shopify.com/s/files/1/2219/3483/files/arrow-pendant-gold.png?v=1747719903",
  "Wing Pendant":"https://cdn.shopify.com/s/files/1/2219/3483/files/wing-pendant-gold.png?v=1747720159",
  "Onyx Clover Stone Bracelet":"https://cdn.shopify.com/s/files/1/2219/3483/files/clover-gold-bracelet.jpg?v=1757071656",
  "Dagger Earring":"https://cdn.shopify.com/s/files/1/2219/3483/products/daggergoldduo.jpg?v=1620673184",
  "Crown Ring":"https://cdn.shopify.com/s/files/1/2219/3483/files/crown-ring-gold.jpg?v=1742477125",
  "Wing Gift Set":"https://cdn.shopify.com/s/files/1/2219/3483/products/WingSetBoxed_Gold.jpg?v=1701808226",
  "Wheat Chain":"https://cdn.shopify.com/s/files/1/2219/3483/products/WingGiftSet_Gold.jpg?v=1701808226",
  "Wheat Bracelet":"https://cdn.shopify.com/s/files/1/2219/3483/products/WingGiftSet_Gold.jpg?v=1701808226",
  "Touch of God Cuff":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/cuff2-g.jpg?v=1729633779",
  "Square Onyx Ring":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/square-onyx-ring-g.jpg?v=1705606430",
  "Touch of God Ring":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/touch-g.jpg?v=1705602506",
  "Havana Ring":"https://cdn.shopify.com/s/files/1/0099/3325/8848/files/havana-g_956f17b2-0e68-41c8-ab0d-e3b20eb9430b.jpg?v=1705616046",
  "Mature Photo Tee":"https://cdn.shopify.com/s/files/1/0739/1438/4562/files/111725_HD_Merch_MatureTee_Front_0f96eca1-a637-42ea-95c9-cd56a01257e6.png?v=1780968724",
  "Oversized Drop Shoulder Tee Brown":"https://m.media-amazon.com/images/I/71QqCozGJML._AC_SY879_.jpg",
  "Oversized Drop Shoulder Tee Blue":"https://m.media-amazon.com/images/I/71uhe+XFmdL._AC_SY879_.jpg",
  "Oversized Drop Shoulder Tee Green":"https://m.media-amazon.com/images/I/71HdB6EaoFL._AC_SY879_.jpg",
  "Pai-Weite High-Top Sneakers White":"https://infinit.store/cdn/shop/files/Bai-wette_Sneakers_white_INFINIT_STORE.png?v=1746632258",
  "Pai-Weite High-Top Sneakers Black":"https://infinit.store/cdn/shop/files/Sc722121697bd443baaa11c7b80bf442fU.png?v=1746631777",
  "Roman Fabric Boots":"https://cdn-images.farfetch-contents.com/15/55/89/60/15558960_29784883_1000.jpg",
  "AJ1131 Chelsea Boots":"https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_706,q_75,w_470/c_scale,h_480/v4/262688M223003_1.jpg",
  "DMXL Zip Leather Chelsea Boots":"https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_706,q_75,w_470/c_scale,h_480/v4/261399M223001_1.jpg",
  "Double Take Short Black":"https://www.aloyoga.com/cdn/shop/files/M6143R_01_b1_s1_a2_1_m214_1024x1024.jpg?v=1756316493",
  "Double Take Short Espresso":"https://www.aloyoga.com/cdn/shop/files/M6143R_04064_b1_s1_a2_1_m214_1024x1024.jpg?v=1746630413",
  "Raye Print Round Neck T-shirt":"https://img.staticdj.com/985bdcaaed58866c33c73ad5012b8d06.jpeg",
  "Kanye West Print Round Neck T-shirt":"https://img.staticdj.com/422ac003abb8990a88b85603203a984d.jpeg",
  "Rhinestone Mesh Crop Shirt":"https://m.media-amazon.com/images/I/71i8XtZ83mL._AC_SL1500_.jpg",
  "Leather Body Chain Harness":"https://m.media-amazon.com/images/I/51NzIqpl9oL._AC_SL1118_.jpg",
  "Patent Leather Chest Harness":"https://m.media-amazon.com/images/I/71CxmcZHGAL._AC_SL1500_.jpg",
  "Cable Knit Sweater Vest Burgundy":"https://m.media-amazon.com/images/I/61U+1k4zyCL._AC_SL1500_.jpg",
  "Cable Knit Sweater Vest Apricot":"https://m.media-amazon.com/images/I/61ZYnlAAyjL._AC_SL1500_.jpg",
  "Fishnet Mock Neck Vest":"https://m.media-amazon.com/images/I/81xNPWJRO0L._AC_SL1500_.jpg",
  "PU Leather Crop Tank":"https://m.media-amazon.com/images/I/7121R43QB7L._AC_SL1500_.jpg",
  "PU Leather Shorts":"https://m.media-amazon.com/images/I/61GoItpAX2L._AC_SY879_.jpg",
  "Latex Hood Mask":"https://m.media-amazon.com/images/I/619jvec3S1L._AC_SL1500_.jpg",
  "PU Leather Lace Up Crop Vest":"https://m.media-amazon.com/images/I/81RAwBMki8L._AC_SL1500_.jpg",
  "Protanopia Cloak Hoodie":"https://kidsofeden.earth/cdn/shop/products/KIDSOFEDENHEAVYWEIGHTHOODIEMEN_STAUPEFRONT-636740.jpg?v=1683087494",
  "Japanese Relaxed Standing Collar Techwear Shirt":"https://cdn.shopify.com/s/files/1/0634/1335/4713/files/Yamamoto-Relaxed-Standing-Collar-Shirt_1.jpg?v=1689561834",
  "Tunic Button-Up Collared Sleeveless":"https://di2ponv0v5otw.cloudfront.net/posts/2026/06/22/6a39a0ec4ba08a69d71db0a4/l_6a46d109a58fa4eaabf78257.jpg",
};

function getImg(name) {
  if (!name) return "";
  if (IMAGES[name]) return IMAGES[name];
  // Try case-insensitive partial match
  const lower = name.toLowerCase();
  const key = Object.keys(IMAGES).find(k => 
    k.toLowerCase() === lower ||
    k.toLowerCase().includes(lower) ||
    lower.includes(k.toLowerCase())
  );
  return key ? IMAGES[key] : "";
}

const WARDROBE_DATA = [
  // ── Orttu ──────────────────────────────────────────────────────────────────
  {id:"o1",name:"New York Jersey Pants",brand:"ORTTU",color:"Black",size:"XL",cat:"Pants",type:"bottom",style:"Contrast",stats:{drama:2,structure:2,skin:1,edge:2,formality:2}},
  {id:"o2",name:"Brunello Pants",brand:"ORTTU",color:"Black",size:"M",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:2,structure:3,skin:1,edge:2,formality:3}},
  {id:"o3",name:"Roberto Pants",brand:"ORTTU",color:"Grey",size:"M",cat:"Pants",type:"bottom",style:"Tonal",stats:{drama:2,structure:3,skin:1,edge:2,formality:3}},
  {id:"o4",name:"Roberto Jacket",brand:"ORTTU",color:"Grey",size:"XXL",cat:"Jacket",type:"outer",style:"Tonal",stats:{drama:3,structure:3,skin:1,edge:2,formality:3}},
  {id:"o5",name:"Porto Long Shirt",brand:"ORTTU",color:"Olive",size:"OS",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:3,structure:2,skin:2,edge:2,formality:3}},
  {id:"o6",name:"Raphael Shirt",brand:"ORTTU",color:"Pink",size:"L",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:3,structure:2,skin:2,edge:2,formality:3}},
  {id:"o7",name:"Raphael Jacket",brand:"ORTTU",color:"Pink",size:"L",cat:"Jacket",type:"outer",style:"Contrast",stats:{drama:3,structure:2,skin:1,edge:2,formality:3}},
  {id:"o8",name:"Addams Skirt",brand:"ORTTU",color:"Black",size:"S",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:3,structure:2,skin:3,edge:3,formality:3}},
  {id:"o9",name:"Emanuel Shirt",brand:"ORTTU",color:"Off-White",size:"M",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:2,structure:2,skin:2,edge:2,formality:3}},
  {id:"o10",name:"Star Neck Lace Shirt",brand:"ORTTU",color:"Off-White",size:"M",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:4,structure:2,skin:2,edge:3,formality:4}},
  {id:"o11",name:"Walker Denim Skirt",brand:"ORTTU",color:"Blue",size:"S",cat:"Skirt",type:"bottom",style:"Contrast",stats:{drama:3,structure:2,skin:3,edge:3,formality:2}},
  {id:"o12",name:"Jesse Top with Scarf",brand:"ORTTU",color:"Black",size:"XL",cat:"Top",type:"top",style:"Dark / Minimal",stats:{drama:4,structure:3,skin:2,edge:3,formality:4}},
  {id:"o13",name:"Christian Shirt",brand:"ORTTU",color:"Black",size:"M",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:2,structure:2,skin:1,edge:3,formality:2}},
  {id:"o14",name:"Cambridge Skirt",brand:"ORTTU",color:"White",size:"S",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:3,structure:2,skin:3,edge:2,formality:3}},
  {id:"o15",name:"Alejandro Cardigan",brand:"ORTTU",color:"Black",size:"OS",cat:"Cardigan",type:"outer",style:"Dark / Minimal",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"o16",name:"Star Neck Shirt Couture",brand:"ORTTU",color:"Beige",size:"L",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:4,structure:3,skin:2,edge:3,formality:4}},
  {id:"o17",name:"Garson Pants",brand:"ORTTU",color:"Ivory",size:"L",cat:"Pants",type:"bottom",style:"Tonal",stats:{drama:2,structure:3,skin:1,edge:2,formality:3}},
  {id:"o18",name:"Star Neck Cardigan Sleeveless",brand:"ORTTU",color:"Green",size:"XL",cat:"Cardigan",type:"top",style:"Contrast",stats:{drama:4,structure:2,skin:3,edge:3,formality:3}},
  // ── Minoar ─────────────────────────────────────────────────────────────────
  {id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR",color:"Black",size:"L",cat:"Skirt-Trouser",type:"bottom",style:"Tonal",stats:{drama:5,structure:5,skin:2,edge:4,formality:4}},
  {id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR",color:"Natural",size:"L",cat:"Skirt-Trouser",type:"bottom",style:"Contrast",stats:{drama:4,structure:4,skin:2,edge:4,formality:3}},
  {id:"m3",name:"Aspect Ripstop Alternated Trousers",brand:"MINOAR",color:"Black",size:"L",cat:"Trousers",type:"bottom",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:1,edge:4,formality:3}},
  {id:"m4",name:"Layered Sleeveless Collar Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:4,edge:4,formality:3}},
  {id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR",color:"White",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:3,structure:4,skin:4,edge:3,formality:3}},
  {id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:3,structure:3,skin:4,edge:3,formality:3}},
  {id:"m7",name:"Elongated Trigon Shirt",brand:"MINOAR",color:"White",size:"XL",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:4,structure:3,skin:2,edge:4,formality:3}},
  {id:"m8",name:"Trigon Layered Sleeveless Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:4,edge:4,formality:3}},
  {id:"m9",name:"Trigon Black Layers Volume Pants",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:1,edge:4,formality:3}},
  {id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR",color:"Grey",size:"L",cat:"Trousers",type:"bottom",style:"Tonal",stats:{drama:3,structure:3,skin:1,edge:3,formality:3}},
  {id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Contrast",stats:{drama:4,structure:3,skin:2,edge:4,formality:3}},
  {id:"m12",name:"Graphite External Bias Cargo Trousers",brand:"MINOAR",color:"Graphite",size:"L",cat:"Trousers",type:"bottom",style:"Contrast",stats:{drama:3,structure:4,skin:1,edge:4,formality:3}},
  {id:"m13",name:"Division Cut Linear Collar Shirt",brand:"MINOAR",color:"White",size:"L",cat:"Shirt",type:"top",style:"Contrast",url:"https://www.minoar.com/product/division-cut-linear-collar-shirt-2/",stats:{drama:4,structure:4,skin:3,edge:4,formality:4}},
  {id:"m14",name:"Fiber Bond Magma Tech Hood Cardigan",brand:"MINOAR",color:"Black",size:"L",cat:"Cardigan",type:"outer",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:1,edge:5,formality:3}},
  {id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:3,structure:3,skin:1,edge:4,formality:2}},
  {id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR",color:"Black",size:"L",cat:"Coat",type:"outer",style:"Dark / Minimal",stats:{drama:5,structure:5,skin:3,edge:5,formality:4}},
  {id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR",color:"Grey",size:"L",cat:"Trousers",type:"bottom",style:"Tonal",stats:{drama:3,structure:3,skin:1,edge:3,formality:3}},
  {id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR",color:"Black",size:"L",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:2,edge:4,formality:3}},
  {id:"m19",name:"Reverse Edge Hood Buckle Cardigan",brand:"MINOAR",color:"Black",size:"L",cat:"Cardigan",type:"outer",style:"Contrast",stats:{drama:4,structure:4,skin:1,edge:5,formality:3}},
  {id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR",color:"Grey",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:3,structure:3,skin:1,edge:3,formality:2}},
  // ── RYVK Studio ────────────────────────────────────────────────────────────
  {id:"r1",name:"Sheer Contrast Floral Print Shirts",brand:"RYVK",color:"Multi",size:"2XL",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:4,structure:2,skin:3,edge:3,formality:3}},
  {id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK",color:"Black",size:"XL",cat:"Vest",type:"top",style:"Night Out",stats:{drama:5,structure:2,skin:4,edge:4,formality:4}},
  {id:"r3",name:"Obscure Cloak Fringe Crop Top",brand:"RYVK",color:"Black/Gold",size:"OS",cat:"Crop Top",type:"top",style:"Night Out",url:"https://ryvkstudio.com/products/obscure-cloak-fringe-crop-top",stats:{drama:5,structure:3,skin:5,edge:5,formality:3}},
  {id:"r4",name:"Prism Flow Tulle Wide Leg Pants",brand:"RYVK",color:"Black",size:"XL",cat:"Pants",type:"bottom",style:"Night Out",stats:{drama:4,structure:2,skin:2,edge:3,formality:3}},
  {id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK",color:"Black",size:"M",cat:"Pants",type:"bottom",style:"Night Out",url:"https://ryvkstudio.com/products/tone-wave-wide-leg-pants",stats:{drama:3,structure:2,skin:2,edge:3,formality:3}},
  // ── FRKM SCD ───────────────────────────────────────────────────────────────
  {id:"f1",name:"25FW Layered Belt Apron Skirt",brand:"FRKM",color:"Black",size:"OS",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:5,structure:4,skin:3,edge:5,formality:4}},
  // ── YA|SAR ─────────────────────────────────────────────────────────────────
  {id:"y1",name:"Zipped Tall Boots",brand:"YASAR",color:"Black",size:"45",cat:"Boots",type:"shoes",style:"Dark / Minimal",stats:{drama:5,structure:4,skin:1,edge:5,formality:4}},
  {id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR",color:"Black",size:"45",cat:"Boots",type:"shoes",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:1,edge:4,formality:4}},
  // ── ARAHANT ────────────────────────────────────────────────────────────────
  {id:"a1",name:"Magi Sentient Robe",brand:"ARAHANT",color:"Black",size:"OS",cat:"Robe",type:"outer",style:"Dark / Minimal",stats:{drama:5,structure:3,skin:2,edge:5,formality:4}},
  // ── Jewelry — CRAFTD London ────────────────────────────────────────────────
  {id:"c1",name:"Rope Wrap Ring",brand:"CRAFTD",color:"Gold",size:"L",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/rope-wrap-ring-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  {id:"c2",name:"Matte Onyx Stone Bracelet",brand:"CRAFTD",color:"Gold",size:"22cm",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/matte-onyx-stone-bracelet-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  {id:"c3",name:"Double Belcher Bracelet",brand:"CRAFTD",color:"Gold",size:"7.5in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/double-belcher-bracelet-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  // ── Jewelry — Gasper ───────────────────────────────────────────────────────
  {id:"g1",name:"Rope + Cuban Bracelet Set",brand:"GASPER",color:"Gold",size:"8in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://gasper.co",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  {id:"g2",name:"Lapis Set",brand:"GASPER",color:"Gold",size:"OS",cat:"Necklace Set",type:"accessory",style:"Contrast",url:"https://gasper.co/products/set-lapis",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  // ── Tops — Techwear Official ───────────────────────────────────────────────
  {id:"tw1",name:"Japanese Relaxed Standing Collar Techwear Shirt",brand:"TECHWEAR",color:"Black",size:"OS",cat:"Shirt",type:"top",style:"Dark / Minimal",url:"https://techwearofficial.com/products/japanese-relaxed-standing-collar-techwear-shirt",stats:{drama:3,structure:3,skin:1,edge:4,formality:3}},
  {id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA",color:"Black",size:"M (worn as men's)",cat:"Vest",type:"outer",style:"Dark / Minimal",url:"https://poshmark.com/listing/Zara-Woman-Womens-Tunic-ButtonUp-Collared-Sleeveless-Black-Polyester-Size-M-6a39a0ec4ba08a69d71db0a4",stats:{drama:4,structure:2,skin:4,edge:3,formality:1}},
  // ── Kids of Eden ───────────────────────────────────────────────────────────
  {id:"koe1",name:"Protanopia Cloak Hoodie",brand:"KOE",color:"Brown",size:"L",cat:"Hoodie",type:"outer",style:"Tonal",img:"https://cdn.shopify.com/s/files/1/0620/3880/2614/products/KIDSOFEDENHEAVYWEIGHTHOODIEMEN_STAUPEFRONT-636740.jpg?v=1683087494",url:"https://kidsofeden.earth/products/protanopia-cloak-hoodie-dust",stats:{drama:2,structure:2,skin:1,edge:2,formality:1}},
  // ── Shoes — Infinitys-Store ────────────────────────────────────────────────
  {id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ",color:"White",size:"45",cat:"Sneakers",type:"shoes",style:"Contrast",url:"https://www.amazon.com/dp/B098QKSBBY",stats:{drama:2,structure:2,skin:1,edge:2,formality:2}},
  {id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ",color:"Black",size:"45",cat:"Sneakers",type:"shoes",style:"Dark / Minimal",url:"https://www.amazon.com/dp/B098QN5GBW",stats:{drama:2,structure:2,skin:1,edge:3,formality:2}},
  // ── Jewelry — Gasper order #96050 ─────────────────────────────────────────
  {id:"g3",name:"Touch of God Cuff",brand:"GASPER",color:"Gold",size:"OS",cat:"Cuff",type:"accessory",style:"Contrast",url:"https://gasper.co/products/creation-of-adam-cuff",stats:{drama:4,structure:2,skin:1,edge:4,formality:3}},
  {id:"g4",name:"Square Onyx Ring",brand:"GASPER",color:"Gold",size:"11",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/square-onyx-ring",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"g5",name:"Touch of God Ring",brand:"GASPER",color:"Gold",size:"8",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/touch-of-god-ring",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"g6",name:"Havana Ring",brand:"GASPER",color:"Gold",size:"8",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/havana",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  // ── Jewelry — Dernholt Stockholm ──────────────────────────────────────────
  {id:"d1",name:"Svart Sten Braided Chain",brand:"DERNHOLT",color:"Black/Gold",size:"OS",cat:"Necklace",type:"accessory",style:"Contrast",url:"https://dernholt.com",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"d2",name:"Battle Rope Bracelet",brand:"DERNHOLT",color:"Gold/Silver",size:"OS",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://dernholt.com",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"d3",name:"Gold Body Chain and Necklace Set",brand:"DERNHOLT",color:"Gold",size:"OS",cat:"Body Chain",type:"accessory",style:"Contrast",url:"https://dernholt.com",stats:{drama:4,structure:2,skin:2,edge:3,formality:3}},
  // ── Shoes — SASAIA ─────────────────────────────────────────────────────────
  {id:"s1",name:"Roman Fabric Boots",brand:"SASAIA",color:"Black",size:"44",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://sasaia.com",stats:{drama:3,structure:3,skin:1,edge:4,formality:3}},
  {id:"tv1",name:"AJ1131 Chelsea Boots",brand:"TOGAVIRILIS",color:"Black",size:"IT 44",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://www.ssense.com/en-us/men",stats:{drama:4,structure:4,skin:1,edge:4,formality:4}},
  {id:"dm1",name:"DMXL Zip Leather Chelsea Boots",brand:"DRMARTENS",color:"Black",size:"UK 10",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://www.drmartens.com",stats:{drama:3,structure:4,skin:1,edge:4,formality:3}},
  {id:"c8",name:"Dagger Earring",brand:"CRAFTD",color:"Gold",size:"Pair",cat:"Earring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/dagger-earring-gold",stats:{drama:3,structure:1,skin:2,edge:3,formality:3}},
  {id:"c9",name:"Crown Ring",brand:"CRAFTD",color:"Gold",size:"M",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/crown-ring-gold",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"c10",name:"Wing Gift Set",brand:"CRAFTD",color:"Gold",size:"L/XL",cat:"Set",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",stats:{drama:3,structure:1,skin:1,edge:3,formality:3}},
  {id:"c11",name:"Wheat Chain",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Necklace",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  {id:"c12",name:"Wheat Bracelet",brand:"CRAFTD",color:"Gold",size:"L/XL",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},
  // ── Jewelry — CRAFTD order #925813 ────────────────────────────────────────
  {id:"c4",name:"Antique Ring",brand:"CRAFTD",color:"Gold",size:"L",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/antique-ring-gold",stats:{drama:3,structure:2,skin:1,edge:3,formality:3}},
  {id:"c5",name:"Arrow Pendant",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Pendant",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/arrow-gold",stats:{drama:3,structure:1,skin:1,edge:3,formality:3}},
  {id:"c6",name:"Wing Pendant",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Pendant",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gold",stats:{drama:3,structure:1,skin:1,edge:3,formality:3}},
  {id:"c7",name:"Onyx Clover Stone Bracelet",brand:"CRAFTD",color:"Gold",size:"8.5in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/onyx-clover-stone-bracelet-gold",stats:{drama:2,structure:1,skin:1,edge:2,formality:2}},

  // Tops — Oversized Drop Shoulder Tee (Amazon) x3
  {id:"hd1",name:"Mature Photo Tee",brand:"HILARYDUFF",color:"Black",size:"L",cat:"T-Shirt",type:"top",url:"https://shop.hilaryduff.com/products/mature-photo-tee",stats:{drama:3,structure:1,skin:1,edge:3,formality:1}},
  {id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON",color:"Brown",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:1,skin:1,edge:2,formality:1}},
  {id:"am2",name:"Oversized Drop Shoulder Tee Blue",brand:"AMAZON",color:"Blue",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:1,skin:1,edge:2,formality:1}},
  {id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON",color:"Green",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:1,skin:1,edge:2,formality:1}},
  {id:"am4",name:"Rhinestone Mesh Crop Shirt",brand:"AMAZON",color:"Black",size:"L",cat:"Shirt",type:"top",url:"https://www.amazon.com/dp/B0CDG4DY4H",stats:{drama:4.5,structure:1,skin:4,edge:4,formality:1}},
  {id:"am5",name:"Leather Body Chain Harness",brand:"AMAZON",color:"Black",size:"OS",cat:"Harness",type:"acc",url:"https://www.amazon.com/dp/B0BXT7V1SN",stats:{drama:4,structure:3,skin:3,edge:5,formality:1}},
  {id:"am6",name:"Patent Leather Chest Harness",brand:"AMAZON",color:"Black",size:"OS",cat:"Harness",type:"acc",url:"https://www.amazon.com/dp/B0CRP7D3B7",stats:{drama:4,structure:3,skin:3,edge:5,formality:1}},
  {id:"am7",name:"Cable Knit Sweater Vest Burgundy",brand:"AMAZON",color:"Burgundy",size:"S",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0FHTQV7RM",stats:{drama:2,structure:3,skin:1,edge:1,formality:3.5}},
  {id:"am8",name:"Cable Knit Sweater Vest Apricot",brand:"AMAZON",color:"Apricot",size:"L",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0DGXZBYCP",stats:{drama:2,structure:3,skin:1,edge:1,formality:3.5}},
  {id:"am9",name:"Fishnet Mock Neck Vest",brand:"AMAZON",color:"Black",size:"XL",cat:"Tank",type:"top",url:"https://www.amazon.com/dp/B0CT2NXSJ4",stats:{drama:3.5,structure:1,skin:4,edge:4,formality:1}},
  {id:"am10",name:"PU Leather Crop Tank",brand:"AMAZON",color:"Black",size:"XXL",cat:"Tank",type:"top",url:"https://www.amazon.com/dp/B0C22Z7XT9",stats:{drama:4,structure:2,skin:3,edge:4.5,formality:1}},
  {id:"am11",name:"PU Leather Shorts",brand:"AMAZON",color:"Black",size:"XXL",cat:"Shorts",type:"bottom",url:"https://www.amazon.com/dp/B0C22Z7XT9",stats:{drama:3.5,structure:2,skin:3.5,edge:4,formality:1}},
  {id:"am12",name:"Latex Hood Mask",brand:"AMAZON",color:"Black",size:"XL",cat:"Mask",type:"acc",url:"https://www.amazon.com/dp/B0FQV3N3KS",stats:{drama:5,structure:2,skin:0,edge:5,formality:1}},
  {id:"am13",name:"PU Leather Lace Up Crop Vest",brand:"AMAZON",color:"Black",size:"XL",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0FHK64N8T",stats:{drama:4,structure:2,skin:3.5,edge:4.5,formality:1}},
  // ── ALO ──────────────────────────────────────────────────────────────────────
  {id:"al1",name:"Double Take Short Black",brand:"ALO",color:"Black",size:"M",cat:"Shorts",type:"bottom",style:"Dark / Minimal",url:"https://www.aloyoga.com/products/m6143r-7-double-take-short-black",stats:{drama:2,structure:1,skin:3,edge:2,formality:1}},
  {id:"al2",name:"Double Take Short Espresso",brand:"ALO",color:"Espresso",size:"M",cat:"Shorts",type:"bottom",style:"Tonal",url:"https://www.aloyoga.com/products/m6143r-7-double-take-short-espresso",stats:{drama:2,structure:1,skin:3,edge:2,formality:1}},
  // ── MUAZOE ───────────────────────────────────────────────────────────────────
  {id:"mz1",name:"Raye Print Round Neck T-shirt",brand:"MUAZOE",color:"Brown",size:"L",cat:"T-Shirt",type:"top",style:"Tonal",url:"https://www.muazoe.com/products/raye-print-round-neck-t-shirt-15",stats:{drama:3,structure:1,skin:1,edge:3,formality:1}},
  {id:"mz2",name:"Kanye West Print Round Neck T-shirt",brand:"MUAZOE",color:"Grey",size:"L",cat:"T-Shirt",type:"top",style:"Tonal",url:"https://www.muazoe.com/products/kanye-west-print-round-neck-t-shirt-20",stats:{drama:3,structure:1,skin:1,edge:3,formality:1}},
];

const OUTFITS_DEFAULT = [
  {id:1,name:"All Black Structured",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Top",id:"o12",name:"Jesse Top with Scarf",brand:"ORTTU"},{role:"Bottom",id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:2,name:"Monochrome Grey",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Top",id:"m4",name:"Layered Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Outer",id:"o4",name:"Roberto Jacket",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:3,name:"White / Off-White Contrast",vibe:"Contrast",tags:["contrast"],persona:"wanderer",pieces:[{role:"Top",id:"m13",name:"Division Cut Linear Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m12",name:"Graphite External Bias Cargo Trousers",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:4,name:"Deconstructed Layers",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"m7",name:"Elongated Trigon Shirt",brand:"MINOAR"},{role:"Bottom",id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:5,name:"Avant-Garde Casual",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"o13",name:"Christian Shirt",brand:"ORTTU"},{role:"Bottom",id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR"},{role:"Outer",id:"m14",name:"Fiber Bond Magma Tech Hood Cardigan",brand:"MINOAR"}]},
  {id:6,name:"Full Minoar Skirt Trouser",vibe:"Tonal",tags:["dark","tonal"],persona:"overlord",pieces:[{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:7,name:"Earth Tone Mix",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Top",id:"o5",name:"Porto Long Shirt",brand:"ORTTU"},{role:"Bottom",id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:8,name:"Linen & Lace",vibe:"Contrast",tags:["contrast"],persona:"night-shift",pieces:[{role:"Top",id:"o10",name:"Star Neck Lace Shirt",brand:"ORTTU"},{role:"Bottom",id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:9,name:"Pink Power Set",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o6",name:"Raphael Shirt",brand:"ORTTU"},{role:"Bottom",id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR"},{role:"Outer",id:"o7",name:"Raphael Jacket",brand:"ORTTU"}]},
  {id:10,name:"Dark Academia",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"o13",name:"Christian Shirt",brand:"ORTTU"},{role:"Bottom",id:"o2",name:"Brunello Pants",brand:"ORTTU"},{role:"Outer",id:"o15",name:"Alejandro Cardigan",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:11,name:"Textured Black + Blue Pop",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o13",name:"Christian Shirt",brand:"ORTTU"},{role:"Bottom",id:"o11",name:"Walker Denim Skirt",brand:"ORTTU"},{role:"Outer",id:"m19",name:"Reverse Edge Hood Buckle Cardigan",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:12,name:"Ivory/Cream Editorial",vibe:"Tonal",tags:["tonal"],persona:"viceroy",pieces:[{role:"Top",id:"o16",name:"Star Neck Shirt Couture",brand:"ORTTU"},{role:"Bottom",id:"o17",name:"Garson Pants",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:13,name:"Bold Green Statement",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o18",name:"Star Neck Cardigan Sleeveless",brand:"ORTTU"},{role:"Bottom",id:"o1",name:"New York Jersey Pants",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:14,name:"Grid + Cargo",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"m4",name:"Layered Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"o14",name:"Cambridge Skirt",brand:"ORTTU"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:15,name:"Full Minoar Dark",vibe:"Dark / Minimal",tags:["dark","tonal"],persona:"overlord",pieces:[{role:"Top",id:"m14",name:"Fiber Bond Magma Tech Hood Cardigan",brand:"MINOAR"},{role:"Bottom",id:"m3",name:"Aspect Ripstop Alternated Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:16,name:"Fringe Cloak Night",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r3",name:"Obscure Cloak Fringe Crop Top",brand:"RYVK"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:17,name:"Off-White Contrast",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o9",name:"Emanuel Shirt",brand:"ORTTU"},{role:"Bottom",id:"m3",name:"Aspect Ripstop Alternated Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:18,name:"Print + Dark Base",vibe:"Contrast",tags:["contrast"],persona:"night-shift",pieces:[{role:"Top",id:"r1",name:"Sheer Contrast Floral Print Shirts",brand:"RYVK"},{role:"Bottom",id:"m12",name:"Graphite External Bias Cargo Trousers",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:19,name:"Sequin Vest Night",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:20,name:"Apron Skirt Statement",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Top",id:"m8",name:"Trigon Layered Sleeveless Shirt",brand:"MINOAR"},{role:"Bottom",id:"f1",name:"25FW Layered Belt Apron Skirt",brand:"FRKM"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:21,name:"Volume Silhouette",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m9",name:"Trigon Black Layers Volume Pants",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:22,name:"Addams After Dark",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Top",id:"m8",name:"Trigon Layered Sleeveless Shirt",brand:"MINOAR"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:23,name:"Couture Contrast",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o16",name:"Star Neck Shirt Couture",brand:"ORTTU"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:24,name:"White / Grey Columns",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Top",id:"m7",name:"Elongated Trigon Shirt",brand:"MINOAR"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:25,name:"Earth Cloak",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Outer",id:"koe1",name:"Protanopia Cloak Hoodie",brand:"KOE"},{role:"Bottom",id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR"},{role:"Boots",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:26,name:"Robe Statement",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Outer",id:"a1",name:"Magi Sentient Robe",brand:"ARAHANT"},{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m3",name:"Aspect Ripstop Alternated Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:27,name:"Techwear Cross",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Top",id:"tw1",name:"Japanese Relaxed Standing Collar Techwear Shirt",brand:"TECHWEAR"},{role:"Bottom",id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR"},{role:"Outer",id:"m14",name:"Fiber Bond Magma Tech Hood Cardigan",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:28,name:"Night Tone Wave",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK"},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:29,name:"RYVK Floral Night",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r1",name:"Sheer Contrast Floral Print Shirts",brand:"RYVK"},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:30,name:"Blue Volume Night",vibe:"Night Out",tags:["night"],persona:"civilian",pieces:[{role:"Top",id:"am2",name:"Oversized Drop Shoulder Tee Blue",brand:"AMAZON"},{role:"Bottom",id:"m9",name:"Trigon Black Layers Volume Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:31,name:"Grey Column",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Top",id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Outer",id:"m19",name:"Reverse Edge Hood Buckle Cardigan",brand:"MINOAR"},{role:"Boots",id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR"}]},
  {id:32,name:"Black Lace Contrast",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"o10",name:"Star Neck Lace Shirt",brand:"ORTTU"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:33,name:"Green Contrast",vibe:"Contrast",tags:["contrast"],persona:"civilian",pieces:[{role:"Top",id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON"},{role:"Bottom",id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:34,name:"Techwear Grey Column",vibe:"Dark / Minimal",tags:["dark"],source:"detected",persona:"civilian",pieces:[{role:"Top",id:"tw1",name:"Japanese Relaxed Standing Collar Techwear Shirt",brand:"TECHWEAR"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:35,name:"Portrait Tee Volume",vibe:"Dark / Minimal",tags:["dark"],source:"detected",persona:"civilian",pieces:[{role:"Top",id:"hd1",name:"Mature Photo Tee",brand:"HILARYDUFF"},{role:"Bottom",id:"m9",name:"Trigon Black Layers Volume Pants",brand:"MINOAR"},{role:"Boots",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:36,name:"Cardigan Work Day",vibe:"Dark / Minimal",tags:["dark"],persona:"overlord",pieces:[{role:"Top",id:"m4",name:"Layered Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR"},{role:"Outer",id:"o15",name:"Alejandro Cardigan",brand:"ORTTU"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:37,name:"Porto Linen",vibe:"Tonal",tags:["tonal"],persona:"wanderer",pieces:[{role:"Top",id:"o5",name:"Porto Long Shirt",brand:"ORTTU"},{role:"Bottom",id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:38,name:"Brown Tonal Work",vibe:"Tonal",tags:["tonal"],persona:"civilian",pieces:[{role:"Top",id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON"},{role:"Bottom",id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:39,name:"Open Vest Bar Night",vibe:"Dark / Minimal",tags:["dark"],source:"detected",persona:"night-shift",pieces:[{role:"Outer",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:40,name:"Smoke Column",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:52,name:"Burgundy Cargo Tuck",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"am7",name:"Cable Knit Sweater Vest Burgundy",brand:"AMAZON"},{role:"Bottom",id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:46,name:"PU Tank Night",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am10",name:"PU Leather Crop Tank",brand:"AMAZON"},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:49,name:"Warm Linen Editorial",vibe:"Tonal",tags:["tonal"],persona:"viceroy",pieces:[{role:"Vest",id:"am8",name:"Cable Knit Sweater Vest Apricot",brand:"AMAZON"},{role:"Bottom",id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR"},{role:"Shoes",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:47,name:"Sequin After Dark",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:50,name:"Walker Blue Contrast",vibe:"Contrast",tags:["contrast"],persona:"civilian",pieces:[{role:"Top",id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"o11",name:"Walker Denim Skirt",brand:"ORTTU"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:42,name:"Fishnet Harness",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am9",name:"Fishnet Mock Neck Vest",brand:"AMAZON"},{role:"Harness",id:"am6",name:"Patent Leather Chest Harness",brand:"AMAZON"},{role:"Bottom",id:"am11",name:"PU Leather Shorts",brand:"AMAZON"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:43,name:"Rhinestone Hexa",vibe:"Night Out",tags:["night"],persona:"overlord",pieces:[{role:"Top",id:"am4",name:"Rhinestone Mesh Crop Shirt",brand:"AMAZON"},{role:"Bottom",id:"f1",name:"25FW Layered Belt Apron Skirt",brand:"FRKM"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:45,name:"PU Harness Construct",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am13",name:"PU Leather Lace Up Crop Vest",brand:"AMAZON"},{role:"Harness",id:"am5",name:"Leather Body Chain Harness",brand:"AMAZON"},{role:"Bottom",id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:53,name:"Brown Tonal Ease",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Boots",id:"dm1",name:"DMXL Zip Leather Chelsea Boots",brand:"DRMARTENS"}]},
  {id:54,name:"Linen Off Day",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON"},{role:"Bottom",id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR"},{role:"Boots",id:"tv1",name:"AJ1131 Chelsea Boots",brand:"TOGAVIRILIS"}]},
  {id:55,name:"Summer Shorts",vibe:"Contrast",tags:["contrast"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"am2",name:"Oversized Drop Shoulder Tee Blue",brand:"AMAZON"},{role:"Bottom",id:"am11",name:"PU Leather Shorts",brand:"AMAZON"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:56,name:"Cloak Hoodie Weekend",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Outer",id:"koe1",name:"Protanopia Cloak Hoodie",brand:"KOE"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Boots",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:57,name:"Crushed Casual",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON"},{role:"Bottom",id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:58,name:"Linen Cargo Easy",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON"},{role:"Bottom",id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:59,name:"Grey Print Jogger",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"mz2",name:"Kanye West Print Round Neck T-shirt",brand:"MUAZOE"},{role:"Bottom",id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:60,name:"Open Collar",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",persona:"wanderer",pieces:[{role:"Outer",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA"},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:61,name:"Open Collar Day",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",persona:"civilian",pieces:[{role:"Outer",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:62,name:"Raye Print Lounge",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"mz1",name:"Raye Print Round Neck T-shirt",brand:"MUAZOE"},{role:"Bottom",id:"al1",name:"Double Take Short Black",brand:"ALO"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:63,name:"Photo Tee Espresso",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",persona:"civilian",pieces:[{role:"Top",id:"hd1",name:"Mature Photo Tee",brand:"HILARYDUFF"},{role:"Bottom",id:"al2",name:"Double Take Short Espresso",brand:"ALO"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]}
];

const DATA_VERSION = 33;

// Item resolution — prefer stable id, fall back to name+brand (rename-safe).
// Uses the page's live `items` list when present (main app includes custom items),
// otherwise falls back to the shared WARDROBE_DATA catalog.
function _allItems(){ try { if (typeof items !== 'undefined' && Array.isArray(items)) return items; } catch(e){} return WARDROBE_DATA; }
function itemById(id){ return id ? _allItems().find(i => i.id === id) : null; }
function itemForPiece(p){
  if (!p) return null;
  return itemById(p.id)
      || _allItems().find(i => i.name === p.name && i.brand === p.brand)
      || _allItems().find(i => i.name === p.name)
      || null;
}
function pieceImg(p){
  const it = itemForPiece(p);
  return (it && (IMAGES[it.name] || it.img)) || (p ? (IMAGES[p.name] || getImg(p.name)) : "") || "";
}
