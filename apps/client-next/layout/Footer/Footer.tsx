import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import styles from './Footer.module.scss';
import { FooterProps } from './Footer.props';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export interface FileUpload {
    path: string;
    file: File;
}

export const Footer = ({ className }: FooterProps): ReactElement => {
    const inputEl = useRef<HTMLDivElement>(null);
    const [upload, setUpload] = useState<FileUpload | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, [upload]);

    const createUploadFileInput = (): HTMLInputElement => {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = `
          <input hidden name="images" type="file" accept="image/*">
        `;

        return wrapper.firstElementChild as HTMLInputElement;
    };

    const onFileUpload = () => {
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

                setUpload({ path, file });
            };

            reader.readAsDataURL(file);

            fileInput.remove();
        });

        fileInput.click();
    };

    return (
        <>
            <footer className={cn(styles['main-menu'], className)}>
                <NavLink to="/" className={styles['main-menu__item']}>
                    <i className="fas fa-home"></i>
                </NavLink>
                <NavLink to="/search" className={styles['main-menu__item']}>
                    <i className="fas fa-search"></i>
                </NavLink>
                <div onClick={() => onFileUpload()} className={styles['main-menu__item']}>
                    <i className="fas fa-plus"></i>
                </div>
                <NavLink to="/actions" className={styles['main-menu__item']}>
                    <i className="far fa-heart"></i>
                </NavLink>
                <div ref={inputEl}></div>
            </footer>
        </>
    );
};
