import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTransaction } from "../components/transactions";
import { useUser } from "./users";
import { calculateCreditScore } from "./creditScore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  const container = useRef();
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const apiKey = 'CG-kHJ4b6EMW7NsVN869evqSDYM'; // Your API key

  const { transactions } = useTransaction();
  const { userAddress } = useUser();
  const [userName, setUserName] = useState("");

  const db = getFirestore();

  useEffect(() => {
    const fetchUserName = async () => {
      if (userAddress) {
        const userDocRef = doc(db, "users", userAddress);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.log("No user found");
        }
      }
    };

    fetchUserName();
  }, [userAddress, db]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["COINBASE:ETHUSD|1D"],
        ["COINBASE:BTCUSD|1D"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
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

    if (container.current) {
      container.current.appendChild(script);
    } else {
      console.error("Container not available");
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`);
        console.log("Trending Coins Response:", response.data);
        setTrendingCoins(response.data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrendingCoins();
  }, [apiKey]);

  const formatNumberWithSuffix = (num) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    return num.toString();
  };

  // Calculate the credit score based on the user's transactions
  const creditScore = calculateCreditScore(transactions);

  // Update the chart data to reflect a score out of 500
  const cryptoMeterData = {
    datasets: [{
      data: [creditScore > 500 ? 500 : creditScore, Math.max(0, 500 - creditScore)], // Ensure it doesn't go below zero
      backgroundColor: ['#FF1B6B', '#45CAFF'], // Red for credit score, Blue for remaining
      circumference: 180,
      rotation: -90,
    }]
  };

  const cryptoMeterOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const filteredCoins = trendingCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 pt-6"> {/* Adjusted padding to match Lend */}
      <div className="flex h-[500px] gap-4">
        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex-1 bg-white rounded-2xl border border-gray-300 p-[10px] flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-black">Crypto Meter</h2>
            <div className="h-40 flex items-center justify-center">
              <Doughnut data={cryptoMeterData} options={cryptoMeterOptions} />
            </div>
            <h3 style={{
              textAlign: "center",
              fontSize: "1rem", // Reduced to 2/3 of original size
              marginBottom: "20px",
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #00FF87 0%, #60EFFF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontWeight: 'bold'
              }}>
                Crypto Score: {creditScore.toFixed(2)}
              </span>
            </h3>
          </div>
         
          <div className="flex-1 bg-white rounded-2xl border border-gray-300 p-[10px]">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul>
              <li className="flex justify-between items-center" style={{ backgroundColor: '#F6F6F6', padding: '8px', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="text-sm">BTC</span>
                <span className="flex-grow text-center text-gray-500 text-sm">05 June 2021</span>
                <span className="text-sm">$20,000</span>
              </li>
              <li className="flex justify-between items-center" style={{ backgroundColor: '#F6F6F6', padding: '8px', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="text-sm">ETH</span>
                <span className="flex-grow text-center text-gray-500 text-sm">20 June 2021</span>
                <span className="text-sm">$1,500</span>
              </li>
              <li className="flex justify-between items-center" style={{ backgroundColor: '#F6F6F6', padding: '8px', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="text-sm">LTC</span>
                <span className="flex-grow text-center text-gray-500 text-sm">15 June 2021</span>
                <span className="text-sm">$150</span>
              </li>
            </ul>

            <p className="mt-4 text-left text-gray-400 cursor-pointer text-xs">
              See more
            </p>
          </div>
        </div>

        <div className="w-2/3 rounded-2xl border border-gray-300 overflow-hidden p-[10px]">
          <div className="tradingview-widget-container h-full" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright"></div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-300 p-[10px] mt-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          Tokens
          <IconButton onClick={() => setIsSearchActive(!isSearchActive)} style={{ paddingLeft: '8px' }}>
            <SearchIcon />
          </IconButton>
          {isSearchActive && (
            <InputBase 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: '8px', width: '200px' }}
            />
          )}
        </h2>

        <table className="w-full table-auto">
          <thead>
            <tr style={{ backgroundColor: '#F6F6F6' }}>
              <th className="py-2 px-4 text-center">Token Name</th>
              <th className="py-2 px-4 text-center">Price</th>
              <th className="py-2 px-4 text-center">1 Day</th>
              <th className="py-2 px-4 text-center">FDV</th>
              <th className="py-2 px-4 text-center">Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <tr key={coin.id} className="">
                  <td className="py-2 px-4 text-center font-semibold">
                    <a 
                      href={`https://www.coingecko.com/en/coins/${coin.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#11998E', textDecoration: 'none' }}
                    >
                      {coin.name}
                    </a>
                  </td>
                  {coin.current_price ? (
                    <>
                      <td className="py-2 px-4 text-center font-semibold">${coin.current_price.toFixed(2)}</td>
                      <td 
                        className={`py-2 px-4 text-center ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : coin.price_change_percentage_24h < 0 ? 'text-red-500' : ''}`}>
                        {coin.price_change_percentage_24h ? `${coin.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}
                      </td>
                      <td className="py-2 px-4 text-center font-semibold">{formatNumberWithSuffix(coin.fdv || coin.market_cap)}</td>
                      <td className="py-2 px-4 text-center font-semibold">{formatNumberWithSuffix(coin.total_volume)}</td>
                    </>
                  ) : (
                    <td colSpan={5} className="py-2 px-4">Price not available</td>
                  )}
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="py-2 px-4 text-center">Loading...</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardHome;