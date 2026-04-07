export type DriveType = "veriga" | "jermen" | "kardan" | "direktni";

export interface Motor {
  id: string;
  tip: "motor";
  kategorija: "motorji" | "skuterji" | "ekolesa" | "offroad" | "sneg" | "generatorji";
  naziv: string;
  znamka: string;
  model: string;
  leto: number;
  cena: number;
  mocHP: number;
  prostornina: number; // cc
  teza: number; // kg
  dolzina: number; // mm
  poraba: number; // L/100km
  koncniPrenos: DriveType;
  opis: string;
  slika?: string;
  barva?: string;
  dostopnost: "na zalogi" | "naročilo" | "razprodano";
}

export interface Plovilo {
  id: string;
  tip: "plovilo";
  kategorija: "čolni" | "gumenjaki" | "kajaki" | "vodni skuterji" | "motorni čolni";
  naziv: string;
  znamka: string;
  model: string;
  leto: number;
  cena: number;
  mocHP: number;
  dolzina: number; // mm
  sirina: number; // mm
  teza: number; // kg
  kapacitetaOseb: number;
  material: string;
  opis: string;
  slika?: string;
  dostopnost: "na zalogi" | "naročilo" | "razprodano";
}

export type Produkt = Motor | Plovilo;

export const motorji: Motor[] = [
  {
    id: "m001",
    tip: "motor",
    kategorija: "motorji",
    naziv: "Honda CB500F",
    znamka: "Honda",
    model: "CB500F",
    leto: 2024,
    cena: 7490,
    mocHP: 47,
    prostornina: 471,
    teza: 189,
    dolzina: 2060,
    poraba: 4.8,
    koncniPrenos: "veriga",
    opis: "Odličen motor za začetnike in vsakodnevno vožnjo. Vzporedno dvovaljni motor zagotavlja gladko moč in odlično ekonomičnost.",
    dostopnost: "na zalogi",
  },
  {
    id: "m002",
    tip: "motor",
    kategorija: "motorji",
    naziv: "Kawasaki Z650",
    znamka: "Kawasaki",
    model: "Z650",
    leto: 2024,
    cena: 8290,
    mocHP: 67,
    prostornina: 649,
    teza: 187,
    dolzina: 2055,
    poraba: 5.2,
    koncniPrenos: "veriga",
    opis: "Agresiven naked stil z zmogljivim dvovaljnim motorjem. Idealen za mesto in vikend vožnje.",
    dostopnost: "na zalogi",
  },
  {
    id: "m003",
    tip: "motor",
    kategorija: "motorji",
    naziv: "BMW R 1250 GS",
    znamka: "BMW",
    model: "R 1250 GS",
    leto: 2024,
    cena: 19990,
    mocHP: 136,
    prostornina: 1254,
    teza: 249,
    dolzina: 2205,
    poraba: 5.5,
    koncniPrenos: "kardan",
    opis: "Legendarni pustolovski motor. ShiftCam tehnologija zagotavlja izjemno moč in navor pri vseh vrtljajih.",
    dostopnost: "na zalogi",
  },
  {
    id: "m004",
    tip: "motor",
    kategorija: "motorji",
    naziv: "Yamaha MT-07",
    znamka: "Yamaha",
    model: "MT-07",
    leto: 2024,
    cena: 8990,
    mocHP: 73,
    prostornina: 689,
    teza: 184,
    dolzina: 2085,
    poraba: 5.1,
    koncniPrenos: "veriga",
    opis: "Master of Torque - zmogljiv dvovaljni CP2 motor s predvidljivim karakterjem. Odličen za vse ravni voznikov.",
    dostopnost: "na zalogi",
  },
  {
    id: "m005",
    tip: "motor",
    kategorija: "motorji",
    naziv: "Ducati Monster",
    znamka: "Ducati",
    model: "Monster",
    leto: 2024,
    cena: 14990,
    mocHP: 111,
    prostornina: 937,
    teza: 166,
    dolzina: 2065,
    poraba: 6.2,
    koncniPrenos: "veriga",
    opis: "Ikonični Italian naked motor. Lahek, zmogljiv in z nezamenljivim Ducati dizajnom.",
    dostopnost: "naročilo",
  },
  {
    id: "m006",
    tip: "motor",
    kategorija: "motorji",
    naziv: "Harley-Davidson Sportster S",
    znamka: "Harley-Davidson",
    model: "Sportster S",
    leto: 2024,
    cena: 16495,
    mocHP: 121,
    prostornina: 1252,
    teza: 228,
    dolzina: 2270,
    poraba: 6.8,
    koncniPrenos: "jermen",
    opis: "Moderni Sportster z Revolution Max motorjem. Kombinacija klasičnega H-D stila in sodobne tehnologije.",
    dostopnost: "na zalogi",
  },
  {
    id: "m007",
    tip: "motor",
    kategorija: "skuterji",
    naziv: "Honda Forza 350",
    znamka: "Honda",
    model: "Forza 350",
    leto: 2024,
    cena: 5990,
    mocHP: 29,
    prostornina: 350,
    teza: 184,
    dolzina: 2170,
    poraba: 3.2,
    koncniPrenos: "jermen",
    opis: "Premium skuter za udobno vsakodnevno vožnjo. Velik prostor za prtljago in odlična ekonomičnost.",
    dostopnost: "na zalogi",
  },
  {
    id: "m008",
    tip: "motor",
    kategorija: "skuterji",
    naziv: "Yamaha XMAX 300",
    znamka: "Yamaha",
    model: "XMAX 300",
    leto: 2024,
    cena: 5490,
    mocHP: 28,
    prostornina: 292,
    teza: 181,
    dolzina: 2165,
    poraba: 3.1,
    koncniPrenos: "jermen",
    opis: "Športni maxi skuter z moderno elektroniko in elegantnim dizajnom. Idealen za mesto.",
    dostopnost: "na zalogi",
  },
  {
    id: "m009",
    tip: "motor",
    kategorija: "offroad",
    naziv: "KTM 350 EXC-F",
    znamka: "KTM",
    model: "350 EXC-F",
    leto: 2024,
    cena: 11490,
    mocHP: 43,
    prostornina: 349,
    teza: 103,
    dolzina: 2175,
    poraba: 4.5,
    koncniPrenos: "veriga",
    opis: "Enduro motor za resne terenske pustolovščine. Izjemno lahek z močnim 4-taktnim motorjem.",
    dostopnost: "na zalogi",
  },
  {
    id: "m010",
    tip: "motor",
    kategorija: "ekolesa",
    naziv: "Zero SR/F",
    znamka: "Zero",
    model: "SR/F",
    leto: 2024,
    cena: 21990,
    mocHP: 110,
    prostornina: 0,
    teza: 220,
    dolzina: 2130,
    poraba: 0,
    koncniPrenos: "jermen",
    opis: "Premium električni motor z dosegom do 259 km. Takojšen navor in brez emisij.",
    dostopnost: "naročilo",
  },
];

