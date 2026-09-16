# Engr. Irish Julianne Go, GE — Professional ePortfolio

A complete, modern, responsive, and elegant ePortfolio website tailored specifically for **Engr. Irish Julianne Go**, Licensed Geodetic Engineer & Civil Service Passer (Caraga State University – Main Campus).

Built with semantic HTML5, modern vanilla CSS with a sophisticated **Black, White & Gold** design system, and lightweight vanilla JavaScript featuring zero-UI document rendering for the Application Letter and Resume.

---

## 🎨 Color System (Black, White & Gold)

- **Black**: `#0B0B0B` (Header navbar, footer, primary typography)
- **Charcoal**: `#1A1A1A` (Dark surfaces and cards)
- **Gold**: `#D4AF37` (Primary accent, active indicators, borders, highlights)
- **Deep Gold**: `#B8860B` (Subtle gradients, badges, secondary accents)
- **White**: `#FFFFFF` (Primary page background and clean document pages)
- **Off-white**: `#F8F8F8` (Subtle neutral section backgrounds)

---

## 📂 Project Structure

```
E PORTFOLIO/
│
├── index.html               # 1. Home / Professional Landing Page (with Corporate Portrait)
├── about.html               # 2. About Me (Education, Technical & Soft Skills, References)
├── application-letter.html  # 3. Official Application Letter (Zero-UI Clean A4 Paper Render)
├── resume.html              # 4. Curriculum Vitae / Resume (Zero-UI Clean A4 Paper Render)
├── trainings.html           # 5. Trainings & Seminars (GeoSTEM & MapTalks 1 — Text Information Only)
├── certificates.html        # 6. Certificates & Credentials (OJT Certificate, MapTalks 1, GeoSTEM Photo)
├── experience.html          # 7. Work Experience (BPA Abatayo Land Surveying Services)
├── affiliations.html        # 8. Affiliations & Leadership (YGESS President & Treasurer, MAGES Board)
├── README.md                # Project documentation
│
├── css/
│   └── style.css            # Black, White & Gold master stylesheet & responsive design system
│
├── js/
│   ├── main.js              # Navbar toggle, dropdown interactions, scroll reveals, modal controller
│   ├── doc-renderer.js      # Zero-UI high-fidelity PDF canvas renderer & fullscreen zoom
│   ├── document-data.js     # Embedded base64 payloads for offline/local document rendering
│   └── vendor/
│       ├── pdf.min.js       # PDF.js core library
│       └── pdf.worker.min.js# PDF.js worker
│
├── images/
│   ├── profile.jpg          # Official corporate portrait
│   ├── certificates/        # Certificate scans and documentation photos
│   │   ├── ojt_certificate_bpa_abatayo.jpg
│   │   ├── maptalks_lecture_1.png
│   │   └── geostems_seminar_2026.jpg
│   └── ...
│
└── docs/
    ├── Application_Letter_Irish_Julianne_Go.pdf
    ├── Resume_Irish_Julianne_Go.pdf
    └── MapTalks_Lecture_1_Irish_Julianne_Go.pdf
```

---

## 🚀 How to View the Website Locally

You don't need any server or terminal command:
1. Open Windows File Explorer.
2. Navigate to `Documents\E PORTFOLIO`.
3. Double-click **`index.html`** to launch in Google Chrome, Microsoft Edge, or your preferred browser.

---

## 📜 How to Add New Certificates Later

The **Certificates & Credentials** page (`certificates.html`) is prepared to receive your certificate scans whenever you have them ready:

1. Save your certificate image file (e.g. `cert_prc_license.jpg` or `.png`) in the `images/` folder.
2. Open `certificates.html` in your text editor.
3. Replace the placeholder preview box inside any `.card` with your image:
   ```html
   <img src="images/cert_prc_license.jpg" alt="PRC License" class="certificate-thumb">
   ```
4. Update the title, issuing organization, and date to match your certificate.
