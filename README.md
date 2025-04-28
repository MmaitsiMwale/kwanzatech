# KwanzaTech

KwanzaTech is a data solutions provider offering services like data warehousing, analytics, and automation for SMEs and individuals in sectors such as healthcare, retail, and government. This repository contains the KwanzaTech website (a single-page `index.html`) and backend (`server.js`) to handle contact form submissions with file uploads.

## Project Structure

```
kwanzatech/
├── website/
│   └── index.html        # Single-page website with Tailwind CSS and blog
├── backend/
│   └── server.js         # Node.js backend for form submissions
├── README.md             # Project documentation
└── LICENSE               # MIT License
```

- **website/**: Contains the static website files. Currently, only `index.html` exists, serving as the main page with sections for services, sectors, portfolio, blog, and a contact form.
- **backend/**: Contains the Node.js backend (`server.js`) for handling form submissions and file uploads, integrated with MongoDB.
- **README.md**: This file, providing setup and deployment instructions.
- **LICENSE**: MIT License for open-source usage.

## Features

### Website (`website/index.html`)
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly UI.
- **Sections**:
  - Hero: Introduction with call-to-action buttons.
  - About: Overview of KwanzaTech’s mission.
  - Services: List of data solutions (e.g., data warehousing, machine learning).
  - Sectors: Target industries (e.g., healthcare, restaurants).
  - Portfolio: Example projects.
  - Blog: Three articles with toggleable content (inventory optimization, restaurant loyalty, freelancer productivity).
  - Testimonials: Client feedback.
  - Contact: Form with file upload support.
- **Interactivity**: JavaScript for smooth scrolling, blog post toggling, and form submission with error handling.
- **SEO**: Structured data (JSON-LD) and meta tags for search engine visibility.

### Backend (`backend/server.js`)
- **Form Handling**: Accepts contact form submissions with fields (name, email, project, message) and up to 5 file uploads (PDF, DOC, DOCX, XLSX, CSV).
- **File Storage**: Saves files in `uploads/<customer_name>/uploaded_files/`.
- **Database**: Stores submissions in MongoDB.
- **Security**: File type validation and 10MB size limit.

## Prerequisites

- **Node.js**: v14 or higher (for backend).
- **MongoDB**: Local MongoDB or MongoDB Atlas account.
- **Git**: For cloning the repository.
- **npm**: For installing backend dependencies.
- **Hosting Accounts**:
  - Netlify (or similar) for static website hosting.
  - Heroku (or similar) for backend hosting.

### Backend Issues
- **MongoDB Connection Error**:
  - Verify the connection string in `MONGODB_URI`.
  - Ensure Atlas IP whitelist allows Heroku’s IP or set to “Allow access from anywhere”.
- **File Upload Errors**:
  - Check file types (only PDF, DOC, DOCX, XLSX, CSV allowed) and size (<10MB).
  - Verify the `uploads/` directory is writable on the server.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure code follows the existing style and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support:
- Email: [info@kwanzatech.com](mailto:info@kwanzatech.com)
- GitHub Issues: [Create an issue](https://github.com/yourusername/kwanzatech/issues)

---

**KwanzaTech** – Empowering SMEs and individuals with innovative data solutions.