export const plovila: Plovilo[] = [
  {
    id: "p001",
    tip: "plovilo",
    kategorija: "motorni čolni",
    naziv: "Bayliner VR5 Bowrider",
    znamka: "Bayliner",
    model: "VR5 Bowrider",
    leto: 2024,
    cena: 28900,
    mocHP: 115,
    dolzina: 5180,
    sirina: 2390,
    teza: 975,
    kapacitetaOseb: 8,
    material: "GRP / Steklo",
    opis: "Odlično vstopno plovilo za družinsko rekreacijo. Prostorna zasnova z naprednim motorjem.",
    dostopnost: "na zalogi",
  },
  {
    id: "p002",
    tip: "plovilo",
    kategorija: "vodni skuterji",
    naziv: "Sea-Doo Spark 90hp",
    znamka: "Sea-Doo",
    model: "Spark",
    leto: 2024,
    cena: 8990,
    mocHP: 90,
    dolzina: 3050,
    sirina: 1160,
    teza: 249,
    kapacitetaOseb: 2,
    material: "NanoXcel 2",
    opis: "Lahek in zabaven vodni skuter za začetnike. Odlično razmerje med ceno in zmogljivostjo.",
    dostopnost: "na zalogi",
  },
  {
    id: "p003",
    tip: "plovilo",
    kategorija: "vodni skuterji",
    naziv: "Yamaha FX Cruiser HO",
    znamka: "Yamaha",
    model: "FX Cruiser HO",
    leto: 2024,
    cena: 19990,
    mocHP: 180,
    dolzina: 3505,
    sirina: 1235,
    teza: 404,
    kapacitetaOseb: 3,
    material: "NanoXcel 2",
    opis: "Premium vodni skuter z izjemno zmogljivostjo in udobjem. Idealen za dolge vožnje.",
    dostopnost: "na zalogi",
  },
  {
    id: "p004",
    tip: "plovilo",
    kategorija: "gumenjaki",
    naziv: "Zodiac Cadet 310",
    znamka: "Zodiac",
    model: "Cadet 310",
    leto: 2024,
    cena: 2490,
    mocHP: 15,
    dolzina: 3100,
    sirina: 1540,
    teza: 55,
    kapacitetaOseb: 4,
    material: "PVC 750g/m²",
    opis: "Trpežen gumenjak za ribolov in rekreacijo. Enostaven za transport in shranjevanje.",
    dostopnost: "na zalogi",
  },
  {
    id: "p005",
    tip: "plovilo",
    kategorija: "kajaki",
    naziv: "Intex Explorer K2",
    znamka: "Intex",
    model: "Explorer K2",
    leto: 2024,
    cena: 189,
    mocHP: 0,
    dolzina: 3120,
    sirina: 910,
    teza: 9,
    kapacitetaOseb: 2,
    material: "Vinilne komore",
    opis: "Napihljiv kajak za dva. Odličen za mirne reke in jezera. Vključuje vesla in napihovač.",
    dostopnost: "na zalogi",
  },
  {
    id: "p006",
    tip: "plovilo",
    kategorija: "motorni čolni",
    naziv: "Jeanneau Cap Camarat 7.5 CC",
    znamka: "Jeanneau",
    model: "Cap Camarat 7.5 CC",
    leto: 2024,
    cena: 52900,
    mocHP: 200,
    dolzina: 7550,
    sirina: 2590,
    teza: 1850,
    kapacitetaOseb: 10,
    material: "GRP / Steklo",
    opis: "Luksuzni center console čoln za resne mornarje. Odličen za dan na morju z vso družino.",
    dostopnost: "naročilo",
  },
];

