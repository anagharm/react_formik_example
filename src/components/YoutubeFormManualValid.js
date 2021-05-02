import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError';

const initialValues = {
    name    : "Anagha",
    email   : "",
    channel : "",
    comments: "",
    address : "",
    social  : {
                    facebook : '',
                    twitter  : ''
                },
    phoneNumbers : ["",""],
    phNumbers    : ['']
};

const onSubmit = values => {
    console.log('Form data ',values)
};

const validationSchema = Yup.object({
    name    : Yup.string().required('Required!'),
    email   : Yup.string().email('Invalid email format').required('Required!'),
    channel : Yup.string().required('Required!')
})
//Field Level Validation
const validationComments  = value => {
    var error;
    if(!value){
        error = 'Required'
    }
    return error
}

function YoutubeFormManualValid() {

    return (
        <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}
                // validateOnMount
                // validateOnBlur={false}
                // validateOnChange={false}
        >
            {
                formik => {
                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name"/>
                                <ErrorMessage name='name' component={TextError}/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor="email">E-mail</label>
                                <Field type="text" id="email" name="email"/>
                                <ErrorMessage name='email'>
                                    {
                                        (errorMsg) => <div className='error'>{errorMsg}</div>
                                    }
                                </ErrorMessage>
                            </div>

                            <div className='form-control'>
                                <label htmlFor="channel">Channel</label>
                                <Field type="text" id="channel" name="channel" placeholder="Youtube channel name"/>
                                <ErrorMessage name='channel' />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="comments">Comments</label>
                                <Field as="textarea" id="comments" name="comments" validate={validationComments}/>
                                <ErrorMessage name='comments' component={TextError}/>
                            </div>

                            <div className='form-control'>
                                <label htmlFor="address">Address</label>
                                <FastField name="address">
                                    {
                                        (props) => {
                                            const {field, form, meta } = props
                                            return <div>
                                                        <input type="text" id="address" {...field} />
                                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                    </div>
                                        }
                                    }
                                </FastField> 
                            </div>

                            <div className='form-control'>
                                <label htmlFor="facebook">Facebook Profile</label>
                                <Field type="text" id="facebook" name="social.facebook" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="twitter">Twitter Profile</label>
                                <Field type="text" id="twitter" name="social.twitter" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="primaryPh">Primary Phone Number</label>
                                <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="secondaryPh">Secondary Phone Number</label>
                                <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="listPh">List of Phone Numbers</label>
                                <FieldArray name="phNumbers">
                                    {
                                        (fieldArrayProps) => {
                                                                const { push, remove, form } = fieldArrayProps 
                                                                const { values } = form
                                                                const { phNumbers } = values
                                                                return <div>
                                                                            {
                                                                                phNumbers.map((phNumber, index) => (
                                                                                    <div key={index}>
                                                                                        <Field name={`phNumbers[${index}]`} />
                                                                                        {
                                                                                            index > 0 &&
                                                                                            <button type="button" onClick={() => remove(index)}>{'  '} - {'  '}</button>
                                                                                        }                                                                            
                                                                                        <button type="button" onClick={() => push('')}> {'  '} + {'  '} </button>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                            }
                                    }
                                </FieldArray>
                            </div>

                            <button type="button" onClick={() => formik.validateField('comments')}>Validate Comments</button>
                            <button type="button" onClick={() => formik.validateForm()}>Validate All Fields</button>
                            <button type="button" onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
                            <button type="button" onClick={() => formik.setTouched({name :  true, email : true, channel : true , comments : true})}>Visit All Fields</button>
                            <button type="submit" disabled={!formik.isValid}>Submit</button>
                        </Form>
                    )
                }
            }
            
        </Formik>
    )
}

export default YoutubeFormManualValid
