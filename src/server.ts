import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import Keyv from "keyv";
import { typeDefs } from "./api/typeDefs.js";
import { resolvers } from "./api/resolvers.js";

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new KeyvAdapter(new Keyv(process.env.REDIS_INSTANCE)),
    plugins: [
        responseCachePlugin(),
        ApolloServerPluginCacheControl({
            defaultMaxAge: 60 * 60 * 24,
        }),
    ],
});

const { url }: { url: string } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`GraphQL server running at: ${url}`);
