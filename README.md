<img width="1919" height="907" alt="Screenshot 2025-11-06 105720" src="https://github.com/user-attachments/assets/265d5a56-427e-41df-971b-fcc678d655b8" />

# Game Overview

This **Tic-Tac-Toe** app is a small interactive game built with **React** and **Vite**.  
You play on a **3x3 grid**, taking turns as **X** or **O** until someone gets three in a row or the board fills up with a draw.

---

## Project Structure

The game lives inside the `src/` folder:

- **`src/App.tsx`** – Renders the full page layout.  
- **`src/components/Board.tsx`** – Draws the 3x3 grid and handles clicks.  
- **`src/components/Square.tsx`** – Shows each square’s current symbol.  
- **`src/store/gameStore.ts`** – Keeps the shared game state in a Zustand store.  
- **`src/styles/`** – Holds Tailwind utility styles used across the app.

---

## State Management

**Zustand** provides a lightweight store so every component can read the same game state.  
The store tracks:

- Whose turn it is  
- The board’s nine squares  
- Whether someone has won  
- Helpers to reset the game or jump to a fresh round  

Components subscribe to the store and **re-render only when the parts they care about change**, keeping the UI fast and efficient.

---

## Game Flow

1. The board starts empty with player **X**.  
2. Players alternate turns by clicking empty squares.  
3. After every move, the store checks for a **win** or **draw** and updates the status banner.  
4. A **reset button** clears the board and switches the starting player for the next round.

---

## Styling

**Tailwind CSS** handles spacing, layout, and colors.  
The board uses **responsive flexbox utilities** so it stays centered on different screen sizes.
