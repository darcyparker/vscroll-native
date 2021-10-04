import type {Item} from './vscroll';
import {
  vscrollerFactory,
  Template
} from './vscroller-factory';

export type {
  IScrollerParams,
  IScroller,
  Template
} from './vscroller-factory';

//TODO: rename vscroll-native.ts to something like `vscroll-innerhtmlTemplate.ts`
export const Scroller = vscrollerFactory(
  <Data>(
      innerHTMLTemplate: Template<Data, string>,
      item: Item<Data>
  ): HTMLElement => {
      const template = document.createElement('template');
      template.innerHTML = innerHTMLTemplate(item.get());
      const element = template.content.childNodes[0] as HTMLElement;
      element.setAttribute('data-sid', String(item.$index));
      if (item.invisible) {
          element.style.position = 'fixed';
          element.style.left = '-99999px';
      }
      return element;
  },
  (where: HTMLElement, renderable: HTMLElement) => {
    where.appendChild(renderable);
    return where;
  }
);
