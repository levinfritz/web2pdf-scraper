# 🧾 M129 PDF-Scraper

Dieses Projekt lädt automatisch alle Kapitel der Webseite, speichert jedes Kapitel als PDF und fügt sie anschliessend zu einem einzigen Gesamtdokument zusammen.

## 📦 Voraussetzungen

- [Node.js](https://nodejs.org/) (Version ≥ 14 empfohlen)
- Internetverbindung (die Seiten werden live geladen)

## 🛠️ Installation

1. Projektordner erstellen und hineingehen:

   ```bash
   git clone https://github.com/levinfritz/web2pdf-scraper.git
   cd web2pdf-scraper
````

2. Projekt initialisieren:

   ```bash
   npm init -y
   ```

3. Benötigte Abhängigkeiten installieren:

   ```bash
   npm install puppeteer pdf-lib
   ```

4. Datei `scrape_m129.js` erstellen (Code siehe `scrape_m129.js` in diesem Projekt)

## ▶️ Ausführung

Starte das Script mit folgendem Befehl:

```bash
node scrape_m129.js
```

Das Script macht folgendes:

* Lädt die Hauptseite 
* Extrahiert automatisch alle Kapitel-Links
* Rendert jede Seite mit Puppeteer und speichert sie als `Kapitel_01.pdf`, `Kapitel_02.pdf`, …
* Führt alle PDFs zu einem Dokument `M129_Gesamt.pdf` zusammen
* Löscht die Einzeldokumente danach automatisch

## 📁 Ergebnis

Nach dem Durchlauf findest du im Ordner `m129_pdfs`:

```text
m129_pdfs/
└── M129_Gesamt.pdf ✅
```

## 🧹 Cleanup

Die temporären Kapitel-PDFs werden automatisch gelöscht. Nur das finale Dokument bleibt erhalten.

## 📄 Lizenz

MIT-Lizenz – frei verwendbar, auch für den Schulgebrauch.

```

---

Wenn du willst, kann ich dir auch die passende `.zip`-Struktur generieren oder eine GitHub-kompatible Vorlage mit `package.json`, `.gitignore` etc. vorbereiten. Sag einfach Bescheid!
```
