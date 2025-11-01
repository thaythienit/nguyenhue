import React from 'react';
import { AcademicCapIcon, EyeIcon } from '../components/icons';
import { usePageContent } from '../contexts/PageContentContext';

const MissionVisionPage: React.FC = () => {
  const { content } = usePageContent();
  const { missionVision: mvContent } = content;

  return (
    <div className="bg-slate-50">
        <div className="relative h-64 md:h-80 bg-indigo-700">
            <img src="https://picsum.photos/seed/vision-banner/1600/600" alt="Students looking towards the future" className="w-full h-full object-cover opacity-30"/>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-tight">Sứ mệnh & Tầm nhìn</h1>
            </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                
                {/* Mission Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-indigo-100 p-4 rounded-full mb-6">
                           <AcademicCapIcon className="h-12 w-12 text-indigo-600"/>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">{mvContent.missionTitle}</h2>
                        <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                           {mvContent.missionText}
                        </p>
                    </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex flex-col items-center text-center">
                         <div className="bg-emerald-100 p-4 rounded-full mb-6">
                           <EyeIcon className="h-12 w-12 text-emerald-600"/>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">{mvContent.visionTitle}</h2>
                        <div className="w-20 h-1 bg-emerald-500 mb-6"></div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                           {mvContent.visionText}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default MissionVisionPage;