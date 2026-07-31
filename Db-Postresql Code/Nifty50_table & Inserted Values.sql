CREATE TABLE nifty50_companies (

    company_id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL UNIQUE,

    sector VARCHAR(100) NOT NULL,

    company_symbol VARCHAR(20),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO nifty50_companies
(company_name, sector)
VALUES
('Adani Enterprises Ltd','Conglomerate'),
('Adani Ports & Special Economic Zone Ltd','Ports & Logistics'),
('Apollo Hospitals Enterprise Ltd','Healthcare'),
('Asian Paints Ltd','Consumer Goods'),
('Axis Bank Ltd','Banking'),
('Bajaj Auto Ltd','Automobiles'),
('Bajaj Finance Ltd','Financial Services'),
('Bajaj Finserv Ltd','Financial Services'),
('Bharti Airtel Ltd','Telecommunications'),
('Bharat Electronics Ltd','Defence Electronics'),
('Cipla Ltd','Pharmaceuticals'),
('Coal India Ltd','Energy/Mining'),
('Dr. Reddy''s Laboratories Ltd','Pharmaceuticals'),
('Eicher Motors Ltd','Automobiles'),
('Grasim Industries Ltd','Cement & Chemicals'),
('HCL Technologies Ltd','IT Services'),
('HDFC Bank Ltd','Banking'),
('HDFC Life Insurance Ltd','Insurance'),
('Hero MotoCorp Ltd','Automobiles'),
('Hindustan Unilever Ltd','FMCG'),
('Hindalco Industries Ltd','Metals'),
('ICICI Bank Ltd','Banking'),
('IndusInd Bank Ltd','Banking'),
('Infosys Ltd','IT Services'),
('ITC Ltd','Diversified FMCG'),
('JSW Steel Ltd','Steel & Manufacturing'),
('Kotak Mahindra Bank Ltd','Banking'),
('Larsen & Toubro Ltd','Engineering & Construction'),
('Mahindra & Mahindra Ltd','Automobiles & Farm Equipment'),
('Maruti Suzuki India Ltd','Automobiles'),
('NTPC Ltd','Energy/Power'),
('Oil & Natural Gas Corporation Ltd (ONGC)','Energy'),
('Power Grid Corporation of India Ltd','Energy'),
('Reliance Industries Ltd','Conglomerate, Oil & Telecom'),
('State Bank of India (SBI)','Banking'),
('Shriram Finance Ltd','Financial Services'),
('Sun Pharmaceutical Industries Ltd','Pharmaceuticals'),
('Tata Consultancy Services Ltd (TCS)','IT Services'),
('Tata Consumer Products Ltd','Consumer Goods'),
('Tata Motors Passenger Vehicles Ltd','Automobiles'),
('Tata Steel Ltd','Steel & Manufacturing'),
('Tech Mahindra Ltd','IT Services'),
('Titan Company Ltd','Consumer Goods / Jewellery & Watches'),
('Trent Ltd','Retail'),
('UltraTech Cement Ltd','Cement'),
('Wipro Ltd','IT Services'),
('Nestle India Ltd','FMCG'),
('SBI Life Insurance Ltd','Insurance'),
('Eternal Ltd','Specialized Industry'),
('Jio Financial Services Ltd','Financial Services');