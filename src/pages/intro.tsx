import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../ui/Layout';
import { Button } from '../ui/Button';
import { Title } from '../ui/Text';

export const Intro = () => (
  <Layout>
    <Title as="p">
      Welcome to Who Wants to be a Millionaire! Try your hand at winning 1,000,000 SEK
    </Title>
    <Link to='/quiz'><Button>Start Quiz!</Button></Link>
  </Layout>
)