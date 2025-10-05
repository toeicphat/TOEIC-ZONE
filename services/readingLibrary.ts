import { ReadingTestData } from '../types';
import { readingPart5Tests } from './readingPart5Library';
import { readingPart6Tests } from './readingPart6Library';
import { readingPart7Tests } from './readingPart7Library';

const readingTests: Record<number, Record<number, ReadingTestData>> = {
    5: readingPart5Tests,
    6: readingPart6Tests,
    7: readingPart7Tests,
};

export const getReadingPart = (partId: number): Record<number, ReadingTestData> | null => {
    return readingTests[partId] || null;
}

export const getReadingTest = (partId: number, testId: number): ReadingTestData | null => {
    const part = getReadingPart(partId);
    return part ? (part[testId] || null) : null;
}
