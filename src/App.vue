<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { keyboardData, displaySettings, themeSettings, initializeTheme, setTheme } from './store';
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
            return;
        } catch { }
    }

    keyboardData.name = "Untitled Layout";

    keyboardData.keys = {
        w: "move_forward",
        a: "move_left",
        s: "move_backward",
        d: "move_right"
    }

    keyboardData.hotbar = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']
});

const displaySharePopup = ref(false);

function toggleTheme() {
    const newTheme = themeSettings.mode === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function share() {
    displaySharePopup.value = true;
}

function closeShare() {
    displaySharePopup.value = false;
}

let captureArea = ref<HTMLElement | null>(null);

async function capture() {
    displaySettings.viewMode = true;
    displaySettings.captureMode = true;
    if (!captureArea.value) return;
    try {
        const dataUrl = await toPng(captureArea.value, {
            // optional config: width,height, backgroundColor, etc
        });
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
        <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.5rem 0.75rem;">
            <a href="/" style="display:inline-flex;align-items:center;gap:0.75rem;text-decoration:none;color:inherit;">
                <img src="/pick.svg" width="25" height="25"></img>
                <span style="font-weight:700;font-size:1rem;line-height:1;">MC Keybinds Share</span>
            </a>
            
            <a href="https://github.com/benjith17/MCKS" target="_blank" rel="noopener noreferrer" style="margin-left:auto;display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;color:inherit;">
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
        <div class="button-group">
            <button @click="share()" v-if="displaySettings.captureMode == false">Share</button>
            <button @click="toggleTheme()" class="theme-toggle" title="Toggle light/dark mode" v-if="displaySettings.captureMode == false">
                <span v-if="themeSettings.mode === 'dark'">🌙</span>
                <span v-else>☀️</span>
            </button>
        </div>
        <p v-if="displaySettings.captureMode">
            Made with <img src="/pick.svg" width="15"></img> MCKS <span style="color: #aaaaaa">(https://mcks-cie.pages.dev/)</span>
        </p>
    </div>
    <!-- <pre>
        {{ keyboardData }}
    </pre> -->

    <p>
        Copyright &copy; Benjy Abbott (benjith17) 2025<br/>
        Some icons from <a href="https://mctiers.com/" target="_blank">MCTiers</a>. <br/>
        If you are from MCTiers and want me to stop using your icons then open an issue on GH.
    </p>


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
</style>
