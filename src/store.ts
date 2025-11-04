import { reactive } from "vue";
import type { KeyboardData } from "./types";

export const keyboardData = reactive<KeyboardData>({
    keys: {},
    hotbar: []
})

export const selectedKey = reactive({
    selectedKey: ''
})