import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import '../styles/Home.scss';

import { Container, ContainerProps } from '../components/Container/Container';

export default {
  title: 'Components/Container',
  component: Container,
} as Meta;

export const Default = () => (
  <Container>
    <a href="https://nextjs.org/docs" className='card'>
      <h3>Documentation &rarr;</h3>
      <p>Find in-depth information about Next.js features and API.</p>
    </a>

    <a href="https://nextjs.org/learn" className='card'>
      <h3>Learn &rarr;</h3>
      <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>

    <a
      href="https://github.com/vercel/next.js/tree/master/examples"
      className='card'
    >
      <h3>Examples &rarr;</h3>
      <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>

    <a
      href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      className='card'
    >
      <h3>Deploy &rarr;</h3>
      <p>
        Instantly deploy your Next.js site to a public URL with Vercel.
      </p>
    </a>
  </Container>
)

export const Grid = () => (
  <Container grid={{ gap: 15, maxCol: 3 }}>
    <a href="https://nextjs.org/docs" className='card'>
      <h3>Documentation &rarr;</h3>
      <p>Find in-depth information about Next.js features and API.</p>
    </a>

    <a href="https://nextjs.org/learn" className='card'>
      <h3>Learn &rarr;</h3>
      <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>

    <a
      href="https://github.com/vercel/next.js/tree/master/examples"
      className='card'
    >
      <h3>Examples &rarr;</h3>
      <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>

    <a
      href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      className='card'
    >
      <h3>Deploy &rarr;</h3>
      <p>
        Instantly deploy your Next.js site to a public URL with Vercel.
      </p>
    </a>
  </Container>
)

export const Center = () => (
  <Container center>
    <a href="https://nextjs.org/docs" className='card'>
      <h3>Documentation &rarr;</h3>
      <p>Find in-depth information about Next.js features and API.</p>
    </a>

    <a href="https://nextjs.org/learn" className='card'>
      <h3>Learn &rarr;</h3>
      <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>

    <a
      href="https://github.com/vercel/next.js/tree/master/examples"
      className='card'
    >
      <h3>Examples &rarr;</h3>
      <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>

    <a
      href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      className='card'
    >
      <h3>Deploy &rarr;</h3>
      <p>
        Instantly deploy your Next.js site to a public URL with Vercel.
      </p>
    </a>
  </Container>
)