export const vsiProdukti: Produkt[] = [...motorji, ...plovila];

// Helper funkcija za iskanje
export function isciProdukte(params: {
  tip?: "motor" | "plovilo";
  kategorija?: string;
  minCena?: number;
  maxCena?: number;
  minMoc?: number;
  maxMoc?: number;
  minProstornina?: number;
  maxProstornina?: number;
  minTeza?: number;
  maxTeza?: number;
  minDolzina?: number;
  maxDolzina?: number;
  minPoraba?: number;
  maxPoraba?: number;
  koncniPrenos?: string;
  poizvedba?: string;
}): Produkt[] {
  return vsiProdukti.filter((produkt) => {
    if (params.tip && produkt.tip !== params.tip) return false;
    if (params.kategorija && produkt.kategorija !== params.kategorija) return false;
    if (params.minCena && produkt.cena < params.minCena) return false;
    if (params.maxCena && produkt.cena > params.maxCena) return false;
    if (params.minMoc && produkt.mocHP < params.minMoc) return false;
    if (params.maxMoc && produkt.mocHP > params.maxMoc) return false;
    if (params.minTeza && produkt.teza < params.minTeza) return false;
    if (params.maxTeza && produkt.teza > params.maxTeza) return false;
    if (params.minDolzina && produkt.dolzina < params.minDolzina) return false;
    if (params.maxDolzina && produkt.dolzina > params.maxDolzina) return false;

    if (produkt.tip === "motor") {
      if (params.minProstornina && produkt.prostornina < params.minProstornina) return false;
      if (params.maxProstornina && produkt.prostornina > params.maxProstornina) return false;
      if (params.minPoraba && produkt.poraba < params.minPoraba) return false;
      if (params.maxPoraba && produkt.poraba > params.maxPoraba) return false;
      if (params.koncniPrenos && produkt.koncniPrenos !== params.koncniPrenos) return false;
    }

    if (params.poizvedba) {
      const q = params.poizvedba.toLowerCase();
      return (
        produkt.naziv.toLowerCase().includes(q) ||
        produkt.znamka.toLowerCase().includes(q) ||
        produkt.model.toLowerCase().includes(q) ||
        produkt.opis.toLowerCase().includes(q)
      );
    }

    return true;
  });
}
