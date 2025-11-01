import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Lễ Khai giảng năm học mới 2024-2025: Chào đón một hành trình tri thức mới',
    excerpt: 'Trong không khí hân hoan của mùa thu, trường long trọng tổ chức lễ khai giảng, chính thức bắt đầu một năm học mới đầy hứa hẹn và thử thách.',
    imageUrl: 'https://picsum.photos/seed/school1/1200/800',
    category: 'Hoạt động nhà trường',
    date: '05/09/2024',
    author: 'Ban Giám hiệu',
    featured: true,
    spotlight: true,
    content: `
      <p class="mb-4">Hòa chung không khí tưng bừng, phấn khởi của hàng triệu học sinh trên cả nước, sáng ngày 05/09, Trường Tiểu học Nguyễn Huệ đã long trọng tổ chức Lễ Khai giảng năm học mới 2024-2025. Buổi lễ diễn ra trong không khí trang nghiêm nhưng cũng không kém phần vui tươi, ấm áp, đánh dấu sự khởi đầu cho một hành trình chinh phục tri thức mới.</p>
      <p class="mb-4">Về dự buổi lễ có sự hiện diện của đại diện chính quyền địa phương, Ban đại diện cha mẹ học sinh, cùng toàn thể cán bộ, giáo viên, nhân viên và hơn 800 em học sinh của trường. Đặc biệt, nhà trường hân hoan chào đón các em học sinh lớp 1 lần đầu tiên bước vào ngôi nhà chung Nguyễn Huệ.</p>
      <img src="https://picsum.photos/seed/school-ceremony/800/450" alt="Ceremony" class="rounded-lg my-6 shadow-md"/>
      <h3 class="text-xl font-bold mt-6 mb-3">Những thông điệp ý nghĩa</h3>
      <p class="mb-4">Phát biểu tại buổi lễ, cô hiệu trưởng đã gióng lên hồi trống khai trường rộn rã, chính thức bắt đầu năm học mới. Trong bài phát biểu của mình, cô nhấn mạnh tầm quan trọng của việc "Dạy tốt - Học tốt", đồng thời kêu gọi toàn thể giáo viên và học sinh cùng nhau nỗ lực, phấn đấu để đạt được những thành tích cao nhất trong năm học này. Cô cũng gửi gắm niềm tin và hy vọng vào thế hệ học sinh, mong các em sẽ trở thành những công dân có ích cho xã hội.</p>
      <p>Buổi lễ kết thúc trong niềm hân hoan, báo hiệu một năm học mới với nhiều thành công mới đang chờ đón thầy và trò Trường Tiểu học Nguyễn Huệ.</p>
    `,
  },
  {
    id: 2,
    title: 'Học sinh Nguyễn Văn An đạt giải Nhất cuộc thi Sáng tạo Khoa học Kỹ thuật cấp Quốc gia',
    excerpt: 'Vượt qua hàng trăm thí sinh, em Nguyễn Văn An lớp 5A1 đã xuất sắc mang về niềm tự hào cho nhà trường với dự án "Robot hỗ trợ người khuyết tật".',
    imageUrl: 'https://picsum.photos/seed/student1/800/450',
    category: 'Thành tích nổi bật',
    date: '02/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Niềm vui lớn đã đến với thầy và trò Trường Tiểu học Nguyễn Huệ khi em Nguyễn Văn An, học sinh lớp 5A1, đã xuất sắc giành giải Nhất tại Cuộc thi Sáng tạo Khoa học Kỹ thuật cấp Quốc gia dành cho học sinh tiểu học năm 2024.</p>
      <p class="mb-4">Dự án "Robot hỗ trợ người khuyết tật" của An được hội đồng giám khảo đánh giá cao về tính sáng tạo, ứng dụng thực tiễn và ý nghĩa nhân văn sâu sắc. Robot có khả năng giúp đỡ người khuyết tật trong các công việc sinh hoạt hàng ngày như lấy đồ vật, bật tắt đèn, và gửi tín hiệu cảnh báo khi cần thiết.</p>
      <blockquote class="border-l-4 border-indigo-500 pl-4 py-2 my-6 text-slate-600 italic">"Em muốn tạo ra một sản phẩm có thể giúp đỡ những người có hoàn cảnh khó khăn. Em rất vui vì ý tưởng của mình đã trở thành hiện thực và được mọi người công nhận," An chia sẻ.</blockquote>
      <p>Thành tích của Nguyễn Văn An là minh chứng cho chất lượng giáo dục và phong trào khuyến khích sáng tạo của nhà trường. Đây là nguồn động viên to lớn để các em học sinh khác tiếp tục theo đuổi đam mê khoa học.</p>
    `,
  },
  {
    id: 3,
    title: 'Thông báo về lịch nghỉ lễ Quốc khánh 2/9',
    excerpt: 'Ban Giám hiệu nhà trường trân trọng thông báo đến toàn thể cán bộ, giáo viên, nhân viên và học sinh lịch nghỉ lễ Quốc khánh 2/9 năm 2024.',
    imageUrl: 'https://picsum.photos/seed/notice1/800/450',
    category: 'Thông báo chung',
    date: '28/08/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Thực hiện theo quy định của Nhà nước về chế độ nghỉ lễ, Tết hàng năm, Trường Tiểu học Nguyễn Huệ xin trân trọng thông báo lịch nghỉ lễ Quốc khánh 2/9 năm 2024 như sau:</p>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li><strong>Thời gian nghỉ:</strong> Từ thứ Sáu, ngày 30/08/2024 đến hết thứ Hai, ngày 02/09/2024.</li>
        <li><strong>Thời gian đi học trở lại:</strong> Thứ Ba, ngày 03/09/2024.</li>
      </ul>
      <p class="mb-4">Trong thời gian nghỉ lễ, nhà trường đề nghị các em học sinh vui chơi lành mạnh, an toàn và ôn bài đầy đủ. Các bộ phận trong trường có kế hoạch trực và đảm bảo an ninh, an toàn tài sản.</p>
      <p>Kính chúc toàn thể cán bộ, giáo viên, nhân viên, quý phụ huynh và các em học sinh một kỳ nghỉ lễ vui vẻ và ý nghĩa!</p>
      <p class="font-bold mt-4">Trân trọng,<br>Ban Giám hiệu.</p>
    `,
  },
  {
    id: 4,
    title: 'Bộ Giáo dục & Đào tạo ban hành khung kế hoạch thời gian năm học mới',
    excerpt: 'Thông tin chi tiết về các mốc thời gian quan trọng trong năm học 2024-2025 được Bộ GD&ĐT công bố chính thức.',
    imageUrl: 'https://picsum.photos/seed/gov1/800/450',
    category: 'Tin tức Giáo dục',
    date: '25/08/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Vừa qua, Bộ Giáo dục và Đào tạo đã chính thức ban hành khung kế hoạch thời gian năm học 2024-2025 áp dụng cho giáo dục mầm non, giáo dục phổ thông và giáo dục thường xuyên trên toàn quốc.</p>
      <p class="mb-4">Theo đó, các trường sẽ tựu trường sớm nhất trước 1 tuần so với ngày tổ chức khai giảng. Riêng đối với lớp 1, tựu trường sớm nhất trước 2 tuần. Lễ khai giảng sẽ được tổ chức thống nhất trên cả nước vào ngày 5/9/2024.</p>
      <p class="mb-4">Khung kế hoạch cũng nêu rõ thời gian kết thúc học kỳ I trước ngày 15/01/2025, hoàn thành kế hoạch giáo dục học kỳ II trước ngày 25/5/2025 và kết thúc năm học trước ngày 31/5/2025. Các mốc thời gian khác như xét công nhận hoàn thành chương trình tiểu học, xét tốt nghiệp THCS, và thi tốt nghiệp THPT sẽ được Bộ GD&ĐT có hướng dẫn cụ thể sau.</p>
      <p>Đây là cơ sở để các địa phương và nhà trường xây dựng kế hoạch năm học chi tiết, phù hợp với điều kiện thực tế.</p>
    `
  },
  {
    id: 5,
    title: 'Ngày hội thể thao toàn trường: Sôi nổi và đầy màu sắc',
    excerpt: 'Các vận động viên không chuyên đã cống hiến những trận đấu kịch tính, thể hiện tinh thần thể thao cao thượng và đoàn kết.',
    imageUrl: 'https://picsum.photos/seed/sport1/800/450',
    category: 'Hoạt động nhà trường',
    date: '22/08/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Với mục tiêu tạo sân chơi lành mạnh, bổ ích và đẩy mạnh phong trào rèn luyện thể chất, Trường Tiểu học Nguyễn Huệ đã tổ chức thành công "Ngày hội thể thao" năm học 2024-2025.</p>
      <p class="mb-4">Ngày hội diễn ra với nhiều môn thi đấu hấp dẫn như kéo co, nhảy bao bố, điền kinh, cờ vua... thu hút sự tham gia nhiệt tình của đông đảo học sinh từ tất cả các khối lớp. Không khí tại sân trường vô cùng sôi động với những tiếng hò reo cổ vũ không ngớt.</p>
      <img src="https://picsum.photos/seed/sport-event/800/450" alt="Sport event" class="rounded-lg my-6 shadow-md"/>
      <p>Các "vận động viên nhí" đã thi đấu hết mình, thể hiện tinh thần đoàn kết, trung thực và cao thượng. Ngày hội không chỉ là dịp để các em thể hiện tài năng thể thao mà còn là cơ hội để tăng cường giao lưu, học hỏi và thắt chặt tình bạn.</p>
    `
  },
  {
    id: 6,
    title: 'Cô giáo Trần Thị B nhận danh hiệu "Giáo viên dạy giỏi" cấp Thành phố',
    excerpt: 'Với những đóng góp không ngừng nghỉ và phương pháp giảng dạy sáng tạo, cô Trần Thị B đã được vinh danh.',
    imageUrl: 'https://picsum.photos/seed/teacher1/800/450',
    category: 'Thành tích nổi bật',
    date: '20/08/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Trường Tiểu học Nguyễn Huệ tự hào và vui mừng thông báo, cô giáo Trần Thị B, giáo viên chủ nhiệm lớp 4A, đã xuất sắc đạt danh hiệu "Giáo viên dạy giỏi" cấp Thành phố năm học 2023-2024.</p>
      <p class="mb-4">Đây là thành quả xứng đáng cho những nỗ lực không mệt mỏi của cô B trong sự nghiệp trồng người. Cô luôn được biết đến là một giáo viên tận tâm, yêu nghề, mến trẻ, không ngừng đổi mới phương pháp giảng dạy để mang đến những bài học hay và bổ ích cho học sinh. Các tiết học của cô luôn sinh động, hấp dẫn và khơi dậy được niềm đam mê học tập của các em.</p>
      <p>Thành tích của cô Trần Thị B là tấm gương sáng cho các đồng nghiệp noi theo, góp phần khẳng định vị thế và chất lượng giáo dục của nhà trường.</p>
    `
  },
   {
    id: 7,
    title: 'Kế hoạch tổ chức chương trình ngoại khóa "Về nguồn" tháng 10',
    excerpt: 'Chương trình nhằm giáo dục truyền thống lịch sử, lòng yêu nước cho học sinh thông qua các hoạt động thực tế tại di tích lịch sử.',
    imageUrl: 'https://picsum.photos/seed/trip1/800/450',
    category: 'Hoạt động nhà trường',
    date: '18/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Nhằm giáo dục truyền thống "Uống nước nhớ nguồn" và bồi đắp lòng yêu nước, tự hào dân tộc cho học sinh, Ban Giám hiệu Trường Tiểu học Nguyễn Huệ xây dựng kế hoạch tổ chức chương trình ngoại khóa "Về nguồn" trong tháng 10.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Thông tin chi tiết</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li><strong>Đối tượng:</strong> Học sinh khối 4 và khối 5.</li>
        <li><strong>Thời gian dự kiến:</strong> Thứ Bảy, ngày 19/10/2024.</li>
        <li><strong>Địa điểm:</strong> Khu di tích lịch sử địa phương (sẽ có thông báo cụ thể).</li>
        <li><strong>Nội dung:</strong> Tham quan, nghe thuyết minh về lịch sử, tổ chức các trò chơi tập thể, thi tìm hiểu...</li>
      </ul>
      <p>Đây là một hoạt động giáo dục thực tế vô cùng ý nghĩa. Nhà trường khuyến khích sự tham gia của các em học sinh. Thông báo chi tiết và phiếu đăng ký sẽ được gửi đến quý phụ huynh trong thời gian sớm nhất.</p>
    `
  },
  {
    id: 8,
    title: 'Hướng dẫn đăng ký xét tuyển đại học năm 2025',
    excerpt: 'Những lưu ý quan trọng và các mốc thời gian cần nhớ cho học sinh khối 12 trong kỳ tuyển sinh đại học sắp tới.',
    imageUrl: 'https://picsum.photos/seed/exam1/800/450',
    category: 'Tin tức Giáo dục',
    date: '15/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Bài viết này không thực sự liên quan đến trường tiểu học nhưng được thêm vào để đa dạng hóa chuyên mục "Tin tức giáo dục".</p>
      <p class="mb-4">Kỳ thi tốt nghiệp THPT và xét tuyển đại học, cao đẳng là một bước ngoặt quan trọng đối với các em học sinh. Để giúp các em và quý phụ huynh có sự chuẩn bị tốt nhất, Bộ GD&ĐT đã công bố những hướng dẫn ban đầu về công tác tuyển sinh năm 2025.</p>
      <p>Các điểm chính cần lưu ý bao gồm việc đăng ký nguyện vọng trực tuyến trên hệ thống chung, các phương thức xét tuyển sớm của các trường đại học, và lịch trình dự kiến cho các đợt đăng ký và điều chỉnh nguyện vọng. Học sinh cần theo dõi sát sao các thông báo từ Bộ và từ các trường đại học mình quan tâm để không bỏ lỡ những thông tin quan trọng.</p>
    `
  },
  {
    id: 9,
    title: 'Thông báo họp phụ huynh đầu năm học 2024-2025',
    excerpt: 'Nhà trường trân trọng kính mời quý phụ huynh tham dự buổi họp phụ huynh đầu năm để trao đổi về kế hoạch năm học và phương hướng giáo dục.',
    imageUrl: 'https://picsum.photos/seed/meeting1/800/450',
    category: 'Thông báo chung',
    date: '10/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Nhằm tạo sự kết nối chặt chẽ giữa gia đình và nhà trường, Trường Tiểu học Nguyễn Huệ tổ chức buổi họp phụ huynh đầu năm học 2024-2025. Đây là dịp quan trọng để nhà trường phổ biến kế hoạch, mục tiêu năm học và lắng nghe ý kiến đóng góp từ quý phụ huynh.</p>
      <h3 class="text-xl font-bold mt-6 mb-3">Nội dung cuộc họp</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li>Báo cáo tổng kết các hoạt động hè.</li>
        <li>Phổ biến kế hoạch và các chỉ tiêu phấn đấu trong năm học 2024-2025.</li>
        <li>Thảo luận về các biện pháp phối hợp giáo dục giữa gia đình và nhà trường.</li>
        <li>Bầu Ban đại diện cha mẹ học sinh của lớp.</li>
      </ul>
      <p>Sự hiện diện của quý phụ huynh là niềm vinh hạnh và là nguồn động viên to lớn đối với nhà trường. Rất mong quý phụ huynh sắp xếp thời gian tham dự đầy đủ.</p>
    `
  },
  {
    id: 10,
    title: 'Kế hoạch nghỉ Tết Nguyên Đán Giáp Thìn 2025',
    excerpt: 'Nhà trường thông báo kế hoạch nghỉ Tết Nguyên Đán để học sinh và gia đình có thể chủ động sắp xếp thời gian.',
    imageUrl: 'https://picsum.photos/seed/tetholiday/800/450',
    category: 'Thông báo chung',
    date: '15/01/2025',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Căn cứ vào khung kế hoạch thời gian năm học của Sở GD&ĐT, Trường Tiểu học Nguyễn Huệ thông báo lịch nghỉ Tết Nguyên Đán Giáp Thìn 2025 cho toàn thể học sinh.</p>
      <p class="mb-4">Thời gian nghỉ dự kiến bắt đầu từ ngày... đến hết ngày.... Học sinh sẽ quay trở lại trường học vào ngày....</p>
      <p>Nhà trường kính chúc toàn thể giáo viên, quý phụ huynh và các em học sinh một năm mới An khang - Thịnh vượng, Vạn sự - Như ý!</p>
    `
  },
  {
    id: 11,
    title: 'Lịch khám sức khỏe định kỳ cho học sinh toàn trường',
    excerpt: 'Phối hợp với trung tâm y tế, nhà trường sẽ tổ chức khám sức khỏe tổng quát định kỳ cho tất cả học sinh.',
    imageUrl: 'https://picsum.photos/seed/healthcheck/800/450',
    category: 'Thông báo chung',
    date: '01/10/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Với mục tiêu chăm sóc sức khỏe tốt nhất cho học sinh, nhà trường sẽ tổ chức đợt khám sức khỏe định kỳ năm học 2024-2025.</p>
      <p class="mb-4">Các em sẽ được kiểm tra các chỉ số về thể chất, thị lực, răng miệng và tư vấn sức khỏe bởi các y bác sĩ chuyên khoa. Lịch khám chi tiết cho từng lớp sẽ được giáo viên chủ nhiệm thông báo cụ thể.</p>
    `
  },
  {
    id: 12,
    title: 'Quy định về đồng phục và tác phong học sinh',
    excerpt: 'Nhà trường nhắc nhở về quy định mặc đồng phục và giữ gìn tác phong gọn gàng, sạch sẽ khi đến trường.',
    imageUrl: 'https://picsum.photos/seed/uniform/800/450',
    category: 'Thông báo chung',
    date: '12/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Để xây dựng môi trường học đường văn minh, lịch sự, nhà trường yêu cầu tất cả học sinh thực hiện nghiêm túc quy định về đồng phục. Học sinh cần mặc đồng phục đúng quy định vào tất cả các ngày học trong tuần, trừ các buổi có tiết thể dục. Tóc tai cần gọn gàng, sạch sẽ.</p>
    `
  },
  {
    id: 13,
    title: 'Tổ chức Tết Trung Thu "Đêm hội trăng rằm" 2024',
    excerpt: 'Một đêm hội trăng rằm đầy ý nghĩa với các hoạt động rước đèn, phá cỗ và các trò chơi dân gian hấp dẫn.',
    imageUrl: 'https://picsum.photos/seed/midautumn/800/450',
    category: 'Hoạt động nhà trường',
    date: '17/09/2024',
    author: 'Ban Giám hiệu',
    spotlight: true,
    content: `
      <p class="mb-4">Nhân dịp Tết Trung thu, nhà trường đã tổ chức "Đêm hội trăng rằm" với nhiều hoạt động sôi nổi, mang lại cho các em học sinh những kỷ niệm đáng nhớ. Các em đã cùng nhau rước đèn ông sao, tham gia các trò chơi dân gian và phá cỗ trung thu trong không khí vui tươi, ấm áp.</p>
    `
  },
  {
    id: 14,
    title: 'Phát động phong trào "Ngày hội đọc sách"',
    excerpt: 'Khuyến khích văn hóa đọc, thư viện nhà trường tổ chức "Ngày hội đọc sách" với nhiều đầu sách mới và hoạt động thú vị.',
    imageUrl: 'https://picsum.photos/seed/readingday/800/450',
    category: 'Hoạt động nhà trường',
    date: '25/10/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">"Ngày hội đọc sách" đã thu hút hàng trăm lượt học sinh tham gia. Các em không chỉ được tiếp cận với những cuốn sách hay, bổ ích mà còn tham gia các hoạt động như kể chuyện theo sách, vẽ tranh theo nhân vật... giúp lan tỏa niềm đam mê đọc sách.</p>
    `
  },
  {
    id: 15,
    title: 'Triển lãm tranh "Sắc màu tuổi thơ"',
    excerpt: 'Tổng kết và trưng bày các tác phẩm xuất sắc nhất từ cuộc thi vẽ tranh của học sinh toàn trường, thể hiện góc nhìn trong sáng và sáng tạo.',
    imageUrl: 'https://picsum.photos/seed/artshow/800/450',
    category: 'Hoạt động nhà trường',
    date: '15/11/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Triển lãm "Sắc màu tuổi thơ" là nơi trưng bày những tác phẩm hội họa đầy sáng tạo của các em học sinh. Mỗi bức tranh là một câu chuyện, một ước mơ, thể hiện thế giới quan sinh động qua lăng kính trẻ thơ. Hoạt động này nhằm nuôi dưỡng và phát triển tài năng nghệ thuật cho các em.</p>
    `
  },
  {
    id: 16,
    title: 'Đội tuyển cờ vua giành Huy chương Vàng cấp Tỉnh',
    excerpt: 'Với chiến thuật thông minh và bản lĩnh thi đấu vững vàng, đội tuyển cờ vua của trường đã xuất sắc giành chức vô địch tại giải đấu cấp Tỉnh.',
    imageUrl: 'https://picsum.photos/seed/chesswin/800/450',
    category: 'Thành tích nổi bật',
    date: '28/10/2024',
    author: 'Ban Giám hiệu',
    spotlight: true,
    content: `
      <p class="mb-4">Tại giải Cờ vua học sinh tiểu học cấp Tỉnh, đội tuyển của trường đã thi đấu xuất sắc và mang về Huy chương Vàng đồng đội. Thành tích này tiếp tục khẳng định vị thế của nhà trường trong các hoạt động trí tuệ và thể thao.</p>
    `
  },
  {
    id: 17,
    title: 'Học sinh đạt giải cao trong cuộc thi "English Olympiad"',
    excerpt: 'Em Trần Hoàng Anh lớp 4A2 đã vinh dự đạt giải Ba trong cuộc thi Olympic Tiếng Anh trên Internet (IOE) cấp Thành phố.',
    imageUrl: 'https://picsum.photos/seed/englisholy/800/450',
    category: 'Thành tích nổi bật',
    date: '10/11/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Cuộc thi "English Olympiad" là một sân chơi trí tuệ uy tín. Vượt qua nhiều vòng thi, em Trần Hoàng Anh đã chứng tỏ khả năng ngoại ngữ xuất sắc và mang về niềm tự hào cho bản thân, gia đình và nhà trường.</p>
    `
  },
  {
    id: 18,
    title: 'Nhà trường nhận danh hiệu "Trường học Xanh"',
    excerpt: 'Với những nỗ lực trong việc xây dựng cảnh quan và giáo dục ý thức bảo vệ môi trường, trường đã được công nhận danh hiệu "Trường học Xanh".',
    imageUrl: 'https://picsum.photos/seed/greenschool/800/450',
    category: 'Thành tích nổi bật',
    date: '05/12/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Danh hiệu "Trường học Xanh" là sự ghi nhận cho những cố gắng của thầy và trò trong việc trồng cây xanh, phân loại rác thải và tổ chức các hoạt động bảo vệ môi trường. Nhà trường sẽ tiếp tục phát huy để xây dựng một môi trường học tập trong lành và bền vững.</p>
    `
  },
  {
    id: 19,
    title: 'Những điểm mới trong chương trình giáo dục phổ thông 2018',
    excerpt: 'Chương trình mới tập trung vào phát triển năng lực và phẩm chất của học sinh, thay vì chỉ truyền thụ kiến thức một chiều.',
    imageUrl: 'https://picsum.photos/seed/newedu/800/450',
    category: 'Tin tức Giáo dục',
    date: '18/08/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Chương trình giáo dục phổ thông 2018 đã và đang được triển khai trên cả nước, mang theo nhiều thay đổi tích cực. Chương trình giảm tải kiến thức hàn lâm, tăng cường các hoạt động trải nghiệm, và trao quyền chủ động nhiều hơn cho nhà trường và giáo viên trong việc xây dựng kế hoạch dạy học.</p>
    `
  },
  {
    id: 20,
    title: 'Tầm quan trọng của kỹ năng mềm đối với học sinh tiểu học',
    excerpt: 'Bên cạnh kiến thức, các kỹ năng như giao tiếp, làm việc nhóm, giải quyết vấn đề... là nền tảng vững chắc cho sự thành công của trẻ trong tương lai.',
    imageUrl: 'https://picsum.photos/seed/softskill/800/450',
    category: 'Tin tức Giáo dục',
    date: '30/09/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">Giáo dục kỹ năng mềm ngay từ bậc tiểu học giúp trẻ hình thành sự tự tin, khả năng thích ứng và hòa nhập tốt với xã hội. Nhà trường luôn chú trọng lồng ghép các hoạt động rèn luyện kỹ năng mềm vào chương trình học chính khóa và ngoại khóa.</p>
    `
  },
  {
    id: 21,
    title: '5 lời khuyên giúp phụ huynh đồng hành cùng con trong học tập',
    excerpt: 'Sự phối hợp chặt chẽ giữa gia đình và nhà trường là yếu tố then chốt giúp trẻ tiến bộ. Dưới đây là một vài gợi ý hữu ích cho các bậc cha mẹ.',
    imageUrl: 'https://picsum.photos/seed/parenttips/800/450',
    category: 'Tin tức Giáo dục',
    date: '20/10/2024',
    author: 'Ban Giám hiệu',
    content: `
      <p class="mb-4">1. Tạo không gian học tập yên tĩnh.<br>2. Cùng con lập thời gian biểu hợp lý.<br>3. Thường xuyên trao đổi với giáo viên.<br>4. Khuyến khích, động viên thay vì la mắng.<br>5. Tham gia các hoạt động của trường cùng con.</p>
    `
  }
];