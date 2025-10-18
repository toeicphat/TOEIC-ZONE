import { GrammarTopicContent, GrammarQuestion } from '../types';

// Import all the separated quiz data
import { nounQuizzes } from './grammar/nounQuizzes';
import { verbQuizzes } from './grammar/verbQuizzes';
import { adjectiveQuizzes } from './grammar/adjectiveQuizzes';
import { adverbQuizzes } from './grammar/adverbQuizzes';
import { prepositionConjunctionQuizzes } from './grammar/prepositionConjunctionQuizzes';
import { determinerQuizzes } from './grammar/determinerQuizzes';
import { pronounQuizzes } from './grammar/pronounQuizzes';
import { relativeClauseQuizzes } from './grammar/relativeClauseQuizzes';
import { nounClauseQuizzes } from './grammar/nounClauseQuizzes';
import { inversionQuizzes } from './grammar/inversionQuizzes';
import { comparisonQuizzes } from './grammar/comparisonQuizzes';
import { otherTopicQuizzes } from './grammar/otherTopicQuizzes';
import { imperativeQuizzes } from './grammar/imperativeQuizzes';

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
        explanation: [
            "Giới từ (in, on, at) chỉ mối quan hệ về vị trí, thời gian, nguyên nhân... theo sau là một danh từ hoặc V-ing. Liên từ (and, but, because) dùng để nối các từ, cụm từ hoặc mệnh đề.",
            `<h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4 border-t pt-6 dark:border-slate-700">Phân loại Liên từ & Giới từ</h3>
             <h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">1. Giới từ (Prepositions)</h4>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-green-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-inner border border-green-200 dark:border-slate-700">
                 <div class="md:pr-6">
                     <h5 class="font-bold text-green-800 dark:text-green-300 text-lg mb-3">a. Giới từ đơn (Simple Prepositions)</h5>
                     <p class="text-slate-700 dark:text-slate-300 leading-relaxed">As (như là), aboard (trên tàu, xe, ...), across (trên khắp), along, aloud (to (âm thanh)), above (ở trên), apart (cách nhau), beneath (bên dưới), despite, during = throughout, given = considering, regarding = concerning (liên quan đến), within, without, following (sau), ...</p>
                 </div>
                 <div class="md:border-l md:border-green-200 dark:md:border-slate-700 md:pl-6">
                     <h5 class="font-bold text-green-800 dark:text-green-300 text-lg mb-3">b. Giới từ ghép (Compound Prepositions)</h5>
                     <p class="text-slate-700 dark:text-slate-300 leading-relaxed">Such as, as well as, in spite of, according to (theo như), in keeping with (phù hợp với, tuân thủ), because of = due to = owing to, related to = with regard to (liên quan đến), ...</p>
                 </div>
             </div>
             
             <h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-8 mb-3">2. Liên từ (Conjunctions)</h4>
                <div class="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-inner border border-blue-200 dark:border-slate-700 space-y-2 text-slate-700 dark:text-slate-300">
                    <ul>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Nguyên nhân:</strong> because/as/since, now that (bởi vì), in that (bởi vì)</li>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Mặc dù, Đối chiếu:</strong> although/though/even though/even if, while/whereas (trong khi)</li>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Điều kiện:</strong> If/provided (that)/providing (that) (nếu/miễn là), on condition (that) (với điều kiện), as long as/as far as (miễn là), unless/if not, assuming that/ supposing that (giả sử), only if (chỉ khi)</li>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Mục đích:</strong> so that (để mà), in order that (để mà)</li>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Mức độ:</strong> so adj/adv that ... (quá ... đến nỗi ...), such+a(n) N that ... (thật sự là một ... rằng ...</li>
                        <li class="mb-2"><strong class="text-blue-800 dark:text-blue-300">Giả định:</strong> as if/as though (cứ như là, như thể là), except that, considering (that)/given that (xét thấy, căn cứ vào), whether (liệu rằng), in case (that)/in the event (that) (trong trường hợp, phòng khi)</li>
                    </ul>
                </div>
                <div class="mt-4 bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p class="text-yellow-800 dark:text-yellow-200"><strong class="font-bold">Mẹo nhỏ:</strong> từ nào có “that” => liên từ (ex: now that, in that, provided (that)/providing (that), ...). Ngoại trừ: after that (adv): sau đó.</p>
                </div>

                <h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-8 mb-3">3. Bảng so sánh Liên từ & Giới từ</h4>
                <div class="overflow-x-auto bg-white dark:bg-slate-800 p-1 rounded-lg">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-green-100 dark:bg-slate-700">
                            <tr>
                                <th class="p-3 font-bold text-green-800 dark:text-green-300 border-b border-green-200 dark:border-slate-600 w-1/4"></th>
                                <th class="p-3 font-bold text-green-800 dark:text-green-300 border-b border-green-200 dark:border-slate-600">Liên từ (+ mệnh đề)</th>
                                <th class="p-3 font-bold text-green-800 dark:text-green-300 border-b border-green-200 dark:border-slate-600">Giới từ (+ N/V-ing)</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-700 dark:text-slate-300">
                            <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Thời gian</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">when/as, while, until, as soon as, before, after</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">at/on/in, during/for, by/until, on/upon, before/prior to, after/following</td>
                            </tr>
                            <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Nguyên nhân</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">because/as/since</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">because of/due to/owing to, on account of, thanks to</td>
                            </tr>
                            <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Mặc dù</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">although/though, even if, even though</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">despite/in spite of</td>
                            </tr>
                             <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Điều kiện</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">unless, in case (that)</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">without/but for, in case of/in the event of</td>
                            </tr>
                             <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Mục đích</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">so that/in order that</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">for the purpose of</td>
                            </tr>
                             <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 border-b border-green-100 dark:border-slate-700 font-semibold">Đối chiếu, so sánh</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">whereas/while</td>
                                <td class="p-3 border-b border-green-100 dark:border-slate-700">compared with</td>
                            </tr>
                             <tr class="hover:bg-green-50 dark:hover:bg-slate-700/50">
                                <td class="p-3 font-semibold">Giả định</td>
                                <td class="p-3">given that</td>
                                <td class="p-3">given</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             `
        ],
        examples: [{ sentence: "The meeting is <strong>at</strong> 3 PM, <strong>but</strong> it may be delayed.", translation: "Cuộc họp diễn ra lúc 3 giờ chiều, nhưng nó có thể bị trì hoãn." }]
    },
    "Hạn định từ": {
        title: "Hạn định từ (Determiners)",
        explanation: [
            "Hạn định từ (Determiner) là những từ đứng trước danh từ để xác định danh từ đó, cho biết danh từ đang được đề cập đến là đối tượng xác định hay không xác định, và giới hạn về số lượng.",
            "<strong>Các nhóm hạn định từ chính:</strong>",
            "<strong>1. Mạo từ (Articles):</strong> <i>a, an, the</i>. Ví dụ: 'a book', 'an apple', 'the manager'.",
            "<strong>2. Từ chỉ định (Demonstratives):</strong> <i>this, that, these, those</i>. Dùng để chỉ vị trí của danh từ so với người nói. Ví dụ: 'this report', 'those files'.",
            "<strong>3. Từ sở hữu (Possessives):</strong> <i>my, your, his, her, its, our, their</i>. Dùng để chỉ sự sở hữu. Ví dụ: 'my computer', 'their project'.",
            "<strong>4. Số từ (Numbers):</strong> <i>one, two, hundred, etc.</i> (số đếm) và <i>first, second, etc.</i> (số thứ tự). Ví dụ: 'two tickets', 'the first priority'.",
            "<strong>5. Từ chỉ số lượng (Quantifiers):</strong> <i>some, any, much, many, few, little, several, all, no, every, each.</i> Dùng để chỉ số lượng không xác định. Ví dụ: 'some information', 'many employees'.",
            "<strong>6. Từ nghi vấn (Interrogatives):</strong> <i>which, what, whose</i>. Dùng trong câu hỏi. Ví dụ: 'Which department?', 'What time?'."
        ],
        examples: [{ sentence: "<strong>Some</strong> employees will receive <strong>a</strong> bonus for <strong>their</strong> hard work.", translation: "Một số nhân viên sẽ nhận được tiền thưởng cho sự chăm chỉ của họ." }],
        interactiveExercise: 'determiner_clicker',
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
     "Câu mệnh lệnh": {
        title: "Câu mệnh lệnh (Imperative Sentences)",
        explanation: [
            `<h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Cấu trúc cơ bản</h4><div class="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-lg shadow-inner"><p class="font-mono text-blue-800 dark:text-blue-300"><strong>Động từ nguyên mẫu (Base Form)</strong> + Tân ngữ/Phần còn lại của câu</p><ul class="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300 space-y-1"><li>Chủ ngữ (Subject) trong câu mệnh lệnh hầu như luôn được ngầm hiểu là "you" (bạn/các bạn), nhưng nó không được viết ra.</li><li>Động từ luôn giữ ở dạng nguyên mẫu, bất kể chủ ngữ ngầm hiểu là số ít hay số nhiều (vì nó luôn là "you").</li></ul></div><h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">Ví dụ</h4><div class="overflow-x-auto bg-white dark:bg-slate-800 p-1 rounded-lg"><table class="w-full text-left border-collapse"><thead class="bg-slate-100 dark:bg-slate-700"><tr><th class="p-3 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">Câu Mệnh Lệnh</th><th class="p-3 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">Giải Thích Tiếng Việt</th><th class="p-3 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">Chức năng chính</th></tr></thead><tbody class="text-slate-700 dark:text-slate-300"><tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td class="p-3 border-b border-slate-100 dark:border-slate-700">Close the door.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Đóng cửa lại.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Ra lệnh (Order)</td></tr><tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td class="p-3 border-b border-slate-100 dark:border-slate-700">Turn left at the next street.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Rẽ trái ở phố kế tiếp.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Chỉ dẫn (Direction)</td></tr><tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td class="p-3 border-b border-slate-100 dark:border-slate-700">Be careful with that glass.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Cẩn thận với cái ly đó.</td><td class="p-3 border-b border-slate-100 dark:border-slate-700">Cảnh báo (Warning/Advice)</td></tr><tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td class="p-3 border-b-slate-100 dark:border-slate-700">Send me an email later.</td><td class="p-3 border-b-slate-100 dark:border-slate-700">Gửi cho tôi một email sau.</td><td class="p-3 border-b-slate-100 dark:border-slate-700">Yêu cầu (Request)</td></tr></tbody></table></div><h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">Thêm "Please" (Xin vui lòng)</h4><div class="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-lg shadow-inner"><p class="text-slate-700 dark:text-slate-300">Để làm cho câu mệnh lệnh trở nên lịch sự hơn, người ta thường thêm "Please" vào đầu hoặc cuối câu.</p><div class="mt-2 p-3 bg-white dark:bg-slate-800 rounded"><p class="font-mono text-slate-800 dark:text-slate-200">Please sit down.</p><p class="text-sm text-slate-500 dark:text-slate-400 italic">Xin vui lòng ngồi xuống.</p></div></div><h4 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">Thể Phủ Định (Negative Imperatives)</h4><div class="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-lg shadow-inner"><p class="text-slate-700 dark:text-slate-300">Để cấm đoán hoặc yêu cầu không làm gì, ta sử dụng "Do not" hoặc dạng rút gọn "Don't" trước động từ nguyên mẫu.</p><div class="mt-2 space-y-3"><div class="p-3 bg-white dark:bg-slate-800 rounded"><p class="font-mono text-slate-800 dark:text-slate-200">Don't touch that button.</p><p class="text-sm text-slate-500 dark:text-slate-400 italic">Đừng chạm vào cái nút đó.</p></div><div class="p-3 bg-white dark:bg-slate-800 rounded"><p class="font-mono text-slate-800 dark:text-slate-200">Do not feed the animals.</p><p class="text-sm text-slate-500 dark:text-slate-400 italic">Không cho thú ăn.</p></div></div></div>`
        ],
        examples: []
    },
    "Các loại khác": {
        title: "Các loại khác (Other Topics)",
        explanation: [
            "Phần này bao gồm các chủ điểm ngữ pháp khác như câu điều kiện, câu giả định, và các chủ đề con được liệt kê dưới đây."
        ],
        examples: [{ sentence: "<strong>If</strong> you finish your work early, you can go home.", translation: "Nếu bạn hoàn thành công việc sớm, bạn có thể về nhà." }],
        subTopics: ["Câu mệnh lệnh"]
    }
};

const grammarQuizzes: Record<string, Record<string, GrammarQuestion[]>> = {
    "Danh từ & Cụm danh từ": nounQuizzes,
    "Động từ": verbQuizzes,
    "Tính từ": adjectiveQuizzes,
    "Trạng từ": adverbQuizzes,
    "Giới từ & Liên từ": prepositionConjunctionQuizzes,
    "Hạn định từ": determinerQuizzes,
    "Đại từ": pronounQuizzes,
    "Mệnh đề quan hệ": relativeClauseQuizzes,
    "Mệnh đề danh từ": nounClauseQuizzes,
    "Đảo ngữ": inversionQuizzes,
    "So sánh": comparisonQuizzes,
    "Câu mệnh lệnh": imperativeQuizzes,
    "Các loại khác": otherTopicQuizzes,
};

export const getGrammarTopicContent = (topic: string): GrammarTopicContent | null => {
    return grammarContent[topic] || null;
};

export const getGrammarQuizLevels = (topic: string): string[] => {
    return grammarQuizzes[topic] ? Object.keys(grammarQuizzes[topic]) : [];
};

export const getGrammarQuizQuestions = (topic: string, level: string): GrammarQuestion[] => {
    return grammarQuizzes[topic]?.[level] || [];
};