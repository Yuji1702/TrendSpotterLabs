import React, { useRef, useState } from 'react';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [feedback, setFeedback] = useState('');

  const validateEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim() || !validateEmail(email)) nextErrors.email = 'Please enter a valid email.';
    if (!message.trim()) nextErrors.message = 'Please add a short message describing your needs.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const f = formRef.current;
      if (f) {
        f.classList.add('shake');
        setTimeout(() => f.classList.remove('shake'), 420);
      }
      return;
    }

    setFeedback('Sending…');
    try {
      const res = await fetch('/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, email, phone, company, message })
      });
      const data = await res.json();
      if (data?.success) {
        setFeedback("Thank you! We'll review your requirements and get back to you soon.");
        setName(''); setEmail(''); setPhone(''); setCompany(''); setMessage('');
      } else {
        setFeedback('Error: ' + (data?.error || 'Something went wrong.'));
      }
    } catch (err) {
      console.error(err);
      setFeedback('Error: Could not submit form.');
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div className="contact-form-wrap">
          <h2 className="section-title">Ready to make your data work for you?</h2>
          <p className="section-sub">Reach out for a free initial consultation or a custom proposal. Pricing is completely customized and will be discussed based on your specific requirements and scope.</p>

          <form ref={formRef} id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">Full Name<span className="req">*</span></label>
              <input id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />
              <span className="error">{errors.name}</span>
            </div>

            <div className="form-row">
              <label htmlFor="email">Email<span className="req">*</span></label>
              <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <span className="error">{errors.email}</span>
            </div>

            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div className="form-row">
              <label htmlFor="company">Company / Organization</label>
              <input id="company" name="company" value={company} onChange={e => setCompany(e.target.value)} />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message / Requirements<span className="req">*</span></label>
              <textarea id="message" name="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
              <span className="error">{errors.message}</span>
            </div>

            <div className="form-row form-actions">
              <button className="btn primary" type="submit">Send Inquiry</button>
              <a className="btn mailto" id="mailto-cta" href="mailto:trendspotterlabs@gmail.com?subject=Analytics%20%26%20Reporting%20Inquiry">Email Business</a>
            </div>

            <div id="form-feedback" className="form-feedback" role="status" aria-live="polite">{feedback}</div>
          </form>
        </div>

        <aside className="contact-details">
          <h3>Contact</h3>
          <p><strong>Business email:</strong> <a href="mailto:trendspotterlabs@gmail.com">trendspotterlabs@gmail.com</a></p>
          <p><strong>Other emails:</strong><br />
            <a href="mailto:dhruvaeron570@gmail.com">dhruvaeron570@gmail.com</a><br />
            <a href="mailto:rasad8619@gmail.com">rasad8619@gmail.com</a>
          </p>
          <p><strong>Phone:</strong><br />
            <a href="tel:+918059161080">+91 8059161080</a><br />
            <a href="tel:+917887042404">+91 7887042404</a>
          </p>
          <p className="muted">Pricing is completely customized and will be discussed based on your specific requirements and scope.</p>
        </aside>
      </div>
    </section>
  );
}
