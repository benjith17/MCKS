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

export const allTags = reactive<tag[]>([
    // { id: 'type_crystal', name: "Crystal PVP", color: "#c889e6" },
    // { id: 'type_', name: "Crystal PVP", color: "#c889e6" },
    { id: 'owner_me', name: "My binds", color: '#18613eff' },
    { id: 'owner_yt', name: "Youtuber's Binds", color: '#621317ff' },
]);