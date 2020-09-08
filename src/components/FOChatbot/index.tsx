import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import SpeechRecognition from 'react-speech-recognition';
import SwipeableViews from 'react-swipeable-views';
import { Call, Email, Mic, Send } from '@material-ui/icons';
import { CardActionArea, Divider, Grid, Grow, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { fade, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { postFOChat } from '../../services/APIServices/PostFOChat';
import { postFOChatEmail } from '../../services/APIServices/postFOChatEmail';
import FOGrid from '../FOGrid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IDriverAppStore } from '../../models/dataStructures/IDriverAppStore';
import Load from '../../models/dataStructures/Load';
import { DriverAppStore } from '../../DriverApp/store/DriverAppStore';
import ApiLayer from '../../services/APIServices/ApiLayer';
import LocationPriceLoadInfo from '../../DriverApp/components/LocationsPriceLoadInfo';


const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    paddingBottom: 65,
    overflow: 'hidden',
  },
  container: {
    height: '100%',
  },
  chatMessagesContainer: {
    overflow: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  supportIcon: {
    fontSize: '1rem',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 0 0 ${fade(theme.palette.primary.main, 0.4)}`,
    },
    '70%': {
      boxShadow: `0 0 0 5px ${fade(theme.palette.primary.main, 0.4)}`,
    },
    '100%': {
      boxShadow: `0 0 0 0 ${fade(theme.palette.primary.main, 0.4)}`,
    },
  },
  pulse: {
    animationName: '$pulse',
    animationDuration: 1500,
    animationIterationCount: 'infinite',
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    overflowY: 'hidden',
  },
  cardsGridList: {
    overflowX: 'auto',
  },
});

const swipeableViewsStyle = {
  padding: '0 30px',
};

interface IFOChatbotProps {
  transcript: string;
  listening: boolean;
  interimTranscript: string;
  finalTranscript: string;
  resetTranscript: () => void;
  startListening: () => void;
  stopListening: () => void;
  browserSupportsSpeechRecognition: boolean;
}

interface IFOChatbotState {
  speaking: boolean;
  loading: boolean;
  inputText: string;
  renderingText: IrenderingText[];
  support: object;
}

interface IrenderingText {
  text: ReactNode;
  type: 'incoming' | 'outgoing';
  loads?: Load[] | undefined;
}

@inject('driverAppStore')
@observer
class FOChatbot extends React.Component<IFOChatbotProps & IDriverAppStore & WithStyles<typeof styles>, IFOChatbotState> {
  prepareFinalTranscript = debounce(async () => {
    const { finalTranscript } = this.props;
    await this.pushText(finalTranscript, 'outgoing');
  }, 2200);
  bottomScrollDivRefHandler = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = {
      speaking: false,
      loading: false,
      inputText: '',
      renderingText: [],
      support: {},
    };
  }

  componentDidMount() {
    const { browserSupportsSpeechRecognition, driverAppStore, stopListening, startListening } = this.props;
    const { snackbarStore: { enqueueSnackbarStore }, userStore: { currentCoordinates } } = driverAppStore as DriverAppStore;

    if (!browserSupportsSpeechRecognition) {
      return;
    }
    this.setState({ loading: true });
    stopListening();
    postFOChat({ currentCoordinates, event: 'FO_WELCOME' })
    .then(
      async (postFOChatResponse) => {
        this.setState({ loading: false });
        await this.pushText(postFOChatResponse.text, 'incoming', postFOChatResponse.support, postFOChatResponse.audio);
      },
    )
    .catch((e) => {
      enqueueSnackbarStore('Technical error communicating with bot', { variant: 'error' });
    });
  }

  async pushText(text: ReactNode, type: 'incoming' | 'outgoing', support = {}, audio?: string, loads?: (Load[] | undefined)) {
    const { startListening, stopListening, driverAppStore } = this.props;
    const { renderingText } = this.state;
    if (type === 'outgoing') {
      this.setState({
        renderingText: [...renderingText, { text, type }],
      });
      try {
        this.setState({ loading: true });
        const { snackbarStore: { enqueueSnackbarStore }, userStore: { currentCoordinates } } = driverAppStore as DriverAppStore;
        try {
          const foChatResponse = await postFOChat({ text, currentCoordinates });
          this.pushText(foChatResponse.text, 'incoming', foChatResponse.support, foChatResponse.audio);
          if (foChatResponse.initiate_phone_call) {
            this.automaticCall(foChatResponse.initiate_phone_call);
          } else if (foChatResponse.load_ids && foChatResponse.load_ids.length > 0) {
            this.setState({ loading: true });
            try {
              const loads = await this.lazyDownloadLoads(foChatResponse.load_ids);
              loads.forEach(load => load && load.downloadLoadWithDistanceInMiles());
              this.pushText('', 'incoming', foChatResponse.support, foChatResponse.audio, loads);
              this.setState({ loading: false });
            } catch (e) {
              enqueueSnackbarStore('Encountered error showing loads', { variant: 'error' });
            }
          }
        } catch (e) {
          enqueueSnackbarStore('Technical error communicating with bot', { variant: 'error' });
        }
      } catch (e) {
      } finally {
        this.setState({ loading: false });
      }
    } else {
      if (text) {
        stopListening();
        this.setState({
          support,
          renderingText: [...renderingText, { text, type, loads }],
        });
        if (!loads && audio) {
          try {
            const snd = new Audio(`data:audio/wav;base64,${audio}`);
            this.setState({ speaking: true });
            await snd.play();
            snd.onended = (() => {
              this.setState({
                speaking: false,
              });
              setTimeout(startListening, 500);
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          startListening();
        }
      } else {
        this.setState({
          support,
          renderingText: [...renderingText, { text, type, loads }],
        });
      }
    }
  }

  lazyDownloadLoads = async (loadIds: string[]) => await Promise.all(loadIds.map(loadId => ApiLayer.getLoad(loadId)));

  scrollToBottom = () => {
    if (this.bottomScrollDivRefHandler.current !== null) {
      this.bottomScrollDivRefHandler.current.scrollTop = this.bottomScrollDivRefHandler.current.scrollHeight + 500;
    }
  };

  componentDidUpdate(prevProps: Readonly<IFOChatbotProps & WithStyles<typeof styles>>, prevState: Readonly<IFOChatbotState>) {
    if ((prevProps.finalTranscript !== this.props.finalTranscript) && this.props.finalTranscript) {
      this.prepareFinalTranscript();
    }
    if (prevState.renderingText.length !== this.state.renderingText.length) {
      this.scrollToBottom();
    }
  }

  toggleListening = () => {
    const { startListening, stopListening, listening } = this.props;
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  textFieldChangeHandler = (e) => {
    this.setState({ inputText: e.target.value });
  };

  sendTextFieldValue = async () => {
    const { inputText } = this.state;
    if (inputText) {
      this.pushText(inputText, 'outgoing');
      this.setState({ inputText: '' });
    }
  };

  sendTextFieldValueOnEnterKey = async (e) => {
    if (e.keyCode === 13) { // enter pressed
      await this.sendTextFieldValue();
    }
  };

  handleEmailClick = async () => {
    const { renderingText, support } = this.state;
    const textWithType = renderingText.map(({ text, type }) => {
      return `${this.getTypeText(type)} ${text}`;
    });
    const transcript = textWithType.join('<br>');
    await postFOChatEmail(transcript, support['email']);
  };

  getTypeText = (type: 'incoming' | 'outgoing') => {
    const { driverAppStore } = this.props;
    const {
      userStore: { FOUser },
    } = driverAppStore as DriverAppStore;
    return type === 'incoming' ? 'BRF (Bot)' : `${FOUser.displayName}`;
  };

  getTextRender = (value: IrenderingText, index: number) => {
    const { text, type, loads } = value;
    const {
      classes,
      driverAppStore,
    } = this.props;
    const {
      userStore: { FOUser },
    } = driverAppStore as DriverAppStore;

    if (loads !== undefined && loads.length > 0) {
      return (
        <SwipeableViews enableMouseEvents ignoreNativeScroll style={swipeableViewsStyle}>
          {loads.map((load, indexLoad) => (
            <FOGrid key={indexLoad} hSpacing={1.5} vSpacing={1} justify='flex-start'>
              <CardActionArea onClick={this.cardItemClick(indexLoad + 1)}>
                <Grow in appear>
                  <Paper className={classNames({ [classes.paper]: type === 'outgoing' })}>
                    <FOGrid hSpacing={1.5} vSpacing={1}>
                      <Typography>
                        Shipment number: {indexLoad + 1}
                      </Typography>
                    </FOGrid>
                    <Divider />
                    <LocationPriceLoadInfo
                      pickup={load.pickups[0]}
                      dropoff={load.dropoffs[0]}
                      distance={load.distanceInMiles}
                      radius={load.deadheadInMiles}
                      equipmentTypeList={load.equipmentTypeFormatted}
                      flatRate={load.flatRate}
                      perMileRate={load.perMileRate}
                      distanceLoading={load.distanceStore.loading}
                      noRateText='Call for price'
                      loadSmart={load.loadSmart}
                      companyLogo={load.companyLogo}
                      companyName={load.contact?.companyName}
                    />
                  </Paper>
                </Grow>
              </CardActionArea>
            </FOGrid>
          ))}
        </SwipeableViews>
      );
      // return (
      //   <GridList className={classes.gridList} cellHeight={250}>
      //     {loads.map((load, indexLoad) => (
      //       <CardActionArea onClick={this.cardItemClick(indexLoad + 1)}>
      //         <Grow in appear>
      //           <Paper className={classNames({ [classes.paper]: type === 'outgoing' })}>
      //             <LocationPriceLoadInfo
      //               pickup={load.pickups[0]}
      //               dropoff={load.dropoffs[0]}
      //               distance={load.distanceInMiles}
      //               radius={load.deadheadInMiles}
      //               equipmentTypeList={load.equipmentTypeFormatted}
      //               flatRate={load.flatRate}
      //               perMileRate={load.perMileRate}
      //               distanceLoading={load.distanceStore.loading}
      //               rateLabel={'You\'ll receive'}
      //               noRateText='Call for price'
      //               loadSmart={load.loadSmart}
      //             />
      //           </Paper>
      //         </Grow>
      //       </CardActionArea>
      //     ))}
      //   </GridList>
      // );
    }

    return (
      <FOGrid key={index} hSpacing={1.5} vSpacing={1} justify={type === 'incoming' ? 'flex-start' : 'flex-end'}>
        <Grid item xs={11}>
          <CardActionArea disabled>
            <Grow in appear>
              <Paper className={classNames({ [classes.paper]: type === 'outgoing' })}>
                <FOGrid
                  hSpacing={1.5}
                  vSpacing={0.5}
                  direction='column'
                  alignItems={type === 'incoming' ? 'flex-start' : 'flex-end'}
                >
                  {this.getTypeText(type)}
                  <Typography variant='subtitle1' color='inherit'>
                    {text}
                  </Typography>
                </FOGrid>
              </Paper>
            </Grow>
          </CardActionArea>
        </Grid>
      </FOGrid>
    );
  };

  getInputFieldRender = () => {
    const { speaking, inputText, support } = this.state;
    const { classes, listening } = this.props;
    if (support && 'call' in support) {
      // Just show support call/email.
      return (
        <Paper square>
          <FOGrid container>
            <Grid item xs={6}>
              <a href={`tel:${support['call']}`}>
                <IconButton
                  color='primary'
                  className={classes.supportIcon}
                >
                  <Call />
                  &nbsp;&nbsp;{support['call']}
                </IconButton>
              </a>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                color='primary'
                className={classes.supportIcon}
                onClick={this.handleEmailClick}
              >
                <Email />
                &nbsp;&nbsp;{support['email']}
              </IconButton>
            </Grid>
          </FOGrid>
        </Paper>
      );
    }
    return (
      <Paper square>
        <FOGrid item hSpacing={1.5} vSpacing={1}>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder='Ask the bot'
              variant='outlined'
              color='primary'
              value={inputText}
              onChange={this.textFieldChangeHandler}
              InputProps={{
                onKeyDown: this.sendTextFieldValueOnEnterKey,
                endAdornment: (
                  <InputAdornment position='end'>
                    <Send onClick={this.sendTextFieldValue} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              color={listening ? 'primary' : 'default'}
              disabled={speaking}
              className={classNames({ [classes.pulse]: listening })}
              onClick={this.toggleListening}
            >
              <Mic />
            </IconButton>
          </Grid>
        </FOGrid>
      </Paper>
    );
  };

  cardItemClick = (shipmentNumber?: number) => async () => {
    if (shipmentNumber) {
      await this.pushText(`Select ${shipmentNumber}`, 'outgoing', {});
    }
  };

  automaticCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`);
  };

  render() {
    const { classes, browserSupportsSpeechRecognition, driverAppStore } = this.props;
    const { renderingText, loading } = this.state;
    const {
      userStore: { FOUser },
    } = driverAppStore as DriverAppStore;
    if (!browserSupportsSpeechRecognition) {
      return;
    }

    return (
      <div className={classes.root}>
        <Grid container direction='column' justify='flex-end' className={classes.container} wrap='nowrap'>
          <div className={classes.chatMessagesContainer} ref={this.bottomScrollDivRefHandler}>
            {renderingText.map(this.getTextRender)}
            {loading && (
              <FOGrid hSpacing={1.5} vSpacing={1}>
                <Grid item xs={11}>
                  <Grow in appear>
                    <Paper>
                      <FOGrid
                        hSpacing={1.5}
                        vSpacing={0.5}
                      >
                        <Typography variant='subtitle1' color='inherit'>
                          ...
                        </Typography>
                      </FOGrid>
                    </Paper>
                  </Grow>
                </Grid>
              </FOGrid>
            )}
          </div>
          {this.getInputFieldRender()}
        </Grid>
      </div>
    );
  }
}

const options = {
  autoStart: false,
  continuous: false,
};

export default withStyles(styles)(SpeechRecognition(options)(FOChatbot));
