export interface Set {
    code: string;
    name: string;
    type: string;
    border: string;
    mkm_id?: number;
    releaseDate: string;
    magicCardsInfoCode: string;
    gathererCode: string;
    block: string;
}

export interface SetsResponse {
    sets: Set[]
}