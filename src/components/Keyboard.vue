<script setup lang="ts">
import { computed, ref } from 'vue';
import { keyboardData, displaySettings, keyboardKeys, keyboardOptions, mouseOptions, mouseButtons, gameData } from '../store';

const keybinds = computed(() => {
    return gameData.value?.keys || [];
})

const items = computed(() => {
    return gameData.value?.hotbarItems || [];
})

const hotbarSize = computed(() => {
    return gameData.value?.hotbarSize || 9;
})

const highlights = [
    'green',
    'blue',
    'purple',
    'red',
    'yellow',
    'cyan',
    'orange',
    'pink',
]

/* return a color string (or empty) based on whether a binding exists */
function getKeyColor(k: string): string {
    const key = keyboardData.keys[k];
    if (key) {
        return getColor(key);
    }

    return '';
}

function getColor(k: string) {
    const group = k.split('_')[0];
    if (group == 'hb') return gameData.value?.hotbarKeysColor ?? '';

    if (group == 'hl') {
        return 'hl-' + k.split('_')[1];
    }

    return gameData.value?.groups.find(g => g.id == group)?.color ?? '';
}

function getAction(k: string): string {
    const key = keyboardData.keys[k];
    if (key) {
        const group = key.split('_')[0];

        if (group == 'hb') {
            const idx = Number(key.split('_')[1]) - 1;
            const item = keyboardData.hotbar[idx] ?? '';
            if (item == 'none') return 'slot ' + (idx + 1).toString();
            return item;
        }
        for (let i of keybinds.value) {
            if (i.id == key) return i.short || i.label;
        }

        return '';
    }
    return '';
}

// function getNumber(k: string): string {
//     const key = data.value.keys[k];
//     if (key) {
//         if (key.split('_')[0] == 'hb') return key.split('_')[1]!;
//     }
//     return '';
// }

const showPopover = ref(false);
const selectedKey = ref('');
const selectedKeyText = ref("");

function editKey(k: string, t: string) {
    if (displaySettings.viewMode) return;

    showPopover.value = true;
    selectedKey.value = k;
    selectedKeyText.value = t;
}

function closeKeyEdit() {
    showPopover.value = false;
}

function formatKeyOptionData() {
    let formatted = [];
    for (let group of gameData.value?.groups || []) {
        let groupBinds = keybinds.value.filter(k => k.id.split('_')[0] == group.id);
        formatted.push({ name: group.name, color: group.color, binds: groupBinds });
    }
    return formatted;
}

</script>

