# MMM-Eortologio

**MMM-Eortologio** is a [MagicMirror²](https://magicmirror.builders/) module that displays the Greek namedays (Εορτολόγιο) for the current day, retrieved from [eortologio.net](https://www.eortologio.net/).

> Stay connected to Greek cultural traditions by always knowing who is celebrating today!

---

## ✨ Features

- 🎉 Displays today’s Greek namedays (Εορτολόγιο)
- 🔁 Automatically updates daily
- 🌐 Clean display in Greek
- 📡 **Uses data from [eortologio.net](https://www.eortologio.net) via its public RSS feed**

---

## 📦 Installation

1. Open a terminal on your MagicMirror device and navigate to the `modules` directory:
   ```bash
   cd ~/MagicMirror/modules
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/kzioudas/MMM-Eortologio.git
   ```

3. Navigate into the module directory:
   ```bash
   cd MMM-Eortologio
   ```

4. Install required dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

Add the module to your `config.js` file in the `modules` array:

```javascript
{
  module: "MMM-Eortologio",
  position: "top_left", // or any other position
  config: {
    updateInterval: 24 * 60 * 60 * 1000, // (Optional) Update interval in ms (default: 1 day)
    feedUrl: "https://www.eortologio.net/rss/today.xml" // (Optional) Custom RSS feed URL
  }
}
```

---

## 🛠️ Dependencies

This module uses the following Node.js packages:
- [`node-fetch`](https://www.npmjs.com/package/node-fetch)
- [`xml2js`](https://www.npmjs.com/package/xml2js)

These are automatically installed when you run `npm install`.

---


## 🙏 Credits

- 📡 **Data is provided by [eortologio.net](https://www.eortologio.net) via their public RSS feed**
- Developed and maintained by [@kzioudas](https://github.com/kzioudas)
- Thanks to the MagicMirror² community for the modular framework!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

