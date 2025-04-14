import { Tables } from '@/integrations/supabase/types';

// Mock resources data
export const mockResources: Tables<'educational_resources'>[] = [
  // Articles
  {
    id: '1',
    title: 'The Importance of Trees in Urban Areas',
    description: 'Learn about the environmental impact of planting trees in cities and urban spaces.',
    content: '<h2>Why Urban Trees Matter</h2><p>Trees in urban environments provide numerous benefits that extend far beyond their aesthetic appeal. They help combat climate change by absorbing carbon dioxide, reduce urban heat islands, improve air quality, and provide habitat for wildlife.</p><h2>Environmental Benefits</h2><p>Urban trees act as natural air filters, removing pollutants like nitrogen dioxide, sulfur dioxide, and particulate matter. A single mature tree can absorb up to 48 pounds of carbon dioxide per year and release enough oxygen for two people.</p><h2>Social and Economic Benefits</h2><p>Beyond environmental benefits, urban trees enhance property values, reduce energy costs through shading, and create more pleasant outdoor spaces that encourage community interaction and physical activity.</p><h2>How You Can Help</h2><p>You can contribute to urban forestry by participating in local tree planting initiatives, supporting organizations that plant trees in cities, or simply caring for the trees in your neighborhood.</p>',
    category: 'Environment',
    image_url: 'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31',
    type: 'article',
    metadata: { readTime: '5 min read' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Best Tree Species for Carbon Capture',
    description: 'Discover which tree species are most effective for carbon sequestration.',
    content: '<h2>Carbon Sequestration Champions</h2><p>Not all trees are created equal when it comes to carbon capture. Some species are particularly efficient at absorbing and storing carbon dioxide from the atmosphere.</p><h2>Top Performing Species</h2><p>Fast-growing species like poplars, eucalyptus, and certain pines are excellent at rapid carbon sequestration. However, long-lived species like oaks, maples, and beeches store carbon for centuries, making them valuable in the long term.</p><h2>Factors Affecting Carbon Capture</h2><p>The ability of a tree to capture carbon depends on several factors including growth rate, size at maturity, lifespan, and wood density. Trees with dense wood store more carbon per unit volume.</p><h2>Planting for Maximum Impact</h2><p>To maximize carbon capture, consider planting a diverse mix of species that includes both fast-growing trees for immediate impact and long-lived species for sustained carbon storage.</p>',
    category: 'Science',
    image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    type: 'article',
    metadata: { readTime: '8 min read' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'How to Involve Children in Tree Planting',
    description: 'Tips and activities for engaging children in environmental conservation through tree planting.',
    content: '<h2>Making Tree Planting Fun for Kids</h2><p>Involving children in tree planting activities can foster a lifelong connection to nature and environmental stewardship. Here are some creative ways to make tree planting engaging for young minds.</p><h2>Educational Activities</h2><p>Transform tree planting into a learning opportunity by teaching children about the tree\'s life cycle, the importance of trees for wildlife, and how trees help the environment. Use age-appropriate language and hands-on demonstrations.</p><h2>Hands-On Involvement</h2><p>Give children age-appropriate tasks during the planting process. Younger children can help water the tree, while older children can assist with digging the hole or spreading mulch.</p><h2>Creating Lasting Connections</h2><p>Help children develop a personal connection to their tree by encouraging them to name it, draw pictures of it, or keep a growth journal to track its progress over time.</p>',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
    type: 'article',
    metadata: { readTime: '6 min read' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Videos
  {
    id: '4',
    title: 'Tree Planting 101: A Beginner\'s Guide',
    description: 'Step-by-step tutorial on how to plant and care for young trees.',
    content: 'This video provides a comprehensive guide to planting trees correctly, ensuring they establish strong roots and thrive in their new environment.',
    category: 'Tutorial',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    type: 'video',
    metadata: { 
      duration: '12:45', 
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'The Amazing Science Behind Tree Growth',
    description: 'Explore the fascinating biological processes that allow trees to grow and thrive.',
    content: 'This educational video explains the complex biological processes that enable trees to grow from tiny seeds into towering giants, including photosynthesis, nutrient transport, and seasonal adaptations.',
    category: 'Science',
    image_url: 'https://images.unsplash.com/photo-1501261379837-c3b516327829',
    type: 'video',
    metadata: { 
      duration: '18:20', 
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Guides
  {
    id: '6',
    title: 'Complete Guide to Tree Identification',
    description: 'Learn to identify common tree species by their leaves, bark, and other characteristics.',
    content: 'This comprehensive guide will help you identify trees in your neighborhood, local parks, and forests. Includes detailed information about leaf shapes, bark patterns, and seasonal changes.',
    category: 'Field Guide',
    image_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
    type: 'guide',
    metadata: { 
      pages: 24, 
      fileUrl: 'https://example.com/guides/tree-identification-guide.pdf' 
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Tree Care Through the Seasons',
    description: 'Seasonal maintenance tips to keep your trees healthy all year round.',
    content: 'This practical guide provides month-by-month care instructions for maintaining healthy trees throughout the year, including watering, pruning, fertilizing, and pest management.',
    category: 'Maintenance',
    image_url: 'https://images.unsplash.com/photo-1524146128017-b9dd0bfd2778',
    type: 'guide',
    metadata: { 
      pages: 18, 
      fileUrl: 'https://example.com/guides/seasonal-tree-care.pdf' 
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]; 