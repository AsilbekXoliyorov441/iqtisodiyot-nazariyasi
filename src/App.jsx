import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * ✅ TailwindCSS kerak (loyiha sozlangan bo‘lsin)
 * ✅ Paket: framer-motion -> npm i framer-motion
 * ✅ Bu file: App.jsx (Vite/CRA)
 */

const STORAGE_KEY = "econ_quiz_v1";

const QUESTIONS = [
  /* ====== Iqtisodiy ta’limotlar tarixi (1-36) ====== */
  {
    id: "ITH-01",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Iqtisodiy ta’limotlar tarixi fani nimani o'rgatadi?",
    a: "S) Iqtisodiy ta’limotlar tarixini, shakllanishi va rivojlanishini",
  },
  {
    id: "ITH-02",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Adam Smitning takror ishlab chiqarish nazariyasi asosida kimning ta’limoti yotadi?",
    a: "A) F.Kene ta’limoti",
  },
  {
    id: "ITH-03",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Dastlabki taqsimot masalalari kimning nazariyalarida ilmiy asosda aks ettirilgan?",
    a: "B) Adam Smit nazariyasida",
  },
  {
    id: "ITH-04",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Proteksionizm siyosatini kim birinchi marta ilmiy asoslab bergan?",
    a: "S) Monkreten",
  },
  {
    id: "ITH-05",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Siyosiy iqtisod atamasini kim birinchi marta fanga kiritgan?",
    a: "B) Monkreten",
  },
  {
    id: "ITH-06",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Kim tomonidan “ko'rinmas qo'l” ilmiy jihatdan asoslab berilgan?",
    a: "D) A.Smit",
  },
  {
    id: "ITH-07",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Keyns nazariyasiga binoan makroiqtisodda muvozanatga erishish uchun:",
    a: "B) Yalpi talab, yalpi taklifga teng bo'lishi kerak",
  },
  {
    id: "ITH-08",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Iqtisodda qanday sharoitda multiplikator samarasi namoyon bo'ladi?",
    a: "S) To'la bandlilik bo'lmaganda",
  },
  {
    id: "ITH-09",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Taklif o'ziga mos kelgan talabni keltirib chiqaradi. Bu qonun kim tomonidan nazariy jihatdan asoslangan va u qanday ataladi?",
    a: "E) Sey",
  },
  {
    id: "ITH-10",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Ouken qonuni:",
    a: "S) Ishsizlik 1 foizga oshganda yalpi ichki mahsulot 2,5 foizga kamayadi",
  },
  {
    id: "ITH-11",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "F.Engelsning “Anti-Dyuring” asari 3 qismdan iborat. To'g'risini belgilang:",
    a: "D) Falsafa, siyosiy iqtisod, sotsializm",
  },
  {
    id: "ITH-12",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Kapital” asarining muallifi:",
    a: "E) K.Marks, F.Engels",
  },
  {
    id: "ITH-13",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Foydalilik chegarasi” nazariyasining namoyandalari kimlar?",
    a: "E) F.Vizer (shuningdek Menger va Valras)",
  },
  {
    id: "ITH-14",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Kembridj siyosiy iqtisod maktabining asoschisi:",
    a: "B) A.Marshall",
  },
  {
    id: "ITH-15",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Pul muomalasi qonuni nazariyasini kim birinchi marta ilmiy asoslagan?",
    a: "A) K.Marks",
  },
  {
    id: "ITH-16",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Siyosiy iqtisoddagi kategoriyalarni va ularning o'zaro bog'liqligini kim birinchi marta izohlab bergan?",
    a: "D) A.Smit",
  },
  {
    id: "ITH-17",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Xalq boyligi” kitobini kim yozgan?",
    a: "S) A.Smit",
  },
  {
    id: "ITH-18",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Opyt o zakone narodonaseleniya” (Aholi qonuni to'g'risida esse) kitobining muallifi kim?",
    a: "E) Maltus",
  },
  {
    id: "ITH-19",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Klassik siyosiy iqtisod namoyandalarining xizmati:",
    a: "D) Javoblar to'g'ri (ya'ni A, B va S variantlarning barchasi ularning xizmatidir)",
  },
  {
    id: "ITH-20",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Abu Ali Ibn Sinoning ta’limoti qanday dunyoqarashga asoslangan?",
    a: "B) Materialistik dunyoqarash",
  },
  {
    id: "ITH-21",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Qur’on ta’limoti qanday iqtisodiy dunyoqarashga asoslangan?",
    a: "S) Klassik dunyoqarash",
  },
  {
    id: "ITH-22",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Neoliberal iqtisodiy ta’minotni belgilang:",
    a: "A) Monetarizm",
  },
  {
    id: "ITH-23",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Neoklassik sintez” nazariyasining asoschilari kimlar?",
    a: "S) P.Samuelson",
  },
  {
    id: "ITH-24",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "“Neoklassik sintez” nazariyasining mohiyati nimadan iborat?",
    a: "S) Bozor xo'jaligini sog'lomlashtirish uchun taklifga e’tiborni qaratish, ishlab chiqaruvchilarni rag'batlantirish kerak",
  },
  {
    id: "ITH-25",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Tetcher va Reygan siyosati qanday nazariyaga asoslangan?",
    a: "B) Monetarizm ta’limotiga",
  },
  {
    id: "ITH-26",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Dj. Keynsning “Obshaya teoriya zanyatosti protsenta i deneg” kitobining yozilish sababi:",
    a: "B) Jahon iqtisodiy krizisi /1929-33 y/",
  },
  {
    id: "ITH-27",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Iqtisodiy nazariyada institutsional-sotsiologik yo'nalishning mohiyati nimada?",
    a: "A) Sotsial iqtisodiy ziddiyatlarni hal etish qonunlar asosida xususiy davlat korxonalarini tashkil etish va planlashtirishni amalga oshirish",
  },
  {
    id: "ITH-28",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Institutsional-sotsiologik yo'nalish namoyandalari:",
    a: "D) T.Veblen, Dj.Gelbreyt",
  },
  {
    id: "ITH-29",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Markaziy Osiyoda kim “Ideal jamiyat” nazariyasini ilgari surgan?",
    a: "D) Al-Farobiy",
  },
  {
    id: "ITH-30",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Markaziy Osiyoda qaysi olim ishlab chiqarish jarayonida turli mehnatlar o'rnini tahlil qilgan?",
    a: "A) A.R.Beruniy",
  },
  {
    id: "ITH-31",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Yollanma mehnat atamasi birinchi bo'lib kim tomonidan talqin qilingan?",
    a: "S) K.Marks",
  },
  {
    id: "ITH-32",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Pulni olqishlovchi nazariya:",
    a: "B) Merkantelizm",
  },
  {
    id: "ITH-33",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Birinchi marta qaysi iqtisodchi mehnatni unumli va unumsiz mehnatga ajratgan?",
    a: "S) A.Smit",
  },
  {
    id: "ITH-34",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Industrial jamiyatdan keyingi jamiyat konsepsiyasining asoschisi kim?",
    a: "E) Deniel Bell",
  },
  {
    id: "ITH-35",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Qo'shimcha qiymat nazariyasiga birinchi bo'lib kim asos solgan?",
    a: "A) K.Marks",
  },
  {
    id: "ITH-36",
    topic: "Iqtisodiy ta’limotlar tarixi (umumiy)",
    q: "Mehnatni qiymat nazariyasiga qaysi guruh iqtisodchilari asos solganlar?",
    a: "S) Klassik burjua siyosiy iqtisodi",
  },

  /* ====== Qadimgi dunyo iqtisodiy fikrlari (1-36) ====== */
  {
    id: "QAD-01",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Qadimgi dunyo iqtisodiy fikrlarida ideallashtiriladi:",
    a: "B) Natural xo'jalik munosabatlari",
  },
  {
    id: "QAD-02",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Avesto” kitobi yaratildi:",
    a: "D) Qadimgi O'rta Osiyoda",
  },
  {
    id: "QAD-03",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Xalq otasi” tushunchasini dastlab muomalaga kiritgan mutafakkir:",
    a: "B) Konfutsiy",
  },
  {
    id: "QAD-04",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Aristotel xrematistika soxasiga kiritadi:",
    a: "B) Sudxo'rlik va savdo vositasi operatsiyalarini",
  },
  {
    id: "QAD-05",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Oikonomia” atamasini dastlab muomalaga kiritgan - bu:",
    a: "S) Ksenofont",
  },
  {
    id: "QAD-06",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Artxashastra” asari yaratildi:",
    a: "B) Qadimgi Xindistonda",
  },
  {
    id: "QAD-07",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Jamiyat taraqqiyotida extiyojlarning axamiyati tugrisidagi g'oyani ilgari surgan O'rta Osiyo mutafakkiri - bu:",
    a: "S) A.Farobiy",
  },
  {
    id: "QAD-08",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Englar, ichinglar, hadya qilinglar, ammo isrof qilmanglar” deb ko'rsatma beradi:",
    a: "B) Qur’oni karim",
  },
  {
    id: "QAD-09",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "F. Akvinskiyning “odil narx” konsepsiyasiga binoan tovar qiymati asosini tashkil etadi:",
    a: "S) Sarf va axloqiy-etik prinsip birgalikda",
  },
  {
    id: "QAD-10",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "“Siyosiy iqtisod” atamasining muallifi:",
    a: "B) A.Monkreten",
  },
  {
    id: "QAD-11",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Merkantelizm konsepsiyasiga binoan pul boyligi manbai:",
    a: "B) Eksportning importdan ko'p bo'lishi",
  },
  {
    id: "QAD-12",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Merkantelizmning o'rganish predmeti:",
    a: "A) Muomala sohasi",
  },
  {
    id: "QAD-13",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Dastlabki merkantelizmning asosiy g'oyasi - bu:",
    a: "A) Pul balansi",
  },
  {
    id: "QAD-14",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Keyingi rivojlangan merkantelizmning asosiy g'oyasi - bu:",
    a: "B) Savdo balansi",
  },
  {
    id: "QAD-15",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Klassik siyosiy iqtisodning o'rganish predmeti:",
    a: "B) Ishlab chiqarish sohasi",
  },
  {
    id: "QAD-16",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Klassik siyosiy iqtisodning ustuvor iqtisodiy tahlil metodi:",
    a: "B) Sababiy aloqa (kauzalniy) metodi",
  },
  {
    id: "QAD-17",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Klassik siyosiy iqtisodga muvofiq ishchining daromadi sifatidagi ish haqi darajasi intiladi:",
    a: "A) Fiziologik minimumga",
  },
  {
    id: "QAD-18",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Klassik siyosiy iqtisodga muvofiq pul - bu:",
    a: "S) Ayirboshlashni osonlashtiruvchi texnik qurol, ashyo",
  },

  {
    id: "QAD-19",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "U.Petti “Pul” kategoriyasiga qaysi nuqtai nazardan qaradi?",
    a: "B) Metallistik pul nazariyasi",
  },
  {
    id: "QAD-20",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "U.Petti va P.Buagilber asos solgan qiymat nazariyasi aniqlanadi:",
    a: "A) Mehnat sarflari bilan",
  },
  {
    id: "QAD-21",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "F. Kene taklif qilgan tasnif buyicha fermerlar - bu:",
    a: "A) Unumli sinf",
  },
  {
    id: "QAD-22",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "F. Kenening ta’limoti buyicha “sof mahsulot” yaratiladi:",
    a: "B) Qishloq xo'jaligida",
  },
  {
    id: "QAD-23",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Jamiyatning makroiqtisodiy tahlilini ilk bor amalga oshirgan - bu:",
    a: "S) F.Kene",
  },
  {
    id: "QAD-24",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Birinchi bo'lib kapitalni asosiy va aylanma kapitalga, mehnatni esa unumli va unumsiz mehnatga ajratgan - bu:",
    a: "S) A.Smit",
  },
  {
    id: "QAD-25",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Tyurgoning ko'rsatib berishicha, har qanday boylikning yagona manbai:",
    a: "B) Dexqonchilikdagi mehnat",
  },
  {
    id: "QAD-26",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smit fikriga ko'ra, qayerga qo'yilgan kapital haqiqiy boylikka va daromadga ko'proq qiymat qo'shadi?",
    a: "B) Dexqonchilikka",
  },
  {
    id: "QAD-27",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smitning metodologik nuqtai nazariga muvofiq, shaxsiy manfaat:",
    a: "A) Umumiy manfaatdan ajralmagan buladi",
  },
  {
    id: "QAD-28",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smitning “ko'rinmas qo'li” - bu:",
    a: "B) Raqobat erkinligi sharoitida kishilarning irodasiga bog'liq bo'lmagan iqtisodiy qonunlar amal qilishi",
  },
  {
    id: "QAD-29",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Savdo tuzilmasida A.Smit tomonidan birinchi o'ringa qo'yiladi:",
    a: "A) Ichki savdo",
  },
  {
    id: "QAD-30",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smit nazariyasiga muvofiq har bir rivojlangan jamiyatda tovarlar qiymati tashkil topadi:",
    a: "S) Daromadlar summasidan (ish haqi + foyda + renta)",
  },
  {
    id: "QAD-31",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smit mehnatni unumli hisoblaydi, agar u sarflangan bo'lsa:",
    a: "B) Moddiy ishlab chiqarishning har qanday tarmog'ida",
  },
  {
    id: "QAD-32",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smit kapital tuzilishini quyidagi qismlardan qaysi biriga ajratadi?",
    a: "B) Asosiy va aylanma kapital",
  },
  {
    id: "QAD-33",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "A.Smit ta’limotida asosiy g'oya:",
    a: "A) Iqtisodiy liberalizm g'oyasi",
  },
  {
    id: "QAD-34",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "Qiymatni aniqlashda D.Rikardo quyidagilardan qaysi biriga asoslandi?",
    a: "A) Mehnat nazariyasiga",
  },
  {
    id: "QAD-35",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "D.Rikardo “Renta” kategoriyasini qaysi variantda talqin qildi?",
    a: "S) O'rtacha foydadan ortiqcha fermer daromadi sifatida",
  },
  {
    id: "QAD-36",
    topic: "Qadimgi dunyo & o‘rta asrlar",
    q: "D.Rikardo fikri bo'yicha, ish haqi pasayish tendensiyasiga ega, negaki:",
    a: "B) Tug'ilishning yuqori sur’ati ortiqcha mehnat taklifini keltirib chiqaradi",
  },

  /* ====== Rikardo–Keyns–Monetarizm–Institutsionalizm (1-36) ====== */
  {
    id: "RKM-01",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "D.Rikardo buyicha, qaysi sabablar keltirib chiqaradi?",
    a: "S) Yer unumdorligining pasayishi sababli undan olinadigan mahsulotlar bahosining oshishi",
  },
  {
    id: "RKM-02",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "“Qiyosiy ustunlik” nazariyasining asoschisi - bu:",
    a: "B) D.Rikardo",
  },
  {
    id: "RKM-03",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.B. Seyning “bozor qonuni” asosiy qoidalari:",
    a: "E) Yuqoridagilarning barchasi",
  },
  {
    id: "RKM-04",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Kimning iqtisodiy ta’limoti vujudga kelishi bilan “Sey qonuni” o'z kuchini yo'qotdi?",
    a: "S) J.M.Keynsning",
  },
  {
    id: "RKM-05",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "T. Maltusning nufus nazariyasiga binoan kambag'allikning bosh sababi:",
    a: "A) Aholi soni o'sishining doimiy yuqori sur’ati",
  },
  {
    id: "RKM-06",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "T.Maltusning nufus nazariyasini quyidagilardan kim qat'iy inkor etdi?",
    a: "S) K.Marks",
  },
  {
    id: "RKM-07",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "T.Maltus fikri buyicha takror ishlab chiqarishdagi “uchinchi shaxs”-bu:",
    a: "A) Jamiyatning unumsiz qismi",
  },
  {
    id: "RKM-08",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Sotsializmning nazariy-metodologik muammolarini ko'rib chiqishga jazm qilgan klassik siyosiy iqtisodning birinchi muallifi:",
    a: "B) J.S.Mill",
  },
  {
    id: "RKM-09",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.S.Millning islohot konsepsiyasida tavsiya etiladi:",
    a: "E) Yuqoridagilarning barchasi",
  },
  {
    id: "RKM-10",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "“Kapital” kategoriyasini ekspluatatsiya vositasi va o'z-o'zidan o'suvchi qiymat sifatida tavsiflagan yagona klassik siyosiy iqtisod vakili:",
    a: "S) K.Marks",
  },
  {
    id: "RKM-11",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "K.Marks fikriga kura, foyda normasining pasayish tendensiyasini qaysi sabablar keltirib chiqaradi?",
    a: "S) Doimiy kapital hissasi oshishi bilan kuzatiladigan kapital jamg'arilishi",
  },
  {
    id: "RKM-12",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "K.Marksning takror ishlab chiqarish nazariyasida asoslab berilgan qoidalar - bu:",
    a: "B) Oddiy va kengaytirilgan takror ishlab chiqarish farqi",
  },
  {
    id: "RKM-13",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Marjinalizm tadqiqoti asoslanadi:",
    a: "S) Me’yoriy iqtisodiy miqdorlarga",
  },
  {
    id: "RKM-14",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Marjinalistlar bo'yicha tovar qiymatini ifodalash asoslanadi:",
    a: "S) Me’yoriy foydalilik nazariyasiga",
  },
  {
    id: "RKM-15",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "A.Marshall fikriga kura tovar qiymatini ifodalash asoslanadi:",
    a: "D) Me’yoriy foydalilik va me’yoriy xarajatlar nazariyalariga",
  },
  {
    id: "RKM-16",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.M. Keyns fikriga kura, investitsiyaga bo'lgan talabni rag'batlantirish uchun ssuda foizi normasini:",
    a: "B) Kamaytirishga",
  },
  {
    id: "RKM-17",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Davlatning iqtisodiyotga aralashuvi zarurligi nazariyasini ilgari surdi:",
    a: "B) Keynschilar",
  },
  {
    id: "RKM-18",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.M.Keyns nazariyasiga muvofiq jamg'armalar investitsiyalardan oshishi mumkin, agar:",
    a: "B) Uzoq vaqt ortiqcha ishlab chiqarish va ishsizlik mavjud bo'lsa",
  },
  {
    id: "RKM-19",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.M.Keyns fikricha, mamlakatdagi iste’mol xarajatlari hajmi eng avvalo bog'liq bo'ladi:",
    a: "S) Milliy daromad darajasiga",
  },
  {
    id: "RKM-20",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "D.J.Keyns ta’limotiga muvofiq daromadlarning oshib borishi bilan jamg'arma bo'lgan moyillik:",
    a: "A) Oshib boradi",
  },
  {
    id: "RKM-21",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Iqtisodiy o'sishni bozor mexanizmi ta’minlaydi, bu mexanizmning asosiy vositasi pul, degan g'oya - bu:",
    a: "B) Monetarizm g'oyasi",
  },
  {
    id: "RKM-22",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Bekarorlik, inflyatsiya va ishsizlik... davlat tartibga solib turishi kerak, degan g'oya:",
    a: "S) Keynschilik",
  },
  {
    id: "RKM-23",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Iqtisodiyotni barqaror rivojlantirishda pul asosiy rol o'ynaydi - bu:",
    a: "A) Monetarizm konsepsiyasi",
  },
  {
    id: "RKM-24",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "J.M. Keyns ta’limotiga muvofiq daromadlar o'zgarishining investitsiyalar o'zgarishiga bog'liqligi aks ettiriladi:",
    a: "B) Multiplikatorda",
  },
  {
    id: "RKM-25",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "“Bekorchilar sinfi” nazariyasi muallifi kim hisoblanadi:",
    a: "A) T.Veblen",
  },
  {
    id: "RKM-26",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Konvergensiya nazariyasi - bu:",
    a: "A) Kapitalizm va sotsializm afzalliklari sinteziga asoslanadi",
  },
  {
    id: "RKM-27",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Qur’oni Karimda aks etgan asosiy iqtisodiy g'oya nimadan iborat?",
    a: "S) Musulmonlar qardoshlik g'oyasi..., savdoga katta o'rin berilgan...",
  },
  {
    id: "RKM-28",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Mayda iqtisodiyot nazariyotchilari maktabining asosiy vakillari:",
    a: "D) Yuqoridagilarning hammasi",
  },
  {
    id: "RKM-29",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Marjinalizmning Lozanna “Shveysariya” deb ataluvchi maktabining asoschisi kim?",
    a: "A) L.Valras",
  },
  {
    id: "RKM-30",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Islom aqidalari bo'yicha savdo foydasining eng yuqori foydasi qancha?",
    a: "E) 5 %",
  },
  {
    id: "RKM-31",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Iqtisodiyotda matematik uslub dastlab kim tomonidan kiritildi?",
    a: "A) A.Kurno",
  },
  {
    id: "RKM-32",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Markaziy Osiyoda yashab o'tgan qaysi mutafakkirlar asarlarida iqtisodiy g'oyalar o'z aksini topgan?",
    a: "E) Yuqoridagilarning barchasining asarlari",
  },
  {
    id: "RKM-33",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Hozirgi zamon iqtisodiyot nazariyasining qaysi oqimida pul asosiy vosita deb hisoblanadi?",
    a: "B) Monetarizm",
  },
  {
    id: "RKM-34",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "“Iqtisodiy odam” (Homo economicus) tushunchasining asoschisi kim?",
    a: "A) A.Smit",
  },
  {
    id: "RKM-35",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Tovar qiymati uning foydaliligi bilan o'lchanadi deb qaysi iqtisodchi aytgan?",
    a: "E) J.B.Sey",
  },
  {
    id: "RKM-36",
    topic: "Rikardo–Keyns–Monetarizm",
    q: "Mayda burjuacha siyosiy iqtisod asoschilarining iqtisodiy g'oyalari nimalardan iborat?",
    a: "E) Yuqoridagilarning hammasi to'g'ri",
  },

  /* ====== Qisqa savollar (10 ta) ====== */
  {
    id: "QS1-01",
    topic: "Qisqa savollar 1",
    q: "Merkantilizm so‘zining ma’nosi nima?",
    a: "Italyancha ‘savdogar’",
  },
  {
    id: "QS1-02",
    topic: "Qisqa savollar 1",
    q: "Jamiyatning boyligi qishloq xo‘jaligida vujudga keladi, degan g‘oyani ilgari surgan kimlar?",
    a: "Fiziokratlar",
  },
  {
    id: "QS1-03",
    topic: "Qisqa savollar 1",
    q: "Neoklassik maktab asoschisi kim?",
    a: "Alfred Marshall",
  },
  {
    id: "QS1-04",
    topic: "Qisqa savollar 1",
    q: "Mesopatamiya so‘zining ma’nosi nima?",
    a: "Yunoncha ‘ikki daryo oralig‘i’",
  },
  {
    id: "QS1-05",
    topic: "Qisqa savollar 1",
    q: "Yer dumaloq shaklda yaratilganligi... yozilgan kitob qaysi?",
    a: "‘Avesto’",
  },
  {
    id: "QS1-06",
    topic: "Qisqa savollar 1",
    q: "Qaysi mualliflar ‘davlatni boy, xalqni mamnun holda ko‘rishni xohlaganlar’?",
    a: "‘Arthashastra’",
  },
  {
    id: "QS1-07",
    topic: "Qisqa savollar 1",
    q: "Kim ‘Daromadlar to‘g‘risida’ asarida Afina davlatining iqtisodiy holatini tahlil qiladi?",
    a: "Ksenofont",
  },
  {
    id: "QS1-08",
    topic: "Qisqa savollar 1",
    q: "Platonning qaysi asarlarida natural xo‘jalik konsepsiyasi bor?",
    a: "‘Davlat’ va ‘Qonunlar’",
  },
  {
    id: "QS1-09",
    topic: "Qisqa savollar 1",
    q: "Katta Mark Portsiy Katon qaysi asarida qishloq xo‘jaligini asosiy tarmoq deb hisoblaydi?",
    a: "‘Dehqonchilik to‘g‘risida’",
  },
  {
    id: "QS1-10",
    topic: "Qisqa savollar 1",
    q: "Yirik savdo yo‘li bilan boylik orttirish mahoratini nima deb atashgan?",
    a: "Xrematistika",
  },

  /* ====== Qisqa savollar 2 (10 ta) ====== */
  {
    id: "QS2-01",
    topic: "Qisqa savollar 2",
    q: "“Qayerga borishimizni bilish uchun, qayerdan chiqqan ekanligimizni bilishimiz kerak” degan g'oyaning muallifi kim?",
    a: "a) Uinston Cherchill",
  },
  {
    id: "QS2-02",
    topic: "Qisqa savollar 2",
    q: "Hindistonda iqtisodiy g'oyalarni aks ettiruvchi qadimgi yodgorlik...?",
    a: "a) Artxashstra",
  },
  {
    id: "QS2-03",
    topic: "Qisqa savollar 2",
    q: "“Lun yuy” asari muallifi kim?",
    a: "a) Kun-Tszi (Konfutsiy)",
  },
  {
    id: "QS2-04",
    topic: "Qisqa savollar 2",
    q: "“Kitob-ul-ibar” asari muallifi kim?",
    a: "a) Xaldun Abdurrahmon Abu Zayd (Ibn Xaldun)",
  },
  {
    id: "QS2-05",
    topic: "Qisqa savollar 2",
    q: "G'arbiy Yevropada feodalizm jamiyati nechta bosqichni bosib o'tdi?",
    a: "c) 2",
  },
  {
    id: "QS2-06",
    topic: "Qisqa savollar 2",
    q: "Har bir xonadondan olinadigan soliq nomi nima?",
    a: "a) xonshumor",
  },
  {
    id: "QS2-07",
    topic: "Qisqa savollar 2",
    q: "Pulning nechta asosiy vazifasi bor?",
    a: "d) 5",
  },
  {
    id: "QS2-08",
    topic: "Qisqa savollar 2",
    q: "“Don sochuvchi dehqon...” fikr muallifi kim?",
    a: "a) Alisher Navoiy",
  },
  {
    id: "QS2-09",
    topic: "Qisqa savollar 2",
    q: "“Nikomax axloqi” va “Siyosat” kitoblari muallifi kim?",
    a: "a) Aristotel",
  },
  {
    id: "QS2-10",
    topic: "Qisqa savollar 2",
    q: "T. Kampanella asari qaysi?",
    a: "a) “Oftob shahri”",
  },

  /* ====== Temuriylar (30 ta) ====== */
  {
    id: "TEM-01",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Amir Temur davlatida qaysi organ soliq yig‘ish, tartib saqlash... nazorat qilgan?",
    a: "B) Devon",
  },
  {
    id: "TEM-02",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Raiyatni xonavayron qilish qaybi natijaga olib keladi?",
    a: "B) Xazina kambag‘allashishi",
  },
  {
    id: "TEM-03",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Qaysi turdagi yerlar bir avloddan ikkinchisiga o‘tgan va soliqdan ozod qilingan?",
    a: "D) Tarxon",
  },
  {
    id: "TEM-04",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Amir Temur chetdan keltirilgan tovarlar ustiga qancha foiz narx qo‘shib sotishga ruxsat bergan?",
    a: "C) 15%",
  },
  {
    id: "TEM-05",
    topic: "Temuriylar iqtisodiy fikri",
    q: "“Temur tuzuklari”da davlat nechta ijtimoiy toifaga bo‘lingan?",
    a: "B) 12",
  },
  {
    id: "TEM-06",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Amir Temur qaysi taniqli olim bilan suhbatlashib, uni izzat-ikrom bilan qo‘yib yuborgan?",
    a: "C) Ibn Xoldun",
  },
  {
    id: "TEM-07",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Ulug‘bek qaysi yilda pul islohotini o‘tkazgan?",
    a: "B) 1428",
  },
  {
    id: "TEM-08",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Ulug‘bek davrida zarbxona qaysi shaharda saqlanib qolingan?",
    a: "A) Samarqand",
  },
  {
    id: "TEM-09",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Ulug‘bek davrida soliq qachon to‘lanishi belgilangan?",
    a: "B) Hosil pishishiga qarab uch muddatda",
  },
  {
    id: "TEM-10",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Alisher Navoiyning dastlabki ijtimoiy-iqtisodiy fikrlari qaysi asarda shakllangan?",
    a: "A) Mahbub-ul-qulub",
  },
  {
    id: "TEM-11",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiyning fikricha, mamlakatning iqtisodiy ahvoli kimga bog‘liq?",
    a: "B) Hukmdorning aql-idrokiga",
  },
  {
    id: "TEM-12",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiy boylikni qanday yo‘l bilan topishni maqbul deb bilgan?",
    a: "B) O‘z mehnati bilan",
  },
  {
    id: "TEM-13",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiy olibsotarlar haqida qanday fikr bildirgan?",
    a: "C) G‘arazli odamlar",
  },
  {
    id: "TEM-14",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiy jamiyatdagi ijtimoiy guruhlarning o‘rni haqida qaysi asarida yozgan?",
    a: "A) Mahbub-ul-qulub",
  },
  {
    id: "TEM-15",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiyning fikricha, dehqon nima uchun ko‘proq mahsulot ishlab chiqaradi?",
    a: "B) O‘z ehtiyojidan tashqari",
  },
  {
    id: "TEM-16",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Boburning “Mubayyin” asari nima haqida?",
    a: "B) Qonunlar va iqtisodiy masalalar",
  },
  {
    id: "TEM-17",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Bobur davrida qaysi soliq turi maydonga bog‘liq edi?",
    a: "B) Xiroj",
  },
  {
    id: "TEM-18",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Bobur qaysi ichimlikni mamlakatga keltirishni taqiqlagan?",
    a: "A) Vino",
  },
  {
    id: "TEM-19",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Boburiylar davrida musulmon bo‘lmagan mamlakatlardan kelgan savdogarlardan qancha soliq olingan?",
    a: "C) 10%",
  },
  {
    id: "TEM-20",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Bobur qaysi hukmdor bilan soliq islohotini olib borgan?",
    a: "A) Xumoyun",
  },
  {
    id: "TEM-21",
    topic: "Temuriylar iqtisodiy fikri",
    q: "“Temur tuzuklari”da qanday soliq miqdori keltirilgan?",
    a: "C) 25-33%",
  },
  {
    id: "TEM-22",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Amir Temur qaysi mamlakatlar bilan savdo aloqalarini rivojlantirishga harakat qilgan?",
    a: "B) Xitoy va Hindiston",
  },
  {
    id: "TEM-23",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Ulug‘bek davrida “fulusi adliya” deb qanday pul atalgan?",
    a: "C) Mis fulus",
  },
  {
    id: "TEM-24",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiyning fikricha, qaysi kasb egalari boylik yaratishda muhim o‘rin tutadi?",
    a: "A) Dehqonlar, hunarmandlar, savdogarlar",
  },
  {
    id: "TEM-25",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Bobur qaysi asarida “bir yurt tovarining boshqa yurtlarga olib borilishi” haqida yozgan?",
    a: "A) Boburnoma",
  },
  {
    id: "TEM-26",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Amir Temur davrida qanday inshootlar qurilgan?",
    a: "A) Karvonsaroy, sardoba, ko‘prik",
  },
  {
    id: "TEM-27",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Ulug‘bek davrida soliq yig‘ishda qanday qatiy qoida joriy etilgan?",
    a: "A) G‘alla g‘aram qilinmasdan avval soliq to‘lash man etilgan",
  },
  {
    id: "TEM-28",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Navoiy qanday boylikni nomaqbul deb bilgan?",
    a: "A) O‘g‘rilik, zo‘rlik orqali topilgan",
  },
  {
    id: "TEM-29",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Bobur davrida qo‘ylardan qancha soliq (zakot) olingan?",
    a: "A) 2,5%",
  },
  {
    id: "TEM-30",
    topic: "Temuriylar iqtisodiy fikri",
    q: "Temuriylar davrida qaysi hukmdor astronomiya va matematika bilan shug‘ullangan?",
    a: "A) Ulug‘bek",
  },

  /* ====== Klassik iqtisodiy maktab (30 ta) ====== */
  {
    id: "KIM-01",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik iqtisodiy maktab qaysi asrda shakllana boshlagan?",
    a: "C) XVIII asr",
  },
  {
    id: "KIM-02",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik iqtisodiy maktabning Angliyadagi dastlabki vakili kim?",
    a: "B) Uilyam Petti",
  },
  {
    id: "KIM-03",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti qaysi soha asoschisi hisoblanadi?",
    a: "B) Angliya klassik siyosiy iqtisodiy maktabi",
  },
  {
    id: "KIM-04",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Pettining “Boylikning otasi” deb atagan narsasi nima?",
    a: "B) Mehnat",
  },
  {
    id: "KIM-05",
    topic: "Klassik iqtisodiy maktab",
    q: "Pyer Buagilber qaysi mamlakat klassik iqtisodiy maktabi asoschisi?",
    a: "B) Fransiya",
  },
  {
    id: "KIM-06",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi sohani yagona unumli soha deb hisoblashgan?",
    a: "C) Qishloq xo‘jaligi",
  },
  {
    id: "KIM-07",
    topic: "Klassik iqtisodiy maktab",
    q: "Fransua Kene qaysi maktab asoschisi?",
    a: "B) Fiziokratizm",
  },
  {
    id: "KIM-08",
    topic: "Klassik iqtisodiy maktab",
    q: "“Iqtisodiy jadval” asari kimga tegishli?",
    a: "C) Fransua Kene",
  },
  {
    id: "KIM-09",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar bo‘yicha “sof mahsulot” qayerda yaratiladi?",
    a: "C) Qishloq xo‘jaligida",
  },
  {
    id: "KIM-10",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti ish haqini nima bilan bog‘lagan?",
    a: "B) Yashash uchun zarur vositalar minimumi",
  },
  {
    id: "KIM-11",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik iqtisodchilar qanday bozorni qo‘llab-quvvatlashgan?",
    a: "B) Erkin, boshqaruvsiz",
  },
  {
    id: "KIM-12",
    topic: "Klassik iqtisodiy maktab",
    q: "Pyer Buagilberning merkantilizmga munosabati?",
    a: "B) Tanqid qildi",
  },
  {
    id: "KIM-13",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi tushunchani “dastlabki avanslar” deb atashgan?",
    a: "B) Asosiy kapital",
  },
  {
    id: "KIM-14",
    topic: "Klassik iqtisodiy maktab",
    q: "Adam Smit fiziokratlar g‘oyalarini qanday baholagan?",
    a: "A) Haqiqatga eng yaqin",
  },
  {
    id: "KIM-15",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti qaysi fan sohasida doktorlik darajasiga ega bo‘lgan?",
    a: "C) Tibbiyot",
  },
  {
    id: "KIM-16",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi sinfni “unumsiz” deb atashgan?",
    a: "C) Hunarmandlar va savdogarlar",
  },
  {
    id: "KIM-17",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik maktabning asosiy belgilaridan biri:",
    a: "B) Qiymatning mehnat nazariyasi",
  },
  {
    id: "KIM-18",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti “Renta” tushunchasini qanday izohlagan?",
    a: "A) Mahsulot qiymati bilan xarajatlar farqi",
  },
  {
    id: "KIM-19",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi siyosatni qattiq tanqid qilishgan?",
    a: "B) Proteksionizm",
  },
  {
    id: "KIM-20",
    topic: "Klassik iqtisodiy maktab",
    q: "“Tabiiy tartib” tushunchasi kimga tegishli?",
    a: "B) Fransua Kene",
  },
  {
    id: "KIM-21",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti qaysi usulni iqtisodiy tahlilda qo‘llagan?",
    a: "B) Statistik",
  },
  {
    id: "KIM-22",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi sinfni “unumli” deb atashgan?",
    a: "C) Fermerlar va dehqonlar",
  },
  {
    id: "KIM-23",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik maktab vakillari qanday erkinlikni targ‘ib qilishgan?",
    a: "C) Iqtisodiy",
  },
  {
    id: "KIM-24",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti “boylik” tushunchasiga nimalarni kiritgan?",
    a: "B) Yer, uylar, kemalar, tovarlar",
  },
  {
    id: "KIM-25",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi nazariyani ilgari surishgan?",
    a: "B) Qiymatning mehnat nazariyasi",
  },
  {
    id: "KIM-26",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik iqtisodiy maktab qaysi tizimning afzalliklarini asoslab bergan?",
    a: "B) Kapitalistik",
  },
  {
    id: "KIM-27",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti savdogarlarni nimaga qiyoslagan?",
    a: "B) “Qon” taqsimlovchi “o‘yinchilar”",
  },
  {
    id: "KIM-28",
    topic: "Klassik iqtisodiy maktab",
    q: "Fiziokratlar qaysi tushunchani “har yilgi avanslar” deb atashgan?",
    a: "B) Aylanma kapital",
  },
  {
    id: "KIM-29",
    topic: "Klassik iqtisodiy maktab",
    q: "Klassik maktabning rivojlanishiga qaysi mamlakat yetakchilik qilgan?",
    a: "C) Angliya",
  },
  {
    id: "KIM-30",
    topic: "Klassik iqtisodiy maktab",
    q: "Uilyam Petti qaysi asarida “Siyosiy arifmetika” usulini qo‘llagan?",
    a: "C) “Siyosiy arifmetika”",
  },
];


