import { html } from "hono/html";

export const Page = html`
  <!doctype html>
  <html>
    <head>
    <title>NBA Finals Cloudflare Workers x Hono Poll</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==" crossorigin=""></script>
    <style>
    h1 {
      margin-top: 20px; /* Add top margin to move h1 lower on the page */
    }
    #pollcontainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75vh;
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
        padding: 60px; /* Padding around the text */
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
        padding: 60px; /* Padding around the text */
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
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 32px;
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
    
    /* Adjust spacing for the rest of the content */
    body {
      text-align: center; /* Center the h1 and other content */
      font-family: "Comic Sans MS", "Comic Sans";
      // margin-bottom: 100px; /* Adjust margin-bottom to accommodate the footer height */
    }

    #prediction {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 65%; /* Make the div less wide, adjust the percentage as needed */
      position: absolute; /* Position the div absolutely */
      top: 30%; /* Move it higher on the page */
      left: 50%;
      transform: translate(-50%, -50%); /* Center it horizontally */
      text-align: center; /* Center content inside the div */
      font-size: 16px;
  }
  // #mavs-logo,
  // #celtics-logo {
  //   width: 250px; /* Increase the width */
  //   height: 250px; /* Increase the height */
  //   margin-right: 20px; /* Add some spacing between the logo and the buttons */
  // }
  
  .spinner {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 40%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 0px auto; /* Center the spinner below the prediction text */
    margin-top: 4%;
    display: none; /* Hide the spinner by default */
  }
  
  .spinner span {
    /* Style the text */
    margin-top: 50px;
    font-size: 20px; /* Adjust the font size */
    color: #555; /* Choose a suitable color */
  }
  
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
    </style>
    </head>
    <body>
    <div class="footer">
            <p>Built w/ 🧡 on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>, <a href="https://developers.cloudflare.com/durable-objects/" target="_blank">Cloudflare Durable Objects</a>, <a href="https://ai.cloudflare.com" target="_blank">Workers AI</a>, <a href="https://hono.dev/" target="_blank">Hono</a> in SF🌁</p>
            <p>Learn more about <a href="https://developers.cloudflare.com/workers-ai/privacy/" target="_blank">Cloudflare AI data and privacy!</a></p>
      </div>
    <h1>Who will win the 2024 NBA Finals🏀?</h1>
    <h2>✅ out the <a href="https://github.com/elizabethsiegle/nbafinals-cloudflare-ai-hono-durable-objects" target="_blank">code</a>!</h2>
    <div class="spinner" id="spinner">
      <span>Prediction coming...</span>
    </div>
    <div id="prediction">
      <p id="prediction-text"></p>
  </div>
    <div id = "pollcontainer">
      <div id ="results">
    <button id="mavs">Mavs: <span id="value1"></span></button>
    <button id="celtics">Celtics: <span id="value2"></span></button>
      </div>
      </div>
      <script>
      const value1 = document.getElementById("value1");
      const value2 = document.getElementById("value2");
      const mavs = document.getElementById("mavs");
      const celtics = document.getElementById("celtics");
      const prediction = document.getElementById("prediction");
      const spinner = document.getElementById("spinner");
    
      const generate = async () => {
        spinner.style.display = 'block'; // Display the spinner
        const res = await fetch("/generate");
        prediction.innerText = await res.text();
        spinner.style.display = 'none'; // Hide the spinner after the prediction text is shown
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
        spinner.style.display = 'block'; // Display the spinner when "Mavs" is clicked
        await fetch("/option1/mavs", { method: "POST" });
        await updateValue1();
        generate();
      });
    
      celtics.addEventListener("click", async () => {
        spinner.style.display = 'block'; // Display the spinner when "Celtics" is clicked
        await fetch("/option2/celtics", { method: "POST" });
        await updateValue2();
        generate();
      });
    
      updateValue1();
      updateValue2();
      reset.addEventListener("click", async () => {
        await fetch("/option1", { method: "DELETE" });
        await fetch("/option2", { method: "DELETE" });
        await updateValue1();
        updateValue2();
      });
      </script>
      
    </body>
  </html>
`;