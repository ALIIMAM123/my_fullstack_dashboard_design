import React from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
                alt="image1"
                className = "itemImg"
              />
             <div className="details">
                <h1 className="itemTitle">Ali imam</h1>
                <div className="detailItem">
                   <span className="itemKey">Email:</span>
                   <span className="itemValue">alieplanet@gmail.com</span>
                </div>
                <div className="detailItem">
                   <span className="itemKey">Phone:</span>
                   <span className="itemValue">+91 8709198639</span>
                </div>
                <div className="detailItem">
                   <span className="itemKey">Address:</span>
                   <span className="itemValue">D-166, D-block,sector 27  Noida</span>
                </div>
                <div className="detailItem">
                   <span className="itemKey">Country:</span>
                   <span className="itemValue">India</span>
                </div>
             </div>
            </div>
          </div>
          <div className="right">
           <Chart aspect = {3/1} title = "User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transaction</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
