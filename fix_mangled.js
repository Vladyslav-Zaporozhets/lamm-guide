const fs = require('fs');
const path = './src/data/products.json';
let raw = fs.readFileSync(path, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const products = JSON.parse(raw);

const prodIndex = products.findIndex(p => p.id === 'alu-seilpressklemme');
if (prodIndex > -1) {
   products[prodIndex].name = 'Алюмінієва опресувальна клема (Alu Seilpressklemme)';
   products[prodIndex].category = 'Затискачі для тросів (Seilklemmen)';
}

fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf8');
console.log('Fixed mangled string!');
