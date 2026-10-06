

import LoadingScreen from "../../LoadingScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkspaces,
  handleDeleteBoardById,
} from "../../../Services/boardsService";

import Navbar from "../../Navbar";
import { AddWorkspace, Board, Container, Title, Wrapper } from "./StyleId";
import CreateBoard from "../../Modals/CreateBoardModal/CreateBoard";
import { useHistory } from "react-router-dom";
import TestSidebar from "../../TestSidebar";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import { setWorkspaceId } from "../../../Redux/Slices/workspacesSlice";
import { Box, CircularProgress, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TypeAnimation } from "react-type-animation";
import Loader from "../../Loader";
import MemberModal from "../../MemberModal";

const Workspaces = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pending, workspacesData } = useSelector((state) => state.workspaces);
  const { userInfo } = useSelector((state) => state.user);
  const userRole = userInfo?.userType;
   

  console.log(userRole, 'user type is here.........');
  const [loader, setLoader] = useState(false);
  const [searchString, setSearchString] = useState("");


   const handleClick = (e, workspaceName) => {
    const workspaceId = e.target.id;
    history.push(`/board/${workspaceId}`);
    dispatch(setWorkspaceId(workspaceId)); 
    localStorage.setItem("workspaceId", workspaceId);
    localStorage.setItem("workspaceName", workspaceName);
    if (workspacesData && workspacesData.length > 0) {
      // console.log(workspacesData[0].members);
        localStorage.setItem("workspacesData", JSON.stringify(workspacesData[0].members));
    } 
  };

  useEffect(() => {
    setLoader(true); 

    getWorkspaces(false, dispatch)
      .then(() => {
        setLoader(false); 
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
        setLoader(false); 
      });
  }, [dispatch]);

  useEffect(() => {
    document.title = "Workspaces ";
  }, []);

  return (
    <>
      {/* {pending && <LoadingScreen />} */}
      <Container>
        <TestSidebar role={userRole}/>
        {userRole === 'admin' && <MemberModal/>}
        <Navbar
          searchString={searchString}
          spaces={"spaces"}
          setSearchString={setSearchString}
          role={userRole}
        />
     
        <Wrapper>
          {/* <Title>Your Workspaces</Title> */}
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Your",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Workspaces",
              1000,
              // 'Your Boardsafds',
              // 1000,
              // 'Your Boarasdsadds',
              // 1000
            ]}
            wrapper="span"
            speed={20}
            style={{
              fontFamily: "Arial, sans-serif",
              cursor: "default",
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "2rem",
              textAlign: "center",
              width: "100vw",
              marginBottom: "2rem",
              textShadow: "2px 3px 4px rgb(6, 6, 19)" /* Add a text shadow */,
              userSelect: "none",
            }}
            repeat={Infinity}
          />
        
          {/* <Box> */}
           
          {!pending &&
            workspacesData.length > 0 &&
            workspacesData
              .filter((item) =>
                searchString
                  ? item.name.toLowerCase().includes(searchString.toLowerCase())
                  : true
              )
              .map((item) => {
                return (
                  <>
                    <Board
                      key={item._id}
                      id={item._id}
                      onClick={(e) => handleClick(e, item?.name)}
                    >
                      {item?.name}
                    </Board>
                     {/* <Box>
                      <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Center space between elements
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              marginRight: "8px",
                              padding: "0x 9px",
                              width: "30px", // Set the width of the Avatar
                              height: "30px", // Set the height of the Avatar
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "10%", // Make it a circle
                              background:
                                "linear-gradient(var(--ds-background-accent-purple-bolder, #403294), var(--ds-background-accent-blue-bolder, #0747a6))", // Gradient background
                              color: "white", // Text color
                              fontWeight: "bold",
                              fontSize: "16px", // Font size
                            }}
                          >
                            {item?.name?.charAt(0).toUpperCase()}
                          </div>
                          <ListItemText
                            primaryTypographyProps={{
                              style: {
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--ds-text,#172b4d)",
                                fontFamily:
                                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                                textTransform: "uppercase", // Add this line
                              },
                            }}
                            primary={item?.name.toUpperCase()} // Use toUpperCase() to transform the text
                          />
                        </div>
                      </div>          
                         <h7>Boards</h7>
                      </Box>
                      <Box>
                        <h1>hdchsfg</h1>
                      </Box>
                    </Box> */}
                  </> 
                );
              })}
          {/* </Box> */}
        </Wrapper>
       
        
      </Container>
      {loader && <Loader />} 
    </>
  );
};

