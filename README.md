# 🦷 TeethSeg FrontEnd 

## I. Front End Description
TeethSeg is a web application built using Vite with ReactJS and 3D libraries like Three.js and VTK.js. It utilizes the MeshSegNet deep learning model for 3D tooth segmentation. Users can create an account, sign in with Google or Github, and access the segmentation tools in the Start page. The application provides two primary features:  

1. OBJ Segmentation: Upload an OBJ file, click 'Segment OBJ File', then 'Start Segmentation' to segment the file. Visualize and download the segmentation result in VTP format.

2. VTP Visualization: Visualize a VTP file by clicking 'Visualize VTP File'.

## II. Directory Structure

The front end directory includes the following elements:

.
├── node_modules/ : Directory for external project modules.
├── public/ : Folder with browser-accessible static files.
│ ├── supervisors/ : Contains images of supervisors.
│ └── team/ : Contains images of contributors of our group.
├── src/ : The main source directory of our application.
│ ├── assets/ : The static resources of your application; images and fonts.
│ │ └── tech/ : Contains images related to the technologies used.
│ ├── components/ : The reusable components of our application.
│ │ ├── shared/ : Components shared throughout the application.
│ │ └── ui/ : UI components specific to our application.
│ ├── config/ : Application configuration files.
│ ├── data/ : Static data or JSON files used in our application.
│ ├── helpers/ : Utility functions used in various parts of the application.
│ ├── lib/ : Custom libraries or modules used in the application.
│ ├── routes/ : Files representing the routing structure between pages.
│ ├── services/ : Services organized based on different sections of the app.
│ │ ├── about/ : Subfolders corresponding to the about section.
│ │ ├── contact/ : Subfolders corresponding to the contact section.
│ │ ├── footer/ : Subfolders corresponding to the footer part of pages.
│ │ ├── header/ : Subfolders corresponding to the header part of pages.
│ │ └── main/ : Subfolders corresponding to the main functionality.
│ └── styles/ : CSS files or preprocessors for styling.
├── .gitignore : Git ignored files and folders.
├── .env : Stores environment variables.
└── License : Project licensed under the MIT License.

## III. Installation

To install the application, clone the project repository using the following command:

```
git clone https://github.com/3DSF-Internship/TeethSeg.git*
```

Install the necessary dependencies by running:

```
npm install
```

### Usage

Run the application using:

```
npm run dev
```

This will start the application in your default browser, accessible at http://localhost:3000

## IV. Configuration

### API Configuration:

The application communicates with the OpenAI API for chat completion for our AI assistant chatbot and Firebase API for client authentication. API configurations are managed through the Configuration classes provided by OpenAI and Firebase.

### Environment Variables:

The application relies on environment variables for API access:

- VITE_FIREBASE_KEY: < Firebase API key >
- VITE_MEASUREMENT_ID: < Firebase measurement ID >
- VITE_MESSAGING_SENDER_ID: < Firebase messaging sender ID >
- VITE_APP_ID: < Firebase app ID >
- VITE_OPENAI_KEY: < OpenAI API key >
- VITE_ORGANIZATION_KEY: < OpenAI organization key >