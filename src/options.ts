import { generateHonoObject } from "hono-do";
import { defineStorage } from "hono-do/storage";

export const Option1 = generateHonoObject(
  "/option1",
  async (app, { storage }) => {
    const [getValue, setValue, delValue] = await defineStorage(
      storage,
      "value",
      0,
    );

    app.post("/mavs", async (c) => {
      setValue((value) => value + 1);
      return c.text((await getValue()).toString());
    });

    app.get("/", async (c) => {
      return c.text((await getValue()).toString());
    });

    app.delete("/", async (c) => {
      await delValue();
      return c.text("deleted");
    });
  },
);
export const Option2 = generateHonoObject(
    "/option2",
    async (app, { storage }) => {
      const [getValue, setValue, delValue] = await defineStorage(
        storage,
        "value",
        0,
      );
  
      app.post("/celtics", async (c) => {
        setValue((value) => value + 1);
        return c.text((await getValue()).toString());
      });
  
      app.get("/", async (c) => {
        return c.text((await getValue()).toString());
      });
  
      app.delete("/", async (c) => {
        await delValue();
        return c.text("deleted");
      });
    },
  );