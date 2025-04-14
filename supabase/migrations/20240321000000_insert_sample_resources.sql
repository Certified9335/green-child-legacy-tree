-- Insert sample articles
INSERT INTO educational_resources (
  title, 
  description, 
  content, 
  category, 
  image_url, 
  type, 
  metadata
) VALUES 
(
  'The Importance of Trees in Urban Areas',
  'Learn about the environmental impact of planting trees in cities and urban spaces.',
  '<h2>Why Urban Trees Matter</h2><p>Trees in urban environments provide numerous benefits that extend far beyond their aesthetic appeal. They help combat climate change by absorbing carbon dioxide, reduce urban heat islands, improve air quality, and provide habitat for wildlife.</p><h2>Environmental Benefits</h2><p>Urban trees act as natural air filters, removing pollutants like nitrogen dioxide, sulfur dioxide, and particulate matter. A single mature tree can absorb up to 48 pounds of carbon dioxide per year and release enough oxygen for two people.</p><h2>Social and Economic Benefits</h2><p>Beyond environmental benefits, urban trees enhance property values, reduce energy costs through shading, and create more pleasant outdoor spaces that encourage community interaction and physical activity.</p><h2>How You Can Help</h2><p>You can contribute to urban forestry by participating in local tree planting initiatives, supporting organizations that plant trees in cities, or simply caring for the trees in your neighborhood.</p>',
  'Environment',
  'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31',
  'article',
  '{"readTime": "5 min read"}'
),
(
  'Best Tree Species for Carbon Capture',
  'Discover which tree species are most effective for carbon sequestration.',
  '<h2>Carbon Sequestration Champions</h2><p>Not all trees are created equal when it comes to carbon capture. Some species are particularly efficient at absorbing and storing carbon dioxide from the atmosphere.</p><h2>Top Performing Species</h2><p>Fast-growing species like poplars, eucalyptus, and certain pines are excellent at rapid carbon sequestration. However, long-lived species like oaks, maples, and beeches store carbon for centuries, making them valuable in the long term.</p><h2>Factors Affecting Carbon Capture</h2><p>The ability of a tree to capture carbon depends on several factors including growth rate, size at maturity, lifespan, and wood density. Trees with dense wood store more carbon per unit volume.</p><h2>Planting for Maximum Impact</h2><p>To maximize carbon capture, consider planting a diverse mix of species that includes both fast-growing trees for immediate impact and long-lived species for sustained carbon storage.</p>',
  'Science',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
  'article',
  '{"readTime": "8 min read"}'
),
(
  'How to Involve Children in Tree Planting',
  'Tips and activities for engaging children in environmental conservation through tree planting.',
  '<h2>Making Tree Planting Fun for Kids</h2><p>Involving children in tree planting activities can foster a lifelong connection to nature and environmental stewardship. Here are some creative ways to make tree planting engaging for young minds.</p><h2>Educational Activities</h2><p>Transform tree planting into a learning opportunity by teaching children about the tree''s life cycle, the importance of trees for wildlife, and how trees help the environment. Use age-appropriate language and hands-on demonstrations.</p><h2>Hands-On Involvement</h2><p>Give children age-appropriate tasks during the planting process. Younger children can help water the tree, while older children can assist with digging the hole or spreading mulch.</p><h2>Creating Lasting Connections</h2><p>Help children develop a personal connection to their tree by encouraging them to name it, draw pictures of it, or keep a growth journal to track its progress over time.</p>',
  'Education',
  'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
  'article',
  '{"readTime": "6 min read"}'
);

-- Insert sample videos
INSERT INTO educational_resources (
  title, 
  description, 
  content, 
  category, 
  image_url, 
  type, 
  metadata
) VALUES 
(
  'Tree Planting 101: A Beginner''s Guide',
  'Step-by-step tutorial on how to plant and care for young trees.',
  'This video provides a comprehensive guide to planting trees correctly, ensuring they establish strong roots and thrive in their new environment.',
  'Tutorial',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
  'video',
  '{"duration": "12:45", "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"}'
),
(
  'The Amazing Science Behind Tree Growth',
  'Explore the fascinating biological processes that allow trees to grow and thrive.',
  'This educational video explains the complex biological processes that enable trees to grow from tiny seeds into towering giants, including photosynthesis, nutrient transport, and seasonal adaptations.',
  'Science',
  'https://images.unsplash.com/photo-1501261379837-c3b516327829',
  'video',
  '{"duration": "18:20", "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"}'
);

-- Insert sample guides
INSERT INTO educational_resources (
  title, 
  description, 
  content, 
  category, 
  image_url, 
  type, 
  metadata
) VALUES 
(
  'Complete Guide to Tree Identification',
  'Learn to identify common tree species by their leaves, bark, and other characteristics.',
  'This comprehensive guide will help you identify trees in your neighborhood, local parks, and forests. Includes detailed information about leaf shapes, bark patterns, and seasonal changes.',
  'Field Guide',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
  'guide',
  '{"pages": 24, "fileUrl": "https://example.com/guides/tree-identification-guide.pdf"}'
),
(
  'Tree Care Through the Seasons',
  'Seasonal maintenance tips to keep your trees healthy all year round.',
  'This practical guide provides month-by-month care instructions for maintaining healthy trees throughout the year, including watering, pruning, fertilizing, and pest management.',
  'Maintenance',
  'https://images.unsplash.com/photo-1524146128017-b9dd0bfd2778',
  'guide',
  '{"pages": 18, "fileUrl": "https://example.com/guides/seasonal-tree-care.pdf"}'
); 