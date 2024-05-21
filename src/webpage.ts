import { html } from "hono/html";
import { css, Style } from "hono/css";

// const pollContainer = css`
//     font-family: Arial, sans-serif;
//     text-align: center;
//     margin-top: 50px;
//   `
//   const results = css`
//     margin-top: 20px;
//     font-size: 20px;
//   `
//   const btn = css`
//   padding: 10px 20px;
//   margin: 10px;
//   font-size: 18px;
//   cursor: pointer;
//   `

export const Page = html`
  <!doctype html>
  <html>
    <head>
    <title>Cloudflare x Hono Poll</title>
    <style>
    body {
        font-family: "Comic Sans MS", "Comic Sans", cursive;
    }
    #pollcontainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    #results {
        display: flex;
        gap: 10px; /* Space between buttons */
    }
    #metaglasses {
        flex: 1;
        line-height: 1.5; /* Line height for better readability */
        margin: 10px 0; /* Margin for spacing */
        font-size: 64px; /* Large font size */
        font-weight: bold; /* Bold text */
        color: #FF0000; /* Bright red color */
        text-transform: uppercase; /* Uppercase letters for emphasis */
        background-color: #FFFF00; /* Yellow background for high contrast */
        padding: 10px; /* Padding around the text */
        margin: 10px 0; /* Margin for spacing */
        border: 2px solid #000000; /* Black border for definition */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
        border-radius: 25px; /* Rounded corners */
    }
    #geminiglasses {
        flex: 1;
        line-height: 1.5; /* Line height for better readability */
        margin: 10px 0; /* Margin for spacing */
        font-size: 64px; /* Large font size */
        font-weight: bold; /* Bold text */
        color: #FF0000; /* Bright red color */
        text-transform: uppercase; /* Uppercase letters for emphasis */
        background-color: #FFFF00; /* Yellow background for high contrast */
        padding: 10px; /* Padding around the text */
        margin: 10px 0; /* Margin for spacing */
        border: 2px solid #000000; /* Black border for definition */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
        border-radius: 25px; /* Rounded corners */
    }
    #reset {
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #FFC0CB; /* Pink color */
        color: white;
    }
    </style>
    </head>
    <body>
    <h1>Which company holds all your data?</h1>
    <div id = "pollcontainer">
      <div id ="results">
        <button id ="metaglasses">Meta Glasses: <span id="value1"></span></button>
        <button id="geminiglasses">Gemini Glasses: <span id="value2"></span></button>
      </div>
      </div>
      <button id="reset">Reset</button>
      <script>
        const value1 = document.getElementById("value1");
        const value2 = document.getElementById("value2");
        const metaglasses = document.getElementById("metaglasses");
        const geminiglasses = document.getElementById("geminiglasses");
        const updateValue1 = async () => {
          const res = await fetch("/option1");
          value1.innerText = await res.text();
        };
        const updateValue2 = async () => {
            const res = await fetch("/option2");
            value2.innerText = await res.text();
          };
        metaglasses.addEventListener("click", async () => {
          await fetch("/option1/metaglasses", { method: "POST" });
          await updateValue1();
        });
        geminiglasses.addEventListener("click", async () => {
          await fetch("/option2/geminiglasses", { method: "POST" });
          await updateValue2();
        });
        reset.addEventListener("click", async () => {
          await fetch("/option1", { method: "DELETE" });
          await fetch("/option2", { method: "DELETE" });
          await updateValue1();
          updateValue2();
        });
        updateValue1();
        updateValue2();
      </script>
      </div>
      <div class="footer">
        <p>Built w/ 🧡 on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>, <a href="https://developers.cloudflare.com/durable-objects/" target="_blank">Cloudflare Durable Objects</a>, <a href="https://ai.cloudflare.com" target="_blank">Workers AI</a>, <a href="https://hono.dev/" target="_blank">Hono</p>
      </div>
    </body>
  </html>
`;