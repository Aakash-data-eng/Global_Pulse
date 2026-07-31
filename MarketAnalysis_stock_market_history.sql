CREATE TABLE stock_market_history (

    stock_history_id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    ticker VARCHAR(20) NOT NULL,

    trading_date DATE NOT NULL,

    open_price NUMERIC(12,2),

    high_price NUMERIC(12,2),

    low_price NUMERIC(12,2),

    close_price NUMERIC(12,2),

    adjusted_close_price NUMERIC(12,2),

    volume BIGINT,

    year SMALLINT,

    quarter VARCHAR(5),

    month SMALLINT,

    sma20 NUMERIC(12,2),

    sma50 NUMERIC(12,2),

    ema20 NUMERIC(12,2),

    ema50 NUMERIC(12,2),

    rsi NUMERIC(6,2),

    macd NUMERIC(12,6),

    macd_signal NUMERIC(12,6),

    macd_hist NUMERIC(12,6),

    bb_middle NUMERIC(12,2),

    bb_upper NUMERIC(12,2),

    bb_lower NUMERIC(12,2),

    atr NUMERIC(12,4),

    obv BIGINT,

    stoch_k NUMERIC(6,2),

    stoch_d NUMERIC(6,2),

    adx NUMERIC(6,2),

    daily_return NUMERIC(12,6),

    volatility NUMERIC(12,6),

    price_change NUMERIC(12,2),

    price_change_percentage NUMERIC(8,4),

    tomorrow_close NUMERIC(12,2),

    target SMALLINT,

    sentiment_mean NUMERIC(5,2),

    sentiment_count INTEGER,

    sentiment_positive INTEGER,

    sentiment_neutral INTEGER,

    sentiment_negative INTEGER,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-------------Indexes for it----------------
CREATE INDEX idx_stock_company
ON stock_market_history(company_name);

CREATE INDEX idx_stock_ticker
ON stock_market_history(ticker);

CREATE INDEX idx_stock_date
ON stock_market_history(trading_date);

CREATE INDEX idx_stock_company_date
ON stock_market_history(company_name, trading_date); 


