import { Chapter } from "./types/Chapter.js";
import { Section } from "./types/Section.js";
import { Verse } from "./types/Verse.js";

const parser = <T>(filterKey: string, mapCallback: (item: any) => T) => {
    return (data: any[], filter?: any[]): T[] => {
        const filtered = filter
            ? data.filter((item: any) => filter.includes(item[filterKey]))
            : data;
        const mapped = filtered.map(mapCallback);
        return mapped;
    };
};

const parseSections = parser<Section>(
    "juz_number",
    (item: any): Section => ({
        id: item.id,
        number: item.juz_number,
        startVerse: item.first_verse_id,
        endVerse: item.last_verse_id,
        versesCount: item.verses_count,
    })
);

const parseVerses = parser<Verse>(
    "verse_key",
    (item: any): Verse => ({
        id: item.id,
        content: item.text_uthmani,
        reference: item.verse_key,
    })
);

const parseChapters = parser<Chapter>(
    "id",
    (item: any): Chapter => ({
        id: item.id,
        nameLatin: item.name_simple,
        nameArabic: item.name_arabic,
        versesCount: item.verses_count,
    })
);

export { parseSections, parseVerses, parseChapters };
