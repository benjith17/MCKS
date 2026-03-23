export interface KeyboardData extends Object {
    name: string,
    tags: Tag[],
    keys: Record<string, string>,
    hotbar: (string | null)[],
    keyboard: string,
    mouse: string,
    game: string,
}

export class Tag {
    id: string;
    name: string;
    color: string;

    constructor (id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

export interface Game {
    id: string,
    name: string,
    icon: string,
    keys: { id: string, label: string, short?: string }[],
    groups: { id: string, name: string, color: string }[],
    hotbarSize: number,
    hotbarKeysColor: string,
    canEditHotbar: boolean,
    hotbarItems: { id: string, label: string, icon: string }[],
    hotbarSpacers: number[],
    defaultBinds: Record<string, string>,
}