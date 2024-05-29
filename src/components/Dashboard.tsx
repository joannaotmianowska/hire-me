import React from "react";
import {useQuery} from "react-query";
import {useState, useEffect} from "react";
import {fetchDashboardData} from "../utils/api";
import List from "./List";

import "./Dashboard.css";

function Dashboard() {
  const [displayData, setDisplayData] = useState([]);
  const [chunkSize] = useState(10);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const {data, error, isLoading, refetch} = useQuery(
    "dashboardData",
    fetchDashboardData,
    {
      staleTime: 1000,
    },
  );

  useEffect(() => {
    if (data) {
      setDisplayData(data.children.slice(0, chunkSize));
    }
  }, [data, chunkSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentChunk, data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    loadMoreData();
  };

  const loadMoreData = () => {
    if (data) {
      setLoadingMore(true);
      if (displayData.length === data.children.length) {
        setLoadingMore(false);
        setNoMoreData(true);
        return;
      }
      const newChunk = currentChunk + 1;
      const newData = data.children.slice(0, (newChunk + 1) * chunkSize);
      setDisplayData(newData);
      setCurrentChunk(newChunk);
      setLoadingMore(false);
    }
  };

  if (isLoading) return <div>Loading... &nbsp; ⏳</div>;

  if (error) return <div>Ooops...something went wrong &nbsp; 🚨</div>;

  return (
    <div className="dashboard">
      <h1>Welcome to Your Nursery Dashboard 🧸&nbsp;🏡 &nbsp;🎉</h1>
      <List
        data={displayData}
        noMoreData={noMoreData}
        loadingMore={loadingMore}
        refetchListData={refetch}
      />
    </div>
  );
}

export default Dashboard;
