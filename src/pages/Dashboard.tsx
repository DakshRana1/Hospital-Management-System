import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Calendar, Stethoscope, User, Clock, CheckCircle, Activity, FileText } from "lucide-react";

export function Dashboard() {
  const [user, setUser] = useState<{name: string, role: string} | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      const endpoint = parsedUser.role === 'patient' 
        ? "/api/appointments/my" 
        : "/api/appointments/all";

      fetch(endpoint, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setAppointments(Array.isArray(data) ? data : []);
        }
      })
      .catch(console.error);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated || !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-text-main font-serif">Welcome, {user?.name}</h1>
            <p className="text-secondary font-body-md capitalize mt-1">{user?.role} Portal</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-primary-container transition-all">
            <User className="w-5 h-5"/> Profile Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface-neutral p-6 rounded-3xl card-shadow border border-outline-variant flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Calendar className="text-primary w-6 h-6"/>
            </div>
            <div>
              <p className="text-secondary font-label-sm uppercase tracking-wider mb-1">Total Appointments</p>
              <h3 className="font-headline-md text-headline-md">{appointments.length}</h3>
            </div>
          </div>
          
          <div className="bg-surface-neutral p-6 rounded-3xl card-shadow border border-outline-variant flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
              <Activity className="text-success-green w-6 h-6"/>
            </div>
            <div>
              <p className="text-secondary font-label-sm uppercase tracking-wider mb-1">Health Status</p>
              <h3 className="font-headline-md text-headline-md text-success-green">Stable</h3>
            </div>
          </div>
          
          <div className="bg-surface-neutral p-6 rounded-3xl card-shadow border border-outline-variant flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
              <FileText className="text-purple-600 w-6 h-6"/>
            </div>
            <div>
              <p className="text-secondary font-label-sm uppercase tracking-wider mb-1">Lab Reports</p>
              <h3 className="font-headline-md text-headline-md">2 Pending</h3>
            </div>
          </div>
        </div>

        <div className="bg-surface-neutral rounded-3xl card-shadow border border-outline-variant overflow-hidden">
          <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-white">
            <h2 className="font-headline-md text-headline-md text-text-main font-serif">
              {user?.role === 'patient' ? "My Appointments" : "All Appointments Overview"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-secondary font-label-sm uppercase">
                <tr>
                  <th className="p-4 rounded-tl-lg">Date & Time</th>
                  {user?.role !== 'patient' && <th className="p-4">Patient Name</th>}
                  <th className="p-4">Department</th>
                  <th className="p-4">Doctor ID</th>
                  <th className="p-4">Reason</th>
                  <th className="p-4 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-md text-text-main">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-secondary">No appointments found.</td>
                  </tr>
                ) : appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-secondary"/>
                        {new Date(apt.date).toLocaleDateString()} at {apt.time}
                      </div>
                    </td>
                    {user?.role !== 'patient' && <td className="p-4">{apt.patientName}</td>}
                    <td className="p-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{apt.department}</span>
                    </td>
                    <td className="p-4">{apt.doctorId}</td>
                    <td className="p-4">{apt.reason || "-"}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-info-blue">
                        <CheckCircle className="w-4 h-4"/>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
