# React + TypeScript + Vite - Component library

This template provides a minimal setup to create a React component library working in Vite as an NPM package.

All the work here is based on https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
Thank you very much for a precise and descriptive tutorial, it is the best I found for this topic.

## Steps to reproduce your own:
1. Install node (I use node version v18.19.1 and npm version 9.2.0)
1. Create an empty vite project
	```bash
	$ npm create vite
	✔ Project name: … template-react-component-library-ben-sembira
	✔ Select a framework: › React
	✔ Select a variant: › TypeScript
	```
1. Create a new `lib` folder next to the `src` folder with a file named `main.ts` (which will be the entry point of the library)
	1. For testing purposes you may add a simple typed function in to it.
	```diff
	+++ lib/main.ts
	@@ -0,0 +1,3 @@
	+export function helloAnything(thing: string): string {
	+  return `Hello ${thing}!`
	+}
	```
1. Add the lib entrypoint in the `vite.config.ts` configuration file
	1. `npm i path`
	1. `npm i @types/node -D`
	```diff
	+++ b/vite.config.ts
	@@ -1,7 +1,14 @@
	import { defineConfig } from 'vite'
	+import { resolve } from "path"
	import react from '@vitejs/plugin-react'
	
	// https://vitejs.dev/config/
	export default defineConfig({
	plugins: [react()],
	+  build: {
	+    lib: {
	+      entry: resolve(__dirname, 'lib/main.ts'),
	+      formats: ['es']
	+    }
	+  }
	})
	```
1. Add `lib` to the typescript scope in th tsconfig.json (Move all tsconfig.app.json to tsconfig.json and remove the `"noEmit": true` from tsconfig.node.json)
	1. Move all tsconfig.app.json content to tsconfig.json
		```diff
		+++ tsconfig.json
		@@ -1,9 +1,31 @@
		 {
		+  "compilerOptions": {
		+    "composite": true,
		+    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		+    "target": "ES2020",
		+    "useDefineForClassFields": true,
		+    "lib": ["ES2020", "DOM", "DOM.Iterable"],
		+    "module": "ESNext",
		+    "skipLibCheck": true,
		+
		+    /* Bundler mode */
		+    "moduleResolution": "bundler",
		+    "allowImportingTsExtensions": true,
		+    "resolveJsonModule": true,
		+    "isolatedModules": true,
		+    "moduleDetection": "force",
		+    "noEmit": true,
		+    "jsx": "react-jsx",
		+
		+    /* Linting */
		+    "strict": true,
		+    "noUnusedLocals": true,
		+    "noUnusedParameters": true,
		+    "noFallthroughCasesInSwitch": true
		+  },
		+  "include": ["src"],
		   "files": [],
		   "references": [
		-    {
		-      "path": "./tsconfig.app.json"
		-    },
		     {
		       "path": "./tsconfig.node.json"
		     }
		```
	1. Remove the `"noEmit": true` from tsconfig.node.json:
		```diff
		+++ tsconfig.node.json
		@@ -7,7 +7,7 @@
		     "moduleResolution": "bundler",
		     "allowSyntheticDefaultImports": true,
		     "strict": true,
		-    "noEmit": true
		   },
		   "include": ["vite.config.ts"]
		 }
		```
	1. Add `lib` to the typescript scope in th tsconfig.json:
		```diff
		+++ tsconfig.json
		@@ -23,7 +23,7 @@
		     "noUnusedParameters": true,
		     "noFallthroughCasesInSwitch": true
		   },
		-  "include": ["src"],
		+  "include": ["src", "lib"],
		   "files": [],
		   "references": [
		     {
		```
1. Create a new tsconfig file for the build phase that extends the tsconfig.json but overrides the "include" field to use only `lib`
	```diff
	+++ tsconfig-build.json
	@@ -0,0 +1,6 @@
	+{
	+   "extends": "./tsconfig.json",
	+   "include": [
	+       "lib"
	+   ]
	+}
	```
1. Update the build script in the `package.json` to transpile and build according to our tsconfig-build.json instead of the standard tsconfig.json one. (I am not sure what is the -b but it does not work with it.)
	```diff
	+++ b/template-react-component-library-ben-sembira/package.json
	@@ -5,7 +5,7 @@
	   "type": "module",
	   "scripts": {
	     "dev": "vite",
	-    "build": "tsc -b && vite build",
	+    "build": "tsc --p ./tsconfig-build.json && vite build",
	     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
	     "preview": "vite preview"
	   },
	```
	1. From here a new main.js file will be generated, I am not sure why is that.
