import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import { Chip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
 
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import { UserService } from "../Services/UserService";
import { UseUsers } from "../Context/UserContext";
import { useEffect, useState } from "react";
import { UseCommonMethods } from "../../../Context/CommonContext";
 
function UserManagement() {
  const { selectedFilters } = UseUsers();
  const { setTitleHeader } = UseCommonMethods();
 
  const { isLoading: isUsersLoading, data: UsersList } = UserService();
  const [usersList, setUsersList] = useState();
 
  useEffect(() => {
    setTitleHeader({
      header: "Settings - User Creation",
    });
  }, []);
 
  useEffect(() => {
    console.log("load data trigerred");
    if (Object.keys(selectedFilters).length > 0) {
      let filteredList = [];
      Object.keys(selectedFilters).forEach((element) => {
        filteredList = UsersList?.data.filter(
          (user) =>
            Number(user.active) === selectedFilters.active &&
            (selectedFilters.team !== null
              ? user?.team?.id === selectedFilters.team
              : true) &&
            (selectedFilters.role !== null
              ? user?.role?.id === selectedFilters.role
              : true),
        );
      });
      setUsersList(filteredList);
    } else {
      setUsersList(UsersList?.data);
    }
  }, [selectedFilters, UsersList?.data]);
  const toolbarControls = [
    {
      id: 1,
      type: "button",
      name: "download",
      label: "Download",
      icon: "pi pi-download",
      variation: "lg",
      displayType: "secondary",
    },
    {
      id: 2,
      type: "button",
      name: "adduser",
      label: "Add User",
      icon: "pi pi-plus",
      variation: "lg",
      displayType: "primary",
    },
  ];
  const columns = [
    {
      field: "firstName",
      headerName: "Name",
      flex: 2,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <span>{`${params?.row?.firstName}${params?.row?.lastName}`}</span>
        );
      },
    },
 
    {
      field: "userrole",
      headerName: "UserRole",
      flex: 2,
      headerClassName: "header",
      sortable: true,
      renderCell: (params) => {
        return <span>{params?.row?.role?.name}</span>;
      },
    },
    {
      field: "team",
      headerName: "Team",
      flex: 2,
      headerClassName: "header",
      // valueGetter: (params) => params?.row?.team?.name,
      sortable: true,
      renderCell: (params) => {
        return <span>{params?.row?.team?.name}</span>;
      },
    },
    {
      field: "teamNumber",
      headerName: "Team No",
      flex: 2,
      headerClassName: "header",
      renderCell: (params) => {
        return <span>{params?.row?.teamNumber}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created On",
      flex: 2.5,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <span>{new Date(params?.row?.createdAt).toLocaleDateString()}</span>
        );
      },
    },
    {
      field: "active",
      headerName: "Status",
      flex: 2,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <Chip
            sx={{
              backgroundColor: params?.row?.active ? "#00A865" : "#f33e3e",
              color: params?.row?.active ? "#FFFFFF" : "white",
            }}
            label={params?.row?.active ? "Active" : "InActive"}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      headerClassName: "header",
      renderCell: (params) => (
        <IconButton
        // onClick={() =>
        //   handleNavigation("/user-creation/adduser/edit/" + params.row.id)
        // }
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <div>
      <CustomDataGrid
        toolbarControls={toolbarControls}
        showTotal={true}
        data={!isUsersLoading ? usersList : []}
        isLoading={isUsersLoading}
        columns={columns}
      />
    </div>
  );
}
 
export default UserManagement;
 
 
