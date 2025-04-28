# KwanzaTech

KwanzaTech is a data solutions provider offering services like data warehousing, analytics, and automation for SMEs and individuals in sectors such as healthcare, retail, and government. This repository contains the KwanzaTech website (a single-page `index.html`) and backend (`server.js`) to handle contact form submissions with file uploads.

## Project Structure

```
kwanzatech/
├── web/
│   └── index.html        # Single-page website with Tailwind CSS and blog
├── backend/
│   └── server.js         # Node.js backend for form submissions
├── README.md             # Project documentation
└── LICENSE               # MIT License
```

- **web/**: Contains the static website files. Currently, only `index.html` exists, serving as the main page with sections for services, sectors, portfolio, blog, and a contact form.
- **backend/**: Contains the Node.js backend (`server.js`) for handling form submissions and file uploads, integrated with MongoDB.
- **README.md**: This file, providing setup and deployment instructions.
- **LICENSE**: MIT License for open-source usage.

## Features

### Website (`web/index.html`)
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

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/kwanzatech.git
cd kwanzatech
```

Replace `yourusername` with your GitHub username.

### 2. Website Setup (`web/`)

1. **Navigate to the web folder**:
   ```bash
   cd web
   ```

2. **Test Locally**:
   - Install a local server to avoid CORS issues with Tailwind CSS:
     ```bash
     npm install -g serve
     serve
     ```
   - Open `http://localhost:3000/index.html` in your browser.
   - Verify:
     - Styling: Black header, orange buttons, grid layout.
     - Blog posts toggle with “Read More”/“Show Less”.
     - Form submission shows an alert (will fail without backend).
   - Check DevTools (F12 → Console) for JavaScript errors.

3. **Update Backend URL**:
   - Replace `https://your-backend.com` in `index.html` with your deployed backend URL (e.g., `https://kwanzatech-backend.herokuapp.com`):
     ```html
     <form id="contactForm" action="https://kwanzatech-backend.herokuapp.com/api/contact" method="POST" enctype="multipart/form-data" class="max-w-md mx-auto">
     ```
     ```javascript
     const response = await fetch('https://kwanzatech-backend.herokuapp.com/api/contact', {
     ```

### 3. Backend Setup (`backend/`)

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   - Create a `package.json`:
     ```json
     {
       "name": "kwanzatech-backend",
       "version": "1.0.0",
       "main": "server.js",
       "dependencies": {
         "express": "^4.17.1",
         "mongoose": "^6.0.0",
         "cors": "^2.8.5",
         "multer": "^1.4.5-lts.1"
       },
       "scripts": {
         "start": "node server.js"
       }
     }
     ```
   - Install:
     ```bash
     npm install
     ```

3. **Set Up MongoDB**:
   - **Option 1: Local MongoDB**:
     - Install MongoDB ([MongoDB Community](https://www.mongodb.com/try/download/community)).
     - Start the server:
       ```bash
       mongod
       ```
   - **Option 2: MongoDB Atlas** (recommended):
     - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
     - Create a free cluster, name the database `kwanzatech`.
     - Get the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/kwanzatech`).
     - Update `server.js`:
       ```javascript
       mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/kwanzatech', {
       ```
     - Add your IP to Atlas’s IP whitelist (Network Access → Allow access from anywhere).

4. **Test Locally**:
   - Run the server:
     ```bash
     node server.js
     ```
   - Test the endpoint:
     ```bash
     curl -X POST http://localhost:3000/api/contact -F "name=Test" -F "email=test@example.com" -F "message=Hello"
     ```
     - Should return: `{"message":"Message and files saved successfully"}`.

## Deployment Instructions

### 1. Deploy Website to Netlify
1. **Push to GitHub**:
   ```bash
   cd web
   git add index.html
   git commit -m "Add KwanzaTech website"
   git push origin main
   ```

2. **Deploy**:
   - Go to [Netlify](https://app.netlify.com).
   - Click “New site from Git” → Connect GitHub → Select the `kwanzatech` repo.
   - Set:
     - Branch: `main`
     - Publish directory: `web`
   - Deploy the site.
   - Note the URL (e.g., `https://kwanzatech.netlify.app`).

3. **Custom Domain** (optional):
   - In Netlify’s “Domain settings”, add your domain (e.g., `kwanzatech.com`).

4. **Test**:
   - Visit the Netlify URL.
   - Verify styling, blog toggling, and form submission (alerts “Error” until backend is live).
   - Check DevTools for JavaScript errors.

### 2. Deploy Backend to Heroku
1. **Prepare Files**:
   - Create a `Procfile`:
     ```bash
     echo 'web: node server.js' > backend/Procfile
     ```
   - Ensure `package.json` is in `backend/`.

2. **Push to GitHub**:
   ```bash
   cd backend
   git add server.js package.json Procfile
   git commit -m "Add KwanzaTech backend"
   git push origin main
   ```

3. **Deploy**:
   - Install Heroku CLI ([Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)).
   - Log in:
     ```bash
     heroku login
     ```
   - Create an app:
     ```bash
     heroku create kwanzatech-backend
     ```
   - Set MongoDB URI:
     ```bash
     heroku config:set MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/kwanzatech
     ```
   - Deploy:
     ```bash
     git push heroku main
     ```

4. **Test**:
   - Open `https://kwanzatech-backend.herokuapp.com`.
   - Test the endpoint:
     ```bash
     curl -X POST https://kwanzatech-backend.herokuapp.com/api/contact -F "name=Test" -F "email=test@example.com" -F "message=Hello"
     ```

5. **Update Website**:
   - Update `index.html` with the Heroku URL (see Setup → Website Setup).
   - Redeploy the website to Netlify.

## Troubleshooting

### Website Issues
- **Plain HTML/No Styling**:
  - Check if `https://cdn.tailwindcss.com` loads (DevTools → Network).
  - If it fails, download Tailwind locally:
    ```bash
    curl -o web/tailwind.min.js https://cdn.tailwindcss.com
    ```
    Update `index.html`:
    ```html
    <script src="tailwind.min.js"></script>
    ```
- **JavaScript Errors**:
  - Heroicons (`https://unpkg.com/@heroicons/vue/24/outline`) may cause errors in plain HTML. Remove temporarily:
    ```html
    <script src="https://unpkg.com/@heroicons/vue/24/outline"></script>
    ```
  - Inline SVGs or contact the maintainer for assistance.
- **Form Submission Fails**:
  - Ensure the backend URL in `index.html` matches the deployed backend.
  - Test the backend endpoint directly with `curl`.

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