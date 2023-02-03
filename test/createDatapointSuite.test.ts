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
    a: [true, false],
    b: [true, false]
  });

  expect(stringify(table)).toMatchInlineSnapshot(`
"
testcaseIndex|a|b|_
1|true|true|{"a":true,"b":true}
2|true|false|{"a":true,"b":false}
3|false|true|{"a":false,"b":true}
4|false|false|{"a":false,"b":false}
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
