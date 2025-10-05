import { DictationPart } from '../types';

// TOEIC TEST 5 EXERCISES - PART 1
const t5p1q1 = { id: 5101, title: "Test 5 - Part 1 - Q1", audioSrc: "", fullText: "The worker is carrying some plants. The worker is reading a sign. The worker is pushing a cart. The worker is writing some notes.", textWithBlanks: "The ____ is ____ some ____. The worker is ____ a ____. The worker is ____ a ____. The worker is ____ some ____.", missingWords: ["worker", "carrying", "plants", "reading", "sign", "pushing", "cart", "writing", "notes"] };
const t5p1q2 = { id: 5102, title: "Test 5 - Part 1 - Q2", audioSrc: "", fullText: "Some of the people are pulling suitcases. Some of the people are relaxing on benches. Some of the people are putting luggage onto a rack. Some of the people are waiting in line to purchase a ticket.", textWithBlanks: "Some of the ____ are ____ suitcases. Some of the people are ____ on ____. Some of the people are ____ luggage onto a ____. Some of the people are ____ in line to ____ a ____.", missingWords: ["people", "pulling", "relaxing", "benches", "putting", "rack", "waiting", "purchase", "ticket"] };
const t5p1q3 = { id: 5103, title: "Test 5 - Part 1 - Q3", audioSrc: "", fullText: "She's looking into her backpack. She's tying the laces of her boots. She's hiking on an outdoor path. She's walking out of a tunnel.", textWithBlanks: "She's ____ into her ____. She's ____ the ____ of her ____. She's ____ on an ____ path. She's ____ out of a ____.", missingWords: ["looking", "backpack", "tying", "laces", "boots", "hiking", "outdoor", "walking", "tunnel"] };
const t5p1q4 = { id: 5104, title: "Test 5 - Part 1 - Q4", audioSrc: "", fullText: "He's holding the handle of a shopping cart. He's plugging a cord into a wall outlet. He's looking into a kitchen cupboard. He's kneeling down on a tile floor.", textWithBlanks: "He's ____ the ____ of a shopping cart. He's ____ a ____ into a wall ____. He's ____ into a kitchen ____. He's ____ down on a ____ floor.", missingWords: ["holding", "handle", "plugging", "cord", "outlet", "looking", "cupboard", "kneeling", "tile"] };
const t5p1q5 = { id: 5105, title: "Test 5 - Part 1 - Q5", audioSrc: "", fullText: "Seats have been arranged under some umbrellas. Some street signs are being taken down. Some bushes are being trimmed. Some chairs are being folded and stacked.", textWithBlanks: "Seats have been ____ under some ____. Some street ____ are being ____ down. Some ____ are being ____. Some chairs are being ____ and ____.", missingWords: ["arranged", "umbrellas", "signs", "taken", "bushes", "trimmed", "folded", "stacked"] };
const t5p1q6 = { id: 5106, title: "Test 5 - Part 1 - Q6", audioSrc: "", fullText: "Some cushions have been laid on the floor. Books have been piled up by a glass door. A light fixture is suspended from the ceiling. A rug has been rolled up against a wall.", textWithBlanks: "Some ____ have been ____ on the floor. Books have been ____ up by a glass door. A light ____ is ____ from the ____. A rug has been ____ up against a wall.", missingWords: ["cushions", "laid", "piled", "fixture", "suspended", "ceiling", "rolled"] };

