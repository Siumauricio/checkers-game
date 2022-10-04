import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';

interface Props {
   blueScore?: number;
   redScore?: number;
}

export const Score = ({blueScore = 0, redScore = 0}: Props) => {
   return (
      <Flex
         direction={'row'}
         css={{
            width: '100%',
            maxW: '50rem',
            border: '8px solid $border',
            borderRadius: '$lg',
            boxShadow: '$lg',
         }}
      >
         <Card
            css={{
               width: '100%',
               borderRadius: 'initial',
               btlr: '$lg',
               bblr: '$lg',
            }}
         >
            <Card.Header css={{display: 'flex', flexDirection: 'column'}}>
               <Text h2>Blue Score</Text>
               <Text h2>{blueScore}</Text>
            </Card.Header>
         </Card>
         <Card.Divider
            align="center"
            css={{height: 'initial', width: '1.25rem'}}
         />
         <Card
            css={{
               width: '100%',
               borderRadius: 'initial',
               btrr: '$lg',
               bbrr: '$lg',
               filter: 'none',
            }}
         >
            <Card.Header css={{display: 'flex', flexDirection: 'column'}}>
               <Text h2>Red Score</Text>
               <Text h2>{redScore}</Text>
            </Card.Header>
         </Card>
      </Flex>
   );
};
