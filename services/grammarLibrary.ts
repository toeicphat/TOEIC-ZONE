export interface GrammarTopicContent {
    title: string;
    explanation: string[]; // array of paragraphs
    examples: {
        sentence: string;
        translation: string;
    }[];
}

const grammarContent: Record<string, GrammarTopicContent> = {
    "Danh từ & Cụm danh từ": {
        title: "Danh từ & Cụm danh từ (Nouns & Noun Phrases)",
        explanation: [
            "Danh từ là từ dùng để chỉ người, vật, sự việc, hoặc nơi chốn. Cụm danh từ là một nhóm từ mà trong đó danh từ là thành phần chính, được bổ nghĩa bởi các từ khác.",
            "Trong TOEIC, bạn thường gặp các câu hỏi yêu cầu chọn đúng loại từ (danh từ, tính từ,...) hoặc cấu trúc cụm danh từ."
        ],
        examples: [
            { sentence: "The company's new <strong>policy</strong> is effective immediately.", translation: "Chính sách mới của công ty có hiệu lực ngay lập tức." },
            { sentence: "We need to hire a <strong>qualified applicant</strong> for the position.", translation: "Chúng tôi cần tuyển một ứng viên đủ tiêu chuẩn cho vị trí này." }
        ]
    },
    "Động từ": {
        title: "Động từ (Verbs)",
        explanation: [
            "Động từ là từ diễn tả hành động hoặc trạng thái. Việc chia động từ đúng thì (Tenses) và dạng (Voice) là rất quan trọng.",
            "Các câu hỏi thường kiểm tra về sự hòa hợp giữa chủ ngữ và động từ, các thì, và dạng bị động."
        ],
        examples: [
            { sentence: "The manager <strong>is reviewing</strong> the quarterly report.", translation: "Người quản lý đang xem xét báo cáo quý." },
            { sentence: "The new software <strong>was installed</strong> yesterday.", translation: "Phần mềm mới đã được cài đặt ngày hôm qua." }
        ]
    },
    "Tính từ": {
        title: "Tính từ (Adjectives)",
        explanation: ["Tính từ là từ dùng để miêu tả hoặc bổ nghĩa cho danh từ. Chúng thường đứng trước danh từ hoặc sau động từ 'to be'."],
        examples: [{ sentence: "She is a <strong>diligent</strong> employee.", translation: "Cô ấy là một nhân viên siêng năng." }]
    },
    "Trạng từ": {
        title: "Trạng từ (Adverbs)",
        explanation: ["Trạng từ dùng để bổ nghĩa cho động từ, tính từ, hoặc một trạng từ khác. Chúng thường trả lời cho câu hỏi 'How?', 'When?', 'Where?'."],
        examples: [{ sentence: "He completed the task <strong>quickly</strong>.", translation: "Anh ấy đã hoàn thành nhiệm vụ một cách nhanh chóng." }]
    },
    "Giới từ & Liên từ": {
        title: "Giới từ & Liên từ (Prepositions & Conjunctions)",
        explanation: ["Giới từ (in, on, at) chỉ mối quan hệ về vị trí, thời gian. Liên từ (and, but, so) dùng để nối các từ, cụm từ hoặc mệnh đề."],
        examples: [{ sentence: "The meeting is <strong>at</strong> 3 PM, <strong>but</strong> it may be delayed.", translation: "Cuộc họp diễn ra lúc 3 giờ chiều, nhưng nó có thể bị trì hoãn." }]
    },
    "Hạn định từ": {
        title: "Hạn định từ (Determiners)",
        explanation: ["Hạn định từ (a, an, the, some, any, this) là từ đứng trước danh từ để xác định danh từ đó."],
        examples: [{ sentence: "<strong>Some</strong> employees will receive a bonus.", translation: "Một số nhân viên sẽ nhận được tiền thưởng." }]
    },
    "Đại từ": {
        title: "Đại từ (Pronouns)",
        explanation: ["Đại từ (he, she, it, they, which) được dùng để thay thế cho danh từ hoặc cụm danh từ để tránh lặp từ."],
        examples: [{ sentence: "Mr. Smith is the director; <strong>he</strong> will lead the meeting.", translation: "Ông Smith là giám đốc; ông ấy sẽ chủ trì cuộc họp." }]
    },
    "Mệnh đề quan hệ": {
        title: "Mệnh đề quan hệ (Relative Clauses)",
        explanation: ["Mệnh đề quan hệ dùng để cung cấp thêm thông tin về một danh từ. Chúng thường bắt đầu bằng các đại từ quan hệ như who, whom, which, that, whose."],
        examples: [{ sentence: "The woman <strong>who</strong> you met yesterday is my boss.", translation: "Người phụ nữ mà bạn đã gặp hôm qua là sếp của tôi." }]
    },
    "Mệnh đề danh từ": {
        title: "Mệnh đề danh từ (Noun Clauses)",
        explanation: ["Mệnh đề danh từ là một mệnh đề phụ thuộc có chức năng như một danh từ. Nó có thể làm chủ ngữ, tân ngữ..."],
        examples: [{ sentence: "<strong>What he said</strong> was not true.", translation: "Điều anh ấy nói không đúng sự thật." }]
    },
    "Đảo ngữ": {
        title: "Đảo ngữ (Inversions)",
        explanation: ["Đảo ngữ là hình thức đảo ngược vị trí của chủ ngữ và động từ, thường dùng để nhấn mạnh."],
        examples: [{ sentence: "<strong>Never have I seen</strong> such a beautiful presentation.", translation: "Chưa bao giờ tôi thấy một bài thuyết trình đẹp như vậy." }]
    },
    "So sánh": {
        title: "So sánh (Comparisons)",
        explanation: ["Cấu trúc so sánh được dùng để đối chiếu sự giống và khác nhau giữa hai hay nhiều đối tượng."],
        examples: [{ sentence: "This year's sales are <strong>higher than</strong> last year's.", translation: "Doanh số năm nay cao hơn năm ngoái." }]
    },
    "Các loại khác": {
        title: "Các loại khác (Other Topics)",
        explanation: ["Phần này bao gồm các chủ điểm ngữ pháp khác như câu điều kiện, câu giả định, thể cầu khiến..."],
        examples: [{ sentence: "<strong>If</strong> you finish your work early, you can go home.", translation: "Nếu bạn hoàn thành công việc sớm, bạn có thể về nhà." }]
    }
};

export const getGrammarTopicContent = (title: string): GrammarTopicContent | null => {
    return grammarContent[title] || null;
};