export default Workspaces;


// import React, { useState } from 'react';
// import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

// const mockData = [
//   {
//     workspaceName: "Workspace 1",
//     boards: [
//       {
//         boardName: "Board A",
//         lists: [
//           {
//             listName: "To Do",
//             cards: [
//               { cardName: "Task 1" },
//               { cardName: "Task 2" }
//             ]
//           },
//           {
//             listName: "In Progress",
//             cards: [
//               { cardName: "Task 3" },
//               { cardName: "Task 4" }
//             ]
//           },
//           {
//             listName: "Done",
//             cards: [
//               { cardName: "Task 5" },
//               { cardName: "Task 6" }
//             ]
//           }
//         ]
//       },
//       {
//         boardName: "Board B",
//         lists: [
//           {
//             listName: "To Do",
//             cards: [
//               { cardName: "Task 7" },
//               { cardName: "Task 8" }
//             ]
//           },
//           // Add more lists for Board B if needed
//         ]
//       }
//     ]
//   },
//   {
//     workspaceName: "Workspace 2",
//     boards: [
//       {
//         boardName: "Board C",
//         lists: [
//           {
//             listName: "To Do",
//             cards: [
//               { cardName: "Task 9" },
//               { cardName: "Task 10" }
//             ]
//           },
//           // Add more lists for Board C if needed
//         ]
//       },
//       // Add more boards for Workspace 2 if needed
//     ]
//   },
//   {
//     workspaceName: "Workspace 3",
//     boards: [
//       {
//         boardName: "Board D",
//         lists: [
//           {
//             listName: "To Do",
//             cards: [
//               { cardName: "Task 11" },
//               { cardName: "Task 12" }
//             ]
//           },
//           // Add more lists for Board D if needed
//         ]
//       },
//       // Add more boards for Workspace 3 if needed
//     ]
//   }
// ];




// function MultiSelectionDropdownModal() {
//   const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
//   const [selectedBoards, setSelectedBoards] = useState([]);
//   const [selectedLists, setSelectedLists] = useState([]);
//   const [selectedCards, setSelectedCards] = useState([]);

//   const handleWorkspaceSelect = (workspace) => {
//     setSelectedWorkspaces(prevState => {
//       if (prevState.includes(workspace)) {
//         return prevState.filter(item => item !== workspace);
//       } else {
//         return [...prevState, workspace];
//       }
//     });
//     setSelectedBoards([]);
//     setSelectedLists([]);
//     setSelectedCards([]);
//   };

//   const handleBoardSelect = (board) => {
//     setSelectedBoards(prevState => {
//       if (prevState.includes(board)) {
//         return prevState.filter(item => item !== board);
//       } else {
//         return [...prevState, board];
//       }
//     });
//     setSelectedLists([]);
//     setSelectedCards([]);
//   };

//   const handleListSelect = (list) => {
//     setSelectedLists(prevState => {
//       if (prevState.includes(list)) {
//         return prevState.filter(item => item !== list);
//       } else {
//         return [...prevState, list];
//       }
//     });
//     setSelectedCards([]);
//   };

//   const handleCardSelect = (card) => {
//     setSelectedCards(prevState => {
//       if (prevState.includes(card)) {
//         return prevState.filter(item => item !== card);
//       } else {
//         return [...prevState, card];
//       }
//     });
//   };

