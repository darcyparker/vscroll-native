import type {
  IAdapterItem,
  IDatasource,
  Item
} from './vscroll';
// import type {Constructor} from 'type-fest';

import consumer from './version';

import { Id, workflowStorage } from './workflow-storage';

const VSCROLL_ELEMENT_ATTR = 'data-vscroll';

export type Template<Data, TemplateResult> = (item: IAdapterItem<Data>) => TemplateResult;

export type NormalizedTemplate<Data, Renderable> = (item: Item<Data>) => Renderable;

export interface IScrollerParams<Data, TemplateResult> {
  element: HTMLElement;
  datasource: IDatasource<Data>;
  template: Template<Data, TemplateResult>;
}

export interface IScroller<Data> {
  id: Id;
  viewport: HTMLElement;
  datasource: IDatasource<Data>;
  scrollable: HTMLElement;
  dispose(): void;
}

export type RenderTemplate<TemplateResult, Renderable> = <Data>(
  template: Template<Data, TemplateResult>,
  item: Item<Data>
) => Renderable; //Example Renderable is HTMLElement

export type Renderer<Renderable> = (where: HTMLElement, renderable: Renderable) => HTMLElement

//makeNewElements is private to vscrollerFactory/Scroller
//* Extracted here rather than a private method because mixin and class factories cannot
//  have private methods
//* Tried [symbol] methods, but then there is an error creating typescript definitions because
//  the symbol is not nameable because we want to keep it private
const makeNewElements = <Data, Renderable>(
    id: Id,
    template: NormalizedTemplate<Data, Renderable>,
    oldItems: Item<Data>[],
    newItems: Item<Data>[]
): { list: Renderable[], before: HTMLElement } => {
    let before = workflowStorage.get(id).scroller.viewport.paddings.forward.element;
    const list = [];
    for (let i = newItems.length - 1; i >= 0; i--) {
        const item = newItems[i];
        if (oldItems.includes(item)) {
            if (!list.length) {
                before = item.element;
                continue;
            } else {
                break;
            }
        }
        list.unshift(template(item));
    }
    return { before, list };
};

//onItemsChanged is private to vscrollerFactory/Scroller
//* Extracted here rather than a private method because mixin and class factories cannot
//  have private methods
//* Tried [symbol] methods, but then there is an error creating typescript definitions because
//  the symbol is not nameable because we want to keep it private
const onItemsChanged = <Data, Renderable>(
  id: Id,
  template: NormalizedTemplate<Data, Renderable>,
  renderer: Renderer<Renderable>,
  oldItems: Item<Data>[],
  newItems: Item<Data>[]
) => {
    oldItems
      .filter(item => !newItems.includes(item))
      .forEach(item => item.element && item.element.remove());
    const { list, before } = makeNewElements(id, template, oldItems, newItems);
    list.forEach(elt =>
      //TODO: equivalent for Renderable
      //TODO: Remove this casting it breaks uhtml of course, but allows for verification for now
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      before.insertAdjacentElement('beforebegin', elt as any as HTMLElement)
    );
};

//* TODO: To discuss: Catch 22... (remove this comment after discussion)
//  * If declared with type-fest's Constructor<...>, we loose fact that Constructor has a generic
//  * But if we just let typescript infer the return type (which is determinable),
//    then there is an eslint error. (I think it is safe to ignore the eslint error). But then typescript
//    throws TS4094 error because exported class expression may not be private or protected
//     * See https://github.com/microsoft/TypeScript/issues/17744
//     * Looks like we need abstract class, but I like it better when the returned Scroller class
//       only has 1 generic argument:
//       * vscrollerFactory() is only aware of <TemplateResult> (It doesn't care what Data is)
//       * And the details of the renderTemplate are private and not exposed in generic args for Scroller
//     => So I am continuing with factory/mixin approach
//  * Note: I tried using symbols for the 3 private methods... to make them private-like, but this does not
//    leads to problems creating the type definitions because the symbols are not nameable.
//  * So I decided to try making the methods (helpers really) private via closure
//
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const vscrollerFactory = <TemplateResult, Renderable>(
  renderTemplate: RenderTemplate<TemplateResult, Renderable>,
  renderer: Renderer<Renderable>
)/*: Constructor<IScroller<unknown>, [IScrollerParams<unknown, TemplateResult>]>*/ =>
  class Scroller<Data> implements IScroller<Data> {
    public id: Id;
    public viewport: HTMLElement;
    public datasource: IDatasource<Data>;
    public scrollable: HTMLElement;

    constructor({
      element, datasource, template
    }: IScrollerParams<Data, TemplateResult>) {
      if (!element) {
        throw 'No viewport element found';
      }
      this.viewport = element;
      this.datasource = datasource;

      //setScrollableDefaults: inlined because mixins and class factories can't have private methods
      //* Using symbol makes method private-like, but then there are creating type definition because
      //  the symbol can't be named in type definition
      this.scrollable = this.viewport.querySelector(`[${VSCROLL_ELEMENT_ATTR}]`) as HTMLElement;
      if (this.scrollable) {
        return;
      }
      //TODO: render the following with renderer
      this.scrollable = document.createElement('div');
      this.scrollable.setAttribute(VSCROLL_ELEMENT_ATTR, '');
      const paddingBackward = document.createElement('div');
      paddingBackward.setAttribute('data-padding-backward', '');
      const paddingForward = document.createElement('div');
      paddingForward.setAttribute('data-padding-forward', '');
      this.scrollable.appendChild(paddingBackward);
      this.scrollable.appendChild(paddingForward);
      this.viewport.appendChild(this.scrollable);

      const normalizedTemplate = (item: Item<Data>) => renderTemplate(template, item);

      this.id = workflowStorage.add<Data>({
        consumer,
        element: this.scrollable,
        //TODO: datasource is cast temporarily as IDatasource<unknown> until
        //WorkflowParams is fixed in workflow-storage.ts
        datasource: this.datasource as IDatasource<unknown>,
        onItemsChanged: (oldItems: Item<Data>[], newItems: Item<Data>[]) => {
          onItemsChanged<Data, Renderable>(
            this.id,
            normalizedTemplate,
            renderer,
            oldItems,
            newItems
          );
        }
      });
    }

    dispose(): void {
      workflowStorage.clear(this.id);
    }
  };
