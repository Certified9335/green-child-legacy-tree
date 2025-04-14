-- Insert additional articles
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
  'The Role of Trees in Biodiversity Conservation',
  'Explore how trees contribute to biodiversity and ecosystem health.',
  '<h2>Biodiversity Hotspots</h2><p>Trees are fundamental to biodiversity, providing habitat, food, and shelter for countless species. Forest ecosystems contain approximately 80% of the world''s terrestrial biodiversity.</p><h2>Ecosystem Services</h2><p>Beyond their role as habitat, trees provide essential ecosystem services including soil stabilization, water purification, and climate regulation. These services are crucial for maintaining healthy ecosystems and supporting diverse plant and animal communities.</p><h2>Threats to Tree Biodiversity</h2><p>Deforestation, climate change, and invasive species pose significant threats to tree biodiversity. Understanding these threats is the first step toward effective conservation strategies.</p><h2>Conservation Strategies</h2><p>Effective biodiversity conservation requires a multi-faceted approach including protected areas, sustainable forest management, and restoration of degraded ecosystems. Community involvement is also essential for long-term success.</p>',
  'Conservation',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'article',
  '{"readTime": "7 min read"}'
),
(
  'Indigenous Knowledge and Tree Conservation',
  'Learn about traditional ecological knowledge and its importance in tree conservation.',
  '<h2>Traditional Ecological Knowledge</h2><p>Indigenous peoples have developed sophisticated knowledge systems about trees and forests over millennia. This traditional ecological knowledge (TEK) offers valuable insights for modern conservation efforts.</p><h2>Cultural Significance</h2><p>Trees hold deep cultural significance for many indigenous communities, serving as symbols of identity, sources of medicine, and centers of spiritual practice. Understanding these cultural connections is essential for respectful and effective conservation.</p><h2>Integrating Knowledge Systems</h2><p>Modern conservation can benefit greatly from integrating indigenous knowledge with scientific approaches. This collaborative approach often leads to more effective and culturally appropriate conservation strategies.</p><h2>Case Studies</h2><p>From the Amazon rainforest to the boreal forests of Canada, indigenous-led conservation initiatives demonstrate the power of traditional knowledge in protecting tree biodiversity and ecosystem health.</p>',
  'Culture',
  'https://images.unsplash.com/photo-1511497584788-876760111969',
  'article',
  '{"readTime": "6 min read"}'
);

-- Insert additional videos
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
  'The Hidden Life of Trees: A Documentary',
  'Discover the fascinating underground network that connects trees in forests.',
  'This documentary explores the groundbreaking research on how trees communicate and support each other through underground fungal networks, challenging our understanding of forest ecosystems.',
  'Science',
  'https://images.unsplash.com/photo-1511497584788-876760111969',
  'video',
  '{"duration": "45:30", "videoUrl": "https://www.youtube.com/embed/Un2yBgIAxYs"}'
),
(
  'Community Tree Planting: Making a Difference Together',
  'See how communities around the world are coming together to plant trees and restore ecosystems.',
  'This inspiring video showcases community tree planting initiatives from urban neighborhoods to rural villages, demonstrating the power of collective action in environmental restoration.',
  'Community',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
  'video',
  '{"duration": "15:20", "videoUrl": "https://www.youtube.com/embed/Un2yBgIAxYs"}'
);

-- Insert additional guides
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
  'Creating a Wildlife-Friendly Garden with Native Trees',
  'Learn how to design a garden that supports local wildlife using native tree species.',
  'This comprehensive guide provides step-by-step instructions for creating a wildlife-friendly garden using native trees. Includes information on selecting appropriate species, planting techniques, and ongoing maintenance to maximize wildlife benefits.',
  'Gardening',
  'https://images.unsplash.com/photo-1511497584788-876760111969',
  'guide',
  '{"pages": 32, "fileUrl": "https://example.com/guides/wildlife-garden-guide.pdf"}'
),
(
  'Tree Planting for Climate Action: A Community Guide',
  'Practical guide for organizing community tree planting events to combat climate change.',
  'This guide provides everything you need to organize successful community tree planting events. From selecting appropriate species and sites to engaging volunteers and ensuring proper care, this resource helps communities take meaningful climate action through tree planting.',
  'Climate Action',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
  'guide',
  '{"pages": 28, "fileUrl": "https://example.com/guides/climate-action-guide.pdf"}'
); 