//   return (
//     <div className="modal">
//       <h2>Add Member to Workspace, Board, List, or Card</h2>
//       <FormControl component="fieldset">
//         <FormGroup>
//           {mockData.map(workspace => (
//             <FormControlLabel
//               key={workspace.workspaceName}
//               control={
//                 <Checkbox
//                   checked={selectedWorkspaces.includes(workspace)}
//                   onChange={() => handleWorkspaceSelect(workspace)}
//                 />
//               }
//               label={workspace.workspaceName}
//             />
//           ))}
//         </FormGroup>
//       </FormControl>
//       {selectedWorkspaces.length > 0 && (
//         <FormControl component="fieldset">
//           <FormGroup>
//             {selectedWorkspaces.flatMap(workspace =>
//               workspace.boards.map(board => (
//                 <FormControlLabel
//                   key={board.boardName}
//                   control={
//                     <Checkbox
//                       checked={selectedBoards.includes(board)}
//                       onChange={() => handleBoardSelect(board)}
//                     />
//                   }
//                   label={board.boardName}
//                 />
//               ))
//             )}
//           </FormGroup>
//         </FormControl>
//       )}
//       {selectedBoards.length > 0 && (
//         <FormControl component="fieldset">
//           <FormGroup>
//             {selectedBoards.flatMap(board =>
//               board.lists.map(list => (
//                 <FormControlLabel
//                   key={list.listName}
//                   control={
//                     <Checkbox
//                       checked={selectedLists.includes(list)}
//                       onChange={() => handleListSelect(list)}
//                     />
//                   }
//                   label={list.listName}
//                 />
//               ))
//             )}
//           </FormGroup>
//         </FormControl>
//       )}
//       {selectedLists.length > 0 && (
//         <FormControl component="fieldset">
//           <FormGroup>
//             {selectedLists.flatMap(list =>
//               list.cards.map(card => (
//                 <FormControlLabel
//                   key={card.cardName}
//                   control={
//                     <Checkbox
//                       checked={selectedCards.includes(card)}
//                       onChange={() => handleCardSelect(card)}
//                     />
//                   }
//                   label={card.cardName}
//                 />
//               ))
//             )}
//           </FormGroup>
//         </FormControl>
//       )}
//       <Button variant="contained">Cancel</Button>
//       <Button variant="contained">Add Members</Button>
//     </div>
//   );
// }

// export default MultiSelectionDropdownModal;




// Today:

// import React, { useState, useEffect } from 'react';
// import {
//   getWorkspaces,
//   getBoards
// } from "../../../Services/boardsService";
// import Select from 'react-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLists } from '../../../Services/boardService';

// function Workspaces() {
//   const { pending, workspacesData } = useSelector((state) => state.workspaces);
//   const { boardsData } = useSelector((state) => state.boards);
//   const { allLists, loadingListService } = useSelector((state) => state.list); // Add list state
//   console.log(allLists, 'allllllllListssssss')
//   const [selectedWorkspace, setSelectedWorkspace] = useState(null);
//   const [selectedBoards, setSelectedBoards] = useState([]);
//   console.log(selectedBoards,'selectedddddBoards');
//   const [selectedCards, setSelectedCards] = useState([]);

//   const [selectedLists, setSelectedLists] = useState([]); // Add a state for selected list
//   // console.log(selectedLists, 'selectedListssssssssssssss');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getWorkspaces(false, dispatch);
//   }, [dispatch]);

//   const handleWorkspaceSelect = async (workspace) => {
//     // console.log("Selected Workspace:", workspace);

//     setSelectedWorkspace(workspace);
//     setSelectedBoards(null);
//     setSelectedLists(null); // Reset selected list when a new workspace is selected
//     await getBoards(false, dispatch, workspace._id);
//   };

//   const handleBoardSelect = async (selectedOptions) => {
//     setSelectedBoards(selectedOptions);
//     setSelectedLists([]); // Reset selected lists when new boards are selected
  
//     try {
//       await Promise.all(selectedOptions.map(async (board) => {
//         await getLists(board.value, dispatch, selectedWorkspace._id);
//       }));
//     } catch (error) {
//       console.error("Error fetching lists:", error);
//     }
  
//     console.log('waqas')
//   };
//   const getCards = async (workspaceId, boardIds, listId) => {
//     try {
//       const response = await fetch(`/${workspaceId}/${boardIds.join(',')}/${listId}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching cards:", error);
//       throw new Error("Error fetching cards");
//     }
//   };
  
  
//   const handleListSelect = async (selectedOptions) => {
//     setSelectedLists(selectedOptions);
//     setSelectedCards([]); // Reset selected cards when new lists are selected
  
//     try {
//       // Fetch cards for each selected list
//       const fetchCardPromises = selectedOptions.map(async (list) => {
//         const response = await getCards(selectedWorkspace._id, selectedBoards.map(board => board.value), list.value);
//         return response;
//       });
  
