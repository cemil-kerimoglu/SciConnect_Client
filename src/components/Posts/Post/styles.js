import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    // height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '100px',
    left: '65px',
    color: 'white',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingBottom: '2px',
    backgroundColor: theme.palette.text.primary,
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '0.2px',
    color: 'black',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  pdfViewer: {
    width: '50px',
    height: '50px',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
  },
  pdfWrapper: {
    height: '150px',
    overflow: 'hidden',
  },
}));