// TOEIC TEST 2 EXERCISES - PART 1
const t2p1q1 = { id: 2101, title: "Question 1", audioSrc: "", fullText: "(A) She's inserting a cord into an outlet. (B) She's pressing a button on a machine. (C) She's gripping the handle of a drawer. (D) She's tacking a notice onto the wall.", textWithBlanks: "(A) She's ____ a ____ into an ____. (B) She's ____ a button on a ____. (C) She's ____ the ____ of a drawer. (D) She's ____ a notice onto the wall.", missingWords: ["inserting", "cord", "outlet", "pressing", "machine", "gripping", "handle", "tacking"] };
const t2p1q2 = { id: 2102, title: "Question 2", audioSrc: "", fullText: "(A) Some window shutters are being replaced. (B) A pillow is being arranged on a seat. (C) An outdoor table is being cleared off. (D) Some wooden boards are being painted.", textWithBlanks: "(A) Some window ____ are being ____. (B) A ____ is being ____ on a seat. (C) An outdoor table is being ____ off. (D) Some ____ boards are being ____.", missingWords: ["shutters", "replaced", "pillow", "arranged", "cleared", "wooden", "painted"] };
const t2p1q3 = { id: 2103, title: "Question 3", audioSrc: "", fullText: "(A) Some utensils have been discarded in a bin. (B) Some bottles are being emptied into a sink. (C) A rolling chair has been placed next to a counter. (D) Some drawers have been left open.", textWithBlanks: "(A) Some ____ have been ____ in a bin. (B) Some ____ are being ____ into a sink. (C) A ____ chair has been ____ next to a counter. (D) Some ____ have been left ____.", missingWords: ["utensils", "discarded", "bottles", "emptied", "rolling", "placed", "drawers", "open"] };
const t2p1q4 = { id: 2104, title: "Question 4", audioSrc: "", fullText: "(A) A man is chopping some wood into pieces. (B) Leaves are scattered across the grass. (C) A man is closing a window. (D) Wood is piled near a fence.", textWithBlanks: "(A) A man is ____ some wood into ____. (B) Leaves are ____ across the ____. (C) A man is ____ a window. (D) Wood is ____ near a ____.", missingWords: ["chopping", "pieces", "scattered", "grass", "closing", "piled", "fence"] };
const t2p1q5 = { id: 2105, title: "Question 5", audioSrc: "", fullText: "(A) People are standing in line in a lobby. (B) Items are being loaded into shopping bags. (C) Tents have been set up in a parking area. (D) A worker is putting up a canopy.", textWithBlanks: "(A) People are ____ in line in a ____. (B) Items are being ____ into shopping ____. (C) ____ have been ____ up in a ____ area. (D) A worker is ____ up a ____.", missingWords: ["standing", "lobby", "loaded", "bags", "Tents", "set", "parking", "putting", "canopy"] };
const t2p1q6 = { id: 2106, title: "Question 6", audioSrc: "", fullText: "(A) Some luggage is stacked next to an escalator. (B) A suitcase is being lifted onto a shuttle bus. (C) Some suitcases are displayed in a shop window. (D) A luggage rack has two levels.", textWithBlanks: "(A) Some luggage is ____ next to an ____. (B) A ____ is being ____ onto a shuttle bus. (C) Some suitcases are ____ in a shop ____. (D) A luggage ____ has two ____.", missingWords: ["stacked", "escalator", "suitcase", "lifted", "displayed", "window", "rack", "levels"] };

