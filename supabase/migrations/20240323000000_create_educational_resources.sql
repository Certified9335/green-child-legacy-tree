-- Create the educational_resources table
CREATE TABLE IF NOT EXISTS educational_resources (
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

-- Create an index on the type column for faster filtering
CREATE INDEX IF NOT EXISTS idx_educational_resources_type ON educational_resources(type);

-- Add a comment to explain the metadata structure
COMMENT ON COLUMN educational_resources.metadata IS 'JSON object containing type-specific metadata:
- For articles: { "readTime": string }
- For videos: { "duration": string, "videoUrl": string }
- For guides: { "pages": number, "fileUrl": string }'; 