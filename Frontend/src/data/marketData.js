// Centralized mock data for GlobalPulse. In production this would come from an API layer.

export const marketIndices = [
  { id: "sensex", label: "SENSEX", value: "72,503.12", change: "+0.80%", positive: true },
  { id: "nifty", label: "NIFTY 50", value: "22,053.45", change: "+0.75%", positive: true },
  { id: "nasdaq", label: "NASDAQ", value: "18,680.12", change: "+1.10%", positive: true },
  { id: "usdinr", label: "USD / INR", value: "83.24", change: "-0.12%", positive: false },
]

// Compact square summary cards shown at the top of the dashboard.
export const summaryCards = [
  { id: "spending", label: "Monthly Spending", value: "₹48,200", change: "+4.2%", positive: false, icon: "Wallet", tone: "blue" },
  { id: "income", label: "Income", value: "₹92,000", change: "+1.8%", positive: true, icon: "TrendingUp", tone: "green" },
  { id: "budget", label: "Remaining Budget", value: "₹18,500", change: "-6.5%", positive: false, icon: "PieChart", tone: "amber" },
  { id: "savings", label: "Savings", value: "₹43,800", change: "+9.1%", positive: true, icon: "PiggyBank", tone: "green" },
]

// Market overview mini-index tile (Nifty 50 + Sensex + status).
export const marketOverview = {
  status: "OPEN",
  indices: [
    { id: "nifty", label: "NIFTY 50", value: "25,130", change: "+0.85%", positive: true },
    { id: "sensex", label: "SENSEX", value: "82,450", change: "+0.73%", positive: true },
  ],
}

export const companies = [
  { id: "reliance", name: "Reliance Industries", ticker: "RELIANCE.NS", price: "₹2,945.30", change: "+2.45%", positive: true },
  { id: "hdfc", name: "HDFC Bank", ticker: "HDFCBANK.NS", price: "₹1,642.15", change: "-0.12%", positive: false },
  { id: "infosys", name: "Infosys", ticker: "INFY.NS", price: "₹1,568.40", change: "+1.82%", positive: true },
  { id: "tcs", name: "TCS", ticker: "TCS.NS", price: "₹3,921.75", change: "+0.95%", positive: true },
]

export const topMovers = [
  { id: "reliance", name: "Reliance", ticker: "RELIANCE.NS", value: "2,947.65", change: "+2.31%", positive: true },
  { id: "tcs", name: "TCS", ticker: "TCS.NS", value: "3,915.40", change: "+1.85%", positive: true },
  { id: "hdfc", name: "HDFC Bank", ticker: "HDFCBANK.NS", value: "1,672.30", change: "-0.35%", positive: false },
  { id: "infosys", name: "Infosys", ticker: "INFY.NS", value: "1,456.20", change: "+1.25%", positive: true },
]

export const sectors = [
  { id: "it", label: "IT Services", icon: "Laptop", status: "POSITIVE", tone: "positive", note: "Higher export revenue due to USD strength." },
  { id: "banking", label: "Banking", icon: "Landmark", status: "NEGATIVE", tone: "negative", note: "Pressure on liquidity and yield spreads." },
  { id: "auto", label: "Automobile", icon: "Car", status: "NEUTRAL", tone: "neutral", note: "Supply chain cost offset by festive demand." },
  { id: "pharma", label: "Pharma", icon: "Cross", status: "POSITIVE", tone: "positive", note: "Export-oriented growth benefits from FX gains." },
  { id: "energy", label: "Energy", icon: "Flame", status: "HIGH RISK", tone: "risk", note: "Rising import bill for crude and gas." },
]

