# <img src = "https://i.imgur.com/1NWRwOh.png" width = 400px>

This project provides a simple yet versatile and speedy Quran API, built on ApolloServer (GraphQL) and enhanced with integrated Redis caching. It utilizes the public Quran.com API (V4) for data. The goal is to offer an effective solution for effortlessly incorporating Quranic verses (Ayat), chapters (Surahs), and sections (Juzus) into various applications.

## 🌟 Features
- **GraphQL Interface:** Utilizes ApolloServer to offer a GraphQL API, allowing flexible queries for Quranic data.

- **Redis Caching:** Implements Redis as a caching layer, significantly improving API response times and reducing the load on the Quran.com API V4.

- **Dependency on Quran.com API:** Leverages the data provided by Quran.com API V4, ensuring accurate and up-to-date Quranic information.

- **Versatile Queries:** Developers can easily retrieve specific verses, chapters, sections, and translations through GraphQL queries.

- **Seamless Integration:** Incorporate Quranic data into your applications with a straightforward setup and usage through Docker and Docker Compose, ensuring a smooth and trouble-free process.

## 💻 Tech Stack
- Node
- TypeScript
- ApolloServer (GraphQL)
- Redis (in-memory caching)
- Docker & Docker Compose

## ⚠️ Requirements
Before you get started, make sure you have the following prerequisites installed:

- Docker Engine
- Docker Compose

*Note: Ensure that Docker Engine is running before proceeding.*

## 🚀 Get Started
1. Clone the repository:
   ```bash
   git clone https://github.com/alcompilor/quran-graphql
    ```
2. Navigate to the project directory:
   ```bash
   cd quran-graphql
    ```
3. Run containers using Docker Compose:
   ```bash
   docker-compose up -d
    ```
4. Open your browser and go to http://localhost:4000 to access ApolloServer interface.

## Queries Documentation
#### **`chapter(number: Int): Chapter`**

The `chapter(...)` query accepts a `number` as parameter and returns a `Chapter` object.

The `number` parameter corresponds to the sequential order of the chapter (Surah) in the compiled Uthmani Quran. For instance, specifying `number` as 1 would retrieve Al-Fatiha as a chapter.

The returned `Chapter` object consists of 5 fields:

- **`id`:** A field of type `Int` that serves as a unique identifier for the object.
- **`nameArabic`:** A field of type `String` representing the chapter name in Arabic.
- **`nameLatin`:** A field of type `String` representing the chapter name in the Latin Alphabet.
- **`verses`:** A field of type `Verse[]` that returns an array of `Verse` objects. This field retrieves all verses associated with the chapter.
- **`versesCount`:** A field of type `Int` that returns the total number of verses in the chapter.

#### **`section(number: Int): Section`**
The `section(...)` query accepts a `number` as parameter and returns a `Section` object.

The `number` parameter corresponds to the sequential order of the section (Juzu) in the compiled Uthmani Quran. For example, specifying `number` as 30, will fetch the final section of the Quran. In this section, the first chapter is An-Naba and the last chapter is An-Nas.

The returned `Section` object consists of 6 fields:

- **`id`:** A field of type `Int` that serves as a unique identifier for the object.
- **`number`:** A field of type `Int` that corresponds to the sequential order of the section (Juzu).
- **`startVerse`:** A field of type `Int`. It represents the sequential position of the first verse within the section.
- **`endVerse`:** A field of type `Int`. It represents the sequential position of the last verse within the section.
- **`chapters`:** A field of type `Chapter[]` that returns an array of `Chapter` objects. This field retrieves all chapters associated with the section.
- **`versesCount`:** A field of type `Int` that returns the total number of verses in the section.

#### **`verse(reference: String, lang?: String): Verse`**
The `verse(...)` query requires a `reference` parameter and optionally accepts a `lang` parameter, returning a `Verse` object.

The `reference` parameter corresponds to the specific verse (Ayah) in the Uthmani Quran. For instance, if you set `reference` to `114:6`, it will retrieve the 6th verse in the 114th chapter of the Quran, which is the final verse in the Quran.

The `lang` parameter, while optional, allows you to fetch a translation for the requested verse. If you set `lang` to `swedish`, for example, it will return the Swedish translation of the verse along with the `Verse` object.

The returned `Verse` object consists of 5 fields:

- **`id`:** A field of type `Int` that serves as a unique identifier for the object.
- **`reference`:** A field of type `String` that corresponds to the reference of the verse (Ayah) in the Quran.
- **`content`:** A field of type `String`. It contains the requested verse in Arabic (Uthmani Script).
- **`chapter`:** A field of type `Chapter` that returns a `Chapter` object. This field retrieves the chapter associated with the verse.
- **`translation`:** A field of type `String` that returns the translation of the requested verse in case `lang` parameter was specified, otherwise it will return `null`.

## Additional Information
For detailed information on all executable queries using this GraphQL API, refer to the documentation available on the ApolloServer Interface.

## ⚖️ License
The project is licensed under the [MIT License](LICENSE). Feel free to reach out if you have any questions or suggestions.
