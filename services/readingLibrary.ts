
import { ReadingTestData } from '../types';

// ETS 2024 Tests
import { test1Data } from './reading/test1';
import { test2Data } from './reading/test2';
import { test3Data } from './reading/test3';
import { test4Data } from './reading/test4';
import { test5Data } from './reading/test5';
import { test6Data } from './reading/test6';
import { test7Data } from './reading/test7';
import { test8Data } from './reading/test8';
import { test9Data } from './reading/test9';
import { test10Data } from './reading/test10';

// ETS 700+ Tests
import { test1_700Data } from './reading/reading700/test1';
import { test2_700Data } from './reading/reading700/test2';
import { test3_700Data } from './reading/reading700/test3';
import { test4_700Data } from './reading/reading700/test4';
import { test5_700Data } from './reading/reading700/test5';
import { test6_700Data } from './reading/reading700/test6';
import { test7_700Data } from './reading/reading700/test7';
import { test8_700Data } from './reading/reading700/test8';
import { test9_700Data } from './reading/reading700/test9';
import { test10_700Data } from './reading/reading700/test10';

// ETS 2023 Tests
import { test1_2023Data } from './reading/reading2023/test1';
import { test2_2023Data } from './reading/reading2023/test2';
import { test3_2023Data } from './reading/reading2023/test3';
import { test4_2023Data } from './reading/reading2023/test4';
import { test5_2023Data } from './reading/reading2023/test5';
import { test6_2023Data } from './reading/reading2023/test6';
import { test7_2023Data } from './reading/reading2023/test7';
import { test8_2023Data } from './reading/reading2023/test8';
import { test9_2023Data } from './reading/reading2023/test9';
import { test10_2023Data } from './reading/reading2023/test10';


interface TestSet {
    id: number;
    title: string;
    description: string;
    parts: {
        part5?: ReadingTestData;
        part6?: ReadingTestData;
        part7?: ReadingTestData;
    }
}

export const allReadingTests: TestSet[] = [
    { id: 1, title: '2024 Test 1', description: "Full test with Part 5, 6, 7.", parts: test1Data },
    { id: 2, title: '2024 Test 2', description: "Full test with Part 5, 6, 7.", parts: test2Data },
    { id: 3, title: '2024 Test 3', description: "Full test with Part 5, 6, 7.", parts: test3Data },
    { id: 4, title: '2024 Test 4', description: "Full test with Part 5, 6, 7.", parts: test4Data },
    { id: 5, title: '2024 Test 5', description: "Full test with Part 5, 6, 7.", parts: test5Data },
    { id: 6, title: '2024 Test 6', description: "Full test with Part 5, 6, 7.", parts: test6Data },
    { id: 7, title: '2024 Test 7', description: "Full test with Part 5, 6, 7.", parts: test7Data },
    { id: 8, title: '2024 Test 8', description: "Full test with Part 5, 6, 7.", parts: test8Data },
    { id: 9, title: '2024 Test 9', description: "Full test with Part 5, 6, 7.", parts: test9Data },
    { id: 10, title: '2024 Test 10', description: "Full test with Part 5, 6, 7.", parts: test10Data },
];

export const allReading700Tests: TestSet[] = [
    { id: 701, title: '700+ Test 1', description: "Full test with Part 5, 6, 7.", parts: test1_700Data },
    { id: 702, title: '700+ Test 2', description: "Full test with Part 5, 6, 7.", parts: test2_700Data },
    { id: 703, title: '700+ Test 3', description: "Full test with Part 5, 6, 7.", parts: test3_700Data },
    { id: 704, title: '700+ Test 4', description: "Full test with Part 5, 6, 7.", parts: test4_700Data },
    { id: 705, title: '700+ Test 5', description: "Full test with Part 5, 6, 7.", parts: test5_700Data },
    { id: 706, title: '700+ Test 6', description: "Full test with Part 5, 6, 7.", parts: test6_700Data },
    { id: 707, title: '700+ Test 7', description: "Full test with Part 5, 6, 7.", parts: test7_700Data },
    { id: 708, title: '700+ Test 8', description: "Full test with Part 5, 6, 7.", parts: test8_700Data },
    { id: 709, title: '700+ Test 9', description: "Full test with Part 5, 6, 7.", parts: test9_700Data },
    { id: 710, title: '700+ Test 10', description: "Full test with Part 5, 6, 7.", parts: test10_700Data },
];

export const allReading2023Tests: TestSet[] = [
    { id: 202301, title: '2023 Test 1', description: "Full test with Part 5, 6, 7.", parts: test1_2023Data },
    { id: 202302, title: '2023 Test 2', description: "Full test with Part 5, 6, 7.", parts: test2_2023Data },
    { id: 202303, title: '2023 Test 3', description: "Full test with Part 5, 6, 7.", parts: test3_2023Data },
    { id: 202304, title: '2023 Test 4', description: "Full test with Part 5, 6, 7.", parts: test4_2023Data },
    { id: 202305, title: '2023 Test 5', description: "Full test with Part 5, 6, 7.", parts: test5_2023Data },
    { id: 202306, title: '2023 Test 6', description: "Full test with Part 5, 6, 7.", parts: test6_2023Data },
    { id: 202307, title: '2023 Test 7', description: "Full test with Part 5, 6, 7.", parts: test7_2023Data },
    { id: 202308, title: '2023 Test 8', description: "Full test with Part 5, 6, 7.", parts: test8_2023Data },
    { id: 202309, title: '2023 Test 9', description: "Full test with Part 5, 6, 7.", parts: test9_2023Data },
    { id: 202310, title: '2023 Test 10', description: "Full test with Part 5, 6, 7.", parts: test10_2023Data },
];

const allTests: TestSet[] = [...allReadingTests, ...allReading700Tests, ...allReading2023Tests];

export const getReadingTest = (testId: number, partNum: number): ReadingTestData | undefined => {
    const testSet = allTests.find(t => t.id === testId);
    if (!testSet) return undefined;

    switch(partNum) {
        case 5: return testSet.parts.part5;
        case 6: return testSet.parts.part6;
        case 7: return testSet.parts.part7;
        default: return undefined;
    }
};
