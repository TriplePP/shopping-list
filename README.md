# Shopping List App - Mayden Coding Assessment

(README CREATED BY CLAUDE SONNET 4.5)

NB: I USED AI FOR THE README AND THE CSS IN THIS PROJECT. THE REST WAS COMPLETELY CREATED BY ME.

A React-based shopping list application built for the Mayden Developer Recruitment Coding Challenge.

**Live Demo:** [https://shopping-list-omega-three.vercel.app/](https://shopping-list-omega-three.vercel.app/)

## Overview

This application helps users manage their grocery shopping by providing an intuitive interface to add, organize, and track items while staying within budget. All data persists between sessions using browser localStorage.

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library
- **Persistence:** localStorage
- **Deployment:** Vercel

## Features Implemented

All 9 user stories from the coding challenge have been successfully implemented:

### ✅ Story 1: View Shopping List

Users can view all items on their shopping list with names and prices displayed clearly.

### ✅ Story 2: Add Items

Users can add new items to their shopping list by entering:

- Item name
- Item price

### ✅ Story 3: Remove Items

Users can remove items from the list using the "Remove" button on each item.

### ✅ Story 4: Mark Items as Purchased

Users can mark items as purchased by clicking the ✓ icon, which applies a strikethrough style to indicate the item has been picked up.

### ✅ Story 5: Data Persistence

Shopping list state persists between page visits using localStorage, so users can access their list when returning to the supermarket.

### ✅ Story 6: Reorder Items

Users can reorder items using the ↑ and ↓ arrow buttons to maintain their preferred shopping route through the supermarket.

### ✅ Story 7: Total Price Display

The application displays the total cost of all items in the shopping list in real-time.

### ✅ Story 8: Spending Limit Alert

A spending limit of £10 is enforced, with an alert displayed when users exceed their budget, helping them stay within financial constraints.

### ✅ Story 9: Email Sharing

Users can share their shopping list via email using the "Email my shopping list" button, which opens their default email client with the list pre-populated.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/TriplePP/shopping-list.git
cd shopping-list
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Running Tests

Execute the test suite:

```bash
npm test
```

The test suite includes comprehensive unit tests covering:

- Component rendering
- Adding and removing items
- Item reordering functionality
- Spending limit alerts
- Email functionality
- localStorage persistence

### Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Usage

1. **Adding Items:** Enter an item name and price, then click "Add Item"
2. **Removing Items:** Click the "Remove" button next to any item
3. **Marking as Purchased:** Click the ✓ icon to mark an item as picked up
4. **Reordering:** Use the ↑ and ↓ arrows to move items up or down in the list
5. **Budget Tracking:** View the total cost and spending limit at all times
6. **Sharing:** Click "Email my shopping list" to send the list to someone else

## Project Structure

```
shopping-list/
├── src/
│   ├── components/
│   │   └── ShoppingList.tsx    # Main shopping list component
│   ├── test/
│   │   ├── setup.ts            # Test configuration
│   │   └── ShoppingList.test.tsx # Component tests
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── vite.config.ts             # Vite configuration
```

## Time Commitment

This project was completed within the allocated 6-hour timeframe for the coding challenge.
