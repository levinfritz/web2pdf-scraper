const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

(async () => {
  const baseUrl = 'https://gbssg.gitlab.io/m129/';
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  console.log("📥 Lade Hauptseite...");
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  console.log("🔗 Extrahiere Kapitel-Links...");
  const links = await page.$$eval('a', anchors => anchors
    .map(a => a.href)
    .filter(href => href.includes('/m129/') && !href.endsWith('#') && !href.endsWith('/m129/')));

  const uniqueLinks = [...new Set(links)];
  console.log(`📄 ${uniqueLinks.length} Kapitel gefunden.`);

  const outputDir = path.resolve(__dirname, 'm129_pdfs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const pdfPaths = [];

  let i = 1;
  for (const link of uniqueLinks) {
    const subPage = await browser.newPage();
    await subPage.goto(link, { waitUntil: 'networkidle2' });

    const fileName = `Kapitel_${String(i).padStart(2, '0')}.pdf`;
    const filePath = path.join(outputDir, fileName);
    console.log(`🖨️ Speichere ${filePath} ...`);

    await subPage.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true
    });

    pdfPaths.push(filePath);
    await subPage.close();
    i++;
  }

  await browser.close();

  // Jetzt alle PDFs zu einem zusammenfügen
  console.log("🧩 Füge alle Kapitel zu einem Gesamt-PDF zusammen...");
  const mergedPdf = await PDFDocument.create();

  for (const pdfPath of pdfPaths) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  const mergedFilePath = path.join(outputDir, 'M129_Gesamt.pdf');
  fs.writeFileSync(mergedFilePath, mergedPdfBytes);

  console.log(`✅ Gesamt-PDF gespeichert unter: ${mergedFilePath}`);

  // 🧹 Kapitel-PDFs löschen
  console.log("🗑️ Lösche Einzel-PDFs...");
  for (const pdfPath of pdfPaths) {
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
      console.log(`❌ gelöscht: ${path.basename(pdfPath)}`);
    }
  }

  console.log("🎉 Nur noch Gesamt-PDF vorhanden!");
})();

