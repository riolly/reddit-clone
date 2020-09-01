import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/post";
import { buildSchema } from "type-graphql";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  
  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  })
  apolloServer.applyMiddleware({ app });
  
  app.listen(2000, () => console.log("App is running at localhost: 2000"));
}

main().catch((err) => console.error(err));