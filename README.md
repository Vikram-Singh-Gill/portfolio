# Vikram Singh Portfolio

GitHub Pages-ready static portfolio site.

## Structure

```text
.
├── index.html
├── assets/
│   ├── profile.jpg
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── writeup.js
│   └── certs/
│       ├── pnpt.png
│       ├── google-cybersecurity.png
│       ├── cpts.png
│       └── oscp.png
└── writeups/
    ├── fluffy/
    │   ├── index.html
    │   └── images/
    └── trick/
        ├── index.html
        └── images/
```

## Important

The CTF writeup cards link directly to:

```text
writeups/fluffy/index.html
writeups/trick/index.html
```

Each writeup has its own local `images/` folder:

```text
writeups/fluffy/images/
writeups/trick/images/
```

Add screenshots for each writeup inside that machine's own `images/` folder.

## Replace placeholders

In `index.html`, `writeups/fluffy/index.html`, and `writeups/trick/index.html`, replace:

- `https://github.com/your-github-username`
- `https://www.linkedin.com/in/your-linkedin-username`
- `https://app.hackthebox.com/profile/your-htb-id`

Replace these images:

- `assets/profile.jpg`
- `assets/certs/pnpt.png`
- `assets/certs/google-cybersecurity.png`
- `assets/certs/cpts.png`
- `assets/certs/oscp.png`

## GitHub Pages

Upload the extracted files to your repository root, then enable:

Settings → Pages → Deploy from a branch → `main` → `/root`