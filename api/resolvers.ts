import { parseSections, parseChapters, parseVerses } from "./parser.js";
import { Verse } from "./types/Verse.js";

const {
    SECTIONS_ENDPOINT,
    CHAPTERS_ENDPOINT,
    VERSES_ENDPOINT,
    TRANSLATIONS_ENDPOINT,
    TRANSLATIONS_RESOURCE_ENDPOINT,
} = process.env as {
    SECTIONS_ENDPOINT: string;
    CHAPTERS_ENDPOINT: string;
    VERSES_ENDPOINT: string;
    TRANSLATIONS_ENDPOINT: string;
    TRANSLATIONS_RESOURCE_ENDPOINT: string;
};

const fetchData = async (endpoint: string) => {
    try {
        const response: Response = await fetch(endpoint);
        return response.json();
    } catch (err: any) {
        throw new Error(`Failed to fetch data:\n ${err.message}`);
    }
};

export const resolvers = {
    Query: {
        sections: async () => {
            const { juzs: sections }: any = await fetchData(SECTIONS_ENDPOINT);
            return parseSections(sections);
        },

        section: async (_: any, { number }: { number: number }) => {
            const { juzs: sections }: any = await fetchData(SECTIONS_ENDPOINT);
            return parseSections(sections, [number])[0];
        },

        chapters: async () => {
            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters);
        },

        chapter: async (_: any, { number }: { number: number }) => {
            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters, [number])[0];
        },

        verses: async () => {
            const { verses }: any = await fetchData(VERSES_ENDPOINT);
            return parseVerses(verses);
        },

        verse: async (
            _: any,
            { reference, lang }: { reference: string; lang: string }
        ) => {
            const { verses }: any = await fetchData(VERSES_ENDPOINT);
            const parsed: Verse = parseVerses(verses, [reference])[0];
            return { ...parsed, lang };
        },
    },

    Section: {
        chapters: async ({ number }: { number: number }) => {
            const { juz: section }: any = await fetchData(
                `${SECTIONS_ENDPOINT}/${number}`
            );

            const chapters_numbers: number[] = Object.keys(
                section.verse_mapping
            ).map((key: string) => +key);

            const { chapters }: any = await fetchData(CHAPTERS_ENDPOINT);
            return parseChapters(chapters, [...chapters_numbers]);
        },
    },

    Chapter: {
        verses: async ({ id }: { id: number }) => {
            const { verses }: any = await fetchData(
                `${VERSES_ENDPOINT}?chapter_number=${id}`
            );
            return parseVerses(verses);
        },
    },

    Verse: {
        chapter: async ({ reference }: { reference: string }) => {
            const chapter_number: string = reference.split(":")[0];

            const { chapter }: any = await fetchData(
                `${CHAPTERS_ENDPOINT}/${chapter_number}`
            );
            return parseChapters([chapter])[0];
        },

        translation: async ({
            reference,
            lang,
        }: {
            reference: string;
            lang: string;
        }) => {
            if (lang) {
                const { translations }: any = await fetchData(
                    TRANSLATIONS_RESOURCE_ENDPOINT
                );

                const langID = translations.find(
                    (item: any) => item.language_name === lang
                ).id;

                const { translations: verse }: any = await fetchData(
                    `${TRANSLATIONS_ENDPOINT}/${langID}?verse_key=${reference}`
                );

                return verse[0].text;
            }
        },
    },
};
