const fs = require('fs');
let pRaw = fs.readFileSync('./src/data/products.json', 'utf8');
if (pRaw.charCodeAt(0) === 0xFEFF) pRaw = pRaw.slice(1);
const products = JSON.parse(pRaw);

const prodIndex = products.findIndex(p => p.id === 'alu-seilpressklemme');
if (prodIndex > -1) {
   products[prodIndex].images = [
      'https://www.talurit.com/wp-content/uploads/2024/04/T-Ferrule-Product-photo-Carousel-V1-1196px.jpeg',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTNyQ6QUoLyqPSK3vDsBzaqkrOrLCCo-bpY9lg8WdhfkaRtm8lA'
   ];
   products[prodIndex].videos = [
      '5h3P9AYr1wo',
      'u9y2muVYGEU'
   ];
   products[prodIndex].description_html = `
    <div class="space-y-8">
      <div class="text-lg text-slate-700 font-medium">Алюмінієві опресувальні клеми за стандартом EN 13411-3 для виготовлення петель або коушів на канатах.</div>
      
      <div>
         <h4 class="font-bold text-slate-900 text-xl mb-4 flex items-center"><span class="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">1</span> Де використовується</h4>
         <ul class="list-disc pl-5 text-slate-700 space-y-2">
            <li><strong class="text-slate-900">Основне застосування:</strong> створення надійних кінцевих з'єднань на сталевих канатах (петлі, коуші).</li>
            <li><strong class="text-slate-900">Галузі:</strong> вантажопідйомне обладнання, такелажні роботи, лісова промисловість (канати для лісопідйомних лебідок), будівництво.</li>
            <li><strong class="text-slate-900">Типи канатів:</strong> канати з волокняним осердям, однопрядкові канати зі сталевим осердям, канати, що не скручуються.</li>
         </ul>
      </div>

      <div>
         <h4 class="font-bold text-slate-900 text-xl mb-4 flex items-center"><span class="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">2</span> Технічні специфікації</h4>
         <div class="overflow-hidden rounded-2xl border border-slate-200">
           <table class="w-full text-left border-collapse">
              <thead>
                 <tr>
                    <th class="border-b-2 border-slate-200 py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Стандарт</th>
                    <th class="border-b-2 border-slate-200 py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Матеріал</th>
                    <th class="border-b-2 border-slate-200 py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Міцність</th>
                    <th class="border-b-2 border-slate-200 py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50">Температурний діапазон</th>
                 </tr>
              </thead>
              <tbody>
                 <tr class="bg-white hover:bg-slate-50 transition-colors">
                    <td class="border-b border-slate-100 py-4 px-6 text-sm text-slate-700 font-medium">DIN EN 13411-3</td>
                    <td class="border-b border-slate-100 py-4 px-6 text-sm text-slate-700">Алюміній (легірований)</td>
                    <td class="border-b border-slate-100 py-4 px-6 text-sm text-slate-700">До 1960 Н/mm²</td>
                    <td class="border-b border-slate-100 py-4 px-6 text-sm text-slate-700">-40°C до +100°C (з волокняним), до +150°C (без)</td>
                 </tr>
              </tbody>
           </table>
         </div>
      </div>

      <div>
         <h4 class="font-bold text-slate-900 text-xl mb-4 flex items-center"><span class="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">3</span> Процес монтажу (Опресування)</h4>
         <ol class="list-decimal pl-5 text-slate-700 space-y-3">
            <li><strong>Підготовка:</strong> Кінець сталевого канату простягається через клему, утворюючи петлю (навколо коуша або просто так).</li>
            <li><strong>Опресування:</strong> Клема з канатом всередині поміщається в спеціальний прес (гідравлічний LUNA Drahtseilklemmpresse 414 або Schlageisen).</li>
            <li><strong>Результат:</strong> Під величезним тиском прес деформує алюмінієву клему навколо канату, створюючи нероз'ємне, надійне з'єднання.</li>
         </ol>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mt-8">
         <h5 class="text-blue-900 font-bold mb-2 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Важлива інформація з якості
         </h5>
         <p class="text-sm text-blue-800 leading-relaxed">Клеми Talurit® розміром від 8 мм мають <strong>інспекційний отвір (Inspektionsloch)</strong>, який дозволяє візуально перевірити правильність позиціонування канату після опресування. Також від 8 мм клеми маркуються розміром, типом і номером партії. Для з'єднань з «фламандським оком» потрібно виконати 4 послідовних пресування.</p>
      </div>
    </div>
   `;
}

fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Updated Alu Seilpressklemme images, videos, and HTML');
