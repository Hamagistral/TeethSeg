/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'; 
import { Stage } from "@react-three/drei";


// eslint-disable-next-line react/prop-types
const ThreeDRenderer = ({ file }) => {
    const [objModel, setObjModel] = useState(null);

    useEffect(() => {
        if (file) {
            const loader = new OBJLoader();
            loader.load(URL.createObjectURL(file), (loadedModel) => {
                setObjModel(loadedModel);
            });
        }
    }, [file]);

    return (
        <Canvas dpr={[1, 2]} shadowscamera={{ fov: 15 }}
            style={{
                backgroundColor: "transparent",
                height: "60vh"
            }}
        >
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <Stage environment="city">
                <directionalLight intensity="3" castShadow />
                {objModel && (
                    <mesh scale={[0.1, 0.1, 0.1]}>

                        <primitive object={objModel}>
                        </primitive>
                    </mesh>
                )}
            </Stage>

        </Canvas>
    );
};

export default ThreeDRenderer;
