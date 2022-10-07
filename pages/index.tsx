import type {NextPage} from 'next';
import {Board} from '../components/board/board';
import {MainLayout} from '../components/layout/main-layout';
import React from 'react';

const Home: NextPage = () => {
   return (
      <MainLayout>
         <Board />
      </MainLayout>
   );
};

export default Home;
