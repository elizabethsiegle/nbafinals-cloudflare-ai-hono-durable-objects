import { Hono } from "hono";
import { html } from "hono/html";
import { css, Style } from "hono/css";

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
  const id = c.env.OPTION1.idFromName("Option1");
  const obj = c.env.OPTION1.get(id);
  return obj.fetch(c.req.raw);
});
app.all("/option2/*", (c) => {
  const id = c.env.OPTION2.idFromName("Option2");
  const obj = c.env.OPTION2.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./options";
