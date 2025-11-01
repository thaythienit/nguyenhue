import React, { useState, useRef } from 'react';
import { useFiles } from '../../contexts/FileContext';
import { ManagedFile } from '../../types';
import { UploadIcon, TrashIcon, ClipboardCopyIcon, XIcon, PhotographIcon, VideoCameraIcon, FilePdfIcon, DocumentTextIcon } from '../../components/icons';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../../components/admin/AccessDenied';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileCard: React.FC<{ file: ManagedFile; onDelete: (id: string) => void }> = ({ file, onDelete }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(file.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderThumbnail = () => {
        switch (file.type) {
            case 'image':
                return <img src={file.url} alt={file.name} className="h-32 w-full object-cover"/>;
            case 'video':
                return <div className="h-32 w-full bg-slate-200 flex items-center justify-center"><VideoCameraIcon className="h-12 w-12 text-slate-500"/></div>;
            case 'pdf':
                return <div className="h-32 w-full bg-slate-200 flex items-center justify-center"><FilePdfIcon className="h-12 w-12 text-slate-500"/></div>;
            default:
                return <div className="h-32 w-full bg-slate-200 flex items-center justify-center"><DocumentTextIcon className="h-12 w-12 text-slate-500"/></div>;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            {renderThumbnail()}
            <div className="p-4">
                <p className="text-sm font-semibold text-slate-800 truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                <div className="flex items-center justify-end space-x-2 mt-4">
                     <button onClick={handleCopy} className="text-slate-500 hover:text-indigo-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors" title="Sao chép URL">
                        <ClipboardCopyIcon className="h-5 w-5"/>
                     </button>
                     <button onClick={() => onDelete(file.id)} className="text-slate-500 hover:text-rose-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors" title="Xóa tập tin">
                        <TrashIcon className="h-5 w-5"/>
                     </button>
                </div>
                 {copied && <p className="text-xs text-emerald-600 text-center mt-2">Đã sao chép!</p>}
            </div>
        </div>
    );
};

const UploadModal: React.FC<{ onClose: () => void; onUpload: (files: File[]) => void }> = ({ onClose, onUpload }) => {
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFilesToUpload(Array.from(e.target.files));
        }
    };

    const handleUploadClick = () => {
        if (filesToUpload.length > 0) {
            onUpload(filesToUpload);
            onClose();
        }
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Tải lên tập tin mới</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><XIcon className="h-6 w-6 text-slate-600"/></button>
                </div>
                <div className="p-6">
                    <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 bg-slate-50"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <UploadIcon className="h-12 w-12 text-slate-400 mx-auto mb-4"/>
                        <p className="text-slate-600">Kéo và thả hoặc nhấp để chọn tập tin</p>
                        <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
                    </div>
                     {filesToUpload.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Tập tin đã chọn:</h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 max-h-32 overflow-y-auto">
                                {filesToUpload.map(f => <li key={f.name}>{f.name}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
                 <div className="flex justify-end space-x-3 p-6 border-t bg-slate-50 rounded-b-lg">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300">Hủy</button>
                  <button 
                    type="button" 
                    onClick={handleUploadClick}
                    disabled={filesToUpload.length === 0}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed">
                        Tải lên {filesToUpload.length > 0 ? filesToUpload.length : ''} tập tin
                  </button>
                </div>
            </div>
        </div>
    )
}


const AdminFilesPage: React.FC = () => {
  const { files, addFiles, deleteFile } = useFiles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <AccessDenied />;
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tập tin này? Hành động này không thể hoàn tác.')) {
      deleteFile(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Tập tin</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          <UploadIcon className="h-5 w-5 mr-2" />
          Tải lên
        </button>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
            <PhotographIcon className="h-16 w-16 text-slate-300 mx-auto mb-4"/>
            <h2 className="text-xl font-semibold text-slate-600">Thư viện của bạn trống</h2>
            <p className="text-slate-500 mt-2">Nhấp vào nút "Tải lên" để bắt đầu thêm tập tin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {files.map(file => (
                <FileCard key={file.id} file={file} onDelete={handleDelete} />
            ))}
        </div>
      )}
      
      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} onUpload={addFiles} />}

    </div>
  );
};

export default AdminFilesPage;