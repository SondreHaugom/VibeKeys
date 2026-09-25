import { RomanNumeral, Chord, transpose } from "tonal";

// Chord tone som brukes til å regne ut bassnoten for skråstrek-akkorder (f.eks "V/3", "iv/b3").
const DEGREE_INTERVALS = {
    2: { natural: "M2", flat: "m2" },
    3: { natural: "M3", flat: "m3" },
    4: { natural: "P4", flat: "d4" },
    5: { natural: "P5", flat: "d5" },
    6: { natural: "M6", flat: "m6" },
    7: { natural: "M7", flat: "m7" },
};

function resolveBassNote(root, mainChordType, bassSpec) {
    const isFlat = bassSpec.startsWith("b");
    const degree = parseInt(isFlat ? bassSpec.slice(1) : bassSpec, 10);

    const chordIntervals = Chord.get(root + mainChordType).intervals;
    const chordInterval = chordIntervals.find(
        (iv) => iv.replace(/[^0-9]/g, "") === String(degree)
    );

    const interval = isFlat
        ? DEGREE_INTERVALS[degree]?.flat ?? chordInterval
        : chordInterval ?? DEGREE_INTERVALS[degree]?.natural;

    return interval ? transpose(root, interval) : null;
}

// tonal sin Progression.fromRomanNumerals bruker ikke stor/liten bokstav (dur/moll) når
// den bygger akkordsymbolet, og løser heller ikke ut "/3", "/5", "/b3" til en faktisk bassnote.
// Denne funksjonen gjør begge deler riktig.
function chordFromRomanNumeral(tonic, numeralStr) {
    const rn = RomanNumeral.get(numeralStr);
    if (rn.empty) return numeralStr;

    const root = transpose(tonic, rn.interval);
    const isMinor = !rn.major;

    const [mainChordType, bassSpec] = rn.chordType.split("/");
    const chordType =
        isMinor && !/^(maj|dim|aug|m)/.test(mainChordType)
            ? "m" + mainChordType
            : mainChordType;

    if (!bassSpec) return root + chordType;

    const bassNote = resolveBassNote(root, chordType, bassSpec);
    return bassNote ? `${root}${chordType}/${bassNote}` : root + chordType;
}

export function generateProgressionChords(tonic, romanNumerals) {
    return romanNumerals.map((numeral) => chordFromRomanNumeral(tonic, numeral));
}
