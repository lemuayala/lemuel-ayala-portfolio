import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { CustomToast } from '../CustomToast';

export const Contact = () => {
  const { t } = useLanguage();

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
  const currentTheme =
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

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
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-blue-600/5 filter blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden border-t-white/10 shadow-2xl shadow-black/30"
        >
          {/* Top reflection */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
          {/* Soft inner glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* Left: copy + direct links */}
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-500 dark:text-zinc-500 mb-5">
                <Sparkles className="w-3 h-3" />
                03 — {t('navbar.contact')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                {t('contact.title')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8 text-pretty">
                {t('contact.subtitle')}
              </p>

              <a
                href="mailto:lemuayala@gmail.com"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-pill hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors text-sm font-medium mb-8 group text-zinc-700 dark:text-zinc-300"
              >
                <Mail className="w-4 h-4 shrink-0 text-blue-800/45 dark:text-blue-400/40" />
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
                  className="w-11 h-11 rounded-full glass-pill flex items-center justify-center text-zinc-600 hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lemuayala/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full glass-pill flex items-center justify-center text-sky-800/55 hover:bg-zinc-900/5 dark:text-sky-400/45 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
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
                  className="w-full bg-zinc-900/5 dark:bg-white/[0.04] border border-zinc-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/15"
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
                  className="w-full bg-zinc-900/5 dark:bg-white/[0.04] border border-zinc-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/15"
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
                className="w-full bg-zinc-900/5 dark:bg-white/[0.04] border border-zinc-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 transition focus:outline-none focus:border-blue-400/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/15 resize-none"
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
                      theme={currentTheme}
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
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(96,165,250,0.35)]'
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
