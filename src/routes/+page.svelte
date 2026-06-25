<script>
import { onMount } from "svelte";
import chords from '$lib/chords.js'

let currentChords = $state([])

const generateChord = () => {
    const allChords = chords()
    const randomIndex = Math.floor(Math.random() * allChords.length)
    currentChords = allChords[randomIndex]
}

onMount(() => {
    const send_btn = document.querySelector('.send_btn');
    const genres = document.querySelector('.genres');

    if (genres) {
        genres.addEventListener('change', (event) => {
            console.log('Genre selected:', event.target.value);
        });
    }

    if (send_btn) {
        send_btn.addEventListener('click', () => {
            generateChord();
        })
    }
});
</script>

<div class="main_container">
    <div class="card">
        <header>
            <h1>VibeKeys</h1>
            <p class="subtitle">Chord progression generator</p>
        </header>

        <div class="controls">
            <select class="genres">
                <option value="r&b">R&B</option>
                <option value="Pop">Pop</option>
                <option value="Indie_Pop">Indie Pop</option>
                <option value="Pop_Rock">Pop Rock</option>
            </select>
            <button class="send_btn" type="button">Generer akkord</button>
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
        background: #F3F4FA;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .main_container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    }

    .card {
        background: #ffffff;
        border-radius: 20px;
        border: 1px solid #DDDFF0;
        padding: 2.5rem;
        width: 100%;
        max-width: 660px;
        box-shadow:
            0 1px 2px rgba(26, 27, 36, 0.05),
            0 6px 20px rgba(26, 27, 36, 0.04);
    }

    header {
        margin-bottom: 2rem;
    }

    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #1A1B24;
        margin: 0 0 0.3rem 0;
        letter-spacing: -0.04em;
        text-wrap: balance;
    }

    .subtitle {
        font-size: 0.875rem;
        color: #7E86A3;
        margin: 0;
        letter-spacing: 0.01em;
    }

    .controls {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }

    .genres {
        flex: 1;
        padding: 0.625rem 1rem;
        border: 1px solid #DDDFF0;
        border-radius: 10px;
        background: #F3F4FA;
        color: #1A1B24;
        font-size: 0.875rem;
        font-family: inherit;
        appearance: none;
        cursor: pointer;
        outline: none;
    }

    .genres:focus {
        border-color: #5E60D8;
        box-shadow: 0 0 0 3px rgba(94, 96, 216, 0.12);
    }

    .send_btn {
        padding: 0.625rem 1.5rem;
        background: #5E60D8;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        font-size: 0.875rem;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.12s;
    }

    .send_btn:hover {
        background: #4C4EB8;
    }

    .send_btn:active {
        background: #3E40A0;
    }

    .chord_display {
        background: #F3F4FA;
        border-radius: 14px;
        border: 1px solid #DDDFF0;
        min-height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1.5rem;
    }

    .placeholder {
        color: #7E86A3;
        font-size: 0.875rem;
        margin: 0;
        text-align: center;
    }

    .chord_row {
        display: flex;
        gap: 0.875rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .chord_card {
        background: #ffffff;
        border: 1px solid #DDDFF0;
        border-radius: 12px;
        padding: 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.375rem;
        min-width: 82px;
        box-shadow: 0 1px 3px rgba(26, 27, 36, 0.06);
    }

    .step {
        font-size: 0.7rem;
        color: #7E86A3;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .chord_name {
        font-size: 1.5rem;
        font-weight: 650;
        color: #5E60D8;
        letter-spacing: -0.02em;
        line-height: 1;
    }

    @media (max-width: 500px) {
        .card {
            padding: 1.5rem;
        }

        h1 {
            font-size: 1.6rem;
        }

        .controls {
            flex-direction: column;
        }

        .send_btn {
            width: 100%;
            padding: 0.75rem;
        }

        .chord_name {
            font-size: 1.25rem;
        }
    }
</style>