//       // Wait for all card fetch requests to complete
//       const fetchedCards = await Promise.all(fetchCardPromises);
//       const allFetchedCards = fetchedCards.flat(); // Flatten the array of arrays
  
//       setSelectedCards(allFetchedCards);
//     } catch (error) {
//       console.error("Error fetching cards:", error);
//     }
//   };
  
  

//   return (
//     <div>
//       <h2>Workspaces</h2>
//       <select
//         value={selectedWorkspace ? selectedWorkspace._id : ''}
//         onChange={(e) => handleWorkspaceSelect(workspacesData.find(workspace => workspace._id === e.target.value))}
//       >
//         <option value="">Select Workspace</option>
//         {!pending &&
//           workspacesData.map((workspace) => (
//             <option key={workspace._id} value={workspace._id}>
//               {workspace.name}
//             </option>
//           ))}
//       </select>

//       {selectedWorkspace && (

//         <div>
//   <h2>Boards for {selectedWorkspace.name}</h2>
//   <Select
//     isMulti
//     value={selectedBoards}
//     onChange={handleBoardSelect}
//     // options={Object.values(boardsData).map(board => ({ value: board._id, label: board.title }))}
//     options={!pending &&
//       Object.values(boardsData).map((board, index) => (
//         { value: board._id, label: board.title }
//       ))
//     }
//   />
// </div>
//       )}

 
//       {selectedBoards?.length > 0 && (
//   <div>
//     <h2>Lists for Selected Boards</h2>
//     <Select
//       isMulti
//       value={selectedLists}
//       onChange={handleListSelect}
//       // options={Object.values(allLists).map(list => ({ value: list._id, label: list.title }))}
//       options={!pending &&
//         Object.values(allLists).map((list, index) => (
//           { value: list._id, label: list.title }
//         ))
//       }
//    />
//   </div>
// )}

// {selectedLists?.length > 0 && (
//   <div>
//     <h2>Cards for Selected Lists</h2>
//     {selectedCards.map((card) => (
//       <div key={card._id}>
//         <p>{card.title}</p>
//         {/* Display other card information as needed */}
//       </div>
//     ))}
//   </div>
// )}


//     </div>
//   );
// }

// export default Workspaces;


// Holiday

// import React, { useState, useEffect } from 'react';

// import Select from 'react-select';


// function Workspaces() {
  
//   const [workspacesData, setWorkspacesData] = useState([]);
//   const [boardsData, setBoardsData] = useState([]);
//   const [allLists, setAllLists] = useState({});
//   const [selectedWorkspace, setSelectedWorkspace] = useState(null);
//   const [selectedBoards, setSelectedBoards] = useState([]);
//   const [selectedLists, setSelectedLists] = useState([]);
//   const [allCards, setAllCards] = useState({});

//   const [selectedCards, setSelectedCards] = useState([]);
 
//     console.log(selectedLists, 'listt')
//   useEffect(() => {
//     // Fetch Workspaces
//     fetchWorkspaces();
//   }, []);

//   const fetchWorkspaces = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/workspace/get-workspaces', {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTU5NjkzMDMsImV4cCI6MTY5NjA1NTcwM30.t5oYK55l_23YVWBezicY1TmJnd3VUuDeYOVvYtzEGFk' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setWorkspacesData(data);
//     } catch (error) {
//       console.error('Error fetching workspaces:', error);
//     }
//   };
//   const fetchBoards = async (workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/board/${workspaceId}`,  {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTU5NjkzMDMsImV4cCI6MTY5NjA1NTcwM30.t5oYK55l_23YVWBezicY1TmJnd3VUuDeYOVvYtzEGFk' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setBoardsData(data);
//     } catch (error) {
//       console.error('Error fetching boards:', error);
//     }
//   };
//   const handleWorkspaceSelect = async (workspace) => {
//     setSelectedWorkspace(workspace);
//     setSelectedBoards([]);
//     setSelectedLists([]);
//     await fetchBoards(workspace._id);
//   };

//   const handleBoardSelect = async (selectedOptions) => {
//     setSelectedBoards(selectedOptions);
//     // setSelectedLists([]);
    
