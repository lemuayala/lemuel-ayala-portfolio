import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { CustomToast } from '../CustomToast';
import { useTheme } from '../../hooks/useTheme';
import { sectionReveal } from '../../utils/motionPresets';

export const Contact = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const showSuccessToast = (message: string) => {
    toast.custom(
      (tt) => <CustomToast t={tt} message={message} type="success" />,
      { duration: 3000 }
    );
  };
  const showErrorToast = (message: string) => {
    toast.custom(
      (tt) => <CustomToast t={tt} message={message} type="error" />,
      { duration: 4000 }
    );
  };

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
      showErrorToast(t('contact.recaptchaError'));
      return;
    }
    setIsSubmitting(true);
    const message = t('contact.sending');
    const loadingToastId = toast.custom(
      (tt) => <CustomToast t={tt} message={message} type="loading" />,
      { duration: Infinity }
    );

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        e.target as HTMLFormElement,
        PUBLIC_KEY
      );
      toast.dismiss(loadingToastId);
      showSuccessToast(t('contact.success'));
      setFormData({ name: '', email: '', message: '' });
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    } catch (err) {
      toast.dismiss(loadingToastId);
      console.error('EmailJS Error:', err);
      showErrorToast(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100svh-8.5rem)] items-center overflow-hidden py-20 sm:min-h-[calc(100svh-9rem)] sm:py-24"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-indigo-600/3 filter blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          {...sectionReveal}
          className="glass-panel relative overflow-hidden rounded-[2rem] border-t-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8 md:p-10"
        >
          <div className="pointer-events-none absolute left-1/4 right-1/4 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/35 to-transparent" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-72 rounded-full bg-indigo-500/7 blur-[115px] md:h-56 md:w-80" />

          <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Left: copy + direct links */}
            <div className="lg:col-span-2">
              <span className="section-kicker mb-5">
                <Sparkles className="w-3 h-3" />
                03 — {t('navbar.contact')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                {t('contact.title')}
              </h2>
              <p className="mb-6 text-pretty text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t('contact.subtitle')}
              </p>

              <a
                href="mailto:lemuayala@gmail.com"
                className="group mb-5 inline-flex items-center gap-3 rounded-full glass-pill px-5 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                <Mail className="w-4 h-4 shrink-0 text-indigo-700/55 dark:text-indigo-300/55" />
                <span>lemuayala@gmail.com</span>
                <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/lemuayala"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full glass-pill flex items-center justify-center text-zinc-600 hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:bg-white/10 transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lemuayala/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full glass-pill flex items-center justify-center text-zinc-600 hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:bg-white/10 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 space-y-3.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  placeholder={t('contact.form.name')}
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  placeholder={t('contact.form.email')}
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                rows={5}
                placeholder={t('contact.form.message')}
                className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <div className="origin-top-left scale-[0.92] sm:scale-100">
                  {RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme={theme}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRecaptchaValue('preview')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl glass-pill text-xs text-zinc-500 dark:text-zinc-400 border-dashed"
                    >
                      <span className="w-4 h-4 rounded-sm border border-zinc-400/40 flex items-center justify-center">
                        {recaptchaValue ? (
                          <span className="w-2 h-2 bg-emerald-400 rounded-sm" />
                        ) : null}
                      </span>
                      <span>reCAPTCHA preview · click to verify</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaValue}
                  className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    !isSubmitting && recaptchaValue
                      ? 'btn-premium bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]'
                      : 'bg-zinc-900/40 text-zinc-400 dark:bg-white/10 dark:text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? t('contact.sending') : t('contact.submit')}
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
