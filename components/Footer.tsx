export default function Footer() {
  return (
    <footer className="footer-area">

      <div className="container py-5">

        <div className="row">

          {/* Logo */}
          <div className="col-lg-4 mb-5">

            <h2 className="text-white fw-bold">
              WorkWorm
            </h2>

            <p className="footer-text mt-4">
              We're passionate about keeping your gadgets in top shape.
              Our dedicated team of experienced technicians combines
              technical expertise with exceptional customer service.
            </p>

            <div className="social-footer mt-4">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-discord"></i>
              <i className="bi bi-tiktok"></i>
              <i className="bi bi-youtube"></i>
            </div>

          </div>

          {/* Company */}
          <div className="col-lg-2 mb-5">

            <h4 className="text-white mb-4">
              Company
            </h4>

            <ul className="list-unstyled footer-links">
              <li>Home</li>
              <li>All Services</li>
              <li>Track My Repair</li>
              <li>Book a Repair</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>

          </div>

          {/* Services */}
          <div className="col-lg-2 mb-5">

            <h4 className="text-white mb-4">
              Our Service
            </h4>

            <ul className="list-unstyled footer-links">
              <li>Phone Repair</li>
              <li>Tablet Repair</li>
              <li>Laptop Repair</li>
              <li>Software Repair</li>
              <li>Smart Watch</li>
              <li>Game Console</li>
            </ul>

          </div>

          {/* Contact */}
          <div className="col-lg-4">

            <div className="mb-4">
              <h5 className="text-white">
                <i className="bi bi-clock text-warning me-2"></i>
                We're Open
              </h5>

              <p className="footer-text">
                Monday - Saturday 08.00 - 18.00
              </p>
            </div>

            <div className="mb-4">
              <h5 className="text-white">
                <i className="bi bi-geo-alt text-warning me-2"></i>
                Workshop Location
              </h5>

              <p className="footer-text">
                Bangladesh
              </p>
            </div>

            <div>
              <h5 className="text-white">
                <i className="bi bi-envelope text-warning me-2"></i>
                Send a Message
              </h5>

              <p className="footer-text">
                contact@workworm.com
              </p>
            </div>

          </div>

        </div>

        <hr className="border-secondary" />

        <div className="row">

          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-secondary">
              Copyright © 2026 WorkWorm
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="footer-policy me-4">
              Privacy Policy
            </a>

            <a href="#" className="footer-policy">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}