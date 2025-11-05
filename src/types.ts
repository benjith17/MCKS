export interface KeyboardData extends Object {
    name: string,
    tags: tag[],
    keys: Record<string, string>,
    hotbar: [string?, string?, string?, string?, string?, string?, string?, string?, string?],
}

export class tag {
    id: string;
    name: string;
    color: string;

    constructor (id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}