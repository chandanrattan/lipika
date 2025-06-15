# 📝 Lipika – Open Source PDF Editor

**Lipika** (लिपिका) is a lightweight, browser-based PDF editor built with React and powered by [pdf-lib](https://pdf-lib.js.org/). It allows users to upload, annotate, highlight, sign, and save PDF files without any server involvement. The name _Lipika_ means "scribe" or "writer" in Sanskrit.

---

## 🚀 Features

- 📥 Upload and view any PDF
- ✍️ Add highlights to text
- ✒️ Insert signature placeholders
- 🎨 Draw lines and shapes
- ↩️ Undo last action
- 💾 Save the edited PDF locally
- 🧠 In-memory editing using `pdf-lib`
- 🔐 No data leaves your device (privacy-first)

---

## 📸 Demo Preview

> Upload a PDF, edit it in-browser, and download the modified version instantly!

![Lipika Demo Screenshot](./screenshot.png) <!-- Add screenshot in repo -->

---

## 🛠 Tech Stack

- **Frontend**: React
- **PDF Engine**: [pdf-lib](https://pdf-lib.js.org/)
- **Styling**: CSS (Tailwind optional in future roadmap)

---

## 📦 Installation

```bash
git clone https://github.com/chandanrattan/lipika.git
cd lipika
npm install
npm start
```

Visit `http://localhost:3000` to start using the app locally.

---

## 📁 Project Structure

```
lipika/
├── .github/
│   └── workflows/
│       └── node.js.yml       # GitHub Actions CI setup
├── public/                   # Static files
├── src/                      # React components & logic
│   ├── App.js                # Main app component
│   └── App.css               # Basic styling
├── .gitignore
├── package.json
├── README.md
└── LICENSE                   # Apache License 2.0
```

---

## 📌 Roadmap

- [ ] Text box annotations
- [ ] Signature image upload
- [ ] Drawing canvas with eraser
- [ ] Multi-page PDF editing
- [ ] Export to images (PNG/JPG)
- [ ] Dark mode support

---

## 📄 License

This project is licensed under the **Apache License 2.0**. Please read [LICENSE](./LICENSE) for details.

> _Modifications and redistributions are allowed with attribution. For any commercial or extended use, kindly contact the maintainer._

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 💬 Connect

- Project Lead: [Chandan Bhardwaj](https://github.com/chandanrattan)
- Issues & Feedback: [GitHub Issues](https://github.com/chandanrattan/lipika/issues)

---

**Lipika** – _Write. Highlight. Sign. All in your browser._
