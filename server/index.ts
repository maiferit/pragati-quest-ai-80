import express, { Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { email: string }
  }
}

const app = express();
app.use(cors());
app.use(express.json());

interface User {
  email: string;
  passwordHash: string;
}

const users: Record<string, User> = {};
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  if (users[email]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users[email] = { email, passwordHash };
  res.json({ message: 'User created' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = auth.substring(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/chat', authenticate, (req, res) => {
  const { message } = req.body;
  res.json({ reply: `Echo: ${message}` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
