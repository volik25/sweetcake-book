/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadedFile } from '@shared/img-input/ImgInput.props';
import { IConfigControl } from '@web/utils/admin-config.builder';
import { AuthContext } from '@web/_contexts/AuthContext';
import { FilesService } from '@web/_services/files.service';
import { useContext, useMemo, useState } from 'react';

export function useListWithImg<
  Item extends { id: number },
  CreateDto extends { img?: string | UploadedFile },
  UpdateDto extends { img?: string | UploadedFile }
>(
  itemsData: Item[],
  config: (value?: Item) => IConfigControl[],
  createHandler: (item: CreateDto) => Promise<Item>,
  updateHandler: (id: number, item: UpdateDto) => Promise<unknown>,
  deleteHandler: (id: number) => Promise<unknown>
): UseListResult<Item, CreateDto> {
  const fileService = useMemo(() => new FilesService(), []);
  const [items, setItems] = useState(itemsData || []);
  const { openPanel } = useContext(AuthContext);

  const onCreate = async (item: CreateDto) => {
    if (item.img) {
      if ((item.img as any).imgFile) {
        item.img = await fileService.uploadFile((item.img as any).imgFile);
      } else {
        item.img = (item.img as any).imgSrc;
      }
    }

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
    if (item.img) {
      if ((item.img as any).imgFile) {
        item.img = await fileService.uploadFile((item.img as any).imgFile);
      } else {
        item.img = (item.img as any).imgSrc;
      }
    }
    return await updateHandler(id, item);
  };

  const onCreateClick = (newItem?: Partial<CreateDto>) => {
    const item = { id: (items.at(-1)?.id || 1) + 1, ...(newItem || {}) };
    items.push(item as unknown as Item);
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
        mapFields(item, value, true);
        setItems([...items]);
      }
    );
  };

  const onEditClick = (item: Item) => {
    openPanel(
      config(item),
      async (value) => {
        await onUpdate(item.id, value as UpdateDto);
      },
      (value, isCanceled) => {
        mapFields(item, value, !isCanceled);
        setItems([...items]);
      }
    );
  };

  return [items, onCreateClick, onEditClick, onRemove];
}

function mapFields(item: any, value: any, handleLink?: boolean) {
  Object.keys(value).forEach((key) => {
    if (handleLink && key === 'img') {
      item[key] = value.img?.imgSrc;
      return;
    }
    item[key] = value[key];
  });
}

export type UseListResult<Item, CreateDto> = [
  Item[],
  (initData?: Partial<CreateDto>) => void,
  (item: Item) => void,
  (id: number) => void
];
