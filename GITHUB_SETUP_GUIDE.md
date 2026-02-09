# 🚀 Git Setup & GitHub Push Guide

## Step-by-Step Instructions to Push Your Portfolio to GitHub

Follow these steps **in order** to upload your portfolio to GitHub.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Git installed on your computer
- ✅ GitHub account created
- ✅ Repository created on GitHub: `https://github.com/Akshukla12/PORTFOLIO2311.git`

---

## 🔧 Step 1: Open Terminal/Command Prompt

1. **Open PowerShell** or **Command Prompt**
2. **Navigate to your portfolio folder:**

```bash
cd C:\Users\ASUS\OneDrive\Desktop\portfolio
```

---

## 📝 Step 2: Create README.md File

Run this command to create a README file:

```bash
echo "# PORTFOLIO2311" >> README.md
```

**What this does:** Creates a README.md file with the title "PORTFOLIO2311"

---

## 🎯 Step 3: Initialize Git Repository

Run this command:

```bash
git init
```

**What this does:** Initializes a new Git repository in your portfolio folder

**Expected output:**
```
Initialized empty Git repository in C:/Users/ASUS/OneDrive/Desktop/portfolio/.git/
```

---

## ➕ Step 4: Add All Files to Git

Run this command:

```bash
git add .
```

**What this does:** Stages ALL files in your portfolio folder for commit

**Note:** The `.` means "all files in current directory"

**Alternative (if you want to add specific files):**
```bash
git add README.md
git add index.html
git add css/
git add js/
git add assets/
```

---

## 💾 Step 5: Create First Commit

Run this command:

```bash
git commit -m "first commit"
```

**What this does:** Creates your first commit with the message "first commit"

**Expected output:**
```
[main (root-commit) abc1234] first commit
 XX files changed, XXXX insertions(+)
 create mode 100644 README.md
 create mode 100644 index.html
 ...
```

---

## 🌿 Step 6: Rename Branch to 'main'

Run this command:

```bash
git branch -M main
```

**What this does:** Renames your default branch from 'master' to 'main'

---

## 🔗 Step 7: Add Remote Repository

Run this command:

```bash
git remote add origin https://github.com/Akshukla12/PORTFOLIO2311.git
```

**What this does:** Links your local repository to your GitHub repository

**To verify it worked:**
```bash
git remote -v
```

**Expected output:**
```
origin  https://github.com/Akshukla12/PORTFOLIO2311.git (fetch)
origin  https://github.com/Akshukla12/PORTFOLIO2311.git (push)
```

---

## 🚀 Step 8: Push to GitHub

Run this command:

```bash
git push -u origin main
```

**What this does:** Uploads all your files to GitHub

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XX.XX KiB | XX.XX MiB/s, done.
Total XX (delta X), reused 0 (delta 0), pack-reused 0
To https://github.com/Akshukla12/PORTFOLIO2311.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

**If prompted for credentials:**
- Enter your GitHub username
- Enter your GitHub Personal Access Token (NOT your password)

---

## 🎉 Success!

Your portfolio is now on GitHub! Visit:
```
https://github.com/Akshukla12/PORTFOLIO2311
```

---

## 📝 Complete Command Summary

Here are all the commands in order (copy-paste friendly):

```bash
# 1. Navigate to portfolio folder
cd C:\Users\ASUS\OneDrive\Desktop\portfolio

# 2. Create README
echo "# PORTFOLIO2311" >> README.md

# 3. Initialize Git
git init

# 4. Add all files
git add .

# 5. Create first commit
git commit -m "first commit"

# 6. Rename branch to main
git branch -M main

# 7. Add remote repository
git remote add origin https://github.com/Akshukla12/PORTFOLIO2311.git

# 8. Push to GitHub
git push -u origin main
```

---

## 🔍 Troubleshooting

### Problem: "git is not recognized"
**Solution:** Install Git from https://git-scm.com/download/win

### Problem: "Permission denied"
**Solution:** You need a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use it as your password when pushing

### Problem: "Repository not found"
**Solution:** Make sure the repository exists on GitHub:
- Go to https://github.com/Akshukla12/PORTFOLIO2311
- If it doesn't exist, create it first

### Problem: "fatal: remote origin already exists"
**Solution:** Remove and re-add the remote:
```bash
git remote remove origin
git remote add origin https://github.com/Akshukla12/PORTFOLIO2311.git
```

### Problem: Files not uploading
**Solution:** Check if files are staged:
```bash
git status
```
Then add them:
```bash
git add .
git commit -m "Add all files"
git push
```

---

## 📚 Useful Git Commands

### Check status
```bash
git status
```

### View commit history
```bash
git log
```

### View remote repositories
```bash
git remote -v
```

### Add more files later
```bash
git add .
git commit -m "Update portfolio"
git push
```

### Create .gitignore (optional)
```bash
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

---

## 🌐 Enable GitHub Pages (Optional)

After pushing, you can host your portfolio for free:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://akshukla12.github.io/PORTFOLIO2311/`

---

## ✅ Checklist

Before pushing, make sure:
- [ ] Git is installed
- [ ] You're in the correct folder
- [ ] GitHub repository exists
- [ ] You have your GitHub credentials ready
- [ ] All files are saved

After pushing, verify:
- [ ] Files appear on GitHub
- [ ] README.md is visible
- [ ] All folders (css, js, assets) are uploaded
- [ ] index.html is present

---

## 🎯 Quick Reference

| Command | What it does |
|---------|--------------|
| `git init` | Initialize repository |
| `git add .` | Stage all files |
| `git commit -m "message"` | Save changes |
| `git push` | Upload to GitHub |
| `git status` | Check current status |
| `git log` | View history |
| `git remote -v` | View remote URLs |

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Look in the Troubleshooting section above
3. Search the error on Google
4. Ask for help with the specific error message

---

**Good luck! 🚀**

Your portfolio will be live on GitHub in just a few minutes!
