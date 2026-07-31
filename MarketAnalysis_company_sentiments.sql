CREATE TABLE company_sentiments (

    sentiment_id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    ticker VARCHAR(20) NOT NULL,

    sentiment_date DATE NOT NULL,

    sentiment_mean NUMERIC(5,2),

    sentiment_count INTEGER DEFAULT 0,

    sentiment_positive INTEGER DEFAULT 0,

    sentiment_neutral INTEGER DEFAULT 0,

    sentiment_negative INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_company_sentiment_name
ON company_sentiments(company_name);

CREATE INDEX idx_company_sentiment_ticker
ON company_sentiments(ticker);

CREATE INDEX idx_company_sentiment_date
ON company_sentiments(sentiment_date);

CREATE INDEX idx_company_sentiment_company_date
ON company_sentiments(company_name, sentiment_date);


-- INSERT INTO company_sentiments
-- (
--     company_name,
--     sentiment_date,
--     sentiment_mean,
--     sentiment_count,
--     sentiment_positive,
--     sentiment_neutral,
--     sentiment_negative,
--     ticker
-- )
-- VALUES
-- (
--     'Adani Enterprises Ltd.',
--     '2014-06-17',
--     -1.00,
--     2,
--     0,
--     0,
--     2,
--     'ADANIENT'
-- );