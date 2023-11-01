# `pos-app`

A point-of-sales and inventory management application

## Libraries | Frameworks

- `electron-vite`
  - Electron
  - Vite
  - React
  - Typescript
- Drizzle ORM
  - `better-sqlite3`

---

- Prettier
- ESLint
- CSpell

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

> Running the `'postinstall'` script may be required for dependencies that used something like `node-gyp`.
>
> For instance, `'postinstall'` was needed to successfully build the app after installing `better-sqlite3`.
>
> - https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules
> - https://www.electron.build/index.html#quick-setup-guide

```bash
# For Windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
