import * as React from "react";
import Modal from "@mui/material/Modal";
import * as style from "./Styled";

import PhotoCardComponent from "./PhotoCardComponent";
import TitleCardComponent from "./TitleCardComponent";
import { useDispatch, useSelector } from "react-redux";
import {createBoard, getBoards} from "../../../Services/boardsService";
import LoadingScreen from "../../LoadingScreen";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateBoard(props) {
  const history = useHistory();
  const workspaceId = localStorage.getItem('workspaceId');
  const dispatch = useDispatch();
  const creating = useSelector((state) => state.boards.creating);
  const { backgroundImages, smallPostfix } = useSelector(
    (state) => state.boards
  );

  const [open, setOpen] = React.useState(true);

  const [background, setBackground] = React.useState(
    backgroundImages[0] + smallPostfix
  );
  let newBoard = {};
  console.log(newBoard);
  const handleClick = async () => {
    await createBoard(newBoard, workspaceId, dispatch);
    props.callback();
    setBackground(backgroundImages[0] + smallPostfix);
    getBoards(false,dispatch, workspaceId);
    history.push(`/board/${workspaceId}`)
  };

  const handleSelect = (link) => {
    setBackground(link);
  };

  const handleClose = () => {
    setOpen(false);
    props.callback();
  };

  const handleUpdate = (updatedBoard) => {
    newBoard = { ...updatedBoard };
  };

  return (
    <div style={{ position: "relative" }}>
      {creating && <LoadingScreen />}
      <Modal open={open} onClose={handleClose} disableEnforceFocus>
        <style.Container>
          <style.Wrapper>
            <TitleCardComponent
              link={background}
              updateback={handleUpdate}
              callback={handleClose}
            />
            <style.PhotosCard>
              {backgroundImages.map((item, index) => {
                return (
                  <PhotoCardComponent
                    key={index}
                    selectedLink={background}
                    link={item + smallPostfix}
                    callback={handleSelect}
                  />
                );
              })}
            </style.PhotosCard>
          </style.Wrapper>
          <style.CreateButton onClick={() => handleClick()}>
            Create Board
          </style.CreateButton>
        </style.Container>
      </Modal>
    </div>
  );
}
