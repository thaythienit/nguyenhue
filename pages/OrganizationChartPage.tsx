import React from 'react';
import { usePageContent } from '../contexts/PageContentContext';
import { OrgChartMember } from '../types';

const MemberNode: React.FC<{ member: OrgChartMember }> = ({ member }) => {
    return (
        // The `before:` pseudo-elements create the horizontal connecting lines
        <li className="relative pl-10 before:absolute before:left-0 before:top-0 before:w-6 before:h-px before:bg-slate-300 before:mt-11">
            <div className="relative bg-white p-4 rounded-lg shadow-md border border-slate-200 inline-block min-w-[280px]">
                <div className="flex items-center space-x-4">
                    <img src={member.imageUrl || 'https://i.pravatar.cc/150?u=placeholder'} alt={member.name} className="w-16 h-16 rounded-full border-2 border-indigo-200 object-cover" />
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
                        <p className="text-indigo-600 font-medium">{member.role}</p>
                    </div>
                </div>
            </div>

            {member.children && member.children.length > 0 && (
                // The `before:` pseudo-elements create the vertical connecting lines
                <ul className="pt-8 pl-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-slate-300">
                    {member.children.map(child => (
                        <MemberNode key={child.id} member={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};


const OrganizationChartPage: React.FC = () => {
    const { content } = usePageContent();
    const { organization: orgContent } = content;

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">{orgContent.title}</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">{orgContent.subtitle}</p>
                </div>

                <div className="flex justify-center">
                   {/* The root `ul` removes the connecting lines from the top-level members */}
                   <ul className="space-y-8">
                        {orgContent.chart.map(member => (
                            <li key={member.id} className="relative pl-10 before:hidden">
                                <MemberNode member={member} />
                            </li>
                        ))}
                   </ul>
                </div>
            </div>
        </div>
    );
}

export default OrganizationChartPage;
