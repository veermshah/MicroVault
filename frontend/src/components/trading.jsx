import React, { useEffect, useRef } from 'react';

const Trading = () => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["COINBASE:ETHUSD|1D"],  // ETH is now first
        ["COINBASE:BTCUSD|1D"]   // BTC is now second
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "500",
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

    // Append the script only if container is available
    if (container.current) {
      container.current.appendChild(script);
    } else {
      console.error("Container not available");
    }

    return () => {
      // Cleanup: Clear the container
      if (container.current) {
        container.current.innerHTML = ''; // Clear the container
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Trading</h2>
      <div className="tradingview-widget-container" ref={container} style={{ height: '500px', width: '100%' }}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Trading;