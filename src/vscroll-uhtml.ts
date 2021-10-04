import {render} from 'uhtml';
import type {Renderable} from 'uhtml';
import type {Item} from './vscroll';
import {
  vscrollerFactory,
  Template
} from './vscroller-factory';

export type {
  IScrollerParams,
  IScroller
} from './vscroller-factory';

//For UhtmlScroller, IScrollerParams expects templates of the form:
//(item: IAdapterItem<Data>) => html`id: ${item.data.id}`
export const UhtmlScroller = vscrollerFactory(
  <Data>(
    template: Template<Data, Renderable>,
    item: Item<Data>
  ): Renderable => template(item.get()),
  //TODO: need to add these attributes or provide another mechanism
  // element.setAttribute('data-sid', String(item.$index));
  // if (item.invisible) {
  //     element.style.position = 'fixed';
  //     element.style.left = '-99999px';
  // }
  render
);
