import { reactive } from "vue";
import type { KeyboardData, tag } from "./types";

export const keyboardData = reactive<KeyboardData>({
    name: '',
    tags: [],
    keys: {},
    hotbar: []
});

export const displaySettings = reactive({
    viewMode: false,
    captureMode: false,
});

export const themeSettings = reactive({
    mode: (localStorage.getItem('theme') || getSystemTheme()) as 'light' | 'dark',
});

function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(mode: 'light' | 'dark') {
    themeSettings.mode = mode;
    localStorage.setItem('theme', mode);
    updateTheme(mode);
}

export function initializeTheme() {
    updateTheme(themeSettings.mode);
}

function updateTheme(mode: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', mode);
}

export const allTags = reactive<tag[]>([
    // { id: 'type_', name: "Crystal PVP", color: "#c889e6" },
    { id: 'owner_me', name: "My binds", color: '#18613eff' },
    { id: 'owner_yt', name: "Youtuber's Binds", color: '#621317ff' },
    { id: 'type_crystal', name: "Crystal PVP", color: "#7d5590ff" },
    { id: 'type_sword', name: "Sword", color: "#36727cff" },
    { id: 'type_axe', name: "Axe", color: "#404f7eff" },
    { id: 'type_uhc', name: "UHC", color: "#224535ff" },
]);

export { getSystemTheme };