import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  JoinContainer, 
  JoinHeader, 
  Spacer, 
  JoinH1, 
  JoinMain, 
  JoinLabel, 
  JoinInput, 
  ErrorContainer 
} from './style';

const Join = ({history}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      room: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      room: Yup.string()
        .required('Required'),
    }),
    onSubmit: ({ name, room }) => {
      history.push({
        pathname: '/chat',
        state: { name, room }
      })
    },
  })

  return ( 
    <>
      <JoinContainer>
        <JoinHeader>
          <FontAwesomeIcon icon="smile" size="lg"/>
          <Spacer />
          <JoinH1>Sign In</JoinH1>
        </JoinHeader>
        <JoinMain>
          <form onSubmit={formik.handleSubmit}>
            <JoinLabel htmlFor="email">Name</JoinLabel>
            <JoinInput
              name="name"
              {...formik.getFieldProps('name')}
            />
            <ErrorContainer>
              {formik.touched.name && formik.errors.name ? formik.errors.name : null}
            </ErrorContainer>
            <JoinLabel htmlFor="password">Room</JoinLabel>
            <JoinInput
              name="room"
              {...formik.getFieldProps('room')}
            />
            <ErrorContainer>
              {formik.touched.room && formik.errors.room ? formik.errors.room : null}
            </ErrorContainer>
            <button type='submit'>Submit</button>
          </form>
        </JoinMain>
      </JoinContainer>
      
    </>
   );
}
 
export default Join;