import React from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '../components/icons';
import { usePageContent } from '../contexts/PageContentContext';

const ContactPage: React.FC = () => {
  const { content } = usePageContent();
  const { contact: contactContent } = content;

  return (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Liên hệ với chúng tôi</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe. Vui lòng liên hệ nếu bạn có bất kỳ câu hỏi hoặc góp ý nào.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Contact Info & Map */}
                <div className="lg:col-span-5 bg-slate-50 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Thông tin liên hệ</h2>
                    <ul className="space-y-6">
                        <li className="flex items-start space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <LocationMarkerIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Địa chỉ</h3>
                                <p className="text-slate-600">{contactContent.address}</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <PhoneIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Điện thoại</h3>
                                <p className="text-slate-600">{contactContent.phone}</p>
                            </div>
                        </li>
                    </ul>
                    <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.396863595168!2d107.69315081481236!3d12.01995899149091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e3d2c3b88b7d%3A0x28a2a74c5a4d3c33!2zVHLGsOG7nW5nIFRp4buHdSBob8yjYyBOZ3V54buFbiBIdeG7hQ!5e0!3m2!1sen!2s!4v1663155708892!5m2!1sen!2s" 
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="School Location"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-7 bg-slate-50 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Chủ đề</label>
                            <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Gửi tin nhắn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;