import React from 'react';
import { Grid, Hidden, IconButton, Paper, Box } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';
import RankLanes from './RankLanes';
import OperatingLaneInfo from './OperatingLaneInfo';
import useStyles from './styles';


const grid = 8;

const onDragEnd = (operatingLanes: IOperatingLane[], updateOperatingLanes: (operatingLanes: IOperatingLane[]) => void) => (result) => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const startIndex = result.source.index;
  const endIndex = result.destination.index;

  if (operatingLanes && operatingLanes.length > 0) {
    const operatingLanesCopy = operatingLanes.slice();
    const [removed] = operatingLanesCopy.splice(startIndex, 1);
    operatingLanesCopy.splice(endIndex, 0, removed);
    updateOperatingLanes(operatingLanesCopy.map(({ name, pickup, dropoff }, index) => ({ rank: index, name, pickup, dropoff })));
  }
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 1.5,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : undefined,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : undefined,
  width: '100%',
});

interface IOperatingLanesDragAndDrop {
  operatingLanes: IOperatingLane[];
  updateOperatingLanes: (operatingLanes: IOperatingLane[]) => void;
  editOperatingLane: (laneAddress: IOperatingLane) => void;
}

const OperatingLanesDragAndDrop = (({ operatingLanes, updateOperatingLanes, editOperatingLane }: IOperatingLanesDragAndDrop) => {
  const classes = useStyles();
  return (
    <DragDropContext onDragEnd={onDragEnd(operatingLanes, updateOperatingLanes)}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {operatingLanes && operatingLanes.length > 0 && operatingLanes.map((operatingLane, index) => {
              const draggableId = `${JSON.stringify(operatingLane.name)}${JSON.stringify(operatingLane.pickup)}${JSON.stringify(operatingLane.dropoff)}`;
              return (
                <Draggable
                  key={draggableId}
                  draggableId={draggableId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Paper
                      variant='outlined'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <Grid container justify='space-between' alignItems='center' spacing={1}>
                        <Grid item xs>
                          <Grid container spacing={1} alignItems='center'>
                            <Grid item className={classes.infoWrapper}>
                              <OperatingLaneInfo laneType='pickup' laneAddress={operatingLane.pickup} />
                              <ArrowRightAltIcon className={classes.arrowIcon} />
                              <OperatingLaneInfo laneType='dropoff' laneAddress={operatingLane.dropoff} />
                            </Grid>
                            <IconButton
                              onClick={editOperatingLane(operatingLane)}
                              size='small'
                            >
                              <EditOutlined
                                className={classes.iconButton}
                              />
                            </IconButton>
                            <Hidden mdDown>
                              <RankLanes />
                            </Hidden>
                          </Grid>
                        </Grid>
                        <Hidden lgUp>
                          <Grid item xs={12}>
                            <RankLanes />
                          </Grid>
                        </Hidden>
                      </Grid>
                    </Paper>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default OperatingLanesDragAndDrop;
