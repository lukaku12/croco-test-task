 <h1>Croco Test Task</h1>

---

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)

#

### Prerequisites

- <img src="https://vitejs.dev/logo-with-shadow.png" height="20" width="20" style="position: relative; top: 4px" /> Vite
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png?20170919082558" height="15" style="position: relative; top: 4px" /> Vue3
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png?20140904162625" width="35" style="position: relative; top: 4px" /> *npm@10.2.4 and up*

#

### Tech Stack

- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png?20170919082558" height="20" style="position: relative; top: 4px" /> [Vue3](https://vuejs.org/) - front-end framework
- <img src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark-atom.svg" height="20" style="position: relative; top: 4px" /> [Vuetify](https://vuetifyjs.com/) - Component Library
- <img src="https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png" height="19" style="position: relative; top: 4px" /> [Vue Router](https://router.vuejs.org/) - package for routing

#

### Getting Started

1\. First you need to clone Project from github:

```sh
git clone https://github.com/lukaku12/croco-test-task.git
```

2\. Next step requires you to run _npm install_ in order to install all the dependencies.

```sh
npm install
```

### Development

If We have Api We need to set our env file and add API route url. 

Go to the root of your project and execute this command.

```sh
cp .env.example .env
```

> **⚠ NOTE: If API route is not provided app will use local fake API.**  


#### You can now run vite's built-in development server by executing:

```sh
  npm run serve
```