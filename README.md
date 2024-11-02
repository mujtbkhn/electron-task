# Electron Notes App

A simple note-taking application built with Electron.js that allows users to create, view, and edit notes with persistent storage.

## Features

- Clean and intuitive user interface
- Persistent note storage using JSON file
- Create and edit notes with title and content
- Side panel listing all saved notes
- Real-time preview of note content in the list
- Automatic saving of notes
- Timestamp tracking for all notes

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mujtbkhn/electron-task.git
   ```

2. Navigate to the project directory:
   ```bash
   cd electron-task
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the application in development mode:
```bash
npm start
```

## Usage

1. Click "+ New Note" to create a new note
2. Enter a title and content for your note (both are required)
3. Click "Save Note" to save your changes
4. Your notes will appear in the sidebar
5. Click any note in the sidebar to view or edit it

## Technical Details

- Built with Electron.js
- Uses electron-store for persistent storage
- Implements main and renderer processes
- Data stored in JSON format
- Clean separation of concerns between UI and data management

## Project Structure

```
electron-task/
├── main.js              # Main Electron process
├── index.html           # Application UI
├── renderer.js          # Renderer process
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```

## Assignment Requirements Fulfilled

✅ Electron.js project setup  
✅ Main and renderer process configuration  
✅ Simple and intuitive UI  
✅ Text area for note editing  
✅ List view for saved notes  
✅ Save functionality  
✅ Persistent storage implementation  
✅ Load and display saved notes  
✅ Note selection and editing  
✅ Clean and user-friendly interface  

## Storage Location

Notes are stored in a JSON file located at:
- Windows: `%APPDATA%/electron-notes-app/notes-db.json`
