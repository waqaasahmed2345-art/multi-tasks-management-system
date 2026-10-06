import React, { useState } from "react";
import {
  Container,
  SearchContainer,
  SearchBar,
  ChipContainer,
} from "./styleId";
import Button from "../../ReUsableComponents/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromEmail } from "../../../../../Services/userService";
import { openAlert } from "../../../../../Redux/Slices/alertSlice";
import {
  boardMemberAdd,
  workspaceMemberAdd,
} from "../../../../../Services/boardService";
import Loader from "../../../../Loader";

const useStyles = makeStyles({
  root: {
    maxWidth: "8rem",
    opacity: "70%",
  },
});

const ChipComponent = (props) => {
  const { name, surname, email, callback } = props;
  const classes = useStyles();
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={`${name} ${surname}`}
      size="small"
      placement="top"
      arrow
    >
      <Chip
        className={classes.root}
        onDelete={() => callback(email)}
        avatar={<Avatar>{name.toString()[0]}</Avatar>}
        label={name}
        size="small"
        color="secondary"
      />
    </Tooltip>
  );
};

const InviteMembersBoards = () => {
  const [memberMail, setMemberMail] = useState("");
  const [members, setMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const boardMembers = useSelector((state) => state.board.members);
  const boardId = useSelector((state) => state.board.id);
  const workspaceId = localStorage.getItem("workspaceId");
  const handleAddClick = async () => {
	setLoader(true); // Set addingMember to true before API call
  
	const checkMember = boardMembers.filter((m) => m.email === memberMail)[0];
	if (checkMember) {
	  dispatch(
		openAlert({
		  message: `${checkMember.name} is already a member of this board!`,
		  severity: "error",
		})
	  );
	  setLoader(false); // Set addingMember to false after error handling
	  setMemberMail("");
	  return;
	}
  
	const result = await getUserFromEmail(memberMail, dispatch);
	if (!result) {
		setLoader(false); // Set addingMember to false after error handling
	  return;
	}
	
	setMembers((prev) => [...prev, result]);
	setMemberMail("");
	setLoader(false); // Set addingMember to false after successful member addition
  };
  
  const handleDelete = (email) => {
    const newMembers = members.filter((member) => member.email !== email);
    setMembers([...newMembers]);
  };

  const handleInviteClick = async () => {
	setLoader(true); // Set loader to true before API call
  
	try {
	  await workspaceMemberAdd(workspaceId, members, dispatch);
	} catch (error) {
	  console.error("Error inviting members:", error);
	  // Handle error, e.g., display an error message to the user
	}
  
	setLoader(false); // Set loader to false after API call is complete (whether it succeeded or not)
  };
  const handleDeleteClick = async () => {
    const user = await getUserFromEmail(memberMail, dispatch); 
	const userId = 'target from user';
    if (user) {
      alert("User ID:", user);
	//   await workspaceMemberDelete(workspaceId, userId, dispatch);
    } else {
      console.log("User ID not available");
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchBar
          type="email"
          placeholder="Member's Email"
          value={memberMail}
          onChange={(e) => {
            setMemberMail(e.target.value);
          }}
        />
        <Button
          title="Add"
          style={{ flex: "1" }}
          clickCallback={handleAddClick}
        />
        <Button
          title="Delete"
          style={{ flex: "1" }}
          clickCallback={handleDeleteClick}
        />
      </SearchContainer>
      <ChipContainer>
        {members.map((member) => {
          return (
            <ChipComponent
              key={member.email}
              callback={handleDelete}
              {...member}
            />
          );
        })}
      </ChipContainer>
      {members.length > 0 && (
        <Button clickCallback={handleInviteClick} title="Invite" />
      )}
	  {loader && <Loader/>}
    </Container>
  );
};

export default InviteMembersBoards;
