# 🚀 Navodila za deploy — Moto Nautika AI Chatbot

## Korak 1: Pridobi Anthropic API ključ

1. Odpri https://console.anthropic.com/
2. Ustvari brezplačen račun (ali se prijavi)
3. Pojdi na **API Keys** → **Create Key**
4. Kopiraj ključ (začne se z `sk-ant-...`)

---

## Korak 2: Naložite kodo na GitHub

1. Ustvari nov repozitorij na https://github.com/new
2. Ime: `moto-nautika-chatbot` (ali poljubno)
3. Kopiraj vse datoteke iz te mape v repozitorij
4. Commitaj in pushi (`git add . && git commit -m "init" && git push`)

---

## Korak 3: Deploy na Vercel

1. Odpri https://vercel.com/ in se prijavi (brezplačno)
2. Klikni **Add New → Project**
3. Izberi tvoj GitHub repozitorij
4. Vercel bo samodejno zaznal Next.js — klikni **Deploy**

---

## Korak 4: Dodaj API ključ v Vercel

1. V Vercel projektu pojdi na **Settings → Environment Variables**
2. Dodaj novo spremenljivko:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-tvoj-kljuc-tukaj`
3. Klikni **Save**
4. Pojdi na **Deployments** → klikni **Redeploy** (da se spremenljivka aktivira)

---

## ✅ Gotovo!

Tvoj chatbot bo dosegljiv na URL-ju, ki ti ga Vercel dodeli (npr. `moto-nautika-chatbot.vercel.app`).

---

## Vgraditev na obstoječo spletno stran

Chatbot lahko vgradiš na katero koli spletno stran z iframe:

```html
<iframe
  src="https://tvoj-projekt.vercel.app/"
  style="position:fixed; bottom:0; right:0; width:790px; height:690px; border:none; z-index:99999;"
  allow="clipboard-write"
></iframe>
```

---

## Prilagoditev podatkov

- **Demo produkti** so v datoteki `data/products.ts`
- Dodaj ali uredi motorje in plovila po svojih potrebah
- Vsak produkt ima: naziv, cena, moč, prostornina, teža, dolžina, dostopnost

## Prilagoditev AI asistentra

- **System prompt** (navodila za AI) je v `app/api/chat/route.ts`
- Uredi ga glede na tvojo ponudbo, delovni čas in kontaktne podatke
