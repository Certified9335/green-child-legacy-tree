-- Add type and metadata columns to educational_resources table
ALTER TABLE educational_resources
ADD COLUMN type text NOT NULL CHECK (type IN ('article', 'video', 'guide')),
ADD COLUMN metadata jsonb;

-- Create an index on the type column for faster filtering
CREATE INDEX idx_educational_resources_type ON educational_resources(type);

-- Add a comment to explain the metadata structure
COMMENT ON COLUMN educational_resources.metadata IS 'JSON object containing type-specific metadata:
- For articles: { "readTime": string }
- For videos: { "duration": string, "videoUrl": string }
- For guides: { "pages": number, "fileUrl": string }';

-- Update existing rows to have a default type
UPDATE educational_resources
SET type = 'article'
WHERE type IS NULL; 