<template>
    <!-- <pre style="text-align: left;">{{ data }}</pre> -->

    <div class="row">
        <div>
            <div class="keyboard">

                <div class="row" v-for="row in keyboardKeys">

                    <div @click="editKey(key.id, key.text)" @contextmenu.prevent="keyboardData.keys[key.id] = ''"
                        class="key" v-for="key in row" :class="getKeyColor(key.id),
                            key.size == 2 ? 'key-m' : '',
                            key.size == 3 ? 'key-l' : '',
                            key.size == 4 ? 'key-xl' : '',
                            key.size == 5 ? 'key-space' : ''
                            ">

                        <!-- <div class=" key-number">{{ getNumber(key.id) }}</div> -->
                        {{ key.text }}
                        <div class="key-action">{{ getAction(key.id) }}</div>
                    </div>

                </div>

            </div>
            <div class="dropdown">
                <select v-model="keyboardData.keyboard" class="dropdown-select"
                    v-if="displaySettings.captureMode == false">
                    <option v-for="opt in keyboardOptions" :value="opt.id">{{ opt.name }}</option>
                </select>
            </div>
        </div>
        <div>
            <div class="mouse">
                <div class="row" v-for="row in mouseButtons">

                    <div @click="editKey(key.id, key.text)" @contextmenu.prevent="keyboardData.keys[key.id] = ''"
                        class="key" v-for="key in row" :class="getKeyColor(key.id),
                            key.size == 2 ? 'key-m' : '',
                            key.size == 3 ? 'key-l' : '',
                            key.size == 4 ? 'key-xl' : '',
                            key.size == 5 ? 'key-space' : '',
                            key.size == 6 ? 'mouse-btn' : ''
                            ">

                        <!-- <div class=" key-number">{{ getNumber(key.id) }}</div> -->
                        {{ key.text }}
                        <div class="key-action">{{ getAction(key.id) }}</div>
                    </div>

                </div>
            </div>
            <div class="dropdown">
                <select v-model="keyboardData.mouse" class="dropdown-select"
                    v-if="displaySettings.captureMode == false">
                    <option v-for="opt in mouseOptions" :value="opt.id">{{ opt.name }}</option>
                </select>
            </div>
        </div>
    </div>


    <div @click="closeKeyEdit()" class="cover" :style="{ display: showPopover ? '' : 'none' }"></div>
    <div class="popover" style="padding-top: 0;" :style="{ display: showPopover ? '' : 'none' }">
        <div class="key" style="margin-bottom: -25px;">{{ selectedKeyText }}</div>
        <div class="settings-section" style="padding-top: 35px;">

            <div class="bind-options">
                <div class="bind-option hl-red" @click="keyboardData.keys[selectedKey] = ''; closeKeyEdit()">
                    Unbind
                </div>
                <!-- <div v-for="keybind in keybinds" @click="keyboardData.keys[selectedKey] = keybind.id; closeKeyEdit()"
                    class="bind-option" :class="'hl-' + getColor(keybind.id)" :data-tooltip="keybind.label">
                    {{ keybind.label }}
                </div> -->
                <!-- <pre>{{ keybinds }}</pre> -->
            </div>

            <div class="binds-category" v-for="group in formatKeyOptionData()" :key="group.name">
                <div class="bind-group-label">{{ group.name }}</div>
                <div class="bind-options">
                    <div v-for="keybind in group.binds"
                        @click="keyboardData.keys[selectedKey] = keybind.id; closeKeyEdit()" class="bind-option"
                        :class="'hl-' + getColor(keybind.id)" :data-tooltip="keybind.label">
                        {{ keybind.label }}
                    </div>
                </div>
            </div>

            <div class="hb">
                <div class="slot-container" v-for="slot in Array.from({ length: hotbarSize || 9 }, (_, i) => i)">
                    <div class="spacer" :hidden="!(gameData?.hotbarSpacers as any)?.includes(slot)"></div>
                    <div class="hb-slot" @click="keyboardData.keys[selectedKey] = 'hb_' + (slot + 1); closeKeyEdit()">
                        <img :src="'/' + items.find(i => i.id == keyboardData.hotbar[slot])?.icon">
                    </div>
                </div>
            </div>

            <div class="hl-colors">
                <div class="hl-color" v-for="hlColor in highlights" :class="'hl-' + hlColor"
                    @click="keyboardData.keys[selectedKey] = 'hl_' + hlColor; closeKeyEdit()"></div>
            </div>
        </div>

        <!-- <div class="dropdown">
            <select v-model="keyboardData.keys[selectedKey]" class="dropdown-select">
                <option v-for="keybind in keybinds" :value="keybind.id">{{ keybind.label }}</option>
                <option disabled>---</option>
                <option v-for="hl in highlights" :value="'hl_' + hl">Highlight {{ hl }}</option>
            </select>
        </div> -->
    </div>

</template>

<style scoped>
.settings-section {
    background: linear-gradient(145deg, var(--color-bg-secondary), var(--color-bg-tertiary));
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-overlay);
    top: 0;
    left: 0;
}

.popover {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dropdown-select {
    margin: 15px;
    width: 200px;
    padding: 12px 40px 12px 15px;
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text-primary);
    font-size: 14px;
    font-family: 'Courier New', monospace;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 var(--color-shadow-dark);
}

.dropdown-select:hover {
    border-color: var(--color-border-focus);
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input-hover));
}

.dropdown-select:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 2px 0 var(--color-shadow-dark), 0 0 15px rgba(74, 222, 128, 0.3);
}

