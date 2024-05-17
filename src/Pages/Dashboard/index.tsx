import { useEffect, useState } from "react";
import DataTable from "../../Components/UserTable";
import useUserData from "../../hooks/useUserData";
import InfiniteScroll from "../../providers/InfiniteScroll";
import styles from "./styles.module.scss";
import dataFetcher from "../../utils/fetch";

const Dashboard = () => {
  const userData = useUserData();
  const [rowData, setRowData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [hasMore, setHasMoreFlag] = useState(true);

  const loadMore = async (page: number = 1) => {
    const response = await dataFetcher({
      url: "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile",
      method: "POST",
      body: {
        count: page * 10,
        country_code: "en_IN",
        aadhar: true,
        dl: true,
        credit: true,
        debit: true,
        pan: true,
        passport: true,
        ssn: false,
      },
    });
    setColumns(response?.columns || []);
    setRowData(response?.data || []);

    if (
      !response?.data ||
      response?.data?.length === 0 ||
      response?.data?.length >= 100 // This is for only the current scenario
    ) {
      setHasMoreFlag(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
      <main className={styles.container}>
        <h1>Hi, {userData?.name || ""}</h1>
        <DataTable columns={columns} rowData={rowData} />
      </main>
    </InfiniteScroll>
  );
};

export default Dashboard;
