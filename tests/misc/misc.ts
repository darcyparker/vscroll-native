import { Workflow } from '../../src/vscroll';
import { workflowStorage } from '../../src/workflow-storage';
import { Scroller as AppScroller, IScroller, Datasource, IAdapter, Template } from '../../src/index';
import { Item, DatasourceWithAdapter } from './types';

const getDefaultViewportTemplate = () => `<div class="viewport" id="viewport">
  <div data-vscroll>
    <div data-padding-backward></div>
    <div data-padding-forward></div>
  </div>
</div>`;

const getDefaultItemTemplate: Template<Item, string> = item =>
  `<div class="item"><span>${item.data.id}</span>) ${item.data.text}</div>`;

const getDefaultDatasource = <Data>() => new Datasource<Data>({
  get: (index, count, success) => {
    const data: Data[] = [];
    for (let i = index; i <= index + count - 1; i++) {
      data.push({ id: i, text: 'item #' + i } as unknown as Data);
    }
    success(data);
  },
});

export class Misc {
  element: HTMLElement;
  appScroller: IScroller<Item>;
  datasource: DatasourceWithAdapter<Item>;
  adapter: IAdapter<Item>;
  workflow: Workflow<Item>;
  scroller: Workflow<Item>['scroller'];

  constructor() {
    this.element = this.prepareViewportElement();
    const template = getDefaultItemTemplate;
    this.datasource = getDefaultDatasource();
    this.adapter = this.datasource.adapter;

    this.appScroller = new AppScroller<Item>({
      element: this.element,
      datasource: this.datasource,
      template
    });

    this.workflow = workflowStorage.get(this.appScroller.id);
    this.scroller = this.workflow.scroller;
  }

  prepareViewportElement(): HTMLElement {
    const element = document.createElement('template');
    element.innerHTML = getDefaultViewportTemplate();
    const viewport = element.content.childNodes[0] as HTMLElement;
    document.body.appendChild(viewport);
    return viewport;
  }

  clear(): void {
    this.appScroller.dispose();
    document.body.innerHTML = '';
  }
}
