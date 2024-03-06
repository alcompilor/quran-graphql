const parser = (filterKey, mapCallback) => {
    return (data, filter?) => {
        const filtered = filter
            ? data.filter((item) => filter.includes(item[filterKey]))
            : data;
        const mapped = filtered.map(mapCallback);
        return mapped;
    };
};

const parseSections = parser("juz_number", (item) => ({
    id: item.id,
    number: item.juz_number,
    startVerse: item.first_verse_id,
    endVerse: item.last_verse_id,
    versesCount: item.verses_count,
}));

const parseVerses = parser("verse_key", (item) => ({
    id: item.id,
    content: item.text_uthmani,
    reference: item.verse_key,
}));

const parseChapters = parser("id", (item) => ({
    id: item.id,
    nameLatin: item.name_simple,
    nameArabic: item.name_arabic,
    versesCount: item.verses_count,
}));

export { parseSections, parseVerses, parseChapters };
