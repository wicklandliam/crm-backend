import { supabase } from '../config/supabase.js';

const testConnection = async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    res.json({
      status: 'connected',
      message: 'Supabase connection successful',
      authenticated: !!user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Supabase connection failed',
      error: error.message
    });
  }
};

export default { testConnection };
