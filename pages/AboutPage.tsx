import React from 'react';
import { BookOpenIcon, EyeIcon, UsersIcon, AcademicCapIcon, HomeIcon } from '../components/icons';
import { usePageContent } from '../contexts/PageContentContext';

const AboutPage: React.FC = () => {
  const { content } = usePageContent();
  const { about: aboutContent } = content;

  return (
    <div className="bg-white">
      <div className="relative h-64 md:h-80 bg-indigo-700">
        <img src="https://picsum.photos/seed/school-building/1600/600" alt="School building" className="w-full h-full object-cover opacity-30"/>
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-tight">Về Chúng Tôi</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
            
            {/* History Section */}
            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center"><BookOpenIcon className="h-8 w-8 mr-3 text-indigo-600"/> Lịch sử phát triển</h2>
                        {aboutContent.history.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-slate-600 leading-relaxed mb-4">{paragraph}</p>
                        ))}
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                        <img src="https://picsum.photos/seed/school-history/500/400" alt="Old school photo" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mb-16 bg-slate-50 p-12 rounded-xl">
                 <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center"><AcademicCapIcon className="h-8 w-8 mr-3 text-indigo-600"/> Sứ mệnh</h2>
                        <p className="text-slate-600 leading-relaxed">{aboutContent.mission}</p>
                    </div>
                     <div className="flex flex-col">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center"><EyeIcon className="h-8 w-8 mr-3 text-indigo-600"/> Tầm nhìn</h2>
                        <p className="text-slate-600 leading-relaxed">{aboutContent.vision}</p>
                    </div>
                </div>
            </section>

             {/* Staff Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center"><UsersIcon className="h-8 w-8 mr-3 text-indigo-600"/> Đội ngũ giáo viên</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {aboutContent.teachers.map(teacher => (
                        <div key={teacher.name} className="bg-white text-center rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <img src={teacher.image} alt={teacher.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-200"/>
                            <h3 className="text-lg font-semibold text-slate-800">{teacher.name}</h3>
                            <p className="text-indigo-600 font-medium">{teacher.role}</p>
                            <p className="text-sm text-slate-500 mt-1">{teacher.expertise}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Facilities Section */}
            <section>
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center"><HomeIcon className="h-8 w-8 mr-3 text-indigo-600"/> Cơ sở vật chất</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <img src="https://picsum.photos/seed/facility1/400/300" alt="Classroom" className="rounded-lg shadow-md w-full h-full object-cover"/>
                    <img src="https://picsum.photos/seed/facility2/400/300" alt="Library" className="rounded-lg shadow-md w-full h-full object-cover"/>
                    <img src="https://picsum.photos/seed/facility3/400/300" alt="Playground" className="rounded-lg shadow-md w-full h-full object-cover"/>
                 </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;