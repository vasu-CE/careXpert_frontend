# Contributing to Zaplink Frontend

Thank you for your interest in contributing to **Zaplink** as part of the **GDG CHARUSAT Open Source Contri Sprintathon**! 🎉

We welcome contributions from developers of all skill levels. This guide will help you get started with your first contribution.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Need Help?](#need-help)

## 🛠 Tech Stack

This project uses:
- **Frontend Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Package Manager**: npm

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🚀 Getting Started

### Step 1: Fork the Repository

1. Navigate to the [Zaplink Frontend repository](https://github.com/gdg-charusat/Zaplink_frontend)
2. Click the **Fork** button in the top-right corner
3. This creates a copy of the repository in your GitHub account

### Step 2: Clone Your Fork

Clone the forked repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/Zaplink_frontend.git
cd Zaplink_frontend
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 3: Add Upstream Remote

Add the original repository as an upstream remote to keep your fork synced:

```bash
git remote add upstream https://github.com/gdg-charusat/Zaplink_frontend.git
```

Verify the remotes:

```bash
git remote -v
```

You should see:
- `origin` - your fork (https://github.com/YOUR-USERNAME/Zaplink_frontend.git)
- `upstream` - the original repository (https://github.com/gdg-charusat/Zaplink_frontend.git)

### Step 4: Install Dependencies

```bash
# Install all project dependencies
npm install
```

### Step 5: Start Development Server

```bash
# Start the Vite development server
npm run dev
```

The application should now be running at `http://localhost:5173`

### Step 6: Create a New Branch

**IMPORTANT**: Always create a new branch for your work. Never work directly on the `main` branch.

```bash
# First, sync your fork with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

**Branch Naming Convention:**
- `feature/` - for new features (e.g., `feature/add-login-page`)
- `fix/` - for bug fixes (e.g., `fix/navbar-responsive`)
- `docs/` - for documentation changes (e.g., `docs/update-readme`)
- `style/` - for styling changes (e.g., `style/improve-button-design`)
- `refactor/` - for code refactoring (e.g., `refactor/optimize-components`)

## 💻 Development Workflow

### 1. Pick an Issue

- Browse the [Issues](https://github.com/gdg-charusat/Zaplink_frontend/issues) page
- Look for issues labeled:
  - `good-first-issue` or `beginner` - for beginners (Level 1)
  - `intermediate` - for intermediate level (Level 2)
- **Comment on the issue** to let maintainers know you're interested
- **Wait for assignment** before starting work to avoid duplicate efforts

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's code style guidelines (see below)
- Test your changes thoroughly in the browser
- Ensure the application runs without errors or warnings

### 3. Test Your Changes

```bash
# Run the development server
npm run dev

# Build the project to check for errors
npm run build

# Run linting (if configured)
npm run lint
```

### 4. Commit Your Changes

Write clear, descriptive commit messages following the conventional commits format:

```bash
git add .
git commit -m "feat: add user authentication modal"
```

**Commit Message Format:**
- `feat:` - new feature (e.g., "feat: add dark mode toggle")
- `fix:` - bug fix (e.g., "fix: resolve navbar mobile responsiveness")
- `docs:` - documentation changes (e.g., "docs: update installation guide")
- `style:` - formatting, CSS changes (e.g., "style: improve button hover effects")
- `refactor:` - code restructuring (e.g., "refactor: simplify form validation logic")
- `test:` - adding tests (e.g., "test: add unit tests for auth service")
- `chore:` - maintenance tasks (e.g., "chore: update dependencies")

**Examples of Good Commit Messages:**
```bash
feat: implement user profile page with edit functionality
fix: correct responsive layout issue on mobile devices
style: update color scheme to match brand guidelines
docs: add API integration examples to README
refactor: extract reusable button component
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR-USERNAME/Zaplink_frontend`
2. Click **"Compare & pull request"** button
3. Fill out the PR template:
   - **Title**: Clear, descriptive title (e.g., "Add user authentication modal")
   - **Description**: Explain what changes you made and why
   - **Issue Reference**: Link the issue you're closing (e.g., "Closes #123")
   - **Screenshots**: Add before/after screenshots if UI changes are involved
4. Click **"Create pull request"**

## 📝 Issue Guidelines

### Finding Issues

Issues are categorized by difficulty level:

**Beginner Level (Good First Issues)**
- Simple UI fixes
- Adding basic components
- Documentation improvements
- Minor styling adjustments
- Labels: `good-first-issue`, `beginner`, `level-1`

**Intermediate Level**
- Complex component development
- State management implementation
- API integration
- Responsive design challenges
- Labels: `intermediate`, `level-2`

### Working on Issues

1. **Before starting**: Comment on the issue expressing your interest
2. **Get assigned**: Wait for a maintainer to assign you
3. **Ask questions**: If anything is unclear, ask in the issue comments
4. **Time commitment**: Try to complete within 3-5 days or update the maintainers
5. **Stuck?**: Ask for help in the issue or on the event Discord/WhatsApp

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code runs without errors
- [ ] All new components are properly typed (TypeScript)
- [ ] Tailwind CSS classes are used consistently
- [ ] Code follows the project's style guidelines
- [ ] Tested on different screen sizes (responsive design)
- [ ] No console errors or warnings
- [ ] Commit messages follow the conventional format

### PR Review Process

1. A maintainer will review your PR within 24-48 hours
2. You may be asked to make changes
3. Make the requested changes and push to the same branch
4. Once approved, your PR will be merged!

### Addressing Review Comments

```bash
# Make the requested changes
git add .
git commit -m "fix: address review comments"
git push origin feature/your-feature-name
```

The PR will automatically update with your new commits.

## 🎨 Code Style Guidelines

### TypeScript

```typescript
// ✅ Good - Proper typing
interface UserProps {
  name: string;
  email: string;
  age?: number;
}

const UserCard: React.FC<UserProps> = ({ name, email, age }) => {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      {age && <p className="text-sm">Age: {age}</p>}
    </div>
  );
};

// ❌ Bad - No types
const UserCard = ({ name, email, age }) => {
  return <div>...</div>;
};
```

### React Components

```typescript
// ✅ Good - Functional component with proper structure
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700" 
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  );
};

// ❌ Bad - Inline styles, no types
export const Button = ({ label, onClick }) => {
  return (
    <button style={{ padding: '10px' }} onClick={onClick}>
      {label}
    </button>
  );
};
```

### Tailwind CSS

```typescript
// ✅ Good - Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Click Me
  </button>
</div>

// ❌ Bad - Inline styles
<div style={{ display: 'flex', padding: '16px', background: '#fff' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
  <button style={{ padding: '8px 16px', background: '#3b82f6' }}>
    Click Me
  </button>
</div>
```

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`, `NavigationBar.tsx`)
- **Utils/Helpers**: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Types/Interfaces**: PascalCase in `.ts` files (e.g., `types.ts`, `interfaces.ts`)

### Folder Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── utils/           # Helper functions
├── types/           # TypeScript types and interfaces
├── styles/          # Global styles
└── assets/          # Images, fonts, etc.
```

## 🆘 Need Help?

- **Issue Discussion**: Comment on the issue you're working on
- **Discord/WhatsApp**: Join the GDG CHARUSAT event group
- **Maintainers**: Tag @maintainer-username in your issue comments
- **Documentation**: Check [React Docs](https://react.dev/), [Vite Docs](https://vitejs.dev/), [Tailwind Docs](https://tailwindcss.com/)

## 🎯 Tips for Success

1. **Start Small**: Begin with beginner issues to understand the codebase
2. **Read Existing Code**: Look at how similar features are implemented
3. **Ask Questions**: It's better to ask than to waste time going in the wrong direction
4. **Be Patient**: Code review takes time, be responsive to feedback
5. **Have Fun**: Open source is about learning and community!

## 📜 Code of Conduct

Please be respectful and professional in all interactions. We're here to learn and help each other grow.

---

**Happy Coding! 🚀**

If you have any questions or need clarification, feel free to reach out to the maintainers or ask in the issue comments.

Thank you for contributing to Zaplink!