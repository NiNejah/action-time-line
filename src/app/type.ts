export interface action {
    etiquette: string;
    durationInSecond: number;
}

export interface student {
    name: string,
    sansAction: action[],
    avecAction: action[]
}