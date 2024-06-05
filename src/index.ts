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
        { role: 'user', content: `You are a professional basketball commentator and analyst. The Dallas Mavericks are playing the Boston Celtics. Here are some opinions from analysts: <opinion>Mavericks to win the series (+180). The Celtics are known for their defense, but so were the Timberwolves. We saw the outcome of that series. Minnesota led the league in points allowed per 100 possessions during the regular season, with the Celtics ranking third. Meanwhile, the Mavericks have the best player on the floor in Doncic, who is talented enough to exploit the Celtics' defensive schemes just like he did against the Timberwolves. Dallas has been a completely different team since the trade deadline, especially after adding P.J. Washington and Daniel Gafford. The Mavericks have a real shot at winning this series in six games.</opinion><opinion>There is value in this Mavericks position given a peaking two-way approach and the fact the Celtics faced several sizable deficits throughout their Indiana series. The Mavericks have the clutch scoring avenues and the requisite grit to challenge the deep and prepared Celtics. I'm leaning to a Dallas upset over paying such a price to lean on the favored Celtics.</opinion><opinion>Boston, which owned the best record in the regular season (64-18), has home-court advantage and will host the first two games of the series. Dallas will host the following two, and Games 5-7 will alternate between the two cities. The Celtics were the only team to finish the regular season with more than 60 wins. Then they went on to win every playoff series in five games or fewer to further establish their dominance over the Eastern Conference. There's a reason they're heavy favorites. Boston has defeated the Mavericks twice already this season, once by nine points (before the trade deadline) and the other by 28 (in March). The Celtics have easily taken care of business in each of their postseason series so far, even without center Kristaps Porzingis – who averaged more than 20 points per game this season – in two of them. Now he's ready to go, playing for revenge against his old team, and can help take Boston over the top alongside fellow top scorers Jayson Tatum and Jaylen Brown.</opinion><opinion>This year, Dallas showed the league just how much a team can improve from trade deadline acquisitions. Over the November to January, middle-of-the-season stretch, the Mavericks were hovering right around the .500 mark and firmly in the play-in tournament – but not playoff – picture. Then they brought in P.J. Washington and Daniel Gafford at the beginning of February.The Mavericks went 21-9 after the trade deadline, good for the third-best record in the NBA down the home stretch. They won the Southwest Division and moved to fifth in the conference, avoiding the play-in. Washington and Gafford were immediately significant contributors. The former finished fourth on the team in scoring average, and the latter trailed only Luka Dončić in rebounds per game. Both have continued to help push Dallas forward in the postseason as well. Washington is the team's third-best scorer by points per game and Gafford has averaged a team-high 1.8 blocks per game.</opinion>In 500 characters or less, say who you think will win the 2024 NBA Finals and do not mention the other analysts at all`}
      ]
    }
  )
  console.log(`answer ${answer.response}`);
  return Response.json(answer.response)
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
