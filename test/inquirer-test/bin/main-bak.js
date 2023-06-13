#!/usr/bin/env node
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter your user name: ',
      default: 'noname',
      validate: (input) => {
        return typeof input === 'string' && input.length <= 10;
      },
      transformer: (input) => {
        return `\x1b[33m\x1b[1m${input}\x1b[0m`;
      },
      filter: (input) => {
        return input
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      },
    },
    {
      type: 'number',
      name: 'age',
      message: 'Please enter your age: ',
      default: 25,
      validate: (input) => {
        return input >= 0 && input <= 100;
      },
      transformer: (input) => {
        return `\x1b[33m\x1b[1m${input}\x1b[0m`;
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Please enter your password: ',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Please confirm: ',
      default: false,
    },
    {
      type: 'editor',
      name: 'story',
      message: 'Please tell us about your story: ',
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Please choose the frontend framework you want to use: ',
      default: 0,
      choices: [
        {
          value: 1,
          name: 'React',
        },
        {
          value: 2,
          name: 'Vue',
        },
        {
          value: 3,
          name: 'Angular',
        },
      ],
    },
    {
      type: 'rawlist',
      name: 'pm',
      message: 'Please choose the package manager you want to use: ',
      default: 0,
      choices: [
        {
          value: 1,
          name: 'npm',
        },
        {
          value: 2,
          name: 'pnpm',
        },
        {
          value: 3,
          name: 'yarn',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'pkg',
      message: 'Please choose the packages you want to install: ',
      default: 0,
      choices: [
        {
          value: 1,
          name: 'chalk',
        },
        {
          value: 2,
          name: 'ora',
        },
        {
          value: 3,
          name: 'inquirer',
        },
      ],
    },
    {
      type: 'expand',
      name: 'color',
      message: 'Please choose the color you want to use: ',
      default: 'red',
      choices: [
        {
          key: 'R',
          value: 'red',
        },
        {
          key: 'G',
          value: 'green',
        },
        {
          key: 'B',
          value: 'blue',
        },
      ],
    },
  ])
  .then((answer) => {
    console.log(answer);
  });
