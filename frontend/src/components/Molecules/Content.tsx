import React, { ReactNode } from 'react';
import { customQuery } from '../../utils';
import * as Atoms from '../Atoms';

export type ContentProps = {
  height?: string;
  marginTop?: string;
  header?: ReactNode;
  headerBorderBottom?: string;
  headerRight?: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
};

const Content: React.FC<ContentProps> = (props) => {
  const {
    height,
    marginTop,
    header,
    headerBorderBottom,
    headerRight,
    children,
  } = props;
  const { platform } = customQuery();
  return (
    <Atoms.Div
      height={height}
      width="100%"
      background="var(--white)"
      marginTop={marginTop || '4px'}
    >
      {header && (
        <Atoms.Div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={`var(--padding-${platform})`}
          height="48px"
          boxSizing="border-box"
          borderBottom={headerBorderBottom || '1px solid var(--grey-100)'}
        >
          <Atoms.SubTitle>{header}</Atoms.SubTitle>
          <Atoms.Div display="flex" alignItems="center" fontSize="20px">
            {headerRight}
          </Atoms.Div>
        </Atoms.Div>
      )}
      <Atoms.Div padding={`var(--padding-${platform})`} height="100%">
        {children}
      </Atoms.Div>
    </Atoms.Div>
  );
};

export default Content;
