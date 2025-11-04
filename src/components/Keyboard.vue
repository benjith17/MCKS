<script setup lang="ts">
import { ref } from 'vue';
import { keyboardData, selectedKey } from '../store';

const keys = [
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
        { id: 'shiftright', text: 'SHIFT', size: 4 }
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
]

/* return a color string (or empty) based on whether a binding exists */
function getColor(k: string): string {
    const key = keyboardData.keys[k];
    if (key) {
        const group = key.split('_')[0];
        if (group == 'move') return 'blue';
        if (group == 'inv') return 'purple';
        if (group == 'hb') return 'green';
    }

    return '';
}

function getAction(k: string): string {
    const key = keyboardData.keys[k];
    if (key) {
        const group = key.split('_')[0];

        if (group == 'hb') {
            const idx = Number(key.split('_')[1]) - 1;
            return keyboardData.hotbar[idx] ?? '';
        }

        if (key == 'inv_open') return 'inventory';
        if (key == 'move_jump') return 'jump';
        if (key == 'move_sprint') return 'sprint';
        if (key == 'move_sneak') return "sneak";

        if (key == 'move_forward') return "forward"
        if (key == 'move_left') return "left"
        if (key == 'move_backward') return "back"
        if (key == 'move_right') return "right"
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

</script>

<template>
    <!-- <pre style="text-align: left;">{{ data }}</pre> -->
    <!-- <div class="keyboard">

        <div class="row">

            <div class="key" :class="[getColor('backtick')]">
                `
                <div class="key-action">{{ getAction('backtick') }}</div>
            </div>

            <div class="key" :class="[getColor('_1')]">
                1
                <div class="key-action">{{ getAction('_1') }}</div>
            </div>

            <div class="key">
                2
            </div>

            <div class="key">
                3
            </div>

            <div class="key">
                4
            </div>

            <div class="key">
                5
            </div>

            <div class="key">
                6
            </div>

            <div class="key">
                7
            </div>

            <div class="key">
                8
            </div>

            <div class="key">
                9
            </div>

            <div class="key">
                0
            </div>

            <div class="key">
                -
            </div>

            <div class="key">
                =
            </div>

            <div class="key key-m">
                BKSP
            </div>

        </div>

        <div class="row">

            <div class="key key-m purple">
                TAB
                <div class="key-action">Inventory</div>
            </div>

            <div class="key green">
                <div class="key-number">4</div>
                <svg class="key-icon" fill="#ffffff" height="16" width="16" version="1.1" id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 290.226 290.226" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)"
                    stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                        stroke-width="1.160904"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <path
                                d="M63.951,243.575c-1.945-3.578-4.401-6.907-7.363-9.869c-3.106-3.102-6.626-5.633-10.4-7.63 c-4.51-2.387-0.945-7.5-0.945-7.5c4.616-7.023,8.825-14.079,12.305-20.226l-23.363-23.344H11.504c-4.362,0-7.898-3.539-7.898-7.902 c0-4.361,3.536-7.9,7.898-7.9h25.947c2.1,0,4.107,0.832,5.588,2.312l85.379,85.291c1.483,1.483,2.315,3.495,2.315,5.589v26.073 c0,4.365-3.537,7.897-7.9,7.897c-4.367,0-7.904-3.531-7.904-7.897v-22.798l-23.27-23.24c-6.281,3.707-13.582,8.252-20.816,13.25 C70.842,245.679,66.698,248.629,63.951,243.575z">
                            </path>
                            <path
                                d="M26.61,237.102c-7.106,0-13.784,2.764-18.812,7.784c-5.019,5.015-7.782,11.686-7.782,18.778 c0,7.097,2.764,13.762,7.782,18.776c5.027,5.016,11.706,7.783,18.812,7.785c7.102,0,13.781-2.77,18.804-7.785 c5.023-5.015,7.79-11.682,7.79-18.776c0-7.093-2.768-13.764-7.79-18.778C40.392,239.866,33.712,237.102,26.61,237.102z">
                            </path>
                            <path
                                d="M100.985,182.318c-3.502,3.499-9.232,3.499-12.734,0.001l-8.81-8.801c-3.502-3.498-3.502-9.223,0-12.721L229.832,10.564 c3.502-3.498,10.401-6.727,15.33-7.175l36.862-3.352c4.93-0.448,8.596,3.218,8.148,8.148l-3.346,36.791 c-0.448,4.93-3.68,11.825-7.182,15.324l-150.4,150.251c-3.502,3.498-9.232,3.498-12.734,0l-8.822-8.813 c-3.502-3.498-3.502-9.223,0-12.722L233.608,63.213c1.854-1.848,1.856-4.852,0.003-6.702c-1.848-1.853-4.853-1.853-6.709-0.002 L100.985,182.318z">
                            </path>
                        </g>
                    </g>
                </svg>
                Q
            </div>

            <div class="key blue">
                <i class="key-icon bi bi-arrow-up"></i>
                W
            </div>

            <div class="key" :class="[getColor('e')]">
                E
                <div class="key-action">{{ getAction('e') }}</div>
            </div>

            <div class="key">
                R
            </div>

            <div class="key">
                T
            </div>

            <div class="key">
                Y
            </div>

            <div class="key">
                U
            </div>

            <div class="key">
                I
            </div>

            <div class="key">
                O
            </div>

            <div class="key">
                P
            </div>

            <div class="key">
                [ {
            </div>

            <div class="key">
                ] }
            </div>

            <div class="key">
                # ~
            </div>

        </div>

        <div class="row">

            <div class="key key-l">
                CAPS
            </div>

            <div class="key blue">
                A
            </div>

            <div class="key blue">
                S
            </div>

            <div class="key blue">
                D
            </div>

            <div class="key">
                F
            </div>

            <div class="key">
                G
            </div>

            <div class="key">
                H
            </div>

            <div class="key">
                J
            </div>

            <div class="key">
                K
            </div>

            <div class="key">
                L
            </div>

            <div class="key">
                ; :
            </div>

            <div class="key">
                ' @
            </div>

            <div class="key key-m">
                RETURN
            </div>

        </div>

        <div class="row">

            <div class="key key-m">
                SHIFT
            </div>

            <div class="key">
                Z
            </div>

            <div class="key">
                X
            </div>

            <div class="key">
                C
            </div>

            <div class="key">
                V
            </div>

            <div class="key">
                B
            </div>

            <div class="key">
                N
            </div>

            <div class="key">
                M
            </div>

            <div class="key">
                ,
            </div>

            <div class="key">
                .
            </div>

            <div class="key">
                /
            </div>

            <div class="key key-xl">
                SHIFT
            </div>

        </div>

    </div> -->

    <div class="keyboard">

        <div class="row" v-for="row in keys">

            <div class="key" v-for="key in row" @click="selectedKey.selectedKey = selectedKey.selectedKey == key.id ? '' : key.id " :key="key.id" :class="getColor(key.id),
                key.size == 2 ? 'key-m' : '',
                key.size == 3 ? 'key-l' : '',
                key.size == 4 ? 'key-xl' : '',
                key.size == 5 ? 'key-space' : '',
                selectedKey.selectedKey == key.id ? 'selected' : ''
                ">

                <!-- <div class="key-number">{{ getNumber(key.id) }}</div> -->
                {{ key.text }}
                <div class="key-action">{{ getAction(key.id) }}</div>
            </div>

        </div>



    </div>

</template>

<style scoped>
.keyboard {
    background: #1a1a1a;
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

.key {
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    border: 2px solid #3a3a3a;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    position: relative;
    box-shadow: 0 3px 0 #0a0a0a;
    transition: all 0.2s;
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
    width: 329px;
}

.key:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 #0a0a0a;
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
    color: #eee;
    margin-top: 2px;
    text-transform: uppercase;
}

.key.selected {
    border-color: #eee !important;
}

/* Colored Keys */
.key.green {
    background: linear-gradient(145deg, #22c55e, #16a34a);
    border-color: #4ade80;
    box-shadow: 0 3px 0 #166534, 0 0 20px rgba(74, 222, 128, 0.4);
}

.key.green:hover {
    box-shadow: 0 5px 0 #166534, 0 0 25px rgba(74, 222, 128, 0.6);
}

.key.blue {
    background: linear-gradient(145deg, #3b82f6, #2563eb);
    border-color: #60a5fa;
    box-shadow: 0 3px 0 #1e40af, 0 0 20px rgba(96, 165, 250, 0.4);
}

.key.blue:hover {
    box-shadow: 0 5px 0 #1e40af, 0 0 25px rgba(96, 165, 250, 0.6);
}

.key.purple {
    background: linear-gradient(145deg, #a855f7, #9333ea);
    border-color: #c084fc;
    box-shadow: 0 3px 0 #7e22ce, 0 0 20px rgba(192, 132, 252, 0.4);
}

.key.purple:hover {
    box-shadow: 0 5px 0 #7e22ce, 0 0 25px rgba(192, 132, 252, 0.6);
}

.key.red {
    background: linear-gradient(145deg, #ef4444, #dc2626);
    border-color: #f87171;
    box-shadow: 0 3px 0 #991b1b, 0 0 20px rgba(248, 113, 113, 0.4);
}

.key.red:hover {
    box-shadow: 0 5px 0 #991b1b, 0 0 25px rgba(248, 113, 113, 0.6);
}

.key.yellow {
    background: linear-gradient(145deg, #eab308, #ca8a04);
    border-color: #facc15;
    box-shadow: 0 3px 0 #854d0e, 0 0 20px rgba(250, 204, 21, 0.4);
}

.key.yellow:hover {
    box-shadow: 0 5px 0 #854d0e, 0 0 25px rgba(250, 204, 21, 0.6);
}

.key.cyan {
    background: linear-gradient(145deg, #06b6d4, #0891b2);
    border-color: #22d3ee;
    box-shadow: 0 3px 0 #155e75, 0 0 20px rgba(34, 211, 238, 0.4);
}

.key.cyan:hover {
    box-shadow: 0 5px 0 #155e75, 0 0 25px rgba(34, 211, 238, 0.6);
}

.key.orange {
    background: linear-gradient(145deg, #f97316, #ea580c);
    border-color: #fb923c;
    box-shadow: 0 3px 0 #9a3412, 0 0 20px rgba(251, 146, 60, 0.4);
}

.key.orange:hover {
    box-shadow: 0 5px 0 #9a3412, 0 0 25px rgba(251, 146, 60, 0.6);
}

.key.pink {
    background: linear-gradient(145deg, #ec4899, #db2777);
    border-color: #f472b6;
    box-shadow: 0 3px 0 #9f1239, 0 0 20px rgba(244, 114, 182, 0.4);
}

.key.pink:hover {
    box-shadow: 0 5px 0 #9f1239, 0 0 25px rgba(244, 114, 182, 0.6);
}

.key.emerald {
    background: linear-gradient(145deg, #10b981, #059669);
    border-color: #34d399;
    box-shadow: 0 3px 0 #065f46, 0 0 20px rgba(52, 211, 153, 0.4);
}

.key.emerald:hover {
    box-shadow: 0 5px 0 #065f46, 0 0 25px rgba(52, 211, 153, 0.6);
}

.key.indigo {
    background: linear-gradient(145deg, #6366f1, #4f46e5);
    border-color: #818cf8;
    box-shadow: 0 3px 0 #3730a3, 0 0 20px rgba(129, 140, 248, 0.4);
}

.key.indigo:hover {
    box-shadow: 0 5px 0 #3730a3, 0 0 25px rgba(129, 140, 248, 0.6);
}
</style>