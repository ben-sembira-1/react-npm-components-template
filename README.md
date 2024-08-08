# react-npm-components-template
A template for creating a react components library as npm package

This repo is based on https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
Thank you very much for a precise and descriptive tutorial, it is the best I found for this topic.

## Steps to create you own:
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
1. Add `lib` to the typescript scope in th tsconfig.json (I added it to the tsconfig.app.json for not changing the basic structure but this file may be removed as well)
	```diff
	+++ tsconfig.app.json
	@@ -23,5 +23,5 @@
	     "noUnusedParameters": true,
	     "noFallthroughCasesInSwitch": true
	   },
	-  "include": ["src"]
	+  "include": ["src", "lib"]
	 }
	```
1. Create a new tsconfig file for the build phase that extends the tsconfig.json but overrides the "include" field to use only `lib`
	```diff
	+++ tsconfig-build.json
	@@ -0,0 +1,6 @@
	+{
	+       "extends": "./tsconfig.json",
	+       "include": [
	+               "lib"
	+       ]
	+}
	```
1. Update the build script in the `package.json` to transpile and build according to our tsconfig-build.json instead of the standard tsconfig.json one.
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

