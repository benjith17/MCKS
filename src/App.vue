<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { keyboardData, displaySettings, themeSettings, initializeTheme, setTheme, gameList, gameData } from './store';
import { toPng } from 'html-to-image';

import Keyboard from './components/Keyboard.vue';
import Hotbar from './components/Hotbar.vue';
import Metadata from './components/Metadata.vue';

watch(keyboardData, (v) => {
    window.location.hash = btoa(JSON.stringify(v));
})

onMounted(() => {
    initializeTheme();
    if (window.location.pathname == '/view/') displaySettings.viewMode = true;

    if (window.location.hash) {
        try {
            const urlData = JSON.parse(atob(window.location.hash.slice(1)))
            keyboardData.name = urlData.name;
            keyboardData.tags = urlData.tags;
            keyboardData.keys = urlData.keys;
            keyboardData.hotbar = urlData.hotbar;
            keyboardData.keyboard = urlData.keyboard;
            keyboardData.mouse = urlData.mouse;
            keyboardData.game = urlData.game;
            return;
        } catch { }
    }

    keyboardData.name = "Untitled Layout";

    keyboardData.keys = {
        w: 'move_forward',
        a: 'move_left',
        s: 'move_backward',
        d: 'move_right',
        lmb: 'int_attack',
        rmb: 'int_use',
        space: 'move_jump',
    };

    keyboardData.hotbar = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']

    keyboardData.keyboard = 'win65';
    keyboardData.mouse = 'gaming';
    keyboardData.game = 'minecraft';
});

