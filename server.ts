import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const decoder = new TextDecoder("utf-8");
const body = decoder.decode(await Deno.readFile("./index.html"));
const app = new Application();
const router = new Router();

router.get("/", ({ response }) => {
  response.body = body;
});

router.post("/im", async ({ response, request }) => {
  const { value } = await request.body();
  response.body = JSON.stringify({
    msg: value.msg.replace(/(吗|我|？|\?)/gi, (str: string) => {
      if (/(吗|么)/.test(str)) {
        return "";
      } else if (/(？|\?)/.test(str)) {
        return "！";
      } else if (str === "我") {
        return "你";
      }
    }),
  });
});

app.use(router.routes());
await app.listen(`localhost:9000`);
