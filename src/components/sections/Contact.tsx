import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";
import { useLanguage } from "../../context/LanguageContext";
import toast from "react-hot-toast";
import { CustomToast } from "../CustomToast";

export const Contact = () => {
  const { t } = useLanguage();

  // Helper para Success Toast
  const showSuccessToast = (message: string) => {
    toast.custom(
      (t) => <CustomToast t={t} message={message} type="success" />,
      { duration: 3000 }
    );
  };

  // Helper para Error Toast
  const showErrorToast = (message: string) => {
    toast.custom((t) => <CustomToast t={t} message={message} type="error" />, {
      duration: 4000,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // --- Variables de entorno y tema (sin cambios) ---
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const currentTheme =
    localStorage.getItem("theme") === "dark" ? "dark" : "light";

  // --- Handlers (handleRecaptchaChange sin cambios) ---
  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  // --- handleSubmit MODIFICADO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      showErrorToast(t("contact.recaptchaError"));
      return;
    }

    setIsSubmitting(true);
    const message = t("contact.sending");
    const loadingToastId = toast.custom(
      (t) => <CustomToast t={t} message={message} type="loading" />,
      {
        duration: Infinity,
      }
    );

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        e.target as HTMLFormElement,
        PUBLIC_KEY
      );

      // Descarta el toast de carga ANTES de mostrar el de éxito
      toast.dismiss(loadingToastId);
      showSuccessToast(t("contact.success"));

      setFormData({ name: "", email: "", message: "" });
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    } catch (err) {
      // Descarta el toast de carga ANTES de mostrar el de error
      toast.dismiss(loadingToastId);
      console.error("EmailJS Error:", err);
      showErrorToast(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="px-4 w-auto md:w-150">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {t("contact.title")}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Inputs */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                placeholder={t("contact.form.name")}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none focus:border-gray-400 dark:focus:border-blue-500 focus:bg-blue-500/5"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                placeholder={t("contact.form.email")}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none focus:border-gray-400 dark:focus:border-blue-500 focus:bg-blue-500/5"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                rows={5}
                placeholder={t("contact.form.message")}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none  focus:border-gray-400 dark:focus:border-blue-500 focus:bg-blue-500/5"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            {/* ReCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                theme={currentTheme}
              />
            </div>
            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !recaptchaValue}
              className={`w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden ${
                !isSubmitting && recaptchaValue
                  ? "hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "opacity-70 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? t("contact.sending") : t("contact.submit")}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
