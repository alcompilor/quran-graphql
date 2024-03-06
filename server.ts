import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./api/typeDefs.js";
import { resolvers } from "./api/resolvers.js";
import dotenv from "dotenv";
dotenv.config();

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url }: { url: string } = await startStandaloneServer(server, {
    listen: { port: +process.env.PORT || 4000 },
});

console.log(`GraphQL server running at: ${url}`);
