const fs = require("fs");
let c = fs.readFileSync("encyclopedia_docs/seile/seilzubehoer/seilklemmen/alu-seilpressklemme.md", "utf8");

const newTable = `| Діаметр канату (Seil-O) | Артикул (SKU) | Ціна (€/шт) |
| :--- | :--- | :--- |
| 1 mm | 4003093010 | 0,18 |
| 2 mm | 4003093020 | 0,19 |
| 3 mm | 4003093030 | 0,21 |
| 4 mm | 4003093040 | 0,29 |
| 5 mm | 4003093050 | 0,33 |
| 6 mm | 4003093060 | 0,54 |
| 7 mm | 4003093070 | 0,57 |
| 8 mm | 4003093080 | 0,68 |
| 9 mm | 4003093090 | 0,69 |
| 10 mm | 4003093100 | 0,79 |
| 11 mm | 4003093110 | 0,94 |
| 12 mm | 4003093120 | 1,08 |
| 13 mm | 4003093130 | 1,37 |
| 14 mm | 4003093140 | 1,50 |
| 16 mm | 4003093160 | 2,59 |
| 18 mm | 4003093180 | 4,01 |
| 20 mm | 4003093200 | 5,69 |`;

const regex = /\| Діаметр канату \(Seil-O\) \| Артикул \(SKU\) \| Ціна \(€\/шт\) \|[\s\S]*?\| 16 mm \| 4003093160 \| 1,13 \|/;
c = c.replace(regex, newTable);

c = c.replace("На сайті представлено повну лінійку клем для діаметрів канатів від 6 до 16 мм.", "На сайті представлено повну лінійку клем для діаметрів канатів **від 1 мм до 20 мм**.");

const oldManuf = "* **Виробник:** Lamm GmbH (Buttenheim, Німеччина).\r\n* **Бренд:** Продукція розроблена за технологією **Talurit® Presssysteme**. Головний офіс Talurit® знаходиться у Швеції (Talurit AB, Vastra Frolunda).";
const oldManuf2 = "* **Виробник:** Lamm GmbH (Buttenheim, Німеччина).\n* **Бренд:** Продукція розроблена за технологією **Talurit® Presssysteme**. Головний офіс Talurit® знаходиться у Швеції (Talurit AB, Vastra Frolunda).";

const newManuf = "* **Бренд / Виробник:** Згідно з технічними даними на сайті Lamm-Seile, виробником вказано **Sahm Splice GmbH** (один із провідних німецьких виробників та постачальників технологій опресування). У той же час, клеми часто виготовляються за стандартом та технологією Talurit®.";

c = c.replace(oldManuf, newManuf);
c = c.replace(oldManuf2, newManuf);

fs.writeFileSync("encyclopedia_docs/seile/seilzubehoer/seilklemmen/alu-seilpressklemme.md", c);
console.log("Replaced");

