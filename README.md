# VybeKeys

[![Svelte](https://img.shields.io/badge/Svelte-5%2B-ff3e00?logo=svelte)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2%2B-ff3e00?logo=svelte)](https://kit.svelte.dev)
[![Status](https://img.shields.io/badge/status-under%20arbeid-yellow)](#)

### Innholdsfortegnelse
- [Om-prosjektet](#-Om-prosjektet)
- [Funksjoner](#-Funksjoner)
- [Filforklaring](#-Filforklaring)
- [Installasjon-og-oppsett](#-Installasjon-og-oppsett)
- [Sikkerhet-og-personvern](#-Sikkerhet-og-personvern)


### VibeKeys

VibeKeys er et musikkverktøy som lar deg generere akkordprogresjoner basert på ulike sjangere. Målet med tjenesten er å effektivisere prosessen med å finne akkorder til musikk, enten det er til pianokomposisjoner, låter, beats eller andre musikalske idéer.

Foreløpig støtter VibeKeys sjangerne Pop, Rock, R&B og Klassisk. Denne kombinasjonen er basert på min egen musikalske smak og typen musikk jeg liker å lage. Akkordprogresjonene er valgt for å dekke flere ulike følelser og stemninger, slik at musikken kan bli variert, personlig og unik.

VibeKeys er ment som en kreativ startmotor når du trenger inspirasjon. I stedet for å bruke lang tid på å lete etter riktige akkorder, kan du raskt generere en progresjon og bruke den som utgangspunkt for videre komponering, produksjon eller improvisasjon.

Akkordene er ikke ment som en fasit, men som et fundament du kan bygge videre på. De kan spilles som de er, endres med egne inversjoner, kombineres med melodier, eller brukes sammen med ulike arpeggioer og spillemønstre.

 

### Funksjoner

- Velg sjanger: Pop, R&B, Klassisk og Rock.
- Generer raskt nye akkordprogresjoner med ett klikk.
- Veksle mellom akkordmodus og arpeggiomodus.
- Vis hver akkord eller arpeggio som egne kort for enklere lesing.
- Enkel «Start på nytt»-funksjon for å tilbakestille visningen.

### Filforklaring

- `src/routes/+page.svelte`
  - Appens hovedside og brukergrensesnitt.
  - Inneholder logikk for å generere sjangerbaserte akkorder og arpeggioer.
- `src/lib/chords.js`
  - Inneholder ferdige akkordprogresjoner for hver sjanger.
- `src/lib/arpegios.js`
  - Inneholder ferdige arpeggio-mønstre.

### Installasjon og oppsett

1. Åpne terminalen i prosjektmappen.
2. Installer avhengigheter med:

```bash
npm install
```

3. Start utviklingsserveren med:

```bash
npm run dev
```

4. Åpne nettleseren på den adressen som vises i terminalen.

### Sikkerhet og personvern

- VibeKeys lagrer ingen brukerdata.
- Appen kjøres lokalt i nettleseren under utvikling.
- Det finnes ingen ekstern backend eller lagring i dette prosjektet.
