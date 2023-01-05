CREATE TABLE IF NOT EXISTS VALUTY (
    name TEXT NOT NULL,
    symbol TEXT,
    code TEXT PRIMARY KEY,
    description TEXT
);

CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    currency TEXT NOT NULL,
    balance REAL,
    description TEXT,
    FOREIGN KEY (currency) REFERENCES currencies (code)
);

CREATE TABLE IF NOT EXISTS operations (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    creditAssetId TEXT NOT NULL,
    creditValue REAL NOT NULL,
    debitAssetId TEXT NOT NULL,
    debitValue REAL NOT NULL,
    rate REAL NOT NULL,
    categories TEXT NOT NULL,
    comments TEXT,
    FOREIGN KEY (creditAssetId) REFERENCES assets (id),
    FOREIGN KEY (debitAssetId) REFERENCES assets (id)
);
