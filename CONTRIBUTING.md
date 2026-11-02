# Contributing

## Commits decide releases

Every commit is a [Conventional Commit](https://www.conventionalcommits.org): `type(scope): summary`. On each push to
`main`, [tishlang/sem](https://github.com/tishlang/sem) reads the commits since the last tag and picks the next
version:

| Type                                                               | Release |
| ------------------------------------------------------------------ | ------- |
| `fix:`, `perf:`                                                    | patch   |
| `feat:`                                                            | minor   |
| `feat!:`, `fix!:` or a `BREAKING CHANGE:` footer                   | major   |
| `docs:`, `ci:`, `chore:`, `refactor:`, `test:`, `build:`, `style:` | none    |

If a change reaches users (a tool, a skill, the manifest), it is a `fix:` or a `feat:`. CI checks every
pull request's commits with `scripts/check-commits.mjs`.

A change that breaks the [tool contract](docs/tools.md) is a breaking change: bump `device.protocol` in
`nihmbus.extension.json` together with `EXTENSION_PROTOCOL` in
[the plugin](https://github.com/getpopcraft/popcraft-plugin-nihmbus), and ship both.

## How a release happens

1. **Merge to `main`.** [`release.yml`](.github/workflows/release.yml) lints, checks, and asks sem for the next
   version. With nothing to release it stops.
2. **Prerelease.** It writes the version into `nihmbus.extension.json` and `package.json`, commits
   `chore(release): vX.Y.Z [skip ci]`, tags `vX.Y.Z`, and publishes a GitHub **prerelease** with the installable
   package (`nihmbus-popcraft-X.Y.Z.json`) attached.
3. **Promote.** Try it (Extensions → Install from Git → `nihmbus/nihmbus-popcraft@vX.Y.Z`, or Install from URL with
   the package's link). When it's good, edit the release and uncheck **Set as a pre-release** to make it the latest.

Nihmbus installs extensions straight from Git or a URL, so there is no registry to publish to. Never edit versions by
hand; the release workflow owns them.

## Checks

```sh
npm install
npm run lint     # ESLint, Prettier, markdownlint
npm run check    # manifest and skills sanity checks
npm run pack     # build the installable package
```
