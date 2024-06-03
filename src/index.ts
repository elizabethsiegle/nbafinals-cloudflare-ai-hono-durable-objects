import { Hono } from "hono";

import { Page } from "./webpage";
type Bindings = {
  AI: any;
  OPTION1: DurableObjectNamespace;
  OPTION2: DurableObjectNamespace;
};

const app = new Hono<{
  Bindings: Bindings
}>();

app.get("/", (c) => {
  return c.html(Page);
});

app.all("/generate", async (c) => {
  const answer = await c.env.AI.run(
    '@cf/meta/llama-3-8b-instruct',
    {
      messages: [
        { role: 'user', content: `You are a professional basketball commentator and analyst. The Dallas Mavericks are playing the Boston Celtics. Who do you think will win the 2024 NBA Finals?` }
      ]
    }
  )
  console.log(`answer ${JSON.stringify(answer)}`);
  const obj = JSON.parse(JSON.stringify(answer));
  return c.json(obj);
});

app.all("/option1/*", (c) => {
  if (c.req.raw.cf) {
    const cf = c.req.raw.cf;
    console.log(
      `🗺️  ${cf.latitude ?? 'Unknown latitude'}, ${cf.longitude ?? 'unknown longitude'}`
    );
  }
  const id = c.env.OPTION1.idFromName("Option1");
  const obj = c.env.OPTION1.get(id);
  return obj.fetch(c.req.raw);
});
app.all("/option2/*", (c) => {
  var cflat:any;
  var cflong:any;
  if (c.req.raw.cf) {
    const cf = c.req.raw.cf;
    cflat = cf.latitude;
    cflong = cf.longitude;
    console.log(
      `🗺️  ${cflat ?? 'Unknown latitude'}, ${cflong ?? 'unknown longitude'}`
    );
  }
  const id = c.env.OPTION2.idFromName("Option2");
  const obj = c.env.OPTION2.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./options";
