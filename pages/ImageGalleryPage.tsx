import React, { useState } from 'react';
import { useFiles } from '../contexts/FileContext';
import { PhotographIcon, XIcon } from '../components/icons';

const ImageGalleryPage: React.FC = () => {
    const { files } = useFiles();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const imageFiles = files.filter(file => file.type === 'image');

    const ImageModal = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors z-50"
                aria-label="Close image viewer"
            >
                <XIcon className="h-8 w-8" />
            </button>
            <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Enlarged view" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"/>
            </div>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Thư viện hình ảnh</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Khoảnh khắc đáng nhớ của thầy và trò nhà trường.</p>
                </div>

                {imageFiles.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {imageFiles.map(file => (
                            <div 
                                key={file.id} 
                                className="group aspect-w-1 aspect-h-1 bg-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                onClick={() => setSelectedImage(file.url)}
                            >
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16 bg-slate-50 rounded-lg">
                        <PhotographIcon className="h-16 w-16 text-slate-400 mx-auto mb-4"/>
                        <h2 className="text-xl font-semibold text-slate-600">Thư viện ảnh trống</h2>
                        <p className="text-slate-500 mt-2">Hiện chưa có hình ảnh nào được tải lên.</p>
                    </div>
                )}
            </div>
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
};

export default ImageGalleryPage;
