const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if user signed up with OAuth (no password)
    if (!user.password) {
      return res.status(401).json({ error: 'Please sign in with Google' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const googleAuth = async (req, res) => {
  const { credential } = req.body;
  
  try {
    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
      // If user exists but signed up with email/password, link accounts
      if (!user.provider) {
        user = await prisma.user.update({
          where: { email },
          data: {
            provider: 'google',
            providerId: googleId,
            name: user.name || name, // Keep existing name if set
          },
        });
      }
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name,
          provider: 'google',
          providerId: googleId,
        },
      });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Longer expiry for OAuth users
    });
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Google authentication failed' });
  }
};

module.exports = { signup, login, googleAuth };
