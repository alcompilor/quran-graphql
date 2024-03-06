import { Verse } from "./Verse.js";

export type Chapter = {
    id: number;
    nameLatin: string;
    nameArabic: string;
    versesCount: number;
    verses?: Verse[];
};
