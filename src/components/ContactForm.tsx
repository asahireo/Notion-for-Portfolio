"use client";


import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        // Your EmailJS Configuration
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

        try {
            if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
                // If keys are missing, throw error to trigger fallback (or console log)
                // For now, we'll let it error so it falls back to mailto for the user until they fix keys.
                // Or we can just pretend to succeed if we want to simulate? 
                // No, user wants real email.
                throw new Error("Missing configuration");
            }

            await (await import("@emailjs/browser")).default.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    to_name: "Al Fahad Niloy",
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                PUBLIC_KEY
            );

            setStatus("success");
            setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });

        } catch (error) {
            console.error("EmailJS Error:", JSON.stringify(error));
            if (error instanceof Error) {
                console.error("Error Message:", error.message);
            }
            setStatus("error");

            // Fallback to mailto if EmailJS fails or isn't configured yet
            const { firstName, lastName, email, subject, message } = formData;
            const fullName = `${firstName} ${lastName}`;
            const mailtoLink = `mailto:alfahadniloy@gmail.com?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(
                `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            window.location.href = mailtoLink;
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-neon focus:bg-white/10 transition-all font-mono text-sm";
    const labelClasses = "text-xs font-mono text-brand-light/60 uppercase tracking-widest block mb-2";

    return (
        <form onSubmit={handleSubmit} className="w-full bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="firstName" className={labelClasses}>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Enter first name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Enter last name"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="name@example.com"
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="subject" className={labelClasses}>Subject</label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="What is this regarding?"
                    required
                />
            </div>

            <div className="mb-8">
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Type your message here..."
                    required
                />
            </div>

            <MagneticButton className="w-full">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-brand-neon text-black font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Sending..." : status === "success" ? "Sent Successfully!" : "Send Message"}
                    <Send className={`w-4 h-4 ${status === "success" ? "text-green-600" : ""}`} />
                </button>
            </MagneticButton>

            {status === "error" && (
                <p className="text-center text-xs text-brand-light/50 mt-4 font-mono">
                    (Background send pending configuration. Opening mail client...)
                </p>
            )}
        </form>
    );
}
