import React, { useState, useEffect } from "react";
import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";

import { collection, getDocs, deleteDoc, doc ,onSnapshot } from "firebase/firestore";
import { db} from "../../firebase";
import { list } from "firebase/storage";

const Datatable = () => {
  // const [data,setData] = useState(userRows)
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async() => {
    //   let list = [];
    //   try{

    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       list.push({id:doc.id,...doc.data()});
    //     });
    //     setData(list)
    //   }catch(err){
    //      console.log(err)
    //   }

    // }
    // fetchData();
    // LISTEN (REAL TIME UPDATE)...............

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    }
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="dataTableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
