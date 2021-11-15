import { makeStyles } from '@material-ui/core'

const loginStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '23.4375vw',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  body: {
    width: "31.25vw",
  },
  errorMsg: {
    color: 'red',
  },
  heading: {
    textAlign: 'center',
  },
}))

export default loginStyle
