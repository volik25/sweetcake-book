/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConfigControl } from '@web/utils/admin-config.builder';
import { AuthContext } from '@web/_contexts/AuthContext';
import { useContext, useState } from 'react';
import { UseListResult } from './useListWithImg';

export function useList<Item extends { id: number }, CreateDto, UpdateDto>(
  itemsData: Item[],
  config: () => IConfigControl[],
  createHandler: (item: CreateDto) => Promise<Item>,
  updateHandler: (id: number, item: UpdateDto) => Promise<unknown>,
  deleteHandler: (id: number) => Promise<unknown>
): UseListResult<Item, CreateDto> {
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

  const onCreateClick = (newItem?: Partial<CreateDto>) => {
    const item = { id: (items.at(-1)?.id || 1) + 1, ...(newItem || {}) };
    items.push(item as Item);
    setItems([...items]);
    openPanel(
      config(),
      async (value) => {
        mapFields(item, value);
        const { id } = await onCreate(item as any);
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
      (value) => {
        mapFields(item, value);
        setItems([...items]);
      }
    );
  };

  return [items, onCreateClick, onEditClick, onRemove];
}

function mapFields(item: any, value: any) {
  Object.keys(value).forEach((key) => {
    item[key] = value[key];
  });
}
