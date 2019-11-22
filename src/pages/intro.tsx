import React from 'react';
import { Link } from 'react-router-dom';

export const Intro = () => (
  <div>
    <p>Welcome to Who Wants to be a Millionaire! Try your hand at winning 1,000,000 SEK</p>
    <Link to="/quiz"><button>Start Quiz!</button></Link>
  </div>
)