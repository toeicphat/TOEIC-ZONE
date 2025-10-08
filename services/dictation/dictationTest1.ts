import { LibraryDictationExercise } from '../../types';

// From Part 1 Library
const novaland1 = {
    id: 101,
    title: "Novaland Call - Part 1",
    audioSrc: "",
    fullText: "Hi, you are calling the Novaland management office information line. Please be aware that there will be maintenance work to repave the entire parking garage adjacent to our building's front entrance on Friday, July third.",
    textWithBlanks: "Hi, you are ____ the Novaland ____ office information line. Please be ____ that there will be ____ work to ____ the entire parking ____ adjacent to our building's front ____ on Friday, July third.",
    missingWords: ["calling", "management", "aware", "maintenance", "repave", "garage", "entrance"],
};
const novaland2 = {
    id: 102,
    title: "Novaland Call - Part 2",
    audioSrc: "",
    fullText: "Vehicles of all Novaland residents are required to be moved before 9AM next Saturday because their parking slots will be changed.",
    textWithBlanks: "____ of all Novaland ____ are ____ to be moved before 9AM next Saturday because their parking ____ will be ____.",
    missingWords: ["Vehicles", "residents", "required", "slots", "changed"],
};
const part1: LibraryDictationExercise[] = [novaland1, novaland2];

