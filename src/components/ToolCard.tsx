import React from 'react';

interface ToolCardProps {
  name: string;
  description: string;
  downloadUrl: string;
  onDelete?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ name, description, downloadUrl, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 flex gap-2">
        <a 
          href={downloadUrl}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          download
        >
          Download
        </a>
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
