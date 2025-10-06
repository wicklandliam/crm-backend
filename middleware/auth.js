import { createClient } from '@supabase/supabase-js';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for backend
);

/**
 * Middleware to verify Supabase JWT token
 * Extracts the token from Authorization header and validates it
 */
export const authenticateUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }

    // Attach user info to request object for use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to authenticate request'
    });
  }
};

/**
 * Optional middleware - allows both authenticated and unauthenticated requests
 * Attaches user to req if token is valid, but doesn't reject if missing/invalid
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    req.user = (error || !user) ? null : user;
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    req.user = null;
    next();
  }
};
