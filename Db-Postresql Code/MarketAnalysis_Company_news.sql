CREATE TABLE company_news (

    news_id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    stock_symbol VARCHAR(20) NOT NULL,

    headline TEXT NOT NULL,

    publish_date DATE NOT NULL,

    sentiment VARCHAR(20) NOT NULL
        CHECK (sentiment IN ('Positive', 'Neutral', 'Negative')),

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_company_news_name
ON company_news(company_name);

CREATE INDEX idx_company_news_symbol
ON company_news(stock_symbol);

CREATE INDEX idx_company_news_date
ON company_news(publish_date);

CREATE INDEX idx_company_news_sentiment
ON company_news(sentiment);

CREATE INDEX idx_company_news_company_date
ON company_news(company_name, publish_date);


-- INSERT INTO company_news
-- (
--     company_name,
--     stock_symbol,
--     headline,
--     publish_date,
--     sentiment
-- )
-- VALUES
-- (
--     'Adani Enterprises Ltd.',
--     'ADANIENT',
--     'Indian billionaire Gautam Adani indicted on bribery charges in alleged bribery scheme',
--     '2024-11-20',
--     'Positive'
-- );