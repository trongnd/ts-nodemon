# ts-nodemon

> Compiles your TypeScript app and restarts when files are modified. **Works with `typescript@>=2.7`**.

## How It Works
**`ts-nodemon`** runs TypeScript compiler in watch mode, and restarts Node.JS when TypeScript files are modified.

TypeScript compiler options are specified using `tsconfig.json` file.

## Installation

```shell
# Locally in your project
npm install -D @trongnd/ts-nodemon
npm install -D typescript

# Or globally (not recommended)
npm install -g @trongnd/ts-nodemon
npm install -g typescript
```

## Usage

*Check `examples/test-project` for sample.*

```shell
# Usage
# ts-nodemon --project <project> --tsconfig <tsconfig> --entry <entry> --exec <exec> --no-notify

# Args:
#  project:   will be passed as "tsc --project <project>"
#             optional, default: .
#  tsconfig:  tsconfig file name
#             optional, default: tsconfig.json
#  entry:     JS entry file will be run by NodeJS
#             optional, default: "main" field in "package.json"
#  exec:      specify a custom command to run
#             optional
#  no-notify: turn off notification
#             by default notification is shown on error using "node-notifier"

# Examples

# use `tsconfig.json` in current working directory
# use entry JS file from "main" field in "package.json"
ts-nodemon

# turn off notification
ts-nodemon --no-notify

# custom project location
ts-nodemon --project ../project

# custom tsconfig file name
ts-nodemon --tsconfig tsconfig2.json

# use "build/main.js" as entry file
ts-nodemon --entry "build/main.js"

# run command "yarn start" instead
ts-nodemon --exec "yarn start"
```

## License
MIT http://rem.mit-license.org
