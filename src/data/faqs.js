const faqs = [
  {
    question: "What is TeethSeg?",
    answer:
      "TeethSeg is a summer 2023 internship project developed for '3D SMART FACTORY' in Morocco. It employs MeshSegNet, a deep learning model, for precise segmentation of 3D teeth models.",
  },
  {
    question: "What technologies power TeethSeg's front end?",
    answer:
      "TeethSeg's front end is built using Vite, ReactJS, and incorporates libraries like ThreeJS and VTKjs to enhance the 3D visualization experience.",
  },
  {
    question: "How is the backend of TeethSeg structured?",
    answer:
      "TeethSeg's backend utilizes a FastAPI-based RESTful API, coded in Python. This API is seamlessly deployed on the AWS Cloud using AWS ECR, Lambda, and API Gateway services.",
  },
  {
    question: "Can you explain the working principle of MeshSegNet?",
    answer:
      "MeshSegNet, the core of TeethSeg, is a deep learning model. It achieves tooth segmentation by analyzing the 3D mesh structure of teeth models, enabling accurate identification and differentiation of different tooth components.",
  },
];
export default faqs;
