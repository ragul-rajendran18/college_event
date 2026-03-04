-- Create Events Table
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Registrations Table
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    student_id TEXT NOT NULL,
    department TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policies for Events (Public read access)
DROP POLICY IF EXISTS "Allow public read access on events" ON events;
CREATE POLICY "Allow anon read access on events"
ON events FOR SELECT
TO anon
USING (true);

-- Policies for Registrations
DROP POLICY IF EXISTS "Allow public to register" ON registrations;
CREATE POLICY "Allow anon to register"
ON registrations FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated to view registrations" ON registrations;
CREATE POLICY "Allow service_role to view registrations"
ON registrations FOR SELECT
TO service_role
USING (true);

-- Insert dummy data for events
INSERT INTO events (title, description, price, date, location, image_url)
VALUES 
('ANTI-GRAVITY 2026', 'The ultimate tech showdown.', '₹499', '2026-03-15T10:00:00Z', 'Main Auditorium', 'https://example.com/event1.jpg'),
('CYBER HACKATHON', '72 hours of intense coding.', 'FREE', '2026-03-20T09:00:00Z', 'Tech Park Lab 4', 'https://example.com/event2.jpg');
