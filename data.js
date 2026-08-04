/* ALTER — shared core data: catalog, images, brands, outfits, resolvers.
   Loaded by wardrobe_v2_18.html (Outfits) and outfit_proposals.html (Proposals).
   SINGLE SOURCE OF TRUTH — edit items and outfits here; both pages read this file.
   Bump DATA_VERSION whenever WARDROBE_DATA or OUTFITS_DEFAULT change so caches refresh. */

const BRANDS = {
  ORTTU:{label:"Orttu",dot:"dot-orttu",tag:"tag-orttu"},
  RUNDHOLZ:{label:"Rundholz",dot:"dot-yasar",tag:"tag-yasar"},
  MDNT45:{label:"MDNT45",dot:"dot-yasar",tag:"tag-yasar"},
  PUNKRAVE:{label:"Punk Rave",dot:"dot-ryvk",tag:"tag-ryvk"},
  RICKOWENS:{label:"Rick Owens",dot:"dot-yasar",tag:"tag-yasar"},
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
  UNBRANDED:{label:"Unbranded",dot:"dot-frkm",tag:"tag-frkm"},
  DEMONIA:{label:"Demonia",dot:"dot-yasar",tag:"tag-yasar"},
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
  DEMONIA:"https://demoniacult.com",
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
  "Star Neck Lace Shirt":"https://orttu.com/cdn/shop/files/Orttu1_c053d045-81b5-4d2d-bf62-354d37b22a2d.jpg?v=1722852755&width=700",
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
  "AJ1131 Chelsea Boots":"https://img.ssensemedia.com/images/f_auto,w_auto/262688M223003_4/toga-virilis-ssense-exclusive-black-aj1131-chelsea-boots.jpg",
  "DMXL Zip Leather Chelsea Boots":"https://cdn.media.amplience.net/i/drmartens/41070001.84?$smart1024$&fmt=auto",
  "Cargo Asymmetric Skirt":"https://media.minoar.com/2018/05/CARGO-ASYMMETRIC-SKIRT-8.jpg",
  "Relaxed Fit Interlock T-Shirt":"https://static.zara.net/assets/public/f1fd/2f5f/59814389b5cb/675c65b1adc8/05584431507-e1/05584431507-e1.jpg?ts=1783939045384&w=2240",
  "Double Take Short Black":"https://www.aloyoga.com/cdn/shop/files/M6143R_01_b1_s1_a2_1_m214_1024x1024.jpg?v=1756316493",
  "Double Take Short Espresso":"https://www.aloyoga.com/cdn/shop/files/M6143R_04064_b1_s1_a2_1_m214_1024x1024.jpg?v=1746630413",
  "Raye Print Round Neck T-shirt":"https://img.staticdj.com/65ce5223c257a259fed9300c9018178f.jpeg",
  "Kanye West Print Round Neck T-shirt":"https://img.staticdj.com/422ac003abb8990a88b85603203a984d.jpeg",
  "Gold Dragon Cuff":"https://i.ebayimg.com/images/g/~MYAAOSws4llKKwg/s-l1600.jpg",
  "Neptune-210 Platform Boots":"https://www.eandlapparel.com/cdn/shop/files/neptune-210-bvl_7b5bee94-6b39-4171-b282-5de9c4bf5beb.jpg?v=1697650491",
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
  {id:"o1",name:"New York Jersey Pants",brand:"ORTTU",color:"Black",size:"XL",cat:"Pants",type:"bottom",style:"Contrast",stats:{drama:1,structure:1,skin:0,edge:0,formality:2,presence:1,silhouette:0,movement:0,ornament:0}},
  {id:"o2",name:"Brunello Pants",brand:"ORTTU",color:"Black",size:"M",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:2,structure:3,skin:0,edge:0,formality:4,presence:2,silhouette:0,movement:1,ornament:0}},
  {id:"o3",name:"Roberto Pants",brand:"ORTTU",color:"Grey",size:"M",cat:"Pants",type:"bottom",style:"Tonal",stats:{drama:1.5,structure:3,skin:0,edge:0,formality:4,presence:0,silhouette:1.5,movement:1.5,ornament:0},styling:["high-waist"]},
  {id:"o4",name:"Roberto Jacket",brand:"ORTTU",color:"Grey",size:"XXL",cat:"Jacket",type:"outer",style:"Tonal",stats:{drama:2,structure:3,skin:0,edge:0,formality:4,presence:2,silhouette:0,movement:2,ornament:0}},
  {id:"o5",name:"Porto Long Shirt",brand:"ORTTU",color:"Olive",size:"OS",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:3,structure:1,skin:0,edge:0,formality:3,presence:0,silhouette:0,movement:3,ornament:0}},
  {id:"o6",name:"Raphael Shirt",brand:"ORTTU",color:"Pink",size:"L",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:1.5,structure:2,skin:0,edge:0,formality:3.5,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"o7",name:"Raphael Jacket",brand:"ORTTU",color:"Pink",size:"L",cat:"Jacket",type:"outer",style:"Contrast",stats:{drama:2.5,structure:3,skin:0,edge:0,formality:4,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"o8",name:"Addams Skirt",brand:"ORTTU",color:"Black",size:"S",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:2,structure:2,skin:2,edge:0,formality:3,presence:1.5,silhouette:2,movement:0,ornament:0},styling:["high-waist"]},
  {id:"o9",name:"Emanuel Shirt",brand:"ORTTU",color:"Off-White",size:"M",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:0,structure:2,skin:1,edge:0,formality:3,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"o10",name:"Star Neck Lace Shirt",brand:"ORTTU",color:"Off-White",size:"M",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:2,structure:1,skin:1.5,edge:0,formality:1,presence:0,silhouette:0,movement:0,ornament:2}},
  {id:"o11",name:"Walker Denim Skirt",brand:"ORTTU",color:"Blue",size:"S",cat:"Skirt",type:"bottom",style:"Contrast",stats:{drama:2,structure:2,skin:2,edge:1,formality:2,presence:0,silhouette:2,movement:0,ornament:0},styling:["high-waist"]},
  {id:"o12",name:"Jesse Top with Scarf",brand:"ORTTU",color:"Black",size:"XL",cat:"Top",type:"top",style:"Dark / Minimal",stats:{drama:2.5,structure:1,skin:3,edge:0,formality:2,presence:1,silhouette:0,movement:2.5,ornament:1.5}},
  {id:"o13",name:"Christian Shirt",brand:"ORTTU",color:"Black",size:"M",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:1.5,structure:2,skin:1,edge:0,formality:2.5,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"o14",name:"Cambridge Skirt",brand:"ORTTU",color:"White",size:"S",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:1.5,structure:2,skin:2,edge:0,formality:3,presence:0,silhouette:1.5,movement:0,ornament:0},styling:["high-waist"]},
  {id:"o15",name:"Alejandro Cardigan",brand:"ORTTU",color:"Black",size:"OS",cat:"Cardigan",type:"outer",style:"Dark / Minimal",stats:{drama:4,structure:1,skin:4,edge:0,formality:2,presence:1,silhouette:0,movement:4,ornament:0}},
  {id:"o16",name:"Star Neck Shirt Couture",brand:"ORTTU",color:"Beige",size:"L",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:2,structure:3,skin:2,edge:0,formality:4,presence:0,silhouette:0,movement:0,ornament:2}},
  {id:"o17",name:"Garson Pants",brand:"ORTTU",color:"Ivory",size:"L",cat:"Pants",type:"bottom",style:"Tonal",stats:{drama:0,structure:3,skin:1,edge:0,formality:2.5,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"o18",name:"Star Neck Cardigan Sleeveless",brand:"ORTTU",color:"Green",size:"XL",cat:"Cardigan",type:"top",style:"Contrast",stats:{drama:2,structure:1,skin:3.5,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:2}},
  // ── Minoar ─────────────────────────────────────────────────────────────────
  {id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR",color:"Black",size:"L",cat:"Skirt-Trouser",type:"bottom",style:"Tonal",stats:{drama:3,structure:4,skin:0,edge:2,formality:3.5,presence:3,silhouette:2.5,movement:0,ornament:0}},
  {id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR",color:"Natural",size:"L",cat:"Skirt-Trouser",type:"bottom",style:"Contrast",stats:{drama:2.5,structure:3,skin:0,edge:2,formality:3,presence:0,silhouette:2.5,movement:1.5,ornament:0}},
  {id:"m3",name:"Aspect Ripstop Alternated Trousers",brand:"MINOAR",color:"Black",size:"L",cat:"Trousers",type:"bottom",style:"Dark / Minimal",stats:{drama:2.5,structure:3,skin:0,edge:3,formality:3,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"m4",name:"Layered Sleeveless Collar Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:2.5,structure:3,skin:2,edge:2,formality:3,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR",color:"White",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:2,structure:3,skin:2,edge:2,formality:3,presence:2,silhouette:0,movement:0,ornament:0}},
  {id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Tonal",stats:{drama:2.5,structure:3,skin:2,edge:2,formality:3,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"m7",name:"Elongated Trigon Shirt",brand:"MINOAR",color:"White",size:"XL",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:2.5,structure:3,skin:2,edge:2,formality:4,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"m8",name:"Trigon Layered Sleeveless Shirt",brand:"MINOAR",color:"Black",size:"L",cat:"Shirt",type:"top",style:"Dark / Minimal",stats:{drama:3,structure:3,skin:2,edge:2,formality:3,presence:3,silhouette:0,movement:0,ornament:0}},
  {id:"m9",name:"Trigon Black Layers Volume Pants",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:3.5,structure:3,skin:0,edge:2,formality:4,presence:2.5,silhouette:3.5,movement:2,ornament:0},styling:["high-waist"]},
  {id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR",color:"Grey",size:"L",cat:"Trousers",type:"bottom",style:"Tonal",stats:{drama:3.5,structure:2,skin:0,edge:1,formality:4,presence:0,silhouette:3.5,movement:2,ornament:0},styling:["high-waist"]},
  {id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Contrast",stats:{drama:3.5,structure:2,skin:0,edge:2,formality:2.5,presence:1.5,silhouette:3.5,movement:0,ornament:0},styling:["high-waist"]},
  {id:"m12",name:"Graphite External Bias Cargo Trousers",brand:"MINOAR",color:"Graphite",size:"L",cat:"Trousers",type:"bottom",style:"Contrast",stats:{drama:2.5,structure:3,skin:0,edge:3,formality:2,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"m13",name:"Division Cut Linear Collar Shirt",brand:"MINOAR",color:"White",size:"L",cat:"Shirt",type:"top",style:"Contrast",url:"https://www.minoar.com/product/division-cut-linear-collar-shirt-2/",stats:{drama:2,structure:3,skin:1,edge:2,formality:3,presence:2,silhouette:0,movement:0,ornament:0}},
  {id:"m14",name:"Fiber Bond Magma Tech Hood Cardigan",brand:"MINOAR",color:"Black",size:"L",cat:"Cardigan",type:"outer",style:"Dark / Minimal",stats:{drama:3,structure:3,skin:0,edge:3,formality:2.5,presence:3,silhouette:0,movement:3,ornament:0}},
  {id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR",color:"Black",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:1.5,structure:2,skin:0,edge:3,formality:1.5,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR",color:"Black",size:"L",cat:"Coat",type:"outer",style:"Dark / Minimal",stats:{drama:3.5,structure:4,skin:2,edge:2,formality:3.5,presence:3.5,silhouette:3,movement:3,ornament:0},styling:["flowy"]},
  {id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR",color:"Grey",size:"L",cat:"Trousers",type:"bottom",style:"Tonal",stats:{drama:1.5,structure:2,skin:0,edge:1,formality:3,presence:0,silhouette:1.5,movement:0,ornament:0},styling:["high-waist"]},
  {id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR",color:"Black",size:"L",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:4,structure:3,skin:1,edge:2,formality:2,presence:3,silhouette:4,movement:2,ornament:0},styling:["high-waist"]},
  {id:"m19",name:"Reverse Edge Hood Buckle Cardigan",brand:"MINOAR",color:"Black",size:"L",cat:"Cardigan",type:"outer",style:"Contrast",stats:{drama:2,structure:3,skin:0,edge:4,formality:2,presence:2,silhouette:0,movement:0,ornament:0}},
  {id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR",color:"Grey",size:"L",cat:"Pants",type:"bottom",style:"Dark / Minimal",stats:{drama:1.5,structure:2,skin:0,edge:2,formality:1.5,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"m21",name:"Cargo Asymmetric Skirt",brand:"MINOAR",color:"Black",size:"L",cat:"Skirt",type:"bottom",style:"Dark / Minimal",url:"https://www.minoar.com/product/cargo-men-skirt/",stats:{drama:2.75,structure:3,skin:0,edge:3,formality:2,presence:2.75,silhouette:1.5,movement:0,ornament:0}},
  // ── RYVK Studio ────────────────────────────────────────────────────────────
  {id:"r1",name:"Sheer Contrast Floral Print Shirts",brand:"RYVK",color:"Multi",size:"2XL",cat:"Shirt",type:"top",style:"Contrast",stats:{drama:2.5,structure:1,skin:3,edge:0,formality:1,presence:0,silhouette:0,movement:0,ornament:2.5}},
  {id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK",color:"Black",size:"XL",cat:"Vest",type:"top",style:"Night Out",stats:{drama:4,structure:2,skin:4,edge:1,formality:1,presence:1.5,silhouette:0,movement:1.5,ornament:4}},
  {id:"r3",name:"Obscure Cloak Fringe Crop Top",brand:"RYVK",color:"Black/Gold",size:"OS",cat:"Crop Top",type:"top",style:"Night Out",url:"https://ryvkstudio.com/products/obscure-cloak-fringe-crop-top",stats:{drama:5,structure:2,skin:5,edge:3,formality:0,presence:1.5,silhouette:0,movement:5,ornament:4.5},styling:["flowy"]},
  {id:"r4",name:"Prism Flow Tulle Wide Leg Pants",brand:"RYVK",color:"Black",size:"XL",cat:"Pants",type:"bottom",style:"Night Out",stats:{drama:4,structure:1,skin:3,edge:0,formality:3,presence:1,silhouette:4,movement:4,ornament:0},styling:["high-waist","flowy"]},
  {id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK",color:"Black",size:"M",cat:"Pants",type:"bottom",style:"Night Out",url:"https://ryvkstudio.com/products/tone-wave-wide-leg-pants",stats:{drama:4,structure:1,skin:0,edge:0,formality:3,presence:1,silhouette:4,movement:3.5,ornament:0},styling:["high-waist","flowy"]},
  // ── FRKM SCD ───────────────────────────────────────────────────────────────
  {id:"f1",name:"25FW Layered Belt Apron Skirt",brand:"FRKM",color:"Black",size:"OS",cat:"Skirt",type:"bottom",style:"Dark / Minimal",stats:{drama:3.5,structure:3,skin:2,edge:3,formality:1,presence:2.5,silhouette:3.5,movement:1.5,ornament:0}},
  // ── YA|SAR ─────────────────────────────────────────────────────────────────
  {id:"y1",name:"Zipped Tall Boots",brand:"YASAR",color:"Black",size:"45",cat:"Boots",type:"shoes",style:"Dark / Minimal",stats:{drama:4,structure:4,skin:0,edge:4,formality:3,presence:4,silhouette:0,movement:0,ornament:0}},
  {id:"y2",name:"Side-Zip Goat Leather Boots",brand:"YASAR",color:"Black",size:"45",cat:"Boots",type:"shoes",style:"Dark / Minimal",stats:{drama:2.5,structure:4,skin:0,edge:3,formality:3,presence:2.5,silhouette:0,movement:0,ornament:0}},
  // ── ARAHANT ────────────────────────────────────────────────────────────────
  {id:"a1",name:"Magi Sentient Robe",brand:"ARAHANT",color:"Black",size:"OS",cat:"Robe",type:"outer",style:"Dark / Minimal",stats:{drama:3.5,structure:1,skin:2,edge:1,formality:3,presence:3.5,silhouette:3,movement:3,ornament:0},styling:["flowy"]},
  // ── Jewelry — CRAFTD London ────────────────────────────────────────────────
  {id:"c1",name:"Rope Wrap Ring",brand:"CRAFTD",color:"Gold",size:"L",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/rope-wrap-ring-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c2",name:"Matte Onyx Stone Bracelet",brand:"CRAFTD",color:"Gold",size:"22cm",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/matte-onyx-stone-bracelet-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c3",name:"Double Belcher Bracelet",brand:"CRAFTD",color:"Gold",size:"7.5in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/double-belcher-bracelet-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Jewelry — Gasper ───────────────────────────────────────────────────────
  {id:"g1",name:"Rope + Cuban Bracelet Set",brand:"GASPER",color:"Gold",size:"8in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://gasper.co",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"g2",name:"Lapis Set",brand:"GASPER",color:"Gold",size:"OS",cat:"Necklace Set",type:"accessory",style:"Contrast",url:"https://gasper.co/products/set-lapis",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Tops — Techwear Official ───────────────────────────────────────────────
  {id:"tw1",name:"Japanese Relaxed Standing Collar Techwear Shirt",brand:"TECHWEAR",color:"Black",size:"OS",cat:"Shirt",type:"top",style:"Dark / Minimal",url:"https://techwearofficial.com/products/japanese-relaxed-standing-collar-techwear-shirt",stats:{drama:1.5,structure:2,skin:0,edge:3,formality:3,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA",color:"Black",size:"M (worn as men's)",cat:"Top",type:"top",style:"Dark / Minimal",url:"https://poshmark.com/listing/Zara-Woman-Womens-Tunic-ButtonUp-Collared-Sleeveless-Black-Polyester-Size-M-6a39a0ec4ba08a69d71db0a4",stats:{drama:3,structure:2,skin:2,edge:0,formality:1,presence:1.5,silhouette:0,movement:3,ornament:0}},
  {id:"z2",name:"Relaxed Fit Interlock T-Shirt",brand:"ZARA",color:"Khaki",size:"M",cat:"T-Shirt",type:"top",style:"Tonal",url:"https://www.zara.com/us/en/relaxed-fit-interlock-t-shirt--04-p05584471.html",stats:{drama:0,structure:0.5,skin:1,edge:0,formality:1,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Kids of Eden ───────────────────────────────────────────────────────────
  {id:"koe1",name:"Protanopia Cloak Hoodie",brand:"KOE",color:"Brown",size:"L",cat:"Hoodie",type:"outer",style:"Tonal",img:"https://cdn.shopify.com/s/files/1/0620/3880/2614/products/KIDSOFEDENHEAVYWEIGHTHOODIEMEN_STAUPEFRONT-636740.jpg?v=1683087494",url:"https://kidsofeden.earth/products/protanopia-cloak-hoodie-dust",stats:{drama:2,structure:1,skin:0,edge:1,formality:1,presence:0,silhouette:0,movement:2,ornament:0}},
  // ── Shoes — Infinitys-Store ────────────────────────────────────────────────
  {id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ",color:"White",size:"45",cat:"Sneakers",type:"shoes",style:"Contrast",url:"https://www.amazon.com/dp/B098QKSBBY",stats:{drama:0.5,structure:2,skin:0,edge:1,formality:1,presence:0.5,silhouette:0,movement:0,ornament:0}},
  {id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ",color:"Black",size:"45",cat:"Sneakers",type:"shoes",style:"Dark / Minimal",url:"https://www.amazon.com/dp/B098QN5GBW",stats:{drama:0.5,structure:2,skin:0,edge:1,formality:1,presence:0.5,silhouette:0,movement:0,ornament:0}},
  // ── Jewelry — Gasper order #96050 ─────────────────────────────────────────
  {id:"g3",name:"Touch of God Cuff",brand:"GASPER",color:"Gold",size:"OS",cat:"Cuff",type:"accessory",style:"Contrast",url:"https://gasper.co/products/creation-of-adam-cuff",versatile:true,stats:{drama:2,structure:1,skin:0,edge:2,formality:2,presence:0,silhouette:0,movement:0,ornament:2}},
  {id:"g4",name:"Square Onyx Ring",brand:"GASPER",color:"Gold",size:"11",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/square-onyx-ring",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"g5",name:"Touch of God Ring",brand:"GASPER",color:"Gold",size:"8",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/touch-of-god-ring",versatile:true,stats:{drama:0,structure:0,skin:0,edge:1,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"g6",name:"Havana Ring",brand:"GASPER",color:"Gold",size:"8",cat:"Ring",type:"accessory",style:"Contrast",url:"https://gasper.co/products/havana",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Jewelry — Dernholt Stockholm ──────────────────────────────────────────
  {id:"d1",name:"Svart Sten Braided Chain",brand:"DERNHOLT",color:"Black/Gold",size:"OS",cat:"Necklace",type:"accessory",style:"Contrast",url:"https://dernholt.com",versatile:true,stats:{drama:1.5,structure:0,skin:0,edge:1,formality:2,presence:0.5,silhouette:0,movement:1.5,ornament:0}},
  {id:"d2",name:"Battle Rope Bracelet",brand:"DERNHOLT",color:"Gold/Silver",size:"OS",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://dernholt.com",img:"battle-rope-bracelet.jpg",versatile:true,stats:{drama:0,structure:0,skin:0,edge:1,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Shoes — SASAIA ─────────────────────────────────────────────────────────
  {id:"s1",name:"Roman Fabric Boots",brand:"SASAIA",color:"Black",size:"44",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://sasaia.com",stats:{drama:2.5,structure:3,skin:0,edge:2,formality:3,presence:2.5,silhouette:0,movement:0,ornament:0}},
  {id:"tv1",name:"AJ1131 Chelsea Boots",brand:"TOGAVIRILIS",color:"Black",size:"IT 44",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://www.ssense.com/en-us/men",stats:{drama:3,structure:4,skin:0,edge:3,formality:4,presence:3,silhouette:0,movement:0,ornament:0}},
  {id:"dm1",name:"DMXL Zip Leather Chelsea Boots",brand:"DRMARTENS",color:"Black",size:"UK 10",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://www.drmartens.com",stats:{drama:3,structure:4,skin:0,edge:3,formality:3,presence:3,silhouette:0,movement:0,ornament:0}},
  {id:"c8",name:"Dagger Earring",brand:"CRAFTD",color:"Gold",size:"Pair",cat:"Earring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/dagger-earring-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:2,formality:1,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c9",name:"Crown Ring",brand:"CRAFTD",color:"Gold",size:"M",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/crown-ring-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:1,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c10",name:"Wing Gift Set",brand:"CRAFTD",color:"Gold",size:"L/XL",cat:"Set",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c11",name:"Wheat Chain",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Necklace",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",versatile:true,stats:{drama:1.5,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:1.5,ornament:0}},
  {id:"c12",name:"Wheat Bracelet",brand:"CRAFTD",color:"Gold",size:"L/XL",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gift-set-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  // ── Jewelry — CRAFTD order #925813 ────────────────────────────────────────
  {id:"c4",name:"Antique Ring",brand:"CRAFTD",color:"Gold",size:"L",cat:"Ring",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/antique-ring-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c5",name:"Arrow Pendant",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Pendant",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/arrow-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c6",name:"Wing Pendant",brand:"CRAFTD",color:"Gold",size:"OS",cat:"Pendant",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/wing-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"c7",name:"Onyx Clover Stone Bracelet",brand:"CRAFTD",color:"Gold",size:"8.5in",cat:"Bracelet",type:"accessory",style:"Contrast",url:"https://craftdlondon.com/products/onyx-clover-stone-bracelet-gold",versatile:true,stats:{drama:0,structure:0,skin:0,edge:0,formality:2,presence:0,silhouette:0,movement:0,ornament:0}},

  // Tops — Oversized Drop Shoulder Tee (Amazon) x3
  {id:"hd1",name:"Mature Photo Tee",brand:"HILARYDUFF",color:"Black",size:"L",cat:"T-Shirt",type:"top",url:"https://shop.hilaryduff.com/products/mature-photo-tee",stats:{drama:2.5,structure:0,skin:1,edge:0,formality:1,presence:0.5,silhouette:0,movement:0,ornament:2.5}},
  {id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON",color:"Brown",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:0,skin:1,edge:0,formality:1,presence:0,silhouette:2,movement:0,ornament:0}},
  {id:"am2",name:"Oversized Drop Shoulder Tee Blue",brand:"AMAZON",color:"Blue",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:0,skin:1,edge:0,formality:1,presence:0,silhouette:2,movement:0,ornament:0}},
  {id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON",color:"Green",size:"L",cat:"T-Shirt",type:"top",url:"https://www.amazon.com/dp/B0GXDQ1J8N",stats:{drama:2,structure:0,skin:1,edge:0,formality:1,presence:0,silhouette:2,movement:0,ornament:0}},
  {id:"am4",name:"Rhinestone Mesh Crop Shirt",brand:"AMAZON",color:"Black",size:"L",cat:"Shirt",type:"top",url:"https://www.amazon.com/dp/B0CDG4DY4H",stats:{drama:4.5,structure:0,skin:5,edge:2,formality:0,presence:0.5,silhouette:0,movement:0,ornament:4.5}},
  {id:"am5",name:"Leather Body Chain Harness",brand:"AMAZON",color:"Black",size:"OS",cat:"Harness",type:"acc",url:"https://www.amazon.com/dp/B0BXT7V1SN",stats:{drama:4,structure:3,skin:5,edge:5,formality:0,presence:4,silhouette:0,movement:1.5,ornament:0}},
  {id:"am6",name:"Patent Leather Chest Harness",brand:"AMAZON",color:"Black",size:"OS",cat:"Harness",type:"acc",url:"https://www.amazon.com/dp/B0CRP7D3B7",stats:{drama:4,structure:3,skin:5,edge:5,formality:0,presence:4,silhouette:0,movement:0,ornament:0}},
  {id:"am7",name:"Cable Knit Sweater Vest Burgundy",brand:"AMAZON",color:"Burgundy",size:"S",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0FHTQV7RM",stats:{drama:0,structure:1,skin:2,edge:0,formality:3,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"am8",name:"Cable Knit Sweater Vest Apricot",brand:"AMAZON",color:"Apricot",size:"L",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0DGXZBYCP",stats:{drama:0,structure:1,skin:2,edge:0,formality:3,presence:0,silhouette:0,movement:0,ornament:0}},
  {id:"am9",name:"Fishnet Mock Neck Vest",brand:"AMAZON",color:"Black",size:"XL",cat:"Tank",type:"top",url:"https://www.amazon.com/dp/B0CT2NXSJ4",stats:{drama:1.5,structure:0,skin:5,edge:3,formality:0,presence:0.5,silhouette:0,movement:0,ornament:1.5}},
  {id:"am10",name:"PU Leather Crop Tank",brand:"AMAZON",color:"Black",size:"XXL",cat:"Tank",type:"top",url:"https://www.amazon.com/dp/B0C22Z7XT9",stats:{drama:1.5,structure:2,skin:3,edge:4,formality:0,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"am11",name:"PU Leather Shorts",brand:"AMAZON",color:"Black",size:"XXL",cat:"Shorts",type:"bottom",url:"https://www.amazon.com/dp/B0C22Z7XT9",stats:{drama:1.5,structure:2,skin:2,edge:3,formality:1,presence:1.5,silhouette:0,movement:0,ornament:0}},
  {id:"am12",name:"Latex Hood Mask",brand:"AMAZON",color:"Black",size:"XL",cat:"Mask",type:"acc",url:"https://www.amazon.com/dp/B0FQV3N3KS",stats:{drama:4,structure:2,skin:0,edge:5,formality:0,presence:4,silhouette:0,movement:0,ornament:0}},
  {id:"am13",name:"PU Leather Lace Up Crop Vest",brand:"AMAZON",color:"Black",size:"XL",cat:"Vest",type:"top",url:"https://www.amazon.com/dp/B0FHK64N8T",stats:{drama:2.5,structure:2,skin:3.5,edge:4,formality:0,presence:1.5,silhouette:0,movement:0,ornament:2.5}},
  // ── ALO ──────────────────────────────────────────────────────────────────────
  {id:"al1",name:"Double Take Short Black",brand:"ALO",color:"Black",size:"M",cat:"Shorts",type:"bottom",style:"Dark / Minimal",url:"https://www.aloyoga.com/products/m6143r-7-double-take-short-black",stats:{drama:1,structure:1,skin:2,edge:0,formality:1,presence:1,silhouette:0,movement:0,ornament:0}},
  {id:"al2",name:"Double Take Short Espresso",brand:"ALO",color:"Espresso",size:"M",cat:"Shorts",type:"bottom",style:"Tonal",url:"https://www.aloyoga.com/products/m6143r-7-double-take-short-espresso",stats:{drama:1,structure:1,skin:2,edge:0,formality:1,presence:1,silhouette:0,movement:0,ornament:0}},
  // ── MUAZOE ───────────────────────────────────────────────────────────────────
  {id:"mz1",name:"Raye Print Round Neck T-shirt",brand:"MUAZOE",color:"Brown",size:"L",cat:"T-Shirt",type:"top",style:"Tonal",url:"https://www.muazoe.com/products/raye-print-round-neck-t-shirt-15",stats:{drama:2,structure:0,skin:1,edge:0,formality:1,presence:0,silhouette:0,movement:0,ornament:2}},
  {id:"mz2",name:"Kanye West Print Round Neck T-shirt",brand:"MUAZOE",color:"Grey",size:"L",cat:"T-Shirt",type:"top",style:"Tonal",url:"https://www.muazoe.com/products/kanye-west-print-round-neck-t-shirt-20",stats:{drama:1.5,structure:0,skin:1,edge:0,formality:1,presence:0,silhouette:0,movement:0,ornament:1.5}},
  {id:"u1",name:"Gold Dragon Cuff",brand:"UNBRANDED",color:"Gold",size:"OS",cat:"Cuff",type:"accessory",style:"Contrast",versatile:true,url:"https://www.ebay.com/itm/317008146557",stats:{drama:2.5,structure:1,skin:0,edge:3,formality:2,presence:0,silhouette:0,movement:0,ornament:2.5}},
  {id:"dr1",name:"Gold Dragon Scale Armor Body Chain",brand:"UNBRANDED",color:"Gold",size:"OS",cat:"Harness",type:"accessory",style:"Statement",url:"https://www.etsy.com/listing/4541198370/gothic-dragon-scale-shoulder-chain",img:"gold-dragon-armor.jpg",stats:{drama:5,structure:3,skin:4,edge:3,formality:0,presence:3,silhouette:2,movement:1.5,ornament:5}},
  {id:"dr2",name:"Gold Dragon Head Ring",brand:"UNBRANDED",color:"Gold",size:"OS",cat:"Ring",type:"accessory",style:"Statement",img:"gold-dragon-ring.jpg",versatile:true,stats:{drama:3,structure:0.5,skin:0,edge:1.5,formality:1,presence:1,silhouette:0,movement:0,ornament:3}},
  {id:"gc1",name:"Layered Gold Chain Necklace",brand:"UNBRANDED",color:"Gold",size:"OS",cat:"Necklace",type:"accessory",style:"Statement",img:"gold-layered-chains.jpg",versatile:true,stats:{drama:3,structure:0.5,skin:0,edge:1,formality:1,presence:2,silhouette:1,movement:2,ornament:3}},
  {id:"md1",name:"Hooded Cotton Jersey Cardigan",brand:"MDNT45",color:"Black",size:"M",cat:"Cardigan",type:"outer",style:"Dark / Minimal",url:"https://www.mdnt45.com/products/hooded-cotton-jersey-cardigan-black-1",img:"https://www.mdnt45.com/cdn/shop/files/mdnt45-hooded-cotton-jersey-cardigan-33102855241925.webp",stats:{drama:3,structure:1,skin:2,edge:2.5,formality:2,presence:3,silhouette:2.5,movement:4,ornament:0.5}},
  {id:"pr1",name:"Punk Plaid Skirt",brand:"PUNKRAVE",color:"Red/White",size:"S-M",cat:"Skirt",type:"bottom",style:"Contrast",url:"https://punkrave.co.za/product/punk-plaid-skirt/",img:"https://punkrave.co.za/wp-content/uploads/2026/05/WQ-975BQM-RD-WH-6.jpg",stats:{drama:3,structure:2.5,skin:2,edge:3.5,formality:1,presence:2,silhouette:2.5,movement:3,ornament:3.5}},
  {id:"cp1",name:"Earth Plaid Blanket Cape",brand:"UNBRANDED",color:"Burgundy/Grey",size:"OS",cat:"Cape",type:"outer",style:"Tonal",img:"earth-plaid-cape.jpg",stats:{drama:3.5,structure:1,skin:0,edge:0.5,formality:1.5,presence:2,silhouette:3.5,movement:3.5,ornament:2.5}},
  {id:"md2",name:"Hogo Coat",brand:"MDNT45",color:"Black",size:"L",cat:"Coat",type:"outer",style:"Dark / Minimal",url:"https://www.mdnt45.com/products/hogo-coat",img:"https://www.mdnt45.com/cdn/shop/products/mdnt45-hogo-coat-29765240848581.jpg",stats:{drama:4,structure:4,skin:0,edge:3,formality:3,presence:4,silhouette:3,movement:1.5,ornament:0.5}},
  {id:"dc1",name:"Neptune-210 Platform Boots",brand:"DEMONIA",color:"Black",size:"EU 44",cat:"Boots",type:"shoes",style:"Dark / Minimal",url:"https://demoniacult.com/products/neptune-210bvl",stats:{drama:4.5,structure:5,skin:0,edge:4.5,formality:1,presence:4.5,silhouette:0,movement:0,ornament:0}},
];

// ── DRAMA FACETS ────────────────────────────────────────────────────────────
// Drama is split into four facets; `drama` is a computed roll-up = max(facets).
const FACET_KEYS = ["presence","silhouette","movement","ornament"];
// Display order for the 8-spoke spider (facets grouped first, then base stats).
const STAT_KEYS8 = ["presence","silhouette","movement","ornament","structure","skin","edge","formality"];
function rollupDrama(stats){ return stats ? Math.max.apply(null, FACET_KEYS.map(k => stats[k]||0)) : 0; }
// keep drama in sync whenever facet values change (authoritative)
(function normalizeDrama(){
  WARDROBE_DATA.forEach(function(it){
    if (it.stats && FACET_KEYS.some(k => it.stats[k] != null)) it.stats.drama = rollupDrama(it.stats);
  });
})();

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
  {id:39,name:"Open Vest Bar Night",vibe:"Dark / Minimal",tags:["dark"],source:"detected",persona:"night-shift",pieces:[{role:"Top",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:40,name:"Smoke Column",vibe:"Dark / Minimal",tags:["dark"],persona:"wanderer",pieces:[{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"m20",name:"Nuance Dyed Refract Segment Track Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:52,name:"Burgundy Cargo Tuck",vibe:"Contrast",tags:["contrast"],persona:"viceroy",pieces:[{role:"Top",id:"am7",name:"Cable Knit Sweater Vest Burgundy",brand:"AMAZON"},{role:"Bottom",id:"m18",name:"Cargo Volume Transform Denim Skirt",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:46,name:"PU Tank Night",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am10",name:"PU Leather Crop Tank",brand:"AMAZON"},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:49,name:"Warm Linen Editorial",vibe:"Tonal",tags:["tonal"],persona:"viceroy",pieces:[{role:"Vest",id:"am8",name:"Cable Knit Sweater Vest Apricot",brand:"AMAZON"},{role:"Bottom",id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR"},{role:"Shoes",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:47,name:"Sequin After Dark",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"r2",name:"Fever Arc Sequin Embroidery Vest",brand:"RYVK"},{role:"Bottom",id:"o8",name:"Addams Skirt",brand:"ORTTU"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:50,name:"Walker Blue Contrast",vibe:"Contrast",tags:["contrast"],persona:"civilian",pieces:[{role:"Top",id:"m5",name:"Layered Sleeveless White Collar Shirt",brand:"MINOAR"},{role:"Bottom",id:"o11",name:"Walker Denim Skirt",brand:"ORTTU"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:42,name:"Fishnet Harness",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am9",name:"Fishnet Mock Neck Vest",brand:"AMAZON"},{role:"Harness",id:"am6",name:"Patent Leather Chest Harness",brand:"AMAZON"},{role:"Bottom",id:"am11",name:"PU Leather Shorts",brand:"AMAZON"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:43,name:"Rhinestone Hexa",vibe:"Night Out",tags:["night"],persona:"overlord",pieces:[{role:"Top",id:"am4",name:"Rhinestone Mesh Crop Shirt",brand:"AMAZON"},{role:"Bottom",id:"f1",name:"25FW Layered Belt Apron Skirt",brand:"FRKM"},{role:"Outer",id:"m16",name:"Hexa Long Layers Sleeveless Coat",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:45,name:"PU Harness Construct",vibe:"Night Out",tags:["night"],persona:"night-shift",pieces:[{role:"Top",id:"am13",name:"PU Leather Lace Up Crop Vest",brand:"AMAZON"},{role:"Harness",id:"am5",name:"Leather Body Chain Harness",brand:"AMAZON"},{role:"Bottom",id:"m1",name:"Aspect Layered Construct Skirt Trousers",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  // ── Proposal-only outfits (never promoted to board) ──
  {id:44,name:"Burgundy Prep",vibe:"Contrast",tags:["contrast"],source:"proposed",persona:"civilian",pieces:[{role:"Vest",id:"am7",name:"Cable Knit Sweater Vest Burgundy",brand:"AMAZON"},{role:"Under",id:"o9",name:"Emanuel Shirt",brand:"ORTTU"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Shoes",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:48,name:"Jesse Dark Night",vibe:"Night Out",tags:["night"],source:"proposed",persona:"overlord",pieces:[{role:"Top",id:"o12",name:"Jesse Top with Scarf",brand:"ORTTU"},{role:"Bottom",id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR"},{role:"Boots",id:"y1",name:"Zipped Tall Boots",brand:"YASAR"}]},
  {id:51,name:"Roberto Tonal Set",vibe:"Tonal",tags:["tonal"],source:"proposed",persona:"viceroy",pieces:[{role:"Outer",id:"o4",name:"Roberto Jacket",brand:"ORTTU"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Shoes",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:53,name:"Brown Tonal Ease",vibe:"Tonal",tags:["tonal"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON"},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Boots",id:"dm1",name:"DMXL Zip Leather Chelsea Boots",brand:"DRMARTENS"}]},
  {id:54,name:"Linen Off Day",vibe:"Tonal",tags:["tonal"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON"},{role:"Bottom",id:"m10",name:"Trigon Layered Linen Trousers",brand:"MINOAR"},{role:"Boots",id:"tv1",name:"AJ1131 Chelsea Boots",brand:"TOGAVIRILIS"}]},
  {id:55,name:"Summer Shorts",vibe:"Contrast",tags:["contrast"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"am2",name:"Oversized Drop Shoulder Tee Blue",brand:"AMAZON"},{role:"Bottom",id:"am11",name:"PU Leather Shorts",brand:"AMAZON"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:56,name:"Cloak Hoodie Weekend",vibe:"Tonal",tags:["tonal"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"m6",name:"Sleeveless Collar Shirt",brand:"MINOAR"},{role:"Outer",id:"koe1",name:"Protanopia Cloak Hoodie",brand:"KOE"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Boots",id:"s1",name:"Roman Fabric Boots",brand:"SASAIA"}]},
  {id:57,name:"Crushed Casual",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"am1",name:"Oversized Drop Shoulder Tee Brown",brand:"AMAZON"},{role:"Bottom",id:"m11",name:"Wide Layered Crushed Cropped Pants",brand:"MINOAR"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:58,name:"Linen Cargo Easy",vibe:"Tonal",tags:["tonal"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"am3",name:"Oversized Drop Shoulder Tee Green",brand:"AMAZON"},{role:"Bottom",id:"m2",name:"Quark Linen Cargo Layered Skirt Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:59,name:"Grey Print Jogger",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"mz2",name:"Kanye West Print Round Neck T-shirt",brand:"MUAZOE"},{role:"Bottom",id:"m15",name:"Reverse Edge Construct Jogger",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:60,name:"Open Collar",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",proposal:"off-duty",persona:"wanderer",pieces:[{role:"Top",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA",styling:["worn-open","bare-torso"]},{role:"Bottom",id:"r5",name:"Tone Wave Wide Leg Pants",brand:"RYVK"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:61,name:"Open Collar Day",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"z1",name:"Tunic Button-Up Collared Sleeveless",brand:"ZARA"},{role:"Bottom",id:"m17",name:"External Cropped Loose Grey Trousers",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:62,name:"Raye Print Lounge",vibe:"Tonal",tags:["tonal"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"mz1",name:"Raye Print Round Neck T-shirt",brand:"MUAZOE"},{role:"Bottom",id:"al1",name:"Double Take Short Black",brand:"ALO"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:63,name:"Photo Tee Espresso",vibe:"Dark / Minimal",tags:["dark"],source:"proposed",proposal:"off-duty",persona:"civilian",pieces:[{role:"Top",id:"hd1",name:"Mature Photo Tee",brand:"HILARYDUFF"},{role:"Bottom",id:"al2",name:"Double Take Short Espresso",brand:"ALO"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]},
  {id:64,name:"Olive Tee + Pinstripe Tailoring",vibe:"Tonal",tags:["tonal"],source:"detected",persona:"civilian",pieces:[{role:"Top",id:"z2",name:"Relaxed Fit Interlock T-Shirt",brand:"ZARA",styling:["tucked"]},{role:"Bottom",id:"o3",name:"Roberto Pants",brand:"ORTTU"},{role:"Shoes",id:"pw2",name:"Pai-Weite High-Top Sneakers Black",brand:"JAKCUZ"}]},
  {id:65,name:"Longline Shirt + Cargo Skirt",vibe:"Layered",tags:["tonal"],source:"detected",persona:"wanderer",pieces:[{role:"Top",id:"o5",name:"Porto Long Shirt",brand:"ORTTU"},{role:"Bottom",id:"m21",name:"Cargo Asymmetric Skirt",brand:"MINOAR"},{role:"Shoes",id:"pw1",name:"Pai-Weite High-Top Sneakers White",brand:"JAKCUZ"}]}
];


// ── SIGNATURE MATRIX — each persona's signature top / bottom / shoe / accessory ──
// Item ids from WARDROBE_DATA. null = gap (shop target). Jewelry is versatile (see item.versatile).
const SIGNATURES = {
  overlord:      { top:"m4",   bottom:"m3",   shoe:"dc1", accessory:"g3" },
  wanderer:      { top:"o18",  bottom:"m11",  shoe:"s1",  accessory:"d1" },
  "night-shift": { top:"am13", bottom:"am11", shoe:null,  accessory:"dr1" },
  viceroy:       { top:"o16",  bottom:null,   shoe:null,  accessory:"c4" },
  civilian:      { top:"o9",   bottom:"o1",   shoe:"pw1", accessory:"c1" },
};


// ── SHOP — curated buy candidates, anchored on brands from our history (owned/discussed/new) ──
// tier: "owned" | "discussed" | "new". persona = the character it's suggested for. img "" = link-only.
const SHOP = [
  { id:"sh_db1", name:"Jacket Neck Rebel", brand:"Demobaza", tier:"discussed", cat:"Jacket", persona:"overlord", fills:"Overlord statement outer", priority:"medium",
    price:"$1,067", url:"https://www.demobaza.com/collections/jackets-demoman/products/jacket-neck-rebel-1", img:"https://www.demobaza.com/cdn/shop/files/JACKET-NECK-REBEL-1_3ee8add4-7638-4426-8dba-30410e41361b.jpg?v=1772693363",
    stats:{drama:3.5,structure:4,skin:1,edge:4.5,formality:3,presence:3.5,silhouette:2,movement:1,ornament:0.5},
    why:"Architectural high-collar jacket in Demobaza's dystopian cut \u2014 the armored statement outer Overlord is built for. You already love the one Demobaza piece you own." },
  { id:"sh_de1", name:"Boxer-13 Platform Boot", brand:"DEMONIA", tier:"new", cat:"Boots", persona:"overlord", fills:"Aggressive club platform", priority:"high",
    price:"$122", url:"https://demoniacult.com/collections/boots/products/boxer-13bvl", img:"https://cdn.shopify.com/s/files/1/0045/9558/1041/products/boxer-13-bvl.jpg?v=1582157220",
    stats:{drama:3,structure:4.5,skin:1,edge:4.5,formality:1.5,presence:3,silhouette:1.5,movement:0,ornament:1},
    why:"A 4-inch strapped platform bootie \u2014 the going-out weapon that grounds the harnesses, crushed pants and layered skirts with real weight. Same extreme energy as your Neptunes, for $122." },
  { id:"sh_mn1", name:"Fiber Bond Magma Layered Skirt", brand:"MINOAR", tier:"owned", cat:"Skirt", persona:"wanderer", fills:"Textured deconstructed drape", priority:"high",
    price:"$421", url:"https://www.minoar.com/product/fiber-bond-magma-layered-skirt/", img:"https://media.minoar.com/2024/11/Fiber_Bond_Magma_Layered_Skirt_1.jpg",
    stats:{drama:3.5,structure:3,skin:1.5,edge:4,formality:2,presence:2,silhouette:3.5,movement:3,ornament:3},
    why:"Deconstructed black-and-red fiber-bond drape from your own Minoar \u2014 layers over the volume pants or under a crop jacket. Textured drama nothing else in the closet has." },
  { id:"sh_ro1", name:"Temple Low Factory Pull-On Boots", brand:"RICKOWENS", tier:"new", cat:"Boots", persona:"night-shift", fills:"Sleek going-out shoe (real gap)", priority:"medium",
    price:"$1,956 (sale)", url:"https://www.ssense.com/en-us/men/product/rick-owens/black-temple-low-factory-pull-on-boots/18659221", img:"https://img.ssensemedia.com/images/f_auto,c_limit,w_1600/261232M223006_1/rick-owens-black-temple-low-factory-pull-on-boots.jpg",
    stats:{drama:2.5,structure:3.5,skin:1,edge:4.5,formality:2.5,presence:2.5,silhouette:1.5,movement:1,ornament:1},
    why:"The dystopian pull-on you flagged \u2014 elongated and sleeker than the platforms, it is exactly the going-out shoe Night Shift is missing. Dream-tier, but it is THE gap-filler. (paste an image link and I will embed it.)" },
  { id:"sh_mn3", name:"Coeus Dark Hooded Cardigan", brand:"MINOAR", tier:"owned", cat:"Cardigan", persona:"wanderer", fills:"Dark hooded outer (thin category)", priority:"high",
    price:"$381", url:"https://www.minoar.com/product/coeus-dark-hooded-cardigan-m/", img:"https://media.minoar.com/2026/07/Coeus-Dark-Hooded-Cardigan-M-2.jpg",
    stats:{drama:3,structure:2.5,skin:1,edge:3.5,formality:2,presence:2,silhouette:3,movement:3,ornament:1},
    why:"A loose hooded Fiber-Bond cardigan from your Minoar \u2014 the dark layering outer that hoods over the sleeveless collar shirts or the harnesses. Real outerwear where you own almost none." },
  { id:"sh_mn4", name:"Titan Leather Shoulders", brand:"MINOAR", tier:"owned", cat:"Harness", persona:"overlord", fills:"Armored statement layer", priority:"high",
    price:"$547", url:"https://www.minoar.com/product/titan-leather-shoulders-m/", img:"https://media.minoar.com/2026/07/Titan-Leather-Shoulder-Plates-M-4.jpg",
    stats:{drama:4,structure:4,skin:1,edge:4.5,formality:2,presence:4,silhouette:2,movement:0.5,ornament:1.5},
    why:"Leather shoulder plates with cargo pockets and YKK zips \u2014 pure armored statement in the family of the 2 harnesses you already reach for. Layers over any top to instantly weaponize a look." },
  { id:"sh_mn5", name:"Atlas Denim Jumpsuit", brand:"MINOAR", tier:"owned", cat:"Jumpsuit", persona:"wanderer", fills:"Full-look statement (0 owned)", priority:"medium",
    price:"$438", url:"https://www.minoar.com/product/atlas-denim-jumpsuit-m/", img:"https://media.minoar.com/2026/07/Atlas-Denim-Jumpsuit-M-2.jpg",
    stats:{drama:3.5,structure:3,skin:1,edge:4,formality:2,presence:3,silhouette:3.5,movement:2,ornament:2},
    why:"An overlapping-denim Fiber-Bond jumpsuit with steel hardware \u2014 a full-look statement in a silhouette you own zero of. Wear alone, or open with a tee underneath." },
  { id:"sh_or4", name:"Zander Mesh Harness Top", brand:"ORTTU", tier:"owned", cat:"Shirt", persona:"night-shift", fills:"Going-out mesh statement", priority:"high",
    price:"$79", url:"https://orttu.com/products/zander-top", img:"https://orttu.com/cdn/shop/files/Orttu_3_905bf3b3-1f22-48db-820e-ca8c68dccdca.jpg?v=1781024679",
    stats:{drama:2.5,structure:2.5,skin:4,edge:4.5,formality:1.5,presence:2,silhouette:1.5,movement:1.5,ornament:2.5},
    why:"Sheer black mesh with a sharp collar and grommet harness-trim tracing the placket and shoulders \u2014 a Night Shift take on your Minoar collar shirts crossed with a harness. Layers under the cape or a jacket." },
  { id:"sh_or5", name:"Vander Lace-Up Sheer Top", brand:"ORTTU", tier:"owned", cat:"Top", persona:"night-shift", fills:"High-skin nights-out top", priority:"medium",
    price:"$79", url:"https://orttu.com/products/vander-top", img:"https://orttu.com/cdn/shop/files/Orttu_1_d9162dfc-6fbc-4efc-9436-0f215be41907.jpg?v=1781024575",
    stats:{drama:2,structure:2,skin:4.5,edge:4,formality:1.5,presence:1.5,silhouette:1.5,movement:1.5,ornament:2},
    why:"Sheer mesh panels, deep V and a metal-eyelet lace-up cinch, sleeveless \u2014 the high-skin going-out top Night Shift is built for. Pure nights-out energy." },
  { id:"sh_db2", name:"Rain Cape Onyx", brand:"Demobaza", tier:"discussed", cat:"Cape", persona:"night-shift", fills:"Warm-weather flowing layer", priority:"high",
    price:"$557", url:"https://www.demobaza.com/collections/jackets-demoman/products/rain-cape-onyx-1", img:"https://www.demobaza.com/cdn/shop/files/RAIN-CAPE-ONYX-5_2cdba4c1-1ffb-4ecc-8b03-d503053ea316.jpg?v=1773144891",
    stats:{drama:3.5,structure:2,skin:1,edge:4,formality:2,presence:2,silhouette:3,movement:3.5,ornament:1},
    why:"A flowing black cape \u2014 the lightweight, movement-forward third layer for warm-weather nights. Exactly the cape silhouette the whole wardrobe is built around." },
  { id:"sh_ls1", name:"Dragon Scalemail Pauldron with Cape", brand:"LissaraStudio", tier:"new", cat:"Harness", persona:"night-shift", fills:"Gold armored statement + cape", priority:"list",
    price:"$250 (with cape)", url:"https://www.etsy.com/listing/4506395473/dragon-scalemail-pauldron-with-cape", img:"https://i.etsystatic.com/66004412/r/il/5533d6/8137526317/il_1080xN.8137526317_7gas.jpg",
    stats:{drama:5,structure:3,skin:1,edge:3,formality:0,presence:3,silhouette:2.5,movement:3,ornament:5},
    why:"Anodized gold dragon-scalemail shoulder pauldron on a faux-leather harness with an optional teal satin cape \u2014 the matching statement to your gold dragon body chain, with a cape flourish for movement. Pure Night Shift armor-glam." },
  { id:"sh_da1", name:"Gold Armor Corset (Sculptural Chest Piece)", brand:"DarbagUA", tier:"new", cat:"Corset", persona:"overlord", fills:"Sculptural armor torso", priority:"list",
    price:"$218 (sale)", url:"https://www.etsy.com/listing/4503299336/mens-gold-armor-corset-sculptural-luxury", img:"https://i.etsystatic.com/47566345/r/il/6530f5/8056407735/il_1080xN.8056407735_smgr.jpg",
    stats:{drama:5,structure:4,skin:2,edge:3,formality:0,presence:4,silhouette:2.5,movement:0.5,ornament:5},
    why:"A mirror-finish anatomical gold chest plate \u2014 rigid sculptural torso armor in the Overlord command register. Handmade, made-to-order (gold or silver, S/M/L). Maximal presence with real structure." },
];

const DATA_VERSION = 131;

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

/* ── STYLING LAYER ──────────────────────────────────────────────────────────
   Base stats (item.stats) are the garment "on the rack". Styling attributes
   describe how a piece is worn and produce EFFECTIVE stats on top:
     effective = base + Σ single-attribute modifiers + Σ combo bonuses  (clamp 0–5)
   Attributes live on items (intrinsic, e.g. high-waist) and/or on outfit pieces
   (contextual, e.g. tucked). Singles apply per-item (so they dilute when averaged
   across an outfit); combos apply at the outfit level (full strength) — that's why
   a combination can exceed the sum of its pieces. See STATS.md. */
const STAT_KEYS5 = ["drama","structure","skin","edge","formality"];

// single attribute → stat deltas
// Re-pointed to drama facets (Phase 6): high-waist/tucked/oversized/layered shape
// the proportion → silhouette; worn-open adds gravitas → presence; flowy → movement.
const STYLE_MODIFIERS = {
  "high-waist":    { silhouette: 0.5 },
  "low-rise":      { skin: 0.5 },
  "tucked":        { silhouette: 0.5, formality: 0.5 },
  "half-tucked":   { silhouette: 0.5 },
  "worn-open":     { presence: 0.5 },
  "belted":        { structure: 0.5 },
  "sleeves-rolled":{ skin: 0.5 },
  "cropped-ankle": { skin: 0.5 },
  "oversized":     { silhouette: 0.5, structure: -0.5 },
  "layered":       { silhouette: 0.5 },
  "flowy":         { movement: 0.5 },
};

// combos fire at the outfit level (full strength). `needs` = attrs that must all be
// present; `test` = computed predicate over the outfit.
const STYLE_COMBOS = [
  // — from the earlier build —
  { id:"monochrome-dark", label:"Monochrome command", test: o => isMonochromeDark(o), boost:{ presence:0.5, edge:0.5 } },
  { id:"high-waist+tucked", label:"Defined waist", needs:["high-waist","tucked"], boost:{ silhouette:0.5 } },
  { id:"worn-open+bare-torso", label:"Open on skin", needs:["worn-open","bare-torso"], boost:{ skin:0.5 } },
  // — auto-computed —
  { id:"hard-soft", label:"Hard shoe · soft bottom", boost:{ edge:0.5 }, test: o => {
      const g = (o.pieces||[]).map(itemForPiece).filter(Boolean);
      const hardShoe  = g.some(it => it.type==="shoes" && ((it.stats.edge||0) >= 3 || /boot/i.test(it.cat||"")));
      const softBottom= g.some(it => it.type==="bottom" && (["Skirt","Skirt-Trouser"].includes(it.cat) || (it.styling||[]).includes("flowy") || (it.stats.structure||0) <= 1));
      return hardShoe && softBottom; } },
  { id:"harness", label:"Armored layer", boost:{ edge:0.5, presence:0.5 },
      test: o => (o.pieces||[]).map(itemForPiece).some(it => it && (it.cat==="Harness" || it.cat==="Body Chain" || /harness|body chain/i.test(it.name||""))) },
  { id:"high-contrast", label:"High contrast", boost:{ ornament:0.5 },
      test: o => { const g = outfitGarments(o); return g.some(it => isDark(it.color)) && g.some(it => isLight(it.color)); } },
  { id:"tonal", label:"Tonal", boost:{ formality:0.5 },
      test: o => { const f = dominantFamily(o); return (f==="light"||f==="earth"||f==="grey") && !outfitQuiet(o); } },
  { id:"skin-edge", label:"Skin & edge", boost:{ edge:0.5 },
      test: o => { const g = (o.pieces||[]).map(itemForPiece).filter(Boolean); return g.some(it => (it.stats.skin||0) >= 3) && g.some(it => (it.stats.edge||0) >= 3); } },
  { id:"full-layering", label:"Layered", boost:{ structure:0.5 },
      test: o => { const up = (o.pieces||[]).map(itemForPiece).filter(it => it && ["top","outer"].includes(it.type)); return up.length >= 2 && up.some(it => it.type==="outer"); } },
  { id:"crop-highwaist", label:"Crop + high-waist", boost:{ skin:0.5, silhouette:0.5 },
      test: o => { const g = (o.pieces||[]).map(itemForPiece).filter(Boolean); const crop = g.some(it => ["Crop Top","Tank"].includes(it.cat) || /crop/i.test(it.name||"")); return crop && outfitAttrs(o).has("high-waist"); } },
  { id:"sharp-tailoring", label:"Sharp tailoring", boost:{ structure:0.5, formality:0.5 },
      test: o => { const g = (o.pieces||[]).map(itemForPiece).filter(Boolean);
        const outer  = g.some(it => it.type==="outer"  && (it.stats.structure||0) >= 3);
        const bottom = g.some(it => it.type==="bottom" && (it.stats.structure||0) >= 3 && (it.stats.formality||0) >= 3);
        return outer && bottom; } },
  { id:"hardware-stack", label:"Hardware stack", boost:{ edge:0.5 },
      test: o => (o.pieces||[]).map(itemForPiece).filter(it => it && (it.stats.edge||0) >= 3).length >= 2 },
  { id:"sheer-stack", label:"Sheer stack", boost:{ skin:0.5 },
      test: o => (o.pieces||[]).map(itemForPiece).filter(it => it && (it.stats.skin||0) >= 3).length >= 2 },
  // — persona signatures —
  { id:"full-brand", label:"Full set", boost:{ structure:0.5 },
      labelFn: o => { const g = outfitGarments(o); return g.length ? ("Full " + brandLabel(g[0].brand)) : "Full set"; },
      test: o => { const g = outfitGarments(o); return g.length >= 2 && g.every(it => it.brand === g[0].brand); } },
  { id:"earth-cloak", label:"Earth cloak", boost:{ silhouette:0.5 },
      test: o => dominantFamily(o)==="earth" && (o.pieces||[]).map(itemForPiece).some(it => it && it.type==="outer") },
  { id:"sequin-sheen", label:"Sequin & sheen", boost:{ ornament:0.5, skin:0.5 },
      test: o => (o.pieces||[]).map(itemForPiece).some(it => it && /sequin|sheen|metallic|lam[e\u00e9]|satin|shimmer|glitter/i.test((it.name||"")+" "+(it.style||""))) },
  { id:"couture-contrast", label:"Couture contrast", boost:{ formality:0.5, presence:0.5 },
      test: o => { const g = (o.pieces||[]).map(itemForPiece).filter(Boolean); return g.some(it => (it.stats.formality||0) >= 3.5) && dominantFamily(o) != null; } },
  { id:"tonal-ease", label:"Tonal ease", boost:{}, // Civilian: recognition only, no stat change
      test: o => { const f = dominantFamily(o); return (f==="light"||f==="earth"||f==="grey") && outfitQuiet(o); } },
];

// combos enrich but don't swamp base: cap total combo contribution per stat
const STYLE_COMBO_CAP = 1.0;

const DARK_RE = /(black|graphite|onyx|charcoal|espresso|coal|jet|ink)/i;
function isDark(color){ return !!color && DARK_RE.test(color); }
function clamp05(v){ return Math.max(0, Math.min(5, v)); }

// monochrome-dark: ≥80% of the GARMENT pieces (top/bottom/outer/shoes; jewelry ignored) are dark
function isMonochromeDark(outfit){
  if (!outfit || !outfit.pieces) return false;
  const garments = outfit.pieces.map(itemForPiece).filter(it => it && ["top","bottom","outer","shoes"].includes(it.type));
  if (garments.length < 2) return false;
  const dark = garments.filter(it => isDark(it.color)).length;
  return dark / garments.length >= 0.8;
}

// colour families for tonal / contrast / earth combos
const LIGHT_RE = /(white|ivory|cream|off.?white|natural|beige)/i;
const EARTH_RE = /(brown|taupe|olive|khaki|beige|espresso|camel|\btan\b|sand|mocha|natural)/i;
const GREY_RE  = /(grey|gray|\bash\b|silver)/i;
function isLight(c){ return !!c && LIGHT_RE.test(c); }
function isEarth(c){ return !!c && EARTH_RE.test(c); }
function colorFamily(c){
  if (!c) return null;
  if (isDark(c))  return "dark";
  if (GREY_RE.test(c)) return "grey";
  if (isLight(c)) return "light";
  if (isEarth(c)) return "earth";
  return "color";
}
function outfitGarments(o){ return (o.pieces||[]).map(itemForPiece).filter(it => it && ["top","bottom","outer","shoes"].includes(it.type)); }
// dominant colour family if ≥80% of garments share one, else null
function dominantFamily(o){
  const g = outfitGarments(o); if (g.length < 2) return null;
  const cnt = {}; g.forEach(it => { const f = colorFamily(it.color); if (f) cnt[f] = (cnt[f]||0)+1; });
  let best=null, bn=0; Object.keys(cnt).forEach(f => { if (cnt[f] > bn){ bn=cnt[f]; best=f; } });
  return (best && bn/g.length >= 0.8) ? best : null;
}
// "quiet" = nothing loud (used to split elevated Tonal from Civilian Tonal Ease)
function outfitQuiet(o){
  const g = outfitGarments(o); if (!g.length) return false;
  const avg = k => g.reduce((s,it)=>s+(it.stats[k]||0),0)/g.length;
  return avg("drama") <= 2 && avg("edge") <= 1.5 && avg("formality") <= 2;
}
function brandLabel(key){ return (BRANDS[key] && BRANDS[key].label) || key; }

function applyModifiers(stats, attrs){
  const out = Object.assign({}, stats);
  (attrs || []).forEach(a => {
    const m = STYLE_MODIFIERS[a]; if (!m) return;
    Object.keys(m).forEach(k => { out[k] = (out[k] || 0) + m[k]; });
  });
  return out;
}

// effective stats for a single item, incl. its intrinsic styling + any contextual attrs
function itemEffectiveStats(item, extraAttrs){
  if (!item || !item.stats) return null;
  const attrs = (item.styling || []).concat(extraAttrs || []);
  const s = applyModifiers(item.stats, attrs);
  STAT_KEYS8.forEach(k => { if (s[k] != null) s[k] = clamp05(s[k]); });
  s.drama = rollupDrama(s);   // keep the headline in sync after facet modifiers
  return s;
}

// all styling attrs present in an outfit (outfit-level + item-intrinsic + per-piece)
function outfitAttrs(outfit){
  const s = new Set();
  (outfit.styling || []).forEach(a => s.add(a));
  (outfit.pieces || []).forEach(p => {
    const it = itemForPiece(p);
    ((it && it.styling) || []).forEach(a => s.add(a));
    (p.styling || []).forEach(a => s.add(a));
  });
  return s;
}

// which combos currently fire on an outfit (returns the combo objects)
function outfitCombosFired(outfit){
  if (!outfit || !outfit.pieces) return [];
  const attrs = outfitAttrs(outfit);
  return STYLE_COMBOS.filter(c => c.test ? c.test(outfit) : (c.needs || []).every(a => attrs.has(a)));
}
// human-readable boost summary, e.g. "drama +0.5 · edge +0.5"
function boostText(boost){
  return Object.keys(boost).filter(k => boost[k] != null).map(k => k + " " + (boost[k] > 0 ? "+" : "") + boost[k]).join(" · ");
}

// EFFECTIVE outfit stats: per-item singles averaged, then outfit-level combos added full-strength
function effectiveOutfitStats(outfit){
  if (!outfit || !outfit.pieces) return null;
  // Aggregate all 8 facet/base keys (+ drama headline) across pieces.
  const AGG = STAT_KEYS5.concat(FACET_KEYS); // drama,structure,skin,edge,formality + 4 facets
  const totals = {}; AGG.forEach(k => totals[k] = 0);
  let n = 0;
  outfit.pieces.forEach(p => {
    const it = itemForPiece(p); if (!it || !it.stats) return;
    const eff = itemEffectiveStats(it, p.styling || []);
    AGG.forEach(k => { totals[k] += (eff[k] || 0); });
    n++;
  });
  if (!n) return null;
  const avg = {}; AGG.forEach(k => { avg[k] = totals[k] / n; });
  const attrs = outfitAttrs(outfit);
  // Combos still only boost the 5 base keys (facet-targeted combos land in Phase 6).
  const cd = {}; AGG.forEach(k => cd[k] = 0);
  STYLE_COMBOS.forEach(c => {
    const fires = c.test ? c.test(outfit) : (c.needs || []).every(a => attrs.has(a));
    if (fires) Object.keys(c.boost).forEach(k => { if (k in cd) cd[k] += c.boost[k]; });
  });
  AGG.forEach(k => {
    const capped = Math.max(-STYLE_COMBO_CAP, Math.min(STYLE_COMBO_CAP, cd[k] || 0));
    avg[k] = Math.round(clamp05(avg[k] + capped) * 10) / 10;
  });
  avg.drama = rollupDrama(avg);   // headline drama = loudest facet, now that combos target facets
  return avg;
}

/* ── SHARED SPIDER (8-spoke) ─────────────────────────────────────────────────
   ONE renderer for every page (wardrobe, persona, profile, shop) — replaces the
   old per-file copies. Spokes are in "similarity order": the rigor hemisphere
   (Formality · Structure · Presence · Edge) then the expression hemisphere
   (Skin · Ornament · Movement · Silhouette), so correlated axes sit adjacent.
   Labels render only at detail size (>=120px); small cards are shape-only.
   A ~9% radius floor keeps near-zero pieces from collapsing to a single dot.
   Signature kept back-compatible: (stats, size, fillColor?, uid?). */
const SPIDER_KEYS   = ["formality","structure","presence","edge","skin","ornament","movement","silhouette"];
const SPIDER_LABELS = ["Formality","Structure","Presence","Edge","Skin","Ornament","Movement","Silhouette"];
const SPIDER_ABBR   = { formality:"Form", structure:"Str", presence:"Pres", edge:"Edge", skin:"Skin", ornament:"Orn", movement:"Move", silhouette:"Silh" };
const SPIDER_FLOOR  = 0.09;
// The two spokes a piece scores highest on (value > 0), for card peak-labels + caption.
function spiderTop2(stats){ return SPIDER_KEYS.map(k => [k, stats[k]||0]).sort((a,b) => b[1]-a[1]).filter(x => x[1] > 0).slice(0,2); }
// Two render modes, switched by size:
//   size >= 120  → DETAIL: all 8 axis labels (used on the big detail/panel spiders)
//   size <  120  → CARD/PREVIEW: peak labels on the top-2 spokes + a caption tag naming them
function drawSpider(stats, size, fillColor, uid){
  if (!stats) return "";
  const fill = fillColor || "#e2d3b4";
  const keys = SPIDER_KEYS, labels = SPIDER_LABELS, n = keys.length;
  const fullMode = size >= 120;
  const pad = fullMode ? size * 0.30 : size * 0.26;      // card mode needs room for 2 peak labels
  const W = size + pad * 2, cx = W / 2, cy = W / 2;
  const top2 = fullMode ? [] : spiderTop2(stats);
  const capText = top2.map(t => SPIDER_LABELS[keys.indexOf(t[0])]).join("  ·  ");
  const capH = (!fullMode && capText) ? Math.round(size * 0.24) : 0;   // caption strip below the chart
  const H = W + capH;
  const r = size * 0.30, labelR = size * 0.40, peakR = size * 0.45;
  const ang = i => (Math.PI * 2 / n) * i - Math.PI / 2;
  const px = (i, rr) => (cx + rr * Math.cos(ang(i))).toFixed(1);
  const py = (i, rr) => (cy + rr * Math.sin(ang(i))).toFixed(1);
  const rv = v => r * (SPIDER_FLOOR + (1 - SPIDER_FLOOR) * (Math.max(0, Math.min(5, v || 0)) / 5));
  let rings = "";
  for (let ring = 1; ring <= 5; ring++){
    const pts = keys.map((_,i) => px(i, r*(ring/5)) + "," + py(i, r*(ring/5))).join(" ");
    rings += '<polygon points="' + pts + '" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>';
  }
  const axes = keys.map((_,i) => '<line x1="'+cx+'" y1="'+cy+'" x2="'+px(i,r)+'" y2="'+py(i,r)+'" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>').join("");
  const dataPts = keys.map((k,i) => { const rr = rv(stats[k]); return (cx+rr*Math.cos(ang(i))).toFixed(1)+","+(cy+rr*Math.sin(ang(i))).toFixed(1); }).join(" ");
  const poly = '<polygon points="'+dataPts+'" fill="'+fill+'" fill-opacity="0.25" stroke="'+fill+'" stroke-width="1.5"/>';
  const peakSet = new Set(top2.map(t => t[0]));
  const dots = keys.map((k,i) => { const rr = rv(stats[k]); const hi = peakSet.has(k); return '<circle cx="'+(cx+rr*Math.cos(ang(i))).toFixed(1)+'" cy="'+(cy+rr*Math.sin(ang(i))).toFixed(1)+'" r="'+(hi ? (size>70?2.6:2) : (fullMode?2:1.6))+'" fill="'+(hi ? "#f0e4c8" : fill)+'"/>'; }).join("");
  let lbls = "";
  if (fullMode){
    const fs = (W * 0.045).toFixed(1);
    lbls = labels.map((lbl,i) => {
      const lx = (cx + labelR*Math.cos(ang(i))).toFixed(1), ly = (cy + labelR*Math.sin(ang(i))).toFixed(1);
      const c = Math.cos(ang(i)), s = Math.sin(ang(i));
      const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
      const dy = s > 0.3 ? "0.8em" : s < -0.3 ? "0em" : "0.35em";
      return '<text x="'+lx+'" y="'+ly+'" text-anchor="'+anchor+'" dy="'+dy+'" fill="rgba(255,255,255,0.45)" font-size="'+fs+'" font-family="Helvetica Neue,Arial,sans-serif" letter-spacing="0.02em">'+lbl+'</text>';
    }).join("");
  } else {
    // peak labels (abbreviated) on the top-2 spokes
    const fs = Math.max(7, size * 0.11).toFixed(1);
    lbls = top2.map(t => {
      const i = keys.indexOf(t[0]);
      const lx = (cx + peakR*Math.cos(ang(i))).toFixed(1), ly = (cy + peakR*Math.sin(ang(i))).toFixed(1);
      const c = Math.cos(ang(i)), s = Math.sin(ang(i));
      const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
      const dy = s > 0.3 ? "0.8em" : s < -0.3 ? "0em" : "0.35em";
      return '<text x="'+lx+'" y="'+ly+'" text-anchor="'+anchor+'" dy="'+dy+'" fill="#d8c9a4" font-size="'+fs+'" font-family="Helvetica Neue,Arial,sans-serif">'+SPIDER_ABBR[t[0]]+'</text>';
    }).join("");
  }
  let caption = "";
  if (capH){
    let capFont = size * 0.135;
    const maxW = W - 6, approx = capText.length * capFont * 0.52;
    if (approx > maxW) capFont = maxW / (capText.length * 0.52);
    capFont = Math.max(6.5, capFont);
    const pillW = Math.min(W - 2, capText.length * capFont * 0.52 + 14);
    const pillH = capH * 0.82, pillY = W + (capH - pillH) / 2;
    caption = '<rect x="'+(cx - pillW/2).toFixed(1)+'" y="'+pillY.toFixed(1)+'" width="'+pillW.toFixed(1)+'" height="'+pillH.toFixed(1)+'" rx="'+(pillH/2).toFixed(1)+'" fill="#2a2620"/>' +
      '<text x="'+cx.toFixed(1)+'" y="'+(W + capH*0.62).toFixed(1)+'" text-anchor="middle" fill="#e2d3b4" font-size="'+capFont.toFixed(1)+'" font-family="Helvetica Neue,Arial,sans-serif">'+capText+'</text>';
  }
  return '<svg width="'+W.toFixed(0)+'" height="'+H.toFixed(0)+'" viewBox="0 0 '+W.toFixed(0)+' '+H.toFixed(0)+'" xmlns="http://www.w3.org/2000/svg">' + rings + axes + poly + dots + lbls + caption + '</svg>';
}

/* ── PERSONA TARGET PROFILES (single source) ─────────────────────────────────
   8-key facet targets, keyed by canonical persona id. Drama split into the four
   facets per character: Overlord = Presence-led; Wanderer = Silhouette/Movement
   (cloaks, drape); Night Shift = Movement/Ornament (fringe, sequin); Civilian =
   quiet; Viceroy = Presence/Silhouette (couture command). Each persona's
   max(facets) equals its old single drama target, so the roll-up is unchanged.
   Referenced by persona.html, profile.html, and the matcher — no more per-file
   copies drifting out of sync. */
const PERSONA_LABELS = { overlord:"Overlord", wanderer:"Wanderer", "night-shift":"Night Shift", civilian:"Civilian", viceroy:"Viceroy" };

// Brand-key normaliser + brand accent colours (shared).
function bkey(brand){ return (brand || "").toUpperCase().replace(/[^A-Z]/g, ""); }
const BCOLS = { ORTTU:"#c8b89a", MINOAR:"#8a9aaa", RYVK:"#9a8ac8", FRKM:"#aa8a8a", YASAR:"#909090", ARAHANT:"#c08090" };

/* Shared clothing item card (same markup/classes as the clothing page mgr-item).
   Renders both the card-view overlay and the default info block; the parent
   container class (.mgr-items.card-view vs default) selects which shows.
   opts: { persona: slug, selected: bool, custom: bool, roleLabel: str, outfitCount: num }. */
function itemCardHtml(item, opts){
  opts = opts || {};
  const bk = bkey(item.brand);
  const bc = BCOLS[bk] || "#888";
  const img = (typeof IMAGES !== "undefined" && IMAGES[item.name]) || item.img || "";
  const brandLbl = (BRANDS[bk] && BRANDS[bk].label) || item.brand;
  const persona = opts.persona || null;
  const outfitCount = (opts.outfitCount != null) ? opts.outfitCount
    : ((typeof OUTFITS_DEFAULT !== "undefined") ? OUTFITS_DEFAULT.filter(o => (o.pieces||[]).some(p => p.id ? p.id === item.id : p.name === item.name)).length : 0);
  const personaChipCv = persona ? "<div style='margin-top:5px'><span style='background:var(--accent);color:#111;font-size:8px;padding:2px 6px;border-radius:4px;letter-spacing:0.06em;font-weight:700;text-transform:uppercase'>" + (PERSONA_LABELS[persona]||persona) + "</span></div>" : "";
  const personaTag = persona ? "<span class='mgr-tag' style='background:var(--accent);color:#111;font-weight:600'>" + (PERSONA_LABELS[persona]||persona) + "</span>" : "";
  const roleTag = opts.roleLabel ? "<div class='mgr-item-role'>" + opts.roleLabel + "</div>" : "";
  return "<div class='mgr-item" + (opts.selected ? " selected" : "") + "' data-id='" + item.id + "' data-name=\"" + item.name + "\" data-brand=\"" + item.brand + "\">" +
    roleTag +
    "<div class='mgr-item-img'>" + (img ? "<img src='" + img + "' alt='" + item.name + "' loading='lazy'>" : "<div style='display:flex;align-items:center;justify-content:center;height:100%;font-size:32px;color:var(--muted)'>&#x25C8;</div>") + "</div>" +
    "<div class='mgr-item-cv'><div class='mgr-item-cv-brand'>" + brandLbl + "</div><div class='mgr-item-cv-name'>" + item.name + "</div>" + personaChipCv + "</div>" +
    "<div class='mgr-item-info'>" +
      "<div class='mgr-item-brand' style='color:" + bc + "'>" + brandLbl + "</div>" +
      "<div class='mgr-item-name'>" + item.name + "</div>" +
      "<div style='display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px'>" +
        "<span class='mgr-tag'>" + (item.type || item.cat || "—") + "</span>" +
        (item.color && item.color !== "—" ? "<span class='mgr-tag'>" + item.color + "</span>" : "") +
        (item.size && item.size !== "—" ? "<span class='mgr-tag'>" + item.size + "</span>" : "") +
        (opts.custom ? "<span class='mgr-tag' style='color:var(--accent)'>custom</span>" : "") +
        personaTag +
      "</div>" +
      (outfitCount > 0 ? "<div style='font-size:10px;color:var(--accent);letter-spacing:0.06em'>In " + outfitCount + " outfit" + (outfitCount!==1?"s":"") + "</div>" : "<div style='font-size:10px;color:var(--muted)'>Not in any outfits</div>") +
    "</div></div>";
}

/* Shared outfit card (card-view). Same markup/classes as the outfits page.
   opts: { photo: img src, actions: bool (show save/delete) }. Click targets read
   data-id (+ data-img) — each page wires its own handler. */
function outfitCardHtml(outfit, opts){
  opts = opts || {};
  const stats = (typeof effectiveOutfitStats === "function") ? effectiveOutfitStats(outfit) : null;
  const spiderHtml = stats ? "<div class='cv-spider'>" + drawSpider(stats, 64, "rgba(226,211,180,0.9)") + "</div>" : "";
  const photoSrc = opts.photo || "";
  const imgHtml = photoSrc
    ? "<img class='cv-img' src='" + photoSrc + "' alt='" + outfit.name + "' loading='lazy'><div class='cv-gradient'></div>"
    : "<div class='cv-no-img'>No photo</div>";
  const actionsHtml = opts.actions
    ? "<div class='cv-actions'><button class='action-btn " + (opts.saved ? "saved" : "") + "' data-action='save'>" + (opts.saved ? "&#9733;" : "&#9734;") + "</button><button class='action-btn' data-action='delete'>&#x2715;</button></div>"
    : "";
  const personaChip = outfit.persona
    ? "<span style='background:var(--accent);color:#111;font-size:8px;padding:2px 6px;border-radius:4px;letter-spacing:0.06em;font-weight:700;text-transform:uppercase'>" + (PERSONA_LABELS[outfit.persona] || outfit.persona) + "</span>"
    : "";
  return "<div class='outfit-card card-view' data-id='" + outfit.id + "'" + (photoSrc ? " data-img='" + photoSrc + "'" : "") + ">" +
    imgHtml + actionsHtml +
    "<div class='cv-info'>" + spiderHtml +
      "<div class='cv-number'>NO. " + String(outfit.id).padStart(2,"0") + "</div>" +
      "<div class='cv-name'>" + outfit.name + "</div>" +
      "<div style='display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px'>" +
        "<div class='cv-vibe' style='margin-top:0'>" + (outfit.vibe || "") + "</div>" + personaChip +
      "</div>" +
    "</div>" +
  "</div>";
}

/* Shared item-popup builders (same markup/classes as the clothing page item popup).
   opts: { persona, wearHtml (wardrobe-only string), outfitPhoto: id->src }. Outfits &
   pairings computed from the shared catalog so any page can render the popup. */
// Combos this single piece can contribute to (item-level heuristic mirroring the combo tests).
function itemStylingCombos(item){
  const st = item.stats || {};
  const nm = (item.name || "") + " " + (item.style || "");
  const attrs = new Set(item.styling || []);
  const ids = [];
  const isHarness = item.cat === "Harness" || item.cat === "Body Chain" || /harness|body chain/i.test(nm);
  if (isHarness) ids.push("harness");
  if ((st.edge||0) >= 3) ids.push("hardware-stack");
  if ((st.skin||0) >= 3) ids.push("sheer-stack");
  if ((st.skin||0) >= 3 || (st.edge||0) >= 3) ids.push("skin-edge");
  if (/sequin|sheen|metallic|lam[eé]|satin|shimmer|glitter/i.test(nm)) ids.push("sequin-sheen");
  if (attrs.has("high-waist")) ids.push("high-waist+tucked");
  if (["Crop Top","Tank"].includes(item.cat) || /crop/i.test(nm) || attrs.has("high-waist")) ids.push("crop-highwaist");
  if (item.type === "shoes" && ((st.edge||0) >= 3 || /boot/i.test(item.cat||""))) ids.push("hard-soft");
  if (item.type === "bottom" && (["Skirt","Skirt-Trouser"].includes(item.cat) || attrs.has("flowy") || (st.structure||0) <= 1)) ids.push("hard-soft");
  if ((item.type === "outer" && (st.structure||0) >= 3) || (item.type === "bottom" && (st.structure||0) >= 3 && (st.formality||0) >= 3)) ids.push("sharp-tailoring");
  if (item.type === "outer") ids.push("full-layering");
  const seen = {}, out = [];
  ids.forEach(id => { if (seen[id]) return; seen[id] = 1; const c = STYLE_COMBOS.find(x => x.id === id); if (c) out.push(c); });
  return out;
}
// Classify a combo from a single piece's view: does it fire on its own (innate) or need a partner (synergy)?
function _stylingClassify(item, id){
  const st = item.stats || {}, skin = st.skin||0, edge = st.edge||0, hw = (item.styling||[]).includes("high-waist");
  if (id === "harness" || id === "sequin-sheen") return { innate:true };
  if (id === "skin-edge") return (skin>=3 && edge>=3) ? { innate:true } : { innate:false, req: skin>=3 ? "an edgy / hardware piece" : "a revealing piece" };
  if (id === "hardware-stack") return { innate:false, req:"another hardware-heavy piece" };
  if (id === "sheer-stack")    return { innate:false, req:"another sheer piece" };
  if (id === "high-waist+tucked") return { innate:false, req:"a tucked-in top" };
  if (id === "crop-highwaist") return { innate:false, req: hw ? "a crop top" : "a high-waist bottom" };
  if (id === "hard-soft")      return { innate:false, req: item.type==="shoes" ? "a soft / flowy bottom" : "hard boots" };
  if (id === "sharp-tailoring")return { innate:false, req: item.type==="outer" ? "tailored trousers" : "a structured jacket" };
  if (id === "full-layering")  return { innate:false, req:"another layer" };
  return { innate:false, req:"a matching piece" };
}
// "Styling potential" — RPG set-bonus framing: Innate (fires alone) vs Synergy (pair with…).
function itemStylingPotentialHtml(item){
  if (!item) return "";
  const green = SPIDER_BUFF;
  const singles = (item.styling || []).filter(a => STYLE_MODIFIERS[a]).map(a => ({ innate:true, name:"Worn " + a.replace(/-/g," "), reward:boostText(STYLE_MODIFIERS[a]) }));
  const combos = itemStylingCombos(item).map(c => { const cl = _stylingClassify(item, c.id); return { innate:cl.innate, req:cl.req, name:c.label, reward:boostText(c.boost) }; });
  const all = singles.concat(combos);
  const innate = all.filter(x => x.innate), synergy = all.filter(x => !x.innate);
  if (!innate.length && !synergy.length) return "";
  const innateRow = r => "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;background:rgba(110,206,128,0.08);border:1px solid rgba(110,206,128,0.28);border-radius:7px;padding:6px 10px;margin-bottom:5px'>" +
    "<span style='font-size:11px;color:var(--text);font-weight:600'>" + r.name + "</span>" +
    "<span style='font-size:10px;color:" + green + ";white-space:nowrap'>" + r.reward + "</span></div>";
  const synergyRow = r => "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:7px;padding:6px 10px;margin-bottom:5px'>" +
    "<span style='min-width:0'><span style='font-size:11px;color:var(--text);font-weight:600'>" + r.name + "</span><br><span style='font-size:9px;color:var(--muted)'>pair with " + r.req + "</span></span>" +
    "<span style='font-size:10px;color:" + green + ";white-space:nowrap'>" + r.reward + "</span></div>";
  let html = "<div style='margin-top:14px;padding-top:12px;border-top:1px solid var(--border)'>" +
    "<div style='font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px'>Styling potential</div>";
  if (innate.length) html += "<div style='font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:" + green + ";margin-bottom:6px'>&#9670; Innate &mdash; applies from this piece</div>" + innate.map(innateRow).join("");
  if (synergy.length) html += "<div style='font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:" + (innate.length ? "10px" : "0") + " 0 6px'>&#9670; Synergy &mdash; pair with&hellip;</div>" + synergy.map(synergyRow).join("");
  html += "</div>";
  return html;
}
function itemDetailPhotoHtml(item){
  if (!item) return "";
  const bk = bkey(item.brand || "");
  const img = (typeof IMAGES !== "undefined" && IMAGES[item.name]) || item.img || "";
  return img ? "<img src='" + img + "' alt='" + item.name + "'>" : "<div class='item-detail-photo-empty'>" + bk.slice(0,2) + "</div>";
}
function itemDetailInfoHtml(item, opts){
  if (!item) return "";
  opts = opts || {};
  const bk = bkey(item.brand || "");
  const bLbl = (BRANDS[bk] && BRANDS[bk].label) || item.brand || "";
  const name = item.name;
  const pool = (typeof _allItems === "function") ? _allItems() : (typeof WARDROBE_DATA !== "undefined" ? WARDROBE_DATA : []);
  const allOutfits = (typeof OUTFITS_DEFAULT !== "undefined") ? OUTFITS_DEFAULT : [];
  const itemOutfits = allOutfits.filter(o => (o.pieces||[]).some(p => (item.id && p.id === item.id) || p.name === name));
  const pairCounts = {};
  itemOutfits.forEach(o => (o.pieces||[]).forEach(p => { if (p.name === name) return; pairCounts[p.name] = (pairCounts[p.name]||0) + 1; }));
  const pairings = Object.entries(pairCounts).sort((a,b) => b[1]-a[1]).slice(0,12);
  const tags = [];
  if (item.color && item.color !== "—" && item.color !== "-") tags.push(item.color.toUpperCase());
  if (item.size && item.size !== "—" && item.size !== "-") tags.push("SIZE " + item.size);
  if (item.cat) tags.push(item.cat.toUpperCase());
  const persona = opts.persona || null;
  const outfitPhoto = opts.outfitPhoto || (id => "outfits/outfit_" + String(id).padStart(2,"0") + ".jpg");
  let outfitsHtml = "";
  if (itemOutfits.length){
    outfitsHtml = "<div class='item-detail-outfits'><div class='item-detail-section-title'>In " + itemOutfits.length + " Outfit" + (itemOutfits.length!==1?"s":"") + "</div><div class='item-detail-outfit-list'>" +
      itemOutfits.map(o => {
        const ps = outfitPhoto(o.id);
        const ph = ps ? "<div class='item-detail-outfit-photo'><img src='" + ps + "' alt='" + o.name + "'></div>" : "<div class='item-detail-outfit-photo'>" + String(o.id).padStart(2,"0") + "</div>";
        return "<div class='item-detail-outfit-chip' data-outfit-id='" + o.id + "' data-outfit-photo=\"" + (ps||"") + "\">" + ph + "<div><div class='item-detail-outfit-num'>No. " + String(o.id).padStart(2,"0") + "</div><div class='item-detail-outfit-name'>" + o.name + "</div></div></div>";
      }).join("") + "</div></div>";
  }
  let pairingsHtml = "";
  if (pairings.length){
    pairingsHtml = "<div class='item-detail-pairs'><div class='item-detail-section-title'>Pairs With</div><div class='item-detail-pairs-grid'>" +
      pairings.map(entry => {
        const pairName = entry[0], count = entry[1];
        const pairImg = (typeof IMAGES !== "undefined" && IMAGES[pairName]) || "";
        const pairItem = pool.find(i => i.name === pairName);
        const pb = pairItem ? bkey(pairItem.brand) : "";
        return "<div class='pair-card' data-name=\"" + pairName + "\" data-brand=\"" + (pairItem && pairItem.brand || "") + "\"><div class='pair-card-thumb'>" + (pairImg ? "<img src='" + pairImg + "' alt='" + pairName + "' loading='lazy'>" : "<div class='pair-card-thumb-empty'>" + pb.slice(0,2) + "</div>") + "</div><div class='pair-card-name'>" + pairName + (count>1?"<br><span class='pair-count-badge'>" + count + "x</span>":"") + "</div></div>";
      }).join("") + "</div></div>";
  }
  const personaTag = persona ? "<span class='item-detail-tag' style='background:var(--accent);color:#111;font-weight:700'>" + (PERSONA_LABELS[persona]||persona) + "</span>" : "";
  const statsHtml = item.stats ? "<div style='margin-bottom:20px;padding:14px;background:var(--surface2);border-radius:8px'><div style='font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px'>Stats</div>" + statBarsHtml(item.stats) + itemStylingPotentialHtml(item) + "</div>" : "";
  return "<div class='item-detail-brand-name'>" + bLbl + "</div>" +
    "<div class='item-detail-name'>" + name + "</div>" +
    ((tags.length || persona) ? "<div class='item-detail-tags'>" + tags.map(t => "<span class='item-detail-tag'>" + t + "</span>").join("") + personaTag + "</div>" : "") +
    (opts.wearHtml || "") +
    statsHtml +
    outfitsHtml + pairingsHtml +
    (!itemOutfits.length && !pairings.length ? "<p style='color:var(--muted);font-size:0.8rem;margin-top:12px'>Not used in any outfits yet.</p>" : "");
}

const PERSONA_TARGETS = {
  overlord:      { presence:4.0, silhouette:2.5, movement:1.0, ornament:1.0, structure:3.5, skin:1.0, edge:3.5, formality:2.0 },
  wanderer:      { presence:1.5, silhouette:2.5, movement:2.5, ornament:1.0, structure:2.0, skin:1.0, edge:2.0, formality:2.5 },
  "night-shift": { presence:1.5, silhouette:1.5, movement:3.0, ornament:3.0, structure:1.5, skin:3.5, edge:2.5, formality:1.5 },
  civilian:      { presence:0.5, silhouette:1.0, movement:0.5, ornament:0.5, structure:1.0, skin:0.5, edge:0.5, formality:1.5 },
  viceroy:       { presence:2.5, silhouette:2.0, movement:1.0, ornament:1.5, structure:3.0, skin:1.0, edge:1.5, formality:3.5 },
};
Object.keys(PERSONA_TARGETS).forEach(k => { PERSONA_TARGETS[k].drama = rollupDrama(PERSONA_TARGETS[k]); });

/* ── SHARED OUTFIT-DETAIL RENDER HELPERS ─────────────────────────────────────
   Used by the outfit-detail popup on both the outfits page and the persona page
   so the two are byte-identical. Inline styles + data.js helpers only. */
function statBarsHtml(stats) {
  if (!stats) return "";
  const bars = ["drama","edge","structure","skin","formality"].map(k =>
    "<div style=\"display:flex;align-items:center;gap:8px;margin-bottom:6px\">" +
    "<div style=\"font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);width:70px;flex-shrink:0\">" + k + "</div>" +
    "<div style=\"width:160px;height:2px;background:var(--border);border-radius:8px;overflow:hidden;flex-shrink:0\"><div style=\"height:100%;width:" + (stats[k]||0)*20 + "%;background:var(--accent);border-radius:8px\"></div></div>" +
    "<div style=\"font-size:10px;color:var(--accent);width:24px;text-align:right;flex-shrink:0\">" + (stats[k]||0) + "</div>" +
    "</div>"
  ).join("");
  return "<div style=\"display:flex;align-items:center;gap:20px;padding:4px 0\">" +
    drawSpider(stats, 130, "#e2d3b4", "detail") +
    "<div style=\"flex:1;min-width:0\">" + bars + "</div>" +
  "</div>";
}
function outfitStylingHtml(outfit){
  if (typeof outfitCombosFired !== "function") return "";
  var combos = outfitCombosFired(outfit);
  var attrs = (typeof outfitAttrs === "function") ? Array.from(outfitAttrs(outfit)) : [];
  if (!combos.length && !attrs.length) return "";
  var comboChips = combos.map(function(c){
    var label = c.labelFn ? c.labelFn(outfit) : c.label;
    var bt = boostText(c.boost);
    return "<span style=\"display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:#111;font-size:9px;font-weight:700;padding:4px 9px;border-radius:7px;letter-spacing:0.03em\">&#9672; " + label + (bt ? " <span style=\"font-weight:500;opacity:0.65;font-size:8px\">" + bt + "</span>" : "") + "</span>";
  }).join("");
  var attrChips = attrs.map(function(a){
    return "<span style=\"background:var(--surface);border:1px solid var(--border);color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:0.1em;padding:3px 7px;border-radius:6px\">" + a + "</span>";
  }).join("");
  return "<div style=\"margin-bottom:20px;padding:14px;background:var(--surface2);border-radius:8px\">" +
    "<div style=\"font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px\">Styling</div>" +
    (combos.length ? "<div style=\"display:flex;flex-wrap:wrap;gap:6px" + (attrs.length ? ";margin-bottom:8px" : "") + "\">" + comboChips + "</div>" : "") +
    (attrs.length ? "<div style=\"display:flex;flex-wrap:wrap;gap:5px\">" + attrChips + "</div>" : "") +
  "</div>";
}

/* ── OUTFIT STATS: base vs effective (RPG-style base + styling-buff) ──────────
   base  = raw average of the pieces' on-the-rack stats
   eff   = base + per-item singles + outfit combos (effectiveOutfitStats)
   The delta (eff − base) is the styling buff, shown in green. */
const SPIDER_BUFF = "#6ece80"; // styling-buff green
function outfitBaseStats(outfit){
  if (!outfit || !outfit.pieces) return null;
  const t = {}; STAT_KEYS8.forEach(k => t[k] = 0); let n = 0;
  outfit.pieces.forEach(p => { const it = itemForPiece(p); if (it && it.stats){ STAT_KEYS8.forEach(k => t[k] += (it.stats[k]||0)); n++; } });
  if (!n) return null;
  const a = {}; STAT_KEYS8.forEach(k => a[k] = Math.round(t[k]/n*10)/10); a.drama = rollupDrama(a); return a;
}
// Two-layer spider: gold = base outfit, green outline = effective (buff pushes past base).
function drawSpiderCompare(base, eff, size){
  if (!eff) return "";
  const keys = SPIDER_KEYS, labels = SPIDER_LABELS, n = keys.length;
  const pad = size * 0.30, W = size + pad * 2, cx = W / 2, cy = W / 2;
  const r = size * 0.30, labelR = size * 0.40;
  const ang = i => (Math.PI * 2 / n) * i - Math.PI / 2;
  const rv = v => r * (SPIDER_FLOOR + (1 - SPIDER_FLOOR) * (Math.max(0, Math.min(5, v || 0)) / 5));
  const ptsOf = st => keys.map((k,i) => { const rr = rv(st[k]); return (cx+rr*Math.cos(ang(i))).toFixed(1)+","+(cy+rr*Math.sin(ang(i))).toFixed(1); }).join(" ");
  let rings = "";
  for (let ring = 1; ring <= 5; ring++){
    const rp = keys.map((_,i) => (cx+r*(ring/5)*Math.cos(ang(i))).toFixed(1)+","+(cy+r*(ring/5)*Math.sin(ang(i))).toFixed(1)).join(" ");
    rings += '<polygon points="'+rp+'" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>';
  }
  const axes = keys.map((_,i) => '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r*Math.cos(ang(i))).toFixed(1)+'" y2="'+(cy+r*Math.sin(ang(i))).toFixed(1)+'" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>').join("");
  const effPoly = '<polygon points="'+ptsOf(eff)+'" fill="'+SPIDER_BUFF+'" fill-opacity="0.12" stroke="'+SPIDER_BUFF+'" stroke-width="1.4"/>';
  const basePoly = base ? '<polygon points="'+ptsOf(base)+'" fill="#e2d3b4" fill-opacity="0.28" stroke="#e2d3b4" stroke-width="1.4"/>' : '';
  const fs = (W * 0.045).toFixed(1);
  const lbls = labels.map((lbl,i) => {
    const lx = (cx + labelR*Math.cos(ang(i))).toFixed(1), ly = (cy + labelR*Math.sin(ang(i))).toFixed(1);
    const c = Math.cos(ang(i)), si = Math.sin(ang(i));
    const anc = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
    const dy = si > 0.3 ? "0.8em" : si < -0.3 ? "0em" : "0.35em";
    return '<text x="'+lx+'" y="'+ly+'" text-anchor="'+anc+'" dy="'+dy+'" fill="rgba(255,255,255,0.45)" font-size="'+fs+'" font-family="Helvetica Neue,Arial,sans-serif" letter-spacing="0.02em">'+lbl+'</text>';
  }).join("");
  const ws = W.toFixed(0);
  return '<svg width="'+ws+'" height="'+ws+'" viewBox="0 0 '+ws+' '+ws+'" xmlns="http://www.w3.org/2000/svg">'+rings+axes+effPoly+basePoly+lbls+'</svg>';
}
// Combined STATS panel: two-layer spider + 8 two-tone bars (base + buff) with total & delta.
function outfitStatsCompareHtml(outfit){
  const base = outfitBaseStats(outfit), eff = effectiveOutfitStats(outfit);
  if (!eff) return "";
  const spider = drawSpiderCompare(base, eff, 150);
  const bars = SPIDER_KEYS.map(function(k, idx){
    const bv = (base && base[k]) || 0, ev = eff[k] || 0, d = Math.round((ev - bv) * 10) / 10;
    const basePct = Math.min(bv, ev) / 5 * 100, bonusPct = d > 0 ? d / 5 * 100 : 0;
    return "<div style='display:flex;align-items:center;gap:8px;margin-bottom:7px'>" +
      "<div style='font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);width:74px;flex-shrink:0'>" + SPIDER_LABELS[idx] + "</div>" +
      "<div style='flex:1;min-width:0;height:6px;background:var(--border);border-radius:6px;overflow:hidden;display:flex'>" +
        "<div style='height:100%;width:" + basePct.toFixed(1) + "%;background:#e2d3b4'></div>" +
        (bonusPct ? "<div style='height:100%;width:" + bonusPct.toFixed(1) + "%;background:" + SPIDER_BUFF + "'></div>" : "") +
      "</div>" +
      "<div style='font-size:11px;color:var(--text);width:24px;text-align:right;flex-shrink:0'>" + ev + "</div>" +
      "<div style='font-size:10px;color:" + SPIDER_BUFF + ";width:26px;flex-shrink:0'>" + (d > 0 ? "+" + d : "") + "</div>" +
    "</div>";
  }).join("");
  const legend = "<div style='display:flex;gap:14px;justify-content:flex-end;margin-bottom:10px;font-size:9px;color:var(--muted)'>" +
    "<span><span style='display:inline-block;width:9px;height:9px;border-radius:2px;background:#e2d3b4;margin-right:4px;vertical-align:middle'></span>base</span>" +
    "<span><span style='display:inline-block;width:9px;height:9px;border-radius:2px;background:" + SPIDER_BUFF + ";margin-right:4px;vertical-align:middle'></span>styling buff</span>" +
  "</div>";
  // Styling chips (combos + raw attribute tags) folded into the same panel.
  var combos = (typeof outfitCombosFired === "function") ? outfitCombosFired(outfit) : [];
  var attrs = (typeof outfitAttrs === "function") ? Array.from(outfitAttrs(outfit)) : [];
  var comboChips = combos.map(function(c){
    var label = c.labelFn ? c.labelFn(outfit) : c.label; var bt = boostText(c.boost);
    return "<span style=\"display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:#111;font-size:9px;font-weight:700;padding:4px 9px;border-radius:7px;letter-spacing:0.03em\">&#9672; " + label + (bt ? " <span style=\"font-weight:500;opacity:0.65;font-size:8px\">" + bt + "</span>" : "") + "</span>";
  }).join("");
  var attrChips = attrs.map(function(a){
    return "<span style=\"background:var(--surface);border:1px solid var(--border);color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:0.1em;padding:3px 7px;border-radius:6px\">" + a + "</span>";
  }).join("");
  var stylingSection = (combos.length || attrs.length)
    ? "<div style='margin-top:16px;padding-top:14px;border-top:1px solid var(--border)'>" +
        "<div style='font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px'>Styling</div>" +
        (combos.length ? "<div style='display:flex;flex-wrap:wrap;gap:6px" + (attrs.length ? ";margin-bottom:8px" : "") + "'>" + comboChips + "</div>" : "") +
        (attrs.length ? "<div style='display:flex;flex-wrap:wrap;gap:5px'>" + attrChips + "</div>" : "") +
      "</div>"
    : "";
  return "<div style='margin-bottom:20px;padding:16px;background:var(--surface2);border-radius:8px'>" +
    "<div style='font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:12px'>Stats</div>" +
    legend +
    "<div style='display:flex;align-items:center;gap:18px;flex-wrap:wrap'>" +
      "<div style='flex-shrink:0;margin:0 auto'>" + spider + "</div>" +
      "<div style='flex:1;min-width:190px'>" + bars + "</div>" +
    "</div>" +
    stylingSection +
  "</div>";
}
