import { ReadingTestData, ReadingPassage } from '../types';

const readingTests: Record<number, Record<number, ReadingTestData>> = {
    5: {
        1: {
            id: 1,
            title: 'Part 5 - Test 1',
            part: 5,
            passages: [
                {
                    id: 'passage-5-1-1',
                    text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                    questions: [
                        { id: '101', questionText: 'Former Sendai Company CEO Ken Nakata spoke about ______ career experiences.', options: { A: 'he', B: 'his', C: 'him', D: 'himself' }, correctAnswer: 'B' },
                        { id: '102', questionText: 'Passengers who will be taking a ______ domestic flight should go to Terminal A.', options: { A: 'connectivity', B: 'connects', C: 'connect', D: 'connecting' }, correctAnswer: 'D' },
                        { id: '103', questionText: "Fresh and ______ apple-cider donuts are available at Oakcrest Orchard's retail shop for £6 per dozen.", options: { A: 'eaten', B: 'open', C: 'tasty', D: 'free' }, correctAnswer: 'C' },
                        { id: '104', questionText: 'Zahn Flooring has the widest selection of ______ in the United Kingdom.', options: { A: 'paints', B: 'tiles', C: 'furniture', D: 'curtains' }, correctAnswer: 'B' },
                        { id: '105', questionText: 'One responsibility of the IT department is to ensure that the company is using ______ software.', options: { A: 'update', B: 'updating', C: 'updates', D: 'updated' }, correctAnswer: 'D' },
                        { id: '106', questionText: "It is wise to check a company's dress code ______ visiting its head office.", options: { A: 'so', B: 'how', C: 'like', D: 'before' }, correctAnswer: 'D' },
                        { id: '107', questionText: "Wexler Store's management team expects that employees will ______ support any new hires.", options: { A: 'enthusiastically', B: 'enthusiasm', C: 'enthusiastic', D: 'enthused' }, correctAnswer: 'A' },
                        { id: '108', questionText: 'Wheel alignments and brake system ______ are part of our vehicle service plan.', options: { A: 'inspects', B: 'inspector', C: 'inspected', D: 'inspections' }, correctAnswer: 'D' },
                        { id: '109', questionText: 'Registration for the Marketing Coalition Conference is now open ______ September 30.', options: { A: 'until', B: 'into', C: 'yet', D: 'while' }, correctAnswer: 'A' },
                        { id: '110', questionText: 'Growth in the home entertainment industry has been ______ this quarter.', options: { A: 'separate', B: 'limited', C: 'willing', D: 'assorted' }, correctAnswer: 'B' },
                        { id: '111', questionText: 'Hawson Furniture will be making ______ on the east side of town on Thursday.', options: { A: 'deliveries', B: 'delivered', C: 'deliver', D: 'deliverable' }, correctAnswer: 'A' },
                        { id: '112', questionText: 'The Marlton City Council does not have the authority to ______ parking on city streets.', options: { A: 'drive', B: 'prohibit', C: 'bother', D: 'travel' }, correctAnswer: 'B' },
                        { id: '113', questionText: 'Project Earth Group is ______ for ways to reduce transport-related greenhouse gas emissions.', options: { A: 'looking', B: 'seeing', C: 'driving', D: 'leaning' }, correctAnswer: 'A' },
                        { id: '114', questionText: 'Our skilled tailors are happy to design a custom-made suit that fits your style and budget ______. ', options: { A: 'perfect', B: 'perfects', C: 'perfectly', D: 'perfection' }, correctAnswer: 'C' },
                        { id: '115', questionText: 'Project manager Hannah Chung has proved to be very ______ with completing company projects.', options: { A: 'helpfulness', B: 'help', C: 'helpfully', D: 'helpful' }, correctAnswer: 'D' },
                        { id: '116', questionText: 'Lehua Vacation Club members will receive double points ______ the month of August at participating hotels.', options: { A: 'onto', B: 'above', C: 'during', D: 'between' }, correctAnswer: 'C' },
                        { id: '117', questionText: 'The costumes were not received ______ enough to be used in the first dress rehearsal.', options: { A: 'far', B: 'very', C: 'almost', D: 'soon' }, correctAnswer: 'D' },
                        { id: '118', questionText: 'As a former publicist for several renowned orchestras, Mr. Wu would excel in the role of event ______. ', options: { A: 'organized', B: 'organizer', C: 'organizes', D: 'organizational' }, correctAnswer: 'B' },
                        { id: '119', questionText: "The northbound lane on Davis Street will be ______ closed because of the city's bridge reinforcement project.", options: { A: 'temporarily', B: 'competitively', C: 'recently', D: 'collectively' }, correctAnswer: 'A' },
                        { id: '120', questionText: 'Airline representatives must handle a wide range of passenger issues, ______ missed connections to lost luggage.', options: { A: 'from', B: 'under', C: 'on', D: 'against' }, correctAnswer: 'A' },
                        { id: '121', questionText: 'The meeting notes were ______ deleted, but Mr. Hahm was able to recreate them from memory.', options: { A: 'accident', B: 'accidental', C: 'accidents', D: 'accidentally' }, correctAnswer: 'D' },
                        { id: '122', questionText: 'The current issue of Farming Scene magazine predicts that the price of corn will rise 5 percent over the ______ year.', options: { A: 'next', B: 'with', C: 'which', D: 'now' }, correctAnswer: 'A' },
                        { id: '123', questionText: 'Anyone who still ______ to take the fire safety training should do so before the end of the month.', options: { A: 'needing', B: 'needs', C: 'has needed', D: 'were needing' }, correctAnswer: 'B' },
                        { id: '124', questionText: 'Emerging technologies have ______ begun to transform the shipping industry in ways that were once unimaginable.', options: { A: 'already', B: 'exactly', C: 'hardly', D: 'closely' }, correctAnswer: 'A' },
                        { id: '125', questionText: 'The company handbook outlines the high ______ that employees are expected to meet every day.', options: { A: 'experts', B: 'accounts', C: 'recommendations', D: 'standards' }, correctAnswer: 'D' },
                        { id: '126', questionText: 'Because ______ of the board members have scheduling conflicts, the board meeting will be moved to a date when all can attend.', options: { A: 'any', B: 'everybody', C: 'those', D: 'some' }, correctAnswer: 'D' },
                        { id: '127', questionText: 'The project ______ the collaboration of several teams across the company.', options: { A: 'passed', B: 'decided', C: 'required', D: 'performed' }, correctAnswer: 'C' },
                        { id: '128', questionText: "We cannot send the store's coupon booklet to the printers until it ______ by Ms. Jeon.", options: { A: 'is approving', B: 'approves', C: 'has been approved', D: 'will be approved' }, correctAnswer: 'C' },
                        { id: '129', questionText: '______ the closure of Verdigold Transport Services, we are looking for a new shipping company.', options: { A: 'In spite of', B: 'Just as', C: 'In light of', D: 'According to' }, correctAnswer: 'C' },
                        { id: '130', questionText: "The ______ information provided by Uniss Bank's brochure helps applicants understand the terms of their loans.", options: { A: 'arbitrary', B: 'supplemental', C: 'superfluous', D: 'potential' }, correctAnswer: 'B' },
                    ]
                }
            ]
        },
        2: {
            id: 2,
            title: 'Part 5 - Test 2',
            part: 5,
            passages: [
                {
                    id: 'passage-5-2-1',
                    text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                    questions: [
                        { id: '101', questionText: 'Before operating your handheld device, please ------- the enclosed cable to charge it.', options: { A: 'plan', B: 'remain', C: 'use', D: 'finish' }, correctAnswer: 'C' },
                        { id: '102', questionText: "Safile's new external hard drive can ------- store up to one terabyte of data.", options: { A: 'secure', B: 'security', C: 'securely', D: 'secured' }, correctAnswer: 'C' },
                        { id: '103', questionText: 'Mr. Peterson will travel ------- the Tokyo office for the annual meeting.', options: { A: 'to', B: 'through', C: 'in', D: 'over' }, correctAnswer: 'A' },
                        { id: '104', questionText: 'Yong-Soo Cosmetics will not charge for items on back order until ------- have left our warehouse.', options: { A: 'them', B: 'they', C: 'themselves', D: 'their' }, correctAnswer: 'B' },
                        { id: '105', questionText: 'Our premium day tour takes visitors to historic sites ------- the Aprico River.', options: { A: 'onto', B: 'since', C: 'inside', D: 'along' }, correctAnswer: 'D' },
                        { id: '106', questionText: 'Eighty percent of drivers surveyed said they would consider buying a vehicle that runs on ----', options: { A: 'electricity', B: 'electrically', C: 'electricians', D: 'electrify' }, correctAnswer: 'A' },
                        { id: '107', questionText: 'Xinzhe Zu has ------- Petrin Engineering as the vice president of operations.', options: { A: 'attached', B: 'resigned', C: 'joined', D: 'combined' }, correctAnswer: 'C' },
                        { id: '108', questionText: "Next month, Barder House Books will be holding ------- third author's hour in Cleveland.", options: { A: 'it', B: 'itself', C: 'its own', D: 'its' }, correctAnswer: 'D' },
                        { id: '109', questionText: "Chester's Tiles ------- expanded to a second location in Turnington.", options: { A: 'severely', B: 'usually', C: 'recently', D: 'exactly' }, correctAnswer: 'C' },
                        { id: '110', questionText: "Tabrino's has ------- increased the number of almonds in the Nut Medley snack pack.", options: { A: 'significant', B: 'significance', C: 'signifies', D: 'significantly' }, correctAnswer: 'D' },
                        { id: '111', questionText: '------- she travels, Jacintha Flores collects samples of local fabrics and patterns.', options: { A: 'Wherever', B: 'In addition to', C: 'Either', D: 'In contrast to' }, correctAnswer: 'A' },
                        { id: '112', questionText: 'Most picture ------- at Glowing Photo Lab go on sale at 3:00 P.M. today.', options: { A: 'framer', B: 'framing', C: 'framed', D: 'frames' }, correctAnswer: 'D' },
                        { id: '113', questionText: 'All students in the business management class hold ------- college degrees.', options: { A: 'late', B: 'developed', C: 'advanced', D: 'elated' }, correctAnswer: 'C' },
                        { id: '114', questionText: "We hired Noah Wan of Shengyao Accounting Ltd. ------- our company's financial assets.", options: { A: 'to evaluate', B: 'to be evaluated', C: 'will be evaluated', D: 'evaluate' }, correctAnswer: 'A' },
                        { id: '115', questionText: 'Ms. Charisse is taking on a new account ------- she finishes the Morrison project.', options: { A: 'with', B: 'going', C: 'after', D: 'between' }, correctAnswer: 'C' },
                        { id: '116', questionText: "Cormet Motors' profits are ------- this year than last year.", options: { A: 'higher', B: 'high', C: 'highly', D: 'highest' }, correctAnswer: 'A' },
                        { id: '117', questionText: "In its ------- advertising campaign, Jaymor Tools demonstrates how reliable its products are.", options: { A: 'current', B: 'relative', C: 'spacious', D: 'collected' }, correctAnswer: 'A' },
                        { id: '118', questionText: 'Remember to submit receipts for reimbursement ------- returning from a business trip.', options: { A: 'such as', B: 'when', C: 'then', D: 'within' }, correctAnswer: 'B' },
                        { id: '119', questionText: "Patrons will be able to access Westside Library's ------- acquired collection of books on Tuesday.", options: { A: 'instantly', B: 'newly', C: 'early', D: 'naturally' }, correctAnswer: 'B' },
                        { id: '120', questionText: 'Please ------- any questions about time sheets to Tabitha Jones in the payroll department.', options: { A: 'direction', B: 'directive', C: 'directed', D: 'direct' }, correctAnswer: 'D' },
                        { id: '121', questionText: 'Before signing a delivery -------, be sure to double-check that all the items ordered are in the shipment.', options: { A: 'decision', B: 'announcement', C: 'receipt', D: 'limit' }, correctAnswer: 'C' },
                        { id: '122', questionText: 'Funds have been added to the budget for expenses ------- with the new building.', options: { A: 'associated', B: 'association', C: 'associate', D: 'associates' }, correctAnswer: 'A' },
                        { id: '123', questionText: 'Ms. Bernard ------- that a deadline was approaching, so she requested some assistance.', options: { A: 'noticed', B: 'obscured', C: 'withdrew', D: 'appeared' }, correctAnswer: 'A' },
                        { id: '124', questionText: 'Mr. Moscowitz is ------- that Dr. Tanaka will agree to present the keynote speech at this year\'s conference.', options: { A: 'hopes', B: 'hoped', C: 'hopeful', D: 'hopefully' }, correctAnswer: 'C' },
                        { id: '125', questionText: 'Two Australian companies are developing new smartphones, but it is unclear ------- phone will become available first.', options: { A: 'if', B: 'which', C: 'before', D: 'because' }, correctAnswer: 'B' },
                        { id: '126', questionText: 'Corners Gym offers its members a free lesson in how to use ------- properly.', options: { A: 'weighs', B: 'weights', C: 'weighty', D: 'weighed' }, correctAnswer: 'B' },
                        { id: '127', questionText: '------- the rules, overnight parking is not permitted at the clubhouse facility.', options: { A: 'Prior to', B: 'Except for', C: 'Instead of', D: 'According to' }, correctAnswer: 'D' },
                        { id: '128', questionText: 'Once everyone -------, we can begin the conference call.', options: { A: 'arrived', B: 'is arriving', C: 'to arrive', D: 'has arrived' }, correctAnswer: 'D' },
                        { id: '129', questionText: "Each summer a motivational video that highlights the past year's ------- is shown to all company employees.", options: { A: 'preferences', B: 'accomplishments', C: 'communications', D: 'uncertainties' }, correctAnswer: 'B' },
                        { id: '130', questionText: "Employees who wish to attend the retirement dinner ------- Ms. Howell's 30 years of service should contact Mr. Lee.", options: { A: 'honor', B: 'to honor', C: 'will honor', D: 'will be honored' }, correctAnswer: 'B' }
                    ]
                }
            ]
        },
        3: {
            id: 3,
            title: 'Part 5 - Test 3',
            part: 5,
            passages: [
                {
                    id: 'passage-5-3-1',
                    text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                    questions: [
                        { id: '101', questionText: '______ your order is being processed, please call customer service with any questions.', options: { A: 'Still', B: 'Either', C: 'While', D: 'Also' }, correctAnswer: 'C' },
                        { id: '102', questionText: 'ABC Truck Supplies has the ______ selection of mufflers in the state.', options: { A: 'natural', B: 'widest', C: 'overall', D: 'positive' }, correctAnswer: 'B' },
                        { id: '103', questionText: 'Sharswood Landscaping has received dozens of five-star ______ for its work.', options: { A: 'reviews', B: 'reviewer', C: 'reviewed', D: 'reviewing' }, correctAnswer: 'A' },
                        { id: '104', questionText: 'Dr. Cho will visit the Teledarr Lab during the annual open house, since ______ may not have another chance to see it.', options: { A: 'hers', B: 'she', C: 'her', D: 'herself' }, correctAnswer: 'B' },
                        { id: '105', questionText: 'Dorn Department Store decided to ______ its already large selection of housewares.', options: { A: 'create', B: 'enforce', C: 'apply', D: 'expand' }, correctAnswer: 'D' },
                        { id: '106', questionText: 'We ______ that you bring a portfolio of work samples to the interview.', options: { A: 'was asking', B: 'having asked', C: 'ask', D: 'asks' }, correctAnswer: 'C' },
                        { id: '107', questionText: 'Members of the Bold Stone Farm Store receive ______ discounts on all purchases.', options: { A: 'depth', B: 'deepen', C: 'deep', D: 'deeply' }, correctAnswer: 'C' },
                        { id: '108', questionText: 'If your plans change, please contact us at least 24 hours before the time of your _____.', options: { A: 'reserved', B: 'reservation', C: 'reservable', D: 'reserve' }, correctAnswer: 'B' },
                        { id: '109', questionText: 'Hold the tomato seedling gently by the stem in order to avoid harming ______ roots.', options: { A: 'its', B: 'at', C: 'that', D: 'in' }, correctAnswer: 'A' },
                        { id: '110', questionText: 'At the registration table, be sure to collect your name tag ______ entering the conference.', options: { A: 'very', B: 'often', C: 'always', D: 'before' }, correctAnswer: 'D' },
                        { id: '111', questionText: 'Maihama vehicles include an extended ______ to cover engine repairs.', options: { A: 'record', B: 'operation', C: 'budget', D: 'warranty' }, correctAnswer: 'D' },
                        { id: '112', questionText: "The hotel's new Web site features an ______ collection of high-quality images.", options: { A: 'absolute', B: 'efficient', C: 'impressive', D: 'undefeated' }, correctAnswer: 'C' },
                        { id: '113', questionText: 'On behalf of everyone at Uniontown Bank, we ______ thank you for your continued patronage.', options: { A: 'deservedly', B: 'commonly', C: 'sincerely', D: 'perfectly' }, correctAnswer: 'C' },
                        { id: '114', questionText: 'Fragile equipment must be stored in a secure location so that nothing is ______ damaged.', options: { A: 'accident', B: 'accidents', C: 'accidental', D: 'accidentally' }, correctAnswer: 'D' },
                        { id: '115', questionText: "Ms. Sampson will not arrive at the convention ______ after our team's presentation.", options: { A: 'until', B: 'lately', C: 'from', D: 'when' }, correctAnswer: 'A' },
                        { id: '116', questionText: 'The community picnic will be held ______ the park behind the Seltzer Public Library.', options: { A: 'in', B: 'all', C: 'for', D: 'here' }, correctAnswer: 'A' },
                        { id: '117', questionText: 'The new hires ______ for an orientation on May 10 at 9:00 A.M.', options: { A: 'to be gathering', B: 'will gather', C: 'gathering', D: 'to gather' }, correctAnswer: 'B' },
                        { id: '118', questionText: 'When Mr. Young approached the desk, the receptionist ______ offered him a seat in the waiting room.', options: { A: 'politely', B: 'polite', C: 'politeness', D: 'politest' }, correctAnswer: 'A' },
                        { id: '119', questionText: 'Members of the Marvale marketing team claimed that ______ was the best design for the new corporate logo.', options: { A: 'they', B: 'them', C: 'theirs', D: 'their' }, correctAnswer: 'C' },
                        { id: '120', questionText: 'The new Kitsuna video camera is currently on sale for $375, not ______ tax.', options: { A: 'excepting', B: 'alongside', C: 'within', D: 'including' }, correctAnswer: 'D' },
                        { id: '121', questionText: 'All associates are ______ to follow the standard operating procedures outlined in the handbook.', options: { A: 'concerned', B: 'tended', C: 'maintained', D: 'expected' }, correctAnswer: 'D' },
                        { id: '122', questionText: 'This month Framley Publishing House is embarking on its ______ expansion so far.', options: { A: 'ambitiously', B: 'most ambitiously', C: 'ambition', D: 'most ambitious' }, correctAnswer: 'D' },
                        { id: '123', questionText: "After months of collaboration, Matricks Technology's software developers ______ released a top-quality product.", options: { A: 'profoundly', B: 'overly', C: 'finally', D: 'intensely' }, correctAnswer: 'C' },
                        { id: '124', questionText: 'Tickets are valid for one-time access and do not allow for ______ into the venue.', options: { A: 'duplication', B: 'reentry', C: 'permission', D: 'turnover' }, correctAnswer: 'B' },
                        { id: '125', questionText: 'We hired Okafor Construction to do the renovation ______ it was not the lowest bidder on the project.', options: { A: 'if only', B: 'alternatively', C: 'whereas', D: 'even though' }, correctAnswer: 'D' },
                        { id: '126', questionText: 'The first ______ of the training will introduce staff to certain workplace responsibilities.', options: { A: 'part', B: 'parted', C: 'parting', D: 'partial' }, correctAnswer: 'A' },
                        { id: '127', questionText: 'According to industry ______, Ghira Company plans to relocate its headquarters to Australia.', options: { A: 'reported', B: 'reportedly', C: 'reporter', D: 'reports' }, correctAnswer: 'D' },
                        { id: '128', questionText: 'Next month, the Kneath House will host an exhibition of ______ furniture and clothing from the eighteenth century.', options: { A: 'authentic', B: 'authentically', C: 'authenticate', D: 'authenticity' }, correctAnswer: 'A' },
                        { id: '129', questionText: "PKTM's regional managers serve ______ the direction of the vice president.", options: { A: 'among', B: 'under', C: 'behind', D: 'opposite' }, correctAnswer: 'B' },
                        { id: '130', questionText: "______ a recent surge in demand, Vanita's Catering is hiring four additional servers.", options: { A: 'Everywhere', B: 'Possibly', C: 'In total', D: 'Owing to' }, correctAnswer: 'D' },
                    ]
                }
            ]
        },
        4: {
            id: 4,
            title: 'Part 5 - Test 4',
            part: 5,
            passages: [
                {
                    id: 'passage-5-4-1',
                    text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                    questions: [
                        { id: '101', questionText: 'Mr. Barrientos has worked at the company ------ six years.', options: { A: 'for', B: 'since', C: 'with', D: 'lately' }, correctAnswer: 'A' },
                        { id: '102', questionText: 'The staff cafeteria stops ------ lunch at 2:00 P.M.', options: { A: 'taking', B: 'buying', C: 'serving', D: 'working' }, correctAnswer: 'C' },
                        { id: '103', questionText: 'The annual report will be ready after ------ make the necessary revisions.', options: { A: 'I', B: 'me', C: 'myself', D: 'my' }, correctAnswer: 'A' },
                        { id: '104', questionText: 'Mr. Louden was offered a full-time position at Fortelio Corporation ------ a division manager.', options: { A: 'about', B: 'as', C: 'after', D: 'around' }, correctAnswer: 'B' },
                        { id: '105', questionText: 'Kennedy Sports will ------ its end-of-season sale through the month of January.', options: { A: 'continuing', B: 'continued', C: 'continues', D: 'continue' }, correctAnswer: 'D' },
                        { id: '106', questionText: 'Ms. Najjar is going to give a presentation ------ workplace regulations at noon.', options: { A: 'near', B: 'to', C: 'past', D: 'on' }, correctAnswer: 'D' },
                        { id: '107', questionText: 'Mr. Telguld submitted the ------ surveys before the monthly board meeting.', options: { A: 'completely', B: 'completed', C: 'completing', D: 'completes' }, correctAnswer: 'B' },
                        { id: '108', questionText: 'Travel funds are available to student presenters coming to the conference from a significant ------.', options: { A: 'location', B: 'amount', C: 'reason', D: 'distance' }, correctAnswer: 'D' },
                        { id: '109', questionText: 'Ms. Okada is ------ a new social media campaign at the request of our office manager.', options: { A: 'organize', B: 'organized', C: 'organizing', D: 'organization' }, correctAnswer: 'C' },
                        { id: '110', questionText: 'The speaker will offer five tips for making wise purchasing ------.', options: { A: 'items', B: 'decisions', C: 'values', D: 'remedies' }, correctAnswer: 'B' },
                        { id: '111', questionText: 'Please log on to your online checking account ------ the next 30 days in order to keep it active.', options: { A: 'within', B: 'how', C: 'whether', D: 'and' }, correctAnswer: 'A' },
                        { id: '112', questionText: 'The Bradyville Inn ------ live jazz music in the dining area on Friday evenings.', options: { A: 'features', B: 'marks', C: 'sounds', D: 'collects' }, correctAnswer: 'A' },
                        { id: '113', questionText: "Leeann's Organic Fruit Spreads can be purchased ------ from the company's Web site.", options: { A: 'direction', B: 'directly', C: 'directness', D: 'directed' }, correctAnswer: 'B' },
                        { id: '114', questionText: '------ the event organizers\' best efforts, they have been unable to attract enough volunteers this spring.', options: { A: 'Behind', B: 'Versus', C: 'Among', D: 'Despite' }, correctAnswer: 'D' },
                        { id: '115', questionText: 'Mr. Perez ------ as an industrial engineer at Gaberly Logistics for almost twenty years.', options: { A: 'employs', B: 'to be employed', C: 'is employing', D: 'has been employed' }, correctAnswer: 'D' },
                        { id: '116', questionText: "Soon after Ms. Manilla was hired, the sales department's productivity began to increase ------.", options: { A: 'mainly', B: 'respectively', C: 'noticeably', D: 'closely' }, correctAnswer: 'C' },
                        { id: '117', questionText: 'Small businesses ------ participate in the Get Ahead program will receive marketing tools to help them attract customers.', options: { A: 'that', B: 'they', C: 'what', D: 'whoever' }, correctAnswer: 'A' },
                        { id: '118', questionText: 'Our copy editors will review the manuscript ------ will not return it until the end of next week.', options: { A: 'or', B: 'once', C: 'either', D: 'but' }, correctAnswer: 'D' },
                        { id: '119', questionText: 'Mira Kumar was probably the ------ of all the interns at Kolbry Media last summer.', options: { A: 'ambitious', B: 'most ambitious', C: 'ambitiously', D: 'more ambitiously' }, correctAnswer: 'B' },
                        { id: '120', questionText: "Orbin's Fish Company expanded to a total of 26 stores ------ its takeover of a rival chain.", options: { A: 'whenever', B: 'toward', C: 'following', D: 'usually' }, correctAnswer: 'C' },
                        { id: '121', questionText: "Ms. Cartwright told her team members that she wanted ------ to streamline the company's assembly process.", options: { A: 'theirs', B: 'they', C: 'them', D: 'themselves' }, correctAnswer: 'C' },
                        { id: '122', questionText: "Rupert's Food Service uses ------ technology to track all of its shipments.", options: { A: 'strict', B: 'numerous', C: 'advanced', D: 'crowded' }, correctAnswer: 'C' },
                        { id: '123', questionText: 'Our app includes a ------ so that users can determine whether they are within their budget goals.', options: { A: 'calculator', B: 'calculated', C: 'calculating', D: 'calculations' }, correctAnswer: 'A' },
                        { id: '124', questionText: 'To ------ that its facilities are cleaned every day, the Selboa Company has hired more janitors.', options: { A: 'ensure', B: 'affect', C: 'provide', D: 'secure' }, correctAnswer: 'A' },
                        { id: '125', questionText: 'During his term as a legislator, Jeremy Moran ------ promoted public awareness of the need for infrastructure improvements.', options: { A: 'act', B: 'action', C: 'active', D: 'actively' }, correctAnswer: 'D' },
                        { id: '126', questionText: "Pyxie Print's business is so new that we need to explain the full range of our services to ------ clients.", options: { A: 'trained', B: 'potential', C: 'elected', D: 'paid' }, correctAnswer: 'B' },
                        { id: '127', questionText: 'Phone orders that are ------ to local stores by 11:00 A.M. are eligible for same-day pickup.', options: { A: 'submitted', B: 'submission', C: 'submitting', D: 'submits' }, correctAnswer: 'A' },
                        { id: '128', questionText: 'An Oswald Hardware associate will ------ place an order for customers who need larger quantities than what is in stock.', options: { A: 'slightly', B: 'wholly', C: 'busily', D: 'gladly' }, correctAnswer: 'D' },
                        { id: '129', questionText: 'Mia Daushvili performed with the Bayhead Orchestra on Monday evening, ------ her virtuosic skills on the piccolo.', options: { A: 'displays', B: 'had displayed', C: 'displaying', D: 'was displayed' }, correctAnswer: 'C' },
                        { id: '130', questionText: 'When reviewing applicants for the clerk position, Ms. Ng will consider both education and ------ experience.', options: { A: 'prior', B: 'quick', C: 'lean', D: 'calm' }, correctAnswer: 'A' },
                    ]
                }
            ]
        },
        5: { 
            id: 5, 
            title: 'Part 5 - Test 5', 
            part: 5, 
            passages: [
                {
                    id: 'passage-5-5-1',
                    text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                    questions: [
                        { id: '101', questionText: 'After upgrading to Pro Data Whiz, our clients began ______ problems with spreadsheets.', options: { A: 'has', B: 'had', C: 'have', D: 'having' }, correctAnswer: 'D' },
                        { id: '102', questionText: 'Requests for additional days off are ______ by Ms. Chung in Human Resources.', options: { A: 'approved', B: 'dropped', C: 'reached', D: 'reminded' }, correctAnswer: 'A' },
                        { id: '103', questionText: 'The programmers have a list of changes ______ the next software update.', options: { A: 'between', B: 'of', C: 'for', D: 'above' }, correctAnswer: 'C' },
                        { id: '104', questionText: 'Let Farida Banquet Service ______ professional catering for your important corporate events.', options: { A: 'providing', B: 'provide', C: 'provides', D: 'to provide' }, correctAnswer: 'B' },
                        { id: '105', questionText: 'Using various innovative techniques, Boyd Industries has improved the ______ of its tiles.', options: { A: 'closure', B: 'product', C: 'quality', D: 'method' }, correctAnswer: 'C' },
                        { id: '106', questionText: '______ of all cosmetics are final, and refunds will not be given under any circumstances.', options: { A: 'Sale', B: 'Sales', C: 'Sells', D: 'Selling' }, correctAnswer: 'B' },
                        { id: '107', questionText: 'If you have already submitted your response, no ______ action is required.', options: { A: 'bright', B: 'further', C: 'previous', D: 'average' }, correctAnswer: 'B' },
                        { id: '108', questionText: 'Ms. Sieglak stated that the app design was based on ______ own research.', options: { A: 'she', B: 'hers', C: 'her', D: 'herself' }, correctAnswer: 'C' },
                        { id: '109', questionText: '______ the organization has doubled its outreach efforts, it has yet to see an increase in new clients.', options: { A: 'Until', B: 'Because', C: 'Although', D: 'Therefore' }, correctAnswer: 'C' },
                        { id: '110', questionText: "Starting on October 8, ______ board of education meetings will be streamed live on the school district's Web site.", options: { A: 'all', B: 'so', C: 'that', D: 'to' }, correctAnswer: 'A' },
                        { id: '111', questionText: 'The hairstylists at Urbanite Salon have ______ experience working with a variety of hair products.', options: { A: 'considers', B: 'considerable', C: 'considerate', D: 'considering' }, correctAnswer: 'B' },
                        { id: '112', questionText: 'Both candidates are ______ suitable for the assistant manager position.', options: { A: 'permanently', B: 'promptly', C: 'equally', D: 'gradually' }, correctAnswer: 'C' },
                        { id: '113', questionText: 'With the acquisition of Bloom Circuit, Wellstrom Hardware has ______ expanded its offerings and services.', options: { A: 'greater', B: 'greatness', C: 'great', D: 'greatly' }, correctAnswer: 'D' },
                        { id: '114', questionText: 'Please note that file names should not ______ capital letters or spaces.', options: { A: 'differ', B: 'contain', C: 'match', D: 'pick' }, correctAnswer: 'B' },
                        { id: '115', questionText: 'The Sun-Tech ceiling fan has received more than 15,000 five-star reviews from ______ customers.', options: { A: 'satisfied', B: 'checked', C: 'adjusted', D: 'allowed' }, correctAnswer: 'A' },
                        { id: '116', questionText: 'Please ______ the Returns section of our Web site if you are unhappy with any part of your order.', options: { A: 'visit', B: 'visits', C: 'visited', D: 'visiting' }, correctAnswer: 'A' },
                        { id: '117', questionText: 'Ito Auto Group is offering excellent ______ on pre-owned vehicles this month.', options: { A: 'trips', B: 'reasons', C: 'customs', D: 'deals' }, correctAnswer: 'D' },
                        { id: '118', questionText: 'Product prices are influenced ______ such factors as consumer demand and retail competition.', options: { A: 'by', B: 'under', C: 'those', D: 'nearly' }, correctAnswer: 'A' },
                        { id: '119', questionText: 'Monmouth Enterprises will be ______ prefabricated houses online starting on April 1.', options: { A: 'predicting', B: 'passing', C: 'retaining', D: 'marketing' }, correctAnswer: 'D' },
                        { id: '120', questionText: "All employees should familiarize ______ with the company's policies and procedures.", options: { A: 'their', B: 'them', C: 'theirs', D: 'themselves' }, correctAnswer: 'D' },
                        { id: '121', questionText: 'Custom furniture orders require a 50 percent deposit ______ the time of the order.', options: { A: 'as', B: 'off', C: 'into', D: 'at' }, correctAnswer: 'D' },
                        { id: '122', questionText: "We are planning a ______ for the Klemner Corporation's twentieth anniversary.", options: { A: 'celebration', B: 'celebrated', C: 'celebrity', D: 'celebrate' }, correctAnswer: 'A' },
                        { id: '123', questionText: 'Though she lacks political experience, Ms. Diaz has been ______ impressive in her first term as mayor.', options: { A: 'quite', B: 'soon', C: 'ever', D: 'next' }, correctAnswer: 'A' },
                        { id: '124', questionText: "The university library usually acquires ______ copies of best-selling books to meet students' demand.", options: { A: 'multiply', B: 'multiple', C: 'multiples', D: 'multiplicity' }, correctAnswer: 'B' },
                        { id: '125', questionText: "This year's conference tote bags were ______ donated by Etani Designs.", options: { A: 'generous', B: 'generosity', C: 'generously', D: 'generosities' }, correctAnswer: 'C' },
                        { id: '126', questionText: 'We will be holding a ______ on Friday to honor the 30-year engineering career of Mr. Kuan.', options: { A: 'record', B: 'share', C: 'reception', D: 'place' }, correctAnswer: 'C' },
                        { id: '127', questionText: 'Groove Background creates soothing playlists of instrumental music, ______ classical and jazz.', options: { A: 'instead', B: 'including', C: 'in addition', D: 'indeed' }, correctAnswer: 'B' },
                        { id: '128', questionText: "Members of the finance department ______ to Mr. Chua's lecture on risk avoidance.", options: { A: 'to be invited', B: 'inviting', C: 'invite', D: 'are invited' }, correctAnswer: 'D' },
                        { id: '129', questionText: 'The board of trustees debated for hours ______ the revised hiring policies.', options: { A: 'during', B: 'above', C: 'over', D: 'across' }, correctAnswer: 'C' },
                        { id: '130', questionText: 'The participants closely ______ the fitness instructor\'s movements tend to learn the proper technique more quickly.', options: { A: 'imitate', B: 'imitations', C: 'imitative', D: 'imitating' }, correctAnswer: 'A' },
                    ]
                }
            ]
        },
    },
    6: {
        1: {
            id: 1,
            title: 'Part 6 - Test 1',
            part: 6,
            passages: [
                {
                    id: 'passage-131-134',
                    text: `Come to the Maxley Heights Center for Horticulture and learn how to create a beautiful, eco-friendly garden for your home or business. ____ (131) ____. We will teach you how to plant a rain garden, which is simply a shallow sunken garden ____ (132) ____ a special soil mix to filter pollutants from rainwater flowing from nearby roads and rooftops. These gardens can be landscaped with native plants and flowers. ____ (133) ____, rain gardens are always beneficial to the local environment. Among other things, ____ (134) ____ improve drainage and protect rivers and streams.\n\nTo register, visit www.maxley-horticulture.org.`,
                    questions: [
                        { id: '131', questionText: 'Choose the best option for blank (131).', options: { A: 'Children of all ages will enjoy the new exhibits.', B: 'Learn about rainfall patterns across the region.', C: 'Build a set of simple patio furniture with easy-to-acquire materials.', D: 'Next Saturday at 4 P.M., we are hosting a free workshop for the public.' }, correctAnswer: 'D' },
                        { id: '132', questionText: 'Choose the best option for blank (132).', options: { A: 'to use', B: 'used to', C: 'by using', D: 'that uses' }, correctAnswer: 'C' },
                        { id: '133', questionText: 'Choose the best option for blank (133).', options: { A: 'Best of all', B: 'For example', C: 'In any event', D: 'As a matter of fact' }, correctAnswer: 'A' },
                        { id: '134', questionText: 'Choose the best option for blank (134).', options: { A: 'we', B: 'they', C: 'both', D: 'yours' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-135-138',
                    text: `31 July\n\nAkwasi Dombo\nFourth Avenue\nGA 105\nAccra, Ghana\n\nDear Mr. Dombo,\n\nThank you for your ____ (135) ____ support in helping me to plan the opening gala for Tokyo's fashion week. The event was a huge success, and I was honored to work with you. I know that our attendees follow your work closely, and they loved the designs you contributed for this event. Your designs received a lot of ____ (136) ____ on social media. Shows like this will keep Tokyo on the map as a premier fashion centre. ____ (137) ____. I realize that the multiple delays made the planning no easy task. The auction ____ (138) ____ our Young Designers Award program is coming up soon and I look forward to working with you on that as well.\n\nSincerely,\nAsahi Ishioka\nDirector, Japanese Guild of Fashion Designers`,
                    questions: [
                        { id: '135', questionText: 'Choose the best option for blank (135).', options: { A: 'amazed', B: 'amazement', C: 'amazing', D: 'amazingly' }, correctAnswer: 'C' },
                        { id: '136', questionText: 'Choose the best option for blank (136).', options: { A: 'attention', B: 'proposals', C: 'innovation', D: 'criticism' }, correctAnswer: 'A' },
                        { id: '137', questionText: 'Choose the best sentence to insert at (137).', options: { A: 'Several other events have gone surprisingly well.', B: 'Thank you also for your flexibility in planning the event.', C: 'Please stop by our office the next time you are in the city.', D: 'Tokyo is a top tourism destination for many reasons.' }, correctAnswer: 'B' },
                        { id: '138', questionText: 'Choose the best option for blank (138).', options: { A: 'will benefit', B: 'to benefit', C: 'has benefited', D: 'benefits' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-139-142',
                    text: `From: Patron Services <patronservices@menachinlibrary.org>
To: Edgar Hughes <hughese98@villachesta.com>
Subject: Card expiration date approaching
Date: December 3

Dear Mr. Hughes,

Please be advised that your Mena Chin Library card will expire one month from today. ____ (139) ____ must be renewed if you intend to keep your membership for the coming year. ____ (140) ____. This can be done at the information desk at any branch location.

____ (141) ____ you decide to close your account, no action is necessary. Failure to complete your renewal by the ____ (142) ____ date will result in the expiration of your library privileges.

If you have any questions about this notice, or about general library services, you may reply directly to this e-mail.

Sincerely,
Patron Services`,
                    questions: [
                        { id: '139', questionText: 'Choose the best option for blank (139).', options: { A: 'It', B: 'You', C: 'Our', D: 'Each' }, correctAnswer: 'A' },
                        { id: '140', questionText: 'Choose the best sentence to insert at (140).', options: { A: 'To sign up for a card, visit your local library branch.', B: 'For questions about library membership, please visit our Web site.', C: 'Renewal must be completed at least one week before your card expires.', D: 'You may opt out of this program at any time.' }, correctAnswer: 'C' },
                        { id: '141', questionText: 'Choose the best option for blank (141).', options: { A: 'Also', B: 'Should', C: 'Because', D: 'Although' }, correctAnswer: 'B' },
                        { id: '142', questionText: 'Choose the best option for blank (142).', options: { A: 'specifically', B: 'specifics', C: 'specified', D: 'specificity' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-143-146',
                    text: `April 7\n\nNaomi Burwell\n43 Waymire Road\nSouth Portland, ME 04109\n\nDear Ms. Burwell,\n\nI am Omar Ridha, the manager of Droplight Studio. ____ (143) ____. We offer a full range of photography services for real estate professionals like you. We take pride in composing interior and exterior shots that make a property look its best. Droplight Studio spares no effort in ____ (144) ____ superior digital images. ____ (145) ____, our professional-grade equipment, lighting, and staging techniques allow us to highlight the best features of a property. And once the photo shoot is over, every image ____ (146) ____ expert editing. All these services come standard in every package.\n\nPlease visit our Web site to view our work as well as our pricing and scheduling information. We are happy to work with you to customize orders.\n\nSincerely,\nOmar Ridha, Droplight Studio`,
                    questions: [
                        { id: '143', questionText: 'Choose the best sentence to insert at (143).', options: { A: 'I would like to introduce you to our business.', B: 'Great photographs can make your property stand out.', C: 'We are looking forward to your visit.', D: 'It was the first studio of its kind to open in this area.' }, correctAnswer: 'A' },
                        { id: '144', questionText: 'Choose the best option for blank (144).', options: { A: 'researching', B: 'creating', C: 'purchasing', D: 'displaying' }, correctAnswer: 'B' },
                        { id: '145', questionText: 'Choose the best option for blank (145).', options: { A: 'If not', B: 'By comparison', C: 'Otherwise', D: 'Indeed' }, correctAnswer: 'D' },
                        { id: '146', questionText: 'Choose the best option for blank (146).', options: { A: 'receives', B: 'is receiving', C: 'had received', D: 'had to receive' }, correctAnswer: 'A' },
                    ]
                }
            ]
        },
        2: {
            id: 2,
            title: 'Part 6 - Test 2',
            part: 6,
            passages: [
                {
                    id: 'passage-6-2-131-134',
                    text: `To: Myung-Hee Hahn
From: Dellwyn Home Store
Date: January 15
Subject: Order update

Dear Ms. Hahn,

Your ____ (131) ____ order of a red oak dining table and six matching chairs arrived at our store this morning. We would now like to arrange for the delivery of the ____ (132) ____. Please call us at 517-555-0188 and ask ____ (133) ____ to Coleman Cobb, our delivery manager. ____ (134) ____.

Customer Service, Dellwyn Home Store`,
                    questions: [
                        { id: '131', questionText: 'Choose the best option for blank (131).', options: { A: 'specially', B: 'specialize', C: 'special', D: 'specializing' }, correctAnswer: 'C' },
                        { id: '132', questionText: 'Choose the best option for blank (132).', options: { A: 'furniture', B: 'appliances', C: 'refund', D: 'tools' }, correctAnswer: 'A' },
                        { id: '133', questionText: 'Choose the best option for blank (133).', options: { A: 'speak', B: 'spoken', C: 'is speaking', D: 'to speak' }, correctAnswer: 'D' },
                        { id: '134', questionText: 'Choose the best sentence for blank (134).', options: { A: 'He can schedule a convenient time.', B: 'He began working here yesterday.', C: 'He can meet you at 11:00 A.M.', D: 'He recently moved to Dellwyn.' }, correctAnswer: 'A' }
                    ]
                },
                {
                    id: 'passage-6-2-135-138',
                    text: `Keep Cool Service Contractors:
67 Main Road, Edinburgh Village
Chaguanas, Trinidad and Tobago

Keep Cool Service Contractors can bring you peace of mind. As part of an annual contract, we will service your air-conditioning system, ensuring your ____ (135) ____ and comfort. This includes inspecting the system, making repairs as needed, and professionally cleaning your air ducts. ____ (136) ____, if necessary, we can replace your old air-conditioning system with a new, cost-efficient one.

Our workers are highly qualified licensed technicians who stay up-to-date with ongoing training. ____ (137) ____. We promise you fair prices and professional work, ____ (138) ____ by our Keep Cool guarantee. Call 1-868-555-0129 for a free quote today.`,
                    questions: [
                        { id: '135', questionText: 'Choose the best option for blank (135).', options: { A: 'safe', B: 'safely', C: 'safest', D: 'safety' }, correctAnswer: 'D' },
                        { id: '136', questionText: 'Choose the best option for blank (136).', options: { A: 'On one hand', B: 'Nonetheless', C: 'Furthermore', D: 'And yet' }, correctAnswer: 'C' },
                        { id: '137', questionText: 'Choose the best sentence for blank (137).', options: { A: 'Take advantage of dozens of useful online tools.', B: 'Moreover, the air conditioner you chose is very popular.', C: 'Plus, they are friendly, clean, and knowledgeable.', D: 'Thank you for visiting our contractor showroom.' }, correctAnswer: 'C' },
                        { id: '138', questionText: 'Choose the best option for blank (138).', options: { A: 'backed', B: 'backs', C: 'backing', D: 'back' }, correctAnswer: 'A' }
                    ]
                },
                {
                    id: 'passage-6-2-139-142',
                    text: `To: All Customers
From: asquires@lightidea.com
Date: March 6
Subject: Information

Dear Light Idea Customers,

Light Idea is enacting a price increase on select energy-efficient products, effective April 17. Specific product pricing will ____ (139) ____. Please contact your sales representative for details and questions.

The last date for ordering at current prices is April 16. All orders ____ (140) ____ after this date will follow the new price list. ____ (141) ____. Customers will be able to find this on our Web site.

We will continue to provide quality products and ____ (142) ____ service to our valued customers. Thank you for your business.

Sincerely,
Arvin Squires
Head of Sales, Light Idea`,
                    questions: [
                        { id: '139', questionText: 'Choose the best option for blank (139).', options: { A: 'agree', B: 'vary', C: 'wait', D: 'decline' }, correctAnswer: 'B' },
                        { id: '140', questionText: 'Choose the best option for blank (140).', options: { A: 'receiving', B: 'having received', C: 'received', D: 'will be received' }, correctAnswer: 'C' },
                        { id: '141', questionText: 'Choose the best sentence for blank (141).', options: { A: 'The updated price list will be available on March 20.', B: 'We apologize for this inconvenience.', C: 'Your orders will be shipped after April 17.', D: 'We are increasing prices because of rising costs.' }, correctAnswer: 'A' },
                        { id: '142', questionText: 'Choose the best option for blank (142).', options: { A: 'exceptionally', B: 'exception', C: 'exceptional', D: 'exceptionalism' }, correctAnswer: 'C' }
                    ]
                },
                {
                    id: 'passage-6-2-143-146',
                    text: `To: Jang-Ho Kwon <jkwon@newart.nz>
From: Kenneth Okim <k.okim@okimjewelry.nz>
Subject: Good news
Date: 30 August

Dear Jang-Ho,

Thank you for the shipment last month of 80 units of your jewelry pieces. I am happy to report that they have been selling very well in my shop. My ____ (143) ____ love the colourful designs as well as the quality of your workmanship. ____ (144) ____.

I would like to increase the number of units I order from you. Would you be able to ____ (145) ____ my order for the September shipment?

Finally, I would like to discuss the possibility of featuring your work exclusively in my store. I believe that I could reach your target audience best and that the agreement would serve ____ (146) ____ both very well. I look forward to hearing from you.

Best regards,
Kenneth Okim
Okim Jewelry`,
                    questions: [
                        { id: '143', questionText: 'Choose the best option for blank (143).', options: { A: 'patients', B: 'students', C: 'customers', D: 'teammates' }, correctAnswer: 'C' },
                        { id: '144', questionText: 'Choose the best sentence for blank (144).', options: { A: 'If you need more time, please let me know.', B: 'Unfortunately, I do not have adequate shelf space at this time.', C: 'I would like to show you some of my own designs.', D: 'The reasonable prices also make your pieces a great value.' }, correctAnswer: 'D' },
                        { id: '145', questionText: 'Choose the best option for blank (145).', options: { A: 'include', B: 'double', C: 'repeat', D: 'insure' }, correctAnswer: 'B' },
                        { id: '146', questionText: 'Choose the best option for blank (146).', options: { A: 'us', B: 'you', C: 'we', D: 'these' }, correctAnswer: 'A' }
                    ]
                }
            ]
        },
        3: {
            id: 3,
            title: 'Part 6 - Test 3',
            part: 6,
            passages: [
                {
                    id: 'passage-131-134',
                    text: `To: All Staff
From: Yoreli Costa
Date: February 15
Subject: Florence Shawn

Hi Everyone,

I have news to share about a ____ (131) ____ in the human resources department. After nearly twenty years with Cometti Creative, Florence Shawn has decided to retire from the position of director of human resources.

Our current senior manager of human resources, Makoto Ichise, will replace Ms. Shawn when she retires. Ms. Shawn ____ (132) ____ Mr. Ichise since he joined the company five years ago.

Ms. Shawn's ____ (133) ____ day will be February 22. A retirement party will be held for her on that day at 4:00 P.M. in the Terey Lobby. ____ (134) ____

Best,
Yoreli Costa
Director of Operations, Cometti Creative`,
                    questions: [
                        { id: '131', questionText: 'Choose the best option for blank (131).', options: { A: 'difference', B: 'strategy', C: 'change', D: 'practice' }, correctAnswer: 'C' },
                        { id: '132', questionText: 'Choose the best option for blank (132).', options: { A: 'mentors', B: 'is mentoring', C: 'will mentor', D: 'has been mentoring' }, correctAnswer: 'D' },
                        { id: '133', questionText: 'Choose the best option for blank (133).', options: { A: 'last', B: 'original', C: 'flexible', D: 'alternate' }, correctAnswer: 'A' },
                        { id: '134', questionText: 'Choose the best sentence to insert at (134).', options: { A: 'Cometti Creative will hire a replacement soon.', B: 'We hope that you can all attend to wish her well.', C: 'Ms. Shawn was the first director of human resources at Cometti Creative.', D: 'The first project will be the creation of a talent development program.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-135-138',
                    text: `Lovitt Real Estate
Helping Manitoba Families Find their Dream Homes

Manuel Lovitt, ____ (135) ____ of Lovitt Real Estate, has been selling real estate for over 17 years. Mr. Lovitt and his award-winning team ____ (136) ____ in homes for families in the Winnipeg, Brandon, and Dauphin areas. They know about the schools, parks, services, transportation, and activities that enhance family life in the area where you want to reside. ____ (137) ____.

Contact Lovitt Real Estate today and let the team guide you ____ (138) ____ the home of your dreams. They will listen to your needs, negotiate on your behalf, and get you the best home for your hard-earned money.

Call 431-555-0168 to speak to an agent or visit www.lovittrealestate.ca for more information.`,
                    questions: [
                        { id: '135', questionText: 'Choose the best option for blank (135).', options: { A: 'own', B: 'owned', C: 'owner', D: 'owning' }, correctAnswer: 'C' },
                        { id: '136', questionText: 'Choose the best option for blank (136).', options: { A: 'practice', B: 'specialize', C: 'report', D: 'purchase' }, correctAnswer: 'B' },
                        { id: '137', questionText: 'Choose the best sentence to insert at (137).', options: { A: 'They can arrange transportation for your local elementary school.', B: 'That is because they live in the communities they serve.', C: 'They will be closed for the summer but will be back soon.', D: 'Therefore, they can help you with all your banking needs.' }, correctAnswer: 'B' },
                        { id: '138', questionText: 'Choose the best option for blank (138).', options: { A: 'toward', B: 'fixing', C: 'because', D: 'along' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-139-142',
                    text: `Welcome to "Distributing Your Savings.” This slide ____ (139) ____ is the third of a twelve-segment educational series called “Preparing for Retirement." ____ (140) ____.

This series provides only ____ (141) ____ advice. It should not replace the guidance of your investment planner. The series has been developed as background material to help you ask key questions when ____ (142) ____ with your investment planner. We hope you find this information helpful.

Swainson-Gray Investments`,
                    questions: [
                        { id: '139', questionText: 'Choose the best option for blank (139).', options: { A: 'presenting', B: 'presents', C: 'presentation', D: 'presented' }, correctAnswer: 'C' },
                        { id: '140', questionText: 'Choose the best sentence to insert at (140).', options: { A: 'You are encouraged to visit our office for a free portfolio review.', B: 'The series is designed to help you make informed financial decisions.', C: 'Please fill out the paperwork before your appointment.', D: 'Your responses will help us serve you better in the future.' }, correctAnswer: 'B' },
                        { id: '141', questionText: 'Choose the best option for blank (141).', options: { A: 'regional', B: 'expensive', C: 'supplemental', D: 'playful' }, correctAnswer: 'C' },
                        { id: '142', questionText: 'Choose the best option for blank (142).', options: { A: 'consulting', B: 'prescribing', C: 'listing', D: 'following' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-143-146',
                    text: `To: Dana Paulwell
From: Silas Laveau
Date: August 22
Subject: My input
Attachment: Article

Dear Dr. Paulwell,

This message is in response to yesterday's staff meeting, particularly the discussion on how certain aspects of the clinic may affect our work and mission. ____ (143) ____.

Currently, the vending machines in the hall outside our waiting room are stocked with sugary and salty products such as soft drinks and chips. As a health care provider, we ____ (144) ____ beverages and snacks that show our commitment to wellness. ____ (145) ____, our mission is focused on good health.

I have attached an article about actions that medical centers like ours are taking to improve their hospitality stations. I hope you find it ____ (146) ____. It details some easy and cost-effective changes we could consider.

Kind regards,
Silas Laveau`,
                    questions: [
                        { id: '143', questionText: 'Choose the best sentence to insert at (143).', options: { A: 'I thought it went on longer than was necessary.', B: 'I wish we had been informed about it sooner.', C: 'I would like to make a suggestion on this topic.', D: 'I would be honored to lead a follow-up session.' }, correctAnswer: 'C' },
                        { id: '144', questionText: 'Choose the best option for blank (144).', options: { A: 'will offer', B: 'have offered', C: 'were offering', D: 'should be offering' }, correctAnswer: 'D' },
                        { id: '145', questionText: 'Choose the best option for blank (145).', options: { A: 'After all', B: 'By the way', C: 'In the meantime', D: 'On the other hand' }, correctAnswer: 'A' },
                        { id: '146', questionText: 'Choose the best option for blank (146).', options: { A: 'useful', B: 'eventful', C: 'profitable', D: 'comfortable' }, correctAnswer: 'A' },
                    ]
                }
            ]
        },
        4: {
            id: 4,
            title: 'Part 6 - Test 4',
            part: 6,
            passages: [
                {
                    id: 'passage-131-134',
                    text: `D-Zine Pop
D-Zine Pop is your source for information about the latest ____ (131) ____ in the world of fashion. What started as a social media experiment ____ (132) ____ into a content platform with subscribers in seventeen countries worldwide. We are constantly adding features to improve our user experience and share what apparel and clothing accessories are popular right now. We also make periodic updates to our terms of service. Subscribers' ____ (133) ____ access to content is contingent upon consenting to these terms; therefore, we encourage you to review and accept them at dzinepop.com/privacy. Contact our customer service team at support@dzinepop.com if you have any questions. ____ (134) ____.`,
                    questions: [
                        { id: '131', questionText: 'Choose the best option for blank (131).', options: { A: 'controversies', B: 'consumers', C: 'trends', D: 'versions' }, correctAnswer: 'C' },
                        { id: '132', questionText: 'Choose the best option for blank (132).', options: { A: 'evolving', B: 'evolution', C: 'will be evolving', D: 'has evolved' }, correctAnswer: 'D' },
                        { id: '133', questionText: 'Choose the best option for blank (133).', options: { A: 'continue', B: 'continued', C: 'continuation', D: 'continues' }, correctAnswer: 'B' },
                        { id: '134', questionText: 'Choose the best sentence to insert at (134).', options: { A: 'Representatives are available 24 hours a day to assist you.', B: 'The changes made to our user privacy policy are no longer effective.', C: 'Fresh content is accessible through phone and desktop apps.', D: 'We are no longer offering a discounted rate if you renew your subscription.' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-135-138',
                    text: `Rescue your device with Phone Tune-Up
Is your smartphone screen scratched or cracked? ____ (135) ____? Do your apps freeze or crash? The experts at Phone Tune-Up can help! We use nothing but the best quality parts to ____ (136) ____ your mobile phone. Let our certified technicians save you the time and expense involved in replacing your phone with a new one. When we are ____ (137) ____, you will think your old phone is brand new. To make an appointment, call 604-555-0198 or visit www.phonetuneup.com. Same-day service is often available ____ (138) ____ needed parts are in stock.`,
                    questions: [
                        { id: '135', questionText: 'Choose the best sentence to insert at (135).', options: { A: 'Does your printer need frequent ink refills?', B: 'Does it take all day for your battery to recharge?', C: 'Do you want to complete a short survey?', D: 'Do you pay too much for your data plan?' }, correctAnswer: 'B' },
                        { id: '136', questionText: 'Choose the best option for blank (136).', options: { A: 'remove', B: 'borrow', C: 'examine', D: 'repair' }, correctAnswer: 'D' },
                        { id: '137', questionText: 'Choose the best option for blank (137).', options: { A: 'trained', B: 'available', C: 'done', D: 'dismissed' }, correctAnswer: 'C' },
                        { id: '138', questionText: 'Choose the best option for blank (138).', options: { A: 'whose', B: 'must', C: 'if', D: 'of' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-139-142',
                    text: `FOR IMMEDIATE RELEASE
SACRAMENTO (July 28)—The Sacramento-based supermarket chain Hsing Market announced today that it is opening a branch ____ (139) ____ in San Jose in October. It will occupy the building that once housed the Watson Office Superstore located at 1539 West Oak Street, which closed last year.
Hsing Market CEO Alice Tran said, "We are very excited to ____ (140) ____ open a store in San Jose. ____ (141) ____. When the Watson building became available, we jumped on the opportunity to move in."
As a neighborhood grocery store, Hsing Market prides itself on hiring applicants from the local community. Approximately 75 percent of all employees live within two miles of the store where they ____ (142) ____.`,
                    questions: [
                        { id: '139', questionText: 'Choose the best option for blank (139).', options: { A: 'location', B: 'locate', C: 'to locate', D: 'locating' }, correctAnswer: 'A' },
                        { id: '140', questionText: 'Choose the best option for blank (140).', options: { A: 'finally', B: 'instead', C: 'likewise', D: 'suddenly' }, correctAnswer: 'A' },
                        { id: '141', questionText: 'Choose the best sentence to insert at (141).', options: { A: 'The store features a variety of fresh and prepared foods.', B: 'We hope that you will be able to join us at our grand-opening celebration.', C: 'We have had our eyes on the city for quite some time.', D: 'Our corporate headquarters will be renovated soon.' }, correctAnswer: 'C' },
                        { id: '142', questionText: 'Choose the best option for blank (142).', options: { A: 'save', B: 'work', C: 'shop', D: 'register' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-143-146',
                    text: `About Leafi Cloth
Tropick Textiles recently expanded the ____ (143) ____ of fabrics available on the market. In its quest to introduce environmentally friendly alternatives to cotton and other traditional fibers, the company ____ (144) ____ a new fiber made from materials that are typically discarded. Tropick Textiles takes banana and pineapple leaves and combines them with bamboo fibers to create Leafi Cloth. The plants' leaves are ordinarily disposed of ____ (145) ____ the fruit is harvested. Tropick Textiles' process prevents many leaves from entering a landfill, converting them instead into usable material. ____ (146) ____.`,
                    questions: [
                        { id: '143', questionText: 'Choose the best option for blank (143).', options: { A: 'range', B: 'expense', C: 'strength', D: 'appearance' }, correctAnswer: 'A' },
                        { id: '144', questionText: 'Choose the best option for blank (144).', options: { A: 'are developed', B: 'has developed', C: 'will develop', D: 'to develop' }, correctAnswer: 'B' },
                        { id: '145', questionText: 'Choose the best option for blank (145).', options: { A: 'now', B: 'thus', C: 'even', D: 'once' }, correctAnswer: 'D' },
                        { id: '146', questionText: 'Choose the best sentence to insert at (146).', options: { A: 'The resulting durable fabric is a suitable substitute for cotton cloth.', B: 'Inquiries regarding Leafi Cloth were directed to the sales department.', C: 'Tropick Textiles will celebrate its one-hundredth anniversary this year.', D: 'Manufacturing costs have been increasing for Tropick Textiles lately.' }, correctAnswer: 'A' },
                    ]
                }
            ]
        },
        5: { 
            id: 5, 
            title: 'Part 6 - Test 5', 
            part: 6, 
            passages: [
                {
                    id: 'passage-6-5-131-134',
                    text: `Grocery Chain to Host Event
LEIGHTON (October 8)—Ohale Foods, one of the region's largest supermarket chains, is seeking to fill almost 100 open positions. For that reason, the company is holding a ____ (131) ____ event on October 20. Job opportunities exist at all fourteen of Ohale's current stores. ____ (132) ____, Ohale is seeking employees for its new Westside location, which is still under construction. ____ (133) ____.
Those who ____ (134) ____ the event should bring copies of their résumé to the Grand Ballroom of the Palace Suites Hotel between 10 A.M. and 7 P.M. No appointment is required.`,
                    questions: [
                        { id: '131', questionText: 'Choose the best option for blank (131).', options: { A: 'manufacturing', B: 'hiring', C: 'political', D: 'sporting' }, correctAnswer: 'B' },
                        { id: '132', questionText: 'Choose the best option for blank (132).', options: { A: 'If not', B: 'After all', C: 'Additionally', D: 'For example' }, correctAnswer: 'C' },
                        { id: '133', questionText: 'Choose the best sentence to insert at (133).', options: { A: 'Its grand opening is scheduled for mid-November.', B: 'Most applicants had prior experience.', C: 'Its appointment of Linda Okumu as its CEO has surprised analysts.', D: 'Local competitors cannot match its prices.' }, correctAnswer: 'A' },
                        { id: '134', questionText: 'Choose the best option for blank (134).', options: { A: 'attending', B: 'to attend', C: 'attended', D: 'are attending' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-6-5-135-138',
                    text: `Thank you for your purchase of an Ajaz Water Filter Pitcher. It is a wonderful solution for water that tastes great! To improve the effectiveness of the Ajaz Water Filter Pitcher, we ____ (135) ____ priming the filter before the first use. ____ (136) ____. Then screw the filter clockwise into the lid of the pitcher until it fits ____ (137) ____. As you use the pitcher, remember that ____ (138) ____ water flow is a signal that the filter is becoming clogged and will need to be replaced soon.`,
                    questions: [
                        { id: '135', questionText: 'Choose the best option for blank (135).', options: { A: 'tried', B: 'recommend', C: 'consider', D: 'started' }, correctAnswer: 'B' },
                        { id: '136', questionText: 'Choose the best sentence to insert at (136).', options: { A: 'Our filtration system will be redesigned within the next year.', B: 'Water use may be reduced by running your dishwasher less frequently.', C: 'To do this, run cool tap water through the filter for three minutes.', D: 'There are 150 liters of water in the main storage tank at all times.' }, correctAnswer: 'C' },
                        { id: '137', questionText: 'Choose the best option for blank (137).', options: { A: 'extremely', B: 'highly', C: 'tightly', D: 'steadily' }, correctAnswer: 'C' },
                        { id: '138', questionText: 'Choose the best option for blank (138).', options: { A: 'diminished', B: 'diminishes', C: 'diminish', D: 'diminishable' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-6-5-139-142',
                    text: `Returning merchandise
Abney Home Products is committed to providing outstanding service, and we guarantee the ____ (139) ____ of all the products in our catalog. If you are not satisfied with a purchase, call our customer service line at 339-555-0177 to request a return authorization code. The service agent ____ (140) ____ you for the invoice number from the package insert. ____ (141) ____. Please be aware that Abney Home Products is not ____ (142) ____ for postage on merchandise returns.`,
                    questions: [
                        { id: '139', questionText: 'Choose the best option for blank (139).', options: { A: 'condition', B: 'object', C: 'explanation', D: 'preview' }, correctAnswer: 'A' },
                        { id: '140', questionText: 'Choose the best option for blank (140).', options: { A: 'asked', B: 'is asking', C: 'has asked', D: 'will ask' }, correctAnswer: 'D' },
                        { id: '141', questionText: 'Choose the best sentence to insert at (141).', options: { A: 'Our employees have software training and are skilled at resolving problems.', B: 'To cancel a furniture delivery, please call within 24 hours of ordering.', C: 'When you send back the product, be sure to include the authorization code.', D: 'The catalog has sections for kitchen goods, lighting, appliances, and more.' }, correctAnswer: 'C' },
                        { id: '142', questionText: 'Choose the best option for blank (142).', options: { A: 'responsibly', B: 'responsible', C: 'responsibility', D: 'responsibleness' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-6-5-143-146',
                    text: `To: All Employees
From: Marina Papantonio, Safety Liaison
Date: November 12
Subject: Safety Training

It is time once again for our annual safety training workshop. This year, training will focus on digital safety measures, like avoiding scams and protecting against cyberattacks. Our technology experts already have installed new programs throughout our company's information system to reduce risk. ____ (143) ____, we all need to understand how the programs work and what to do when a problem arises.
To accommodate ____ (144) ____, several workshops will be conducted throughout the upcoming week. You can register for any one of these ____ (145) ____ on our company's intranet page. Just click on the link for "Safety Training."
____ (146) ____. If you are unable to take part in any of the scheduled workshops for any reason, you must inform your supervisor.`,
                    questions: [
                        { id: '143', questionText: 'Choose the best option for blank (143).', options: { A: 'If so', B: 'However', C: 'Otherwise', D: 'In that case' }, correctAnswer: 'B' },
                        { id: '144', questionText: 'Choose the best option for blank (144).', options: { A: 'itself', B: 'his', C: 'whose', D: 'everyone' }, correctAnswer: 'D' },
                        { id: '145', questionText: 'Choose the best option for blank (145).', options: { A: 'sessions', B: 'positions', C: 'conferences', D: 'competitions' }, correctAnswer: 'A' },
                        { id: '146', questionText: 'Choose the best sentence to insert at (146).', options: { A: 'Cyberattacks are on the rise.', B: 'The training is held each summer.', C: 'Please make every effort to sign up.', D: "Last year's program was canceled." }, correctAnswer: 'C' },
                    ]
                }
            ]
        },
    },
    7: {
        1: {
            id: 1,
            title: 'Part 7 - Test 1',
            part: 7,
            passages: [
                {
                    id: 'passage-147-148',
                    text: `STOP! PLEASE READ FIRST.\n\nThank you for purchasing this item.\nAs you do the unpacking, please verify that all components are included and place them in a safe area to avoid loss or damage. Assemble the item on a soft surface or on the flattened empty box.\nFollow the pictures and begin the assembly by placing the main part on its side. Never overtighten any screws or bolts, or you may damage the wood or cushioning. Please visit our Web site to obtain maintenance tips and register your product for warranty coverage: www.indoordelight.com.`,
                    questions: [
                        { id: '147', questionText: 'Where is the information most likely found?', options: { A: 'On a door', B: 'On a receipt', C: 'In a box', D: 'On a Web site' }, correctAnswer: 'C' },
                        { id: '148', questionText: 'What kind of item is most likely discussed?', options: { A: 'A desktop computer', B: 'A piece of furniture', C: 'A household appliance', D: 'A power tool' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-149-150',
                    text: `We are asking all Winnipeg staff to keep a copy of this schedule at their desks as a quick reference tool for scheduling interoffice meetings. Whenever possible, please schedule these meetings during one of the underlined hours, that is, after 7:00 A.M. but before 11:00 A.M.\n\nWinnipeg | Toulouse\n7:00 A.M. | 2:00 P.M.\n8:00 A.M. | 3:00 P.M.\n9:00 A.M. | 4:00 P.M.\n10:00 A.M. | 5:00 P.M.\n11:00 A.M. | 6:00 P.M.\n12:00 noon | 7:00 P.M.`,
                    questions: [
                        { id: '149', questionText: 'What is suggested by the schedule?', options: { A: 'A conference has been scheduled.', B: 'A firm has offices in two time zones.', C: 'Administrative assistants make travel plans.', D: 'Some meeting times have been changed.' }, correctAnswer: 'B' },
                        { id: '150', questionText: 'What is indicated about 11:00 A.M. Winnipeg time?', options: { A: 'It is when the Winnipeg office closes for lunch.', B: 'It is when staff in Toulouse begin their workday.', C: 'It is not a preferred time to schedule a meeting.', D: 'It has just been added to the schedule.' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-151-152',
                    text: `The Bryant Foyer is one of the premier event spaces in our area. Set on a hill, it has expansive windows that provide sweeping views of the adjacent botanical gardens and the river. Built in 1897, it was the home of the Francona Charitable Trust until its renovation just over a year ago. Today, the space can accommodate up to 200 guests and is ideal for wedding receptions, office parties, and panel presentations. With its marble floors, cathedral ceiling, and stunning artwork, the Bryant Foyer is the ideal location for your next gathering.\nThe on-site restaurant, Andito's, caters our events and also operates as its own business. This farm-to-table restaurant, headed by chef Michaela Rymond, meets all dietary needs and has revolutionized the local food scene. Area residents know to plan far in advance to get a seat.\nTo reserve the event space or to make a dinner reservation, give us a call at 216-555-0157.`,
                    questions: [
                        { id: '151', questionText: 'What is indicated about the Bryant Foyer?', options: { A: 'It is located on the shores of a lake.', B: 'It has recently been renovated.', C: 'It will build a botanical garden for guests.', D: 'It is reserved solely for corporate events.' }, correctAnswer: 'B' },
                        { id: '152', questionText: "What is suggested about Andito's?", options: { A: 'It was started by an international chef.', B: 'It offers limited menu options.', C: 'It is now funded by a charitable organization.', D: 'It is very popular with local residents.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-153-154',
                    text: `Joan Chi (12:39 P.M.)\nHello Mina. Are you almost finished with the field measurements? I'm getting hungry.\nMina Evers (12:40 P.M.)\nSorry, Joan. I'm afraid you and Ms. Lim will have to go to lunch without me today. There's a problem with the site coordinates. This is going to take some time.\nJoan Chi (12:51 P.M.)\nOh no. Should we bring something back for you?\nMina Evers (12:59 P.M.)\nGet me a chicken sandwich.\nJoan Chi (1:00 P.M.)\nSure thing, Mina. See you in a while.`,
                    questions: [
                        { id: '153', questionText: 'At 1:00 P.M., what does Ms. Chi most likely mean when she writes, “Sure thing, Mina”?', options: { A: 'She will bring lunch for Ms. Evers.', B: 'She can provide a tool that Ms. Evers needs.', C: 'Some site coordinates are correct.', D: 'Some measurements must be double-checked.' }, correctAnswer: 'A' },
                        { id: '154', questionText: 'What will happen next?', options: { A: 'Ms. Chi will get new site coordinates.', B: 'Ms. Chi and Ms. Lim will be out for a while.', C: 'Ms. Evers will share a recipe.', D: 'Ms. Lim will begin taking measurements.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-155-157',
                    text: `This season's excellent weather has yielded a substantial harvest of fruits and vegetables, in many cases more than growers may find buyers for. Those of you wishing to donate surplus produce to community organizations can do so by visiting Vosey Farm and Garden's Web site (www.vfgrdn.org), where you will find our list of drop-off locations.\nIf you need us to come to you instead, please contact us. We will reach out to one of the many independent truck drivers who have kindly volunteered to transport and quickly distribute your food donations to vetted groups that need it. Check our Web site for more information about this service as well as for insights into topics related to farming and gardening in the Northern Great Plains region.`,
                    questions: [
                        { id: '155', questionText: 'For whom is the notice most likely intended?', options: { A: 'Farmers', B: 'Professional chefs', C: 'Truck drivers', D: 'Supermarket managers' }, correctAnswer: 'A' },
                        { id: '156', questionText: 'What does the notice indicate about the weather?', options: { A: 'It caused transportation delays.', B: 'It included heavier rain than usual.', C: 'It was frequently a topic in the local news.', D: 'It was beneficial for crops.' }, correctAnswer: 'D' },
                        { id: '157', questionText: 'What service does the notice mention?', options: { A: 'Staffing for local businesses', B: 'Food collection and distribution', C: 'Farm machinery repair', D: 'Gardening workshops' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-158-160',
                    text: `We are delighted that you are joining us for today's event. — [1] —. We ask that you adhere to the following guidelines to ensure that all attendees have an enjoyable experience.\nUpon entering the venue, please put any and all electronic devices in silent mode. Ringtones and lit screens are very distracting to both the performers and your fellow audience members. — [2] —. Moreover, audience members are not allowed to make an audio or visual recording of the performance.\nBags and other items in the aisles pose a safety concern. — [3] —. If your bag is too big to fit properly under a seat, consider storing it in a locker for just $2. — [4] —. One of our attendants will gladly assist you with that.\nThank you for your cooperation.`,
                    questions: [
                        { id: '158', questionText: 'Where most likely is the notice posted?', options: { A: 'In an airplane', B: 'In a concert hall', C: 'At a restaurant', D: 'At a post office' }, correctAnswer: 'B' },
                        { id: '159', questionText: 'What is stated about large bags?', options: { A: 'They can be put in a locked box for a fee.', B: 'They must be left outside the building.', C: 'They will be inspected by an attendant.', D: 'They must be stored under a seat.' }, correctAnswer: 'A' },
                        { id: '160', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Please refrain from making phone calls or texting at all times."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-161-164',
                    text: `*E-mail*\nTo: Camille Ayala <ayala@esplinelectronics.com>\nFrom: Masae Adachi <madachi@sweeterspecialties.com>\nDate: February 12\nSubject: Event order\nAttachment: Sweeter Specialties Request Form\n\nDear Ms. Ayala,\nThank you for selecting our business to provide baked goods for the Esplin Electronics conference event in March. We are honored that you chose us for a fourth year in a row! On March 29, we will provide a large vanilla cake for each of the ten venues you indicated, and we will deliver a custom-baked multilayer cake on the following day. You will be billed on March 28. Please review the attached order form and return it to me within seven days.\nRegarding the cake you ordered for March 30, our head pastry chef will produce it according to your specifications. In fact, he created a sample of the complete recipe earlier today—almond crème cake with fresh raspberry filling. We have judged it to be a delectable treat, and we are sure that you will be pleased.\nIf you have any concerns, just send me an e-mail. As always, we value your business.\n\nMasae Adachi, Owner\nSweeter Specialties`,
                    questions: [
                        { id: '161', questionText: 'What is the main purpose of the e-mail?', options: { A: 'To request confirmation of an order', B: 'To adjust some delivery dates', C: 'To announce the expansion of a business', D: 'To promote new dessert products' }, correctAnswer: 'A' },
                        { id: '162', questionText: 'What is suggested about Ms. Ayala?', options: { A: 'She is receiving a professional award.', B: 'She has worked as a pastry chef.', C: 'She has been a Sweeter Specialties client in the past.', D: 'She received a positive recommendation about a chef.' }, correctAnswer: 'C' },
                        { id: '163', questionText: 'What is indicated about the multilayer cake?', options: { A: 'It has been a best-selling product with clients.', B: 'It is the most expensive cake at Sweeter Specialties.', C: 'It is baked for Esplin Electronics annually.', D: 'It is a new flavor combination for Sweeter Specialties.' }, correctAnswer: 'D' },
                        { id: '164', questionText: 'The word "judged” in paragraph 2, line 3, is closest in meaning to', options: { A: 'criticized', B: 'settled', C: 'determined', D: 'described' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-165-167',
                    text: `Great Dishwasher!\nI never had a dishwasher before. After remodeling my kitchen, I finally had room for a compact dishwasher. I did a lot of research, and the Dish Magic 300 seemed to be the best choice. It was pricier than other models, but all of the reviews were excellent. So, I decided to spend the extra money. I have had the dishwasher for one month now, and I could not be happier with my decision. Most importantly, the dishes come out sparkling clean, no matter how dirty they were going in. Also, the machine is so quiet, you do not even know it is running. Lastly, it is designed to use water efficiently, which is very important to me. Overall, I am very pleased with this dishwasher.\n– Anna Yakovleva`,
                    questions: [
                        { id: '165', questionText: 'Why did Ms. Yakovleva choose the Dish Magic 300 dishwasher?', options: { A: 'It was less expensive than most models.', B: 'It was the largest model available.', C: 'It was rated very highly.', D: 'It was the same brand as her other appliances.' }, correctAnswer: 'C' },
                        { id: '166', questionText: 'The word "running" in paragraph 1, line 7, is closest in meaning to', options: { A: 'adjusting', B: 'controlling', C: 'moving', D: 'operating' }, correctAnswer: 'D' },
                        { id: '167', questionText: 'What is indicated about Ms. Yakovleva?', options: { A: 'She cares about saving water.', B: 'She recently moved to a new home.', C: 'She bought the dishwasher a year ago.', D: 'She remodels kitchens professionally.' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-168-171',
                    text: `Skyler Airlines employs more than 20,000 people from all over the world. We're growing fast and have many positions available. — [1] —. So regardless of your background, there's probably a place for you on our team. Skyler employees enjoy many perks. — [2] —. For example, our discount program enables them to fly to any of our destinations for a fraction of the average ticket price. — [3] —. We offer upward and global mobility, tuition reimbursement, a mentorship program, and a generous compensation package. — [4] —. Annual paid vacations enable a comfortable work-life balance. It's no wonder that Skyler Airlines was named "Best Airline to Work For" by Travel Vista Journal three years in a row.`,
                    questions: [
                        { id: '168', questionText: 'For whom is the information intended?', options: { A: 'Skyler Airlines employees', B: 'Skyler Airlines customers', C: 'Potential journal subscribers', D: 'Current job seekers' }, correctAnswer: 'D' },
                        { id: '169', questionText: 'In the information, what is NOT mentioned as being offered to employees?', options: { A: 'Payment for educational expenses', B: 'Free airline tickets', C: 'Opportunities for mentoring', D: 'Paid days off' }, correctAnswer: 'B' },
                        { id: '170', questionText: 'What is mentioned about Skyler Airlines?', options: { A: 'It flies to the most destinations around the world.', B: 'It is planning to merge with another airline.', C: 'It has been praised by a trade publication.', D: 'It has replaced its seats with more comfortable ones.' }, correctAnswer: 'C' },
                        { id: '171', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Our openings cover a broad range of skill sets."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-172-175',
                    text: `Susan Gowan 9:16 A.M.\nGood morning. The presentation slides about the new line of headphones are almost ready for distribution to our many partner stores. We are on track to send them out next Monday.\nMaggie Lorenz 9:17 A.M.\nHow do they look?\nSusan Gowan 9:20 A.M.\nThere are still some missing elements.\nAlan Woodson 9:21 A.M.\nWe mainly need the information from the user studies that reviewed the headphones for sport use. We should have that report from the research and development office by Wednesday.\nMaggie Lorenz 9:22 A.M.\nYes, let's not overlook that. And if you're concerned about the report not arriving by Wednesday, please contact Matt Harven and remind him to expedite a summary to us.\nSusan Gowan 9:23 A.M.\nAssuming we receive that summary soon enough to incorporate its findings into the slides, should the three of us schedule a trial run through the presentation on Thursday or Friday?\nMaggie Lorenz 9:24 A.M.\nLet's try for Thursday afternoon. Then we will still have Friday to make any necessary changes.\nAlan Woodson 9:25 A.M.\nFine by me. I'm free after 2 P.M.`,
                    questions: [
                        { id: '172', questionText: 'What is indicated about a presentation?', options: { A: 'It will be expensive to produce.', B: 'It will highlight some best-selling products.', C: "It will be Ms. Gowan's first project.", D: 'It will be sent to multiple locations.' }, correctAnswer: 'D' },
                        { id: '173', questionText: 'At 9:22 A.M., what does Ms. Lorenz imply when she writes, "let\'s not overlook that"?', options: { A: 'More staff should attend a meeting.', B: 'Information from the user studies is important.', C: 'The presentation must run smoothly.', D: 'Partner stores must be notified about an upcoming report.' }, correctAnswer: 'B' },
                        { id: '174', questionText: 'Who most likely is Mr. Harven?', options: { A: 'A store manager', B: 'An amateur athlete', C: 'A product researcher', D: 'An advertising executive' }, correctAnswer: 'C' },
                        { id: '175', questionText: 'When do the writers plan to meet to review a slide presentation?', options: { A: 'On Monday', B: 'On Wednesday', C: 'On Thursday', D: 'On Friday' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-176-180',
                    text: `--- PRESS RELEASE ---\nFOR IMMEDIATE RELEASE\nSYDNEY (4 June)—Kitchen Swifts and Chef Darius Cordero are joining together to give home cooks a new culinary experience. The award-winning chef is the owner of restaurants in both the Philippines and Australia, including the recently opened Enriqua's. He says his cooking reflects his Filipino heritage, which is a blend of many cultures.\n"I've designed these simplified recipes for Kitchen Swifts so that cooks at home can enjoy new and exciting flavours with ease," he said. "While preparing and eating these meals, you can feel like you are travelling the world with me."\nZahra Chambers, vice president of Kitchen Swifts, says she is pleased to work with Chef Cordero and to offer delicious new recipes to their customers. Kitchen Swifts supplies menus, recipes, and ingredients for two people, four people, or six people, including a range of vegetarian selections. Customers choose the most appropriate meal options, and then a box is delivered weekly. Current customers will see no price increase with the partnership. To find out more, visit the Kitchen Swifts Web site at www.kitchenswifts.com.au.\n\n--- REVIEW ---\nhttps://www.sydneyrestaurants.com.au\nA colleague arranged for us to eat at Enriqua's while I was at a conference in Sydney. It is usually fully booked for dinner; you may need to call months in advance for a table. We had a wonderful lunch there instead. Everything was delicious, and the bread and desserts are baked on-site! It was a worthwhile treat before I flew back to Hong Kong.\n-Meili Guan`,
                    questions: [
                        { id: '176', questionText: 'What is the purpose of the press release?', options: { A: 'To promote the opening of a restaurant', B: 'To announce a business partnership', C: 'To introduce a travel program', D: 'To congratulate an award recipient' }, correctAnswer: 'B' },
                        { id: '177', questionText: 'In the press release, the word “reflects” in paragraph 1, line 4, is closest in meaning to', options: { A: 'results in', B: 'changes', C: 'shows', D: 'thinks about' }, correctAnswer: 'C' },
                        { id: '178', questionText: 'What is indicated about Kitchen Swifts?', options: { A: 'It raised its prices for all customers.', B: 'It revised its delivery schedule.', C: 'It offers several meal options.', D: 'It has a new vice president.' }, correctAnswer: 'C' },
                        { id: '179', questionText: 'What is most likely true about Ms. Guan?', options: { A: "She went to Mr. Cordero's restaurant.", B: 'She recently went to Sydney for a vacation.', C: 'She is a colleague of Ms. Chambers.', D: 'She regularly orders from Kitchen Swifts.' }, correctAnswer: 'A' },
                        { id: '180', questionText: "What did Ms. Guan suggest about Enriqua's in the review?", options: { A: 'It has a limited lunch menu.', B: 'It takes dinner reservations.', C: 'It serves bread from a local bakery.', D: 'It has a location in Hong Kong.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-181-185',
                    text: `--- E-MAIL ---\nTo: laura.savard@orbitmail.scot\nFrom: cboyle@ceoleire.co.uk\nDate: 25 May\nSubject: RE: Some suggestions\n\nDear Ms. Savard,\nThank you for your kind offer to either pick up your online order from my shop or to pay extra for air or train transport. Neither arrangement is necessary, as I am happy to deliver your items to you in Stranraer myself. It so happens that my sister and her children live nearby in Kirkcolm. Before seeing them, I will drive my rental car to your house and hand deliver the items to you.\nAs you know, my merchandise is 100 percent handcrafted. If any damage occurs in transit, the repair turns into an expensive, time-consuming ordeal. Over the years, I've seen too much damage done by inattentive baggage handlers. My policy is to deliver items personally whenever feasible or hire a ground- or sea-based courier service I trust.\nI look forward to meeting you on 5 June. I expect to arrive at your house no later than 5 p.m.\n\nSincerely,\nConor Boyle\nCeoleire Classics\n\n--- TICKET ---\nNorthern Ireland Ferry Service\nDate of Issuance: 26 May\nPassenger Name: Conor Boyle\nDeparting Belfast: Friday, 5 June, 1:05 PM\nDocking at Cairnryan: Friday, 5 June, 3:20 PM\nBaggage: 1 suitcase (small), 2 instrument cases (1 mandolin, 1 guitar)\nVehicle transport: No\nAdult Standard Class: £55.00\nPlease arrive 30 minutes prior to departure.`,
                    questions: [
                        { id: '181', questionText: 'What is the purpose of the e-mail?', options: { A: 'To finalize a plan', B: 'To accept an invitation', C: 'To promote a new service', D: 'To request feedback on a policy' }, correctAnswer: 'A' },
                        { id: '182', questionText: 'Why will Mr. Boyle travel from Stranraer to Kirkcolm?', options: { A: 'To make a delivery', B: 'To attend a meeting', C: 'To drop off a rental car', D: 'To visit with family members' }, correctAnswer: 'D' },
                        { id: '183', questionText: 'What is indicated in the e-mail?', options: { A: "Mr. Boyle's sister is a cofounder of Ceoleire Classics.", B: 'Mr. Boyle has been disappointed by air- and train-freight companies.', C: 'Ms. Savard has purchased items from Mr. Boyle in the past.', D: 'Ms. Savard prefers a specific brand of luggage.' }, correctAnswer: 'B' },
                        { id: '184', questionText: 'What is most likely true about Ms. Savard?', options: { A: 'She often travels for her job.', B: 'She paid extra to have items hand delivered.', C: 'She recently purchased musical instruments.', D: 'She will meet Mr. Boyle at the rental car office.' }, correctAnswer: 'C' },
                        { id: '185', questionText: 'How is Mr. Boyle traveling to Cairnryan on June 5?', options: { A: 'By car', B: 'By train', C: 'By boat', D: 'By plane' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-186-190',
                    text: `--- ADVERTISEMENT ---\nTrain to Achieve (TTA)—Our classes prepare you to succeed!\nProfiled in the latest Business Directions Nigeria newsletter, Train to Achieve (TTA) is one of the most innovative training providers in West Africa. By offering our classes entirely in online format, we bring the classroom to your home. All classes include individualized instruction and are taught by recognized professionals in their respective fields. Upon successful completion of a class, you will receive an official Certificate of Training, a valuable addition to any résumé. For a complete list of class fees and schedules, visit our Web site at www.traintoachieve.org.ng. The following are some of our most popular classes.\n• Introduction to Social Media Marketing (TTA1504): Taught by marketing consultant Marcus Akpan, the class equips you with the know-how to promote your business online.\n• Become a Successful Freelance Writer (TTA3283): Business writer Brenda Akande gives you expert guidance on how to hone your writing skills and sell your writing services.\n• Starting an Internet Radio Station (TTA7629): Online radio host Natalie Kabiru shows you how to appeal to your target market and gives practical tips for setting up your broadcast service.\n• Basics of Graphic Design (TTA7633): Veteran graphic designer Doug Umaru helps you acquire the basic skills needed to start a graphic design business.\n\n--- FORUM POSTING ---\nDiscussion forum for students enrolled in Train to Achieve Class TTA1504\nPosted on: 21 May, 9:41 A.M. | Posted by: Joseph Egbe | Subject: Presentations\nViewing the list of students enrolled in this class, I remembered chatting with some of you on the forum for January's poster design class. I look forward to sharing our learning experiences again for this class. Yesterday I was the second student to meet with Mr. Akpan for an individual videoconference about my business. I own a food truck from which I sell baked goods, and when I shared with Mr. Akpan the outline for my Web site, he suggested that I add a section with vivid images of all my baked goods. It was helpful advice.\n\n--- OUTLINE ---\nEgbe's Bakery—Unique baked-in flavours in every bite!\n• Section 1: Explore our menu and price list\n• Section 2: Browse photos of our delicious treats\n• Section 3: Learn about our catering services\n• Section 4: View lists of ingredients`,
                    questions: [
                        { id: '186', questionText: 'What is indicated about TTA?', options: { A: 'It was founded by a graphic designer.', B: 'It publishes its own online newsletter.', C: 'It offers classes led by industry professionals.', D: 'It has classroom facilities in cities across West Africa.' }, correctAnswer: 'C' },
                        { id: '187', questionText: 'According to the advertisement, what does TTA provide to students who finish a class?', options: { A: 'A résumé-writing workshop', B: 'A discount on a follow-up class', C: 'A list of current job postings', D: 'A certification document' }, correctAnswer: 'D' },
                        { id: '188', questionText: 'What is most likely true about Mr. Egbe?', options: { A: 'He helped design a discussion forum.', B: 'He has previously taken a TTA class.', C: 'He develops videoconferencing software.', D: 'He recently sold a bakery food truck.' }, correctAnswer: 'B' },
                        { id: '189', questionText: 'What TTA class is Mr. Egbe enrolled in?', options: { A: 'Introduction to Social Media Marketing', B: 'Become a Successful Freelance Writer', C: 'Starting an Internet Radio Station', D: 'Basics of Graphic Design' }, correctAnswer: 'A' },
                        { id: '190', questionText: 'What section did Mr. Egbe most likely add to the outline after speaking with Mr. Akpan?', options: { A: 'Section 1', B: 'Section 2', C: 'Section 3', D: 'Section 4' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-191-195',
                    text: `--- ARTICLE ---\nCaribbean Flavours Abound by Rebecca Roats\nNOTTINGHAM (1 August)—Orange Bay Kitchen has been serving up an infusion of Jamaican flavours in a laid-back Caribbean atmosphere for six months now. Managed by Keron Deslandes, the 150-seat restaurant is an aromatic jewel amid the bustling shops and eateries in Wester Square. The servers are always happy to help diners select from the variety of delights on the extensive menu, which includes curried goat, oxtail soup, and red snapper. The restaurant is most famous for its jerk chicken. Marinated for 24 hours prior to grilling and served with sides of stewed cabbage and coconut rice, the dish is a good deal at £12.\nIf you stop in on any Friday night between 7 and 11 P.M., you will enjoy live reggae music.\n\n--- REVIEW ---\nhttps://www.dinerreviews.co.uk/orangebaykitchen\nPosted on 22 August by Tamika Peterkin, tpeterkin@sunmail.co.uk\nOrange Bay Kitchen: 2/5 Stars\nAfter reading a glowing article about Orange Bay Kitchen by Rebecca Roats, I was eager to give this place a try. My husband and I arrived there at 7 P.M. yesterday, keen to enjoy live music with our dinner. Unfortunately, the band's performance that night had been cancelled. Undeterred, we stayed and both ordered the jerk chicken. While the chicken's smoky flavour was outstanding, the stewed cabbage was lacking in flavour. Also, the portion size was smaller than we had anticipated, so we ordered another appetiser to avoid going home hungry. The head chef came out to apologise and was extremely nice, but we will probably not go back anytime soon.\n\n--- E-MAIL ---\nTo: tpeterkin@sunmail.co.uk\nFrom: vsmith@orangebaykitchen.co.uk\nDate: 24 August\nSubject: Your review\nAttachment: 0258\nDear Ms. Peterkin,\nThank you for visiting Orange Bay Kitchen and leaving a review. Our manager, Keron Deslandes, told me more about your visit and our failure to live up to your expectations that evening. Please accept the attached £20 gift certificate; I do hope that you will give us another try.\nDuring your visit, our band had an equipment malfunction, which is what led to the last-minute cancellation. However, the band will be back performing weekly beginning in September. Also, I want you to know that Head Chef Adio Brown has changed the spices he uses in the stewed cabbage. I am sure you will find them delightful.\nSincerely,\nVea Smith, Owner, Orange Bay Kitchen`,
                    questions: [
                        { id: '191', questionText: 'What does the article mention about Orange Bay Kitchen?', options: { A: 'It is currently hiring servers.', B: 'It is located on a quiet street.', C: 'It has another location in Jamaica.', D: 'It opened six months ago.' }, correctAnswer: 'D' },
                        { id: '192', questionText: 'According to the article, what is the most popular menu item at Orange Bay Kitchen?', options: { A: 'Red snapper', B: 'Oxtail soup', C: 'Jerk chicken', D: 'Curried goat' }, correctAnswer: 'C' },
                        { id: '193', questionText: "What is suggested about Ms. Peterkin's visit to Orange Bay Kitchen?", options: { A: 'She was there on a Friday.', B: 'She dined alone.', C: 'She requested extra rice.', D: 'She ordered dessert.' }, correctAnswer: 'A' },
                        { id: '194', questionText: 'What is a purpose of the e-mail?', options: { A: 'To answer a question', B: 'To offer an apology', C: 'To ask for feedback', D: 'To confirm a reservation' }, correctAnswer: 'B' },
                        { id: '195', questionText: 'Whom did Ms. Peterkin meet at Orange Bay Kitchen?', options: { A: 'Ms. Roats', B: 'Mr. Deslandes', C: 'Mr. Brown', D: 'Ms. Smith' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-196-200',
                    text: `--- INVOICE ---\nOrbys Distributors\nClient: Green Canyon | Date: June 10\nAccount: 4352-0\nItem | Price\nGarden soil, 33 cubic meters | $1,170.00\nCrushed gravel, 30 metric tons | $1,710.00\nDecorative stone, 20 metric tons | $1,140.00\n70 paving stones, .6 x .6 meters | $630.00\nSubtotal | $4,650.00\nDiscount (10%) | $465.00\nDelivery charge | $350.00\nGrand Total | $4,535.00\nPlease see the enclosed notice outlining important changes to your billing.\n\n--- NOTICE ---\nOrbys Distributors\nTo our valued customers:\nOur current invoicing system has been in use since Orbys Distributors was founded over twenty years ago. As a much-needed upgrade, we are switching to electronic invoicing. Starting August 1, invoices will be generated automatically each month and will be sent to the e-mail address associated with your company's account.\nRest assured that our long-standing incentives remain in place:\n• A 10% discount for orders of more than $4,000\n• A 20% discount for charitable organizations\n• Free deliveries to locations within 5 miles of one of our supply centers\n• Free samples for members of our Frequent Buyer Club\nMore information about our transition to electronic invoicing is available on our Web site. Thank you for your support. Orbys Distributors appreciates your business.\n\n--- E-MAIL ---\nTo: Mary Peterson, Billing Department\nFrom: Tanvir Singh, Account Manager\nDate: September 12\nSubject: Account 1012-4\nHello Mary,\nI received a query today from William Tesoriero at Tesoriero Remodeling. His monthly invoice for August never arrived.\nAs you know, Mr. Tesoriero was one of our very first customers. Since we first opened for business, he has made purchases from us on a regular basis. He is also a member of the Frequent Buyer Club. This is a customer we absolutely do not want to lose. I explained to him that the rollout of our electronic invoicing system did not go as smoothly as we had hoped and promised that this would not happen again.\nI would appreciate it if you could please investigate the problem without delay and send the invoice for August to Mr. Tesoriero.\nTanvir`,
                    questions: [
                        { id: '196', questionText: 'What does the invoice suggest about Green Canyon?', options: { A: 'It does landscaping projects.', B: 'It designs highways.', C: 'It repairs old houses.', D: 'It operates a farm.' }, correctAnswer: 'A' },
                        { id: '197', questionText: 'Why most likely did Green Canyon receive a discount on its order dated June 10?', options: { A: 'It is a charitable organization.', B: 'It belongs to the Frequent Buyer Club.', C: 'It spent more than $4,000 on merchandise.', D: 'It is located near an Orbys Distributors supply center.' }, correctAnswer: 'C' },
                        { id: '198', questionText: 'According to the notice, what is changing at Orbys Distributors?', options: { A: 'Its e-mail address', B: 'Its list of incentives', C: 'Its invoicing system', D: 'Its delivery schedule' }, correctAnswer: 'C' },
                        { id: '199', questionText: 'What is suggested about Mr. Tesoriero?', options: { A: 'He asked to meet with Mr. Singh.', B: 'He is interested in employment at Orbys Distributors.', C: 'He recently placed an order for some construction machinery.', D: 'He has been a customer of Orbys Distributors for about twenty years.' }, correctAnswer: 'D' },
                        { id: '200', questionText: 'What does Mr. Singh ask Ms. Peterson to do?', options: { A: 'Make a bill payment', B: 'Solve a problem', C: 'Confirm an order', D: 'Update an account number' }, correctAnswer: 'B' },
                    ]
                }
            ]
        },
        2: { 
            id: 2, 
            title: 'Part 7 - Test 2', 
            part: 7, 
            passages: [
                {
                    id: 'passage-7-2-147-148',
                    text: `Focus Your Social Media Presence
For small-business owners, it can be a challenge to stand out in a competitive social media environment. Successfully reaching your target market involves knowing how and where to promote your products in a way that is effective and memorable. The Savan Business Center offers support for business owners who need a boost in doing just that. For over 50 years, we've been helping entrepreneurs grow their sales through insight of current industry trends and understanding of our clients' unique needs.
Let us help you get more organized in creating effective and far-reaching social media content. Our latest webinar, Focus Your Social Media Presence, will cover topics related to making your business stand out. You can sign up on our event Web page.
Date: February 5
Time: 10:00 A.M. to 11:00 A.M.
Event Web page: https://www.savanbusinesscenter.com/socialmedia`,
                    questions: [
                        { id: '147', questionText: 'What is true about the Savan Business Center?', options: { A: 'It works with small businesses.', B: 'It publishes a weekly newsletter.', C: 'It recently launched a new Web site.', D: 'It is seeking suggestions for webinar topics.' }, correctAnswer: 'A' },
                        { id: '148', questionText: 'What is indicated about the webinar?', options: { A: 'It begins at 11:00 A.M.', B: 'It features advice on creating promotional content.', C: 'It is being offered every month.', D: 'It requires a small fee to attend.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-149-150',
                    text: `Dine Out Darville Is Back!
Dine Out Darville, which runs this year from June 22 to 28, is the perfect chance to try a restaurant in Darville for the first time or revisit one of your favorite restaurants in town. You might even visit multiple restaurants during the weeklong event! Twelve popular restaurants will offer special four-course dinners—including a cup of soup, a salad, a main course, and a dessert—all for a reduced price of $30. Reservations are highly recommended. Dine Out Darville welcomes hundreds of locals and tourists each year, and you do not want to miss your opportunity to get a great meal at a great price.
Visit www.darvillebusinesscouncil.org/dineout for a list of participating restaurants.`,
                    questions: [
                        { id: '149', questionText: 'What is mentioned about Dine Out Darville?', options: { A: 'It lasts for one week.', B: 'It is held in a different location each year.', C: 'It is being held for the first time.', D: 'It includes both lunch and dinner.' }, correctAnswer: 'A' },
                        { id: '150', questionText: 'What is NOT included in the reduced-price meals?', options: { A: 'A cup of soup', B: 'A salad', C: 'A dessert', D: 'A beverage' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-2-151-152',
                    text: `Rainsy To Move Headquarters
DADE (July 11)—Rainsy LLC announced yesterday that it is moving its headquarters to Dade.
A data storage and analytics firm currently based in Salt Creek, Rainsy has clients that include some of the country's largest credit card companies, online retailers, and software providers. Rainsy helps these businesses manage and understand their customer data.
Rainsy is not planning to close its current offices in Salt Creek. However, the Dade location will become its new base of operations, as several members of its executive team will work there. The company's chief executive officer and chief financial officer will relocate to Dade along with approximately 50 percent of the company's workforce.
The office of Rainsy's chief technology officer will remain in Salt Creek, as will the account management team. The company's new Dade offices are located at 12 Glacier Parkway.`,
                    questions: [
                        { id: '151', questionText: 'What does Rainsy LLC do?', options: { A: 'It stores and analyzes consumer information.', B: 'It sells technology products online.', C: 'It processes credit card payments for retailers.', D: 'It develops computer software programs.' }, correctAnswer: 'A' },
                        { id: '152', questionText: 'Who will be based in Dade?', options: { A: "Rainsy's chief technology officer", B: 'The entire Rainsy executive team', C: "About half of Rainsy's employees", D: 'The Rainsy account management team' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-7-2-153-154',
                    text: `Michael Liu (9:43 A.M.)
Hi, Jana. I'm at Biz Plus. The paper you need is out of stock until next week. Will another color work?
Jana Bhat (9:45 A.M.)
What are the options?
Michael Liu (9:46 A.M.)
They have yellow, green, and pink in the brand that you prefer.
Jana Bhat (9:47 A.M.)
I really need blue. Are there other brands of blue printer paper?
Michael Liu (9:48 A.M.)
Yes, but they're all a darker blue. They also cost more.
Jana Bhat (9:49 A.M.)
OK, forget it. I'll place an order online.`,
                    questions: [
                        { id: '153', questionText: 'What is suggested about the paper Mr. Liu is shopping for?', options: { A: 'It is light blue.', B: 'It is expensive.', C: 'It is sold exclusively at Biz Plus.', D: 'It has been discontinued.' }, correctAnswer: 'A' },
                        { id: '154', questionText: 'At 9:49 A.M., what does Ms. Bhat most likely mean when she writes, “OK, forget it"?', options: { A: 'She wants to check her budget.', B: 'She thinks Mr. Liu should not purchase paper at Biz Plus.', C: 'She believes Mr. Liu should not place an order this week.', D: 'She plans to cancel her order.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-155-157',
                    text: `20 May
Neil Croft, Director
Queensland Libraries
13 Hummocky Road
Brisbane QLD 4003

Dear Mr. Croft,
— [1] —. I have read your inquiry about offering financial management courses at libraries across Queensland. The Society for Financial Management Advisors (SFMA) welcomes the opportunity to partner with the libraries to make basic financial management information more widely available.
You proposed that SFMA members could lead introductory courses at several library branches. — [2] —. SFMA members have offered similar courses to recent graduates, people changing careers, and first-time investors in the past.
— [3] —. If you have a list of library branches that would host the first series of events, I can suggest facilitators who work near those libraries or would be willing to travel to them. Do you have a general profile of the expected attendees? — [4] —. That information would help us tailor the courses to audience needs and interests.
I look forward to meeting with you to develop a plan. Please contact me by telephone at 07 5550 1344 to set up a time to discuss the courses.

Sincerely,
Roberta Otney
Chairperson, Society for Financial Management Advisors`,
                    questions: [
                        { id: '155', questionText: 'Why did Ms. Otney write the letter?', options: { A: 'To welcome a new library director', B: 'To register for an SFMA finance course', C: 'To confirm some educational credentials', D: 'To reply to a question from Mr. Croft' }, correctAnswer: 'D' },
                        { id: '156', questionText: 'What is one thing Ms. Otney requested?', options: { A: 'A library membership', B: 'A list of course instructors', C: 'The locations of some libraries', D: "Mr. Croft's telephone number" }, correctAnswer: 'C' },
                        { id: '157', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"This is something I would be happy to arrange."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-158-160',
                    text: `Claro Vision
The difference is clear.
Take advantage of our limited-time offer: 50% off all eyeglass frames through 30 September
Other advantages available today and every day:
- Free eyeglass fittings and adjustments
- Money-back guarantee if you are not completely satisfied
- More than 500 locations in shopping malls throughout Canada
- Low-cost vision checkups by licensed opticians
To find a store near you, visit www.clarovision.ca/locations, or call 416-555-0122 today!`,
                    questions: [
                        { id: '158', questionText: 'Why most likely was the advertisement created?', options: { A: 'To draw attention to an underused professional service', B: 'To publicize the benefits of a warranty policy', C: 'To announce the opening of new store locations', D: 'To promote a temporary price discount' }, correctAnswer: 'D' },
                        { id: '159', questionText: 'What is stated about Claro Vision stores?', options: { A: "They are larger than competitors' stores.", B: 'They accept all major credit cards.', C: 'They are located next to shopping malls.', D: 'They provide eyeglass fittings at no cost.' }, correctAnswer: 'D' },
                        { id: '160', questionText: 'What is stated about vision checkups?', options: { A: 'They are completed by a partner company.', B: 'They are performed by a certified professional.', C: 'They should be done every ten months.', D: 'They are offered on a limited number of days.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-161-163',
                    text: `Rossery Building Corporation
2710 South Exmouth Drive
Singapore 188509
1 April

Elizabeth Balakrishnan
Bala Home Furnishings
416 Holliton Drive C2
Singapore 793801

Dear Ms. Balakrishnan,
This is a reminder that the one-year lease for your space will end on 30 April. Please contact my office at 1555 0124 to make an appointment to renew your lease. There will be a small increase in rent and fees because of rising operating costs.
Updated charges upon lease renewal:
Monthly rental: S$1,800.00
Parking space fee: S$50.00
Cleaning service: S$10.00
Security fee: S$35.00
Total monthly charge: S$1,895.00
If you are not renewing your lease, please notify our office by 15 April. Plan to vacate the property by 5 P.M. on 30 April. There will be an inspection of the property, and there may be charges for repairs or damages beyond normal usage.

Kind regards,
Alexis Tan`,
                    questions: [
                        { id: '161', questionText: 'What is the purpose of the letter?', options: { A: 'To explain the fees for equipment installation', B: 'To offer a discount on a service', C: 'To provide information about a lease agreement', D: 'To request a change to a property amenity' }, correctAnswer: 'C' },
                        { id: '162', questionText: 'According to the letter, what must Ms. Balakrishnan pay for each month?', options: { A: 'Furniture rental', B: 'Office supplies', C: 'An inspection fee', D: 'A parking space' }, correctAnswer: 'D' },
                        { id: '163', questionText: 'Who most likely is Ms. Tan?', options: { A: 'A repair person', B: 'A property manager', C: 'A cleaning person', D: 'A security company employee' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-164-167',
                    text: `*E-mail*
To: lkhoury@britelyauto.co.uk
From: khagel@qualiview.co.uk
Date: 14 April
Subject: Your proposed changes

Dear Ms. Khoury,
Thank you for forwarding your proposed revisions to the contract for Qualiview Ltd. to be your wholesale supplier of automotive window glass.
First, we will gladly agree to an extension of the contract term from one to three years. Secondly, I am not sure what more we can do to address your concerns about packaging materials. We use custom-built crates and innovative packaging to reduce the risk of breakage during shipping. While we will replace any goods that may be damaged in transit, we do not agree to pay an additional penalty fee in the event of such damage.
I would like to discuss this further with you next week; however, I will be out of the office through Tuesday afternoon. Would you be available to meet before 11:00 A.M. on either Wednesday or Thursday? Friday is also possible. Please let me know a convenient date and time for you.

Best regards,
Karl Hagel
Qualiview Ltd.`,
                    questions: [
                        { id: '164', questionText: 'Why did Mr. Hagel write the e-mail?', options: { A: 'To report damage to an item', B: 'To finalize a purchase', C: 'To request a product sample', D: 'To negotiate a contract' }, correctAnswer: 'D' },
                        { id: '165', questionText: 'What is indicated about Qualiview Ltd.?', options: { A: 'It sells its products online.', B: 'It makes windows for cars.', C: 'It has paid penalty fees in the past.', D: 'It recently redesigned its shipping crates.' }, correctAnswer: 'B' },
                        { id: '166', questionText: 'The word "address" in paragraph 2, line 2, is closest in meaning to', options: { A: 'respond to', B: 'think about', C: 'greet', D: 'deliver' }, correctAnswer: 'A' },
                        { id: '167', questionText: 'When is Mr. Hagel available next week?', options: { A: 'On Monday morning', B: 'On Tuesday afternoon', C: 'On Wednesday morning', D: 'On Thursday afternoon' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-7-2-168-171',
                    text: `Shipping Disruptions
SINGAPORE (6 June)—Recently, the demand for international freight space has been outpacing the availability of shipping containers. This container shortage has led to higher costs for goods being shipped out of Asian ports. A drop in the production of rolls of steel, the raw material that containers are made from, has further complicated the situation. — [1] —.
Some exporters have considered the more expensive option of air freight, but companies are still faced with a difficult choice. — [2] —. They must either ask their customers to accept shipment delays, or substantially raise customer prices to cover the costs of expedited shipping. Either way, suppliers risk triggering customer dissatisfaction.
"We are working with business partners, investors, and government officials to discuss solutions to this problem," said Henry Lam, a spokesperson for the household goods producer QET Group. — [3] —. "It's going to take total cooperation of all stakeholders to find a solution."
Not all companies are suffering, though. For example, Fezker, the producer of athletic apparel and footwear, has implemented strategies to better overcome this situation. Fezker has successfully refocused its efforts away from exports to western countries and toward expanding its domestic and regional markets. — [4] —.
"We moved quickly, so the shipping container shortage has not caused a significant impact on our profits," said Fezker CEO Nuwa Lee.`,
                    questions: [
                        { id: '168', questionText: 'What is mentioned about shipping containers?', options: { A: 'They come in different sizes.', B: 'They are in short supply.', C: 'They are made from a variety of materials.', D: 'They can be used for long-term storage.' }, correctAnswer: 'B' },
                        { id: '169', questionText: 'What does Mr. Lam say is needed to resolve the situation?', options: { A: 'A sharp increase in the number of customers', B: 'A relaxation of government restrictions', C: 'The development of new technologies', D: 'Communication between affected groups' }, correctAnswer: 'D' },
                        { id: '170', questionText: 'What type of clothing does Fezker produce?', options: { A: 'Rain jackets', B: 'Sportswear', C: 'Business suits', D: 'Work uniforms' }, correctAnswer: 'B' },
                        { id: '171', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"These markets are supplied using more readily available truck and train transportation."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-2-172-175',
                    text: `Gary Wendel (7:40 A.M.)
Good morning, team. Can you share the current status of your projects, please?
Jing Yu (7:42 A.M.)
I met with the client last week to confirm the start date for Phase B of the Palisade project.
Robbie Zuniga (7:43 A.M.)
I am headed to the job site now for the Riverview project. The rain last week delayed pouring the concrete for the sidewalks. I will check the conditions this morning to see if the situation has improved.
Gary Wendel (7:44 A.M.)
When will Phase B of the Palisade project begin?
Jing Yu (7:46 A.M.)
We will break ground in March and plan to have the building completed by November.
Gary Wendel (7:47 A.M.)
That's good news about the March start date. I am sure the client is happy about that.
Gary Wendel (7:50 A.M.)
Robbie, let me know what you find out about the site conditions. Perhaps Nathan Burry can help at the site. He's our most knowledgeable concrete finisher.
Robbie Zuniga (7:55 A.M.)
Actually, I'm meeting Nathan at the site this morning, so I'll get his opinion on when we can pour the concrete. The rest of the project is on hold until we can do this.
Gary Wendel (7:57 A.M.)
Keep me posted. I don't want to rush it if it's still too wet. At the same time, the Riverview project is already behind schedule because of equipment problems and late delivery of building materials.
Robbie Zuniga (7:58 A.M.)
Will do.`,
                    questions: [
                        { id: '172', questionText: 'In what industry do the writers most likely work?', options: { A: 'Construction', B: 'Energy', C: 'Manufacturing', D: 'Travel' }, correctAnswer: 'A' },
                        { id: '173', questionText: 'Why did Mr. Wendel begin the discussion?', options: { A: 'To plan a client meeting', B: 'To discuss a weather forecast', C: 'To obtain an update on some work', D: 'To change the start date of an event' }, correctAnswer: 'C' },
                        { id: '174', questionText: 'What is indicated about the Riverview project?', options: { A: 'It has had several delays.', B: 'It is being managed by Ms. Yu.', C: 'It will be completed in November.', D: 'Its clients are happy with the progress.' }, correctAnswer: 'A' },
                        { id: '175', questionText: 'At 7:58 A.M., what does Mr. Zuniga most likely mean when he writes, "Will do"?', options: { A: 'He will revise a delivery schedule.', B: 'He will purchase more equipment.', C: 'He will hire workers to help at a site.', D: 'He will share the outcome of a meeting.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-2-176-180',
                    text: `--- E-MAIL ---
From: Madalyn Kerluke <mkerluke@karabel.ca>
To: Omar Niklaus <oniklaus@karabel.ca>, Jay Toncic <jtoncic@karabel.ca>
Date: Friday, 3 February 2:16 P.M.
Subject: Taste-test results
Attachment: Fatior Labs survey results

Hi, Team.
I just received the 24-26 January survey results from Fatior Labs for our new ice-cream taste test. As you can see from the attached document, the results are very disappointing. We sent the four flavours that we considered to be the best, but none of them received high enough ratings to advance to the next stage of development. Most of the reviews were consistent among the 92 taste-test participants in our target market of consumers ages 25 through 40. It's not a big problem if a product gets low scores in colour in the testing phase, since we can easily adjust that in the laboratory. But we should never be sending out samples that are getting scores lower than 3 in the taste category.
I would like to meet at 9 A.M. on Monday (6 February) to figure out how to proceed. There is one flavour we may be able to work with if we make a few adjustments, as suggested by most of our taste testers. We will also need to get some new flavours to Fatior Labs no later than 1 March if we are going to get a new ice cream on the Preston Grocers freezer shelves by the beginning of June.

--- SURVEY FORM ---
Fatior Labs Consumer Taste-Testing Survey
Date: 24 January
Company: Karabel Industries
Participant number: 54
Directions: You will be given a 45 g sample of 4 different ice creams. Please rate the taste, texture, sweetness, and colour of each ice cream on a scale of 1 (very unpleasant) to 5 (very pleasant). Please write any additional comments below.
Flavour | Taste | Texture | Sweetness | Colour
Lemon | 2 | 3 | 2 | 4
Mango | 3 | 3 | 2 | 1
Salted Caramel | 2 | 1 | 1 | 5
Peanut Brittle | 3 | 4 | 2 | 2
Comments: The fruit-flavoured ice creams were surprisingly sour. I did not care for them at all. I think the Peanut Brittle has the most potential, but it's missing something. I bet that adding chocolate swirls or brownie bits would make it a winner.`,
                    questions: [
                        { id: '176', questionText: 'What does the e-mail indicate about Karabel Industries ice cream?', options: { A: 'It is currently sold in four flavors.', B: 'Its coloring can be changed easily.', C: 'Its popularity has declined recently.', D: 'It is sold in Karabel Industries stores.' }, correctAnswer: 'B' },
                        { id: '177', questionText: 'What does Ms. Kerluke state that she wants to do?', options: { A: 'Visit a laboratory', B: 'Hold a team meeting', C: 'Contact a grocery store', D: 'Write new survey questions' }, correctAnswer: 'B' },
                        { id: '178', questionText: 'What is suggested about Fatior Labs?', options: { A: 'It has 92 employees.', B: 'It manufactures food colorings.', C: 'It will perform another taste test for Karabel Industries.', D: 'It supplies ice cream to Preston Grocers.' }, correctAnswer: 'C' },
                        { id: '179', questionText: 'Based on the survey form, what flavor will Karabel Industries most likely make adjustments to?', options: { A: 'Lemon', B: 'Mango', C: 'Salted Caramel', D: 'Peanut Brittle' }, correctAnswer: 'D' },
                        { id: '180', questionText: 'What can be concluded about participant number 54?', options: { A: 'The participant purchased several containers of ice cream.', B: 'The participant is between the ages of 25 and 40.', C: 'The participant regularly takes consumer surveys.', D: 'The participant prefers fruit-flavored ice cream.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-181-185',
                    text: `--- WEB PAGE ---
https://www.creategreat.ca/openings
Create Great, an Ontario-based creative agency with a diverse range of global clients in the fashion industry, is seeking a copywriter who is passionate about fashion, understands market trends, and handles digital tools with ease.
The ideal candidate will be someone who works well in a fast-paced environment with team members from international backgrounds. The copywriter will collaborate with the creative team to develop brand strategies that suit customer needs and with the marketing team to ensure the success of brand-based publicity campaigns for current and prospective clients. As remote work is permitted for copywriters, residence in Canada is not required.
To apply, send your cover letter and résumé to the director of our creative team, Fran Benjamin, Create Great, 838 Colbert Street, London, ON N6B 3P5. Application deadline: August 5.

--- LETTER ---
Annie Smith
4810 South Bryant Street
Portland, OR 97206
August 6

Fran Benjamin
Create Great
838 Colbert Street
London, ON N6B 3P5

Dear Ms. Benjamin,
I am writing to apply for the copywriter position at Create Great. As an expert fashion designer who also has writing experience, I believe I would be a valuable addition to your team. Enclosed please find my résumé.
I have a decade of experience as the lead designer for women's collections at MODA, a clothing line in Portland. I oversee the design production process from initial market research to finished product. In my role, I work in close partnership with the marketing and production teams.
In addition, for the last five years, I have been maintaining my own blog. My posts focus on trends in women's fashion and how to make clothing and cosmetics more sustainable. What started as a hobby has now attracted paying advertisers and over 15,000 followers. Visit www.medesheen.com for examples of my writing.
Thank you for considering my application.

Sincerely,
Annie Smith
Enclosure`,
                    questions: [
                        { id: '181', questionText: 'According to the Web page, what will the job recipient be able to do?', options: { A: 'Work remotely', B: 'Manage a team', C: 'Travel internationally', D: 'Relocate to Canada' }, correctAnswer: 'A' },
                        { id: '182', questionText: 'On the Web page, the word "suit" in paragraph 2, line 4, is closest in meaning to', options: { A: 'adapt', B: 'determine', C: 'invest', D: 'satisfy' }, correctAnswer: 'A' },
                        { id: '183', questionText: 'What is indicated about Ms. Smith?', options: { A: 'She has already met Ms. Benjamin.', B: 'She has worked as a copywriter.', C: 'She missed an application deadline.', D: 'She forgot to submit a required document.' }, correctAnswer: 'C' },
                        { id: '184', questionText: "According to the letter, what is one of Ms. Smith's responsibilities at MODA?", options: { A: 'Hiring fashion designers', B: 'Writing drafts of advertisements', C: 'Managing a production process', D: 'Researching sustainable clothing options' }, correctAnswer: 'C' },
                        { id: '185', questionText: 'What most likely is Medesheen?', options: { A: 'A brand of cosmetics', B: 'A fashion blog', C: 'An online magazine', D: 'An advertising agency' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-186-190',
                    text: `--- E-MAIL 1 ---
From: Akihito Nakashima <a.nakashima@gilchristshipping.com>
To: Fowler Office Supplies <support@fowlerofficesupplies.com>
Subject: Order B19849
Date: August 19

To Whom It May Concern,
Yesterday, I purchased some office supplies on your Web site. I received an e-mail receipt, but the costs are not itemized on it. To satisfy a new company policy, I must give my supervisor a receipt with the charges for each item listed separately. Could you e-mail me such a receipt? If not, is it possible for me to get this information myself from your Web site? Finally, can confirmations for future orders possibly be sent to more than one e-mail address? It would be ideal for my supervisor to automatically receive one.
Thank you,
Akihito Nakashima, Executive Assistant, Gilchrist Shipping

--- E-MAIL 2 ---
From: Fowler Office Supplies <support@fowlerofficesupplies.com>
To: Akihito Nakashima <a.nakashima@gilchristshipping.com>
Subject: RE: Order B19849
Date: August 19
Attachment: B19849

Dear Mr. Nakashima,
Attached is the receipt you requested. In apology for the inconvenience, we will provide you with 10 percent off the total price of your next order. To view a full description of any previous order, first log in to your account on our Web site, go to the "My Orders" tab, and then click on any order number.
I noticed that included in each of your last few orders was an identical order for ten of a particular item. You should know that we will reduce the price for that item by 5 percent if you mark this as a recurring order. To do this, simply check the "Recurring Order" box on the online order form.
As for your final query, this is not possible right now. However, I will share the idea with our technical team.
All the best,
Cameron Higgins, Customer Relations, Fowler Office Supplies

--- RECEIPT ---
Fowler Office Supplies
Receipt for Order: B19849
Order Date: August 18
Item | Price | Quantity | Total
Printer paper | $8.00/500 sheets | 10 | $ 80.00
Toner (black) | $50.00/cartridge | 1 | $ 50.00
Gel pens (blue) | $5.00/8-pack | 3 | $ 15.00
Staples | $3.50/box | 2 | $ 7.00
GRAND TOTAL | | | $152.00
Return Policy: Unopened merchandise may be returned by mail or in one of our stores within 60 days of purchase. For returns by mail, log in to your www.fowlerofficesupplies.com account to print a shipping label. For in-store returns, bring the item and the order number to any Fowler Office Supplies location.`,
                    questions: [
                        { id: '186', questionText: 'Why did Mr. Nakashima send the e-mail?', options: { A: 'He did not receive an item he ordered.', B: 'He was mistakenly charged twice for an item.', C: 'He received a receipt that was not detailed enough.', D: 'He did not get a confirmation e-mail for a purchase he made.' }, correctAnswer: 'C' },
                        { id: '187', questionText: 'According to the second e-mail, what will Mr. Nakashima receive with his next order?', options: { A: 'A catalog', B: 'A free pen', C: 'A printed receipt', D: 'A price discount' }, correctAnswer: 'D' },
                        { id: '188', questionText: 'For what item does Mr. Higgins suggest that Mr. Nakashima select "Recurring Order"?', options: { A: 'Printer paper', B: 'Toner', C: 'Gel pens', D: 'Staples' }, correctAnswer: 'A' },
                        { id: '189', questionText: 'What will Mr. Higgins ask the technical team to look into?', options: { A: "Improving the Web site's response rate", B: 'Providing an option to send receipts to multiple e-mail addresses', C: "Placing a link to customers' order history on the home page", D: 'Making return labels printable from any device' }, correctAnswer: 'B' },
                        { id: '190', questionText: 'What is needed to return an item at a Fowler Office Supplies store?', options: { A: 'The original receipt', B: 'A credit card number', C: 'A confirmation e-mail', D: 'The order number' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-2-191-195',
                    text: `--- ARTICLE ---
Crawford and Duval Opens Brick-and-Mortar Stores
HONG KONG (18 February)—Crawford and Duval, the online retailer known for its handcrafted blankets, decorative pillows, and other household goods, has established four brick-and-mortar stores in Hong Kong. Last Monday, the company celebrated the grand opening of boutique stores in Causeway Bay, Discovery Bay, and Sheung Wan in addition to a large department store in Central District. While the boutique stores carry the most popular of the small household goods for which Crawford and Duval is famous, the Central District location also boasts an indoor plant department and an on-site café that features specialty coffees, teas, and light snacks. Moreover, it has a much more extensive selection of the merchandise than what is available through the company's Web site.

--- WEB SITE ---
https://www.crawfordandduval.com.hk
Crawford and Duval comes to our loyal shoppers in Hong Kong!
Crawford and Duval is pleased to announce the opening of its first brick-and-mortar stores in the following locations: Causeway Bay, Discovery Bay, Sheung Wan, and Central District.
Since the launch of our online store five years ago, we have helped you to create the living space of your dreams. Now we make it even easier to decorate your home. Each location has an interior designer on staff, so you can consult with an expert in person while you browse our popular items.
All locations are convenient to public transportation. Our Central District location offers free parking in its attached car park.
As part of our grand-opening celebration, shoppers who visit one of our stores before 1 March will receive a gift card for HK$70 to use during their visit.
Members of our online Frequent Purchase Club will receive the same benefits in our stores, including a 10 percent discount on purchases of HK$500 or more.

--- RECEIPT ---
Crawford and Duval
Customer Receipt
Date: 23 February
Item | Price
Bamboo table lamp | HK$1,450.00
Decorative cushions, set of two | HK$750.00
Aloe plant in a 7.5-litre planter | HK$300.00
Machine-washable wool blanket | HK$2,000.00
Sub Total | HK$4,500.00
Less 10% | HK$450.00
TOTAL | HK$4,050.00
Payment: Credit card number: ************5598
Name on the credit card: Mei-Lin Fong
Stop at our in-store café for a treat!`,
                    questions: [
                        { id: '191', questionText: 'What is the purpose of the article?', options: { A: 'To compare locally made products', B: 'To announce store openings', C: 'To list changes to a Web site', D: 'To review a café' }, correctAnswer: 'B' },
                        { id: '192', questionText: 'What does the Web site indicate about Crawford and Duval?', options: { A: 'It has store locations around the world.', B: 'It has been in business for ten years.', C: 'It employs interior designers.', D: 'It offers free parking at all of its stores.' }, correctAnswer: 'C' },
                        { id: '193', questionText: 'According to the receipt, what is indicated about the blanket?', options: { A: 'It can be washed by machine.', B: 'It is made of cotton.', C: 'It is queen-sized.', D: 'It comes in a set with pillows.' }, correctAnswer: 'A' },
                        { id: '194', questionText: 'Where most likely did Ms. Fong make her purchase?', options: { A: 'On a Web site', B: 'In a boutique shop', C: 'At a café', D: 'In a department store' }, correctAnswer: 'D' },
                        { id: '195', questionText: 'What is suggested about Ms. Fong?', options: { A: 'She often buys food from Crawford and Duval.', B: 'She is a member of the Frequent Purchase Club.', C: 'She applied a gift card to her purchase.', D: 'She shopped during a grand-opening event.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-7-2-196-200',
                    text: `--- WEB PAGE 1 ---
https://www.osawacorporateteambuilding.com/home
Osawa Corporate Team Building
Bring your team together to promote cooperation while having fun! Our activities increase job satisfaction and engagement. We do all the planning so you can relax. Simply choose the event that is right for your team.
- Scavenger Hunt—An outdoor game in which teams are given a list of objects to find and photograph with their phone or camera. Group size: 10-50 people. Time: 3 hours.
- Game Day—This is a high-energy game day with fun team activities. This event builds team strength, communication, and problem-solving skills. Group size: 20-500 people. Time: 2 hours.
- Team Painting—Each team member creates a painting outdoors based on a predetermined theme. The paintings are linked together at the end. Group size: 6-30 people. Time: 1-2 hours.
- Robot Building—Your group will be broken into teams. Each team builds a robot to be used in challenges against the others. Group size: 10-30 people. Time: 2-3 hours.
- All Chocolate—Your group will have the chance to use engineering skills to build a tower of chocolate. Then you learn how to make chocolate from a local chocolatier. Group size: 8-150 people. Time: 2 hours.
Book an event in October and receive 15 percent off.

--- WEB PAGE 2 ---
https://www.osawacorporateteambuilding.com/requests
Request Form
Name: Alexandra Peterson
Company name: Whitten Tech
E-mail address: apeterson@whittentech.com
Phone: 617-555-0123
Location and date of event: Downtown Boston, October 15
What events are you interested in? Choose your top three.
1: Game Day | 2: Scavenger Hunt | 3: Team Painting
Number of participants: 28 people
Additional information: We are interested in a fun activity for our sales team before the busy selling season begins. We spend a lot of time in the office, so we want an outdoor event.
We will contact you within three business days with a quote and confirmation.

--- WEB PAGE 3 ---
https://www.osawacorporateteambuilding.com/reviews
What Our Customers Are Saying
Posted by Whitten Tech on October 20
Our team hired Osawa Corporate Team Building to lead an activity for the sales staff at Whitten Tech. The facilitator of the Scavenger Hunt, Lorenzo Benford, was excellent. The 28 members of our sales team all had positive feedback. They reported that they loved exploring the city, learning about its history, and finding new local attractions, even on a cold and cloudy day. I highly recommend this activity. The only downside was that we did not realize how far we would be walking. It would have been helpful to have an idea of the walking distances so we could have been fully prepared.`,
                    questions: [
                        { id: '196', questionText: 'What does the first Web page indicate about the Scavenger Hunt?', options: { A: 'It requires participants to rent a camera.', B: 'It concludes with prizes for participants.', C: 'It is a suitable activity for indoors.', D: 'It takes three hours to complete.' }, correctAnswer: 'D' },
                        { id: '197', questionText: 'What event is best for a group of more than 200 people?', options: { A: 'Game Day', B: 'Team Painting', C: 'Robot Building', D: 'All Chocolate' }, correctAnswer: 'A' },
                        { id: '198', questionText: 'What is suggested about Ms. Peterson?', options: { A: 'She has joined the Building Robots event in the past.', B: 'She will receive a discount on an event.', C: 'She recently started a job at Whitten Tech.', D: 'She used to be an event planner.' }, correctAnswer: 'B' },
                        { id: '199', questionText: 'What can be concluded about Whitten Tech?', options: { A: 'It changed its number of event participants.', B: 'It provided its staff with free passes to museums.', C: 'It was unable to schedule its first-choice activity.', D: 'It was not able to hold its event outside.' }, correctAnswer: 'C' },
                        { id: '200', questionText: 'According to the review, what was disappointing about the event?', options: { A: 'The focus on local history', B: 'The lack of information about walking distances', C: 'The difficulty in keeping the group together', D: 'The uninteresting facilitator' }, correctAnswer: 'B' },
                    ]
                }
            ]
        },
        3: {
            id: 3,
            title: 'Part 7 - Test 3',
            part: 7,
            passages: [
                {
                    id: 'passage-147-148',
                    text: `Medillo Shoes Celebrates Twenty Years in Cape Town!
246 Breda Place, Wynberg, Cape Town 7800
021 555 0149 | www.medilloshoes.co.za

Does your job require you to stand all day long? Get the support you need! At Medillo Shoes, we specialise in comfortable, supportive footwear that is stylish and suitable for any business or medical setting.

Visit us on 10 May to receive 20 percent off your purchase of one or more pairs of shoes during this anniversary event. Should you need assistance finding the best shoes for your professional needs, our footwear specialists will be on hand to help. Schedule a free consultation at www.medilloshoes.co.za to avoid a long wait.`,
                    questions: [
                        { id: '147', questionText: 'What will happen at Medillo Shoes on May 10?', options: { A: 'All shoes will be discounted.', B: 'Shop assistants will be hired.', C: 'A shoe style will be discontinued.', D: 'Operational hours will be extended.' }, correctAnswer: 'A' },
                        { id: '148', questionText: 'What is indicated about Medillo Shoes?', options: { A: 'It has been in business for ten years.', B: 'It specializes in athletic footwear.', C: 'It is located next to a medical center.', D: 'It allows customers to make appointments.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-149-150',
                    text: `To: Sales Team
From: Neil Cullen
Date: 10 April
Subject: My schedule next week

Dear Team,
I will be out of the office next week, from 15 to 19 April, attending the conference of the National Technology Alliance in Glasgow. While away, I will check e-mail and voice mail infrequently. For any urgent matters, please contact my assistant, Christina Choo. If you have a specific question about the Ezenx Industries account, please e-mail Mya Soroka. I will be back in the office on 22 April and will see all of you then.

Best,
Neil Cullen, Director of Sales and Marketing
Shallok Technology`,
                    questions: [
                        { id: '149', questionText: 'What is the purpose of the e-mail?', options: { A: 'To register for a conference', B: 'To announce a new account', C: 'To schedule a meeting', D: 'To inform colleagues of an absence' }, correctAnswer: 'D' },
                        { id: '150', questionText: 'What is most likely true about Ms. Soroka?', options: { A: 'She will be traveling with Mr. Cullen.', B: 'She works on the Ezenx Industries account.', C: "She is Ms. Choo's supervisor.", D: 'She will be out of the office until April 22.' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-151-152',
                    text: `CITY OF BRYANTON
Building Permit Office
Notice for residents and contractors working in Bryanton

Beginning on Monday, July 1, the City of Bryanton's Building Permit Office, located at 912 Fir Avenue, will be open from Monday to Thursday, 9:00 A.M. to 5:00 P.M. Applications for permits will no longer be accepted on Fridays or Saturdays. The average processing time for permit applications will remain three business days. With this change, the city will lower its operating costs while maintaining its high standards of service for residents.`,
                    questions: [
                        { id: '151', questionText: 'What change is the Building Permit Office making?', options: { A: 'It is moving to a new location.', B: 'It is simplifying the permit application process.', C: 'It is reducing the number of days it will accept permit applications.', D: 'It is increasing the processing time for permit applications.' }, correctAnswer: 'C' },
                        { id: '152', questionText: 'According to the notice, why is the change being made?', options: { A: 'To save the city money', B: 'To attract more residents', C: 'To improve the quality of service', D: 'To decrease the number of new permit applications' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-153-155',
                    text: `https://www.riverthamestours.uk/order/confirmation
River Thames Tours
Thank you for reserving a River Thames tour with us. We are eager to welcome you aboard. Each tour lasts 3 hours. Your tour includes a luncheon served at 1:00 p.m. Please consult our Web site for a menu. Should you have any dietary restrictions and like to request a special meal, please contact our customer experience manager, Martin Torma, at least 48 hours prior to your tour.

This reservation also entitles you to a 10 percent discount on a walking tour by Edgerton Walking Tours—just provide your confirmation code when booking.

Name: Lewis Califf
Purchase Date: 18 April
Confirmation Code: H102057
Tour Start: 1 May, 11:30 a.m.
Quantity: 4
Total: £180.00
Payment: Credit card ending in 1037

Please note: Boarding ends 10 minutes before departure time. Tours cannot be rescheduled.`,
                    questions: [
                        { id: '153', questionText: 'What is indicated about the river tour?', options: { A: 'It is one hour long.', B: 'It comes with a meal.', C: 'It can be rescheduled.', D: 'It sells out quickly.' }, correctAnswer: 'B' },
                        { id: '154', questionText: 'How many tickets did Mr. Califf purchase?', options: { A: '1', B: '3', C: '4', D: '7' }, correctAnswer: 'C' },
                        { id: '155', questionText: 'How can customers receive a discount on a walking tour?', options: { A: 'By making a reservation online', B: 'By paying with a credit card', C: 'By requesting a coupon from the captain', D: 'By mentioning a confirmation code' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-156-157',
                    text: `Michiko Saunders [8:06 A.M.]
Hi, Jacob. Are you on your way to the office?

Jacob Kwon [8:08 A.M.]
Yes. I should be there in about 25 minutes.

Michiko Saunders [8:10 A.M.]
OK. I was just starting to print out the design proposal for the Dansby Group, but we've run out of paper. And we don't have another delivery of it coming until Wednesday.

Jacob Kwon [8:12 A.M.]
I see an office supply store across the street. It just opened for the day.

Michiko Saunders [8:13 A.M.]
Fantastic. Three packs of paper should be enough.

Jacob Kwon [8:15 A.M.]
OK. By the way, when will the representatives from the Dansby Group be coming to our office? I could also pick up some coffee and snacks for that meeting.`,
                    questions: [
                        { id: '156', questionText: 'At 8:12 A.M., what does Mr. Kwon most likely mean when he writes, "I see an office supply store across the street"?', options: { A: 'He needs help finding a building.', B: 'He can purchase some paper.', C: 'He will look for a new printer.', D: 'He is going to negotiate a delivery schedule.' }, correctAnswer: 'B' },
                        { id: '157', questionText: 'What will Ms. Saunders most likely do next?', options: { A: 'Reschedule a meeting', B: 'Prepare some refreshments', C: 'Check on an arrival time', D: 'Revise a design proposal' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-158-160',
                    text: `Kipbank Business Services
548 Sycamore Lake Road
Green Bay, WI 54301

April 2

Madeline Omar
Passionflower Interior Design
1556 Deer Run Road
Green Bay, WI 54301

Dear Ms. Omar,
A business owner's days are filled with juggling the wants, needs, and demands of customers, staff, and suppliers. — [1] —.
Let Kipbank find the right solutions for your small business so that you can focus on your products and people. Kipbank offers checking accounts, corporate credit cards, business loans, and payroll and bookkeeping services. — [2] —. This fall, we will also add financial planners to our team to help you and your employees plan for your futures.
With our corporate credit cards, Kipbank customers can take advantage of money-saving offers from selected hotel, office supply, and air travel partners. — [3] —. These deals are automatically applied to qualified purchases. And the business owner can place spending limits on each card. — [4] —.
Please call us at 920-555-0122 to set up an appointment or just stop by when it is convenient. We look forward to meeting you and providing your enterprise with superior service.

Sincerely,
Thomas Piskorksi, Kipbank Customer Concierge`,
                    questions: [
                        { id: '158', questionText: 'What is suggested about Ms. Omar?', options: { A: 'She is an accountant.', B: 'She works for Mr. Piskorksi.', C: 'She operates a small company.', D: 'She is a Kipbank customer.' }, correctAnswer: 'C' },
                        { id: '159', questionText: 'What is stated about the credit cards?', options: { A: 'They come in a variety of colors.', B: 'They require an annual fee.', C: 'They include discounts on certain purchases.', D: 'They can be used to buy personal items.' }, correctAnswer: 'C' },
                        { id: '160', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? "Everyday financial details only add more distractions."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' },
                    ]
                },
                {
                    id: 'passage-161-163',
                    text: `OTTAWA (22 May)—Waldenstone Business Review has added a new category to its esteemed international business awards this year. The Waldenstone Corporate Prize is awarded to a business with the foresight to develop strategies that help ensure the company's long-term viability.

This year's award was presented to Carila Corporation, a major player in the electronics sector. Under the direction of CEO Atsak Kakar, Carila Corporation went from near bankruptcy to a high level of profitability in just three years.

"Winning this award was very gratifying, not just for me but for the entire company,” Mr. Kakar said upon receiving the award. "Everyone has worked extremely hard to get this company back on solid financial ground. The long-term solution has brought exceptional value to our shareholders."`,
                    questions: [
                        { id: '161', questionText: 'What is the purpose of the article?', options: { A: 'To profile a newly opened business', B: 'To analyze a trend in the electronics industry', C: "To highlight a company's achievement", D: 'To discuss changes to an employment contract' }, correctAnswer: 'C' },
                        { id: '162', questionText: 'What is suggested about Carila Corporation?', options: { A: 'It no longer develops electronics.', B: 'It was once a struggling business.', C: 'It has been unable to attract more clients.', D: 'It is seeking to replace its CEO.' }, correctAnswer: 'B' },
                        { id: '163', questionText: 'The word "solution” in paragraph 3, line 6, is closest in meaning to', options: { A: 'mixture', B: 'proof', C: 'statement', D: 'answer' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-164-167',
                    text: `Commbolt is for Everyone!
As a Commbolt customer, you've come to expect the best in reliable high-speed Internet, straightforward pricing options, and top-notch customer service from friendly professionals who are responsive to your every need. — [1] —. Unlike the competition, we promise to never lock you into inflexible contracts or suddenly raise your monthly bill without notice.
At Commbolt, we know you have options when it comes to choosing an Internet service provider. — [2] —. To show our gratitude for your loyalty, we are offering a special limited-time referral bonus.
The way it works is simple. — [3] —. You can use e-mail, social media, or even text messages to tell everyone about Commbolt. When a new user signs up using your code, each of you will receive a monetary credit. Receive $10 when new referrals sign up for a monthly plan at $45, and receive $20 for a plan costing $60 per month. The best news? — [4] —. There is no limit to the credits; the more people you sign up, the more money you get.
Your unique code is XA4R177.`,
                    questions: [
                        { id: '164', questionText: 'What Commbolt benefit does the advertisement mention?', options: { A: 'Its low prices', B: 'Its excellent customer service', C: 'Its lifetime contracts', D: 'Its convenient installation schedule' }, correctAnswer: 'B' },
                        { id: '165', questionText: 'What is the maximum amount a customer can earn when one referred person signs up for service?', options: { A: '$10.00', B: '$20.00', C: '$45.00', D: '$60.00' }, correctAnswer: 'B' },
                        { id: '166', questionText: 'What is true about the Commbolt promotion?', options: { A: 'It may not be posted on social media.', B: 'It does not provide credit for more than three referrals.', C: 'It is expected to run for a full year.', D: 'It rewards both new and existing customers.' }, correctAnswer: 'D' },
                        { id: '167', questionText: 'In which of the positions marked [1], [2], [3], or [4] does the following sentence best belong? "Just share your unique referral code with friends and family."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-168-171',
                    text: `https://www.sarahscatering.com
Sarah's Catering---What You Serve Matters
Sarah's Catering is a family-owned-and-operated company. The company was founded ten years ago with a mission to provide the highest quality catering services in our community. We work closely with local growers and use only the freshest ingredients. Our menu items can be adapted to the client's taste or dietary needs. For example, we can prepare vegetarian, vegan, and gluten-free options.
We provide catering for birthday parties, wedding receptions, corporate meetings, business holiday parties, and many other types of events. From planning the menu and preparing your food to engaging servers and cleanup staff for the event, Sarah's Catering has it covered.
Sarah's Catering can cater lunches in your office for a minimum of twenty people. We offer delicious options to make your group's meal a satisfying experience.
We're here to serve you! Ordering is fast and simple. Visit www.sarahscatering.com/quote to request a cost estimate for your next event.

What people are saying
"Sarah's Catering was very easy to work with, and the food was delicious! Everyone in the office commented on how good the food was." — Glen Liu, Perkins Real Estate
"All the food was perfect, and the staff was the best." — Annie Pierce, Kania Marketing, Inc.`,
                    questions: [
                        { id: '168', questionText: "What is indicated about Sarah's Catering?", options: { A: 'It uses locally sourced products.', B: 'It is twenty years old.', C: 'It specializes mainly in weddings.', D: 'It has an on-site dining room.' }, correctAnswer: 'A' },
                        { id: '169', questionText: 'The word "taste” in paragraph 1, line 4, is closest in meaning to', options: { A: 'preference', B: 'sample', C: 'experience', D: 'flavor' }, correctAnswer: 'A' },
                        { id: '170', questionText: "What is mentioned as a service provided by Sarah's Catering?", options: { A: 'Entertainment planning', B: 'Cooking demonstrations', C: 'Cleanup after meals', D: 'Rentals of tables and chairs' }, correctAnswer: 'C' },
                        { id: '171', questionText: 'Who most likely is Mr. Liu?', options: { A: "An employee of Sarah's Catering", B: 'A professional event manager', C: "A customer of Sarah's Catering", D: 'An assistant at a marketing firm' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-172-175',
                    text: `Marcus Steuber [10:41 A.M.] Are we still planning to have the author video conference today? I haven't yet received a meeting invitation.
Brinda Rajan [10:42 A.M.] I do have the meeting on my calendar. Let me forward it to you; it appears our editorial assistant didn't include you.
Marcus Steuber [10:43 A.M.] Thanks, I just received it. The timing doesn't work for me, though. I have an appointment with Hazel Luong to discuss the printing issues at our Singapore plant.
Brinda Rajan [10:44 A.M.] Could you postpone that? The new author we're working with really needs your guidance on the final book design and formatting. You're our most knowledgeable production editor.
Marcus Steuber [10:45 A.M.] Let me check with my supervisor. I'll add Mr. Borg to our chat.
Joshua Borg [10:47 A.M.] Hi, team. Marcus, you should prioritize your appointment with Hazel. I'll be visiting the plant next week, and we need to have some viable solutions before then.
Brinda Rajan [10:48 A.M.] OK, I'll contact Ms. Benoit to find out if she can meet later in the day, then.
Marcus Steuber [10:48 A.M.] That would work. I'm free between 4 and 6 P.M.`,
                    questions: [
                        { id: '172', questionText: 'Why does Mr. Steuber write to Ms. Rajan?', options: { A: 'To invite her to a professional event', B: 'To check on the status of a meeting', C: 'To make travel plans for a business trip', D: "To ask about an assistant's performance" }, correctAnswer: 'B' },
                        { id: '173', questionText: 'At 10:45 A.M., what does Mr. Steuber most likely mean when he writes, "Let me check with my supervisor"?', options: { A: 'He needs final approval on a book design.', B: 'He would like advice on changing an appointment.', C: 'He requires access to the corporate calendar.', D: 'He is uncertain how to add team members to the chat.' }, correctAnswer: 'B' },
                        { id: '174', questionText: 'Who most likely is Ms. Benoit?', options: { A: 'A writer', B: 'A designer', C: 'A production editor', D: 'A printing plant supervisor' }, correctAnswer: 'A' },
                        { id: '175', questionText: 'What will Ms. Rajan probably do next?', options: { A: 'Suggest solutions to a printing issue', B: 'Arrange to visit the Singapore plant', C: 'Attend a meeting with Ms. Luong', D: 'Reschedule a video conference' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-176-180',
                    text: `--- SCHEDULE ---
Rambling River Festival
Schedule of Musical Events

Friday, September 8
• 3:30 P.M. Johanna Greenblatt
• 8:00 P.M. Bethesda Radio Show featuring the Blass Brothers Band (to be recorded at the Bramley Theater)

Saturday, September 9
• 6:30 P.M. The Rolling Dozen
• 7:45 P.M. Jefferson Cage

All events take place at the Bethesda Park Open-Air Stage unless otherwise noted. Feel free to bring picnic blankets.

--- TEXT MESSAGE ---
From Rambling River Festival, Sep 8, 9:14 A.M.
This afternoon's performance will take place in Cole Hall in anticipation of inclement weather. Bulky items are not allowed, but coat-check service will be available.
This evening's performance is being pushed to 2:30 P.M. tomorrow; local band Kirschau will perform during the original time slot instead.
We expect our full Saturday program to take place at the Bethesda Park Open-Air Stage.`,
                    questions: [
                        { id: '176', questionText: 'Who was originally scheduled to perform at the Bramley Theater?', options: { A: 'Johanna Greenblatt', B: 'The Blass Brothers Band', C: 'The Rolling Dozen', D: 'Jefferson Cage' }, correctAnswer: 'B' },
                        { id: '177', questionText: 'What does the schedule suggest about the Rambling River Festival?', options: { A: 'It takes place annually.', B: 'It requires a ticket for entry.', C: 'It features local food vendors.', D: 'It is mainly an outdoor event.' }, correctAnswer: 'D' },
                        { id: '178', questionText: 'According to the text message, what can audience members do at Cole Hall?', options: { A: 'Check coats', B: 'Store bulky items', C: 'Buy concert tickets', D: 'Pick up a schedule of events' }, correctAnswer: 'A' },
                        { id: '179', questionText: 'In the text message, the word “pushed” in paragraph 2, line 1, is closest in meaning to', options: { A: 'moved', B: 'extended', C: 'managed', D: 'pressured' }, correctAnswer: 'A' },
                        { id: '180', questionText: 'When will Kirschau perform?', options: { A: 'At 3:30 P.M. on Friday', B: 'At 8:00 P.M. on Friday', C: 'At 2:30 P.M. on Saturday', D: 'At 6:30 P.M. on Saturday' }, correctAnswer: 'B' },
                    ]
                },
                {
                    id: 'passage-181-185',
                    text: `--- E-MAIL ---
To: All Branch Managers
From: Fran Corliss
Subject: Survey results on mobile banking
Date: April 7

Hello all,
Ogden Bank recently conducted a survey of its customers concerning mobile banking. Here are some key takeaways.
Over 95 percent of our customers own a mobile device. However, although interest in mobile banking is high, only 39 percent of our customers use our application. Some customers cite security concerns (23 percent), but a majority (78 percent) say that they simply do not think the app works well.
A mandatory meeting for all branch managers will be held at our headquarters on April 12 at 4:00 P.M. to brainstorm strategies for responding to this challenge.

Best,
Fran Corliss
Director of Mobile Banking, Ogden Bank

--- ARTICLE ---
Boost for Mobile Banking
By Edward Panzius

FLEMINGTON (May 25)—Ogden Bank has rolled out major improvements to its mobile banking application. It has expanded the variety of tasks that can be accomplished through the app and made it much easier to use.
"Many of our account holders have been frustrated in the past by a clunky, limited app," said Alys DeFreese, manager of the Flemington branch of Ogden Bank. "They can now do just about any task with the app that they could over the phone or by visiting a branch in person. This is just another example of how we support our customers in any way we can."
According to Ms. DeFreese, in the few weeks since the upgrade, 20 percent of account holders have switched to depositing checks and paying bills online. She anticipates that number will rise as more customers learn about the easy-to-use app.
"The convenience made a big difference for me," said account holder Yair Baum. Another customer, Maria Reed, added, “I appreciate the flexibility of being able to do my banking whenever and wherever I want."`,
                    questions: [
                        { id: '181', questionText: 'What is one purpose of the e-mail?', options: { A: 'To provide details on a new privacy policy', B: 'To propose a survey of banking habits', C: 'To ask bank staff to test a mobile app', D: 'To inform managers of a company problem' }, correctAnswer: 'D' },
                        { id: '182', questionText: "According to the e-mail, what percentage of the bank's customers use the mobile app?", options: { A: '23 percent', B: '39 percent', C: '78 percent', D: '95 percent' }, correctAnswer: 'B' },
                        { id: '183', questionText: 'In the article, the word “anticipates” in paragraph 3, line 5, is closest in meaning to', options: { A: 'considers', B: 'waits for', C: 'prepares for', D: 'expects' }, correctAnswer: 'D' },
                        { id: '184', questionText: 'Who most likely attended a meeting at Ogden Bank headquarters on April 12?', options: { A: 'Mr. Panzius', B: 'Ms. DeFreese', C: 'Mr. Baum', D: 'Ms. Reed' }, correctAnswer: 'B' },
                        { id: '185', questionText: "What is suggested about Ogden Bank's management?", options: { A: 'It prefers that account holders do their banking in person.', B: 'It is considering offering free checking to new account holders.', C: 'It is in the process of hiring more staff.', D: 'It prioritizes improvements in customer experience.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-186-190',
                    text: `--- NOTICE ---
Attention, Library Members
The Westwood Library is excited to announce the start of a book club, which is open to all library members. The club will meet on the last Thursday of each month, from 7:00 to 9:00 P.M. in the Harrison Meeting Room, to discuss a book chosen by one of our professional staff. From January to June, we will read recently published nonfiction works, and from July to December, we will focus on contemporary fiction titles. For more information, visit www.westwoodlibrary.org or speak with the staff at the circulation desk.

--- WEB PAGE ---
https://www.westwoodlibrary.org/bookclub
We hope you will join us for the book club on the last Thursday of each month at 7:00 P.M.! Below are the titles selected for the first half of the year.
January: Wild Open Range by Jaxon McDonald
February: The Journey of a Song by Lucy Xi
March: Due North: Adventures in Alaska's Northern Territory by Isabel Beck
April: The Art of Mindful Carpentry by Peter Landers
May: Mary Swan: A Legend Before Her Time by Kai Noble
June: To Be Announced

--- E-MAIL ---
To: Lisa Calle <lcalle@worldmail.com>
From: Gail Frey <gfrey@myemail.com>
Date: March 27
Subject: Book club

Dear Ms. Calle,
It was delightful to see you leading the book club yesterday evening. Ms. Beck's Due North is lengthy, and it was a challenge to finish it before the meeting. However, I have to thank you for choosing that book because it revived my childhood interest in traveling to Alaska. In fact, I've already looked up some tours!
The club meeting was packed, and I hardly got to talk to you. We should catch up sometime soon. Perhaps we might try the new French restaurant on Looper Street. I hear it is amazing and reasonably priced.

Sincerely,
Gail Frey`,
                    questions: [
                        { id: '186', questionText: 'What is the purpose of the notice?', options: { A: 'To highlight some books in the library', B: 'To announce a change in library hours', C: 'To promote an activity at the library', D: 'To introduce a new librarian' }, correctAnswer: 'C' },
                        { id: '187', questionText: 'What is suggested about the book Wild Open Range?', options: { A: 'It is a best-selling title.', B: 'It is a work of nonfiction.', C: 'It was published ten years ago.', D: 'It is available at a discount for library members.' }, correctAnswer: 'B' },
                        { id: '188', questionText: 'What author most likely wrote about a famous person?', options: { A: 'Jaxon McDonald', B: 'Lucy Xi', C: 'Peter Landers', D: 'Kai Noble' }, correctAnswer: 'D' },
                        { id: '189', questionText: 'What can be concluded about Ms. Calle?', options: { A: 'She is a library staff member.', B: 'She has written book reviews.', C: "She is Ms. Frey's supervisor.", D: 'She favors historical fiction.' }, correctAnswer: 'A' },
                        { id: '190', questionText: 'What does Ms. Frey indicate about the book she read?', options: { A: 'It discussed a topic that was unfamiliar to her.', B: 'It had parts that she thought were inaccurate.', C: 'It was easy to read in the time available.', D: 'It inspired her to explore an old interest.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-191-195',
                    text: `--- E-MAIL 1 ---
From: Tatiana Schwartz <orders@georgestreetsweets.co.uk>
To: Alejandro Ordaz <aordaz@brooksidestationery.co.uk>
Date: 28 April
Subject: Confirmation of order number 47892
Attachment: Order receipt

Dear Mr. Ordaz,
Thank you for placing an order with George Street Sweets. This e-mail is to confirm that we have received your request. Your receipt has been attached to this e-mail.
If you have any questions or need to make any changes to your order, please reply to this message or phone us at (091) 498 0172. Note that we are unable to accommodate order changes that are submitted less than 48 hours before your scheduled pickup time.
If picking up your order, we are located at 29 George Street. Parking is available next door, directly behind Spike's Cycle Shop. We offer delivery to customers within 10 kilometres of our shop for a fee of £2.50. Please note that cancellations within 24 hours of your pickup or delivery time will not be refunded.

Sincerely,
Tatiana Schwartz

--- RECEIPT ---
George Street Sweets
Order: 47892
Date of Order: 28 April
Pickup Date and Time: N/A
Delivery Date and Time: 2 May, 11:30 A.M.
Delivery Location: 2 Spen Lane, Business Suite 202
Payment Method: Credit Card—Alejandro Ordaz
Customisation Instructions: None
Item Cost
18-inch round cake (chocolate with vanilla icing) £32.00
1 set of candles £5.00
Delivery £2.50
Total £39.50

--- E-MAIL 2 ---
From: Alejandro Ordaz <aordaz@brooksidestationery.co.uk>
To: Tatiana Schwartz <orders@georgestreetsweets.co.uk>
Date: 29 April
Subject: RE: Confirmation of order number 47892

Dear Ms. Schwartz,
I received my order confirmation e-mail and receipt, and I noticed an error. It seems that the person to whom I spoke on the phone while placing my order did not copy down the message I requested. The customisation I specified was that “Happy Retirement" be written on top.
I hope it will still be possible to include this message despite the timing. Please respond to this e-mail to confirm. Also, there will be more guests than I originally expected, so I might contact your business again to place an additional order.

Best,
Alejandro Ordaz`,
                    questions: [
                        { id: '191', questionText: 'What is a policy of George Street Sweets?', options: { A: 'Orders cannot be changed.', B: 'Orders placed less than 48 hours before pickup incur an extra fee.', C: 'Orders must be paid for when they are placed.', D: 'Orders cannot be refunded within 24 hours of pickup.' }, correctAnswer: 'D' },
                        { id: '192', questionText: 'What is suggested about the building at 2 Spen Lane?', options: { A: 'It has parking spaces behind a bicycle shop.', B: 'It is located within 10 kilometers of George Street Sweets.', C: 'It is a residential apartment building.', D: 'It is owned by Ms. Schwartz.' }, correctAnswer: 'B' },
                        { id: '193', questionText: 'What can be concluded about the cake?', options: { A: 'It has not been paid for yet.', B: 'It will have only chocolate icing.', C: 'It was ordered over the phone.', D: 'It contains ice cream.' }, correctAnswer: 'C' },
                        { id: '194', questionText: 'In the second e-mail, what does Mr. Ordaz request?', options: { A: 'A full refund', B: 'A different flavor', C: 'A response to an e-mail', D: 'An additional candle' }, correctAnswer: 'C' },
                        { id: '195', questionText: 'What does Mr. Ordaz mention about the event in his e-mail?', options: { A: 'It will take place on April 29.', B: 'It is an anniversary party.', C: 'Its start time has changed.', D: 'It will be larger than expected.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-196-200',
                    text: `--- E-MAIL ---
To: Undisclosed Recipients
From: iqbal_grewal@woolfflooring.com.au
Date: 12 June
Subject: Cost-savings survey

Dear Colleagues,
At Woolf Flooring we are looking for ways to reduce day-to-day costs without sacrificing product quality, customer service, or staff morale. To this end, we are seeking input from select staff members in a variety of departments via an online survey that can be found at www.surveyquest.com.au/109820. Everyone who has been chosen to take part in the survey has been with the company for at least ten years and, therefore, is very familiar with our processes.
The deadline for completing the survey is 19 June. Note that this survey is for recipients of this e-mail only. Please do not forward this e-mail to others or post the link to the survey elsewhere.
We also plan to hire outside consultants to review our operations and write a report of their findings. We understand that some colleagues disagree with this approach to cutting costs; however, we have determined that getting an outside perspective is a worthwhile investment that will be likely to save us money in the long run.

Best,
Iqbal Grewal, Director of Business Transformation
Woolf Flooring

--- SURVEY ---
https://www.surveyquest.com.au/109820
Woolf Flooring Cost-Savings Survey
Based on your experience as an employee of Woolf Flooring, please provide one idea for a change that could be implemented to improve productivity and cut costs. Thank you.
Date: 18 June
Name and role: Beth Mair, sales manager
I have noticed that some employees grab a new pair of disposable gloves every time they return from a break. They could be using the same ones throughout the whole day. By limiting the use of gloves to one pair per day, Woolf Flooring would save thousands of dollars per year. Doing so would also reduce waste. A new policy regarding the use of personal protective items would be easy to implement immediately and would simply require sending a company-wide e-mail to explain it.

--- REPORT SUMMARY ---
Miyoko Consulting
Woolf Flooring Report Summary
Thank you for allowing us to spend the last few weeks reviewing your operations. You will find a detailed expense-reduction report with projected savings in the pages that follow. Here is a list of our main recommendations.
1. Employees do not always use wood stains and other materials as efficiently as possible. More training time could be dedicated to this.
2. Employees could be more mindful of electricity costs—for instance, turning off all lights and machines when not in use.
3. Several Internet service providers are offering special pricing right now. Switching to one of these providers could save a considerable amount of money in the long run.
4. More effort could be made to reuse supplies—for example, some basic personal protective equipment could be used more than once.`,
                    questions: [
                        { id: '196', questionText: 'In his e-mail, what does Mr. Grewal indicate about the survey?', options: { A: 'It does not have an end date.', B: 'It requires the use of a password.', C: 'It can be completed on paper.', D: 'It should not be shared with others.' }, correctAnswer: 'D' },
                        { id: '197', questionText: 'According to the e-mail, what do some Woolf Flooring employees disagree with?', options: { A: 'The plan to hire consultants', B: 'The way a survey is structured', C: 'The way a budget report is presented', D: 'The departments selected to provide feedback' }, correctAnswer: 'A' },
                        { id: '198', questionText: 'What can be concluded about Ms. Mair?', options: { A: 'She regularly provides ideas for change.', B: 'She has worked at Woolf Flooring for many years.', C: 'She will be helping to collect feedback.', D: 'She works in the production department.' }, correctAnswer: 'B' },
                        { id: '199', questionText: 'In the survey, what does Ms. Mair note about her suggestion?', options: { A: 'It may require some new equipment.', B: 'It has worked well at other companies.', C: 'It could be implemented right away.', D: 'It has been suggested to management before.' }, correctAnswer: 'C' },
                        { id: '200', questionText: "What recommendation made by Miyoko Consulting corresponds with Ms. Mair's suggestion?", options: { A: 'Recommendation 1', B: 'Recommendation 2', C: 'Recommendation 3', D: 'Recommendation 4' }, correctAnswer: 'D' },
                    ]
                }
            ]
        },
        4: {
            id: 4,
            title: 'Part 7 - Test 4',
            part: 7,
            passages: [
                {
                    id: 'passage-7-4-147-148',
                    text: `Zippy Petrol Mart
M64 Motorway
Leicester
0113 4960423
23 May

Biscuits      £2.00
Fruit cup     £0.95
Crisps        £1.10
VAT           £0.81
Inclusive
Total         £4.86

Sign up for our Zippy Club rewards card.
You could have earned 4 Zippy Club points on this transaction.
Points can be used for discounted merchandise, car products,
phone accessories, and more!`,
                    questions: [
                        { id: '147', questionText: 'What was purchased on May 23?', options: { A: 'Fuel', B: 'Snacks', C: 'Auto parts', D: 'Phone accessories' }, correctAnswer: 'B' },
                        { id: '148', questionText: 'What does the receipt indicate about Zippy Petrol Mart?', options: { A: 'It has multiple locations.', B: 'It accepts most major credit cards.', C: 'It has a customer rewards program.', D: 'It reduced the prices of all its merchandise.' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-7-4-149-150',
                    text: `Coming Soon: The Best of PBQ Radio

During the week of April 21-27, PBQ Radio will be hosting a best-of-the-decade program. The most popular tunes by recording artists from the past decade will be played all day long. Both well-known and lesser-known recording artists will be featured. We plan to showcase each artist's top works.

In addition to featuring the best music of the decade, we would like to highlight our region's businesses. Advertising time is available for purchase. Let our listeners know that your business is one of the best in the community! You can request a shout-out for your company from a program host, or our professional marketing team can write and record a 30-second advertisement.

Visit www.pbqradio.com/advertise for details and pricing.`,
                    questions: [
                        { id: '149', questionText: 'For whom most likely was the notice written?', options: { A: 'Radio-show hosts', B: 'New recording artists', C: 'Business owners', D: 'Sound technicians' }, correctAnswer: 'C' },
                        { id: '150', questionText: 'What is true about PBQ Radio?', options: { A: 'It has been in business for ten years.', B: 'It is looking for experienced musicians.', C: 'It was voted the best station in the community.', D: 'It has its own marketing department.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-4-151-152',
                    text: `Frank Jabati [11:12 A.M.]
Hi, Maxine. I'm running late with this delivery today. Could you contact Ms. Dibello to let her know?

Maxine Larsen [11:13 A.M.]
Sure! I know that she is eager to get those new items. She says she needs to set up her kitchen properly so that she can prepare a special meal tonight. What time do you think you will arrive there?

Frank Jabati [11:15 A.M.]
I'm not sure—the road I was taking was closed for repairs. The detour road has heavy traffic.

Maxine Larsen [11:17 A.M.]
Sorry to hear that. What's your estimate?

Frank Jabati [11:19 A.M.]
Maybe around 1 P.M.

Maxine Larsen [11:20 A.M.]
OK, great. I will get in touch with Ms. Dibello to confirm that she will be home at that time. Then I'll get back to you.

Frank Jabati [11:22 A.M.]
Thanks!`,
                    questions: [
                        { id: '151', questionText: 'What most likely has Ms. Dibello purchased?', options: { A: 'Linens', B: 'Bookshelves', C: 'Gardening tools', D: 'Appliances' }, correctAnswer: 'D' },
                        { id: '152', questionText: 'At 11:17 A.M., what does Ms. Larsen most likely mean when she writes, "What\'s your estimate"?', options: { A: 'She must verify the distance of a route.', B: 'She wants to know how much traffic there is.', C: 'She wants to know a delivery time.', D: 'She has to calculate a delivery charge.' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-7-4-153-154',
                    text: `To: Janet Hubschmann
From: customerservice@readymadeofficesupplies.net
Date: September 3
Subject: Thank you

Dear Ms. Hubschmann,
We here at Readymade Office Supplies are excited to welcome you to our Customers Count rewards program. Your account number 41120 is now registered.
Be sure to enter your account number to earn points on all your purchases from our Web site. You will earn one point for every dollar you spend on qualifying purchases. Redeem your points on your account page for rewards, including free two-day expedited shipping, special discounts, and more. You can still order via mail from our print catalog, over the telephone from one of our helpful representatives, or by visiting our retail locations across the United States and Canada. However, those purchases do not currently qualify for the rewards program.
Have questions? Please visit https://www.readymadeofficesupplies.net/customerservice.`,
                    questions: [
                        { id: '153', questionText: 'What types of purchases earn reward points?', options: { A: 'Those made online', B: 'Those made by mail', C: 'Those made by phone', D: 'Those made in a store' }, correctAnswer: 'A' },
                        { id: '154', questionText: 'What is a benefit of the program?', options: { A: 'Invitations to retail events', B: 'Free samples', C: 'Faster shipping', D: 'Extended product warranties' }, correctAnswer: 'C' },
                    ]
                },
                {
                    id: 'passage-7-4-155-157',
                    text: `Native Plant Society Headquarters
161 Sussex Street
Sydney, NSW 2001

15 April

Yasmine Harabi
247 Kooljak Road
Perth, Western Australia 6280

Membership number 4290

Dear Ms. Harabi,
Thank you for your continued support as a society member. Given your recent move, your membership has been transferred to the chapter located in the city of Perth. We will be mailing a replacement member identification card within a few days.
Unlike the chapter in the city of Canberra, the Perth branch meets the first Saturday of every month, so your next meeting will be in three weeks. If you have any questions, please contact us weekdays between 8:00 a.m. and 4:00 p.m. at (08) 5555 0145.

Sincerely,
Leticia Davis
Membership Department`,
                    questions: [
                        { id: '155', questionText: 'What is the purpose of the letter?', options: { A: 'To announce a special event', B: 'To explain changes based on a relocation', C: 'To propose a new meeting time', D: 'To request updated contact information' }, correctAnswer: 'B' },
                        { id: '156', questionText: 'What is suggested about the city of Canberra?', options: { A: 'It is famous for its many gardens.', B: "It houses the headquarters of Ms. Davis' organization.", C: 'It is where Ms. Harabi previously lived.', D: "It is home to some of Australia's rarest plants." }, correctAnswer: 'C' },
                        { id: '157', questionText: 'What can be concluded about the Native Plant Society?', options: { A: 'It is under new leadership.', B: 'Its membership is growing.', C: 'It is raising membership dues.', D: 'Its chapters hold monthly meetings.' }, correctAnswer: 'D' },
                    ]
                },
                {
                    id: 'passage-7-4-158-160',
                    text: `https://www.greenroofplus.com
Basics | Photos | Resources | News

What Are Green Roofs?
Green roofs are an energy-saving option for office buildings and homes. A green roof is one that's covered with grasses, flowers, or other plants. It lowers heating and cooling costs while increasing a structure's aesthetic appeal. This Web site is designed for sharing ideas, photos, and resources to create and maintain a green roof.
Planting a rooftop garden is a rewarding do-it-yourself project, but special waterproofing and other preparations require the services of an experienced contractor. Costs vary widely by region, roof size, and complexity of the garden you want to create. Be sure to get estimates from at least two contractors.
If your contractor determines that your roof can handle the extra weight of soil, plants, and irrigation, ask about the project's timeline. Small, simple rooftop gardens may take only one week to complete.`,
                    questions: [
                        { id: '158', questionText: 'According to the Web page, what can visitors to the Web site do?', options: { A: 'Discuss how to create a garden', B: 'Learn how to maximize vegetable production', C: 'Seek advice about landscaping problems', D: 'Help contractors calculate costs' }, correctAnswer: 'A' },
                        { id: '159', questionText: 'What is NOT mentioned about green roofs?', options: { A: 'They decrease energy bills.', B: 'They remove pollution from the air.', C: 'They make a structure more beautiful.', D: 'They can be installed on commercial and residential buildings.' }, correctAnswer: 'B' },
                        { id: '160', questionText: 'In paragraph 3, line 1, the word "handle" is closest in meaning to', options: { A: 'touch', B: 'control', C: 'deliver', D: 'support' }, correctAnswer: 'D' },
                    ]
                }
            ]
        },
        5: { 
            id: 5, 
            title: 'Part 7 - Test 5', 
            part: 7, 
            passages: [
                {
                    id: 'passage-7-2-196-200', // Note: ID seems inconsistent, but keeping as is from original file
                    text: `--- WEB PAGE 1 ---
https://www.osawacorporateteambuilding.com/home
Osawa Corporate Team Building
Bring your team together to promote cooperation while having fun! Our activities increase job satisfaction and engagement. We do all the planning so you can relax. Simply choose the event that is right for your team.
- Scavenger Hunt—An outdoor game in which teams are given a list of objects to find and photograph with their phone or camera. Group size: 10-50 people. Time: 3 hours.
- Game Day—This is a high-energy game day with fun team activities. This event builds team strength, communication, and problem-solving skills. Group size: 20-500 people. Time: 2 hours.
- Team Painting—Each team member creates a painting outdoors based on a predetermined theme. The paintings are linked together at the end. Group size: 6-30 people. Time: 1-2 hours.
- Robot Building—Your group will be broken into teams. Each team builds a robot to be used in challenges against the others. Group size: 10-30 people. Time: 2-3 hours.
- All Chocolate—Your group will have the chance to use engineering skills to build a tower of chocolate. Then you learn how to make chocolate from a local chocolatier. Group size: 8-150 people. Time: 2 hours.
Book an event in October and receive 15 percent off.

--- WEB PAGE 2 ---
https://www.osawacorporateteambuilding.com/requests
Request Form
Name: Alexandra Peterson
Company name: Whitten Tech
E-mail address: apeterson@whittentech.com
Phone: 617-555-0123
Location and date of event: Downtown Boston, October 15
What events are you interested in? Choose your top three.
1: Game Day | 2: Scavenger Hunt | 3: Team Painting
Number of participants: 28 people
Additional information: We are interested in a fun activity for our sales team before the busy selling season begins. We spend a lot of time in the office, so we want an outdoor event.
We will contact you within three business days with a quote and confirmation.

--- WEB PAGE 3 ---
https://www.osawacorporateteambuilding.com/reviews
What Our Customers Are Saying
Posted by Whitten Tech on October 20
Our team hired Osawa Corporate Team Building to lead an activity for the sales staff at Whitten Tech. The facilitator of the Scavenger Hunt, Lorenzo Benford, was excellent. The 28 members of our sales team all had positive feedback. They reported that they loved exploring the city, learning about its history, and finding new local attractions, even on a cold and cloudy day. I highly recommend this activity. The only downside was that we did not realize how far we would be walking. It would have been helpful to have an idea of the walking distances so we could have been fully prepared.`,
                    questions: [
                        { id: '196', questionText: 'What does the first Web page indicate about the Scavenger Hunt?', options: { A: 'It requires participants to rent a camera.', B: 'It concludes with prizes for participants.', C: 'It is a suitable activity for indoors.', D: 'It takes three hours to complete.' }, correctAnswer: 'D' },
                        { id: '197', questionText: 'What event is best for a group of more than 200 people?', options: { A: 'Game Day', B: 'Team Painting', C: 'Robot Building', D: 'All Chocolate' }, correctAnswer: 'A' },
                        { id: '198', questionText: 'What is suggested about Ms. Peterson?', options: { A: 'She has joined the Building Robots event in the past.', B: 'She will receive a discount on an event.', C: 'She recently started a job at Whitten Tech.', D: 'She used to be an event planner.' }, correctAnswer: 'B' },
                        { id: '199', questionText: 'What can be concluded about Whitten Tech?', options: { A: 'It changed its number of event participants.', B: 'It provided its staff with free passes to museums.', C: 'It was unable to schedule its first-choice activity.', D: 'It was not able to hold its event outside.' }, correctAnswer: 'C' },
                        { id: '200', questionText: 'According to the review, what was disappointing about the event?', options: { A: 'The focus on local history', B: 'The lack of information about walking distances', C: 'The difficulty in keeping the group together', D: 'The uninteresting facilitator' }, correctAnswer: 'B' },
                    ]
                }
            ]
        },
    },
};

// FIX: Export a function to get test data by part and test ID.
export const getReadingTest = (part: number, testId: number): ReadingTestData | null => {
    if (readingTests[part] && readingTests[part][testId]) {
        return readingTests[part][testId];
    }
    return null;
};
