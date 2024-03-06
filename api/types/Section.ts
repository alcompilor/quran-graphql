import { Chapter } from "./Chapter.js";

export type Section = {
    id: number;
    number: number;
    startVerse: number;
    endVerse: number;
    versesCount: number;
    chapters?: Chapter[];
};
