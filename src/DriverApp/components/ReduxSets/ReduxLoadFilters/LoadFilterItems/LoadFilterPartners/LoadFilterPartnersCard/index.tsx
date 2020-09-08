import React, { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Card, CardActionArea } from '@material-ui/core';
import { WrappedFieldProps } from 'redux-form';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: '100%',
  },
  card: {
    borderRadius: '8px !important',
    borderColor: theme.palette.grey['200'],
  },
  cardActive: {
    borderColor: theme.palette.primary.main,
  },
}));

export interface IPartner {
  value: string;
  iconActive: string;
  iconDisabled: string;
}

interface ILoadFilterPartnerCard extends WrappedFieldProps {
  partner: IPartner;
}

const LoadFilterPartnerCard = memo(({ partner, input }: ILoadFilterPartnerCard) => {
  const cardClickHandler = useCallback((value) => () => {
    input.onChange(value);
  }, []);

  const active = useMemo(() => input.value === partner.value, [input.value, partner.value]);

  const classes = useStyles();

  return (
    <Card
      variant='outlined'
      className={clsx(classes.card, {
        [classes.cardActive]: active,
      })}
    >
      <CardActionArea onClick={cardClickHandler(partner.value)}>
        {active ? (
          <img src={partner.iconActive} className={classes.img} />
        ) : (
          <img src={partner.iconDisabled} className={classes.img} />
        )}
      </CardActionArea>
    </Card>
  );
});

export default LoadFilterPartnerCard;