1. Copy the file `vite-env.d.ts` from src to `lib` to make the vite-corresponding types complete.
1. Add `copyPublicDir: false,` to `vite.config.ts` to disable packing the public directory in the build products.
1. Add types to the library using [vite-plugin-ts](https://github.com/qmhc/vite-plugin-dts).
	1. Install the plugin with `npm i --save-dev vite-plugin-dts@3.7.3`
		1. When using the most recent version (4.0.1) a main.d.ts file was not generated in the dist folder. I do not know if the new version embeds types in an other way or if it is a bug, so I downgraded to a version I so in the internet that works.
	1. Use the plugin in `vite.config.ts` to generate types to the lib folder
		```diff
		+++ vite.config.ts
		@@ -1,10 +1,14 @@
		 import { defineConfig } from 'vite'
		 import { resolve } from "path"
		 import react from '@vitejs/plugin-react'
		+import dts from 'vite-plugin-dts'

		 // https://vitejs.dev/config/
		 export default defineConfig({
		-  plugins: [react()],
		+  plugins: [
		+    react(),
		+    dts({ include: ['lib'] })
		+  ],
		   build: {
		     copyPublicDir: false,
		     lib: {
		```
1. Add 2 components using MUI (Create whatever components you like)
	1. install MUI using `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`
	1. Write those 2 components
	```diff
	+++ lib/CustomButton/index.tsx
	@@ -0,0 +1,17 @@
	+import { Button, Stack, Typography } from "@mui/material";
	+
	+type CustomButtonProps = {
	+       value: string;
	+       hint: string;
	+       onClick: () => void;
	+}
	+export function CustomButton({ value, hint, onClick }: CustomButtonProps) {
	+       return (
	+               <Button onClick={onClick}>
	+                       <Stack>
	+                               <Typography variant="h3">{value}</Typography>
	+                               <Typography variant="caption">{hint}</Typography>
	+                       </Stack>
	+               </Button>
	+       )
	+}

	+++ lib/CustomCounter/index.tsx
	@@ -0,0 +1,21 @@
	+import { Stack, Typography } from "@mui/material";
	+import { useState } from "react";
	+import { CustomButton } from "../CustomButton";
	+
	+
	+export function CustomCounter() {
	+       const [counter, setCounter] = useState(0)
	+       return (
	+               <Stack>
	+                       <Typography variant="h1">The Best Counter</Typography>
	+                       <Typography variant="body1">Current counter value: {counter}</Typography>
	+                       <CustomButton
	+                               value="Add one to the counter!"
	+                               hint={`The value will change to ${counter + 1}`}
	+                               onClick={
	+                                       () => setCounter((prev) => prev + 1)
	+                               }
	+                       />
	+               </Stack>
	+       )
	+}
	```
1. Shrink the bundle size by adding external dependencies (From 256KB to 0.96KB):
	```diff
	+++ vite.config.ts
	@@ -14,6 +14,16 @@ export default defineConfig({
	     lib: {
	       entry: resolve(__dirname, 'lib/main.ts'),
	       formats: ['es']
	-    }
	-  }
	+    },
	+    rollupOptions: {
	+      external: [
	+        'react',
	+        'react/jsx-runtime',
	+        '@mui/material',
	+        '@emotion/react',
	+        '@emotion/styled',
	+        '@mui/icons-material',
	+      ],
	+    },
	+  },
	 })
	```
1. For adding styles see https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma#4-add-some-styles and https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma#side-effects
1. Change the entrypoint name to main.js
	```diff
	+++ vite.config.ts
	@@ -24,6 +24,10 @@ export default defineConfig({
	         '@emotion/styled',
	         '@mui/icons-material',
	       ],
	+      output: {
	+        assetFileNames: 'assets/[name][extname]',
	+        entryFileNames: '[name].js',
	+      }
	     },
	   },
	 })
	```
1. Add entrypoints to the package.json
	```diff
	+++ package.json
	@@ -3,6 +3,11 @@
	   "private": true,
	   "version": "0.0.0",
	   "type": "module",
	+  "main": "dist/main.js",
	+  "types": "dist/lib/main.d.ts",
	+  "files": [
	+    "dist"
	+  ],
	   "scripts": {
	     "dev": "vite",
	     "build": "tsc --p ./tsconfig-build.json && vite build",
	```
1. To guarantee that your changes are always built before the package is published: https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma#ensure-that-the-package-is-built
1. Make the package public by changing the package.json
	```diff
	+++ package.json
	@@ -1,7 +1,7 @@
	 {
	   "name": "template-react-component-library-ben-sembira",
	-  "private": true,
	+  "private": false,
	   "version": "0.0.0",
	   "type": "module",
	   "main": "dist/main.js",
	   "types": "dist/lib/main.d.ts",
	```
1. Bump the version using npm-version: `npm version patch` (Bumping the last version digit, see [npm-version](https://docs.npmjs.com/cli/v8/commands/npm-version))
1. Publish the package
	1. `npm login`
	1. `npm publish`

## Expanding the ESLint configuration

If you are developing a production library, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
