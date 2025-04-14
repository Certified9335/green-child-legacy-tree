import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface ResourceViewerProps {
  resource: Tables<'educational_resources'>;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceViewer: React.FC<ResourceViewerProps> = ({ resource, isOpen, onClose }) => {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = resource.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const renderContent = () => {
    switch (resource.type) {
      case 'article':
        return (
          <div className="prose prose-green max-w-none">
            <div dangerouslySetInnerHTML={{ __html: resource.content }} />
          </div>
        );
      
      case 'video':
        return (
          <div className="aspect-video w-full">
            <iframe
              src={resource.metadata?.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      
      case 'guide':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>
            <Button
              onClick={() => resource.metadata?.fileUrl && handleDownload(resource.metadata.fileUrl)}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Guide
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{resource.title}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ResourceViewer; 