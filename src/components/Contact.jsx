import React from 'react';

function Contact() {
  return (
    <section id="contact">
      <div className="section-header">
        <span className="section-num">03 /</span>
        <span className="section-title">Contact</span>
        <span className="section-rule"></span>
      </div>
      <div className="contact-wrap">
        <div className="contact-left">
          <div className="contact-big">Let's<br />shoot<br /><em>something.</em></div>
          <a className="cta-btn" href="mailto:your@email.com">→ Send Enquiry</a>
        </div>
        <div className="contact-right">
          <div className="contact-row">
            <span className="contact-row-label">Email</span>
            <span className="contact-row-val">your@email.com</span>
          </div>
          <div className="contact-row">
            <span className="contact-row-label">Phone</span>
            <span className="contact-row-val">+91 XXXXX XXXXX</span>
          </div>
          <div className="contact-row">
            <span className="contact-row-label">Instagram</span>
            <span className="contact-row-val">@your_handle</span>
          </div>
          <div className="contact-row">
            <span className="contact-row-label">Behance</span>
            <span className="contact-row-val">behance.net/your_profile</span>
          </div>
          <div className="contact-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <span className="contact-row-label">Based in</span>
            <span className="contact-row-val">Chennai, TN — available to travel</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
