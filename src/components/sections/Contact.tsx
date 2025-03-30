import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { RevealOnScroll } from '../RevealOnScroll';
import emailjs from 'emailjs-com';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Por favor, verifica que no eres un robot');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        e.target as HTMLFormElement,
        PUBLIC_KEY
      );
      alert('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    } catch (err) {
      console.log(err);
      alert('Error sending message');
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
        <div className="px-4 w-150">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get in Touch
          </h2>
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                placeholder="Name..."
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none focus:border-gray-400 black:focus:border-blue-500 focus:bg-blue-500/5"
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
                placeholder="example@gmail.com"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none focus:border-gray-400 black:focus:border-blue-500 focus:bg-blue-500/5"
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
                placeholder="Your Message..."
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-black dark:text-white transition focus:outline-none  focus:border-gray-400 black:focus:border-blue-500 focus:bg-blue-500/5"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              className="flex justify-center"
              theme={`${
                localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting || !recaptchaValue}
              className={`w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden ${
                !isSubmitting && recaptchaValue
                  ? 'hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'opacity-70 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
