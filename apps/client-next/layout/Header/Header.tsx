import React, { ReactElement, useContext, useMemo, useState } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import { AuthContext } from '../../_contexts/AuthContext';
import { headerConfig } from './header.config';
import { StaticService } from '@web/_services/static.service';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { FilesService } from '@web/_services/files.service';

export const Header = ({
  className,
  headerData,
}: HeaderProps): ReactElement => {
  const staticService = useMemo(() => new StaticService(), []);
  const fileService = useMemo(() => new FilesService(), []);
  const { openPanel, panelConfig, isAdmin } = useContext(AuthContext);
  const [headerValues, setHeaderValues] = useState<HeaderDto>(headerData);

  const onHeaderSave = async (value: any) => {
    const newHeader = { ...headerValues, ...value };
    if (newHeader.logo?.imgFile) {
      newHeader.logo = await fileService.uploadFile(
        (newHeader.logo as any).imgFile
      );
    } else {
      newHeader.logo = newHeader.logo?.imgSrc;
    }

    await staticService.updateHeader(newHeader);
    setHeaderValues(newHeader);
  };

  return (
    <header className={cn(className, styles.header)}>
      {isAdmin && !panelConfig && (
        <button
          className="btn btn-primary"
          onClick={() =>
            openPanel(headerConfig(headerData), onHeaderSave, (value) => {
              Object.keys(headerValues).forEach((key) => {
                if (key == 'logo') {
                  headerValues.logo = value.logo?.imgSrc || value.logo;
                  return;
                }
                headerValues[key as keyof typeof headerValues] = value[key];
              });
              setHeaderValues({ ...headerValues });
            })
          }
        >
          Изменить шапку
        </button>
      )}
      <div
        className={cn(styles.header__logo, 'mb-2')}
        style={{ backgroundImage: `url(${headerValues.logo})` }}
      ></div>
      <p>{headerValues.title}</p>
      <p>{headerValues.product}</p>
      <p style={{ whiteSpace: 'pre' }}>{headerValues.description}</p>
      <b>{headerValues.delivary}</b>
    </header>
  );
};