// TOEIC TEST 3 EXERCISES - PART 1
const t3p1q1 = { id: 3101, title: "Question 1", audioSrc: "", fullText: "(A) She's cleaning an oven. (B) She's moving a pot. (C) She's opening a cabinet. (D) She's holding a towel.", textWithBlanks: "(A) She's ____ an ____. (B) She's ____ a pot. (C) She's ____ a ____. (D) She's ____ a ____.", missingWords: ["cleaning", "oven", "moving", "opening", "cabinet", "holding", "towel"] };
const t3p1q2 = { id: 3102, title: "Question 2", audioSrc: "", fullText: "(A) They're putting trash in a bag. (B) They're taking off their jackets. (C) They're facing a shelving unit. (D) They're painting a room.", textWithBlanks: "(A) They're ____ trash in a ____. (B) They're ____ off their ____. (C) They're ____ a ____ unit. (D) They're ____ a room.", missingWords: ["putting", "bag", "taking", "jackets", "facing", "shelving", "painting"] };
const t3p1q3 = { id: 3103, title: "Question 3", audioSrc: "", fullText: "(A) One of the men is removing his hat. (B) A line of customers extends out a door. (C) Some workers are installing a sign. (D) Musicians have gathered in a circle.", textWithBlanks: "(A) One of the men is ____ his hat. (B) A line of ____ extends out a door. (C) Some ____ are ____ a sign. (D) ____ have ____ in a circle.", missingWords: ["removing", "customers", "workers", "installing", "Musicians", "gathered"] };
const t3p1q4 = { id: 3104, title: "Question 4", audioSrc: "", fullText: "(A) Some tools have been left on a chair. (B) Some tool sets have been laid out. (C) A cup of coffee has spilled. (D) A table leg is being repaired.", textWithBlanks: "(A) Some ____ have been ____ on a chair. (B) Some tool ____ have been ____ out. (C) A cup of coffee has ____. (D) A table leg is being ____.", missingWords: ["tools", "left", "sets", "laid", "spilled", "repaired"] };
const t3p1q5 = { id: 3105, title: "Question 5", audioSrc: "", fullText: "(A) A railing is being removed. (B) A roof is under construction. (C) Some workers are carrying a ladder. (D) Some workers are holding sheets of metal.", textWithBlanks: "(A) A ____ is being ____. (B) A ____ is under ____. (C) Some workers are ____ a ____. (D) Some workers are ____ sheets of ____.", missingWords: ["railing", "removed", "roof", "construction", "carrying", "ladder", "holding", "metal"] };
const t3p1q6 = { id: 3106, title: "Question 6", audioSrc: "", fullText: "(A) A ladder has been leaned against a tree. (B) There are piles of tree branches discarded in a field. (C) Wooden benches have been arranged in a circle. (D) A wooden structure has been built near some trees.", textWithBlanks: "(A) A ____ has been ____ against a tree. (B) There are ____ of tree ____ discarded in a field. (C) Wooden ____ have been ____ in a circle. (D) A wooden ____ has been ____ near some trees.", missingWords: ["ladder", "leaned", "piles", "branches", "benches", "arranged", "structure", "built"] };

// TOEIC TEST 4 EXERCISES - PART 1
const t4p1q1 = { id: 4101, title: "Question 1", audioSrc: "", fullText: "(A) He's cleaning the floor. (B) He's setting a plant on a shelf. (C) He's pouring some liquid into a cup. (D) He's ironing a shirt.", textWithBlanks: "(A) He's ____ the floor. (B) He's ____ a plant on a ____. (C) He's ____ some ____ into a cup. (D) He's ____ a shirt.", missingWords: ["cleaning", "setting", "shelf", "pouring", "liquid", "ironing"] };
const t4p1q2 = { id: 4102, title: "Question 2", audioSrc: "", fullText: "(A) They're glancing at a monitor. (B) They're putting pens in a jar. (C) They're wiping off a desk. (D) They're examining a document.", textWithBlanks: "(A) They're ____ at a ____. (B) They're ____ pens in a ____. (C) They're ____ off a desk. (D) They're ____ a ____.", missingWords: ["glancing", "monitor", "putting", "jar", "wiping", "examining", "document"] };
const t4p1q3 = { id: 4103, title: "Question 3", audioSrc: "", fullText: "(A) Some people are taking a ride on a boat. (B) A boat is floating under a bridge. (C) A boat is being loaded with cargo. (D) Some people are rowing a boat past a lighthouse.", textWithBlanks: "(A) Some people are ____ a ride on a ____. (B) A boat is ____ under a ____. (C) A boat is being ____ with ____. (D) Some people are ____ a boat past a ____.", missingWords: ["taking", "boat", "floating", "bridge", "loaded", "cargo", "rowing", "lighthouse"] };
const t4p1q4 = { id: 4104, title: "Question 4", audioSrc: "", fullText: "(A) There's a fire burning in a fireplace. (B) There's a guitar beside a fireplace. (C) Some cables have been left on the ground in a pile. (D) A television is being packed into a box.", textWithBlanks: "(A) There's a fire ____ in a ____. (B) There's a ____ beside a fireplace. (C) Some ____ have been left on the ____ in a pile. (D) A television is being ____ into a box.", missingWords: ["burning", "fireplace", "guitar", "cables", "ground", "packed"] };
const t4p1q5 = { id: 4105, title: "Question 5", audioSrc: "", fullText: "(A) Some people are riding bicycles through a field. (B) Some people are moving a picnic table. (C) There are some mountains in the distance. (D) A bicycle has fallen over on the ground.", textWithBlanks: "(A) Some people are ____ bicycles through a ____. (B) Some people are ____ a ____ table. (C) There are some ____ in the ____. (D) A bicycle has ____ over on the ground.", missingWords: ["riding", "field", "moving", "picnic", "mountains", "distance", "fallen"] };
const t4p1q6 = { id: 4106, title: "Question 6", audioSrc: "", fullText: "(A) Some couches have been pushed against a wall. (B) Some lights have been hung from the ceiling. (C) Some cushions have been stacked on the floor. (D) Some flowers have been arranged in a vase.", textWithBlanks: "(A) Some ____ have been ____ against a wall. (B) Some ____ have been ____ from the ceiling. (C) Some ____ have been ____ on the floor. (D) Some ____ have been ____ in a vase.", missingWords: ["couches", "pushed", "lights", "hung", "cushions", "stacked", "flowers", "arranged"] };