function toggleTheme() {
    const newTheme = themeSettings.mode === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

const displaySharePopup = ref(false);

function share() {
    displaySharePopup.value = true;
}

function closeShare() {
    displaySharePopup.value = false;
}

const displayGameSelector = ref(false);

function selectGame() {
    displayGameSelector.value = true;
}

function closeGameSelector() {
    displayGameSelector.value = false;
}

function resetKeybinds() {
    const hotbarLength = gameData.value?.hotbarSize || 9;

    keyboardData.keys = { ...gameData.value?.defaultBinds };
    keyboardData.hotbar = Array(hotbarLength).fill('none');
    if (gameData.value?.canEditHotbar == false) {
        keyboardData.hotbar = gameData.value?.hotbarItems.map(i => i.id).slice(0, hotbarLength) || [];
    }
}

let captureArea = ref<HTMLElement | null>(null);

async function capture() {
    displaySettings.viewMode = true;
    displaySettings.captureMode = true;
    await nextTick();
    if (!captureArea.value) return;
    try {
        const dataUrl = await toPng(captureArea.value, {
            skipFonts: true,
            filter: (node) => {
                if (node instanceof HTMLElement && node.style.display === 'none') return false;
                return true;
            },
        });
        console.log(dataUrl);
        // download:
        const link = document.createElement('a');
        link.download = keyboardData.name + '.png';
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Capture failed', err);
    }
    displaySettings.viewMode = false;
    displaySettings.captureMode = false;

    displaySharePopup.value = false;
}

async function copyLink() {
    let text = new URL(window.location.href);
    text.pathname = '/view/'
    try {
        await navigator.clipboard.writeText(text.href);
    } catch (err) {
        console.error("Clipboard copy failed:", err);
    }

    displaySharePopup.value = false;
}

</script>

<template>
    <nav>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.75rem;">
            <div class="game-switch-btn">
                <img :src="'/' + gameData?.icon" width="25" height="25" @click="selectGame()">
                <i class="bi bi-caret-down-fill" @click="selectGame()"></i>
            </div>
            <!-- <a href="/"
                style="display:inline-flex;align-items:center;gap:0.75rem;text-decoration:none;color:inherit;margin-left:1rem;"> -->
                <span style="font-weight:700;font-size:1rem;line-height:1;margin-left:1rem;">{{ gameData?.name }}</span>
            <!-- </a> -->

            <a href="https://github.com/benjith17/MCKS" target="_blank" rel="noopener noreferrer"
                style="margin-left:auto;display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
                <i class="bi bi-github"></i>
                <span style="font-weight:600;font-size:0.95rem;">GitHub</span>
            </a>

            <!-- <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" style="margin-left:auto;display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
                <i class="bi bi-discord"></i>
                <span style="font-weight:600;font-size:0.95rem;">Discord</span>
            </a> -->
        </div>
    </nav>
    <div ref="captureArea" class="container">
        <Metadata />
        <Keyboard />
        <Hotbar />
        <p v-show="displaySettings.captureMode" class="watermark">
            Made with <img src="/icon.svg" width="15"></img> MCKS <span
                style="color: #aaaaaa">(https://mcks-cie.pages.dev/)</span>
        </p>
        <div class="button-group">
            <button @click="share()" v-if="displaySettings.captureMode == false">Share</button>
            <button @click="toggleTheme()" class="theme-toggle" title="Toggle light/dark mode"
                v-if="displaySettings.captureMode == false">
                <span v-if="themeSettings.mode === 'dark'">🌙</span>
                <span v-else>☀️</span>
            </button>
        </div>
    </div>
    <!-- <pre>
        {{ keyboardData }}
    </pre> -->

    <p>
        Copyright &copy; benjith17 2025<br />
        Some icons from <a href="https://mctiers.com/" target="_blank">MCTiers</a>. <br />
        If you are from MCTiers and want me to stop using your icons then open an issue on GH.
    </p>


    <div @click="closeGameSelector()" class="cover" :style="{ display: displayGameSelector ? '' : 'none' }">
        <div class="game-popover" :style="{ display: displayGameSelector ? '' : 'none' }" @click.stop>
            <button v-for="game in gameList" class="gamebtn"
                @click="keyboardData.game = game.id; resetKeybinds(); closeGameSelector()">
                <img :src="'/' + game.icon" width="20" height="20">
                {{ game.name }}
            </button>
            <div>
                <i class="bi bi-exclamation-circle"></i>
                Switching games will clear your current keybinds and hotbar.<br />
                <i class="bi bi-controller"></i>
                Can't find your game? Open an issue on <a href="https://github.com/benjith17/MCKS/issues"
                    target="_blank">GitHub</a> and I'll add it!<br />
            </div>
        </div>
    </div>


    <div @click="closeShare()" class="cover" :style="{ display: displaySharePopup ? '' : 'none' }"></div>
    <div class="share-popover" :style="{ display: displaySharePopup ? '' : 'none' }">
        <button @click="copyLink()">
            <i class="bi bi-link-45deg"></i>
            Copy share url
        </button>
        <button @click="capture()">
            <i class="bi bi-image"></i>
            Download Image
        </button>
    </div>
    <!-- <button @click="displaySettings.viewMode=true;displaySettings.captureMode=true;">cap</button> -->
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    overflow: hidden;
}

.button-group {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

.theme-toggle {
    padding: 0.5em 0.8em;
    font-size: 1.2em;
    border-radius: 6px;
}

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-overlay);
    top: 0;
    left: 0;

    z-index: 1;

    display: flex;
    justify-content: center;
}

.share-popover {
    position: absolute;
    display: flex;
    left: 0;
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    gap: 10px;
    z-index: 2;
}

.game-popover {
    z-index: 2;
    position: absolute;
    top: 50px;
    flex-direction: row;
    max-width: 514px;
    background: linear-gradient(145deg, var(--color-bg-secondary), var(--color-bg-tertiary));
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    gap: 8px;
    display: inline-flex;
    flex-wrap: wrap;
    width: fit-content;
    margin: 100px;
    justify-content: center;
}

.game-switch-btn {
    display: flex;
    justify-content: center;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    padding: 3px 4px;
}

.gamebtn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    background: linear-gradient(145deg, var(--color-bg-input), var(--color-bg-input));
    border: 2px solid var(--color-border);
    font-size: 1rem;
    transition: all 0.3s;
}

.gamebtn:hover {
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input-hover));
    border: 2px solid var(--color-border-hover);
}

.watermark {
    font-size: 13pt;
    margin: 0;
}
</style>
