const fs = require('fs');

const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProduct = {
  id: "alu-seilpressklemme",
  name: "Alu Seilpressklemme (Talurit)",
  category: "Seilklemmen",
  description: "Aluminium-Pressklemmen nach EN 13411-3 zur Herstellung von Seilendverbindungen (Schlaufen oder Kauschen).",
  description_html: `
    <div class="space-y-6">
      <p class="text-slate-700">Aluminium-Pressklemmen nach EN 13411-3 zur Herstellung von Schlaufen oder Kauschen an Drahtseilen.</p>
      
      <h4 class="font-bold text-slate-900 mt-6 mb-2">Einsatzgebiete</h4>
      <ul class="list-disc pl-5 text-slate-700 space-y-1">
         <li>Hebezeuge und Anschlagmittel</li>
         <li>Forstwirtschaft (Forstwindenseile)</li>
         <li>Bauwesen und Takelage</li>
      </ul>

      <h4 class="font-bold text-slate-900 mt-6 mb-2">Technische Spezifikationen</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse border border-slate-200">
           <thead>
              <tr>
                 <th class="border-b-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-500 uppercase bg-slate-50">Norm</th>
                 <th class="border-b-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-500 uppercase bg-slate-50">Material</th>
                 <th class="border-b-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-500 uppercase bg-slate-50">Max. Festigkeit</th>
                 <th class="border-b-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-500 uppercase bg-slate-50">Temperaturbereich</th>
              </tr>
           </thead>
           <tbody>
              <tr>
                 <td class="border-b border-slate-100 py-3 px-4 text-sm text-slate-700">DIN EN 13411-3</td>
                 <td class="border-b border-slate-100 py-3 px-4 text-sm text-slate-700">Aluminiumlegierung</td>
                 <td class="border-b border-slate-100 py-3 px-4 text-sm text-slate-700">Bis 1960 N/mm²</td>
                 <td class="border-b border-slate-100 py-3 px-4 text-sm text-slate-700">-40°C bis +150°C (ohne Fasereinlage)</td>
              </tr>
           </tbody>
        </table>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
         <p class="text-sm text-blue-900 font-medium"><strong>Qualitätskontrolle:</strong> Ab einer Größe von 8 mm verfügen die Klemmen über ein <em>Inspektionsloch</em> zur Sichtprüfung sowie eine Prägung (Größe, Typ, Charge).</p>
      </div>
    </div>
  `,
  variants: [
    { diameter: "6", length: null, sku: "4003093060", price: 0.36 },
    { diameter: "8", length: null, sku: "4003093080", price: 0.40 },
    { diameter: "9", length: null, sku: "4003093090", price: 0.45 },
    { diameter: "10", length: null, sku: "4003093100", price: 0.49 },
    { diameter: "11", length: null, sku: "4003093110", price: 0.59 },
    { diameter: "12", length: null, sku: "4003093120", price: 0.65 },
    { diameter: "13", length: null, sku: "4003093130", price: 0.78 },
    { diameter: "14", length: null, sku: "4003093140", price: 0.97 },
    { diameter: "16", length: null, sku: "4003093160", price: 1.13 }
  ],
  compatibility: [
    "Schlageisen (Gr. I oder Gr. II)",
    "LUNA-Drahtseilklemmpresse 414",
    "Seilschloss mit Keil und Bolzen"
  ]
};

data.push(newProduct);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Added Alu Seilpressklemme');
