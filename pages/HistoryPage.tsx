import React from 'react';
import { BookOpenIcon } from '../components/icons';
import { usePageContent } from '../contexts/PageContentContext';

const HistoryPage: React.FC = () => {
  const { content } = usePageContent();
  const { history: historyContent } = content;

  return (
    <div className="bg-white">
      <div className="relative h-64 md:h-80 bg-indigo-700">
        <img src="https://picsum.photos/seed/history-banner/1600/600" alt="Historical photo of the school" className="w-full h-full object-cover opacity-30"/>
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-tight">Lịch sử phát triển</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                  <BookOpenIcon className="h-12 w-12 mx-auto text-indigo-600 mb-4"/>
                  <h2 className="text-3xl font-bold text-slate-800">{historyContent.title}</h2>
                  <p className="mt-4 text-lg text-slate-600">{historyContent.subtitle}</p>
              </div>

              {/* Timeline */}
              <div className="relative border-l-2 border-indigo-200 ml-6">
                  {historyContent.milestones.map((item, index) => (
                      <div key={index} className="mb-12 pl-12 relative">
                          <div className="absolute -left-[1.3rem] top-1 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            <span className="text-xs">{item.year}</span>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.event}</h3>
                            <p className="text-slate-600">{item.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default HistoryPage;