const products = [
    {
        id: 1, image: "Products Images/Roasted Chili & Curry Powder Mix.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 415 }, { weight: "500g", price: 795 }],
        en: { name: "Roasted Chili & Curry Powder Mix", description: "A rich, slow-roasted blend perfect for authentic meat curries." },
        si: { name: "බැදපු තුනපහ සහ මිරිස් කුඩු මිශ්‍රණය", description: "මස් හොදි සඳහාම විශේෂිත වූ නැවුම් බැදපු තුනපහ මිශ්‍රණයක්." }
    },
    {
        id: 2, image: "Products Images/Chili Powder  Pure Chili Powder.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 415 }],
        en: { name: "Pure Chili Powder", description: "100% pure Sri Lankan chili powder with vibrant color and heat." },
        si: { name: "පිරිසිදු මිරිස් කුඩු", description: "නියම ශ්‍රී ලාංකීය රසය සහ සැර පිරිසිදු මිරිස් කුඩු." }
    },
    {
        id: 3, image: "Products Images/Chili Flakes  Crushed Chilies.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 415 }, { weight: "500g", price: 795 }],
        en: { name: "Crushed Chilies / Flakes", description: "Spicy crushed chili flakes to add a rustic kick to your dishes." },
        si: { name: "කෑලි මිරිස්", description: "ගැමි රසයක් එක් කරන සැර කෑලි මිරිස්." }
    },
    {
        id: 4, image: "Products Images/Unroasted Curry Powder.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 350 }],
        en: { name: "Unroasted Curry Powder", description: "Mild, aromatic curry powder ideal for vegetables and mild curries." },
        si: { name: "අමු තුනපහ", description: "එළවළු සහ මෘදු හොදි වර්ග සඳහා සුදුසු සුවඳැති අමු තුනපහ." }
    },
    {
        id: 5, image: "Products Images/Roasted Curry Powder.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 400 }],
        en: { name: "Roasted Curry Powder", description: "Deeply roasted spices that bring out a robust flavor profile." },
        si: { name: "බැදපු තුනපහ", description: "සුවිශේෂී රසයක් ගෙන දෙන හොඳින් බැදපු තුනපහ කුඩු." }
    },
    {
        id: 6, image: "Products Images/Black Curry Powder  Dark Roasted Curry Powder.png", category: "Chili & Curry", variants: [{ weight: "25g", price: 90 }, { weight: "50g", price: 170 }, { weight: "100g", price: 450 }],
        en: { name: "Black Curry Powder", description: "Dark roasted traditional spice mix for pork and rich meat dishes." },
        si: { name: "කළු තුනපහ කුඩු", description: "ඌරු මස් සහ අනෙකුත් මස් වර්ග සඳහා විශේෂිත කලු තුනපහ." }
    },
    {
        id: 7, image: "Products Images/Turmeric Powder.png", category: "Spices", variants: [{ weight: "50g", price: 190 }, { weight: "100g", price: 370 }, { weight: "250g", price: 720 }],
        en: { name: "Turmeric Powder", description: "Golden, natural turmeric powder with high curcumin content." },
        si: { name: "කහ කුඩු", description: "ස්වභාවික සහ ගුණදායක පිරිසිදු කහ කුඩු." }
    },
    {
        id: 8, image: "Products Images/Black Pepper Powder.png", category: "Spices", variants: [{ weight: "50g", price: 190 }, { weight: "100g", price: 370 }, { weight: "250g", price: 720 }],
        en: { name: "Black Pepper Powder", description: "Freshly ground pungent black pepper from local estates." },
        si: { name: "ගම්මිරිස් කුඩු", description: "නැවුම් ලෙස අඹරන ලද තියුණු ගම්මිරිස් කුඩු." }
    },
    {
        id: 9, image: "Products Images/Mustard Powder.png", category: "Spices", variants: [{ weight: "50g", price: 70 }, { weight: "100g", price: 130 }],
        en: { name: "Mustard Powder", description: "Pungent mustard powder, essential for pickles and seafood." },
        si: { name: "අබ කුඩු", description: "අච්චාරු සහ මාළු හොදි රසවත් කරන නැවුම් අබ කුඩු." }
    },
    {
        id: 10, image: "Products Images/Ginger & Coriander.png", category: "Spices", variants: [{ weight: "50g", price: 120 }, { weight: "100g", price: 240 }],
        en: { name: "Ginger & Coriander", description: "A soothing, aromatic blend perfect for traditional remedies and teas." },
        si: { name: "ඉඟුරු කොත්තමල්ලි", description: "දේශීය ඖෂධීය පානයක් සඳහා සුවඳැති ඉඟුරු කොත්තමල්ලි." }
    },
    {
        id: 11, image: "Products Images/Coffee Powder.png", category: "Beverages", variants: [{ weight: "100g", price: 500 }, { weight: "250g", price: 1200 }],
        en: { name: "Coffee Powder", description: "Rich, aromatic local coffee powder for a perfect morning brew." },
        si: { name: "කෝපි කුඩු", description: "උදෑසනක් ප්‍රබෝධමත් කරන නියම දේශීය කෝපි කුඩු." }
    },
    {
        id: 12, image: "Products Images/Finger Millet Flour  Kurakkan Flour.png", category: "Flour", variants: [{ weight: "250g", price: 120 }, { weight: "500g", price: 220 }, { weight: "1kg", price: 400 }],
        en: { name: "Kurakkan Flour", description: "Nutritious finger millet flour, ideal for healthy traditional meals." },
        si: { name: "කුරක්කන් පිටි", description: "පෝෂණීය සහ ගුණදායක පිරිසිදු කුරක්කන් පිටි." }
    },
    {
        id: 13, image: "Products Images/Roasted Rice Flour (for Aggala).png", category: "Flour", variants: [{ weight: "500g", price: 230 }, { weight: "1kg", price: 450 }],
        en: { name: "Roasted Rice Flour", description: "Finely roasted rice flour, perfect for making sweet 'Aggala'." },
        si: { name: "බැදපු හාල් පිටි", description: "රසවත් අග්ගලා සෑදීමට කදිම බැදපු හාල් පිටි." }
    },
    {
        id: 14, image: "Products Images/Garcinia Pieces  Dried Garcinia.png", category: "Spices", variants: [{ weight: "100g", price: 300 }, { weight: "250g", price: 700 }],
        en: { name: "Dried Garcinia (Goraka)", description: "Sun-dried Goraka pieces for natural sourness and preservation." },
        si: { name: "ගොරකා", description: "මාළු ඇඹුල් තියල් සඳහා ස්වභාවිකව වේලන ලද ගොරකා." }
    },
    {
        id: 15, image: "Products Images/Meat Curry Powder.png", category: "Chili & Curry", variants: [{ weight: "100g", price: 450 }, { weight: "250g", price: 1000 }],
        en: { name: "Meat Curry Powder", description: "Special blend tailored for cooking delicious, spicy meat curries." },
        si: { name: "විශේෂ මස් තුනපහ", description: "රසවත් සහ සැර මස් හොද්දක් සෑදීමට විශේෂ තුනපහ මිශ්‍රණය." }
    },
];

const businessDetails = {
    phone: "0779185088 / 0322240658",
    email: "vinuudani633@gmail.com",
    facebook: "https://www.facebook.com/share/17u8eC2GGv/",
    map: "https://maps.app.goo.gl/7VrcmR8DRs9CMdF37",
    en: {
        name: "Vinu Udani Grinding Mills",
        motto: "Distributing 100% natural, non-toxic, fresh spices with a rustic flavor throughout Sri Lanka.",
        address: "134/B Sembukattiya, Madampe"
    },
    si: {
        name: "විනු උදානි ග්‍රයින්ඩින් මිල්ස්",
        motto: "100% ස්වභාවික, වසවිසෙන් තොර, ගැමි රසයකින් යුතු කුළු බඩු ශ්‍රී ලංකාව පුරා බෙදා හැරීම.",
        address: "134/B සෙම්බුකට්ටිය, මාදම්පේ"
    }
};
