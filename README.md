# Job Portal

This is a **Job Portal** web application built using **React** and **Vite**. The platform allows job seekers, employers, and administrators to interact seamlessly. It includes features like job listings, job applications, and user dashboards.

## Features

### General
- Modern UI built with React components.
- State management using React hooks.
- Modular and reusable component structure.

### For Job Seekers
- Browse job listings.
- View detailed job descriptions.
- Apply for jobs.

### For Employers
- Post job listings.
- Manage job applications.

### For Administrators
- Manage users and roles.
- Oversee job postings and applications.

## Project Structure

The project follows a modular structure for better scalability and maintainability:

```
src/
  components/       # Reusable UI components
  pages/            # Application pages (e.g., Login, Dashboard, Job Listings)
  data/             # Mock data for development
  assets/           # Static assets like images and icons
```

### Key Files and Directories
- `src/components/`: Contains reusable UI components like `Button`, `Modal`, `Table`, etc.
- `src/pages/`: Contains the main pages such as `LoginPage`, `JobListingsPage`, and dashboards for different user roles.
- `src/data/mockData.js`: Mock data for development purposes.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd job_portal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server:
```bash
npm run dev
```

### Build
To create a production build:
```bash
npm run build
```

### Linting
To run ESLint:
```bash
npm run lint
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
