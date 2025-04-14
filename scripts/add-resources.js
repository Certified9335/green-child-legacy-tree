// This script provides multiple ways to add resources to the database
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://ucsezmpencgilipmsvhw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key-here';
const supabase = createClient(supabaseUrl, supabaseKey);

// Additional resources data
const additionalResources = [
  // Additional Articles
  {
    title: 'The Role of Trees in Biodiversity Conservation',
    description: 'Explore how trees contribute to biodiversity and ecosystem health.',
    content: '<h2>Biodiversity Hotspots</h2><p>Trees are fundamental to biodiversity, providing habitat, food, and shelter for countless species. Forest ecosystems contain approximately 80% of the world\'s terrestrial biodiversity.</p><h2>Ecosystem Services</h2><p>Beyond their role as habitat, trees provide essential ecosystem services including soil stabilization, water purification, and climate regulation. These services are crucial for maintaining healthy ecosystems and supporting diverse plant and animal communities.</p><h2>Threats to Tree Biodiversity</h2><p>Deforestation, climate change, and invasive species pose significant threats to tree biodiversity. Understanding these threats is the first step toward effective conservation strategies.</p><h2>Conservation Strategies</h2><p>Effective biodiversity conservation requires a multi-faceted approach including protected areas, sustainable forest management, and restoration of degraded ecosystems. Community involvement is also essential for long-term success.</p>',
    category: 'Conservation',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    type: 'article',
    metadata: { readTime: '7 min read' }
  },
  {
    title: 'Indigenous Knowledge and Tree Conservation',
    description: 'Learn about traditional ecological knowledge and its importance in tree conservation.',
    content: '<h2>Traditional Ecological Knowledge</h2><p>Indigenous peoples have developed sophisticated knowledge systems about trees and forests over millennia. This traditional ecological knowledge (TEK) offers valuable insights for modern conservation efforts.</p><h2>Cultural Significance</h2><p>Trees hold deep cultural significance for many indigenous communities, serving as symbols of identity, sources of medicine, and centers of spiritual practice. Understanding these cultural connections is essential for respectful and effective conservation.</p><h2>Integrating Knowledge Systems</h2><p>Modern conservation can benefit greatly from integrating indigenous knowledge with scientific approaches. This collaborative approach often leads to more effective and culturally appropriate conservation strategies.</p><h2>Case Studies</h2><p>From the Amazon rainforest to the boreal forests of Canada, indigenous-led conservation initiatives demonstrate the power of traditional knowledge in protecting tree biodiversity and ecosystem health.</p>',
    category: 'Culture',
    image_url: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    type: 'article',
    metadata: { readTime: '6 min read' }
  },
  
  // Additional Videos
  {
    title: 'The Hidden Life of Trees: A Documentary',
    description: 'Discover the fascinating underground network that connects trees in forests.',
    content: 'This documentary explores the groundbreaking research on how trees communicate and support each other through underground fungal networks, challenging our understanding of forest ecosystems.',
    category: 'Science',
    image_url: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    type: 'video',
    metadata: { 
      duration: '45:30', 
      videoUrl: 'https://www.youtube.com/embed/Un2yBgIAxYs' 
    }
  },
  {
    title: 'Community Tree Planting: Making a Difference Together',
    description: 'See how communities around the world are coming together to plant trees and restore ecosystems.',
    content: 'This inspiring video showcases community tree planting initiatives from urban neighborhoods to rural villages, demonstrating the power of collective action in environmental restoration.',
    category: 'Community',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    type: 'video',
    metadata: { 
      duration: '15:20', 
      videoUrl: 'https://www.youtube.com/embed/Un2yBgIAxYs' 
    }
  },
  
  // Additional Guides
  {
    title: 'Creating a Wildlife-Friendly Garden with Native Trees',
    description: 'Learn how to design a garden that supports local wildlife using native tree species.',
    content: 'This comprehensive guide provides step-by-step instructions for creating a wildlife-friendly garden using native trees. Includes information on selecting appropriate species, planting techniques, and ongoing maintenance to maximize wildlife benefits.',
    category: 'Gardening',
    image_url: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    type: 'guide',
    metadata: { 
      pages: 32, 
      fileUrl: 'https://example.com/guides/wildlife-garden-guide.pdf' 
    }
  },
  {
    title: 'Tree Planting for Climate Action: A Community Guide',
    description: 'Practical guide for organizing community tree planting events to combat climate change.',
    content: 'This guide provides everything you need to organize successful community tree planting events. From selecting appropriate species and sites to engaging volunteers and ensuring proper care, this resource helps communities take meaningful climate action through tree planting.',
    category: 'Climate Action',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    type: 'guide',
    metadata: { 
      pages: 28, 
      fileUrl: 'https://example.com/guides/climate-action-guide.pdf' 
    }
  }
];

// Function to add resources using the JavaScript approach
async function addResourcesWithJS() {
  console.log('Adding resources using JavaScript approach...');

  try {
    // Insert the additional resources
    const { data, error } = await supabase
      .from('educational_resources')
      .insert(additionalResources)
      .select();

    if (error) {
      console.error('Error inserting resources:', error);
      return false;
    }

    console.log(`Successfully added ${data.length} new resources using JavaScript`);
    console.log('New resource types breakdown:');
    const typeCounts = data.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {});
    console.log(typeCounts);
    return true;

  } catch (error) {
    console.error('Error adding resources with JavaScript:', error);
    return false;
  }
}

// Function to add resources using the SQL approach
async function addResourcesWithSQL() {
  console.log('Adding resources using SQL approach...');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../supabase/migrations/20240322000000_add_more_resources.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return false;
    }
    
    console.log('Successfully added resources using SQL');
    
    // Verify the resources were added
    const { data, error: fetchError } = await supabase
      .from('educational_resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (fetchError) {
      console.error('Error fetching resources:', fetchError);
      return false;
    }
    
    console.log(`Found ${data.length} recent resources`);
    return true;
    
  } catch (error) {
    console.error('Error adding resources with SQL:', error);
    return false;
  }
}

// Main function to try both approaches
async function addResources() {
  console.log('Starting to add resources...');
  
  // Try JavaScript approach first
  const jsSuccess = await addResourcesWithJS();
  
  // If JavaScript approach fails, try SQL approach
  if (!jsSuccess) {
    console.log('JavaScript approach failed, trying SQL approach...');
    await addResourcesWithSQL();
  }
  
  console.log('Resource addition process completed');
}

// Run the main function
addResources(); 