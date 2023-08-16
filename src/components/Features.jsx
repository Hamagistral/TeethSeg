import { BrainCircuit, Image, Zap } from "lucide-react";

function Features() {
    return (
        <>
            <section className="bg-slate-800 w-full pb-24">
                <div className="py-8 px-4 mx-auto text-center max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Why TeethSeg</h2>
                        <p className="text-slate-400 sm:text-xl dark:text-gray-400">3D tooth segmentation is an important task for digital orthodontics. Several Deep Learning methods have been proposed for automatic tooth segmentation from 3D dental models or intraoral scans.</p>
                    </div>
                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-400">
                                <BrainCircuit className="h-8 w-8"/>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-white">Best AI Model</h3>
                            <p className="text-slate-400">To do our segmentation we are using one of the most accurate teeth segmentation model, the <strong>TSGCNet.</strong></p>
                        </div>
                        <div>
                            <div className="flex  mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-400">
                                <Zap />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-white">Fast Response</h3>
                            <p className="text-slate-400 dark:text-gray-400">We optimized our API to be as fast and reliable as possible.</p>
                        </div>
                        <div>
                            <div className="flex  mx-auto justify-center items-center mb-8 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 bg-blue-400">
                                <Image />             
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-white">Easy & Simple UI</h3>
                            <p className="text-slate-400 dark:text-gray-400">We developed our UI to be as easy and simple to use, with 3D integration.</p>
                        </div>
                    </div>
                </div>
                </section>
        </>
    );
}

export default Features;