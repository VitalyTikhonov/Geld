create TABLE IF NOT EXISTS currencies(
    name VARCHAR(30) NOT NULL,
    symbol VARCHAR(1),
    code VARCHAR(4) PRIMARY KEY,
    description VARCHAR(255)
);

create TABLE IF NOT EXISTS assets(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    currency VARCHAR(4) NOT NULL,
    balance NUMERIC(12, 2),
    description VARCHAR(255),
    FOREIGN KEY (currency) REFERENCES currencies (code)
);

create TABLE IF NOT EXISTS operations(
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    creditAsset INTEGER NOT NULL,
    creditValue NUMERIC(12, 2) NOT NULL,
    debitAsset INTEGER NOT NULL,
    debitValue NUMERIC(12, 2) NOT NULL,
    rate NUMERIC(12, 2) NOT NULL,
    categories VARCHAR(100) [] NOT NULL,
    comments VARCHAR(255),
    FOREIGN KEY (creditAsset) REFERENCES assets (id),
    FOREIGN KEY (debitAsset) REFERENCES assets (id)
);
