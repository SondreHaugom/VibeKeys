 export const generateArpegios = () => {
  const arpegios = [
    // ---------------------------------------
    // ENKLE KLASSISKE BRUDTE AKKORDER
    // ---------------------------------------

    [1, 3, 5],                 // enkel oppadgående treklang
    [1, 5, 3],                 // åpen variant
    [1, 3, 5, 3],              // opp og litt tilbake
    [1, 5, 3, 5],              // Alberti bass – svært klassisk
    [1, 5, 3, 5, 1, 5, 3, 5],  // Alberti bass over to taktdeler

    [1, 3, 5, 8],              // enkel oppadgående arpeggio
    [1, 3, 5, 8, 5, 3],        // opp og ned
    [1, 3, 5, 8, 5, 3, 1],     // komplett opp/ned
    [1, 5, 8, 5],              // åpen kvint med oktav
    [1, 5, 8, 10],             // bass + oktav + ters
    [1, 5, 8, 10, 12],         // bred oppadgående figur

    // ---------------------------------------
    // MOZART / BEETHOVEN-AKTIG AKKOMPAGNEMENT
    // ---------------------------------------

    [1, 5, 3, 5],              // standard Alberti
    [1, 5, 3, 5, 8, 5, 3, 5],  // Alberti med høyere toppunkt
    [1, 3, 5, 3, 1, 3, 5, 3],  // tett og regelmessig brutt akkord
    [1, 5, 8, 5, 3, 5, 8, 5],  // mer åpen klassisk akkompagnement
    [1, 5, 8, 10, 8, 5, 3, 5], // fin figur for langsomme satser

    // ---------------------------------------
    // ROMANTISK / CHOPIN- OG LISZT-INSPIRERT
    // ---------------------------------------

    [1, 5, 8, 10, 12, 10, 8, 5],       // stor, flytende bølge
    [1, 3, 5, 8, 10, 12, 10, 8],       // fyldig oppadgående arpeggio
    [1, 5, 8, 12, 10, 8, 5, 3],        // bred og dramatisk bevegelse
    [1, 8, 5, 10, 8, 12, 10, 5],       // romantisk, mer melodisk form
    [1, 5, 10, 12, 10, 8, 5, 3],       // fin for kjærlige ballader
    [1, 3, 5, 10, 12, 10, 8, 5],       // varm og sangbar
    [1, 5, 8, 10, 12, 15, 12, 10],     // større register / klimaks
    [1, 5, 8, 12, 15, 12, 10, 8],      // bred “harpe”-følelse

    // ---------------------------------------
    // ROLIGE, ROMANTISKE BALLADER / NOCTURNE
    // ---------------------------------------

    [1, 5, 8, 10, 8, 5],               // enkel, følsom figur
    [1, 3, 5, 10, 8, 5],               // myk og veldig brukbar
    [1, 5, 8, 12, 8, 5],               // åpen og drømmende
    [1, 8, 10, 12, 10, 8, 5],          // høyre-hånd-vennlig bølge
    [1, 5, 10, 8, 12, 10, 8, 5],       // romantisk og litt mer aktiv
    [1, 3, 5, 8, 5, 10, 8, 5],         // fin ved sakte tempo
    [1, 5, 8, 10, 12, 10, 5, 3],       // god standard-balladefigur

    // ---------------------------------------
    // 7-AKKORDER – VIKTIG FOR SENROMANTISK
    // OG MODERNE ROMANTISK PIANO
    // ---------------------------------------

    [1, 3, 5, 7],                       // enkel septimakkord
    [1, 3, 5, 7, 8],                    // med oktav
    [1, 5, 7, 10],                      // åpen klang
    [1, 5, 8, 10, 7, 5],                // myk og kompleks
    [1, 3, 5, 7, 10, 8],                // svært anvendelig
    [1, 5, 8, 10, 12, 14, 12, 10],      // rik, stor og romantisk
    [1, 7, 10, 12, 10, 7, 5],           // fin for dominant-akkorder

    // ---------------------------------------
    // FIGURER MED SPENNING OG OPPLØSNING
    // Passer spesielt godt ved kadens
    // ---------------------------------------

    [1, 5, 8, 11, 10, 8],               // sus4 -> ters-følelse
    [1, 3, 5, 9, 10, 8],                // 9-erfarge, moderne romantisk
    [1, 5, 8, 9, 10, 12],               // tett, emosjonell klang
    [1, 5, 8, 12, 11, 10, 8],           // fallende oppløsning
    [1, 3, 5, 8, 9, 10, 12],            // oppbygging mot toppnote
  ];

  return arpegios;
};