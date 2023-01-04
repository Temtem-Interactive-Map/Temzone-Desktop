# Temzone - Desktop

[![CodeFactor](https://www.codefactor.io/repository/github/temtem-interactive-map/temzone-desktop/badge)](https://www.codefactor.io/repository/github/temtem-interactive-map/temzone-desktop)

Welcome to Temzone, a cross-platform desktop application from Temtem Interactive Map build with Electron and Next.js.

## Getting Started

This guide will help you get up and running the application in just a few minutes.

### Prerequisites

Before getting started, make sure you have the following tools installed on your development machine:

- Node.js (version 14 or higher)
- npm (the Node.js package manager, which should be installed with Node.js)

### Install the dependencies

To install the dependencies for a Nextron project, you'll need to use the npm install command. This command reads the **dependencies** and **devDependencies** sections of the [package.json](https://github.com/Temtem-Interactive-Map/Temzone-Desktop/blob/main/package.json) file and installs the packages listed there.

For example, to install all of the dependencies you can run the following command in the project directory:

```
npm install
```

You can also use npm install to install a specific package by providing the package name as an argument. For example:

```
npm install next
```

This will install the next package and add it to the dependencies section of the [package.json](https://github.com/Temtem-Interactive-Map/Temzone-Desktop/blob/main/package.json) file.

### Setting up the project

To start the application, the environment variables must be set. In a Nextron project, you should create a file called **.env.development** and **.env.production** at the [rendered](https://github.com/Temtem-Interactive-Map/Temzone-Desktop/tree/main/renderer) directory. In this file, you can define environment variables in the following format:

```
NEXT_PUBLIC_VARIABLE_NAME=value
```

In order to expose a variable to the browser you have to prefix the variable with **NEXT*PUBLIC***. These environment variables will be available to the application through the process.env object in Node.js.

The Temzone application requires the following environment variables to be set:

```
NEXT_PUBLIC_TEMZONE_BASE_URL=
```

### Running the development server

Navigate to the project directory and run the following command to start the development server:

```
npm run dev
```

This will start the Next.js development server, as well as the Electron application.

As you make changes to your code, the development server will automatically reload the Electron window to reflect your changes.

### Building for production

To build the application for production, run the following command:

```
npm run build
```

This will build the Next.js app and package it with Electron, creating a production ready build in the **dist** directory.

In addition to the npm run build command, Nextron provides several other commands for building the application for specific platforms. These commands are:

- `npm run build:all`: This command will build your application for all platforms (Windows, MacOS, and Linux).
- `npm run build:win32`: This command will build your application for 32-bit Windows.
- `npm run build:win64`: This command will build your application for 64-bit Windows.
- `npm run build:mac`: This command will build your application for MacOS.
- `npm run build:linux`: This command will build your application for Linux.

Each of these commands will create a production-ready build of the application in the **dist** directory, with the specific platform as a subdirectory.

Note that these commands are only available if you have the necessary tools and dependencies installed on your development machine. For example, to build for MacOS or Linux, you'll need to have the relevant tools and dependencies installed on a Mac or Linux machine.

## License

This project is licensed under the terms of the [MIT license](https://github.com/Temtem-Interactive-Map/Temzone-Desktop/blob/main/LICENSE.txt).
