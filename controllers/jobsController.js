import { supabase } from '../config/supabase.js';

const getAllJobs = async (req, res) => {
  try {
    // req.user is set by the authenticateUser middleware
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createJob = async (req, res) => {
  try {
    const { client_name, email, phone, status, description } = req.body;
    const userId = req.user.id;

    console.log('Creating job with data:', { client_name, email, phone, status, description, user_id: userId });

    const { data, error } = await supabase
      .from('jobs')
      .insert([{ client_name, email, phone, status, description, user_id: userId }])
      .select()
      .single();

    console.log('Supabase response - data:', data, 'error:', error);

    if (error) throw error;

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_name, email, phone, status, description } = req.body;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('jobs')
      .update({ client_name, email, phone, status, description })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
