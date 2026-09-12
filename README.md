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
├── trainings.html           # 5. Trainings & Seminars (MapTalks Lecture Series 1, 2, 3)
├── certificates.html        # 6. Certificates Gallery (MapTalks Lecture 1 & verified credentials)
├── experience.html          # 7. Work Experience (BPA Abatayo Land Surveying Services)
├── affiliations.html        # 8. Affiliations & Leadership (YGESS President & Treasurer, MAGES Board)
├── README.md                # Project documentation
│
├── css/
│   └── style.css            # Black, White & Gold design system & responsive styling
│
├── js/
│   ├── main.js              # Mobile navigation, smooth scrolling, scroll reveal animations
│   ├── doc-renderer.js      # Zero-UI high-resolution document renderer
│   ├── document-data.js     # Base64 document data for offline viewing
│   └── vendor/
│       └── pdf.min.js       # Local PDF rendering engine
│
├── images/
│   ├── profile.jpg          # Official corporate portrait
│   ├── certificates/        # High-resolution certificate scans
│   │   └── maptalks_lecture_1.png
│   └── ...                  # Future certificate scans & imagery
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
