const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/getTimeStories', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://time.com', { waitUntil: 'networkidle2' });

        const stories = await page.evaluate(() => {
            const storyLinks = Array.from(document.querySelectorAll('a[href^="/"]'));
            const latestStories = [];

            for (let link of storyLinks) {
                if (latestStories.length >= 6) break;

                const title = link.innerText.trim();
                const href = 'https://time.com' + link.getAttribute('href').trim();

                if (title && href.match(/https:\/\/time\.com\/\d{7}\//)) {
                    latestStories.push({ title, link: href });
                }
            }

            return latestStories;
        });

        await browser.close();
        res.json(stories);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Unable to fetch stories' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
