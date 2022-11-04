import { ReactElement, useRef } from 'react';
import { ImgInputProps } from './ImgInput.props';
import styles from './ImgInput.module.scss';
import cn from 'classnames';

export const ImgInput = ({
  className,
  imgSrc,
  onChange,
}: ImgInputProps): ReactElement => {
  const inputEl = useRef<HTMLDivElement>(null);
  const createUploadFileInput = (): HTMLInputElement => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
          <input hidden name="images" type="file" accept="image/*">
        `;

    return wrapper.firstElementChild as HTMLInputElement;
  };

  const uploadImg = () => {
    const fileInput = createUploadFileInput();
    inputEl.current?.append(fileInput);

    fileInput.addEventListener('change', (event) => {
      const t = event.target as HTMLInputElement;
      if (!t.files) {
        return;
      }
      const file = t.files[0];
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        const path = target?.result?.toString();
        if (!path) {
          return;
        }

        onChange({ imgFile: file, imgSrc: path });
      };

      reader.readAsDataURL(file);

      fileInput.remove();
    });

    fileInput.click();
  };
  return (
    <div ref={inputEl} className={cn(className, styles['img-input'])}>
      {imgSrc && <img className="mr-3" src={imgSrc} />}
      <button
        onClick={uploadImg}
        className={cn('btn btn-link', {
          'ps-0': !imgSrc,
        })}
      >{`${imgSrc ? 'Изменить' : 'Добавить'} изображение`}</button>
    </div>
  );
};
