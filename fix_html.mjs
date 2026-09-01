import * as cheerio from 'cheerio';
import fs from 'fs/promises';

const CATEGORY_URL = 'https://www.lamm-seile.de/seile/forstwindenseile/';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const data = JSON.parse(await fs.readFile('./src/data/products.json', 'utf8'));
  
  console.log('Fetching category page...');
  const catRes = await fetch(CATEGORY_URL);
  const catHtml = await catRes.text();
  const $ = cheerio.load(catHtml);
  
  const productLinks = [];
  $('.product-box').each((_, el) => {
    const link = $(el).find('.product-name').attr('href');
    if (link) productLinks.push(link);
  });
  const uniqueLinks = Array.from(new Set(productLinks));
  
  for (const link of uniqueLinks) {
     try {
       const pRes = await fetch(link);
       const pHtml = await pRes.text();
       const $p = cheerio.load(pHtml);
       
       const name = $p('.product-detail-name').text().trim();
       
       // Find product in DB
       const dbProduct = data.find(p => p.name === name);
       if(dbProduct) {
          // Extract HTML instead of flat text!
          let html = $p('.product-detail-description-text').html();
          if(html) {
             // Clean up Shopware's ugly classes a bit or just wrap tables
             html = html.replace(/<table/g, '<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse"').replace(/<\/table>/g, '</table></div>');
             html = html.replace(/<th/g, '<th class="border-b-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50"');
             html = html.replace(/<td/g, '<td class="border-b border-slate-100 py-3 px-4 text-sm text-slate-700"');
             dbProduct.description_html = html;
             console.log('Updated HTML for ' + name);
          }
       }
     } catch(e) {
       console.log('Error ' + link);
     }
     await delay(1000);
  }
  
  await fs.writeFile('./src/data/products.json', JSON.stringify(data, null, 2), 'utf8');
}
run();
