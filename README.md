# 🧠 Health Analytics Dashboard

A visual analytics dashboard built with **React** and **Tailwind CSS** to explore medical and hospital-related data through interactive pie charts and hierarchical tree graphs.

![Home Page](![3](https://github.com/user-attachments/assets/85b4692e-f765-412a-930d-34f9f39de74f))
![Pie Chart](![1](https://github.com/user-attachments/assets/961547dd-e93b-42fe-86a1-09dc5381dbf1))
![Tree Graph](![2](https://github.com/user-attachments/assets/818f9cca-6f2f-456b-9ee8-2bcc91443184))

---

## ✨ Features

- 📊 Interactive **Pie Charts** with dropdown filters
- 🌲 Dynamic **Tree Graphs** with two switchable hierarchy modes
- 🧩 Modular component structure with dedicated pages for each visualization
- ⚡ Smooth transitions and responsive layout

---

## 📐 Visualization Modes

### 🗂️ Pie Chart

- View distribution based on selected categories:
  - City
  - Disease Manner
  - Patient Injury Zone
  - First Symptom

### 🌳 Tree Graph

- **Mode 1: Location-Based Hierarchy**
  - State → City → Cancer Kind
  - 🌊 Malignant: Light Blue  
  - 🌌 Benign: Slightly Darker Blue

- **Mode 2: Condition-Based Hierarchy**
  - Patient Condition → Disease Type → Hospital Characteristics → Treatment Factors
  - 🟡 Private Hospitals: Shades of Yellow  
  - 🟠 Government Hospitals: Shades of Orange

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS, Lucide Icons
- **Routing:** React Router
- **Visualization Libraries:** 
  - Recharts (Pie Charts)
  - D3.js (Hierarchical Tree Graphs)

---

## 🚀 Installation & Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/health-analytics-dashboard.git
cd health-analytics-dashboard
```

### 2. Install dependencies

```bash
npm install
```

 ### 3. Start the development server

 ```bash
npm run dev
```

