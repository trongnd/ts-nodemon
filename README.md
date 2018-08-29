# ts-nodemon

> Compiles your TypeScript app and restarts when files are modified. **Works with `typescript@>=2.7`**.

## How It Works
**`ts-nodemon`** runs TypeScript compiler in watch mode, and restart Node.JS when TypeScript files are modified.

TypeScript compiler options are specified using `tsconfig.json` file.

## Installation

```shell
# Locally in your project
npm install -D ts-nodemon
npm install -D typescript

# Or globally (not recommended)
npm install -g ts-nodemon
npm install -g typescript
```

## Usage

*Check `examples/test-project` for sample.*

```shell
# Usage
# ts-nodemon --project <project> --tsconfig <tsconfig> --entry <entry> --exec <exec>

# Args:
#  project:   will be passed as "tsc --project <project>"
#             optional, default: .
#  tsconfig:  tsconfig file name
#             optional, default: tsconfig.json
#  entry:     JS entry file will be run by NodeJS
#             optional, default: "main" field in "package.json"
#  exec:      specify a custom command to run
#             optional

# Examples

# use `tsconfig.json` in current working directory
# use entry JS file from "main" field in "package.json"
ts-nodemon

# use "build/main.js" as entry file
ts-nodemon --entry "build/main.js"

# run command "yarn start" instead
ts-nodemon --exec "yarn start"
```

## License
MIT http://rem.mit-license.org
