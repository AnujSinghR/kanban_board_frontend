# Kanban Board App

This is a Kanban board application built with Next.js and TypeScript. It allows users to create and manage boards and tasks.

## Features

- Create new boards
- List all boards
- Manage tasks within each board

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kanban-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/app/layout.tsx`: Defines the layout for the application.
- `src/app/page.tsx`: Main entry point for the application.
- `src/components/BoardList.tsx`: Component for fetching and displaying boards.
- `src/components/CreateBoardForm.tsx`: Component for creating new boards.
- `src/types/index.ts`: TypeScript interfaces for data structures.
- `src/utils/api.ts`: Utility functions for API calls.

## Contributing

Feel free to submit issues or pull requests to improve the project!