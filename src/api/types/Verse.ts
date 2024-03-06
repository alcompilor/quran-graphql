import { Chapter } from "./Chapter.js";

export type Verse = {
    id: number;
    content: string;
    reference: string;
    chapter?: Chapter;
    translation?: string;
};
