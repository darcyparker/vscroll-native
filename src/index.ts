import {
  IDatasource,
  IAdapter,
  makeDatasource,
} from './vscroll';

import { Template, IScroller } from './vscroller-factory';
import { Scroller } from './vscroll-native';
import { UhtmlScroller } from './vscroll-uhtml';

const Datasource = makeDatasource();

export { IScroller, Scroller, UhtmlScroller, Datasource, Template, IDatasource, IAdapter };
