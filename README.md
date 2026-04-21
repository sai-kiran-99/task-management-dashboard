📋 Task Management Dashboard

Tech Stack: React.js, Tailwind CSS, localStorage
Author: Sai Kiran Madala
Repository: https://github.com/sai-kiran-99/task-management-dashboard

🚀 Project Overview

A fully functional Task Management Dashboard built using React.js and Tailwind CSS.

This application allows users to:

Create, edit, delete, and manage tasks
Track progress with real-time updates
Filter and search tasks efficiently
Persist data across sessions using localStorage

It features a responsive UI, List & Card views, and Dark/Light mode support for an enhanced user experience.

🌐 Live Demo

🔗 https://task-management-dashboard-azure.vercel.app/

✨ Features
Feature	Description
📝 Task Creation	Create tasks with Title, Description, Priority (Low/Medium/High), and Due Date using a modal form
✏️ Task Editing	Edit existing tasks with pre-filled data using the same modal
🗑️ Task Deletion	Delete tasks with a confirmation dialog to prevent accidental removal
✅ Status Management	Toggle between Pending and Completed (with strikethrough UI)
🔍 Search & Filter	Real-time search by title/description + filter by status and priority
📊 Stats Bar	Displays Total, Pending, and Completed tasks dynamically
🔄 View Toggle	Switch between List view and Card view
🌙 Dark / Light Mode	Theme toggle with preference saved in localStorage
💾 Data Persistence	Tasks stored in localStorage — survives refresh
📱 Responsive Design	Works across desktop, tablet, and mobile
🛠️ Tech Stack
Technology	Version	Purpose
React.js	19.x	UI library (component-based architecture)
Tailwind CSS	3.x	Utility-first styling
uuid	latest	Unique task IDs
localStorage	Browser API	Client-side persistence
Create React App	5.x	Project setup & tooling
📁 Folder Structure
src/
├── components/   # UI components
├── hooks/        # Custom React hooks
├── context/      # Global state management (Context API)
├── utils/        # Helper functions
├── constants/    # App-wide constants (STATUS, PRIORITY)
⚙️ Getting Started (Local Setup)
1. Clone the repository
git clone https://github.com/sai-kiran-99/task-management-dashboard.git
2. Navigate to the project
cd task-management-dashboard
3. Install dependencies
npm install
4. Start development server: npm start

Built by Sai Kiran Madala — crafted with speed, efficiency, and attention to detail. Excited about the possibility of discussing this in an interview.🤞


<p align="center">
  <img src="./assets/dashboard.png" alt="Dashboard Preview" width="800"/>
</p>