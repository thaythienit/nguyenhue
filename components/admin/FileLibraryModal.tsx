import React, { useMemo } from 'react';
import { useFiles } from '../../contexts/FileContext';
import { ManagedFile } from '../../types';
import { XIcon, VideoCameraIcon, FilePdfIcon, DocumentTextIcon } from '../icons';

interface FileLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  filter?: 'image' | 'all';
}

const FileThumbnail: React.FC<{ file: ManagedFile }> = ({ file }) => {
  switch (file.type) {
    case 'image':
      return <img src={file.url} alt={file.name} className="h-full w-full object-cover" />;
    case 'video':
      return <div className="h-full w-full bg-slate-200 flex items-center justify-center"><VideoCameraIcon className="h-8 w-8 text-slate-500" /></div>;
    case 'pdf':
      return <div className="h-full w-full bg-slate-200 flex items-center justify-center"><FilePdfIcon className="h-8 w-8 text-slate-500" /></div>;
    default:
      return <div className="h-full w-full bg-slate-200 flex items-center justify-center"><DocumentTextIcon className="h-8 w-8 text-slate-500" /></div>;
  }
};

const FileLibraryModal: React.FC<FileLibraryModalProps> = ({ isOpen, onClose, onSelect, filter = 'all' }) => {
  const { files } = useFiles();
  
  const filteredFiles = useMemo(() => {
    if (filter === 'image') {
      return files.filter(f => f.type === 'image');
    }
    return files;
  }, [files, filter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Chọn từ Thư viện</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><XIcon className="h-6 w-6 text-slate-600" /></button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">
          {filteredFiles.length === 0 ? (
             <div className="text-center py-12">
                <p className="text-slate-500">Không có tập tin nào phù hợp. Hãy thử tải lên một vài tập tin trước.</p>
             </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {filteredFiles.map(file => (
                <button 
                  key={file.id} 
                  onClick={() => onSelect(file.url)}
                  className="aspect-square border border-slate-200 rounded-md overflow-hidden hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  title={file.name}
                >
                  <FileThumbnail file={file} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end p-4 border-t bg-slate-50 rounded-b-lg flex-shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileLibraryModal;