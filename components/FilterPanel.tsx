"use client";

import { useState, useCallback } from "react";
import { motorji, plovila, Produkt } from "@/data/products";

interface FilterState {
  tip: "motor" | "plovilo";
  kategorija: string;
  minCena: number;
  maxCena: number;
  minMoc: number;
  maxMoc: number;
  minProstornina: number;
  maxProstornina: number;
  minTeza: number;
  maxTeza: number;
  minDolzina: number;
  maxDolzina: number;
  minPoraba: number;
  maxPoraba: number;
  koncniPrenos: string;
}

interface FilterPanelProps {
  onClose: () => void;
  onrezultati: (produkti: Produkt[]) => void;
}

const DEFAULTS: FilterState = {
  tip: "motor",
  kategorija: "",
  minCena: 0,
  maxCena: 40000,
  minMoc: 0,
  maxMoc: 300,
  minProstornina: 0,
  maxProstornina: 5000,
  minTeza: 0,
  maxTeza: 1000,
  minDolzina: 0,
  maxDolzina: 8000,
  minPoraba: 0,
  maxPoraba: 20,
  koncniPrenos: "",
};

export default function FilterPanel({ onClose, onRezultati }: { onClose: () => void; onRezultati: (p: Produkt[]) => void }) {
  const [filter, setFilter] = useState<FilterState>(DEFAULTS);

  const set = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  }, []);

  const isci = () => {
    const vir = filter.tip === "motor" ? motorji : plovila;
    const rezultati = vir.filter((p) => {
      if (filter.kategorija && p.kategorija !== filter.kategorija) return false;
      if (p.cena < filter.minCena || p.cena > filter.maxCena) return false;
      if (p.mocHP < filter.minMoc || p.mocHP > filter.maxMoc) return false;
      if (p.teza < filter.minTeza || p.teza > filter.maxTeza) return false;
      if (p.dolzina < filter.minDolzina || p.dolzina > filter.maxDolzina) return false;
      if (p.tip === "motor") {
        if (p.prostornina < filter.minProstornina || p.prostornina > filter.maxProstornina) return false;
        if (p.poraba < filter.minPoraba || p.poraba > filter.maxPoraba) return false;
        if (filter.koncniPrenos && p.koncniPrenos !== filter.koncniPrenos) return false;
      }
      return true;
    });
    onRezultati(rezultati);
    onClose();
  };

  const SliderRange = ({
    label,
    minKey,
    maxKey,
    min,
    max,
    step,
    unit,
  }: {
    label: string;
    minKey: keyof FilterState;
    maxKey: keyof FilterState;
    min: number;
    max: number;
    step: number;
    unit: string;
  }) => {
    const minVal = filter[minKey] as number;
    const maxVal = filter[maxKey] as number;
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">{label}</label>
          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md tabular-nums">
            {minVal} - {maxVal} {unit}
          </span>
        </div>
        <div className="relative h-6 flex items-center">
          <div className="absolute w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 opacity-30"
              style={{
                marginLeft: `${((minVal - min) / (max - min)) * 100}%`,
                width: `${((maxVal - minVal) / (max - min)) * 100}%`,
              }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={(e) => set(minKey, Math.min(Number(e.target.value), maxVal - step) as FilterState[typeof minKey])}
            className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-red-500"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e) => set(maxKey, Math.max(Number(e.target.value), minVal + step) as FilterState[typeof maxKey])}
            className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-red-500"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-white/95 backdrop-blur-xl rounded-tr-[2rem] rounded-br-[2rem]">
      {/* Header */}
      <div className="h-[88px] p-5 border-b border-red-500/30 flex justify-between items-center bg-white/40 backdrop-blur-md rounded-tr-[2rem]">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Pametni Filter
        </h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Tab */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter.tip === "motor" ? "bg-white shadow-sm text-red-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => set("tip", "motor")}
          >
            Motorji
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter.tip === "plovilo" ? "bg-white shadow-sm text-red-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => set("tip", "plovilo")}
          >
            Plovila
          </button>
        </div>

        {/* Kategorija */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Kategorija</label>
          <select
            value={filter.kategorija}
            onChange={(e) => set("kategorija", e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-50 border border-red-200 focus:ring-2 focus:ring-red-200 outline-none text-sm font-medium text-gray-900"
          >
            <option value="">Izberite kategorijo...</option>
            {filter.tip === "motor" ? (
              <>
                <option value="motorji">Motorji</option>
                <option value="skuterji">Skuterji</option>
                <option value="ekolesa">E-Kolesa</option>
                <option value="offroad">Offroad</option>
                <option value="sneg">Sneg</option>
                <option value="generatorji">Generatorji</option>
              </>
            ) : (
              <>
                <option value="motorni čolni">Motorni čolni</option>
                <option value="gumenjaki">Gumenjaki</option>
                <option value="kajaki">Kajaki</option>
                <option value="vodni skuterji">Vodni skuterji</option>
              </>
            )}
          </select>
        </div>

        <SliderRange label="Cena (EUR)" minKey="minCena" maxKey="maxCena" min={0} max={60000} step={500} unit="€" />
        <SliderRange label="Moč (HP)" minKey="minMoc" maxKey="maxMoc" min={0} max={300} step={5} unit="HP" />
        <SliderRange label="Dolžina (mm)" minKey="minDolzina" maxKey="maxDolzina" min={0} max={8000} step={100} unit="mm" />

        {filter.tip === "motor" && (
          <>
            <SliderRange label="Prostornina (cc)" minKey="minProstornina" maxKey="maxProstornina" min={0} max={5000} step={50} unit="cc" />
            <SliderRange label="Teža (kg)" minKey="minTeza" maxKey="maxTeza" min={0} max={500} step={5} unit="kg" />
            <SliderRange label="Poraba (L/100km)" minKey="minPoraba" maxKey="maxPoraba" min={0} max={20} step={0.5} unit="L" />

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Končni Prenos</label>
              <div className="flex gap-2">
                {["veriga", "jermen"].map((t) => (
                  <button
                    key={t}
                    onClick={() => set("koncniPrenos", filter.koncniPrenos === t ? "" : t)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      filter.koncniPrenos === t
                        ? "bg-red-50 border-red-400 text-red-600"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Search button */}
      <div className="p-5 border-t bg-white">
        <button
          onClick={isci}
          className="w-full py-3.5 rounded-xl font-bold shadow-lg bg-red-600 hover:bg-red-700 text-white active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Išči {filter.tip === "motor" ? "Motorje" : "Plovila"}
        </button>
      </div>
    </div>
  );
}
