<script>
import { chordsByGenre } from '$lib/chords.js'
import { generateProgressionChords } from '$lib/progression.js'
import fs from 'fs';
import MidiWriter from 'midi-writer-js';
import {Sequencer, Soundfont, SplendidGrandPiano } from "smplr";


let currentChords = $state([]);
let isActive = $state(false);

const restartSite = () => {
    window.location.reload();
}

  // Sjanger-kartet vårt som snakker med biblioteket
  
  
  let selectedGenre = $state("Pop");
  let selectedKey = $state("C");
  let generatedProgression = $state([]);


async function playChords() {
    console.log("Du trykket på knappen");
    
    const context = new AudioContext();
    const piano = SplendidGrandPiano(context);

    const seq = Sequencer(context, {bpm: 110, loop: true});
    seq.addTrack(piano, [
        { note: "C4", at: "1:1", duration: "4n" },
        { note: "E4", at: "1:2", duration: "4n" },
        { note: "G4", at: "1:3", duration: "4n" },
    ]);
    
    await seq.load; 
    
    seq.start();
}


function generateChords() {
    const romanNumerals = chordsByGenre[selectedGenre][Math.floor(Math.random() * chordsByGenre[selectedGenre].length)];

    generatedProgression = generateProgressionChords(selectedKey, romanNumerals);
}

/*
function generateMidiFile() {
    console.log("Du trykket på knappen")    

    const track = new MidiWriter.Track();

    const progression = [
        {pitch: [currentChords], duration: '2'},

    ];
    
    
    progression.forEach(chord => {
        track.addEvent(new MidiWriter.NoteEvent({
            pitch: chord.pitch,
            duration: chord.duration
        }));
    });

    const writer = new MidiWriter.Writer(track);
    if (!writer) {
        console.error("Writer is null or undefined");
    }
    const blob = new Blob([writer.buildFile()], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = 'output.mid';
    a.click();

    RL.revokeObjectURL(url);

};
*/


</script>