// BASE EXERCISES - PART 1
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
const novaland3 = {
    id: 103,
    title: "Novaland Call - Part 3",
    audioSrc: "",
    fullText: "After 9AM, any cars left in the parking area will be towed and the owner will be responsible for the expense.",
    textWithBlanks: "After 9AM, any ____ left in the parking ____ will be ____ and the owner will be ____ for the ____.",
    missingWords: ["cars", "area", "towed", "responsible", "expense"],
};
const novaland4 = {
    id: 104,
    title: "Novaland Call - Part 4",
    audioSrc: "",
    fullText: "Finally, some alternative parking places will be posted in the building reception and I also will email it to all residents this afternoon.",
    textWithBlanks: "Finally, some ____ parking places will be ____ in the building ____ and I also will email it to all ____ this afternoon.",
    missingWords: ["alternative", "posted", "reception", "residents"],
};

export const dictationPart1Data: DictationPart = {
    id: 1,
    title: "Part 1: Photographs",
    description: "Listen to descriptions of a photograph and identify the correct one.",
    tests: [
        { id: 1, title: "Test 1", exercises: [novaland1, novaland2] },
        { id: 2, title: "Test 2", exercises: [t2p1q1, t2p1q2, t2p1q3, t2p1q4, t2p1q5, t2p1q6] },
        { id: 3, title: "Test 3", exercises: [t3p1q1, t3p1q2, t3p1q3, t3p1q4, t3p1q5, t3p1q6] },
        { id: 4, title: "Test 4", exercises: [t4p1q1, t4p1q2, t4p1q3, t4p1q4, t4p1q5, t4p1q6] },
        { id: 5, title: "Test 5", exercises: [t5p1q1, t5p1q2, t5p1q3, t5p1q4, t5p1q5, t5p1q6] },
        { id: 6, title: "Test 6", exercises: [t2p1q1, t2p1q2, t2p1q3, t2p1q4, t2p1q5, t2p1q6] },
        { id: 7, title: "Test 7", exercises: [t3p1q1, t3p1q2, t3p1q3, t3p1q4, t3p1q5, t3p1q6] },
        { id: 8, title: "Test 8", exercises: [t2p1q1, t2p1q2, t2p1q3, t2p1q4, t2p1q5, t2p1q6] },
    ]
};
