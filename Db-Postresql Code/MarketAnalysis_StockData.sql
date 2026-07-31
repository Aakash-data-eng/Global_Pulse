-----------------stock_data---------
CREATE TABLE stock_data (

    stock_data_id BIGSERIAL PRIMARY KEY,

    file_name VARCHAR(255) NOT NULL,

    file_path TEXT NOT NULL,

    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO stock_data (
--     file_name,
--     file_data
-- )
-- VALUES (
--     'stock_data.csv',
--     pg_read_binary_file('C:/Users/Imran/Documents/stock_data.csv')
-- );