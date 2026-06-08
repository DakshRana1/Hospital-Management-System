import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "star_hospital_super_secret_jwt_key_123456";

app.use(express.json());

// In-memory mock database
interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "patient" | "doctor" | "admin";
}

interface Doctor {
  id: string;
  name: string;
  department: string;
  specialty: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  department: string;
  doctorId: string;
  reason: string;
  status: string;
  userId: string;
}

const users: User[] = [
  {
    id: "user_doc1",
    email: "priya@starhospital.com",
    passwordHash: bcrypt.hashSync("doctor123", 10),
    name: "Dr. Priya Sharma",
    role: "doctor",
  },
  {
    id: "user_admin1",
    email: "admin@starhospital.com",
    passwordHash: bcrypt.hashSync("admin123", 10),
    name: "Admin User",
    role: "admin",
  },
  {
    id: "user_patient1",
    email: "patient@gmail.com",
    passwordHash: bcrypt.hashSync("patient123", 10),
    name: "John Doe",
    role: "patient",
  }
];

const doctors: Doctor[] = [
  { id: "doc1", name: "Dr. Sarah Jenkins", department: "Cardiology", specialty: "Senior Cardiologist" },
  { id: "doc2", name: "Dr. Michael Chen", department: "Orthopedics", specialty: "Orthopedic Surgeon" },
  { id: "doc3", name: "Dr. Elena Rodriguez", department: "Neurology", specialty: "Chief Neurologist" },
  { id: "doc4", name: "Dr. James Wilson", department: "Pediatrics", specialty: "Head of Pediatrics" },
  { id: "doc5", name: "Dr. Priya Sharma", department: "Cardiology", specialty: "Cardiologist" }
];

const appointments: Appointment[] = [
  {
    id: "apt1",
    date: "2026-06-10",
    time: "10:30",
    patientName: "John Doe",
    department: "Cardiology",
    doctorId: "doc5",
    reason: "Regular cardiac checkup",
    status: "Confirmed",
    userId: "user_patient1"
  },
  {
    id: "apt2",
    date: "2026-06-12",
    time: "14:00",
    patientName: "Jane Smith",
    department: "Pediatrics",
    doctorId: "doc4",
    reason: "Child vaccination visit",
    status: "Scheduled",
    userId: "user_patient_jane"
  }
];

// Authentication Middleware
interface AuthRequest extends express.Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

const authenticateToken = (req: AuthRequest, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token is required" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({ error: "Invalid or expired token" });
      return;
    }
    req.user = decoded as AuthRequest["user"];
    next();
  });
};

// API Routes

// 1. Register a new patient
app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ error: "Email, password, and name are required" });
    return;
  }

  const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (userExists) {
    res.status(400).json({ error: "User already exists with this email" });
    return;
  }

  const newUser: User = {
    id: "user_" + Math.random().toString(36).substr(2, 9),
    email: email.toLowerCase(),
    passwordHash: bcrypt.hashSync(password, 10),
    name,
    role: "patient"
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      role: newUser.role
    }
  });
});

// 2. Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isPasswordValid) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.status(200).json({
    token,
    user: {
      name: user.name,
      role: user.role
    }
  });
});

// 3. Get all doctors
app.get("/api/doctors", (req, res) => {
  res.status(200).json(doctors);
});

// 4. Get logged in patient's appointments
app.get("/api/appointments/my", authenticateToken, (req: AuthRequest, res) => {
  if (!req.user) {
    res.status(401).json({ error: "User unauthorized" });
    return;
  }
  const userAppointments = appointments.filter(apt => apt.userId === req.user?.id);
  res.status(200).json(userAppointments);
});

// 5. Get all appointments (Doctors or Admins only)
app.get("/api/appointments/all", authenticateToken, (req: AuthRequest, res) => {
  if (!req.user) {
    res.status(401).json({ error: "User unauthorized" });
    return;
  }

  if (req.user.role !== "doctor" && req.user.role !== "admin") {
    res.status(403).json({ error: "Access denied. Doctors and Admins only." });
    return;
  }

  res.status(200).json(appointments);
});

// 6. Book an appointment
app.post("/api/appointments", authenticateToken, (req: AuthRequest, res) => {
  if (!req.user) {
    res.status(401).json({ error: "User unauthorized" });
    return;
  }

  const { doctorId, department, date, time, reason } = req.body;

  if (!doctorId || !department || !date || !time) {
    res.status(400).json({ error: "Doctor ID, department, date, and time are required" });
    return;
  }

  const newAppointment: Appointment = {
    id: "apt_" + Math.random().toString(36).substr(2, 9),
    date,
    time,
    patientName: req.user.name,
    department,
    doctorId,
    reason: reason || "",
    status: "Scheduled",
    userId: req.user.id
  };

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// 7. AI Chatbot Endpoint (Demo Mode)
app.post("/api/ai/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  setTimeout(() => {
    let reply = "Hello! I am the Star Hospital AI Assistant. How can I help you today?";
    const lower = message.toLowerCase();
    
    if (lower.includes("headache") || lower.includes("pain") || lower.includes("fever")) {
      reply = "I'm sorry to hear that you are feeling unwell. For general symptoms like fever, headache, or body pain, you can consult our General Medicine or Pediatrics (for children) department. Please consider booking an appointment with one of our specialists.";
    } else if (lower.includes("heart") || lower.includes("cardiac") || lower.includes("chest")) {
      reply = "Chest pain or cardiac issues can be critical. I recommend scheduling an appointment with our Cardiology department immediately. If it's an emergency, please call +91 1800 123 4567.";
    } else if (lower.includes("bone") || lower.includes("fracture") || lower.includes("injury") || lower.includes("joint")) {
      reply = "For bone-related issues, fractures, joint pain, or sports injuries, our Orthopedics department is the best choice. You can view available slots and book an appointment online.";
    } else if (lower.includes("brain") || lower.includes("head") || lower.includes("dizzy") || lower.includes("numb")) {
      reply = "Neurological symptoms like persistent dizziness, numbness, or memory issues are evaluated by our Neurology department. You can schedule a consult with our Chief Neurologist.";
    } else if (lower.includes("child") || lower.includes("baby") || lower.includes("kid") || lower.includes("vaccin")) {
      reply = "Our Pediatrics department offers comprehensive healthcare for infants and children. You can book an appointment with our specialist, Dr. James Wilson.";
    } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      reply = "Hello! I am the Star Hospital AI Assistant. You can ask me questions about your symptoms, recommend departments, or inquire about booking appointments!";
    } else {
      reply = `Thank you for your question: "${message}". I can help recommend the right medical department if you describe your symptoms!`;
    }
    res.status(200).json({ reply });
  }, 800); // Simulate network latency
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

