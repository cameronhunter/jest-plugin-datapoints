import product from 'cartesian-product';
import createTemplateLiteral from 'jest-each-table';
import type { Global } from '@jest/types';
import type { TestSuiteArgs } from './types';

export function createDatapointSuite<TDatapoints extends Record<string, any[]>>(
  test: Global.ItBase,
  datapoints: TDatapoints
) {
  const [templateStringsArray, ...expressions] = createTable(datapoints);

  return (...args: TestSuiteArgs<TDatapoints>) => {
    /**
     * If there's no title with the test, then we'll use the JSON value as a
     * default.
     */
    const params = typeof args[0] === 'string' ? args : ['$_', ...args];

    // @ts-expect-error – We're making use of `each`'s template tag function.
    return test.each(templateStringsArray, ...expressions)(...params);
  };
}

export function createTable<TDatapoints extends Record<string, any[]>>(datapoints: TDatapoints) {
  const keys = Object.keys(datapoints) as Array<keyof TDatapoints>;
  const values = Object.values(datapoints) as Array<TDatapoints[string]>;

  const testcases = product(values).map((testcase) => {
    const datapoint = testcase.reduce((state, value, index) => {
      const key = keys[index]!;
      return { ...state, [key]: value };
    }, {} as { [key in keyof TDatapoints]: TDatapoints[key][number] });

    return { ...datapoint, _: JSON.stringify(datapoint) };
  });

  return createTemplateLiteral(testcases);
}
