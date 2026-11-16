import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import deburr from 'lodash/deburr';
import isObject from 'lodash/isObject';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { useTranslation } from 'react-i18next';
import MiradorMenuButton from '../containers/MiradorMenuButton';

const StyledForm = styled('form', { name: 'SearchPanelControls', slot: 'form' })(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
  width: '100%',
}));

/** Sometimes an autocomplete match can be a simple string, other times an object
    with a `match` property, this function abstracts that away */
const getMatch = (option) => (isObject(option) ? option.match : option);

/** */
export function SearchInputForm({
  id,
  inputValue = '',
  isFetching = false,
  onInputChange,
  onSelectItem,
  onSubmit,
  suggestions = [],
}) {
  const { t } = useTranslation();

  const handleSelect = (_event, selectedItem) => {
    const match = selectedItem && getMatch(selectedItem);
    if (match) {
      onSelectItem(match);
    }
  };

  return (
    <StyledForm aria-label={t('searchTitle')} onSubmit={onSubmit}>
      <Autocomplete
        id={id}
        inputValue={inputValue}
        options={suggestions}
        getOptionLabel={getMatch}
        isOptionEqualToValue={(option, value) =>
          deburr(getMatch(option).trim()).toLowerCase() === deburr(getMatch(value).trim()).toLowerCase()
        }
        noOptionsText=""
        onChange={handleSelect}
        onInputChange={onInputChange}
        freeSolo
        slotProps={{ popper: { disablePortal: true } }}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('searchInputLabel')}
            variant="standard"
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.InputProps,
                ...params.slotProps?.input,
                endAdornment: (
                  <InputAdornment sx={{ position: 'relative' }} position="end">
                    <MiradorMenuButton aria-label={t('searchSubmitAria')} type="submit">
                      <SearchIcon />
                    </MiradorMenuButton>
                    {Boolean(isFetching) && (
                      <CircularProgress
                        sx={{
                          left: '50%',
                          marginLeft: '-25px',
                          marginTop: '-25px',
                          position: 'absolute',
                          top: '50%',
                        }}
                        size={50}
                      />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </StyledForm>
  );
}

SearchInputForm.propTypes = {
  id: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  isFetching: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
};

export default SearchInputForm;