//     try {
//       await Promise.all(selectedOptions.map(async (board) => {
//         await fetchLists(board.value, selectedWorkspace._id);
//       }));
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//     }
//   };

//   const fetchLists = async (boardId, workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/list/${workspaceId}/${boardId}`, {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTU5NjkzMDMsImV4cCI6MTY5NjA1NTcwM30.t5oYK55l_23YVWBezicY1TmJnd3VUuDeYOVvYtzEGFk' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setAllLists(prevLists => ({
//         ...prevLists,
//         [boardId]: data
//       }));
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//     }
//   };
  
//   const handleListCheckboxChange = async (listId, boardId) => {
//     setSelectedLists(prevSelectedLists => {
//       if (prevSelectedLists.includes(listId)) {
//         // If the list is deselected, remove its cards from allCards
//         // setAllCards(prevAllCards => ({
//         //   ...prevAllCards,
//         //   [listId]: []
//         // }));
//         return prevSelectedLists.filter(id => id !== listId);
//       } else {
//         fetchCards(boardId, listId, selectedWorkspace._id);
//         return [...prevSelectedLists, listId];
//       }
//     });
//   };
  
  
  

//   const fetchCards = async (boardId, listId, workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/card/${workspaceId}/${boardId}/${listId}`, {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTU5NjkzMDMsImV4cCI6MTY5NjA1NTcwM30.t5oYK55l_23YVWBezicY1TmJnd3VUuDeYOVvYtzEGFk' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setAllCards(prevAllCards => ({
//         ...prevAllCards,
//         [listId]: data
//       }));
//     } catch (error) {
//       console.error('Error fetching cards:', error);
//     }
//   };


//   const handleCardCheckboxChange = (cardId) => {
//     setSelectedCards(prevSelectedCards => {
//       if (prevSelectedCards.includes(cardId)) {
//         return prevSelectedCards.filter(id => id !== cardId);
//       } else {
//         return [...prevSelectedCards, cardId];
//       }
//     });
//   };
//   return (
//     <div>
//       <h2>Workspaces</h2>
//       <select
//         value={selectedWorkspace ? selectedWorkspace._id : ''}
//         onChange={(e) => handleWorkspaceSelect(workspacesData.find(workspace => workspace._id === e.target.value))}
//       >
//         <option value="">Select Workspace</option>
//         { workspacesData.map((workspace) => (
//             <option key={workspace._id} value={workspace._id}>
//               {workspace.name}
//             </option>
//           ))}
//       </select>

//       {selectedWorkspace && (

//         <div>
//   <h2>Boards for {selectedWorkspace.name}</h2>
//   <Select
//     isMulti
//     value={selectedBoards}
//     onChange={handleBoardSelect}
//     // options={Object.values(boardsData).map(board => ({ value: board._id, label: board.title }))}
//     options={
//       Object.values(boardsData).map((board, index) => (
//         { value: board._id, label: board.title }
//       ))
//     }
//   />
// </div>
//       )}

 
// {selectedBoards?.length > 0 && (
//   <div>
//     <h2>Lists for Selected Boards</h2>
//     {selectedBoards.map(board => (
//       <div key={board.value}>
//         <h3>{board.label}</h3>
//         {allLists[board.value] && allLists[board.value].length > 0 ? (
//           allLists[board.value].map(list => (
//             <label key={list._id}>
//               <input
//   type="checkbox"
//   checked={selectedLists.includes(list._id)}
//   onChange={() => handleListCheckboxChange(list._id, board.value)} // Pass boardId here
// />

//               {list.title}
//             </label>
//           ))
//         ) : (
//           <p>No lists found for this board</p>
//         )}
//       </div>
//     ))}


// {selectedLists?.length > 0 && (
//   <div>
//     <h2>Cards for Selected Lists</h2>
//     {selectedLists.map(listId => (
//       <div key={listId}>
//         {allCards[listId] && allCards[listId].length > 0 ? (
//           allCards[listId].map(card => (
//             <label key={card._id}>
//               <input
//                 type="checkbox"
//                 checked={selectedCards.includes(card._id)}
//                 onChange={() => handleCardCheckboxChange(card._id)}
//               />
//               {card.title}
//             </label>
//           ))
//         ) : (
//           <p>No cards found for this list</p>
//         )}
//       </div>
//     ))}
//   </div>
// )}

