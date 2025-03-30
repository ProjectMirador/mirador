import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/SearchSharp';
import Typography from '@mui/material/Typography';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from './MiradorMenuButton';

const customStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (provided) => ({
        ...provided,
        marginTop: '10px', // Adjust as needed
        fontFamily: 'Arial',
    }),
    menu: (provided) => ({
        ...provided,
        fontFamily: 'Arial',
    }),
    option: (provided) => ({
        ...provided,
        fontFamily: 'Arial',
    }),
}

export function AnnotationsFilter({
  availableTags,
  setInputSearch,
  setTagsSearch,
  t,
}) {
  return (
    <>
      <TextField
        label={t('searchPlaceholderAnnotation')}
        onChange={(e) => setInputSearch(e.target.value)}
        sx={{
          width: '100%',
        }}
        InputProps={{
          endAdornment: (
            <div style={{
              position: 'absolute',
              right: 0,
            }}
            >
              <MiradorMenuButton aria-label={t('searchAnnotationTooltip')} type="submit">
                <SearchIcon />
              </MiradorMenuButton>
            </div>
          ),
        }}
      />
      {
        availableTags.length > 0 && (
          <Select
            isMulti
            name="tagsFilter"
            options={availableTags.map(tag => ({ label: tag, value: tag }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => { setTagsSearch(e.map(tag => tag.value)); }}
            menuPortalTarget={document.body}
            styles={customStyles}
            placeholder={t('filteringByTags')}
          />
        )
      }
    </>
  );
}

AnnotationsFilter.propTypes = {
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setInputSearch: PropTypes.func.isRequired,
  setTagsSearch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