/* .dropdown::after {
    content: '▼';
    position: absolute;
    color: var(--color-border-focus);
    pointer-events: none;
    font-size: 12px;
} */

option {
    background-color: var(--color-bg-secondary);
}

.hb {
    display: flex;
    gap: 8px;
    margin-top: 15px;
    justify-content: center;
}

.hb-slot {
    width: 50px;
    height: 50px;
    padding: 6px;
    margin: 0 1px;
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 var(--color-shadow-dark);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.hb-slot:hover {
    border-color: var(--color-border-focus);
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input-hover));
}

.slot-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.spacer {
    width: 3px;
    height: 90%;
    border-radius: 2px;
    background: var(--color-border);
    margin-right: 8px;
}

.keyboard {
    background: var(--color-bg-secondary);
    border-radius: 15px;
    padding: 20px;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
}

.row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    justify-content: center;
}

.mouse {
    background: var(--color-bg-secondary);
    border-radius: 15px;
    padding: 20px;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
}

.key.mouse-btn {
    height: 120px;
    font-size: 16px;
    font-weight: bold;
}

.binds-category {
    max-height: 40vh;
    max-width: 60vw;
    padding: 3px 0;
}

.bind-options {
    display: grid;
    /* flex-direction: column; */
    grid-template-columns: repeat(4, calc(60vw / 4 - 16px));
    gap: 8px;
}

.bind-option {
    padding: 2px 4px;
    margin: 3px 0;
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text-primary);
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 var(--color-shadow-dark);

    flex: 1 1 calc(25% - 1rem);
    /* max-width: ; */
}

.bind-group-label {
    /* font-size: 12px; */
    font-weight: bold;
    color: var(--color-text-primary);
    /* margin-top: 10px; */
    width: 100%;
    text-align: left;
}

.hl-colors {
    display: flex;
    gap: 8px;
    margin-top: 10px;
    justify-content: center;
}

.hl-color {
    width: 30px;
    height: 30px;
    border-radius: 1000px;
    border: 2px solid var(--color-border);
    cursor: pointer;
    box-shadow: 0 2px 0 var(--color-shadow-dark);
    transition: all 0.3s;
}

/* .bind-option:hover {
    border-color: var(--color-border-focus);
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input-hover));
} */

.bind-option.selected {
    border-color: #eee !important;
}

.key {
    background: linear-gradient(145deg, var(--color-bg-input), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
    position: relative;
    box-shadow: 0 3px 0 var(--color-shadow-dark);
    transition: all 0.2s;
    cursor: pointer;
}

.key.key-m {
    width: 81px;
}

.key.key-l {
    width: 112px;
}

.key.key-xl {
    width: 174px;
}

.key.key-space {
    width: 305px;
}

.key:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--color-shadow-dark);
}

.key-icon {
    position: absolute;
    top: 3px;
    right: 3px;
    font-size: 12px;
}

.key-number {
    position: absolute;
    top: 0px;
    left: 3px;
    font-size: 13px;
}

.key-action {
    font-size: 9px;
    color: #ffffff;
    margin-top: 2px;
    text-transform: uppercase;
}

.key.selected {
    border-color: #eee !important;
}

