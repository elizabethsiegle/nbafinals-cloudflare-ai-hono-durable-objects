import { html } from "hono/html";

export const Page = html`
  <!doctype html>
  <html>
    <head>
    <title>NBA Finals Cloudflare Workers x Hono Poll</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==" crossorigin=""></script>
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
    #mavs {
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
    #celtics {
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
    .footer {
      margin-top: 60px;
      text-align: center;
      font-size: 16px;
      color: #555;
    }
  
    .footer p {
      margin: 10px 0;
    }
  
    .footer a {
      color: #0070f3;
      text-decoration: none;
    }
  
    .footer a:hover {
      text-decoration: underline;
    }
    #prediction {
      padding: 20px;
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 60%; /* Make the div less wide, adjust the percentage as needed */
      position: absolute; /* Position the div absolutely */
      top: 70%; /* Move it closer to the lower half of the page */
      left: 50%;
      transform: translate(-50%, -50%); /* Center it horizontally */
  }
    </style>
    </head>
    <body>
    <h1>Who are you rooting for in the NBA Finals?</h1>
    <div id = "pollcontainer">
      <div id ="results">
        <button id ="mavs">Mavs: <span id="value1"></span></button>
        <button id="celtics">Celtics: <span id="value2"></span></button>
      </div>
      </div>
      <div id = "prediction"></div>
      <button id="reset">Reset</button>
      <script>
        const value1 = document.getElementById("value1");
        const value2 = document.getElementById("value2");
        const mavs = document.getElementById("mavs");
        const celtics = document.getElementById("celtics");
        const prediction = document.getElementById("prediction");
        const generate = async () => {
          const res = await fetch("/generate");
          prediction.innerText = await res.text();
        };
        const updateValue1 = async () => {
          const res = await fetch("/option1");
          value1.innerText = await res.text();
        };
        const updateValue2 = async () => {
            const res = await fetch("/option2");
            value2.innerText = await res.text();
          };
        mavs.addEventListener("click", async () => {
          await fetch("/option1/mavs", { method: "POST" });
          await updateValue1();
          generate();
        });
        celtics.addEventListener("click", async () => {
          await fetch("/option2/celtics", { method: "POST" });
          await updateValue2();
          generate();
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
      <div class="footer">
            <p>Built w/ 🧡 on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>, <a href="https://developers.cloudflare.com/durable-objects/" target="_blank">Cloudflare Durable Objects</a>, <a href="https://ai.cloudflare.com" target="_blank">Workers AI</a>, <a href="https://hono.dev/" target="_blank">Hono</a> in SF🌁 ➡️ <a href="https://github.com/elizabethsiegle/nbafinals-cloudflare-ai-hono-durable-objects" target="_blank">code</a></p>
            <p>Learn more about <a href="https://developers.cloudflare.com/workers-ai/privacy/" target="_blank">Cloudflare AI data and privacy</a></p>
      </div>
    </body>
  </html>
`;