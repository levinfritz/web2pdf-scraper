# 🧾 M129 PDF-Scraper

Dieses Projekt lädt automatisch alle Kapitel einer Webseite, speichert jedes Kapitel als PDF und fügt sie anschliessend zu einem einzigen Gesamtdokument zusammen.

## 📦 Voraussetzungen

- [Node.js](https://nodejs.org/) (Version ≥ 14 empfohlen)
- Internetverbindung (die Seiten werden live geladen)

## 🛠️ Installation

1. Projekt klonen und Ordner öffnen:

   ```bash
   git clone https://github.com/levinfritz/web2pdf-scraper.git
   cd web2pdf-scraper
   ```

2. Projekt initialisieren (falls nötig):

   ```bash
   npm init -y
   ```

3. Abhängigkeiten installieren:

   ```bash
   npm install puppeteer pdf-lib
   ```

4. Datei `scrape_m129.js` erstellen (siehe Beispielcode in diesem Repository)

## ▶️ Ausführung

Das Skript startest du mit:

```bash
node scrape_m129.js
```

Das Skript führt folgende Schritte aus:

- Lädt die Hauptseite
- Extrahiert automatisch alle Kapitel-Links
- Rendert jede Seite mit Puppeteer und speichert sie als `Kapitel_01.pdf`, `Kapitel_02.pdf` usw.
- Fügt alle PDFs zu einem Dokument `M129_Gesamt.pdf` zusammen
- Löscht die Einzeldokumente nach der Zusammenführung automatisch

## 📁 Ergebnis

Nach dem Durchlauf findest du im Ordner `m129_pdfs`:

```text
m129_pdfs/
└── M129_Gesamt.pdf ✅
```

## 🧹 Aufräumen

Die temporären Kapitel-PDFs werden nach der Zusammenführung automatisch gelöscht. Nur das finale Dokument bleibt erhalten.

## 📄 Lizenz

MIT-Lizenz – frei verwendbar, auch für den Schulgebrauch.