/* Colored Keys */
.green {
    background: linear-gradient(145deg, #22c55e, #16a34a);
    border-color: #4ade80;
    box-shadow: 0 3px 0 #166534, 0 0 20px rgba(74, 222, 128, 0.4);
}

.green:hover {
    box-shadow: 0 5px 0 #166534, 0 0 25px rgba(74, 222, 128, 0.6);
}

.blue {
    background: linear-gradient(145deg, #3b82f6, #2563eb);
    border-color: #60a5fa;
    box-shadow: 0 3px 0 #1e40af, 0 0 20px rgba(96, 165, 250, 0.4);
}

.blue:hover {
    box-shadow: 0 5px 0 #1e40af, 0 0 25px rgba(96, 165, 250, 0.6);
}

.purple {
    background: linear-gradient(145deg, #a855f7, #9333ea);
    border-color: #c084fc;
    box-shadow: 0 3px 0 #7e22ce, 0 0 20px rgba(192, 132, 252, 0.4);
}

.purple:hover {
    box-shadow: 0 5px 0 #7e22ce, 0 0 25px rgba(192, 132, 252, 0.6);
}

.red {
    background: linear-gradient(145deg, #ef4444, #dc2626);
    border-color: #f87171;
    box-shadow: 0 3px 0 #991b1b, 0 0 20px rgba(248, 113, 113, 0.4);
}

.red:hover {
    box-shadow: 0 5px 0 #991b1b, 0 0 25px rgba(248, 113, 113, 0.6);
}

.yellow {
    background: linear-gradient(145deg, #eab308, #ca8a04);
    border-color: #facc15;
    box-shadow: 0 3px 0 #854d0e, 0 0 20px rgba(250, 204, 21, 0.4);
}

.yellow:hover {
    box-shadow: 0 5px 0 #854d0e, 0 0 25px rgba(250, 204, 21, 0.6);
}

.cyan {
    background: linear-gradient(145deg, #06b6d4, #0891b2);
    border-color: #22d3ee;
    box-shadow: 0 3px 0 #155e75, 0 0 20px rgba(34, 211, 238, 0.4);
}

.cyan:hover {
    box-shadow: 0 5px 0 #155e75, 0 0 25px rgba(34, 211, 238, 0.6);
}

.orange {
    background: linear-gradient(145deg, #f97316, #ea580c);
    border-color: #fb923c;
    box-shadow: 0 3px 0 #9a3412, 0 0 20px rgba(251, 146, 60, 0.4);
}

.orange:hover {
    box-shadow: 0 5px 0 #9a3412, 0 0 25px rgba(251, 146, 60, 0.6);
}

.pink {
    background: linear-gradient(145deg, #ec4899, #db2777);
    border-color: #f472b6;
    box-shadow: 0 3px 0 #9f1239, 0 0 20px rgba(244, 114, 182, 0.4);
}

.pink:hover {
    box-shadow: 0 5px 0 #9f1239, 0 0 25px rgba(244, 114, 182, 0.6);
}

.emerald {
    background: linear-gradient(145deg, #10b981, #059669);
    border-color: #34d399;
    box-shadow: 0 3px 0 #065f46, 0 0 20px rgba(52, 211, 153, 0.4);
}

.emerald:hover {
    box-shadow: 0 5px 0 #065f46, 0 0 25px rgba(52, 211, 153, 0.6);
}

.indigo {
    background: linear-gradient(145deg, #6366f1, #4f46e5);
    border-color: #818cf8;
    box-shadow: 0 3px 0 #3730a3, 0 0 20px rgba(129, 140, 248, 0.4);
}

.indigo:hover {
    box-shadow: 0 5px 0 #3730a3, 0 0 25px rgba(129, 140, 248, 0.6);
}

.grey {
    background: linear-gradient(145deg, #94a3b8, #64748b);
    border-color: #cbd5e1;
    box-shadow: 0 3px 0 #475569, 0 0 20px rgba(129, 140, 248, 0.4);
}

.grey:hover {
    box-shadow: 0 5px 0 #475569, 0 0 25px rgba(129, 140, 248, 0.6);
}

/* Key Highlights */
.hl-green {
    background: linear-gradient(145deg, #22c55e66, #16a34a66);
    border-color: #4ade80;
    /* box-shadow: 0 3px 0 #166534, 0 0 20px rgba(74, 222, 128, 0.4); */
}

.hl-green:hover {
    box-shadow: 0 5px 0 #166534, 0 0 25px rgba(74, 222, 128, 0.6);
}

.hl-blue {
    background: linear-gradient(145deg, #3b82f666, #2563eb66);
    border-color: #60a5fa;
    /* box-shadow: 0 3px 0 #1e40af, 0 0 20px rgba(96, 165, 250, 0.4); */
}

.hl-blue:hover {
    box-shadow: 0 5px 0 #1e40af, 0 0 25px rgba(96, 165, 250, 0.6);
}

.hl-purple {
    background: linear-gradient(145deg, #a855f766, #9333ea66);
    border-color: #c084fc;
    /* box-shadow: 0 3px 0 #7e22ce, 0 0 20px rgba(192, 132, 252, 0.4); */
}

.hl-purple:hover {
    box-shadow: 0 5px 0 #7e22ce, 0 0 25px rgba(192, 132, 252, 0.6);
}

.hl-red {
    background: linear-gradient(145deg, #ef444466, #dc262666);
    border-color: #f87171;
    /* box-shadow: 0 3px 0 #991b1b, 0 0 20px rgba(248, 113, 113, 0.4); */
}

.hl-red:hover {
    box-shadow: 0 5px 0 #991b1b, 0 0 25px rgba(248, 113, 113, 0.6);
}

.hl-yellow {
    background: linear-gradient(145deg, #eab30866, #ca8a0466);
    border-color: #facc15;
    /* box-shadow: 0 3px 0 #854d0e, 0 0 20px rgba(250, 204, 21, 0.4); */
}

.hl-yellow:hover {
    box-shadow: 0 5px 0 #854d0e, 0 0 25px rgba(250, 204, 21, 0.6);
}

.hl-cyan {
    background: linear-gradient(145deg, #06b6d466, #0891b266);
    border-color: #22d3ee;
    /* box-shadow: 0 3px 0 #155e75, 0 0 20px rgba(34, 211, 238, 0.4); */
}

.hl-cyan:hover {
    box-shadow: 0 5px 0 #155e75, 0 0 25px rgba(34, 211, 238, 0.6);
}

.hl-orange {
    background: linear-gradient(145deg, #f9731666, #ea580c66);
    border-color: #fb923c;
    /* box-shadow: 0 3px 0 #9a3412, 0 0 20px rgba(251, 146, 60, 0.4); */
}

.hl-orange:hover {
    box-shadow: 0 5px 0 #9a3412, 0 0 25px rgba(251, 146, 60, 0.6);
}

.hl-pink {
    background: linear-gradient(145deg, #ec489966, #db277766);
    border-color: #f472b6;
    /* box-shadow: 0 3px 0 #9f1239, 0 0 20px rgba(244, 114, 182, 0.4); */
}

.hl-pink:hover {
    box-shadow: 0 5px 0 #9f1239, 0 0 25px rgba(244, 114, 182, 0.6);
}

.hl-emerald {
    /* background: linear-gradient(145deg, #10b981, #059669); */
    border-color: #34d399;
    /* box-shadow: 0 3px 0 #065f46, 0 0 20px rgba(52, 211, 153, 0.4); */
}

.hl-emerald:hover {
    box-shadow: 0 5px 0 #065f46, 0 0 25px rgba(52, 211, 153, 0.6);
}

.hl-indigo {
    /* background: linear-gradient(145deg, #6366f1, #4f46e5); */
    border-color: #818cf8;
    /* box-shadow: 0 3px 0 #3730a3, 0 0 20px rgba(129, 140, 248, 0.4); */
}

.hl-indigo:hover {
    box-shadow: 0 5px 0 #3730a3, 0 0 25px rgba(129, 140, 248, 0.6);
}

.hl-grey {
    /* background: linear-gradient(145deg, #94a3b8, #64748b); */
    border-color: #cbd5e1;
    /* box-shadow: 0 3px 0 #475569, 0 0 20px rgba(129, 140, 248, 0.4); */
}

.hl-grey:hover {
    box-shadow: 0 5px 0 #475569, 0 0 25px rgba(129, 140, 248, 0.6);
}

/* :root[data-theme='light'] .key.grey {
    background: linear-gradient(145deg, #555555, #4a4a4a);
    border-color: #5a5a5a;
    box-shadow: 0 3px 0 #333333, 0 0 20px rgba(74, 174, 128, 0.2);
}

:root[data-theme='light'] .key.grey:hover {
    box-shadow: 0 5px 0 #333333, 0 0 25px rgba(74, 174, 128, 0.3);
} */
</style>