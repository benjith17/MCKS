import { reactive, computed } from "vue";
import type { KeyboardData, Tag } from "./types";
import minecraft from "./games/minecraft";
import cs2 from "./games/cs2";

export const keyboardData = reactive<KeyboardData>({
    name: '',
    tags: [],
    keys: {},
    hotbar: [],
    keyboard: '',
    mouse: '',
    game: '',
});

export const keyboardOptions = [
    {
        id: "win65", name: "Windows 65%", keys: reactive([
            [
                { id: 'backtick', text: '` ¬', size: 1 },
                { id: '_1', text: '1', size: 1 },
                { id: '_2', text: '2', size: 1 },
                { id: '_3', text: '3', size: 1 },
                { id: '_4', text: '4', size: 1 },
                { id: '_5', text: '5', size: 1 },
                { id: '_6', text: '6', size: 1 },
                { id: '_7', text: '7', size: 1 },
                { id: '_8', text: '8', size: 1 },
                { id: '_9', text: '9', size: 1 },
                { id: '_0', text: '0', size: 1 },
                { id: 'minus', text: '- _', size: 1 },
                { id: 'equals', text: '= +', size: 1 },
                { id: 'backspace', text: 'BKSP', size: 2 }

            ],
            [
                { id: 'tab', text: 'TAB', size: 2 },
                { id: 'q', text: 'Q', size: 1 },
                { id: 'w', text: 'W', size: 1 },
                { id: 'e', text: 'E', size: 1 },
                { id: 'r', text: 'R', size: 1 },
                { id: 't', text: 'T', size: 1 },
                { id: 'y', text: 'Y', size: 1 },
                { id: 'u', text: 'U', size: 1 },
                { id: 'i', text: 'I', size: 1 },
                { id: 'o', text: 'O', size: 1 },
                { id: 'p', text: 'P', size: 1 },
                { id: 'bracketopen', text: '[ {', size: 1 },
                { id: 'bracketclose', text: '] }', size: 1 },
                { id: 'hash', text: '# ~', size: 1 }
            ],
            [
                { id: 'caps', text: 'CAPS', size: 3 },
                { id: 'a', text: 'A', size: 1 },
                { id: 's', text: 'S', size: 1 },
                { id: 'd', text: 'D', size: 1 },
                { id: 'f', text: 'F', size: 1 },
                { id: 'g', text: 'G', size: 1 },
                { id: 'h', text: 'H', size: 1 },
                { id: 'j', text: 'J', size: 1 },
                { id: 'k', text: 'K', size: 1 },
                { id: 'l', text: 'L', size: 1 },
                { id: 'semicolon', text: '; :', size: 1 },
                { id: 'apostrophe', text: "' @", size: 1 },
                { id: 'enter', text: 'ENTER', size: 2 }
            ],
            [
                { id: 'shiftleft', text: 'SHIFT', size: 2 },
                { id: 'backslash', text: '\\', size: 1 },
                { id: 'z', text: 'Z', size: 1 },
                { id: 'x', text: 'X', size: 1 },
                { id: 'c', text: 'C', size: 1 },
                { id: 'v', text: 'V', size: 1 },
                { id: 'b', text: 'B', size: 1 },
                { id: 'n', text: 'N', size: 1 },
                { id: 'm', text: 'M', size: 1 },
                { id: 'comma', text: ',', size: 1 },
                { id: 'period', text: '.', size: 1 },
                { id: 'slash', text: '/', size: 1 },
                { id: 'shiftright', text: 'SHIFT', size: 3 }
            ],
            [
                { id: 'ctrlleft', text: 'CTRL', size: 2 },
                { id: 'winleft', text: 'WIN', size: 2 },
                { id: 'altleft', text: 'ALT', size: 2 },
                { id: 'space', text: 'SPACE', size: 5 },
                { id: 'altright', text: 'ALT GR', size: 2 },
                { id: 'menu', text: 'MENU', size: 2 },
                { id: 'ctrlright', text: 'CTRL', size: 2 }
            ]
        ])
    },
    {
        id: "mac65", name: "MacOS 65%", keys: reactive([
            [
                { id: 'backtick', text: '§ ±', size: 1 },
                { id: '_1', text: '1', size: 1 },
                { id: '_2', text: '2', size: 1 },
                { id: '_3', text: '3', size: 1 },
                { id: '_4', text: '4', size: 1 },
                { id: '_5', text: '5', size: 1 },
                { id: '_6', text: '6', size: 1 },
                { id: '_7', text: '7', size: 1 },
                { id: '_8', text: '8', size: 1 },
                { id: '_9', text: '9', size: 1 },
                { id: '_0', text: '0', size: 1 },
                { id: 'minus', text: '- _', size: 1 },
                { id: 'equals', text: '= +', size: 1 },
                { id: 'backspace', text: 'BKSP', size: 2 }

            ],
            [
                { id: 'tab', text: 'TAB', size: 2 },
                { id: 'q', text: 'Q', size: 1 },
                { id: 'w', text: 'W', size: 1 },
                { id: 'e', text: 'E', size: 1 },
                { id: 'r', text: 'R', size: 1 },
                { id: 't', text: 'T', size: 1 },
                { id: 'y', text: 'Y', size: 1 },
                { id: 'u', text: 'U', size: 1 },
                { id: 'i', text: 'I', size: 1 },
                { id: 'o', text: 'O', size: 1 },
                { id: 'p', text: 'P', size: 1 },
                { id: 'bracketopen', text: '[ {', size: 1 },
                { id: 'bracketclose', text: '] }', size: 1 },
                { id: 'hash', text: '| \\', size: 1 }
            ],
            [
                { id: 'caps', text: 'CAPS', size: 3 },
                { id: 'a', text: 'A', size: 1 },
                { id: 's', text: 'S', size: 1 },
                { id: 'd', text: 'D', size: 1 },
                { id: 'f', text: 'F', size: 1 },
                { id: 'g', text: 'G', size: 1 },
                { id: 'h', text: 'H', size: 1 },
                { id: 'j', text: 'J', size: 1 },
                { id: 'k', text: 'K', size: 1 },
                { id: 'l', text: 'L', size: 1 },
                { id: 'semicolon', text: '; :', size: 1 },
                { id: 'apostrophe', text: "' \"", size: 1 },
                { id: 'enter', text: 'ENTER', size: 2 }
            ],
            [
                { id: 'shiftleft', text: 'SHIFT', size: 2 },
                { id: 'backslash', text: '~ `', size: 1 },
                { id: 'z', text: 'Z', size: 1 },
                { id: 'x', text: 'X', size: 1 },
                { id: 'c', text: 'C', size: 1 },
                { id: 'v', text: 'V', size: 1 },
                { id: 'b', text: 'B', size: 1 },
                { id: 'n', text: 'N', size: 1 },
                { id: 'm', text: 'M', size: 1 },
                { id: 'comma', text: ',', size: 1 },
                { id: 'period', text: '.', size: 1 },
                { id: 'slash', text: '/', size: 1 },
                { id: 'shiftright', text: 'SHIFT', size: 3 }
            ],
            [
                { id: 'ctrlleft', text: 'CTRL', size: 2 },
                { id: 'winleft', text: 'ALT', size: 2 },
                { id: 'altleft', text: 'CMD', size: 2 },
                { id: 'space', text: 'SPACE', size: 5 },
                { id: 'altright', text: 'CMD', size: 2 },
                { id: 'menu', text: 'ALT', size: 2 },
                { id: 'ctrlright', text: 'CTRL', size: 2 }
            ]
        ])
    },
];

