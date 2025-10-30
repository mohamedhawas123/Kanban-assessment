# 🗂️ Kanban To-Do List Dashboard

A fully interactive **Kanban-style task management app** built using modern frontend technologies.  
It helps organize tasks across four columns: **Backlog**, **In Progress**, **Review**, and **Done**.

---

## 🚀 Features

✅ **4 Columns (Kanban Board):**
- Backlog  
- In Progress  
- Review  
- Done  

✅ **CRUD Operations**
- Create, Update, and Delete tasks dynamically

✅ **Drag & Drop Support**
- Move tasks between columns with smooth animations (similar to Jira)

✅ **Pagination / Infinite Scroll**
- Efficiently load tasks in each column

✅ **Search Functionality**
- Search tasks by title or description

✅ **React Query Integration**
- Smart caching and data synchronization for better performance

---

## 🧪 Tech Stack

| Category | Options |
|-----------|----------|
| **Frontend** | React 
| **State Management** |  Redux |
| **Data Fetching** | React Query |
| **UI Library** |  Bootstrap |
| **API / Backend** | json-server (mocked locally) and for production used jsonbin |

---



## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```bash

git clone https://github.com/mohamedhawas123/Kanban-assessment.git
cd Kanban-assessment

npm install

npx json-server --watch db.json --port 4000


npm start


Bonus Task — jQuery Dynamic List

The bonus task is located in:

jquery-bonus/index.html


Features:

Input field + button to add items to a list

Empty input shows an error message (fades out after 2 seconds)

Add new items dynamically

Each item has a delete button

Delete action fades out the item before removal