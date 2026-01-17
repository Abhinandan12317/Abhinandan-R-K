# About Abhinandan

Welcome to my personal portfolio project! This app showcases my work, resume, and contact information.

## Getting Started

**Prerequisites:**
- Node.js (v16 or higher recommended)

### Installation
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set up environment variables in `.env.local` if needed.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Profile Picture & Resume

To add your profile picture and resume:
1. Place your profile image (e.g., `profile.jpg`) and resume PDF (e.g., `ARK_Resume.pdf`) in the `public/` folder at the root of the project. If the folder does not exist, create it.
2. The app will automatically use these files for your profile and resume download links.
   - Profile image: `/profile.jpg`
   - Resume: `/ARK_Resume.pdf`
3. If you change the filenames, update the paths in `constants.ts` under `PERSONAL_DETAILS`.

## Features
- Modern React + Vite setup
- Responsive design
- Sidebar navigation
- Downloadable resume
- Contact form

---

Feel free to fork, modify, and use this project as inspiration for your own portfolio!