// Full Nifty 50 constituents used by the "All Constituents" page.
export const constituents = [
  { name: "Reliance Industries", ticker: "RELIANCE", sector: "Energy", price: 2945.3, change: 2.45, mcap: "19.9L Cr" },
  { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", price: 1642.15, change: -0.12, mcap: "12.4L Cr" },
  { name: "Tata Consultancy Services", ticker: "TCS", sector: "IT", price: 3921.75, change: 0.95, mcap: "14.2L Cr" },
  { name: "Infosys", ticker: "INFY", sector: "IT", price: 1568.4, change: 1.82, mcap: "6.5L Cr" },
  { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", price: 1189.6, change: 0.64, mcap: "8.3L Cr" },
  { name: "Hindustan Unilever", ticker: "HINDUNILVR", sector: "FMCG", price: 2415.2, change: -0.45, mcap: "5.7L Cr" },
  { name: "State Bank of India", ticker: "SBIN", sector: "Banking", price: 812.35, change: 1.12, mcap: "7.2L Cr" },
  { name: "Bharti Airtel", ticker: "BHARTIARTL", sector: "Telecom", price: 1584.9, change: 0.88, mcap: "9.1L Cr" },
  { name: "ITC", ticker: "ITC", sector: "FMCG", price: 462.15, change: -0.22, mcap: "5.8L Cr" },
  { name: "Larsen & Toubro", ticker: "LT", sector: "Infra", price: 3612.4, change: 1.34, mcap: "4.9L Cr" },
  { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", price: 1745.8, change: -0.58, mcap: "3.5L Cr" },
  { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", price: 1152.25, change: 0.42, mcap: "3.6L Cr" },
  { name: "Bajaj Finance", ticker: "BAJFINANCE", sector: "Finance", price: 7124.5, change: 2.08, mcap: "4.4L Cr" },
  { name: "Asian Paints", ticker: "ASIANPAINT", sector: "Consumer", price: 2856.1, change: -1.15, mcap: "2.7L Cr" },
  { name: "Maruti Suzuki", ticker: "MARUTI", sector: "Automobile", price: 12480.0, change: 0.76, mcap: "3.9L Cr" },
  { name: "Sun Pharma", ticker: "SUNPHARMA", sector: "Pharma", price: 1789.35, change: 1.55, mcap: "4.3L Cr" },
  { name: "Titan Company", ticker: "TITAN", sector: "Consumer", price: 3345.9, change: 0.33, mcap: "2.9L Cr" },
  { name: "UltraTech Cement", ticker: "ULTRACEMCO", sector: "Cement", price: 11245.6, change: -0.68, mcap: "3.3L Cr" },
  { name: "Nestle India", ticker: "NESTLEIND", sector: "FMCG", price: 2489.7, change: 0.19, mcap: "2.4L Cr" },
  { name: "Wipro", ticker: "WIPRO", sector: "IT", price: 542.8, change: 2.21, mcap: "2.8L Cr" },
  { name: "HCL Technologies", ticker: "HCLTECH", sector: "IT", price: 1832.45, change: 1.02, mcap: "4.9L Cr" },
  { name: "Power Grid Corp", ticker: "POWERGRID", sector: "Utilities", price: 324.6, change: -0.41, mcap: "3.0L Cr" },
  { name: "NTPC", ticker: "NTPC", sector: "Utilities", price: 412.15, change: 0.87, mcap: "4.0L Cr" },
  { name: "Tata Motors", ticker: "TATAMOTORS", sector: "Automobile", price: 1024.3, change: 3.12, mcap: "3.4L Cr" },
  { name: "Tata Steel", ticker: "TATASTEEL", sector: "Metals", price: 158.75, change: -1.42, mcap: "1.9L Cr" },
  { name: "JSW Steel", ticker: "JSWSTEEL", sector: "Metals", price: 942.6, change: -0.94, mcap: "2.3L Cr" },
  { name: "Adani Enterprises", ticker: "ADANIENT", sector: "Conglomerate", price: 2984.5, change: 1.78, mcap: "3.4L Cr" },
  { name: "Adani Ports", ticker: "ADANIPORTS", sector: "Infra", price: 1345.2, change: 0.55, mcap: "2.9L Cr" },
  { name: "Coal India", ticker: "COALINDIA", sector: "Energy", price: 428.9, change: -0.33, mcap: "2.6L Cr" },
  { name: "Bajaj Finserv", ticker: "BAJAJFINSV", sector: "Finance", price: 1642.7, change: 1.24, mcap: "2.6L Cr" },
  { name: "Grasim Industries", ticker: "GRASIM", sector: "Cement", price: 2489.35, change: 0.41, mcap: "1.6L Cr" },
  { name: "Dr Reddy's Labs", ticker: "DRREDDY", sector: "Pharma", price: 1289.6, change: 0.92, mcap: "1.1L Cr" },
  { name: "Cipla", ticker: "CIPLA", sector: "Pharma", price: 1524.8, change: 1.36, mcap: "1.2L Cr" },
  { name: "Eicher Motors", ticker: "EICHERMOT", sector: "Automobile", price: 4785.2, change: -0.72, mcap: "1.3L Cr" },
  { name: "Hero MotoCorp", ticker: "HEROMOTOCO", sector: "Automobile", price: 4652.9, change: 0.64, mcap: "0.9L Cr" },
  { name: "Bajaj Auto", ticker: "BAJAJ-AUTO", sector: "Automobile", price: 9124.5, change: 1.18, mcap: "2.5L Cr" },
  { name: "Britannia", ticker: "BRITANNIA", sector: "FMCG", price: 4892.3, change: -0.28, mcap: "1.2L Cr" },
  { name: "Divi's Labs", ticker: "DIVISLAB", sector: "Pharma", price: 5624.7, change: 2.04, mcap: "1.5L Cr" },
  { name: "Tech Mahindra", ticker: "TECHM", sector: "IT", price: 1642.9, change: 1.44, mcap: "1.6L Cr" },
  { name: "IndusInd Bank", ticker: "INDUSINDBK", sector: "Banking", price: 984.6, change: -1.85, mcap: "0.8L Cr" },
  { name: "Hindalco", ticker: "HINDALCO", sector: "Metals", price: 642.35, change: -0.56, mcap: "1.4L Cr" },
  { name: "SBI Life Insurance", ticker: "SBILIFE", sector: "Insurance", price: 1489.2, change: 0.73, mcap: "1.5L Cr" },
  { name: "HDFC Life", ticker: "HDFCLIFE", sector: "Insurance", price: 712.45, change: 0.38, mcap: "1.5L Cr" },
  { name: "Apollo Hospitals", ticker: "APOLLOHOSP", sector: "Healthcare", price: 6845.9, change: 1.62, mcap: "0.9L Cr" },
  { name: "Shriram Finance", ticker: "SHRIRAMFIN", sector: "Finance", price: 2984.6, change: 0.94, mcap: "1.1L Cr" },
  { name: "Tata Consumer", ticker: "TATACONSUM", sector: "FMCG", price: 984.3, change: -0.42, mcap: "0.9L Cr" },
  { name: "BPCL", ticker: "BPCL", sector: "Energy", price: 312.75, change: 1.28, mcap: "1.4L Cr" },
  { name: "ONGC", ticker: "ONGC", sector: "Energy", price: 268.4, change: -0.88, mcap: "3.4L Cr" },
  { name: "LTIMindtree", ticker: "LTIM", sector: "IT", price: 5924.8, change: 1.71, mcap: "1.8L Cr" },
  { name: "Trent", ticker: "TRENT", sector: "Consumer", price: 6248.5, change: 2.94, mcap: "2.2L Cr" },
]

// Simple polylines used for the sparkline / mini charts (0-100 coordinate space).
export const sparklines = {
  reliance: [8, 12, 10, 30, 24, 55, 45, 78, 92],
  hdfc: [10, 18, 30, 42, 58, 62, 74, 70, 86],
  infosys: [12, 22, 34, 55, 60, 66, 72, 80, 90],
  tcs: [8, 14, 20, 22, 30, 44, 60, 78, 94],
}

export const indexSparklines = {
  sensex: [30, 45, 38, 55, 48, 62, 58, 70],
  nifty: [28, 40, 44, 52, 60, 66, 72, 80],
  nasdaq: [20, 35, 42, 50, 58, 64, 74, 84],
  usdinr: [72, 68, 74, 60, 64, 52, 56, 44],
}
