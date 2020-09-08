import React from 'react';
import classnames from 'classnames';
import { Typography, Paper, Avatar, Badge } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { IlabelAndValue } from 'models/interfaces/shared/ILabelAndValue';
import styles from './styles';

interface IDocumentItemOwnProps {
  isActive?: boolean;
  documentType: IlabelAndValue;
  documents: IlabelAndValue[];
  onClick?: () => void;
}

type IDocumentItemProps = IDocumentItemOwnProps & WithStyles<typeof styles>;

const DocumentItem = ({ documents, documentType, classes }: IDocumentItemProps) => {
  const documentExist = documents && documents[documentType.value];
  return (
    <Paper
      elevation={0}
      variant='outlined'
      className={classnames(classes.document, documentExist && classes.documentActive)}
    >
      <div>
        <Badge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={!documentExist && (
            <Avatar className={classes.badge}>
              <AddIcon className={classes.badgeIcon} />
            </Avatar>
          )}
        >
          <Avatar className={classes.documentIcon}>
            <DescriptionIcon />
          </Avatar>
        </Badge>
      </div>
      <div>
        <Typography className={classnames(classes.label, documentExist && classes.labelActive)}>
          {documentType.label}
        </Typography>
      </div>
    </Paper>
  );
};


export default withStyles(styles)(DocumentItem);
