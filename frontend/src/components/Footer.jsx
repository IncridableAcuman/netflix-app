const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <img src="./logo.png" alt="logo" className="w-24" />
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </p>
          {/* Store Buttons */}
          <div className="flex gap-3 mt-6">
            <img
              src="/googlePlay.svg"
              alt="Google Play"
              className="h-10 cursor-pointer"
            />
            <img
              src="/appStore.svg"
              alt="App Store"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Contact us</a></li>
            <li><a href="#" className="hover:underline">Privacy policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Get in touch</h3>
          <p className="text-sm text-gray-400 mb-2">+99890 566 90 11</p>
          <p className="text-sm text-gray-400">abdusharipovizzat03@gmail.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="my-8 border-gray-700" />
      <p className="text-center text-xs text-gray-500">
        Copyright 2025 © Izzatbek Abdusharipov. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
