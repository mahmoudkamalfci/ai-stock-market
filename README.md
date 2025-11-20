# 📈 AI Stock Market Report - Dodgy Dave's Stock Predictions

An interactive web application that generates AI-powered stock market reports using real-time stock data and OpenAI's GPT model. Get humorous, engaging analysis on stock performance with buy/sell/hold recommendations.

![Stock Market Report](https://img.shields.io/badge/AI-Powered-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?logo=openai)

## 🌟 Features

- **Real-Time Stock Data**: Fetches live stock prices from Polygon.io API
- **AI-Generated Reports**: Uses OpenAI GPT-3.5 to create entertaining, informative stock analysis
- **Multi-Stock Analysis**: Compare up to 3 stock tickers simultaneously
- **Engaging UI**: Fun, user-friendly interface with loading animations
- **Personalized Style**: Reports written in a unique "Dodgy Dave" persona

## 🚀 Live Demo

Add stock tickers (e.g., TSLA, AAPL, MSFT) and get instant AI-powered investment advice!

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build Tool**: Vite
- **APIs**: 
  - OpenAI API (GPT-3.5 Turbo)
  - Polygon.io Stock Market API
- **Package Manager**: pnpm

## 📋 Prerequisites

Before running this project, you'll need:

- Node.js (v14 or higher)
- pnpm installed globally (`npm install -g pnpm`)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Polygon.io API key ([Get one here](https://polygon.io/))

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahmoudkamalfci/ai-stock-market.git
   cd ai-stock-market
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_POLYGON_API_KEY=your_polygon_api_key_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📖 How to Use

1. Enter a stock ticker symbol (e.g., TSLA, AAPL, GOOGL) in the input field
2. Click the **+** button to add it to your list (up to 3 tickers)
3. Click **Generate Report** to fetch stock data and create an AI analysis
4. Read your personalized stock report with buy/sell/hold recommendations

## 🎯 Key Features Explained

### Stock Data Fetching
The app fetches 3 days of historical stock data using the Polygon.io API, providing recent price movements for analysis.

### AI Report Generation
OpenAI's GPT-3.5 Turbo analyzes the stock data and generates a report in a unique, entertaining style inspired by "Dodgy Dave" - a colorful trading guru persona.

### Dynamic UI
- Loading animations while fetching data
- Real-time ticker display
- Error handling for invalid inputs or API failures

## 📁 Project Structure

```
ai-stock-market-report/
├── images/           # SVG icons and logos
├── utils/            # Utility functions (date helpers)
├── index.html        # Main HTML file
├── index.js          # Core JavaScript logic
├── index.css         # Styling
├── vite.config.js    # Vite configuration
├── package.json      # Dependencies and scripts
└── .gitignore        # Git ignore rules
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## ⚠️ Important Notes

- **Not Financial Advice**: This is a fun project for learning purposes only. Do not use for actual investment decisions!
- **API Rate Limits**: Be aware of rate limits on both OpenAI and Polygon.io free tiers
- **Browser API Usage**: Uses `dangerouslyAllowBrowser` for OpenAI - not recommended for production

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of [Scrimba's AI Engineer Path](https://scrimba.com/the-ai-engineer-path-c02v)
- Stock data provided by [Polygon.io](https://polygon.io/)
- AI powered by [OpenAI](https://openai.com/)

## 📧 Contact

Mahmoud Kamal - [@mahmoudkamalfci](https://github.com/mahmoudkamalfci)

Project Link: [https://github.com/mahmoudkamalfci/ai-stock-market](https://github.com/mahmoudkamalfci/ai-stock-market)

---

**Disclaimer**: Always correct 15% of the time! 😜