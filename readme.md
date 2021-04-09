<br />
<p align="center">
  <a href="https://github.com/damnedelf/firebase_WP_LINT_TS.git">
    <img src="src/assets/img/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ToDO app</h3>

  <p align="center">
   Typescript Front End for todo+mongo
    <br />
    
  </p>
</p>

  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <details open="open">
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="https://github.com/damnedelf/firebase_WP_LINT_TS/issues">report bug, any questions</a></li>
  </ol>
</details>

## About The Project

  <a href="https://github.com/damnedelf/todo_front_ts.git">
     <img src="src/assets/img/screenShotProj.png" alt="Logo" width="auto" height="300px">
  </a>

**Homework for Intspirit dev_courses. Front end part for todo+mongo**

#### mail: damnedelf@ya.ru

#### github: damnedelf

### Built With

- Typescript. Includes webpack/prettier/eslint configs

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@7.5.4
  ```

### Installation

1. Clone the repo
   ```sh
     git clone https://github.com/damnedelf/firebase_WP_LINT_TS.git
   ```
2. GO to project folder
   ```sh
   cd front_for_todo
   ```
3. Install dependency packages
   ```sh
      npm install
   ```

## Usage

After installation u can build bundle or run webpack server.
3 modes are available;

1. Webpack live server
   ```sh
     npm run server
   ```

Server is listening localhost:3000 by default. U can change port by modify file webpack.dev.js (option devServer.port)
<br />
mapping enabled

2. Bundling webpack in development mode

```sh
npm run build:dev
```

Webpack bundling all code (html\styles\ts) and put to the /dist folder. Just run index.html in browser.
<br />
mapping enabled;

3. Bundling webpack in production mode
   ```sh
     npm run build:prod
   ```

Webpack bundling all code (html\styles\ts) and put to the /dist folder. Just run index.html in browser.
<br />
mapping disabled

**Also u can change connection string in modifying private property reqUrl in src/ts/Store.ts**

## Contact

damnedelf@ya.ru - email