//   </div>
// )}

//     </div>
//   );
// }

// export default Workspaces;

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';

// function Workspaces() {
//   const [workspacesData, setWorkspacesData] = useState([]);
//   const [boardsData, setBoardsData] = useState({});
//   const [allLists, setAllLists] = useState({});
//   const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
//   const [selectedBoards, setSelectedBoards] = useState({});
//   const [selectedLists, setSelectedLists] = useState([]);
//   const [allCards, setAllCards] = useState({});
//   const [selectedCards, setSelectedCards] = useState([]);

//   console.log('selectedWorkspaces:', selectedWorkspaces);
//   console.log('selectedBoards:', selectedBoards);
//   console.log('selectedLists:', selectedLists);
//   console.log('selectedCards:', selectedCards);


//   useEffect(() => {
//     fetchWorkspaces();
//   }, []);

//   const fetchWorkspaces = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/workspace/get-workspaces', {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTYyMTkwMDksImV4cCI6MTY5NjMwNTQwOX0.ut2Rtmdhzl7z5Wtd0mnmSjAY0pYViVPFThjV4BGKfoo' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setWorkspacesData(data);
//     } catch (error) {
//       console.error('Error fetching workspaces:', error);
//     }
//   };

//   const fetchBoardsForWorkspace = async (workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/board/${workspaceId}`, {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTYyMTkwMDksImV4cCI6MTY5NjMwNTQwOX0.ut2Rtmdhzl7z5Wtd0mnmSjAY0pYViVPFThjV4BGKfoo' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setBoardsData((prevData) => ({ ...prevData, [workspaceId]: data }));
//     } catch (error) {
//       console.error('Error fetching boards:', error);
//     }
//   };


//   useEffect(() => {
//     selectedWorkspaces.forEach(workspaceId => {
//       fetchBoardsForWorkspace(workspaceId);
//     });
//   }, [selectedWorkspaces]);

//   const handleWorkspaceSelect = (selectedOption) => {
//     setSelectedWorkspaces(selectedOption);
//     // Fetch boards for the selected workspace(s)
//     selectedOption.forEach((workspace) => {
//       fetchBoardsForWorkspace(workspace.value);
//     });
//   };

//   const handleBoardSelect = async (selectedOption, workspaceId) => {
//     setSelectedBoards((prevSelectedBoards) => ({
//       ...prevSelectedBoards,
//       [`${workspaceId}`]: selectedOption
//     }));

//     try {
//       await Promise.all(
//         selectedOption.map(async (board) => {
//           await fetchLists(board.value, workspaceId);
//         })
//       );
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//     }
//   };
  

//   const fetchLists = async (boardId, workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/list/${workspaceId}/${boardId}`, {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTYyMTkwMDksImV4cCI6MTY5NjMwNTQwOX0.ut2Rtmdhzl7z5Wtd0mnmSjAY0pYViVPFThjV4BGKfoo' // Replace with your actual token
//         }
//       });
//       const data = await response.json();
//       setAllLists((prevLists) => ({
//         ...prevLists,
//         [`${workspaceId}_${boardId}`]: data
//       }));
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//     }
//   };
  
//   const handleListCheckboxChange = async (listId, boardId, workspaceId) => {
//     setSelectedLists(prevSelectedLists => {
//       const key = `${workspaceId}_${boardId}`;
//       const selectedLists = prevSelectedLists[key] || [];
  
//       if (selectedLists.includes(listId)) {
//         return {
//           ...prevSelectedLists,
//           [key]: selectedLists.filter(id => id !== listId)
//         };
//       } else {
//         fetchCards(boardId, listId, workspaceId);
//         return {
//           ...prevSelectedLists,
//           [key]: [...selectedLists, listId]
//         };
//       }
//     });
//   };
  
  
  
  

