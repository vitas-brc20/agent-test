# Codebase Agent Dashboard

This project is a Codebase Agent Dashboard that monitors codebase tasks and agent activities. It is built using Next.js 16.2.3 and Tailwind CSS v4.

## Features

-   Displays a list of agent tasks fetched from Supabase.
-   Shows task status, details, branch/PR information, sender, and timestamps.
-   Real-time updates for task status.

## Getting Started

### Prerequisites

-   Node.js (version 18 or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
bash
    git clone <your-repository-url>
    cd github-agent


2.  **Install Dependencies:**
    The project uses Next.js 16.2.3 and Tailwind CSS v4. Ensure your Node.js environment is set up correctly.
bash
    npm install

    or
bash
    yarn install


3.  **Environment Variables:**
    This project requires Supabase credentials. Create a `.env.local` file in the root directory and add your Supabase URL and anonymous key:

env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project credentials.

### Running the Development Server

To start the development server, run:

bash
npm run dev
# or
yarn dev


Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure


/
├── app/
│   ├── page.js              # Main dashboard page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles with Tailwind CSS imports
├── public/                  # Static assets
├── scripts/                 # Utility scripts
├── utils/                   # Utility functions (e.g., supabase.js)
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── package.json             # Project dependencies and scripts
└── README.md                # This file


## Deployment

This project is configured for deployment with platforms like Vercel or Netlify. Ensure your environment variables are correctly set in your deployment environment.
