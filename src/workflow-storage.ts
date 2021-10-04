import { Workflow, WorkflowParams, Item, IDatasource } from './vscroll';

export type Id = number;

interface WorkflowBox<MyItem> {
  workflow: Workflow<MyItem>;
  items: Item<MyItem>[];
}

interface MyWorkflowParams<MyItem> extends Omit<WorkflowParams<MyItem>, 'run'> {
  onItemsChanged: (oldItems: Item<MyItem>[], newItems: Item<MyItem>[]) => void;
}

class WorkflowStorage {
  maxId: Id = 0;
  map: Map<Id, WorkflowBox<unknown>> = new Map();

  add<MyItem>(params: MyWorkflowParams<MyItem>): Id {
    const {consumer, element, datasource, onItemsChanged} = params;
    const box: Partial<WorkflowBox<MyItem>> & Pick<WorkflowBox<MyItem>, 'items'> = {
      items: []
    };
    //Note: box is defined before box.workflow because run() is called by new Workflow() 
    //and expects box.items to be defined
    box.workflow = new Workflow<MyItem>({
        consumer,
        element,
        datasource,
        run: (items: Item<MyItem>[]) => {
            if (!items.length && !box.items.length) {
                return;
            }
            onItemsChanged(box.items, items);
            box.items = items;
        }
    });
    this.maxId++;
    //Now box is of type WorkflowBox<MyItem>
    //* cast as WorkflowBox<unknown> for storage in this.map
    this.map.set(this.maxId, box as WorkflowBox<unknown>);
    return this.maxId;
  }

  getBox<MyItem>(id: Id): WorkflowBox<MyItem> {
    //Now box is of type WorkflowBox<MyItem>
    //* cast back to WorkflowBox<MyItem> | undefined
    //* It is expected caller of getBox() knows <MyItem> type for id, otherwise
    //  it will be inferred as `unknown`
    const box = this.map.get(id) as WorkflowBox<MyItem> | undefined;
    if (!box) {
      throw 'Can\'t get the Workflow';
    }
    return box;
  }

  get<MyItem>(id: Id): Workflow<MyItem> {
    return this.getBox<MyItem>(id).workflow;
  }

  clear(id: Id): void {
    this.get(id).dispose();
    this.map.delete(id);
  }
}

export const workflowStorage = new WorkflowStorage();
