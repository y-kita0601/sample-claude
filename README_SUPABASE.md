# Supabase セットアップガイド

このプロジェクトは Supabase を使用してユーザーとプロジェクトの CRUD 操作を行う管理画面を実装しています。

## 必要なセットアップ

### 1. Supabase プロジェクト作成
1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの URL と匿名キーを取得

### 2. 環境変数設定
`.env.local` ファイルを作成し、以下の値を設定：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. データベーステーブル作成
Supabase の SQL エディターで以下を実行：

```sql
-- Users テーブル
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'guest')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects テーブル
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed', 'on-hold', 'nearly-complete')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date DATE NOT NULL,
    team_size INTEGER DEFAULT 1 CHECK (team_size > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) 有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 全てのユーザーに対する読み取り・書き込み権限（開発用）
CREATE POLICY "Enable all operations for users" ON users
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for projects" ON projects
FOR ALL USING (true) WITH CHECK (true);
```

### 4. サンプルデータ（オプション）
```sql
-- サンプルユーザー
INSERT INTO users (name, email, role, status) VALUES
('田中 太郎', 'tanaka@example.com', 'admin', 'active'),
('佐藤 花子', 'sato@example.com', 'user', 'active'),
('山田 次郎', 'yamada@example.com', 'user', 'inactive');

-- サンプルプロジェクト
INSERT INTO projects (name, description, status, progress, start_date, team_size) VALUES
('AI チャットボット開発', 'カスタマーサポート向けのAIチャットボットシステムの開発', 'in-progress', 75, '2024-01-15', 5),
('モバイルアプリ リニューアル', '既存モバイルアプリケーションのUI/UXリニューアル', 'in-progress', 40, '2024-02-01', 3),
('データ分析システム', 'ビジネスインテリジェンス向けデータ分析プラットフォーム', 'nearly-complete', 90, '2023-11-20', 7);
```

## 機能

### 管理画面
- **ダッシュボード** (`/admin`): 統計情報とプロジェクト概要
- **ユーザー管理** (`/admin/users`): ユーザーの作成、編集、削除、検索、フィルタリング
- **プロジェクト管理** (`/admin/projects`): プロジェクトの作成、編集、削除、検索、フィルタリング

### CRUD 操作
- **Create**: モーダルフォームを使用した新規作成
- **Read**: リアルタイムデータ取得と表示
- **Update**: インライン編集フォーム
- **Delete**: 確認ダイアログ付き削除

## 技術スタック
- **Next.js 14**: React フレームワーク
- **Supabase**: バックエンドとデータベース
- **TypeScript**: 型安全性
- **カスタムCSS**: スタイリング

## 開発実行
```bash
npm install
npm run dev
```

## 注意事項
- 本番環境では適切な RLS ポリシーを設定してください
- 環境変数は `.env.local` ファイルに設定し、Git にコミットしないでください
- API キーは適切に管理してください