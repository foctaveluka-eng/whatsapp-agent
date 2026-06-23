const { Client } = require('pg');

async function setup() {
  const client = new Client({
    connectionString: "postgresql://postgres:yVLJMRSK58IyDz06@db.uyzvbksuqiqbaiidjfyd.supabase.co:5432/postgres",
  });

  try {
    await client.connect();
    console.log("Connected to Supabase Postgres.");

    await client.query(`
      CREATE TABLE IF NOT EXISTS agents (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL,
        name TEXT NOT NULL,
        model TEXT NOT NULL,
        status TEXT DEFAULT 'Inactif',
        prompt TEXT,
        whatsapp_session JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        source TEXT,
        agent_id UUID REFERENCES agents(id),
        status TEXT DEFAULT 'Nouveau',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL,
        client_name TEXT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'En attente',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS knowledge (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL,
        filename TEXT NOT NULL,
        file_url TEXT NOT NULL,
        size INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS whatsapp_sessions (
        id TEXT PRIMARY KEY,
        user_id UUID NOT NULL,
        creds JSONB NOT NULL,
        status TEXT DEFAULT 'disconnected',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await client.end();
  }
}

setup();
