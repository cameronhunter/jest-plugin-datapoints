import * as globals from '@jest/globals';

describe('Using @jest/globals package', () => {
  describe('test', () => {
    const suite = globals.test.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  describe('it', () => {
    const suite = globals.it.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  /**
   * These tests should be marked as skipped in the test suite.
   */
  describe('xtest', () => {
    const suite = globals.xtest.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  /**
   * These tests should be marked as skipped in the test suite.
   */
  describe('xit', () => {
    const suite = globals.xit.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });
});

describe('Using global variable', () => {
  describe('test', () => {
    const suite = test.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  describe('it', () => {
    const suite = it.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  /**
   * These tests should be marked as skipped in the test suite.
   */
  describe('xtest', () => {
    const suite = xtest.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });

  /**
   * These tests should be marked as skipped in the test suite.
   */
  describe('xit', () => {
    const suite = xit.datapoints({
      one: [1, 2, 3],
      two: ['a', 'b', 'c']
    });

    suite('Testcase: $one, $two', ({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });

    suite(({ one, two }) => {
      expect(one).toEqual(expect.any(Number));
      expect(two).toEqual(expect.any(String));
    });
  });
});
