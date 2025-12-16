import React from 'react';
import { Resource, ResourceType } from '../types';
import { FileText, Book, FileQuestion, Download, Eye, Calendar, User } from 'lucide-react';
import Button from './Button';

interface ResourceCardProps {
  resource: Resource;
  onDownload?: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload }) => {
  const getIcon = () => {
    switch (resource.type) {
      case ResourceType.Book: return <Book className="w-8 h-8 text-blue-500" />;
      case ResourceType.Note: return <FileText className="w-8 h-8 text-emerald-500" />;
      case ResourceType.Paper: return <FileQuestion className="w-8 h-8 text-amber-500" />;
      default: return <FileText className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-lg">
          {getIcon()}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          resource.type === ResourceType.Book ? 'bg-blue-100 text-blue-800' :
          resource.type === ResourceType.Note ? 'bg-emerald-100 text-emerald-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          {resource.type}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2" title={resource.title}>
        {resource.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">{resource.subject}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span className="truncate max-w-[80px]">{resource.uploadedBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{resource.uploadDate}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={() => window.open(resource.fileUrl, '_blank')}
          >
            <Eye className="w-3 h-3 mr-1.5" /> View
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={() => onDownload && onDownload(resource.id)}
          >
            <Download className="w-3 h-3 mr-1.5" /> Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;