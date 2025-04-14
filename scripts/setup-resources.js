// This script sets up the database with sample resources
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://ucsezmpencgilipmsvhw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key-here';
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupResources() {
  console.log('Setting up educational resources...');

  try {
    // First, run the migration to add the type and metadata columns
    console.log('Running migration to add resource types...');
    const migrationPath = path.join(__dirname, '../supabase/migrations/20240320000000_add_resource_types.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the migration SQL
    const { error: migrationError } = await supabase.rpc('exec_sql', { sql: migrationSql });
    if (migrationError) {
      console.error('Migration error:', migrationError);
      return;
    }
    console.log('Migration completed successfully');

    // Then, insert the sample resources
    console.log('Inserting sample resources...');
    const sampleDataPath = path.join(__dirname, '../supabase/migrations/20240321000000_insert_sample_resources.sql');
    const sampleDataSql = fs.readFileSync(sampleDataPath, 'utf8');
    
    // Execute the sample data SQL
    const { error: sampleDataError } = await supabase.rpc('exec_sql', { sql: sampleDataSql });
    if (sampleDataError) {
      console.error('Sample data insertion error:', sampleDataError);
      return;
    }
    console.log('Sample resources inserted successfully');

    // Verify the resources were inserted
    const { data, error } = await supabase
      .from('educational_resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
      return;
    }

    console.log(`Successfully set up ${data.length} educational resources`);
    console.log('Resource types breakdown:');
    const typeCounts = data.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {});
    console.log(typeCounts);

  } catch (error) {
    console.error('Error setting up resources:', error);
  }
}

// Run the setup
setupResources(); 