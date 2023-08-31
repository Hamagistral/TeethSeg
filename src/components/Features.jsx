import { BrainCircuit, Image, Zap } from "lucide-react";

function Features() {
    return (
        <>
            <section className="bg-primary-background w-full pb-24 pt-12">
                <div className="py-8 px-4 mx-auto text-center max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent pb-4">Why TeethSeg</h2>
                        <p className="sm:text-xl text-secondary ">3D tooth segmentation is an important task for digital orthodontics. Several Deep Learning methods have been proposed for automatic tooth segmentation from 3D dental models or intraoral scans.</p>
                    </div>
                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-500">
                                <BrainCircuit className="lg:h-8 lg:w-8"/>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-card-title">Best AI Model</h3>
                            <p className="text-secondary">To do our segmentation we are using one of the most accurate teeth segmentation model, the <strong>MeshSetNet.</strong></p>
                        </div>
                        <div>
                            <div className="flex  mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-500">
                                <Zap className="lg:h-8 lg:w-8"/>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-card-title">Fast Response</h3>
                            <p className="text-secondary dark:text-gray-400">We optimized our API to be as fast and reliable as possible.</p>
                        </div>
                        <div>
                            <div className="flex  mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-500">
                                <Image className="lg:h-8 lg:w-8"/>             
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-card-title">Easy & Simple UI</h3>
                            <p className="text-secondary dark:text-gray-400">We developed our UI to be as easy and simple to use, with 3D integration.</p>
                        </div>
                    </div>
                </div>
                </section>
        </>
    );
}

export default Features;