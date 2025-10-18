const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getGenerativeModel } = require("@google/generative-ai");
const puppeteer = require("puppeteer-core");
const cors = require("cors")({origin: true});

admin.initializeApp();

const genAI = new getGenerativeModel({
  apiKey: functions.config().googleai.key,
});

exports.scrapeUrl = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).send("URL is required");
    }

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });

      const textContent = await page.evaluate(() => document.body.innerText);
      const imageLinks = await page.evaluate(() => Array.from(document.images).map(img => img.src));

      await browser.close();

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Extrae los detalles de la oferta de la siguiente URL: ${url}. Contenido del texto: ${textContent}. Quiero el nombre del producto, el precio original y el precio de la oferta.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const dealDetails = await response.text();

      res.status(200).send({ dealDetails, imageLinks });
    } catch (error) {
      console.error("Error scraping URL:", error);
      res.status(500).send("Error scraping URL");
    }
  });
});
