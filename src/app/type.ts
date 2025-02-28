export interface action {
    etiquette: string;
    durationInSecond: number;
}

export interface student {
    name: string,
    sansAction: action[],
    avecAction: action[]
}

export const COLOR: { [key: string]: string } = {
    'pause': '#cccccc',
    'frappe': '#4a86e8',
    'correction immédiate': '#ff9900',
    'correction élément précédent': '#f3f346',
    'deepl': '#cc4125',
    'Cop-cla-trad': '#000000',
    'Cop-trad-txt': '#434343',
    'Cop-txt-trad': '#666666',
    'clavier': '#0b23a5',
    'autre': '#ffffff',
};