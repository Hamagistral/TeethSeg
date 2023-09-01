import { SendHorizonal } from "lucide-react";

function ContactForm() {
    return (
        <>
            <section className="bg-primary-background w-full pb-24">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent pb-4t">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-primary sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
                    <form action="mailto:3dsmartfactory@gmail.com" className="space-y-8">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary">Your email</label>
                            <input type="email" id="email" className="shadow-sm p-4 bg-input  text-secondary text-sm rounded-lg block w-full" placeholder="name@teethseg.com" required />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-primary">Subject</label>
                            <input type="text" id="subject" className="block p-4 w-full text-sm text-primary bg-input rounded-lg  shadow-sm" placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-primary">Your message</label>
                            <textarea id="message" rows="6" className="block p-4 w-full text-sm text-secondary bg-input rounded-lg shadow-sm " placeholder="Leave a comment..."></textarea>
                        </div>
                        <button type="submit" className="py-4 px-6 text-sm transition ease-linear inline-flex items-center justify-center gap-2 font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:bg-blue-600">
                            <SendHorizonal size={16}/>
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default ContactForm;