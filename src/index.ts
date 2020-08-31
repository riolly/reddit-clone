import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  
  await orm.getMigrator().up();
  // const postFirst = orm.em.create(Post, { title: "This is my first post" });
  // orm.em.persistAndFlush(postFirst);

  const posts = await orm.em.find(Post, {});
  console.log(posts)
}

main().catch((err) => console.error(err));