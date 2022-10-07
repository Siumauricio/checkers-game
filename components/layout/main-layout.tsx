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
            px: '$6',
            height: '100vh',
            maxWidth: '100vw',
            backgroundColor: '$accents0',
         }}
      >
         {children}
      </Box>
   );
};
