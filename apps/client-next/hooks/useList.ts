/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigControl } from '@web/utils/admin-config.builder';
import { AuthContext } from '@web/_contexts/AuthContext';
import { useContext, useState } from 'react';

export function useList<Item extends { id: number }, CreateDto, UpdateDto>(
  itemsData: Item[],
  config: () => ConfigControl[],
  createHandler: (item: CreateDto) => Promise<Item>,
  updateHandler: (id: number, item: UpdateDto) => Promise<unknown>,
  deleteHandler: (id: number) => Promise<unknown>
): UseListEditResult<Item> {
  const [items, setItems] = useState(itemsData || []);
  const { openPanel } = useContext(AuthContext);

  const onCreate = async (item: CreateDto) => {
    return await createHandler(item);
  };

  const onRemove = async (id: number) => {
    if (!confirm('Уверены, что хотите удалить элемент?')) {
      return;
    }
    await deleteHandler(id);
    setItems(items.filter((c) => c.id !== id));
  };

  const onUpdate = async (id: number, item: UpdateDto) => {
    return await updateHandler(id, item);
  };

  const onCreateClick = () => {
    const item = { id: (items.at(-1)?.id || 1) + 1 };
    items.push(item as Item);
    setItems([...items]);
    openPanel(
      config(),
      async (value) => {
        const { id } = await onCreate(value as any);
        item.id = id;
      },
      (value, isCanceled) => {
        if (isCanceled) {
          setItems([...items.filter((c) => c.id !== item.id)]);
          return;
        }
        mapFields(item, value);
        setItems([...items]);
      }
    );
  };

  const onEditClick = (item: Item) => {
    openPanel(
      config(),
      async (value) => {
        await onUpdate(item.id, value as UpdateDto);
      },
      (value, isCanceled) => {
        mapFields(item, value);
        setItems([...items]);
      },
      item as any
    );
  };

  return [items, onCreateClick, onEditClick, onRemove];
}

function mapFields(item: any, value: any) {
  Object.keys(value).forEach((key) => {
    item[key] = value[key];
  });
}

export type UseListEditResult<Item> = [
  Item[],
  () => void,
  (item: Item) => void,
  (id: number) => void
];
