# react-npm-components-template
A template for creating a react components library as npm package

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
1. Copy the file `vite-env.d.ts` from src to `lib` to make the vite-corresponding types complete.
1. Add `copyPublicDir: false,` to `vite.config.ts` to disable packing the public directory in the build products.
