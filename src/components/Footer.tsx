import { Hospital, Globe, Share2, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <>
      <footer className="bg-text-main text-white pt-16 pb-8 mt-section-gap">
        <div className="w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Hospital className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">STAR<span className="font-light text-slate-400">HOSPITAL</span></span>
            </div>
            <p className="text-slate-400 font-body-md">Leading the way in medical excellence and patient-centered care since 2005.</p>
            <div className="flex gap-4">
              <Globe className="text-white cursor-pointer hover:text-primary transition-colors w-5 h-5" />
              <Share2 className="text-white cursor-pointer hover:text-primary transition-colors w-5 h-5" />
              <MessageCircle className="text-white cursor-pointer hover:text-primary transition-colors w-5 h-5" />
            </div>
          </div>
          <div className="">
            <h4 className="font-label-md text-label-md text-white/90 mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              <li className=""><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">About Us</a></li>
              <li><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Doctors</a></li>
              <li><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Departments</a></li>
              <li><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-white/90 mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3">
              <li><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Contact Us</a></li>
              <li className=""><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Terms of Service</a></li>
              <li className=""><a className="text-slate-400 hover:text-white transition-colors font-body-md" href="#">Patient Portal</a></li>
            </ul>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h4 className="font-label-md text-label-md text-white/90 mb-4 uppercase tracking-widest">24/7 Emergency</h4>
            <p className="text-primary font-bold text-headline-md mb-2 font-serif">+91 1800 123 4567</p>
            <p className="text-slate-400 text-sm">Immediate assistance available for critical care and trauma.</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 px-4 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-label-sm">© 2026 Star Hospital. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-slate-500 font-label-sm">Systems Online & Encrypted</span>
          </div>
        </div>
      </footer>
      <a href="tel:+9118001234567" className="fixed bottom-8 right-8 bg-emergency-red text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Hospital className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">Emergency Call</span>
      </a>
    </>
  );
}
