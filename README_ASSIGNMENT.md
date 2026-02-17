# My Checkout Flow Project

## Overview

This is my implementation of the 3-step checkout flow. I built it using **Next.js 14** and focused on making it look as close to the Figma design as possible. Instead of using a big library for the form steps, I just used the **React Context API** to keep the data safe when moving between pages.

## How I Built It

- **Next.js 14:** For the overall structure and the API routes.  
- **Tailwind CSS:** To get the styling right (colors, spacing, etc.).  
- **Context API:** To make sure the info you type in Step 1 is still there if you go back from Step 2.  
- **Custom Validation:** I wrote my own functions to check things like email format and password length.  

## My Approach

### 1. Managing the Form Data
I didn't want to overcomplicate things with Redux, so I used a simple **CheckoutContext**. It holds all the data for **Account, Shipping, and Payment** in one place so I don't have to keep passing props around.

### 2. Form Validation
I set it up so the "Next" buttons only work if the fields are actually filled out correctly. I added those **blue checkmarks** from the design to show the user when they've finished a field properly.

### 3. Multiple Languages
I added support for **English and Swahili**. I used a simple JSON file for the translations and a hook to switch them out. I also made sure the **currency symbol changes** based on which language is picked.

### 4. Fake Backend
I created some **API routes in Next.js** to simulate a real checkout. I added a small delay to the response so you can actually see the **loading spinners** I added to the buttons.

## How to Run It

```bash
# Install dependencies
pnpm install

# Start the server
pnpm dev
````

Open [http://localhost:3000/checkout](http://localhost:3000/checkout) or [https://credstore-frontend-application.vercel.app/](https://credstore-frontend-application.vercel.app/)

## 📝 Reflections on the Task

**Why not use a library like Zustand?**
I felt like for just 3 steps, React's built-in Context was enough. It keeps the project lighter and shows I can handle state without needing extra tools.

**How did you do the card formatting?**
I wrote a small function that watches the input and adds the `" - "` spaces automatically as you type, which makes it feel a bit more professional.

**What would you add next?**
If I had more time, I'd probably add a way to **save the progress to the browser** so you don't lose your spot if you refresh the page. I'd also like to add some more **"success" animations** when the order is finished.
