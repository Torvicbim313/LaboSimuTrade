import axios from "axios";
import * as cheerio from "cheerio";

const scrapedEthData = async () => {
  let pagina = 1;
  let direcciones = [];
  let sinTagCount = 0; // Contador de direcciones sin tag encontradas

  while (direcciones.length < 660) {
    const url = `https://etherscan.io/accounts/${pagina}`;
    console.log(`📄 Leyendo página ${pagina}...`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $("table tbody tr").each((_, row) => {
      const cols = $(row).find("td");
      if (cols.length >= 4) {
        const ordinal = $(cols[0]).text().trim();
        const direccion = $(cols[1]).find("a").text().trim();
        const tagTexto = $(cols[2]).text().trim();
        const tieneTag = tagTexto.length > 0;
        const balanceTexto = $(cols[3]).text().replace(/,/g, "").trim();
        const balanceETH = parseFloat(balanceTexto);

        // Solo cuenta las sin tag
        if (!tieneTag && direccion && !isNaN(balanceETH)) {
          sinTagCount++;
          // Solo guarda si ya pasaste las primeras 10 sin tag
          if (sinTagCount > 10 && direcciones.length < 660) {
            direcciones.push({ ordinal, direccion, balanceETH });
          }
        }
      }
    });

    pagina++;
    await new Promise(r => setTimeout(r, 500));
  }

  const totalETH = direcciones.reduce((sum, w) => sum + w.balanceETH, 0);

//   console.log(`✅ Total de direcciones sin tag (del puesto 11 al 660): ${direcciones.length}`);
//   console.log(`💰 Total ETH acumulado: ${totalETH.toLocaleString("en-US", { maximumFractionDigits: 2 })}`);
  // console.log(typeof totalETH, totalETH);
  return totalETH;
}


export default scrapedEthData;

