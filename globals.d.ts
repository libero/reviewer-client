declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module 'prosemirror-example-setup';
declare module 'prosemirror-history';

declare module 'ordermap' {
    type OrderedMap<T> = {
        get(key: string): T | undefined;
        update(key: string, value: T, newKey?: string): OrderedMap<T>;
        remove(key: string): OrderedMap<T>;
        addToStart(key: string, value: T): OrderedMap<T>;
        addToEnd(key: string, value: T): OrderedMap<T>;
        addBefore(place: string, key: string, value: T): OrderedMap<T>;
        forEach(f: (key: string, value: T) => void): void;
        prepend(map: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
        append(map: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
        subtract(map: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
        readonly size: number;
        from<T>(value?: { [key: string]: T } | OrderedMap<T>): OrderedMap<T>;
    };
}
