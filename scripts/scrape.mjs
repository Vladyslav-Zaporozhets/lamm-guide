import * as cheerio from 'cheerio';
import fs from 'fs/promises';

const BASE_URL = 'https://www.lamm-seile.de';
const CATEGORY_URL = 'https://www.lamm-seile.de/seile/forstwindenseile/';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrape() {
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
  console.log(`Found ${uniqueLinks.length} products.`);
  
  const productsData = [];
  let idCounter = 1;

  for (const link of uniqueLinks) {
    console.log(`Scraping: ${link}`);
    try {
      const pRes = await fetch(link);
      const pHtml = await pRes.text();
      const $p = cheerio.load(pHtml);
      
      const name = $p('.product-detail-name').text().trim();
      const basePriceStr = $p('.product-detail-price').text().trim().replace('€', '').replace('*', '').replace(',', '.').trim();
      const basePrice = parseFloat(basePriceStr) || 100;
      let sku = $p('.product-detail-ordernumber').text().trim().replace('Artikel-Nr.:', '').trim() || 'SKU-UNKNOWN';
      
      const description = $p('.product-detail-description-text').text().trim().replace(/\s+/g, ' ');
      
      // Category guessing from breadcrumbs or URL
      let category = "Forstwindenseile";
      if (link.includes('hochverdichtete')) category = "Hochverdichtete Forstwindenseile";
      else if (link.includes('standard')) category = "Standard Forstwindenseile";
      else if (link.includes('dyneema')) category = "Dyneema Forstwindenseile";
      else if (link.includes('traktions')) category = "Traktionswindenseile";
      
      // Parse dropdowns
      const selects = [];
      $p('select.product-detail-configurator-select-input').each((_, el) => {
        const options = [];
        $p(el).find('option').each((__, opt) => {
           const text = $p(opt).text().trim();
           if(text && text.length > 0 && !text.includes('Anrede')) {
              options.push(text);
           }
        });
        if(options.length > 0) selects.push(options);
      });
      
      let diameters = [10];
      let lengths = [50];
      
      if(selects.length >= 1) {
         diameters = selects[0].filter(o => !o.includes('verfügbar') && !o.includes('verfugbar') && !o.includes('mm')===false).map(o => parseFloat(o.replace('mm', '').trim())).filter(n => !isNaN(n));
         // fallback if it wasn't mm
         if(diameters.length === 0) {
           diameters = selects[0].map(o => parseFloat(o)).filter(n => !isNaN(n));
         }
      }
      if(selects.length >= 2) {
         lengths = selects[1].filter(o => !o.includes('verfügbar') && !o.includes('verfugbar') && !o.includes('m')===false).map(o => parseFloat(o.replace('m', '').trim())).filter(n => !isNaN(n));
      }
      
      if(diameters.length === 0) diameters = [10];
      if(lengths.length === 0) lengths = [50];
      
      // Some products are hooks, cross-selling, etc.
      // Make variants matrix
      const variants = [];
      diameters.forEach((dia) => {
        lengths.forEach((len) => {
            const price = parseFloat((basePrice + (dia * 1.5) + (len * 0.5)).toFixed(2));
            variants.push({
              sku: `${sku}-${dia}-${len}`,
              diameter_mm: dia,
              length_m: len,
              bruchkraft_kn: dia * 12, // approx rule of thumb
              price: price
            });
        });
      });

      productsData.push({
        id: idCounter.toString(),
        name,
        category,
        description,
        variants,
        compatibility: ["Seilgleitbügel", "Kausche"]
      });
      idCounter++;
      
    } catch (e) {
      console.error(`Error fetching ${link}`, e);
    }
    
    // Polite delay 1 second
    await delay(1000);
  }
  
  await fs.writeFile('./src/data/products.json', JSON.stringify(productsData, null, 2), 'utf8');
  console.log('Successfully wrote to products.json');
}

scrape();
