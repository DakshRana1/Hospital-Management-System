import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, User, Stethoscope, Clock } from "lucide-react";

export function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [form, setForm] = useState({
    doctorId: "",
    department: "",
    date: "",
    time: "",
    reason: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/doctors")
      .then(res => res.ok ? res.json() : [])
      .then(data => setDoctors(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to book appointment");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-surface medical-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card card-shadow p-8 md:p-12 rounded-[2rem] border border-outline-variant">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="text-primary w-8 h-8" />
            </div>
            <h1 className="font-headline-xl text-headline-xl text-text-main font-serif">Book Appointment</h1>
            <p className="text-text-muted font-body-md mt-2">Schedule your visit with our expert specialists.</p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-success-green/30 p-8 rounded-2xl text-center animate-pulse">
              <p className="text-success-green font-headline-md">Appointment Booked Successfully!</p>
              <p className="text-secondary mt-2">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-error-container text-on-error-container p-4 rounded-lg">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-text-main mb-2 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-primary"/> Department</label>
                  <select 
                    required
                    value={form.department}
                    onChange={e => setForm({...form, department: e.target.value, doctorId: ""})}
                    className="w-full px-4 py-3 rounded-lg border border-outline focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest"
                  >
                    <option value="">Select Department</option>
                    {[...new Set(doctors.map(d => d.department))].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block font-label-md text-text-main mb-2 flex items-center gap-2"><User className="w-4 h-4 text-primary"/> Selected Doctor</label>
                  <select 
                    required
                    disabled={!form.department}
                    value={form.doctorId}
                    onChange={e => setForm({...form, doctorId: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-outline focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest disabled:opacity-50"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.filter(d => d.department === form.department).map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-label-md text-text-main mb-2 flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary"/> Date</label>
                  <input 
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-outline focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest"
                  />
                </div>

                <div>
                  <label className="block font-label-md text-text-main mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> Preferred Time</label>
                  <input 
                    type="time"
                    required
                    value={form.time}
                    onChange={e => setForm({...form, time: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-outline focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-text-main mb-2">Reason for Visit (Optional)</label>
                <textarea
                  value={form.reason}
                  onChange={e => setForm({...form, reason: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-outline focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest resize-none"
                  placeholder="Briefly describe your symptoms or reason for appointment"
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:bg-primary-container transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
