// Dashboard.jsx
import React, { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["COINBASE:BTCUSD|1D"],
        ["COINBASE:ETHUSD|1D"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "500", // Increased height for better visibility
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });

    container.current.appendChild(script);

    return () => {
      container.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '500px', width: '100%' }}> {/* Increased height */}
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left-side menu */}
      <div className="w-1/4 bg-white shadow-md flex flex-col">
        <nav className="flex-grow">
          <ul className="py-4">
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Trading</li>
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">My Wallet</li>
            <li className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Loans</li>
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer">Settings</div>
        </div>
      </div>

      {/* Right-side content */}
      <div className="w-3/4 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Supported Cryptocurrencies Box */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Supported Cryptocurrencies</h2>
          <TradingViewWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;