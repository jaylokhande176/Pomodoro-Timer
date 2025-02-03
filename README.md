

---

# **Pomodoro Timer ⏳ (Electron.js App)**

A simple **Pomodoro Timer** built with **Electron.js** that helps you stay productive using the Pomodoro technique. This guide walks you through installing, running, and packaging the application into a Windows installer.

![25_00 - Pomodoro Timer 03_02_2025 17_30_25](https://github.com/user-attachments/assets/5323ab41-fa8b-4b58-be3a-5eae09355b36)


---

## **📌 Prerequisites**
Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/) (v16 or later)**
- **[npm](https://www.npmjs.com/) (Node Package Manager)**
- **Git (optional, for version control)**

### **🔹 Verify Installation**
Open a terminal (Command Prompt, PowerShell, or Git Bash) and run:

```sh
node -v
npm -v
```

If both commands return a version number, you're good to go! ✅

---

## **📂 1. Create a New Project**
If you're starting fresh, create a new project folder and navigate into it:

```sh
mkdir pomodoro-timer
cd pomodoro-timer
```


---

## **📦 2. Initialize the Project**
Run the following command to create a `package.json` file:

```sh
npm init -y
```

This generates a basic `package.json` file.

---

## **🛠 3. Install Electron**
Now, install Electron as a development dependency:

```sh
npm install --save-dev electron
```

---

## **💡 4. Set Up the Project Structure**
Ensure your project follows this structure:

```
pomodoro-timer/
│── node_modules/          # Dependencies
│── src/                   # Source code
│   │── index.html         # UI file
│   │── main.js            # Main process
│   │── renderer.js        # Renderer process
│   │── assets/            # Icons & assets
│── package.json           # Project metadata
│── package-lock.json      # Dependency lock file
│── forge.config.js        # Electron Forge config
│── .gitignore             # Ignored files
```

Move your `index.html`, `main.js`, and `renderer.js` into a **`src/`** folder.

---

## **🚀 5. Configure `package.json`**
Open `package.json` and modify the `main` property:

```json
"main": "src/main.js",
"scripts": {
  "start": "electron ."
}
```

Now, you can run the app using:

```sh
npm start
```

---

## **🛠 6. Install Electron Forge**
Electron Forge helps package the app into a Windows installer.

Run:

```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

This will configure your project with Electron Forge.

---

## **⚙ 7. Configure Electron Forge (`forge.config.js`)**
Create `forge.config.js` in the project root and add:

```js
module.exports = {
  packagerConfig: {
    icon: "./src/assets/icon", // Ensure you have an .ico file
    asar: true, // Package files into an archive for security
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "PomodoroTimer",
        setupExe: "PomodoroTimerSetup.exe",
        setupIcon: "./src/assets/icon.ico"
      }
    }
  ]
};
```

Ensure you have an **icon file (`.ico`)** inside `src/assets/`.

---

## **🔨 8. Build and Package the App**
To package the app and generate an installer:

```sh
npm run make
```

This will create the **installer** (`PomodoroTimerSetup.exe`) inside the `out/make/squirrel.windows/` folder.

---

## **📦 9. Test the Windows Installer**
1. Navigate to the `out/make/squirrel.windows/` directory.
2. Run **`PomodoroTimerSetup.exe`**.
3. Install the app and launch it!

The app will be installed in:

```
C:\Users\YourName\AppData\Local\PomodoroTimer\

```

A **desktop shortcut** will also be created.

---

