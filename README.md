# jest-datapoints-plugin

This is a Jest plugin which adds a `datapoints` method to `test` and `it`. Its
use is to provide a combinatorial test suite from user-provided data points.
This, mixed with snapshots, provides _high_ levels of coverage of the function
under test at the cost of human verification of the results.

Example:

```ts
const suite = test.datapoints({
  a: [true, false],
  b: [true, false]
});

suite(({ a, b }) => {
  expect(a && b).toMatchSnapshot();
});

// Test suites can also have titles which use the `$<field>` syntax to use
// data point values in the name.
suite('a: $a, b: $b', ({ a, b }) => {
  expect(a && b).toMatchSnapshot();
});
```

The above example will create four test cases (the cartesian product of the
datapoints) and the resulting snapshot will look something like:

```js
exports[`snapshot {"a":false,"b":false} 1`] = `false`;

exports[`snapshot {"a":false,"b":true} 1`] = `false`;

exports[`snapshot {"a":true,"b":false} 1`] = `false`;

exports[`snapshot {"a":true,"b":true} 1`] = `true`;
```

## Installation

```sh
$ yarn add --dev jest-plugin-datapoints
```

Add the plugin to your Jest configuration:

```json
{
  "setupFilesAfterEnv": ["jest-plugin-datapoints"]
}
```

If you're using TypeScript, you can add `jest-plugin-datapoints/types.d.ts` to
your `types` field in `tsconfig.json`. The values injected in the test case
will be fully typed from the inputs provided to the `datapoints` function.
