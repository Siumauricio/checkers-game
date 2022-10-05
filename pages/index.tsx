import type {NextPage} from 'next';
import {Board} from '../components/board/board';
import {MainLayout} from '../components/layout/main-layout';
import {Score} from '../components/score/score';
import {DarkModeButton} from '../components/ui/darkmode-button';
import React from 'react';

const Home: NextPage = () => {
   return (
      <MainLayout>
         <DarkModeButton />
         <Score />
         <Board />
      </MainLayout>
   );
};

export default Home;