<div class="app">
    <aside class="sidebar">
        <div class="brand">
            <div class="brand_mark" aria-hidden="true">
                <span></span><span></span><span></span>
            </div>
            <div>
                <h1>VibeKeys</h1>
                <p class="subtitle">Akkordprogresjoner</p>
            </div>
        </div>

        <div class="sidebar_scroll">
            <fieldset class="panel">
                <legend class="panel_label">
                    <span class="panel_step">1</span>
                    Sjanger
                </legend>
                <div class="genre_list">
                    {#each Object.keys(chordsByGenre) as genre}
                        <label class="genre_option">
                            <input type="radio" name="genre" value={genre} bind:group={selectedGenre} />
                            <span class="genre_chip">
                                <span class="genre_dot" aria-hidden="true"></span>
                                {genre}
                            </span>
                        </label>
                    {/each}
                </div>
            </fieldset>

            <fieldset class="panel">
                <legend class="panel_label">
                    <span class="panel_step">2</span>
                    Skala
                </legend>
                <div class="key_grid">
                    {#each ["C", "D", "E", "F", "G", "A", "B"] as key}
                        <label class="key_option">
                            <input type="radio" name="key" value={key} bind:group={selectedKey} />
                            <span class="key_cap">{key}</span>
                        </label>
                    {/each}
                </div>
            </fieldset>

            <div class="panel">
                <span class="panel_label">
                    <span class="panel_step">3</span>
                    Lag progresjon
                </span>
                <button class="btn btn_primary" type="button" onclick={generateChords}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>
                    Generer
                </button>
                <button class="btn btn_secondary" type="button" onclick={playChords}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3v18l15-9L5 3z" /></svg>
                    Spill av
                </button>
            </div>
        </div>

        <div class="sidebar_footer">
            <button class="btn btn_ghost" type="button" onclick={restartSite}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4v5h5" /></svg>
                Start på nytt
            </button>
        </div>
    </aside>

    <main class="workspace">
        <header class="workspace_header">
            <div>
                <p class="eyebrow">Progresjon</p>
                <h2>{selectedGenre} <span class="in_key">i {selectedKey}</span></h2>
            </div>
            {#if generatedProgression.length > 0}
                <span class="tag">{generatedProgression.length} akkorder</span>
            {/if}
        </header>

        <section class="canvas_area">
            {#if generatedProgression.length === 0}
                <div class="empty_state">
                    <div class="empty_keys" aria-hidden="true">
                        {#each Array(7) as _, i}
                            <span class="empty_key" style="animation-delay: {i * 0.08}s"></span>
                        {/each}
                    </div>
                    <p class="empty_title">Ingen akkorder ennå</p>
                    <p class="placeholder">Velg sjanger og skala i menyen, og trykk på «Generer» for å lage en akkordprogresjon.</p>
                </div>
            {:else}
                {#key generatedProgression}
                    <div class="chord_row">
                        {#each generatedProgression as chord, index}
                            <div class="chord_card" style="animation-delay: {index * 0.08}s">
                                <span class="step">Trinn {index + 1}</span>
                                <span class="chord_name">{chord}</span>
                            </div>
                        {/each}
                    </div>
                {/key}
            {/if}
        </section>
    </main>
</div>

<style>
    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(:root) {
        --bg: #1f1d1a;
        --surface: #2a2723;
        --surface-strong: #2d2a25;
        --canvas: #181614;
        --border: #3a3631;
        --border-strong: #4a453e;
        --text: #f5f2e9;
        --text-soft: #d8d2c6;
        --text-muted: #a39d91;
        --accent: #a13a1c;
        --accent-hover: #b34320;
        --accent-active: #8f3418;
        --accent-soft: rgba(161, 58, 28, 0.15);
        --accent-text: #e0714c;
        --focus: 0 0 0 3px rgba(224, 113, 76, 0.4);
        --sidebar-bg: #1f1d1a;
        --sidebar-surface: #2a2723;
        --sidebar-border: #3a3631;
        --sidebar-text: #f5f2e9;
        --sidebar-muted: #a39d91;
    }

    :global(body) {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
    }

    fieldset {
        border: none;
        margin: 0;
        padding: 0;
        min-width: 0;
    }

    /* ---------- Layout ---------- */

    .app {
        display: grid;
        grid-template-columns: 300px minmax(0, 1fr);
        min-height: 100vh;
    }

    /* ---------- Sidemeny ---------- */

    .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--sidebar-bg);
        color: var(--sidebar-text);
        border-right: 1px solid var(--sidebar-border);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 1.75rem 1.5rem 1.5rem;
        border-bottom: 1px solid var(--sidebar-border);
    }

    .brand_mark {
        display: flex;
        align-items: flex-end;
        gap: 3px;
        width: 40px;
        height: 40px;
        padding: 8px;
        border-radius: 10px;
        background: var(--accent);
    }

    .brand_mark span {
        flex: 1;
        background: #f5f2e9;
        border-radius: 2px;
    }

    .brand_mark span:nth-child(1) { height: 60%; }
    .brand_mark span:nth-child(2) { height: 100%; }
    .brand_mark span:nth-child(3) { height: 75%; }

    h1 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.03em;
    }

    .subtitle {
        font-size: 0.8rem;
        color: var(--sidebar-muted);
        margin: 0.15rem 0 0;
    }

    .sidebar_scroll {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .panel {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .panel_label {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0;
        margin-bottom: 0.4rem;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--sidebar-muted);
    }

    .panel_step {
        display: inline-grid;
        place-items: center;
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        border: 1px solid var(--sidebar-border);
        font-size: 0.68rem;
        letter-spacing: 0;
        color: var(--sidebar-text);
    }

    /* Sjanger */

    .genre_list {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .genre_option {
        position: relative;
        cursor: pointer;
    }

    .genre_chip {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.7rem 0.9rem;
        border-radius: 10px;
        border: 1px solid transparent;
        font-size: 0.92rem;
        color: #d8d2c6;
        text-transform: capitalize;
        transition: background 0.12s, border-color 0.12s, color 0.12s;
    }

    .genre_dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid var(--sidebar-muted);
        transition: background 0.12s, border-color 0.12s;
    }

    .genre_option:hover .genre_chip {
        background: var(--sidebar-surface);
        color: var(--sidebar-text);
    }

    .genre_option input:checked + .genre_chip {
        background: var(--sidebar-surface);
        border-color: var(--sidebar-border);
        color: var(--sidebar-text);
        font-weight: 600;
    }

    .genre_option input:checked + .genre_chip .genre_dot {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
    }

    .genre_option input:focus-visible + .genre_chip {
        box-shadow: var(--focus);
    }

    /* Skala – tangentrad */

    .key_grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        padding: 6px;
        border-radius: 12px;
        background: #141311;
        border: 1px solid var(--sidebar-border);
    }

    .key_option {
        position: relative;
        cursor: pointer;
    }

    .key_cap {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 72px;
        padding-bottom: 0.5rem;
        border-radius: 3px 3px 7px 7px;
        background: linear-gradient(to bottom, #e4ded1, #f5f2e9);
        color: #4a4844;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.12);
        transition: transform 0.08s, background 0.12s, box-shadow 0.08s;
    }

    .key_option:hover .key_cap {
        background: linear-gradient(to bottom, #ece7dc, #ffffff);
    }

    .key_option input:checked + .key_cap {
        background: linear-gradient(to bottom, var(--accent-active), var(--accent-hover));
        color: #ffffff;
        transform: translateY(2px);
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.25);
    }

    .key_option input:focus-visible + .key_cap {
        box-shadow: var(--focus);
    }

    /* Knapper */

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.55rem;
        width: 100%;
        padding: 0.85rem 1rem;
        border-radius: 10px;
        font-size: 0.95rem;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        transition: background 0.12s, border-color 0.12s, color 0.12s, transform 0.08s;
    }

    .btn svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .btn:active {
        transform: translateY(1px);
    }

    .btn:focus-visible {
        outline: none;
        box-shadow: var(--focus);
    }

    .btn_primary {
        background: var(--accent);
        color: #ffffff;
        border: 1px solid var(--accent);
        box-shadow: 0 4px 14px rgba(161, 58, 28, 0.35);
    }

    .btn_primary svg {
        fill: currentColor;
        stroke: none;
    }

    .btn_primary:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
    }

    .btn_primary:active {
        background: var(--accent-active);
    }

    .btn_secondary {
        background: var(--sidebar-surface);
        color: var(--sidebar-text);
        border: 1px solid var(--sidebar-border);
    }

    .btn_secondary:hover {
        background: #34302b;
        border-color: #4a453e;
    }

    .sidebar_footer {
        padding: 1rem 1.5rem 1.5rem;
        border-top: 1px solid var(--sidebar-border);
    }

    .btn_ghost {
        background: transparent;
        color: var(--sidebar-muted);
        border: 1px solid transparent;
        font-weight: 500;
    }

    .btn_ghost:hover {
        color: var(--sidebar-text);
        background: var(--sidebar-surface);
    }

    /* ---------- Arbeidsflate ---------- */

    .workspace {
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding: 2rem 2.5rem 2.5rem;
        gap: 1.5rem;
    }

    .workspace_header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--border);
    }

    .eyebrow {
        margin: 0 0 0.3rem;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    h2 {
        margin: 0;
        font-size: 1.9rem;
        font-weight: 700;
        letter-spacing: -0.04em;
        text-transform: capitalize;
    }

    .in_key {
        color: var(--accent-text);
        text-transform: none;
    }

    .tag {
        padding: 0.4rem 0.8rem;
        border-radius: 999px;
        background: var(--surface);
        border: 1px solid var(--border);
        font-size: 0.8rem;
        color: var(--text-soft);
        white-space: nowrap;
    }

    .canvas_area {
        flex: 1;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        border-radius: 20px;
        background-color: var(--canvas);
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
        background-size: 22px 22px;
        border: 1px solid var(--border);
        box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.35);
    }

    /* Diagonal lysinnfall fra øverst til venstre */
    .canvas_area::before {
        content: '';
        position: absolute;
        top: -200px;
        left: -200px;
        width: 700px;
        height: 700px;
        background: radial-gradient(ellipse at top left, rgba(255, 255, 240, 0.05) 0%, transparent 55%);
        pointer-events: none;
    }

    /* Varm glow nede til høyre */
    .canvas_area::after {
        content: '';
        position: absolute;
        bottom: -80px;
        right: -60px;
        width: 380px;
        height: 380px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(179, 67, 32, 0.18) 0%, transparent 65%);
        pointer-events: none;
    }

    /* Tom tilstand */

    .empty_state {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 340px;
    }

    .empty_keys {
        display: flex;
        gap: 4px;
        margin-bottom: 1.5rem;
    }

    .empty_key {
        width: 18px;
        height: 56px;
        border-radius: 3px 3px 6px 6px;
        background: var(--surface);
        border: 1px solid var(--border);
        animation: keyPulse 2.4s ease-in-out infinite;
    }

    @keyframes keyPulse {
        0%, 70%, 100% { transform: translateY(0); background: var(--surface); }
        35% { transform: translateY(3px); background: var(--accent); }
    }

    .empty_title {
        margin: 0 0 0.4rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-soft);
    }

    .placeholder {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--text-muted);
    }

    /* Akkordkort */

    .chord_row {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.25rem;
        width: 100%;
        max-width: 860px;
    }

    .chord_card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        min-height: 180px;
        padding: 2rem 1.25rem;
        border-radius: 20px;
        background: var(--surface-strong);
        border: 1px solid var(--border);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.25);
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease-out forwards;
    }

    .chord_card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 1.5rem;
        right: 1.5rem;
        height: 3px;
        border-radius: 0 0 3px 3px;
        background: var(--accent);
        opacity: 0.8;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .step {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    .chord_name {
        font-size: 2.25rem;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.03em;
        color: var(--text);
    }

    /* ---------- Responsivt ---------- */

    @media (max-width: 860px) {
        .app {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto 1fr;
        }

        .sidebar {
            position: static;
            height: auto;
            border-right: none;
            border-bottom: 1px solid var(--sidebar-border);
        }

        .brand {
            padding: 1.25rem 1rem;
        }

        .sidebar_scroll {
            overflow: visible;
            padding: 1.25rem 1rem;
            gap: 1.5rem;
        }

        .genre_list {
            flex-direction: row;
            flex-wrap: wrap;
        }

        .genre_chip {
            padding: 0.55rem 0.85rem;
            border-color: var(--sidebar-border);
        }

        .key_cap {
            height: 56px;
        }

        .sidebar_footer {
            padding: 0 1rem 1.25rem;
            border-top: none;
        }

        .workspace {
            padding: 1.5rem 1rem 2rem;
        }

        .canvas_area {
            min-height: 320px;
            padding: 2rem 1rem;
        }

        h2 {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .chord_row {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
        }

        .chord_card {
            min-height: 130px;
            padding: 1.5rem 0.75rem;
        }

        .chord_name {
            font-size: 1.6rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .chord_card,
        .empty_key {
            animation: none;
            opacity: 1;
            transform: none;
        }
    }
</style>
