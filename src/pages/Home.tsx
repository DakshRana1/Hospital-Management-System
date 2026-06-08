import { Link } from "react-router-dom";
import { Calendar, Phone, Stethoscope, Building2, Heart, Bone, Brain, Baby, ArrowRight, MapPin } from "lucide-react";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-16">
      <section className="relative h-[870px] flex items-center overflow-hidden medical-gradient">
        <div className="absolute inset-0 z-0 opacity-10">
          <img alt="Hospital Excellence" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" />
        </div>
        <div className="container mx-auto px-gutter relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded text-[11px] font-bold uppercase tracking-wider mb-4">
              Ranked #1 for Patient Care in New Delhi
            </span>
            <h1 className="font-headline-xl text-headline-xl text-text-main mb-6 leading-[1.1]">
              Compassionate Care, <br/><span className="text-primary italic">Advanced Technology.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted mb-10 max-w-md leading-relaxed">
              Providing world-class healthcare with a human touch. Our specialized departments and expert doctors are dedicated to your well-being 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="bg-text-main text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>
              <button className="bg-white border border-outline-variant text-primary px-8 py-4 rounded-2xl font-bold text-sm hover:bg-surface-container transition-all flex items-center gap-2 card-shadow">
                <Phone className="w-5 h-5" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-gutter -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-3xl card-shadow group cursor-pointer border border-outline-variant border-l-4 border-l-primary">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-headline-md text-text-main mb-2">Find a Doctor</h3>
            <p className="font-body-md text-body-md text-text-muted mb-4">Search from over 100+ specialists across 20+ disciplines.</p>
            <span className="text-primary font-label-md flex items-center gap-1 group-hover:gap-2 transition-all">Search Now <ArrowRight className="w-4 h-4"/></span>
          </div>
          <div className="glass-card p-8 rounded-3xl card-shadow group cursor-pointer border border-outline-variant border-l-4 border-l-info-blue">
            <div className="w-12 h-12 rounded-xl bg-info-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="text-info-blue w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-headline-md text-text-main mb-2">Our Departments</h3>
            <p className="font-body-md text-body-md text-text-muted mb-4">Explore our state-of-the-art facilities and specialized wings.</p>
            <span className="text-info-blue font-label-md flex items-center gap-1 group-hover:gap-2 transition-all">View All <ArrowRight className="w-4 h-4"/></span>
          </div>
          <div className="bg-emergency-red p-8 rounded-3xl card-shadow group cursor-pointer text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6 animate-pulse">
              <Phone className="text-white w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-headline-md mb-2 font-serif">Emergency Care</h3>
            <p className="font-body-md text-body-md opacity-90 mb-4">Immediate 24/7 critical care and ambulance services.</p>
            <span className="font-bold text-headline-md font-serif">+91 1800 123 4567</span>
          </div>
        </div>
      </section>

      <section className="py-section-gap container mx-auto px-gutter reveal">
        <div className="bg-surface-container rounded-[2rem] p-12 md:p-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-primary font-headline-xl text-headline-xl mb-2">20+</div>
            <div className="text-text-muted font-label-md text-label-md uppercase tracking-wider">Specialties</div>
          </div>
          <div>
            <div className="text-primary font-headline-xl text-headline-xl mb-2">100+</div>
            <div className="text-text-muted font-label-md text-label-md uppercase tracking-wider">Expert Doctors</div>
          </div>
          <div>
            <div className="text-primary font-headline-xl text-headline-xl mb-2">50k+</div>
            <div className="text-text-muted font-label-md text-label-md uppercase tracking-wider">Happy Patients</div>
          </div>
          <div>
            <div className="text-primary font-headline-xl text-headline-xl mb-2">24/7</div>
            <div className="text-text-muted font-label-md text-label-md uppercase tracking-wider">Emergency Support</div>
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-surface-container-low">
        <div className="container mx-auto px-gutter">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-text-main">Center of Excellence</h2>
              <p className="text-text-muted font-body-md">Specialized care delivered by world-renowned experts.</p>
            </div>
            <button className="text-primary font-bold text-sm tracking-wide uppercase flex items-center gap-2 hover:underline">View All Departments <ArrowRight className="w-5 h-5"/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl card-shadow border border-outline-variant hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                <Heart className="text-red-600 w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-headline-md mb-3 font-serif">Cardiology</h4>
              <p className="text-text-muted font-body-md mb-6">Advanced heart care including non-invasive diagnostics and robotic surgery.</p>
              <a className="text-primary font-bold text-xs uppercase tracking-wider hover:underline" href="#">LEARN MORE</a>
            </div>
            <div className="bg-white p-6 rounded-3xl card-shadow border border-outline-variant hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Bone className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-headline-md mb-3 font-serif">Orthopedics</h4>
              <p className="text-text-muted font-body-md mb-6">Expert treatment for joint replacements, sports injuries, and spine health.</p>
              <a className="text-primary font-bold text-xs uppercase tracking-wider hover:underline" href="#">LEARN MORE</a>
            </div>
            <div className="bg-white p-6 rounded-3xl card-shadow border border-outline-variant hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                <Brain className="text-purple-600 w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-headline-md mb-3 font-serif">Neurology</h4>
              <p className="text-text-muted font-body-md mb-6">Cutting-edge care for complex brain and nervous system conditions.</p>
              <a className="text-primary font-bold text-xs uppercase tracking-wider hover:underline" href="#">LEARN MORE</a>
            </div>
            <div className="bg-white p-6 rounded-3xl card-shadow border border-outline-variant hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                <Baby className="text-green-600 w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-headline-md mb-3 font-serif">Pediatrics</h4>
              <p className="text-text-muted font-body-md mb-6">Comprehensive healthcare for infants, children, and adolescents.</p>
              <a className="text-primary font-bold text-xs uppercase tracking-wider hover:underline" href="#">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap container mx-auto px-gutter reveal">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-text-main mb-4">Meet Our Specialists</h2>
          <p className="text-text-muted font-body-md max-w-2xl mx-auto">Our team of dedicated professionals combines years of experience with deep empathy to provide the best clinical outcomes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Dr. Sarah Jenkins", title: "Senior Cardiologist", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
            { name: "Dr. Michael Chen", title: "Orthopedic Surgeon", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
            { name: "Dr. Elena Rodriguez", title: "Chief Neurologist", img: "/dr_elena_rodriguez.png" },
            { name: "Dr. James Wilson", title: "Head of Pediatrics", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" },
          ].map((doc, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl bg-white card-shadow border border-outline-variant">
              <img alt="Doctor" className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500" src={doc.img} />
              <div className="p-6 text-center">
                <h5 className="font-headline-md text-headline-md text-text-main font-serif">{doc.name}</h5>
                <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1 mb-6">{doc.title}</p>
                <Link to="/book" className="block w-full py-3 bg-surface-container font-bold text-sm text-text-main rounded-2xl hover:bg-black hover:text-white transition-all">Book Consultation</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-gutter reveal">
        <div className="bg-surface-neutral border border-outline-variant rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-xl">
          <div className="p-12 md:p-20 flex-1">
            <h2 className="font-headline-lg text-headline-lg text-text-main mb-6">Ready to Experience <br/>World-Class Healthcare?</h2>
            <p className="text-text-muted font-body-lg mb-8">Schedule your visit today or speak with our care coordinators for any queries about our services.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <MapPin className="text-primary w-6 h-6" />
                <span className="font-body-md">Sector 18, Dwarka, New Delhi - 110075</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary w-6 h-6" />
                <span className="font-body-md">+91 98765 43210</span>
              </div>
            </div>
            <Link to="/book" className="inline-block bg-primary text-on-primary px-10 py-4 rounded-xl font-headline-md shadow-lg hover:scale-105 transition-transform">
              Book Now
            </Link>
          </div>
          <div className="hidden md:block w-1/3 bg-primary-fixed relative">
            <img alt="Modern Care" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" />
          </div>
        </div>
      </section>
    </main>
  );
}
