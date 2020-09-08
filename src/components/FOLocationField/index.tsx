import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import Autosuggest from 'react-autosuggest';
import { MenuItem, Paper, TextField, Theme, withStyles } from '@material-ui/core';


const styles = (theme: Theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 200000,
    marginTop: '-20px',
    left: 0,
    right: 0,
  },
  suggestionsContainerRelative: {
    position: 'relative',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    color: '#000',
  },
  helperText: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
});

function renderInput(inputProps) {
  const {
    className,
    ref,
    input,
    meta: { touched, error },
    disabled,
    variant,
    label,
    hideAdornment,
    endAdornment,
    startAdornment,
    classes,
    inputClasses,
    labelClasses,
    helperTextClasses,
    ...other
  } = inputProps;
  const filled = variant === 'filled';

  return (
    <TextField
      fullWidth
      variant={variant}
      disabled={disabled}
      label={label}
      className={className}
      error={touched && !!error}
      helperText={(touched && error) || ' '}
      FormHelperTextProps={{ className: `${(filled && classes.helperText)} ${helperTextClasses}` }}
      InputProps={{
        disableUnderline: filled,
        classes: inputClasses,
        inputRef: ref,
        ...other,
        startAdornment: (!hideAdornment && startAdornment),
        endAdornment: (!hideAdornment && endAdornment),
      }}
      InputLabelProps={{ classes: labelClasses }}
    />
  );
}

@observer
class FOLocationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
    const googleMaps = props.googleMaps
      || (window.google // eslint-disable-line no-extra-parens
        && window.google.maps)
      || this.googleMaps;
    this.googleMaps = googleMaps;
    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.geocoder = new googleMaps.Geocoder();
  }

  getSuggestionValue = (suggestion) => {
    const { input, programmaticFormSubmit } = this.props;
    if (suggestion.place_id) {
      this.geocoder.geocode({ placeId: suggestion.place_id }, (geocodeResults) => {
        if (geocodeResults && geocodeResults.length > 0) {
          input.onChange({
            ...suggestion,
            ...geocodeResults[0],
            description: geocodeResults[0].formatted_address,
            coordinates: {
              lat: geocodeResults[0].geometry.location.lat(),
              lng: geocodeResults[0].geometry.location.lng(),
            },
          });
          if (programmaticFormSubmit) {
            programmaticFormSubmit();
          }
        } else {
          input.onChange({
            ...suggestion,
            description: suggestion.description,
            coordinates: null,
          });
        }
      });
    } else {
      input.onChange({
        ...suggestion,
        description: suggestion.description,
        coordinates: null,
      });
    }
    return suggestion.description;
  };

  handleSuggestionsFetchRequested = (citiesOnly?: boolean) => debounce(({ value }) => {
    this.autocompleteService.getPlacePredictions(
      {
        input: value,
        componentRestrictions: {
          country: ['us', 'ca'],
        },
        types: citiesOnly ? ['(cities)'] : undefined,
      },
      (suggestResults) => {
        this.setState({
          suggestions: suggestResults || [],
        });
      },
    );
  }, 500);

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    const { input } = this.props;
    input.onChange({
      description: newValue,
      coordinates: null,
    });
  };

  renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => (
    <MenuItem selected={isHighlighted} component='div'>
      {suggestion.description}
    </MenuItem>
  );

  handleKeyPress = (e) => {
    const { onEnterPress } = this.props;
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  render() {
    const {
      name,
      placeholder,
      className,
      inputClasses,
      labelClasses,
      helperTextClasses,
      input,
      classes,
      meta,
      disabled,
      hideAdornment,
      label,
      variant,
      startAdornment,
      endAdornment,
      citiesOnly,
      programmaticFormSubmit,
      suggestionsContainerRelative,
    } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classNames(classes.suggestionsContainerOpen, {
            [classes.suggestionsContainerRelative]: suggestionsContainerRelative,
          }),
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested(citiesOnly)}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          onKeyPress: this.handleKeyPress,
          name,
          disabled,
          hideAdornment,
          variant,
          placeholder,
          label,
          className,
          classes,
          meta,
          startAdornment,
          endAdornment,
          inputClasses,
          labelClasses,
          helperTextClasses,
          value: input.value ? input.value.description : '',
          onChange: this.handleChange,
        }}
      />
    );
  }
}

FOLocationField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  custom: PropTypes.object,
  onLocationSelect: PropTypes.func,
  meta: PropTypes.object,
  classes: PropTypes.object,
  googleMaps: PropTypes.object,
  disabled: PropTypes.bool,
  onEnterPress: PropTypes.func,
};

export default withStyles(styles)(FOLocationField);
