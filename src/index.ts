import { Hono } from "hono";

import { Page } from "./webpage";

const app = new Hono<{
  Bindings: {
    OPTION1: DurableObjectNamespace;
    OPTION2: DurableObjectNamespace;
  };
}>();

app.get("/", (c) => {
  return c.html(Page);
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