//   const fetchCards = async (boardId, listId, workspaceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/card/${workspaceId}/${boardId}/${listId}`, {
//         headers: {
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZjYzU4OTk4ZmZkMTM4NjRlMzVhYyIsImVtYWlsIjoic2hhaGVlbkBnbWFpbC5jb20iLCJpYXQiOjE2OTYyMTkwMDksImV4cCI6MTY5NjMwNTQwOX0.ut2Rtmdhzl7z5Wtd0mnmSjAY0pYViVPFThjV4BGKfoo' // Replace with your actual token
//         }      });
//       const data = await response.json();
//       setAllCards(prevAllCards => ({
//         ...prevAllCards,
//         [`${workspaceId}_${boardId}_${listId}`]: data
//       }));
//     } catch (error) {
//       console.error('Error fetching cards:', error);
//     }
//   };
  


//   const handleCardCheckboxChange = (cardId) => {
//     console.log('Card Checkbox Changed:', cardId);

//     setSelectedCards(prevSelectedCards => {
//       if (prevSelectedCards.includes(cardId)) {
//         return prevSelectedCards.filter(id => id !== cardId);
//       } else {
//         return [...prevSelectedCards, cardId];
//       }
//     });
//   };
 



//   return (
//     <div>
//       <h2>Workspaces</h2>
//       <Select
//         isMulti
//         value={selectedWorkspaces}
//         onChange={handleWorkspaceSelect}
//         options={workspacesData.map((workspace) => ({
//           value: workspace._id,
//           label: workspace.name
//         }))}
//       />
  
//       {selectedWorkspaces.map(workspace => (
//         <div key={workspace.value} >
//           <h2>Boards for Workspace {workspace.label}</h2>
//           <Select
//             isMulti
//             value={selectedBoards[workspace.value] || []}
//             onChange={(selectedOptions) => handleBoardSelect(selectedOptions, workspace.value)}
//             options={(boardsData[workspace.value] || []).map((board) => ({
//               value: board._id,
//               label: board.title
//             }))}
//           />
//         <div style={{  }}>
//         {selectedBoards[workspace.value]?.length > 0 && <h2>Lists</h2> }
//    {selectedBoards[workspace.value]?.length > 0 && (
//     <div style={{ width: '100%', display: 'flex', flexDirection: 'row',  }}>
      
//       {selectedBoards[workspace.value].map(board => (
//         <div key={board.value} style={{ margin: '10px' }}>
//           <h3>List for selected {board.label}</h3>
//           {allLists[`${workspace.value}_${board.value}`] && allLists[`${workspace.value}_${board.value}`].length > 0 ? (
//             <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
//               {allLists[`${workspace.value}_${board.value}`].map(list => (
//                 <label key={list._id} style={{ margin: '5px' }}>
//                   <input
//                     type="checkbox"
//                     checked={selectedLists[`${workspace.value}_${board.value}`]?.includes(list._id)}
//                     onChange={() => handleListCheckboxChange(list._id, board.value, workspace.value)} 
//                   />
//                   {list.title}
//                 </label>
//               ))}
//             </div>
//           ) : (
//             <p>No lists found for this board</p>
//           )}
//         </div>
//       ))}
//     </div>
//   )}
// </div>

//         </div>
//       ))}




// {Object.keys(selectedLists).map(listKey => {
//   const [workspaceId, boardId] = listKey.split('_');
//   const listIds = selectedLists[listKey];

//   // Check if the board is selected
//   if (selectedBoards[workspaceId]?.find(board => board.value === boardId)) {
//     return (
//       <div key={listKey}>
//  {Object.keys(selectedLists)?.length !== 0 && 
//   <h3>Cards</h3>  }
//         {listIds.map(listId => (
//           <div key={listId}>
//           <h3>{allLists[`${workspaceId}_${boardId}`].find(list => list._id === listId)?.title}</h3>
//             {allCards[`${workspaceId}_${boardId}_${listId}`] && allCards[`${workspaceId}_${boardId}_${listId}`].length > 0 ? (
//               allCards[`${workspaceId}_${boardId}_${listId}`].map(card => (
//                 <label key={card._id}>
//                   <input
//                     type="checkbox"
//                     checked={selectedCards[card._id]}
//                     onChange={() => handleCardCheckboxChange(card._id)}
//                   />
//                   {card.title}
//                 </label>
//               ))
//             ) : (
//               <p>No cards found for this list</p>
//             )}
//           </div>
//         ))}
        
//       </div>
//     );
//   }
//   // If the board is not selected, return null or an empty component
//   return null;
// })}



  
//     </div>
//   );
  
// }

// export default Workspaces;

