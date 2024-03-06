export const typeDefs: any = `#graphql
    type Section {
        id: Int!
        number: Int!
        startVerse: Int!
        endVerse: Int!
        versesCount: Int!
        chapters: [Chapter!]!
    }

    type Chapter {
        id: Int!
        nameLatin: String!
        nameArabic: String!
        versesCount: Int!
        verses: [Verse!]!
    }

    type Verse {
        id: Int!
        content: String!
        reference: String!
        chapter: Chapter!
        translation: String
    }

    type Query {
        sections: [Section]
        section(number: Int): Section
        chapters: [Chapter]
        chapter(number: Int): Chapter
        verses: [Verse]
        verse(reference: String, lang: String): Verse
    }
`;
