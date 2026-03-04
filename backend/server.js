import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Using Anon Key as requested

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// GET all events
app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: 'Event not found' });
    }
});

// POST new registration
app.post('/api/register', async (req, res) => {
    const { event_id, full_name, email, student_id, department, payment_method } = req.body;

    if (!event_id || !full_name || !email || !student_id || !department || !payment_method) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase
            .from('registrations')
            .insert([
                {
                    event_id,
                    full_name,
                    email,
                    student_id,
                    department,
                    payment_method,
                    payment_status: 'pending' // Default status
                }
            ])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Registration successful', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
