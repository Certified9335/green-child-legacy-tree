# Educational Resources

This document provides information on how to set up and manage educational resources in the Green Child Legacy Tree application.

## Overview

The Resources section of the application allows users to access three types of educational content:

1. **Articles** - Text-based content with rich formatting
2. **Videos** - Embedded video content
3. **Guides** - Downloadable PDF guides

## Database Structure

Resources are stored in the `educational_resources` table with the following structure:

```sql
CREATE TABLE educational_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('article', 'video', 'guide')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

The `type` field determines the resource type, and the `metadata` field contains type-specific information:

- For articles: `{ "readTime": "5 min read" }`
- For videos: `{ "duration": "12:45", "videoUrl": "https://..." }`
- For guides: `{ "pages": 24, "fileUrl": "https://..." }`

## Setting Up Sample Resources

There are two ways to set up sample resources:

### Option 1: Using SQL Migrations

1. Run the migration to add the type and metadata columns:
   ```
   supabase/migrations/20240320000000_add_resource_types.sql
   ```

2. Insert sample resources:
   ```
   supabase/migrations/20240321000000_insert_sample_resources.sql
   ```

### Option 2: Using the Setup Script

1. Install dependencies:
   ```
   npm install dotenv @supabase/supabase-js
   ```

2. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-service-key
   ```

3. Run the setup script:
   ```
   node scripts/setup-resources.js
   ```

   Or use the direct insertion script:
   ```
   node scripts/insert-sample-resources.js
   ```

## Adding New Resources

### Through the Admin Interface

1. Log in as an admin
2. Navigate to the Resources section
3. Click "Add New Resource"
4. Fill in the required fields:
   - Title
   - Description
   - Content (HTML for articles, text for videos/guides)
   - Category
   - Image URL
   - Type (article, video, or guide)
   - Metadata (type-specific information)

### Through the API

You can also add resources programmatically using the Supabase client:

```javascript
const { data, error } = await supabase
  .from('educational_resources')
  .insert({
    title: 'New Resource Title',
    description: 'Resource description',
    content: 'Resource content',
    category: 'Category',
    image_url: 'https://example.com/image.jpg',
    type: 'article',
    metadata: { readTime: '5 min read' }
  })
  .select();
```

## Resource Viewer Component

The `ResourceViewer` component (`src/components/resources/ResourceViewer.tsx`) handles the display of different resource types:

- **Articles**: Displays formatted HTML content
- **Videos**: Embeds the video player
- **Guides**: Provides a download button for the PDF

## Customizing the Resources Page

The main Resources page (`src/pages/Resources.tsx`) displays resources in tabs based on their type. You can customize the layout, styling, and filtering options by modifying this file.

## Troubleshooting

If you encounter issues with the resources functionality:

1. Check that the database schema is correctly set up
2. Verify that resources have the correct type and metadata
3. Ensure that the content URLs (video URLs, file URLs) are accessible
4. Check the browser console for any JavaScript errors 