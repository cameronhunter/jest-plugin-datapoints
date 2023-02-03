import { createTable, createDatapointSuite } from '../src/createDatapointSuite';
import type { Global } from '@jest/types';

test('it creates a test suite from the datapoints', () => {
  const test = jest.fn();
  const each = jest.fn(() => test);

  const datapoints = {
    one: [1, 2, 3],
    two: ['a', 'b', 'c']
  };

  const testsuite = createDatapointSuite({ each } as any as Global.ItBase, datapoints);

  testsuite('Testing $one, $two', ({ one, two }) => {
    // These expectations aren't really executed, they're just there so that we test the types.
    expect(one).toEqual(expect.any(Number));
    expect(two).toEqual(expect.any(String));
  });

  expect(each).toHaveBeenCalledTimes(1);
  expect(test).toHaveBeenLastCalledWith('Testing $one, $two', expect.any(Function));

  testsuite(({ one, two }) => {
    // These expectations aren't really executed, they're just there so that we test the types.
    expect(one).toEqual(expect.any(Number));
    expect(two).toEqual(expect.any(String));
  });

  expect(each).toHaveBeenCalledTimes(2);
  expect(test).toHaveBeenLastCalledWith('$_', expect.any(Function));
});

test('it creates a table of test cases from the datapoints', () => {
  const table = createTable({
    one: [1, 2, 3],
    two: ['a', 'b', 'c']
  });

  expect(stringify(table)).toMatchInlineSnapshot(`
"
testcaseIndex|one|two|_
1|1|a|{"one":1,"two":"a"}
2|1|b|{"one":1,"two":"b"}
3|1|c|{"one":1,"two":"c"}
4|2|a|{"one":2,"two":"a"}
5|2|b|{"one":2,"two":"b"}
6|2|c|{"one":2,"two":"c"}
7|3|a|{"one":3,"two":"a"}
8|3|b|{"one":3,"two":"b"}
9|3|c|{"one":3,"two":"c"}
"
`);
});

/**
 * Take tagged template inputs and create a grid that would look like what a
 * developer would have manually typed.
 */
function stringify(data: [strings: TemplateStringsArray, ...expressions: Array<any>]) {
  let result = '';
  let expressionIndex = 1;

  for (let i = 0, len = data[0].length; i < len; i++) {
    const string = data[0][i];
    result += string;

    if (i < len - 1) {
      result += data[expressionIndex + i];
    }
  }

  return result;
}
