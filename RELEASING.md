# Release Guide

## Prerequisites

- npm アカウントにログイン済み (`npm whoami` で確認)
- `master` ブランチが最新の状態

## Release Steps

```bash
# 1. master に切り替え、最新化
git checkout master
git pull origin master

# 2. バージョンを上げる (patch / minor / major)
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# 3. ビルド・テスト・監査
pnpm install
pnpm build
pnpm test
pnpm audit

# 4. publish (prepack が自動で build + oclif manifest を実行)
npm publish

# 5. タグとコミットを push
git push origin master --tags

# 6. GitHub Release を作成
gh release create v$(node -p "require('./package.json').version") --generate-notes
```

## Dry Run

publish 前に内容を確認したい場合:

```bash
npm pack --dry-run
```

## Revert

publish を取り消す場合 (72時間以内):

```bash
npm unpublish gitmoji-c@<version>
```
