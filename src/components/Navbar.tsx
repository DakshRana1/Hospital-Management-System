import { Link, useNavigate, useLocation } from "react-router-dom";
import { Hospital } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  useLocation(); // forces re-render on navigation to update login/logout state reactively
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="h-20 flex items-center justify-between bg-white border-b border-outline-variant z-50 fixed top-0 w-full transition-all">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-7xl mx-auto h-full">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
             <Hospital className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-on-primary-fixed">
            STAR<span className="font-light text-secondary">HOSPITAL</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-primary underline underline-offset-8 font-semibold text-sm transition-colors duration-200">Home</Link>
          <Link to="/book" className="text-secondary hover:text-primary transition-colors duration-200 font-semibold text-sm">Appointments</Link>
          <a href="#" className="text-secondary hover:text-primary transition-colors duration-200 font-semibold text-sm">Departments</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors duration-200 font-semibold text-sm">Doctors</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Emergency 24/7</span>
            <span className="text-primary font-bold">+91 1800 123 4567</span>
          </div>
          {token ? (
            <div className="flex gap-2">
              <Link to="/dashboard" className="bg-surface-container text-text-main px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-surface-container-highest transition-all">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-white border border-outline-variant text-text-muted px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-surface-container transition-all">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-container transition-all">
              Patient Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
