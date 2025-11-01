import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePageContent } from '../../contexts/PageContentContext';
import { PageContent, Teacher, Milestone, OrgChartMember } from '../../types';
import { ChevronLeftIcon, PlusIcon, TrashIcon } from '../../components/icons';
import FileLibraryModal from '../../components/admin/FileLibraryModal';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../../components/admin/AccessDenied';

const pageTitles: { [key: string]: string } = {
    about: 'Chỉnh sửa trang Giới thiệu',
    contact: 'Chỉnh sửa trang Liên hệ',
    history: 'Chỉnh sửa trang Lịch sử',
    missionVision: 'Chỉnh sửa trang Sứ mệnh & Tầm nhìn',
    organization: 'Chỉnh sửa trang Cơ cấu tổ chức'
}

const AdminEditPage: React.FC = () => {
    const { pageKey } = useParams<{ pageKey: keyof PageContent }>();
    const navigate = useNavigate();
    const { content, updatePageContent } = usePageContent();
    const { user } = useAuth();
    const [pageData, setPageData] = useState<any>(null);
    const [status, setStatus] = useState<{message: string, type: 'success' | 'error'} | null>(null);
    const [isFileLibraryOpen, setIsFileLibraryOpen] = useState(false);
    const [selectingTeacherIndex, setSelectingTeacherIndex] = useState<number | null>(null);
    const [selectingImageSetter, setSelectingImageSetter] = useState<((url: string) => void) | null>(null);


    useEffect(() => {
        if (pageKey && content[pageKey]) {
            setPageData(content[pageKey]);
        } else {
           navigate('/admin/pages');
        }
    }, [pageKey, content, navigate]);

    if (user?.role !== 'admin') {
      return <AccessDenied />;
    }

    if (!pageKey || !pageData) {
        return <div>Đang tải...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPageData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleTeacherChange = (index: number, field: keyof Teacher, value: string) => {
        const newTeachers = [...pageData.teachers];
        newTeachers[index] = { ...newTeachers[index], [field]: value };
        setPageData((prev: any) => ({ ...prev, teachers: newTeachers }));
    }
    
    const handleImageSelect = (url: string) => {
        if (selectingImageSetter) {
            selectingImageSetter(url);
        } else if (selectingTeacherIndex !== null) {
            handleTeacherChange(selectingTeacherIndex, 'image', url);
        }
        setIsFileLibraryOpen(false);
        setSelectingTeacherIndex(null);
        setSelectingImageSetter(null);
    };

    const openFileLibraryForTeacher = (index: number) => {
        setSelectingTeacherIndex(index);
        setIsFileLibraryOpen(true);
    };
    
    const openFileLibraryForOrgMember = (setter: (url: string) => void) => {
        setSelectingImageSetter(() => setter);
        setIsFileLibraryOpen(true);
    };


    const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
        const newMilestones = [...pageData.milestones];
        newMilestones[index] = { ...newMilestones[index], [field]: value };
        setPageData((prev: any) => ({ ...prev, milestones: newMilestones }));
    }

    const addMilestone = () => {
        const newMilestone: Milestone = { year: '', event: '', description: '' };
        setPageData((prev: any) => ({
            ...prev,
            milestones: [...prev.milestones, newMilestone]
        }));
    };

    const deleteMilestone = (index: number) => {
        if (window.confirm('Bạn có chắc muốn xóa cột mốc này?')) {
            const newMilestones = pageData.milestones.filter((_: any, i: number) => i !== index);
            setPageData((prev: any) => ({ ...prev, milestones: newMilestones }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try {
            updatePageContent(pageKey, pageData);
            setStatus({ message: 'Cập nhật thành công!', type: 'success' });
            window.scrollTo(0, 0);
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus({ message: 'Có lỗi xảy ra!', type: 'error' });
        }
    }

    const renderOrgChartForm = (members: OrgChartMember[], onChartChange: (newChart: OrgChartMember[]) => void): React.ReactNode => {
        const handleMemberChange = (index: number, updatedMember: OrgChartMember) => {
            const newMembers = [...members];
            newMembers[index] = updatedMember;
            onChartChange(newMembers);
        };
    
        const handleDelete = (index: number) => {
            if (window.confirm('Bạn có chắc muốn xóa thành viên này và tất cả cấp dưới?')) {
                const newMembers = members.filter((_, i) => i !== index);
                onChartChange(newMembers);
            }
        };
    
        const handleAddChild = (index: number) => {
            const parent = members[index];
            const newChild: OrgChartMember = {
                id: Date.now().toString(),
                name: 'Thành viên mới',
                role: 'Chức vụ',
                imageUrl: '',
                children: []
            };
            const newChildren = parent.children ? [...parent.children, newChild] : [newChild];
            handleMemberChange(index, { ...parent, children: newChildren });
        };
        
        const handleChildChartChange = (parentIndex: number, newChildren: OrgChartMember[]) => {
            const parent = members[parentIndex];
            handleMemberChange(parentIndex, { ...parent, children: newChildren });
        };

        return (
            <div>
            {members.map((member, index) => (
                <div key={member.id} className="ml-0 md:ml-8 pl-0 md:pl-4 border-l-2 border-slate-200 mt-4 first:mt-0 first:border-l-0 first:ml-0 first:pl-0">
                    <div className="p-4 border rounded-md bg-slate-50 mb-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input value={member.name} onChange={(e) => handleMemberChange(index, {...member, name: e.target.value})} placeholder="Tên" className="p-2 border border-slate-300 rounded-md"/>
                            <input value={member.role} onChange={(e) => handleMemberChange(index, {...member, role: e.target.value})} placeholder="Chức vụ" className="p-2 border border-slate-300 rounded-md"/>
                            <div className="flex rounded-md shadow-sm">
                                <input value={member.imageUrl} onChange={(e) => handleMemberChange(index, {...member, imageUrl: e.target.value})} placeholder="URL Ảnh" className="p-2 border border-slate-300 rounded-l-md w-full"/>
                                <button type="button" onClick={() => openFileLibraryForOrgMember((url) => handleMemberChange(index, {...member, imageUrl: url}))} className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200">
                                    Chọn
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                            <button type="button" onClick={() => handleAddChild(index)} className="text-indigo-500 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-100" title="Thêm cấp dưới">
                                <PlusIcon className="h-5 w-5"/>
                            </button>
                            <button type="button" onClick={() => handleDelete(index)} className="text-rose-500 hover:text-rose-700 p-1 rounded-full hover:bg-rose-100" title="Xóa">
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                    {member.children && member.children.length > 0 && (
                        renderOrgChartForm(member.children, (newChildren) => handleChildChartChange(index, newChildren))
                    )}
                </div>
            ))}
            </div>
        )
    }

    const renderFormFields = () => {
        switch(pageKey) {
            case 'about':
                return (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Lịch sử (Phân tách các đoạn bằng cách xuống dòng)</label>
                            <textarea name="history" value={pageData.history} onChange={handleChange} rows={5} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sứ mệnh</label>
                            <textarea name="mission" value={pageData.mission} onChange={handleChange} rows={3} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                         <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tầm nhìn</label>
                            <textarea name="vision" value={pageData.vision} onChange={handleChange} rows={3} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Đội ngũ giáo viên</h3>
                            {pageData.teachers.map((teacher: Teacher, index: number) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-md bg-slate-50">
                                    <input value={teacher.name} onChange={(e) => handleTeacherChange(index, 'name', e.target.value)} placeholder="Tên" className="p-2 border border-slate-300 rounded-md"/>
                                    <input value={teacher.role} onChange={(e) => handleTeacherChange(index, 'role', e.target.value)} placeholder="Chức vụ" className="p-2 border border-slate-300 rounded-md"/>
                                    <input value={teacher.expertise} onChange={(e) => handleTeacherChange(index, 'expertise', e.target.value)} placeholder="Chuyên môn" className="p-2 border border-slate-300 rounded-md"/>
                                    <div className="flex rounded-md shadow-sm">
                                        <input value={teacher.image} onChange={(e) => handleTeacherChange(index, 'image', e.target.value)} placeholder="URL Ảnh" className="p-2 border border-slate-300 rounded-l-md w-full"/>
                                        <button type="button" onClick={() => openFileLibraryForTeacher(index)} className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
                                            Chọn ảnh
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                );
            case 'contact':
                return (
                    <>
                         <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Địa chỉ</label>
                            <input type="text" name="address" id="address" value={pageData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Điện thoại</label>
                            <input type="text" name="phone" id="phone" value={pageData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                    </>
                );
            case 'history':
                return (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề chính</label>
                            <input name="title" value={pageData.title} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phụ đề</label>
                            <textarea name="subtitle" value={pageData.subtitle} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Các cột mốc</h3>
                             {pageData.milestones.map((milestone: Milestone, index: number) => (
                                <div key={index} className="p-4 border rounded-md bg-slate-50 mb-4 relative">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input value={milestone.year} onChange={(e) => handleMilestoneChange(index, 'year', e.target.value)} placeholder="Năm" className="p-2 border border-slate-300 rounded-md"/>
                                        <input value={milestone.event} onChange={(e) => handleMilestoneChange(index, 'event', e.target.value)} placeholder="Sự kiện" className="p-2 border border-slate-300 rounded-md"/>
                                        <textarea value={milestone.description} onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)} placeholder="Mô tả" className="p-2 border border-slate-300 rounded-md md:col-span-3"/>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => deleteMilestone(index)} 
                                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 p-1 rounded-full hover:bg-rose-100"
                                        aria-label="Xóa cột mốc"
                                    >
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            ))}
                            <div className="mt-4">
                                <button type="button" onClick={addMilestone} className="flex items-center bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors text-sm">
                                    <PlusIcon className="h-5 w-5 mr-2"/>
                                    Thêm cột mốc
                                </button>
                            </div>
                        </div>
                    </>
                );
            case 'missionVision':
                 return (
                    <>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Tiêu đề Sứ mệnh</label>
                            <input type="text" name="missionTitle" value={pageData.missionTitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Nội dung Sứ mệnh</label>
                            <textarea name="missionText" value={pageData.missionText} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Tiêu đề Tầm nhìn</label>
                            <input type="text" name="visionTitle" value={pageData.visionTitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Nội dung Tầm nhìn</label>
                            <textarea name="visionText" value={pageData.visionText} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                    </>
                );
            case 'organization':
                return (
                     <>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề chính</label>
                            <input name="title" value={pageData.title} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phụ đề</label>
                            <textarea name="subtitle" value={pageData.subtitle} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Sơ đồ tổ chức</h3>
                            {renderOrgChartForm(pageData.chart, (newChart) => setPageData((prev: any) => ({ ...prev, chart: newChart})))}
                             <div className="mt-4">
                                <button type="button" onClick={() => {
                                    const newMember: OrgChartMember = { id: Date.now().toString(), name: 'Thành viên mới', role: 'Chức vụ', imageUrl: '', children: [] };
                                    setPageData((prev: any) => ({ ...prev, chart: [...prev.chart, newMember]}));
                                }} className="flex items-center bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors text-sm">
                                    <PlusIcon className="h-5 w-5 mr-2"/>
                                    Thêm thành viên cấp cao nhất
                                </button>
                            </div>
                        </div>
                    </>
                );
            default:
                return <p>Không tìm thấy cấu hình cho trang này.</p>
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/admin/pages')} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group">
                <ChevronLeftIcon className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1"/>
                <span>Quay lại danh sách trang</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">{pageTitles[pageKey]}</h1>
            
             {status && (
                <div className={`p-4 mb-4 rounded-md ${status.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {status.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {renderFormFields()}
                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Lưu thay đổi</button>
                </div>
            </form>
            
            <FileLibraryModal
                isOpen={isFileLibraryOpen}
                onClose={() => setIsFileLibraryOpen(false)}
                onSelect={handleImageSelect}
                filter="image"
            />
        </div>
    )
};

export default AdminEditPage;