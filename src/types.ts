export type TestSuiteArgs<TDatapoints extends Record<string, any[]>> =
  | [string, (testcase: { [key in keyof TDatapoints]: TDatapoints[key][number] }) => unknown]
  | [(testcase: { [key in keyof TDatapoints]: TDatapoints[key][number] }) => unknown];

type Datapoints = <TDatapoints extends Record<string, any[]>>(
  datapoints: TDatapoints
) => (...args: TestSuiteArgs<TDatapoints>) => void;

declare module '@jest/types' {
  namespace Global {
    interface ItBase {
      datapoints: Datapoints;
    }
  }
}

declare global {
  namespace jest {
    interface It {
      datapoints: Datapoints;
    }
  }
}
