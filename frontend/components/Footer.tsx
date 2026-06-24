export default function Footer() {
  return (
    <footer className="bg-[#121358] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold">WorkWorm</h2>

            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
              We're passionate about keeping your gadgets in top shape.
              Our dedicated team of experienced technicians combines
              technical expertise with exceptional customer service.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-5 text-gray-300 text-lg">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-discord"></i>
              <i className="bi bi-tiktok"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Home</li>
              <li>All Services</li>
              <li>Track My Repair</li>
              <li>Book a Repair</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Service</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Phone Repair</li>
              <li>Tablet Repair</li>
              <li>Laptop Repair</li>
              <li>Software Repair</li>
              <li>Smart Watch</li>
              <li>Game Console</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>

            <p className="text-gray-300 text-sm mb-3">
              📍 Bangladesh
            </p>

            <p className="text-gray-300 text-sm mb-3">
              🕒 Mon - Sat (08:00 - 18:00)
            </p>

            <p className="text-gray-300 text-sm">
              ✉ contact@workworm.com
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">

          <p>© 2026 WorkWorm. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}