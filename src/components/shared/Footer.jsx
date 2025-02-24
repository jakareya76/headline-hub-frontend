const Footer = () => {
  return (
    <footer className="bg-[#181818] text-white border-t border-gray-700">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Services Section */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Services</h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Branding
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Design
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Marketing
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Advertisement
              </a>
            </li>
          </ul>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Company</h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                About us
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Contact
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Jobs
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Press kit
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Legal</h6>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Terms of use
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Privacy policy
              </a>
            </li>
            <li>
              <a className="hover:text-gray-400 transition-colors" href="#">
                Cookie policy
              </a>
            </li>
          </ul>
        </nav>

        {/* Newsletter Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
          <p className="mb-4 text-sm text-gray-400">
            Stay up to date with our latest news
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-l-lg text-black focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
