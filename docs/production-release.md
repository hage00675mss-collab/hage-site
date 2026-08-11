# 本番公開手順

## 対象

- GitHubリポジトリ: `hage00675mss-collab/hage-site`
- 本番ブランチ: `main`
- 本番サイト: `https://hage-site.pages.dev/`
- 公開方式: GitHubの `main` を起点とするCloudflare Pagesの自動公開

この手順は、ユーザーがレビューを完了した下書きPRを本番公開する場合に使用する。

## 守ること

- PRの確認・下書き解除・マージにはGitHub CLI（`gh`）を使用する。GitHub連携アプリは、PR操作時に `403 Resource not accessible by integration` になるため使用しない。
- `main` への直接push、force push、PR外での本番変更は行わない。
- 確認用ブランチは、本番サイトで今回の変更を確認するまで保持する。確認後は、未マージの作業が含まれないことを確認して削除する。
- 権限・認証・CI・マージ条件に問題がある場合は、何も変更せず原因を報告して停止する。

## 手順

### 1. GitHub CLIの認証を確認する

```sh
gh auth status
```

`hage00675mss-collab` としてログイン済みであることを確認する。

通常環境から認証情報を読み取れない場合は、Macの保存済み認証情報を利用できる実行方法で同じコマンドを再試行する。再試行しても確認できない場合は停止する。

### 2. 対象PRを特定する

```sh
gh pr list --repo hage00675mss-collab/hage-site --state open
```

公開対象のPRを一意に特定できない場合は、変更せずユーザーに確認する。対象PRが存在しない場合は停止する。

### 3. PRの状態とCIを確認する

```sh
gh pr view <PR番号> --repo hage00675mss-collab/hage-site \
  --json url,isDraft,state,mergeStateStatus,mergeable,baseRefName,headRefName,statusCheckRollup
```

次の条件をすべて満たす場合だけ続行する。

- `baseRefName` が `main`
- `state` が `OPEN`
- `mergeable` が `MERGEABLE`
- `mergeStateStatus` が `CLEAN`
- Cloudflare Pagesのチェックが `SUCCESS`

いずれかを満たさない場合は、マージせず状態と原因を報告して停止する。

### 4. 下書きをレビュー可能状態にする

PRが下書きの場合のみ実行する。

```sh
gh pr ready <PR番号> --repo hage00675mss-collab/hage-site
```

### 5. 通常のマージコミットでマージする

```sh
gh pr merge <PR番号> --repo hage00675mss-collab/hage-site --merge
```

### 6. マージ結果を確認する

```sh
gh pr view <PR番号> --repo hage00675mss-collab/hage-site \
  --json state,mergedAt,mergeCommit,url,isDraft

git ls-remote origin refs/heads/main
```

PRが `MERGED` であることと、`main` の最新SHAを確認する。

### 7. 本番サイトを確認する

マージ直後はCloudflare Pagesが公開処理中の場合があるため、すぐに反映されていなくても失敗と判断しない。

まず、手順6で確認したマージコミットSHAに対するCloudflare Pagesのチェックを確認する。

```sh
gh api repos/hage00675mss-collab/hage-site/commits/<マージコミットSHA>/check-runs \
  --jq '.check_runs[] | select(.name == "Cloudflare Pages") | {name,status,conclusion,details_url}'
```

- チェックが存在しない、または `status` が `completed` でない場合は、公開処理中として一定時間後に再確認する。
- `conclusion` が `success` になったら、`https://hage-site.pages.dev/` を開き、今回の変更が反映されていることを確認する。
- 公開サイトにまだ反映されていない場合は、キャッシュや反映遅延を考慮し、30秒程度の間隔で最大5分を目安に再確認する。
- 5分経過しても反映されない場合は、再マージや `main` への直接pushを行わず、「マージ済み・本番反映未確認」として、確認したチェック状態と本番サイトの状態を報告して停止する。

本番サイトで今回の変更を確認できた場合は、PRの元ブランチを削除する。

```sh
git switch main
git pull --ff-only origin main
git push origin --delete <headRefName>
git branch -d <headRefName>
```

ブランチに未マージの作業が含まれる、または削除対象を一意に特定できない場合は削除せず、状況を報告して停止する。

### 8. 結果を報告する

次を簡潔に報告する。

- PR URL
- マージコミットSHA
- 本番URL
- 本番サイトでの確認結果
