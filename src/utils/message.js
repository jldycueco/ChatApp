import moment from 'moment';

export const formatMessage = (username, msg) => {
  return {
    username,
    msg,
    time: moment().format('h:mm a')
  }
}