<div align="center">
  <a href="https://teethseg.vercel.app/">
    <img src="https://github.com/Hamagistral/TeethSeg/assets/66017329/4a5c9cac-9a54-4da3-87a4-ba1af091eba7" alt="Banner" width="720">
  </a>

  <div id="user-content-toc">
    <ul>
      <summary><h1 style="display: inline-block;">TeethSeg</h1></summary>
    </ul>
  </div>
  
  <p>AI Based Automated Teeth Segmentation using MeshSegNet</p>
    <a href="https://teethseg-ai.vercel.app/" target="_blank">Live Preview</a>
    🦷
    <a href="https://github.com/Hamagistral/TeethSeg/issues" target="_blank">Request Feature</a>
</div>
<br>

## 📝 Table of Contents

1. [ Project Overview ](#introduction)
2. [ Key Features ](#features)
3. [ Project Architecture ](#arch)
4. [ Usage ](#usage)
5. [ Team ](#team)
6. [ Contact ](#contact)

<a name="introduction"></a>
## 🔬 Project Overview 

**TeethSeg** is a summer Internship Project made for "*3D SMART FACTORY*" a Moroccan company specializing in the 3D field. This project is a solution that simplifies the complex task of 3D dental scan segmentation. In the field of dentistry, analyzing intraoral scans is a critical component of treatment planning and evaluation. Traditionally, this process has been time-consuming and prone to errors. TeethSeg addresses these challenges by harnessing the power of deep learning and modern web technologies. Our team was charged with the task of first deploying the model as a REST API to be able to communicate with it via the web, and then building an interactive web application with a stylish and simple-to-use UI with integrated 3D visualizations.  

<a name="features"></a>
## 🔌 Key Features

- **3D Dental Scan Segmentation:** TeethSeg employs advanced deep learning techniques, utilizing the MeshSegNet model, to accurately segment teeth in 3D scans. This functionality is invaluable for dental professionals and researchers seeking precise and efficient analysis.

- **User-Friendly Interface:** The frontend of TeethSeg is designed with user-friendliness in mind. Built using Vite, React.js, Three.js, and VTK.js, it provides an intuitive platform for users to upload scans, initiate segmentation, and view results in real-time.

- **Seamless Cloud Integration:** TeethSeg's backend is hosted on the AWS Cloud, leveraging services such as Amazon Elastic Container Registry (ECR), AWS Lambda, and API Gateway. This architecture ensures scalability, reliability, and high availability.

- **Instant Visualization:** Users can upload their dental scans in OBJ format, kickstart the segmentation process, and immediately visualize the results. Furthermore, the segmented data can be downloaded in VTP format for further analysis.

- **Data Security and Privacy:** TeethSeg places a strong emphasis on data security and privacy, adhering to industry standards and regulations, particularly crucial when handling sensitive medical data.

With TeethSeg, dental professionals can save valuable time and enhance their diagnostic capabilities. Its accessibility and ease of use make it a valuable tool in the field of dentistry, while its robust architecture ensures reliable performance, even in demanding environments.  

<a name="arch"></a>
## 📝 Project Architecture

### ⚙️ Back End

![architecture-backend](https://github.com/Hamagistral/TeethSeg/assets/66017329/3eddbe6e-1afb-4a52-8128-006367c0d670)

There are two back-end branches:

- [Back end Locally](https://github.com/Hamagistral/TeethSeg/tree/backend_local)
- [Back end in AWS Cloud](https://github.com/Hamagistral/TeethSeg/tree/backend_aws)

### 🎨 Front End

![frontendarchitecture](https://github.com/Hamagistral/TeethSeg/assets/66017329/2fb117b5-8dc9-4ac6-a9f0-7f7a2a15e122)

For more see the [front end branch](https://github.com/Hamagistral/TeethSeg/tree/frontend).

### 🛠️ Technologies Used

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![nVIDIA](https://img.shields.io/badge/nVIDIA-%2376B900.svg?style=for-the-badge&logo=nVIDIA&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![ChatGPT](https://img.shields.io/badge/OpenAI-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-%23FF9900.svg?style=for-the-badge&logo=Firebase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<a name="usage"></a>
## 💻 Usage

1. Open the [TeethSeg](https://teethseg.vercel.app/) web application.
2. Sign In to your account.
3. Head to the "Start" page and upload your dental scan in OBJ format.
4. Click "Start Segmentation" to initiate the segmentation process.
5. Visualize the segmentation results in real-time.
6. Download the segmented VTP file for further analysis or visualization.

<a name="team"></a>
## 👥 Team

![image](https://github.com/Hamagistral/TeethSeg/assets/66017329/3608dd52-6d3f-4f88-8da8-f3592bc7d42e)

<a name="contact"></a>
## 📨 Contact Me

[LinkedIn](https://www.linkedin.com/in/hamza-elbelghiti/) •
[Website](https://Hamagistral.me) •
[Gmail](hamza.lbelghiti@gmail.com)