// From Part 2 Library
const q7 = { id: 207, title: "Question 7", audioSrc: "", fullText: "How old is this building?\n(A) To ship some materials.\n(B) About ten years old.\n(C) Company offices, I think.", textWithBlanks: "How ____ is this ____?\n(A) To ____ some materials.\n(B) About ten ____ old.\n(C) Company ____, I think.", missingWords: ["old", "building", "ship", "years", "offices"] };
const q8 = { id: 208, title: "Question 8", audioSrc: "", fullText: "Can you come to my jazz performance tonight?\n(A) I’m sorry I was late for the meeting.\n(B) Mostly just local musicians.\n(C) Sure, I'll be there!", textWithBlanks: "Can you ____ to my jazz ____ tonight?\n(A) I’m ____ I was late for the meeting.\n(B) ____ just local musicians.\n(C) Sure, I'll be ____!", missingWords: ["come", "performance", "sorry", "Mostly", "there"] };
const q9 = { id: 209, title: "Question 9", audioSrc: "", fullText: "Which apartment submitted a work order?\n(A) It’s what you did for a living.\n(B) Submit your assignment here.\n(C) It came from the tenants in B23.", textWithBlanks: "Which ____ submitted a work ____?\n(A) It’s what you did for a ____.\n(B) ____ your assignment here.\n(C) It came from the ____ in B23.", missingWords: ["apartment", "order", "living", "Submit", "tenants"] };
const q10 = { id: 210, title: "Question 10", audioSrc: "", fullText: "Will you contact the vendor about changing our delivery date?\n(A) Of course, I'll take care of it.\n(B) An e-mail receipt.\n(C) Could I get change for a dollar?", textWithBlanks: "Will you ____ the ____ about changing our ____ date?\n(A) Of course, I'll take ____ of it.\n(B) An e-mail ____.\n(C) Could I get ____ for a dollar?", missingWords: ["contact", "vendor", "delivery", "care", "receipt", "change"] };
const q11 = { id: 211, title: "Question 11", audioSrc: "", fullText: "Why was the maintenance worker here?\n(A) No, he didn’t.\n(B) From three o’clock until four.\n(C) Because a light needed to be fixed.", textWithBlanks: "Why was the ____ worker here?\n(A) No, he didn’t.\n(B) From three o’clock ____ four.\n(C) Because a ____ needed to be ____.", missingWords: ["maintenance", "until", "light", "fixed"] };
const q12 = { id: 212, title: "Question 12", audioSrc: "", fullText: "Did management make a hiring decision yet?\n(A) Put it on the highest shelf.\n(B) The personnel department.\n(C) Yes, they chose Jacob Borgman.", textWithBlanks: "Did ____ make a ____ decision yet?\n(A) Put it on the ____ shelf.\n(B) The ____ department.\n(C) Yes, they ____ Jacob Borgman.", missingWords: ["management", "hiring", "highest", "personnel", "chose"] };
const q13 = { id: 213, title: "Question 13", audioSrc: "", fullText: "Do you want to eat here in our cafeteria or go out?\n(A) He went there yesterday.\n(B) Well, maybe a sandwich.\n(C) Let’s eat here.", textWithBlanks: "Do you want to ____ here in our ____ or go out?\n(A) He ____ there yesterday.\n(B) Well, maybe a ____.\n(C) Let’s ____ here.", missingWords: ["eat", "cafeteria", "went", "sandwich", "eat"] };
const q14 = { id: 214, title: "Question 14", audioSrc: "", fullText: "Didn’t you e-mail the employment contract to Mr. Patel yesterday?\n(A) Yes, I would agree.\n(B) No, I'll send it now.\n(C) Check the employee manual.", textWithBlanks: "Didn’t you e-mail the ____ contract to Mr. Patel ____?\n(A) Yes, I would ____.\n(B) No, I'll ____ it now.\n(C) ____ the employee manual.", missingWords: ["employment", "yesterday", "agree", "send", "Check"] };
const q15 = { id: 215, title: "Question 15", audioSrc: "", fullText: "Our division’s picnic is this Saturday, right?\n(A) There’s a lot of rain in the forecast.\n(B) Sure, I like salad.\n(C) At the end of this corridor.", textWithBlanks: "Our ____ picnic is this ____, right?\n(A) There’s a lot of ____ in the forecast.\n(B) Sure, I like ____.\n(C) At the ____ of this corridor.", missingWords: ["division’s", "Saturday", "rain", "salad", "end"] };
const q16 = { id: 216, title: "Question 16", audioSrc: "", fullText: "Would you like coffee or tea?\n(A) Just water, please.\n(B) For a few dollars more.\n(C) A fifteen-minute break.", textWithBlanks: "Would you like ____ or ____?\n(A) Just ____, please.\n(B) For a few ____ more.\n(C) A fifteen-minute ____.", missingWords: ["coffee", "tea", "water", "dollars", "break"] };
const q17 = { id: 217, title: "Question 17", audioSrc: "", fullText: "We achieved our sales targets this month.\n(A) That’s excellent news!\n(B) A few times a day.\n(C) To the end of April.", textWithBlanks: "We ____ our sales ____ this month.\n(A) That’s ____ news!\n(B) A few ____ a day.\n(C) To the end of ____.", missingWords: ["achieved", "targets", "excellent", "times", "April"] };
const q18 = { id: 218, title: "Question 18", audioSrc: "", fullText: "How often do you travel for your job?\n(A) It turned out well.\n(B) Yes, I did find one.\n(C) About once a month.", textWithBlanks: "How ____ do you ____ for your job?\n(A) It ____ out well.\n(B) Yes, I did ____ one.\n(C) About ____ a month.", missingWords: ["often", "travel", "turned", "find", "once"] };
const q19 = { id: 219, title: "Question 19", audioSrc: "", fullText: "We should hike the Wildflower Trail today.\n(A) This seat is available.\n(B) I didn’t bring boots.\n(C) At the visitors’ center.", textWithBlanks: "We should ____ the Wildflower ____ today.\n(A) This ____ is available.\n(B) I didn’t ____ boots.\n(C) At the ____ center.", missingWords: ["hike", "Trail", "seat", "bring", "visitors’"] };
const q20 = { id: 220, title: "Question 20", audioSrc: "", fullText: "You’ve booked a hotel in London, haven’t you?\n(A) Very enjoyable, thanks.\n(B) He usually takes the train.\n(C) Yes, I made a reservation last week.", textWithBlanks: "You’ve ____ a hotel in London, ____ you?\n(A) Very ____, thanks.\n(B) He ____ takes the train.\n(C) Yes, I ____ a reservation last week.", missingWords: ["booked", "haven’t", "enjoyable", "usually", "made"] };
const q21 = { id: 221, title: "Question 21", audioSrc: "", fullText: "Are there any tickets left for tonight’s concert?\n(A) It’s sold out.\n(B) He’s a concert violinist.\n(C) They already left.", textWithBlanks: "Are there any ____ left for tonight’s ____?\n(A) It’s ____ out.\n(B) He’s a concert ____.\n(C) They already ____.", missingWords: ["tickets", "concert", "sold", "violinist", "left"] };
const q22 = { id: 222, title: "Question 22", audioSrc: "", fullText: "Haven't you used this software before?\n(A) Can I take your order?\n(B) I haven’t had the chance.\n(C) About 40 dollars.", textWithBlanks: "Haven't you ____ this ____ before?\n(A) Can I take your ____?\n(B) I haven’t had the ____.\n(C) About 40 ____.", missingWords: ["used", "software", "order", "chance", "dollars"] };
const q23 = { id: 223, title: "Question 23", audioSrc: "", fullText: "When is the new blender going to be released?\n(A) Only with fruits and vegetables.\n(B) In the kitchen cabinet.\n(C) The prototype is still being tested.", textWithBlanks: "When is the new ____ going to be ____?\n(A) Only with ____ and vegetables.\n(B) In the kitchen ____.\n(C) The ____ is still being tested.", missingWords: ["blender", "released", "fruits", "cabinet", "prototype"] };
const q24 = { id: 224, title: "Question 24", audioSrc: "", fullText: "Who’s picking up our clients at the airport?\n(A) They decided to drive.\n(B) At terminal 2.\n(C) It’s a marketing position.", textWithBlanks: "Who’s ____ up our ____ at the airport?\n(A) They ____ to drive.\n(B) At ____ 2.\n(C) It’s a marketing ____.", missingWords: ["picking", "clients", "decided", "terminal", "position"] };
const q25 = { id: 225, title: "Question 25", audioSrc: "", fullText: "Where are the red roses that came in this morning?\n(A) About three liters of water.\n(B) No, I didn’t check out the sale.\n(C) I needed some for a large bouquet.", textWithBlanks: "Where are the red ____ that came in this ____?\n(A) About three ____ of water.\n(B) No, I didn’t ____ out the sale.\n(C) I ____ some for a large ____.", missingWords: ["roses", "morning", "liters", "check", "needed", "bouquet"] };
const q26 = { id: 226, title: "Question 26", audioSrc: "", fullText: "This film has been nominated for several awards.\n(A) Why don’t we go see it?\n(B) After the announcement.\n(C) He made a great speech.", textWithBlanks: "This ____ has been ____ for several ____.\n(A) Why don’t we go ____ it?\n(B) After the ____.\n(C) He made a great ____.", missingWords: ["film", "nominated", "awards", "see", "announcement", "speech"] };
const q27 = { id: 227, title: "Question 27", audioSrc: "", fullText: "Who's interested in starting a car pool program?\n(A) Thanks, but I can't swim.\n(B) Clara’s already organizing one.\n(C) It’s a very interesting article.", textWithBlanks: "Who's ____ in starting a car ____ program?\n(A) Thanks, but I can't ____.\n(B) Clara’s already ____ one.\n(C) It’s a very ____ article.", missingWords: ["interested", "pool", "swim", "organizing", "interesting"] };
const q28 = { id: 228, title: "Question 28", audioSrc: "", fullText: "Where will I teach my workshop this month?\n(A) We just sent an e-mail to all instructors.\n(B) Five to seven months.\n(C) Yes, it’s a beautiful building.", textWithBlanks: "Where will I ____ my ____ this month?\n(A) We just ____ an e-mail to all instructors.\n(B) Five to seven ____.\n(C) Yes, it’s a ____ building.", missingWords: ["teach", "workshop", "sent", "months", "beautiful"] };
const q29 = { id: 229, title: "Question 29", audioSrc: "", fullText: "Why are we moving these sweaters to the back of the store?\n(A) In the new shopping mall.\n(B) Yes, they come in other colors.\n(C) Our spring merchandise is arriving soon.", textWithBlanks: "Why are we ____ these sweaters to the ____ of the store?\n(A) In the new ____ mall.\n(B) Yes, they come in other ____.\n(C) Our ____ merchandise is arriving soon.", missingWords: ["moving", "back", "shopping", "colors", "spring"] };
const q30 = { id: 230, title: "Question 30", audioSrc: "", fullText: "Would you be interested in working on some of these contracts?\n(A) Thank you for meeting me.\n(B) A contact lens prescription.\n(C) I have very limited time.", textWithBlanks: "Would you be ____ in ____ on some of these contracts?\n(A) Thank you for ____ me.\n(B) A contact lens ____.\n(C) I have very ____ time.", missingWords: ["interested", "working", "meeting", "prescription", "limited"] };
const q31 = { id: 231, title: "Question 31", audioSrc: "", fullText: "What type of job are you looking for?\n(A) No, at ten a.m.\n(B) I really like working with computers.\n(C) Just a résumé is needed.", textWithBlanks: "What ____ of job are you ____ for?\n(A) No, at ____ a.m.\n(B) I really ____ working with computers.\n(C) Just a résumé is ____.", missingWords: ["type", "looking", "ten", "like", "needed"] };
const part2: LibraryDictationExercise[] = [
    q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21,
    q22, q23, q24, q25, q26, q27, q28, q29, q30, q31
];