/* ----------------------------- UTILITIES ----------------------------- */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str) ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeText(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s%.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP = new Set([
  "va",
  "yoki",
  "bu",
  "deb",
  "kim",
  "qaysi",
  "bilan",
  "uchun",
  "asosida",
  "binoan",
  "bo‘yicha",
  "boyicha",
  "to'g'risida",
  "tugrisida",
  "nega",
  "qachon",
  "nechta",
  "nima",
  "nimadan",
  "qanday",
  "qayerda",
  "qayerga",
  "shart",
  "deg",
  "the",
  "of",
  "a",
  "an",
  "to",
]);

function keywordScore(user, correct) {
  const u = normalizeText(user)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w));
  const c = normalizeText(correct)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w));
  if (!c.length) return 0;
  const U = new Set(u);
  const C = new Set(c);
  let inter = 0;
  for (const w of C) if (U.has(w)) inter++;
  return inter / C.size;
}

function pickWeighted(items, weightFn) {
  const weights = items.map(weightFn);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

/* ----------------------------- STORAGE STATE ----------------------------- */
function loadState() {
  const base = {
    boxes: {}, // id -> { box:1..5, correct, wrong, last }
    mn: {}, // id -> mnemonic note
    starred: {}, // id -> true
    wrongBank: {}, // id -> true
  };
  if (typeof window === "undefined") return base;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return base;
  return { ...base, ...safeJsonParse(raw, base) };
}

function saveState(st) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
  } catch {}
}