export const keyboardKeys = computed(() =>
    keyboardOptions.find(e => e.id === keyboardData.keyboard)?.keys ?? []
);

export const mouseOptions = [
    {
        id: "gaming", name: "Gaming Mouse", keys: reactive([
            [
                { id: 'lmb', text: 'LMB', size: 6 },
                { id: 'mmb', text: 'MMB', size: 6 },
                { id: 'rmb', text: 'RMB', size: 6 },
            ],
            [
                { id: 'mb4', text: 'MB4', size: 1 },
            ],
            [
                { id: 'mb5', text: 'MB5', size: 1 },
            ]
        ])
    },
    {
        id: "office", name: "Office Mouse", keys: reactive([
            [
                { id: 'lmb', text: 'LMB', size: 6 },
                { id: 'mmb', text: 'MMB', size: 6 },
                { id: 'rmb', text: 'RMB', size: 6 },
            ]
        ])
    },
    {
        id: "mmomouse", name: "MMO Mouse", keys: reactive([
            [
                { id: 'lmb', text: 'LMB', size: 1 },
                { id: 'mmb', text: 'MMB', size: 1 },
                { id: 'rmb', text: 'RMB', size: 1 },
            ],
            [
                { id: 'mb4', text: '1', size: 1 },
                { id: 'mb5', text: '2', size: 1 },
                { id: 'mbs3', text: '3', size: 1 },
            ],
            [
                { id: 'mbs4', text: '4', size: 1 },
                { id: 'mbs5', text: '5', size: 1 },
                { id: 'mbs6', text: '6', size: 1 },
            ],
            [
                { id: 'mbs7', text: '7', size: 1 },
                { id: 'mbs8', text: '8', size: 1 },
                { id: 'mbs9', text: '9', size: 1 },
            ],
            [
                { id: 'mbs10', text: '10', size: 1 },
                { id: 'mbs11', text: '11', size: 1 },
                { id: 'mbs12', text: '12', size: 1 },
            ]
        ])
    }
];

export const mouseButtons = computed(() =>
    mouseOptions.find(e => e.id === keyboardData.mouse)?.keys ?? []
);

export const gameList = reactive([
    minecraft,
    cs2,
]);

export const gameData = computed(() =>
    gameList.find(e => e.id === keyboardData.game)
);

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

export const allTags = reactive<Tag[]>([
    // { id: 'type_', name: "Crystal PVP", color: "#c889e6" },
    { id: 'owner_me', name: "My binds", color: '#18613eff' },
    { id: 'owner_yt', name: "Youtuber's Binds", color: '#621317ff' },
    { id: 'type_crystal', name: "Crystal PVP", color: "#7d5590ff" },
    { id: 'type_sword', name: "Sword", color: "#36727cff" },
    { id: 'type_axe', name: "Axe", color: "#404f7eff" },
    { id: 'type_uhc', name: "UHC", color: "#224535ff" },
]);

export { getSystemTheme };