// From Part 3 Library
const language = {
    id: 4,
    title: "Learning a New Language",
    audioSrc: "",
    fullText: "Learning a new language opens up a world of opportunities. It allows you to connect with different cultures and people. Consistency is crucial; practicing a little every day is more effective than one long session per week. Don't be afraid to make mistakes, as they are an essential part of the learning process.",
    textWithBlanks: "____ a new language ____ up a world of ____. It allows you to ____ with different ____ and people. ____ is ____; practicing a little every day is more ____ than one long session per week. Don't be ____ to make ____, as they are an ____ part of the learning ____.",
    missingWords: ["Learning", "opens", "opportunities", "connect", "cultures", "Consistency", "crucial", "effective", "afraid", "mistakes", "essential", "process"],
};
const part3: LibraryDictationExercise[] = [language];

// From Part 4 Library
const part4_q1 = {
    id: 401,
    title: "Question 1",
    audioSrc: "",
    fullText: "Hi, you are calling the Novaland management office information line. Please be aware that there will be maintenance work to repave the entire parking garage adjacent to our building's front entrance on Friday, July third. Vehicles of all Novaland residents are required to be moved before 9AM next Saturday because their parking slots will be changed. After 9AM, any cars left in the parking area will be towed and the owner will be responsible for the expense. Finally, some alternative parking places will be posted in the building reception and I also will email it to all residents this afternoon.",
    textWithBlanks: "Hi, you are ____ the Novaland ____ office ____ line. Please be ____ that there will be ____ work to ____ the ____ parking garage ____ to our building's front ____ on Friday, July third. ____ of all Novaland ____ are ____ to be ____ before 9AM next Saturday because their parking ____ will be ____. After 9AM, any cars left in the ____ area will be ____ and the owner will be ____ for the ____. Finally, some ____ parking places will be ____ in the building ____ and I also will ____ it to all residents this afternoon.",
    missingWords: ["calling", "management", "information", "aware", "maintenance", "repave", "entire", "adjacent", "entrance", "Vehicles", "residents", "required", "moved", "slots", "changed", "parking", "towed", "responsible", "expense", "alternative", "posted", "reception", "email"],
};
const part4_q2 = {
    id: 402,
    title: "Question 2",
    audioSrc: "",
    fullText: "Welcome to House Help Channel. For today's episode, maintaining and making minor repairs to the roof of your home is what we'll go over. To begin, investing in a few special tools is the first thing to do, for example, a trowel and crowbar. Because you'll use them for many years, it's important to choose some that are high quality. You can seal any cracks or chips with your trowel and some roof cement. You can then replace loose shingles with the help of the crowbar after removing them. Now, every year, I highly recommend you take photos of your roof so that you can track its overall condition.",
    textWithBlanks: "Welcome to House Help Channel. For today's ____, ____ and making ____ repairs to the ____ of your home is what we'll go over. To begin, ____ in a few ____ tools is the first thing to do, for example, a ____ and crowbar. Because you'll use them for many years, it's ____ to choose some that are high ____. You can ____ any cracks or ____ with your trowel and some roof ____. You can then ____ loose shingles with the help of the crowbar after ____ them. Now, every year, I ____ recommend you take ____ of your roof so that you can ____ its ____ condition.",
    missingWords: ["episode", "maintaining", "minor", "roof", "investing", "special", "trowel", "important", "quality", "seal", "chips", "cement", "replace", "removing", "highly", "photos", "track", "overall"],
};
const part4_q3 = {
    id: 403,
    title: "Question 3",
    audioSrc: "",
    fullText: "Thanks again for joining the tour of the wonderful New York Conservatory with me today. I hope you enjoyed the species of plants and flowers that you saw and learned about. At the beginning of our tour, I mentioned the world-renowned botanist John Wick. At 2 o’clock, he will be giving a lecture on the care of flowering orchid plants. I highly recommend that you attend his speech because his work was in a famous documentary film named Plant Farmer. The conservatory's online gift shop is selling this, you can purchase it easily. Recently, I’ve learned many new things about the orchid species we have right here at the conservatory after watching this film.",
    textWithBlanks: "Thanks again for ____ the tour of the ____ New York Conservatory with me today. I hope you ____ the ____ of plants and flowers that you saw and ____ about. At the ____ of our tour, I ____ the world-____ botanist John Wick. At 2 o’clock, he will be giving a ____ on the ____ of flowering ____ plants. I highly ____ that you attend his ____ because his work was in a ____ documentary film named Plant Farmer. The conservatory's online ____ shop is ____ this, you can ____ it easily. ____, I’ve learned many new things about the orchid species we have right here at the conservatory after ____ this film.",
    missingWords: ["joining", "wonderful", "enjoyed", "species", "learned", "beginning", "mentioned", "renowned", "lecture", "care", "orchid", "recommend", "speech", "famous", "gift", "selling", "purchase", "Recently", "watching"],
};
const part4_q4 = {
    id: 404,
    title: "Question 4",
    audioSrc: "",
    fullText: "I want to thank you all again for helping the Wonder Community Center before the benefit concert begins. As I mentioned last month, some parts of our facility need to be repaired . In selling tickets, we have got 7000 dollars so far, but we still need more to achieve our target. Therefore, I highly recommend you buy some snacks or soda drinks in the concession stand before entering the concert. We will use 90 percent of the proceeds from this to cover the construction at our Wonder Community Center. I hope you have a great day!",
    textWithBlanks: "I want to ____ you all again for ____ the Wonder Community Center before the ____ concert begins. As I ____ last month, some parts of our ____ need to be ____ . In ____ tickets, we have got 7000 dollars so far, but we still need more to ____ our ____. Therefore, I highly ____ you buy some snacks or soda drinks in the ____ stand before ____ the concert. We will use 90 ____ of the ____ from this to ____ the construction at our Wonder Community Center. I hope you have a ____ day!",
    missingWords: ["thank", "helping", "benefit", "mentioned", "facility", "repaired", "selling", "achieve", "target", "recommend", "concession", "entering", "percent", "proceeds", "cover", "great"],
};
const part4_q5 = {
    id: 405,
    title: "Question 5",
    audioSrc: "",
    fullText: "We appreciate you all being here for today's workshop. This session will be led by Thomas Frank and myself, and our focus will be on business owners using their time efficiently. For business success, planning and spending your time wisely is the key. In the packet we have handed to you during your arrival, there are some documents I’ll be referring to for the topic of our presentation today. If you haven't got one yet, Thomas is right at the green chair. Alright, to begin, I have an exercise to help us get to know one another better.",
    textWithBlanks: "We ____ you all being here for today's ____. This ____ will be led by Thomas Frank and myself, and our ____ will be on business ____ using their time ____. For business ____, planning and ____ your time ____ is the key. In the ____ we have ____ to you during your ____, there are some documents I’ll be ____ to for the ____ of our presentation today. If you haven't got one yet, Thomas is right at the green chair. Alright, to ____, I have an ____ to help us get to know one another ____.",
    missingWords: ["appreciate", "workshop", "session", "focus", "owners", "efficiently", "success", "spending", "wisely", "packet", "handed", "arrival", "referring", "topic", "begin", "exercise", "better"],
};
const part4_q6 = {
    id: 406,
    title: "Question 6",
    audioSrc: "",
    fullText: "Archaeologists at this site have uncovered the remains of an eleventh-century marketplace, including colorful mosaic tiles on the walls. Even after all these centuries, you'll notice the vibrant colors. This is the most important part of these ruins. In the artists’ pictures, you can easily see the intricate details from daily life scenes. A roof has been constructed over the area, making the lights dim to protect these mosaics now. Also, no photos are allowed due to flash damage to the tiles. As we move forward, please use the handrails on both sides for staying on the path and protecting the surrounding ruins.",
    textWithBlanks: "____ at this site have ____ the remains of an eleventh-century ____, including ____ mosaic ____ on the walls. Even after all these ____, you'll notice the ____ colors. This is the most ____ part of these ____. In the artists’ pictures, you can ____ see the ____ details from daily life scenes. A ____ has been ____ over the area, making the lights ____ to protect these mosaics now. Also, no photos are ____ due to ____ damage to the tiles. As we move forward, please use the ____ on both sides for ____ on the path and ____ the surrounding ruins.",
    missingWords: ["Archaeologists", "uncovered", "marketplace", "colorful", "tiles", "centuries", "vibrant", "important", "ruins", "easily", "intricate", "roof", "constructed", "dim", "allowed", "flash", "handrails", "staying", "protecting"],
};
const part4_q7 = {
    id: 407,
    title: "Question 7",
    audioSrc: "",
    fullText: "As you all know, our agency finally won the important advertising contract with McDonald Fast Food Company. What we need to develop is 5 advertisements in total. Three 45-second ads for a local supermarket to be released next two weeks and four additional 25-second ads for the next month. Although the schedule looks very tight, I know, we must prioritize this because it is the biggest contract for this year. The client has begun internal work, so we have a rough ad available for editing. Let’s focus on that now.",
    textWithBlanks: "As you all know, our ____ finally ____ the important ____ contract with McDonald Fast Food Company. What we need to ____ is 5 advertisements in ____. Three 45-second ads for a local ____ to be ____ next two weeks and four ____ 25-second ads for the next month. Although the ____ looks very ____, I know, we must ____ this because it is the ____ contract for this year. The client has ____ internal work, so we have a ____ ad ____ for editing. Let’s ____ on that now.",
    missingWords: ["agency", "won", "advertising", "develop", "total", "supermarket", "released", "additional", "schedule", "tight", "prioritize", "biggest", "begun", "rough", "available", "focus"],
};
const part4_q8 = {
    id: 408,
    title: "Question 8",
    audioSrc: "",
    fullText: "Excuse me, nurses. Your attention please. I've been receiving complaints about the free snacks in the hospital break rooms. Some people have mentioned that they don't like the selection of snacks, and some have said that they don't get to eat them at all because they're gone by the time the evening shift starts. So I was thinking about putting some money into each of your staff spending accounts every month so that you can buy the snacks you want at the hospital cafeteria. That will require management approval, but I'll keep you posted.",
    textWithBlanks: "Excuse me, nurses. Your ____ please. I've been ____ complaints about the ____ snacks in the hospital ____ rooms. Some people have ____ that they don't like the ____ of snacks, and some have said that they don't get to eat them at all because they're ____ by the time the evening ____ starts. So I was ____ about putting some money into each of your staff ____ accounts every month so that you can ____ the snacks you want at the hospital ____. That will ____ management ____, but I'll keep you ____.",
    missingWords: ["attention", "receiving", "free", "break", "mentioned", "selection", "gone", "shift", "thinking", "spending", "buy", "cafeteria", "require", "approval", "posted"],
};
const part4_q9 = {
    id: 409,
    title: "Question 9",
    audioSrc: "",
    fullText: "Hi all, it’s me again, the mayor of Hanoi city. I’m glad you are here to celebrate the recent renovation of Hanoi National Mountain in our town. The mountain has many new areas to explore. Therefore, we will take a long hike here. First, we will visit the biggest zoo and then will hike on the top of the mountain. Finally, we will end our tour at the picnic area in the middle of the stream. There we’ll have some free cookies and pies. If you take pictures, please put them on the city's website. We'd like to have a commemoration of this special day.",
    textWithBlanks: "Hi all, it’s me again, the ____ of Hanoi city. I’m ____ you are here to ____ the recent ____ of Hanoi National Mountain in our town. The mountain has many new areas to ____. Therefore, we will take a long ____ here. First, we will ____ the biggest zoo and then will hike on the ____ of the mountain. Finally, we will ____ our tour at the ____ area in the middle of the ____. There we’ll have some free ____ and pies. If you take ____, please put them on the city's website. We'd like to have a ____ of this ____ day.",
    missingWords: ["mayor", "glad", "celebrate", "renovation", "explore", "hike", "visit", "top", "end", "picnic", "stream", "cookies", "pictures", "commemoration", "special"],
};
const part4_q10 = {
    id: 410,
    title: "Question 10",
    audioSrc: "",
    fullText: "Thank you all for being here at today's free public lecture, which is sponsored by the Springfield Farmers' Association. Many of you have asked for information about how to grow a fruit garden. People are interested in learning how to maintain their garden's health and achieve the fruits they want. First, we suggest starting with regular soil testing. Now we are in January, it’s important that all soil samples collected in the next few months come from the same depth, as shown on this chart. And don’t forget to sign up for our monthly email list before you leave, so you can receive updates on upcoming lectures.",
    textWithBlanks: "Thank you all for being here at today's free public ____, which is ____ by the Springfield Farmers' ____. Many of you have ____ for information about how to ____ a fruit garden. People are ____ in learning how to ____ their garden's ____ and ____ the fruits they want. First, we ____ starting with ____ soil testing. Now we are in January, it’s ____ that all soil ____ collected in the next few months come from the same ____, as ____ on this chart. And don’t ____ to sign up for our ____ email list before you leave, so you can ____ updates on ____ lectures.",
    missingWords: ["lecture", "sponsored", "Association", "asked", "grow", "interested", "maintain", "health", "achieve", "suggest", "regular", "important", "samples", "depth", "shown", "forget", "monthly", "receive", "upcoming"],
};
const part4: LibraryDictationExercise[] = [
    part4_q1, part4_q2, part4_q3, part4_q4, part4_q5, part4_q6, part4_q7, part4_q8, part4_q9, part4_q10
];

export const dictationTest1Data = {
    part1: part1,
    part2: part2,
    part3: part3,
    part4: part4,
};