/* ----------------------------- ANIM VARIANTS ----------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.16 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.14 } },
};

/* ----------------------------- MAIN APP ----------------------------- */
export default function App() {
  const allTopics = useMemo(
    () => ["ALL", ...Array.from(new Set(QUESTIONS.map((q) => q.topic)))],
    [],
  );

  const [topic, setTopic] = useState("ALL");
  const [mode, setMode] = useState("home"); // home | quiz | flash | type | review
  const [sessionSize, setSessionSize] = useState(20);
  const [smartMix, setSmartMix] = useState(true);

  const [store, setStore] = useState(() => loadState());

  const pool = useMemo(() => {
    return topic === "ALL"
      ? QUESTIONS
      : QUESTIONS.filter((x) => x.topic === topic);
  }, [topic]);

  const stats = useMemo(() => {
    const total = pool.length;
    let mastered = 0;
    let seen = 0;
    for (const q of pool) {
      const b = store.boxes[q.id]?.box ?? 1;
      if (store.boxes[q.id]) seen++;
      if (b >= 4) mastered++;
    }
    return { total, seen, mastered };
  }, [pool, store.boxes]);

  // Session
  const [sessionIds, setSessionIds] = useState([]);
  const [idx, setIdx] = useState(0);

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [options, setOptions] = useState([]);

  const [typed, setTyped] = useState("");
  const [typeScore, setTypeScore] = useState(0);

  const [combo, setCombo] = useState(0);
  const [xp, setXp] = useState(0);

  const current = useMemo(() => {
    const id = sessionIds[idx];
    return QUESTIONS.find((q) => q.id === id) || null;
  }, [sessionIds, idx]);

  // Build session
  function buildSession(kind) {
    const base = pool.length ? pool : QUESTIONS;

    let selectedQs = [];
    if (kind === "review") {
      const wrongIds = Object.keys(store.wrongBank || {});
      const wrongPool = base.filter((q) => wrongIds.includes(q.id));
      selectedQs = wrongPool.length ? wrongPool : base;
    } else if (!smartMix) {
      selectedQs = shuffle(base);
    } else {
      const take = Math.min(sessionSize, base.length);
      const chosen = [];
      const available = [...base];

      for (let i = 0; i < take && available.length; i++) {
        const picked = pickWeighted(available, (q) => {
          const b = store.boxes[q.id]?.box ?? 1;
          const star = store.starred[q.id] ? 1.25 : 1.0;
          const wrong = store.wrongBank[q.id] ? 1.35 : 1.0;
          const w = (6 - b) * star * wrong; // box1 -> 5, box5 ->1
          return Math.max(0.2, w);
        });
        chosen.push(picked);
        const k = available.findIndex((x) => x.id === picked.id);
        available.splice(k, 1);
      }
      selectedQs = chosen;
    }

    const ids = selectedQs
      .slice(0, Math.min(sessionSize, selectedQs.length))
      .map((q) => q.id);

    setSessionIds(ids);
    setIdx(0);

    setSelected(null);
    setSubmitted(false);
    setIsCorrect(null);

    setOptions([]);
    setTyped("");
    setTypeScore(0);

    setCombo(0);
    setXp(0);
  }

  function makeOptions(qObj) {
    const sameTopic = QUESTIONS.filter(
      (x) => x.topic === qObj.topic && x.id !== qObj.id,
    );
    const other = QUESTIONS.filter((x) => x.id !== qObj.id);

    const distractorPool = sameTopic.length >= 8 ? sameTopic : other;
    const picks = shuffle(distractorPool)
      .map((x) => x.a)
      .filter((a) => a !== qObj.a);

    const uniq = [];
    for (const a of picks) {
      if (!uniq.includes(a)) uniq.push(a);
      if (uniq.length === 3) break;
    }
    const opts = shuffle([qObj.a, ...uniq]);
    setOptions(opts);
  }

  useEffect(() => {
    if (typeof window !== "undefined") saveState(store);
  }, [store]);

  useEffect(() => {
    if (mode === "quiz" && current) {
      makeOptions(current);
    }
  }, [mode, current?.id]);

  const progress = useMemo(() => {
    if (!sessionIds.length) return 0;
    return ((idx + (submitted ? 1 : 0)) / sessionIds.length) * 100;
  }, [idx, submitted, sessionIds.length]);

  function updateBox(id, correct) {
    setStore((prev) => {
      const next = {
        ...prev,
        boxes: { ...prev.boxes },
        wrongBank: { ...prev.wrongBank },
      };
      const cur = next.boxes[id] || { box: 1, correct: 0, wrong: 0, last: 0 };
      if (correct) {
        cur.box = clamp(cur.box + 1, 1, 5);
        cur.correct += 1;
        delete next.wrongBank[id];
      } else {
        cur.box = clamp(cur.box - 1, 1, 5);
        cur.wrong += 1;
        next.wrongBank[id] = true;
      }
      cur.last = Date.now();
      next.boxes[id] = cur;
      return next;
    });
  }

  function submitQuiz() {
    if (!current || selected == null) return;
    const ok = options[selected] === current.a;
    setSubmitted(true);
    setIsCorrect(ok);

    updateBox(current.id, ok);

    setCombo((c) => (ok ? c + 1 : 0));
    setXp((x) => x + (ok ? 12 : 3) + Math.min(combo * 2, 12));
  }

  function submitTyping() {
    if (!current) return;
    const score = keywordScore(typed, current.a);
    setTypeScore(score);
    const ok = score >= 0.55;
    setSubmitted(true);
    setIsCorrect(ok);

    updateBox(current.id, ok);

    setCombo((c) => (ok ? c + 1 : 0));
    setXp((x) => x + (ok ? 14 : 4) + Math.min(combo * 2, 12));
  }

  function nextQ() {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(null);
    setTyped("");
    setTypeScore(0);

    if (idx + 1 >= sessionIds.length) {
      setMode("home");
      return;
    }
    setIdx((i) => i + 1);
  }

  function toggleStar(id) {
    setStore((prev) => {
      const next = { ...prev, starred: { ...prev.starred } };
      next.starred[id] = !next.starred[id];
      if (!next.starred[id]) delete next.starred[id];
      return next;
    });
  }

  function setMnemonic(id, text) {
    setStore((prev) => {
      const next = { ...prev, mn: { ...prev.mn } };
      if (text?.trim()) next.mn[id] = text.trim();
      else delete next.mn[id];
      return next;
    });
  }

  function resetAll() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setStore(loadState());
    setMode("home");
  }

  /* ----------------------------- UI CLASSES ----------------------------- */
  const bg = "bg-slate-950 text-slate-100";
  const card =
    "bg-slate-900/60 border border-slate-700/60 rounded-2xl shadow-xl";
  const btn =
    "px-4 py-2 rounded-xl font-semibold border border-slate-700/70 bg-slate-800/60 hover:bg-slate-800 active:scale-[0.99] transition";
  const btnPrimary =
    "px-4 py-2 rounded-xl font-semibold bg-emerald-500/90 hover:bg-emerald-500 text-slate-950 active:scale-[0.99] transition";
  const btnDanger =
    "px-4 py-2 rounded-xl font-semibold bg-rose-500/90 hover:bg-rose-500 text-slate-950 active:scale-[0.99] transition";

  const Confetti = ({ show }) => {
    const dots = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);
    if (!show) return null;
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {dots.map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1, 0.9],
              x: (Math.random() - 0.5) * 520,
              y: -80 - Math.random() * 360,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 0.9 + Math.random() * 0.4,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-2/3 h-2 w-2 rounded-full bg-amber-300"
          />
        ))}
      </div>
    );
  };

  const Header = () => (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-emerald-500/90 shadow-lg" />
        <div>
          <div className="text-xl font-extrabold tracking-tight">
            ECON QUIZ LAB <span className="text-emerald-400">⚡</span>
          </div>
          <div className="text-xs text-slate-300">
            SmartMix • Flashcards • Typing • Wrong Review • Mnemonic
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900/60 text-sm">
          <span className="text-slate-300">XP:</span>{" "}
          <span className="font-bold text-emerald-300">{xp}</span>{" "}
          <span className="text-slate-500">•</span>{" "}
          <span className="text-slate-300">Combo:</span>{" "}
          <span className="font-bold text-amber-300">{combo}</span>
        </div>

        <button className={btn} onClick={() => setMode("home")}>
          Home
        </button>
        <button
          className={btnDanger}
          onClick={resetAll}
          title="Hamma progressni tozalaydi"
        >
          Reset
        </button>
      </div>
    </div>
  );

  const TopicPicker = () => (
    <div className={`${card} p-4`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <div className="text-sm text-slate-300 mb-2">Topic tanla:</div>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-slate-950/40 border border-slate-700/70 px-3 py-2 outline-none"
          >
            {allTopics.map((t) => (
              <option key={t} value={t} className="bg-slate-950">
                {t}
              </option>
            ))}
          </select>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50">
              Savollar: <b className="text-white">{stats.total}</b>
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50">
              Ko‘rilgan: <b className="text-white">{stats.seen}</b>
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50">
              Master (box≥4):{" "}
              <b className="text-emerald-300">{stats.mastered}</b>
            </span>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div>
            <div className="text-sm text-slate-300 mb-2">Session:</div>
            <input
              type="number"
              min={5}
              max={120}
              value={sessionSize}
              onChange={(e) =>
                setSessionSize(clamp(Number(e.target.value || 20), 5, 120))
              }
              className="w-28 rounded-xl bg-slate-950/40 border border-slate-700/70 px-3 py-2 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-200 select-none">
            <input
              type="checkbox"
              checked={smartMix}
              onChange={(e) => setSmartMix(e.target.checked)}
              className="h-4 w-4"
            />
            SmartMix
          </label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <button
          className={btnPrimary}
          onClick={() => {
            buildSession("quiz");
            setMode("quiz");
          }}
        >
          🚀 Quiz (MCQ)
        </button>

        <button
          className={btn}
          onClick={() => {
            buildSession("flash");
            setMode("flash");
          }}
        >
          🧠 Flashcards
        </button>

        <button
          className={btn}
          onClick={() => {
            buildSession("type");
            setMode("type");
          }}
        >
          ✍️ Typing mode
        </button>

        <button
          className={btn}
          onClick={() => {
            buildSession("review");
            setMode("review");
          }}
          title="WrongBank bo‘yicha qayta ishlash"
        >
          🧯 Wrong review
        </button>

        <button
          className={btnDanger}
          onClick={resetAll}
          title="Hamma progressni tozalaydi"
        >
          ♻️ Reset
        </button>
      </div>
    </div>
  );

  const ProgressBar = () => (
    <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/60">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
        className="h-full bg-emerald-500/90"
      />
    </div>
  );

  const Pill = ({ children }) => (
    <span className="px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200">
      {children}
    </span>
  );

  const SessionShell = ({ children, title }) => (
    <div className={`${card} p-5 relative overflow-hidden`}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-extrabold">{title}</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <Pill>
              {idx + 1}/{sessionIds.length || 0}
            </Pill>
            <Pill>Topic: {topic}</Pill>
            <Pill>
              Box: {current ? (store.boxes[current.id]?.box ?? 1) : "-"}
            </Pill>
            <Pill>
              Star: {current && store.starred[current.id] ? "⭐" : "—"}
            </Pill>
          </div>
        </div>

        <div className="w-full md:w-64">
          <ProgressBar />
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );

  const QABox = ({ showAnswer, answerExtra }) => {
    if (!current) return null;

    const isStar = !!store.starred[current.id];
    const box = store.boxes[current.id]?.box ?? 1;

    return (
      <div className="relative">
        <div className="flex flex-col gap-3">
          <div className="text-sm text-slate-300">
            {current.topic} •{" "}
            <span className="text-slate-400">{current.id}</span>
          </div>

          <div className="text-xl md:text-2xl font-extrabold leading-snug">
            {current.q}
          </div>

          {showAnswer && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-2 p-4 rounded-2xl bg-slate-950/40 border border-slate-700/60"
            >
              <div className="text-sm text-slate-300 mb-1">To‘g‘ri javob:</div>
              <div className="font-bold text-emerald-300">{current.a}</div>
              {answerExtra}
            </motion.div>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            <button className={btn} onClick={() => toggleStar(current.id)}>
              {isStar ? "⭐ Starred" : "☆ Star"}
            </button>

            <div className="px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900/60 text-sm">
              Box: <b className="text-amber-300">{box}</b>
            </div>
          </div>

          <div className="mt-2">
            <div className="text-sm text-slate-300 mb-2">
              Mnemonic (eslab qolish uchun):
            </div>
            <textarea
              value={store.mn[current.id] || ""}
              onChange={(e) => setMnemonic(current.id, e.target.value)}
              placeholder="Masalan: “Ko‘rinmas qo‘l” — Smit — bozor o‘zi muvozanat..."
              className="w-full min-h-[90px] rounded-2xl bg-slate-950/40 border border-slate-700/70 px-3 py-2 outline-none"
            />
          </div>
        </div>
      </div>
    );
  };

  const Home = () => (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="grid gap-4"
    >
      <TopicPicker />

      <div className={`${card} p-5`}>
        <div className="text-lg font-extrabold mb-2">Qanday ishlaydi?</div>
        <ul className="text-sm text-slate-300 leading-6 list-disc pl-5">
          <li>
            <b>SmartMix</b> — box 1-2 ko‘proq chiqadi, starred/wrong ham tez-tez
            tushadi.
          </li>
          <li>
            <b>Leitner Box</b> — to‘g‘ri javob: box ↑, noto‘g‘ri: box ↓.
          </li>
          <li>
            <b>Wrong review</b> — xato savollarni “bank”dan qayta ishlaydi.
          </li>
          <li>
            <b>Mnemonic</b> — o‘zingizning eslab qolish “hint”laringiz
            saqlanadi.
          </li>
        </ul>
        <div className="mt-3 text-xs text-slate-400">
          Eslatma: Sizning real QUESTIONS massivingiz juda katta — kod buni
          bemalol ko‘taradi.
        </div>
      </div>
    </motion.div>
  );

  const EmptySession = ({ text }) => (
    <div className="p-6 rounded-2xl border border-slate-700/60 bg-slate-950/40 text-slate-300">
      {text}
      <div className="mt-3">
        <button className={btnPrimary} onClick={() => setMode("home")}>
          ⬅️ Back
        </button>
      </div>
    </div>
  );

  const QuizMode = () => {
    if (!sessionIds.length || !current) {
      return (
        <EmptySession text="Session yo‘q. Home’dan boshlab session yarating." />
      );
    }

    const ok = isCorrect === true;
    const wrong = isCorrect === false;

    return (
      <SessionShell title="🚀 Quiz (MCQ)">
        <div className="grid gap-4">
          <QABox
            showAnswer={submitted}
            answerExtra={
              submitted ? (
                <div className="mt-2 text-sm text-slate-300">
                  Siz tanlagan:{" "}
                  <b className={ok ? "text-emerald-300" : "text-rose-300"}>
                    {selected != null ? options[selected] : "—"}
                  </b>
                </div>
              ) : null
            }
          />

          <div className="grid gap-2">
            {options.map((opt, i) => {
              const isSel = selected === i;
              const isRight = submitted && opt === current.a;
              const isWrongPick = submitted && isSel && opt !== current.a;

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (submitted) return;
                    setSelected(i);
                  }}
                  className={[
                    "text-left p-3 rounded-2xl border transition",
                    "bg-slate-950/40 border-slate-700/60 hover:bg-slate-900/60",
                    isSel ? "ring-2 ring-emerald-500/60" : "",
                    isRight ? "border-emerald-500/60 bg-emerald-500/10" : "",
                    isWrongPick ? "border-rose-500/60 bg-rose-500/10" : "",
                  ].join(" ")}
                >
                  <div className="text-sm text-slate-300 mb-1">
                    Variant {i + 1}
                  </div>
                  <div className="font-semibold">{opt}</div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {!submitted ? (
              <button
                className={btnPrimary}
                onClick={submitQuiz}
                disabled={selected == null}
              >
                ✅ Submit
              </button>
            ) : (
              <button className={btnPrimary} onClick={nextQ}>
                ➡️ Next
              </button>
            )}

            {submitted && (
              <div
                className={[
                  "px-3 py-2 rounded-xl border text-sm",
                  ok
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-500/50 bg-rose-500/10 text-rose-200",
                ].join(" ")}
              >
                {ok ? "To‘g‘ri! 🔥" : "Noto‘g‘ri. Yana qayta ko‘ramiz 💪"}
              </div>
            )}
          </div>

          <Confetti show={submitted && ok} />
        </div>
      </SessionShell>
    );
  };

  const FlashMode = () => {
    if (!sessionIds.length || !current) {
      return (
        <EmptySession text="Session yo‘q. Home’dan boshlab session yarating." />
      );
    }

    return (
      <SessionShell title="🧠 Flashcards">
        <div className="grid gap-4">
          <motion.div
            variants={pop}
            initial="hidden"
            animate="show"
            exit="exit"
            className="p-5 rounded-2xl bg-slate-950/40 border border-slate-700/60"
          >
            <div className="text-sm text-slate-300">
              {current.topic} •{" "}
              <span className="text-slate-400">{current.id}</span>
            </div>
            <div className="mt-2 text-xl font-extrabold">{current.q}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className={btn} onClick={() => setSubmitted((s) => !s)}>
                {submitted ? "🙈 Hide answer" : "👀 Show answer"}
              </button>
              <button className={btn} onClick={() => toggleStar(current.id)}>
                {store.starred[current.id] ? "⭐ Starred" : "☆ Star"}
              </button>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60"
                >
                  <div className="text-sm text-slate-300 mb-1">Javob:</div>
                  <div className="font-bold text-emerald-300">{current.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              className={btnPrimary}
              onClick={() => {
                // Flashda user o‘zi baholaydi:
                updateBox(current.id, true);
                setCombo((c) => c + 1);
                setXp((x) => x + 10);
                nextQ();
              }}
            >
              ✅ Bilaman
            </button>

            <button
              className={btnDanger}
              onClick={() => {
                updateBox(current.id, false);
                setCombo(0);
                setXp((x) => x + 3);
                nextQ();
              }}
            >
              ❌ Bilmayman
            </button>

            <button className={btn} onClick={nextQ}>
              ➡️ Skip
            </button>
          </div>
        </div>
      </SessionShell>
    );
  };

  const TypingMode = () => {
    if (!sessionIds.length || !current) {
      return (
        <EmptySession text="Session yo‘q. Home’dan boshlab session yarating." />
      );
    }

    const ok = isCorrect === true;
    const wrong = isCorrect === false;

    return (
      <SessionShell title="✍️ Typing mode">
        <div className="grid gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-700/60">
            <div className="text-sm text-slate-300">
              {current.topic} •{" "}
              <span className="text-slate-400">{current.id}</span>
            </div>
            <div className="mt-2 text-xl font-extrabold">{current.q}</div>

            <div className="mt-4">
              <div className="text-sm text-slate-300 mb-2">
                Javob yozing (kalit so‘zlar yetarli):
              </div>
              <textarea
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                disabled={submitted}
                className="w-full min-h-[110px] rounded-2xl bg-slate-900/40 border border-slate-700/70 px-3 py-2 outline-none"
                placeholder="Masalan: Adam Smit..."
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {!submitted ? (
                <button
                  className={btnPrimary}
                  onClick={submitTyping}
                  disabled={!typed.trim()}
                >
                  ✅ Tekshirish
                </button>
              ) : (
                <button className={btnPrimary} onClick={nextQ}>
                  ➡️ Next
                </button>
              )}

              <button className={btn} onClick={() => toggleStar(current.id)}>
                {store.starred[current.id] ? "⭐ Starred" : "☆ Star"}
              </button>

              {submitted && (
                <div
                  className={[
                    "px-3 py-2 rounded-xl border text-sm",
                    ok
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                      : "border-rose-500/50 bg-rose-500/10 text-rose-200",
                  ].join(" ")}
                >
                  {ok ? "To‘g‘ri! 🔥" : "Noto‘g‘ri. Yaxshi urinib ko‘rdiz 💪"} •
                  Score:{" "}
                  <b className="text-white">{Math.round(typeScore * 100)}%</b>
                </div>
              )}
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60"
                >
                  <div className="text-sm text-slate-300 mb-1">
                    To‘g‘ri javob:
                  </div>
                  <div className="font-bold text-emerald-300">{current.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Confetti show={submitted && ok} />
        </div>
      </SessionShell>
    );
  };

  const ReviewMode = () => {
    const wrongCount = Object.keys(store.wrongBank || {}).length;
    if (wrongCount === 0) {
      return (
        <EmptySession text="WrongBank bo‘sh ✅. Avval quiz/typing’da xato qilinganda shu yerga tushadi." />
      );
    }
    if (!sessionIds.length || !current) {
      return (
        <EmptySession text="Session yo‘q. Home’dan Wrong review bosib session yarating." />
      );
    }

    return (
      <SessionShell title="🧯 Wrong review">
        <div className="grid gap-4">
          <QABox showAnswer={submitted} />
          <div className="flex flex-wrap gap-2 items-center">
            {!submitted ? (
              <button
                className={btnPrimary}
                onClick={() => {
                  // reviewda javobni ko‘rsatib keyin user o‘zi baholaydi
                  setSubmitted(true);
                }}
              >
                👀 Answer
              </button>
            ) : (
              <>
                <button
                  className={btnPrimary}
                  onClick={() => {
                    updateBox(current.id, true);
                    nextQ();
                  }}
                >
                  ✅ Endi bilaman
                </button>
                <button
                  className={btnDanger}
                  onClick={() => {
                    updateBox(current.id, false);
                    nextQ();
                  }}
                >
                  ❌ Hali ham qiyin
                </button>
              </>
            )}

            <button className={btn} onClick={nextQ}>
              ➡️ Skip
            </button>

            <div className="px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900/60 text-sm">
              WrongBank: <b className="text-rose-300">{wrongCount}</b>
            </div>
          </div>
        </div>
      </SessionShell>
    );
  };

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {mode === "home" && (
              <motion.div
                key="home"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <Home />
              </motion.div>
            )}

            {mode === "quiz" && (
              <motion.div
                key="quiz"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <QuizMode />
              </motion.div>
            )}

            {mode === "flash" && (
              <motion.div
                key="flash"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <FlashMode />
              </motion.div>
            )}

            {mode === "type" && (
              <motion.div
                key="type"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <TypingMode />
              </motion.div>
            )}

            {mode === "review" && (
              <motion.div
                key="review"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <ReviewMode />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          Tip: Savollar ko‘p bo‘lsa ham ishlaydi. Faqat <b>id</b> unik bo‘lsin.
        </div>
      </div>
    </div>
  );
}
