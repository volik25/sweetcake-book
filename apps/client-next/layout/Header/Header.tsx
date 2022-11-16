import React, { ReactElement, useContext, useMemo, useState } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import { AuthContext } from '../../_contexts/AuthContext';
import { headerConfig } from './header.config';
import { StaticService } from '@web/_services/static.service';
import { UpdateHeaderDto } from '@interfaces/static/dtos/update-header.dto';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';

export const Header = ({
  className,
  headerData,
}: HeaderProps): ReactElement => {
  const staticService = useMemo(() => new StaticService(), []);
  const { openPanel, panelConfig } = useContext(AuthContext);
  const [headerValues, setHeaderValues] = useState<HeaderDto>(headerData);

  const onHeaderSave = async (value: UpdateHeaderDto) => {
    const newHeader = { ...headerValues, ...value, logo: headerValues.logo };
    await staticService.updateHeader(newHeader);
    setHeaderValues(newHeader);
  };

  return (
    <header className={cn(className, styles.header)}>
      {!panelConfig && (
        <button
          className="btn btn-primary"
          onClick={() =>
            openPanel(
              headerConfig(),
              onHeaderSave,
              (value) => {
                Object.keys(headerValues).forEach((key) => {
                  if (key == 'logo') {
                    headerValues.logo = value.logo?.imgSrc || value.logo;
                    return;
                  }
                  headerValues[key as keyof typeof headerValues] = value[key];
                });
                setHeaderValues({ ...headerValues });
              },
              headerValues as any
            )
          }
        >
          Изменить шапку
        </button>
      )}
      <img className={styles.header__logo} src={headerValues.logo} alt="" />
      <p>{headerValues.title}</p>
      <p>{headerValues.product}</p>
      <p style={{ whiteSpace: 'pre' }}>{headerValues.description}</p>
      <b>{headerValues.delivary}</b>
    </header>
  );
};
