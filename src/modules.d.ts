declare module 'cartesian-product' {
  export default function <TValues>(values: TValues[]): Array<TValues[]>;
}

declare module 'jest-each-table' {
  export default function <TDatapoints extends Record<string, any[]>>(
    testcases: Array<{
      [key in keyof TDatapoints]: TDatapoints[key][number];
    }>
  ): [TemplateStringsArray, ...Array<TDatapoints[key][number]>];
}
