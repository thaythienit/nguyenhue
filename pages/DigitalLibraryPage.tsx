import React from 'react';
import { useFiles } from '../contexts/FileContext';
import { ManagedFile } from '../types';
import { FilePdfIcon, VideoCameraIcon, DocumentTextIcon, FolderOpenIcon } from '../components/icons';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileIcon: React.FC<{ fileType: ManagedFile['type'] }> = ({ fileType }) => {
    switch(fileType) {
        case 'pdf': return <FilePdfIcon className="h-8 w-8 text-rose-500" />;
        case 'video': return <VideoCameraIcon className="h-8 w-8 text-sky-500" />;
        default: return <DocumentTextIcon className="h-8 w-8 text-slate-500" />;
    }
}

const DigitalLibraryPage: React.FC = () => {
    const { files } = useFiles();
    const digitalFiles = files.filter(file => file.type !== 'image');

    return (
        <div className="bg-slate-50 min-h-[60vh]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Thư viện học liệu số</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Tài liệu tham khảo, bài giảng và các video hữu ích.</p>
                </div>

                <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-md border border-slate-200">
                    {digitalFiles.length > 0 ? (
                        <ul className="divide-y divide-slate-200">
                           {digitalFiles.map(file => (
                                <li key={file.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50/75 transition-colors">
                                    <div className="flex items-center space-x-4 overflow-hidden">
                                        <div className="bg-slate-100 p-3 rounded-lg flex-shrink-0">
                                            <FileIcon fileType={file.type} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-slate-800 truncate" title={file.name}>{file.name}</p>
                                            <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                    <a 
                                        href={file.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-all"
                                    >
                                        Xem / Tải
                                    </a>
                                </li>
                           ))}
                        </ul>
                    ) : (
                        <div className="text-center py-16">
                            <FolderOpenIcon className="h-16 w-16 text-slate-400 mx-auto mb-4"/>
                            <h2 className="text-xl font-semibold text-slate-600">Thư viện học liệu trống</h2>
                            <p className="text-slate-500 mt-2">Hiện chưa có tài liệu nào được tải lên.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DigitalLibraryPage;
