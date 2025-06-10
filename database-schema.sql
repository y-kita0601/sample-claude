-- スクラム開発管理システムのデータベースシェマ
-- このファイルをSupabaseのSQLエディターで実行してください

-- スプリントテーブル
CREATE TABLE sprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    number INTEGER NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('planning', 'active', 'completed')),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- バックログアイテムテーブル
CREATE TABLE backlog_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sprint_id UUID REFERENCES sprints(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    story_points INTEGER DEFAULT 1 CHECK (story_points IN (1, 2, 3, 5, 8, 13)),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'inprogress', 'done')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- デイリーアップデートテーブル
CREATE TABLE daily_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sprint_id UUID REFERENCES sprints(id) ON DELETE CASCADE,
    member TEXT NOT NULL,
    yesterday TEXT DEFAULT '',
    today TEXT NOT NULL,
    blockers TEXT DEFAULT '',
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レトロスペクティブアイテムテーブル
CREATE TABLE retro_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sprint_id UUID REFERENCES sprints(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('good', 'bad', 'improve')),
    content TEXT NOT NULL,
    votes INTEGER DEFAULT 0 CHECK (votes >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) 有効化
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE retro_items ENABLE ROW LEVEL SECURITY;

-- 開発用ポリシー（本番では適切に制限してください）
CREATE POLICY "Enable all operations for sprints" ON sprints
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for backlog_items" ON backlog_items
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for daily_updates" ON daily_updates
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for retro_items" ON retro_items
FOR ALL USING (true) WITH CHECK (true);

-- インデックス作成（パフォーマンス向上）
CREATE INDEX idx_backlog_items_sprint_id ON backlog_items(sprint_id);
CREATE INDEX idx_backlog_items_status ON backlog_items(status);
CREATE INDEX idx_daily_updates_sprint_id ON daily_updates(sprint_id);
CREATE INDEX idx_daily_updates_date ON daily_updates(date);
CREATE INDEX idx_retro_items_sprint_id ON retro_items(sprint_id);
CREATE INDEX idx_retro_items_type ON retro_items(type);

-- 最初のスプリントを作成（デフォルト）
INSERT INTO sprints (number, status) VALUES (1, 'active');

-- サンプルデータ（オプション）
-- サンプルバックログアイテム
INSERT INTO backlog_items (sprint_id, title, description, story_points, priority, status) 
SELECT 
    s.id,
    'ユーザー認証機能の実装',
    'ログイン・ログアウト・サインアップ機能の開発',
    5,
    'high',
    'todo'
FROM sprints s WHERE s.number = 1;

INSERT INTO backlog_items (sprint_id, title, description, story_points, priority, status)
SELECT 
    s.id,
    'ダッシュボードUIの改善',
    'レスポンシブデザインの適用とユーザビリティ向上',
    3,
    'medium',
    'inprogress'
FROM sprints s WHERE s.number = 1;

-- サンプルデイリーアップデート
INSERT INTO daily_updates (sprint_id, member, yesterday, today, blockers)
SELECT 
    s.id,
    '田中 太郎',
    'API設計書の作成完了',
    'ユーザー認証エンドポイントの実装',
    'テストデータベースの環境構築に課題'
FROM sprints s WHERE s.number = 1;

-- サンプルレトロアイテム
INSERT INTO retro_items (sprint_id, type, content, votes)
SELECT 
    s.id,
    'good',
    'チーム間のコミュニケーションが改善された',
    3
FROM sprints s WHERE s.number = 1;

INSERT INTO retro_items (sprint_id, type, content, votes)
SELECT 
    s.id,
    'improve',
    'コードレビューの時間をもう少し確保したい',
    2
FROM sprints s WHERE s.number = 1;