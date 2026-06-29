<script>
import { pop_chords, rock_chords, rhythm_and_Blues_chords, klassisk } from '$lib/chords.js'


let selectedGenre = $state("Pop")
let currentChords = $state([])

const generateChord = () => {
    let allChords = []
    if (selectedGenre === "Pop") {
        allChords = pop_chords()
    } else if (selectedGenre === "Rock") {
        allChords = rock_chords()
    } else if (selectedGenre === "r&b") {
        allChords = rhythm_and_Blues_chords()
    } else if (selectedGenre === "Klassisk") {
        allChords = klassisk()
    } else {
        console.log("Her var det tomt!!!")
    }
    if (allChords.length === 0) return
    const randomIndex = Math.floor(Math.random() * allChords.length)
    currentChords = allChords[randomIndex]
}
</script>

<div class="main_container">
    <header>
        <h1>VibeKeys</h1>
        <p class="subtitle">Chord progression generator</p>
    </header>

    <div class="canvas_area">
        <div class="controls">
            <select class="genres" bind:value={selectedGenre}>
                <option value="Pop">Pop</option>
                <option value="r&b">R&B</option>
                <option value="Klassisk">Klassisk</option>
                <option value="Rock">Rock</option>
            </select>
        </div>

        <div class="controls">
            <button class="send_btn" type="button" onclick={generateChord}>Generer akkord</button>
        </div>

        <div class="chord_display">
            {#if currentChords.length === 0}
                <p class="placeholder">Velg en sjanger og trykk generer</p>
            {:else}
                <div class="chord_row">
                    {#each currentChords as chord, i}
                        <div class="chord_card">
                            <span class="step">{i + 1}</span>
                            <span class="chord_name">{chord}</span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        background: #faf9f5;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .main_container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
    }

    header {
        margin-bottom: 3rem;
        border-bottom: 1px solid #E0E0E0; /* Samme farge som i Figma */
        width: 100%;
        margin: 16px 0; /* Juster avstand over/under linjen */
    }

    h1 {
        font-size: 30px;
        font-weight: 700;
        color: #1A1A1A;
        margin: 0 0 0.3rem 0;
        letter-spacing: -0.04em;
    }

    .subtitle {
        font-size: 1rem;
        color: #6F6F6F;
        margin: 0;
    }

    .canvas_area {
        flex: 1;
        margin-top: 1.5rem;
        border-radius: 20px;
        background-color: #f0ede5;
        background-image: radial-gradient(circle, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
        background-size: 22px 22px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        box-shadow:
            0 2px 1px rgba(0,0,0,0.04),
            0 4px 8px rgba(0,0,0,0.06),
            0 12px 32px rgba(0,0,0,0.07),
            inset 0 1px 0 rgba(255,255,255,0.6);
    }

    /* Diagonal lysinnfall fra øverst til venstre */
    .canvas_area::before {
        content: '';
        position: absolute;
        top: -200px;
        left: -200px;
        width: 700px;
        height: 700px;
        background: radial-gradient(ellipse at top left, rgba(255, 255, 240, 0.45) 0%, transparent 55%);
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
        background: radial-gradient(circle, rgba(179, 67, 32, 0.08) 0%, transparent 65%);
        pointer-events: none;
    }

    .controls {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 3rem;
    }

    .genres {
        padding: 0.75rem 1.25rem;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        background: #FFFFFF;
        color: #1A1A1A;
        font-size: 0.95rem;
        font-family: inherit;
        appearance: none;
        cursor: pointer;
        outline: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .genres:focus {
        border-color: #1ABCFE;
        box-shadow: 0 0 0 3px rgba(26, 188, 254, 0.15);
    }

    .send_btn {
        padding: 0.75rem 2rem;
        background: #b34320;
        color: #ffffff;
        border: none;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: background 0.12s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .send_btn:hover {
        background: #e87a30;
    }

    .send_btn:active {
        background: #d06a20;
    }

    .chord_display {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 100px;
    }

    .placeholder {
        color: #6F6F6F;
        font-size: 1rem;
        margin: 0;
    }

    .chord_row {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .chord_card {
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        border-radius: 20px;
        padding: 2.5rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        min-width: 120px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .step {
        font-size: 0.7rem;
        color: #8E8E8E;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .chord_name {
        font-size: 2rem;
        font-weight: 700;
        color: #706e6e;
        letter-spacing: -0.03em;
        line-height: 1;
    }

    @media (max-width: 600px) {
        .main_container {
            padding: 2rem 1.5rem;
        }

        h1 {
            font-size: 2rem;
        }

        .controls {
            flex-direction: column;
        }

        .chord_name {
            font-size: 1.5rem;
        }
    }
</style>
