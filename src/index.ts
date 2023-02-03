import { createDatapointSuite } from './createDatapointSuite';
import { test, it, xtest, xit, fit } from '@jest/globals';
import type { Global as Jest } from '@jest/types';

import './types';

for (const jestMethod of [test, it, xtest, xit, fit]) {
  function datapoints<TDatapoints extends Record<string, any[]>>(datapoints: TDatapoints) {
    return createDatapointSuite(jestMethod, datapoints);
  }

  jestMethod.datapoints = datapoints;

  if (isItConcurrent(jestMethod)) {
    jestMethod.only.datapoints = datapoints;
    jestMethod.skip.datapoints = datapoints;
  }
}

function isItConcurrent(method: Jest.ItBase | Jest.ItConcurrent): method is Jest.ItConcurrent {
  return 'only' in method && 'skip' in method;
}
