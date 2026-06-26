import { useEffect, useRef, useState } from "react";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { FaLinkedinIn, FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdSend, MdCheckCircle } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

/* ── EmailJS credentials ── */
const EMAILJS_SERVICE_ID  = "akula_narendra_kumar";
const EMAILJS_TEMPLATE_ID = "narendra_20";
const EMAILJS_PUBLIC_KEY  = "vfqFW58u_BZT7lg0G";

const socials = [
  { icon: <FaLinkedinIn />, href: "", key: "linkedin", label: "LinkedIn" },
  { icon: <FaGithub />,     href: "", key: "github",   label: "GitHub"   },
  { icon: <FaXTwitter />,   href: "", key: "twitter",  label: "X / Twitter" },
  { icon: <FaInstagram />,  href: "", key: "instagram",label: "Instagram" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-section", start: "top 80%" } });

      gsap.fromTo(".contact-title-line",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: ".contact-section", start: "top 78%" } });

      gsap.fromTo(".contact-card",
        { opacity: 0, y: 70, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: ".contact-section", start: "top 75%" } });

      gsap.fromTo(".cinfo-row",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: ".contact-section", start: "top 72%" } });

      gsap.fromTo(".csocial-btn",
        { opacity: 0, scale: 0, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.08,
          ease: "back.out(1.7)", delay: 0.55,
          scrollTrigger: { trigger: ".contact-section", start: "top 72%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError("Failed to send. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const socialLinks: Record<string, string> = {
    linkedin: config.contact.linkedin,
    github:   config.contact.github,
    twitter:  config.contact.twitter,
    instagram:config.contact.instagram,
  };

  return (
    <div className="contact-section" id="contact" ref={sectionRef}>

      {/* ── Decorative orbs ── */}
      <div className="contact-orb contact-orb-1" />
      <div className="contact-orb contact-orb-2" />
      <div className="contact-orb contact-orb-3" />

      <div className="contact-wrap">

        {/* ── Top label ── */}
        <span className="contact-badge">📬 Get In Touch</span>

        {/* ── Headline ── */}
        <div className="contact-headline">
          <h2 className="contact-title-line">Let's Build Something</h2>
          <h2 className="contact-title-line gradient-text">Amazing Together</h2>
        </div>
        <p className="contact-title-line contact-sub">
          Open to new opportunities, collaborations and exciting projects.
          Drop a message and I'll get back to you soon!
        </p>

        {/* ── Big card ── */}
        <div className="contact-card">

          {/* Left — Info */}
          <div className="contact-info-col">

            <div className="cinfo-row">
              <div className="cinfo-icon-wrap">
                <MdEmail />
              </div>
              <div className="cinfo-text">
                <span className="cinfo-label">Email</span>
                <a href={`mailto:${config.contact.email}`} className="cinfo-val" data-cursor="disable">
                  {config.contact.email}
                </a>
              </div>
            </div>

            <div className="cinfo-row">
              <div className="cinfo-icon-wrap">
                <MdLocationOn />
              </div>
              <div className="cinfo-text">
                <span className="cinfo-label">Location</span>
                <span className="cinfo-val">{config.social.location}</span>
              </div>
            </div>

            {/* Social row */}
            <div className="csocial-label">Find me on</div>
            <div className="csocial-row">
              {socials.map(s => (
                <a
                  key={s.key}
                  href={socialLinks[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csocial-btn"
                  aria-label={s.label}
                  data-cursor="disable"
                >
                  {s.icon}
                  <span className="csocial-tooltip">{s.label}</span>
                </a>
              ))}
            </div>

            {/* Availability pill */}
            <div className="cavail-pill">
              <span className="cavail-dot" />
              Available for opportunities
            </div>

          </div>

          {/* Divider */}
          <div className="contact-divider" />

          {/* Right — Form */}
          <div className="contact-form-col">
            <form className="cform" ref={formRef} onSubmit={handleSubmit} noValidate>

              <div className={`cfield ${focused === "name" ? "cfield--focused" : ""} ${form.name ? "cfield--filled" : ""}`}>
                <label htmlFor="cname">Your Name</label>
                <input
                  id="cname" type="text" name="name"
                  value={form.name} onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required autoComplete="off"
                />
                <div className="cfield-bar" />
              </div>

              <div className={`cfield ${focused === "email" ? "cfield--focused" : ""} ${form.email ? "cfield--filled" : ""}`}>
                <label htmlFor="cemail">Email Address</label>
                <input
                  id="cemail" type="email" name="email"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required autoComplete="off"
                />
                <div className="cfield-bar" />
              </div>

              <div className={`cfield cfield--textarea ${focused === "message" ? "cfield--focused" : ""} ${form.message ? "cfield--filled" : ""}`}>
                <label htmlFor="cmessage">Your Message</label>
                <textarea
                  id="cmessage" name="message" rows={5}
                  value={form.message} onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                />
                <div className="cfield-bar" />
              </div>

              {/* Error message */}
              {error && (
                <p className="cform-error">{error}</p>
              )}

              <button type="submit" className={`csend-btn ${sent ? "csend-btn--sent" : ""}`} disabled={sending || sent} data-cursor="disable">
                {sent ? (
                  <><MdCheckCircle /> Message Sent!</>
                ) : sending ? (
                  <><span className="csend-spinner" /> Sending…</>
                ) : (
                  <><MdSend /> Send Message</>
                )}
              </button>

            </form>
          </div>

        </div>

        {/* Footer */}
        <p className="contact-footer">
          © {new Date().getFullYear()} <span>{config.developer.fullName}</span>. Crafted with ❤️ in Visakhapatnam.
        </p>

      </div>
    </div>
  );
};

export default Contact;
