import React, { useState } from 'react';
import { githubService } from '../services/github';

export const ToolUpload: React.FC<{ onUpload: () => void }> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      await githubService.uploadTool(file, description);
      onUpload();
      setFile(null);
      setDescription('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 mb-8">
      <div>
        <label className="block mb-2">Tool File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={!file || uploading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Tool'}
      </button>
    </form>
  );
};
