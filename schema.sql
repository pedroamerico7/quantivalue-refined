CREATE TABLE IF NOT EXISTS offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  amount_usd INTEGER NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  country TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_offers_created_at
ON offers(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_offers_status
ON offers(status);
