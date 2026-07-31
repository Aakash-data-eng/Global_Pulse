---------------technical_indicators---------
CREATE TABLE technical_indicators (

    technical_indicator_id BIGSERIAL PRIMARY KEY,

    file_name VARCHAR(255) NOT NULL,

    file_data BYTEA NOT NULL,

    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--------sample example for file uploaded----
-- --INSERT INTO technical_indicators (
--     file_name,
--     file_data
-- )
-- VALUES (
--     'technical_indicators.csv',
--     pg_read_binary_file('/path/to/technical_indicators.csv')
-- );