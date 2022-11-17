/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadedFile } from '@shared/img-input/ImgInput.props';
import { ConfigControl } from '@web/utils/admin-config.builder';
import { AuthContext } from '@web/_contexts/AuthContext';
import { FilesService } from '@web/_services/files.service';
import { useContext, useMemo, useState } from 'react';

export function useListWithImg<
  Item extends { id: number },
  CreateDto extends { img?: string | UploadedFile },
  UpdateDto extends { img?: string | UploadedFile }
>(
  itemsData: Item[],
  config: () => ConfigControl[],
  createHandler: (item: CreateDto) => Promise<Item>,
  updateHandler: (id: number, item: UpdateDto) => Promise<unknown>,
  deleteHandler: (id: number) => Promise<unknown>
): UseListEditResult<Item> {
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
        mapFields(item, value, true);
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
        mapFields(item, value, !isCanceled);
        setItems([...items]);
      },
      item as any
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

export type UseListEditResult<Item> = [
  Item[],
  () => void,
  (item: Item) => void,
  (id: number) => void
];
