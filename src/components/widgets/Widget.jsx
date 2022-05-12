import React, { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  AccountBalanceOutlined,
  MonetizationOnOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  let data;
  // temporary:
  // const amount = 100;
  // const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query:"users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ color: "creamson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "view all orders",
        icon: (
          <ShoppingCartCheckoutOutlined
            className="icon"
            style={{ color: "creamson", backgroundColor: "#0bc05333" }}
          />
        ),
      };
      break;

    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{ color: "creamson", backgroundColor: "#3eadec33" }}
          />
        ),
      };
      break;

    case "product":
      data = {
        title: "PRODUCTS",
      query:"products",
        link: "See Details",
        icon: (
          <AccountBalanceOutlined
            className="icon"
            style={{ color: "creamson", backgroundColor: "#bed30633" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      // console.log(prevMonth)

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );

      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
    };

    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive" }`}>
          {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
