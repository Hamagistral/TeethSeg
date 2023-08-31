import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { AppWindow, Database, Download } from "lucide-react";
import { useState } from "react";
import { cn } from './../lib/utils';


function Docs() {
    const [frontend, setFrontend] = useState(true);
    const [backend, setBackend] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDownload = (filename) => {
        setLoading(true)

        setTimeout(() => {
            const pdfUrl = `./docs/${filename}.pdf`;
          
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.target = '_blank'; 
            link.download = `${filename}.pdf`; 
            link.click();
            setLoading(false)
        }, 2000)
    };

    return (
        <div className="flex-box flex-col">
        <Header />
        <div className="text-white h-full w-full py-10 scroll-smooth bg-slate-800">
            <div>
                <div className="text-center flex-box flex-col md:flex-row gap-12 w-full">
                    <button
                        onClick={() => {setFrontend(true); setBackend(false);}}
                        className={cn("bg-slate-900 font-semibold py-4 px-8 hover:bg-slate-100 hover:text-slate-900 leading-tight rounded-lg transition ease-linear", frontend ? "bg-white text-slate-900 hover:bg-white" : "")}
                    >
                        <div className="flex items-center whitespace-nowrap">
                            <AppWindow className="mx-2" />
                            Front End Docs
                        </div>
                    </button>
                    <button
                        onClick={() => {setFrontend(false); setBackend(true);}}
                        className={cn("bg-slate-900 font-semibold py-4 px-8 hover:bg-slate-100 hover:text-slate-900 leading-tight rounded-lg transition ease-linear", backend ? "bg-white text-slate-900 hover:bg-white" : "")}
                    >
                        <div className="flex items-center whitespace-nowrap">
                            <Database className="mx-2" />
                            Back End Docs
                        </div>
                    </button>
                </div>
            </div>

            <div className="lg:px-72 px-4">
                {frontend && 
                    <>  
                        <div className="flex justify-between">
                            <div className="flex mt-12 ml-2">
                                <AppWindow className="mr-4 text-blue-500" size={42}/>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">Front End Documentation</h2>
                            </div>
                            
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => {handleDownload("FrontEnd Documentation - TeethSeg")}}
                                    className={cn("text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2", loading? "hover:bg-gradient-to-bl " : "bg-slate-900" , backend ? "bg-white text-slate-900 hover:bg-white" : "")}
                                >
                                    <div className="flex items-center whitespace-nowrap">
                                        <Download className="mx-2" />
                                        {loading ? "Downloading the file..." : "Download as PDF"}
                                    </div>
                                </button>
                            </div>
                        </div>
                        

                        <div className="mt-12">
                            <h3 className="text-3xl font-bold ml-4">I. Front End Description</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>
                                TeethSeg is a web application built using Vite with ReactJS and 3D libraries like Three.js and VTK.js. It utilizes the MeshSegNet deep learning model for 3D tooth segmentation. Users can create an account, sign in with Google or Github, and access the segmentation tools in the <a className="text-blue-500 hover:text-blue-400" href="/start">Start</a> page. The application provides two primary features:<br/><br/>
                                </p>

                                <p>
                                1. <strong>OBJ Segmentation:</strong> Upload an OBJ file, click 'Segment OBJ File', then 'Start Segmentation' to segment the file. Visualize and download the segmentation result in VTP format.<br/><br/>

                                2. <strong>VTP Visualization:</strong> Visualize a VTP file by clicking 'Visualize VTP File'.
                                </p>
                            </div>
                            

                            <h3 className="text-3xl font-bold mt-8 ml-4">II. Directory Structure</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>
                                The front end directory includes the following elements:
                                </p>

                                <div>
                                    .<br />
                                    ├───<strong>node_modules/:</strong> Le répertoire où sont stockés les bibliothèques et les modules externes nécessaires pour exécuter et développer votre projet Vite. <br/>
                                    ├───<strong>public/:</strong> Ce répertoire contient des fichiers statiques qui seront directement accessibles par le navigateur. <br/>
                                    │   ├───<strong>supervisors/:</strong> Contient les images des encadrants.<br/>
                                    │   └───<strong>team/:</strong> Contenient les images des membres de notre équipe.<br/>
                                    └───<strong>src/:</strong> Le répertoire source principal de notre application.<br/>
                                    │   ├───<strong>assets/:</strong> Les ressources statiques de votre application; images et des polices.<br/>
                                    │   │   |───<strong>tech/:</strong> Contient des images liées aux technologies utilisées.<br/>
                                    │   ├───<strong>components/:</strong> Les composants réutilisables de notre application.<br/>
                                    │   │   ├───<strong>shared/:</strong> Composants partagés à travers toute l'application.<br/>
                                    │   │   └───<strong>ui/:</strong>/ Composants d'interface utilisateur spécifiques à notre application.<br/>
                                    │   ├───<strong>config/:</strong> Fichiers de configuration de l'application.<br/>
                                    │   ├───<strong>data/:</strong> Données statiques ou fichiers JSON utilisés dans notre application.<br/>
                                    │   ├───<strong>helpers/:</strong> Fonctions utilitaires utilisées dans diverses parties de l'application.<br/>
                                    │   ├───<strong>lib/:</strong> Bibliothèques ou modules personnalisés utilisés dans l'application.<br/>
                                    │   ├───<strong>routes/:</strong> Fichiers représentent la structure de routage entre les pages.<br/>
                                    │   ├───<strong>services/:</strong> Services organisés en fonction des différentes sections de l'app.<br/>
                                    │   │   ├───<strong>about/:</strong> Sous-dossiers correspondant à la partie de A propos.<br/>
                                    │   │   ├───<strong>contact/:</strong> Sous-dossiers correspondant à la partie de contact.<br/>
                                    │   │   ├───<strong>footer/:</strong> Sous-dossiers correspondant à la partie du pied des pages.<br/>
                                    │   │   ├───<strong>header/:</strong> Sous-dossiers correspondant à la partie d’en-tête des pages.<br/>
                                    │   │   └───<strong>main/:</strong> Sous-dossiers correspondant à la partie des fonctionnalités.<br/>
                                    │   └───<strong>styles/:</strong> Fichiers CSS ou préprocesseurs pour la mise en forme.<br/>
                                    └── <strong>.gitignore:</strong> Les fichiers et dossiers qu'on ignore lors du push sur Github.<br/>
                                    └── <strong>.env:</strong> Stores environment variables.<br/>
                                </div>

                                <img className="rounded-lg mt-4 w-full h-full" src="./frontend-directory.PNG"/>
                            </div>

                            <h3 className="text-3xl font-bold mt-8 ml-4">III. Installation</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>
                                To install the application, clone the project repository using the following command:

                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-yellow-500">
                                            git
                                        </span>

                                        <span className="flex-1">
                                            clone https://github.com/3DSF-Internship/TeethSeg.git
                                        </span>
                                    </span>
                                </code>

                                Install the necessary dependencies by running:

                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-blue-500">
                                            npm
                                        </span>

                                        <span className="flex-1">
                                            install
                                        </span>
                                    </span>
                                </code>

                                Usage: Run the application using:<br/>

                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-blue-500">
                                            npm
                                        </span>

                                        <span className="flex-1">
                                            run dev
                                        </span>
                                    </span>
                                </code>

                                This will start the application in your default browser, accessible at <strong>http://localhost:3000</strong>
                                </p>
                            </div>

                            <h3 className="text-3xl font-bold mt-8 ml-4">IV. Configuration</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p><strong>API Configuration:</strong>
                                <br />
                                <br />
                                The application communicates with the OpenAI API for chat completion for our AI assistant chatbot and Firebase API for client authentication. API configurations are managed through the Configuration classes provided by OpenAI and Firebase.<br/><br />

                                <strong>Environment Variables:</strong><br /><br />
                                
                                The application relies on environment variables for API access:<br /><br />

                                - <strong>VITE_FIREBASE_KEY:</strong> {'<'} Firebase API key {'>'}<br />
                                - <strong>VITE_MEASUREMENT_ID:</strong> {'<'} Firebase measurement ID {'>'}<br />
                                - <strong>VITE_MESSAGING_SENDER_ID:</strong> {'<'} Firebase messaging sender ID {'>'}<br />
                                - <strong>VITE_APP_ID:</strong> {'<'} Firebase app ID {'>'}<br />
                                - <strong>VITE_OPENAI_KEY:</strong> {'<'} OpenAI API key {'>'} <br />
                                - <strong>VITE_ORGANIZATION_KEY:</strong> {'<'} OpenAI organization key {'>'}
                                </p>
                            </div>

                        </div>
                    </>
                }

                {backend && 
                    <>
                        <div className="flex justify-between">
                            <div className="flex mt-12 ml-2">
                                <Database className="mr-4 text-blue-500" size={42}/>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent ">Back End Documentation</h2>
                            </div>
                            
                            
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => {handleDownload("BackEnd Documentation - TeethSeg")}}
                                    className={cn("text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2", loading? "hover:bg-gradient-to-bl" : "bg-slate-900" ,frontend ? "bg-white text-slate-900 hover:bg-white" : "")}
                                >
                                    <div className="flex items-center whitespace-nowrap">
                                        <Download className="mx-2" />
                                        {loading ? "Downloading the file..." : "Download as PDF"}
                                    </div>
                                </button>
                            </div>
                        </div>
                        

                        <div className="mt-12">
                            <h3 className="text-3xl font-bold mt-8 ml-4">I. Back End Structure</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>
                                The backend of TeethSeg is a RESTful API developed using Python FastAPI, ensuring robust functionality and reliability. For deployment we used the AWS Cloud using the Amazon Elastic Container Registry (ECR), Lambda and API Gateway services. Here's the architecture of the backend in the AWS Cloud.
                                </p>
                                <img className="rounded-lg mt-4 w-full h-full" src="./designBackend.png"/>
                                <p className=" mt-4 w-full h-full">
                                    Note: You can deploy the backend on your own server by following the installation instructions provided below.
                                </p>
                            </div>

                            <h3 className="text-3xl font-bold mt-8 ml-4">II. Project Structure</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                .<br />
                                ├── <strong>model/ :</strong> Stores pre-trained MeshSegNet models.<br />
                                ├── <strong>temp/ :</strong> Temporary file storage during processing.<br />
                                ├── <strong>output/ :</strong> Stores files generated by the model for API responses.<br />
                                ├── <strong>config.py:</strong> Configuration and model loading.<br />
                                ├── <strong>helper.py:</strong>  Utility functions for APIs.<br />
                                ├── <strong>main.py:</strong> Defines API endpoints.<br />
                                ├── <strong>meshsegnet.py:</strong> Encapsulates MeshSegNet's architecture and methods.<br />
                                ├── <strong>model.py:</strong> Contains `predict` and `predict_alpha` functions for 3D segmentation.<br />
                                ├── <strong>setup.py:</strong>Installs required packages and configures the workspace.<br />
                                ├── <strong>install-requirements.ps1:</strong> Configures the project on Windows.<br />
                                ├── <strong>install-requirements.sh:</strong> Configures the project on Linux/macOS.<br />
                                ├── <strong>Dockerfile:</strong> Used for deployment to Render hosting.<br />
                                ├── <strong>requirements.txt:</strong>  Lists backend package dependencies.<br />
                                ├── <strong>README:</strong> Provides installation, configuration, and project information.<br />
                                ├── <strong>venv:</strong> Isolated environment for Python projects.<br />
                                └── <strong>License:</strong> Project licensed under MIT License.
                            </div>

                            <h3 className="text-3xl font-bold mt-8 ml-4">IV. Installation</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>To set up and run the backend locally:
                                <br />
                                <br />
                                1. You can run the <strong>setup.py</strong> script to configure you're project. <br />
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-yellow-500">
                                            python
                                        </span>

                                        <span className="flex-1">
                                            setup.py
                                        </span>
                                    </span>
                                </code>
                                
                                Or by following these instruction: <br /><br />
                                
                                2. Create a new venv.<br />
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-yellow-500">
                                            py
                                        </span>

                                        <span className="flex-1">
                                            -m venv venv
                                        </span>
                                    </span>
                                </code>
                                3. Activate venv (Windows)
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="flex-1">
                                            ./venv/Scripts/activate
                                        </span>
                                    </span>
                                </code>
                                4. Install dependencies
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>
                                        
                                        <span className="text-blue-500">
                                            pip
                                        </span>

                                        <span className="flex-1">
                                        install -r requirements.txt
                                        </span>
                                    </span>
                                </code>
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>
                                        
                                        <span className="text-blue-500">
                                            pip
                                        </span>

                                        <span className="flex-1">
                                        install pygco
                                        </span>
                                    </span>
                                </code>
                                5. Run server<br /><br />
                                After configuring you're project now you can run the app using uvicorn. <br />
                                <code
                                    className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-slate-900 text-white rounded-lg p-4 pl-6 w-full my-2">
                                    <span className="flex gap-4">
                                        <span className="shrink-0 text-slate-400">
                                            $
                                        </span>

                                        <span className="text-emerald-500">
                                            uvicorn
                                        </span>

                                        <span className="flex-1">
                                            main:app --reload
                                        </span>
                                    </span>
                                </code>

                                </p>
                            </div>

                            <h3 className="text-3xl font-bold mt-8 ml-4">V. API Endpoints</h3>
                            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                                <p>Here's the available endpoints and the methods to call them:
                                    <br />
                                    <br />
                                    - <strong>GET "/":</strong> Description of the API and its routes<br />
                                    - <strong>POST "/api/v1/predict":</strong> Without post-proccessing (this will not give a good result)<br />
                                    - <strong>POST "/api/v1/predict/post_processing":</strong> With post-proccessing (The segmentation with post proccessing is more precise) <br />
                                    <br />
                                    Go to <strong>http://localhost:8000/</strong> if you see a message like  <code className="rounded-lg p-1 bg-slate-900">"message": "Hi 3DSF Interns!"</code> everything is working correctly.
                                </p>
                                <p className="text-red-400 mt-4">
                                    Make sure to call <strong>"/api/v1/predict"</strong> and <strong>"/api/v1/predict/post_processing"</strong> endpoints with the POST method.
                                </p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Docs;
