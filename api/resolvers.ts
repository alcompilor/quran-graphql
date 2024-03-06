import { parseSections, parseChapters, parseVerses } from "./parser.js";

const {
    SECTIONS_ENDPOINT,
    CHAPTERS_ENDPOINT,
    VERSES_ENDPOINT,
    TRANSLATIONS_ENDPOINT,
    TRANSLATIONS_RESOURCE_ENDPOINT,
} = process.env;

const fetchData = async (url: string) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (err: any) {
        throw new Error(`Failed to fetch data:\n${err.message}`);
    }
};

export const resolvers: any = {
    Query: {
        sections: async () => {
            const { juzs: sections }: any = await fetchData(SECTIONS_ENDPOINT);
            return parseSections(sections);
        },

        section: async (_, { number }) => {
            const { juzs: sections }: any = await fetchData(SECTIONS_ENDPOINT);
            return parseSections(sections, [number])[0];
        },

        chapters: async () => {
            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters);
        },

        chapter: async (_, { number }) => {
            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters, [number])[0];
        },

        verses: async () => {
            const { verses }: any = await fetchData(VERSES_ENDPOINT);
            return parseVerses(verses);
        },

        verse: async (_, { reference, lang }) => {
            const { verses }: any = await fetchData(VERSES_ENDPOINT);
            const parsed = parseVerses(verses, [reference])[0];
            return { ...parsed, lang };
        },
    },

    Section: {
        chapters: async ({ number }) => {
            const { juz: section }: any = await fetchData(
                `${SECTIONS_ENDPOINT}/${number}`
            );
            const chapters_numbers = Object.keys(section.verse_mapping).map(
                (key) => +key
            );
            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters, [...chapters_numbers]);
        },
    },

    Chapter: {
        verses: async ({ id }) => {
            const { verses }: any = await fetchData(
                `${VERSES_ENDPOINT}?chapter_number=${id}`
            );
            return parseVerses(verses);
        },
    },

    Verse: {
        chapter: async ({ reference }) => {
            const chapter_number = reference.split(":")[0];
            const { chapter }: any = await fetchData(
                `${CHAPTERS_ENDPOINT}/${chapter_number}`
            );
            return parseChapters([chapter])[0];
        },

        translation: async ({ reference, lang }) => {
            if (lang) {
                const { translations }: any = await fetchData(
                    TRANSLATIONS_RESOURCE_ENDPOINT
                );
                const langID = translations.find(
                    (item) => item.language_name === lang
                ).id;
                const { translations: verse }: any = await fetchData(
                    `${TRANSLATIONS_ENDPOINT}/${langID}?verse_key=${reference}`
                );
                return verse[0].text;
            }
        },
    },
};
