import React from 'react';
import {Box} from '../styles/box';

interface Props {
   children: React.ReactNode;
}

export const MainLayout = ({children}: Props) => {
   return (
      <Box
         css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            maxWidth: '100vw',
            backgroundColor: '$accents0',
            gap: '$10',
         }}
      >
         {children}
      </Box>
   );
};
