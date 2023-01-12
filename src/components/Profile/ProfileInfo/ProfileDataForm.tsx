import { Button, Checkbox, Input } from 'antd'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../redux/app-selectors'
import { getProfile } from '../../../redux/profile-selectors'
import { ProfileType } from '../../../redux/types/types'
import * as Yup from 'yup'
import './ProfileDataForm.css'

export type ContactsTypeKey = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
}

type PropsType = {
    outFromEditMode: () => void
    onSubmit: (formData: ProfileType) => void
}

export const ProfileDataForm: FC<PropsType> = memo(({ outFromEditMode, onSubmit }) => {

    const language = useSelector(getLanguage)
    const profile = useSelector(getProfile)

    const valigateSchema = Yup.object().shape({
        fullname: Yup.string()
            .min(1, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        lookingForAJobDescription: Yup.string()
            .min(3, 'Too Short!')
            .max(100, 'Too Long!'),
        aboutMe: Yup.string()
            .min(3, 'Too Short!')
            .max(100, 'Too Long!'),
    })

    return (
        // @ts-ignore
        <Formik initialValues={{ fullName: '', lookingForAJob: false, lookingForAJobDescription: '', aboutMe: '' }}
            validationSchema={valigateSchema} onSubmit={onSubmit} >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <div className='profile__fullname info'>
                        <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullname'
                            placeholder={language === 'english' ? 'Fullname' : `Повне ім'я`} className='input__field' />
                        <ErrorMessage name='fullname' component='div' className='error__message_profile' />
                    </div>
                    <div className='profile__job info'>
                        <div className='job__category'>{language === 'english' ? 'Job' : 'Робота'}:
                            <div className='profile__job_looking info' style={{ display: 'flex' }}>
                                <span style={{ color: 'black', fontWeight: '600' }}>
                                    {language === 'english' ? 'Looking for a job' : 'В пошуках роботи'}:
                                </span>
                                <Checkbox onChange={formik.handleChange} name='lookingForAJob' style={{ marginLeft: 10 }} />
                            </div>
                            <div className='profile__job_description info'>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='lookingForAJobDescription'
                                    placeholder={language === 'english' ? 'Looking for a job description' : 'Опис шуканої роботи'} className='input__field' />
                                <ErrorMessage name='lookingForAJobDescription' component='div' className='error__message_profile' />
                            </div>
                            <div className='profile__aboutMe info'>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='aboutMe'
                                    placeholder={language === 'english' ? 'About me' : 'Про мене'} className='input__field' />
                                <ErrorMessage name='aboutMe' component='div' className='error__message_profile' />
                            </div>
                        </div>
                    </div>
                    <div className='profile__contancts info'>
                        <span className='profile__contacts_title' style={{ color: 'black' }}>{language === 'english' ? 'Contacts' : 'Контакти'}: {
                            Object
                                // @ts-ignore
                                .keys(profile?.contacts)
                                .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу; по кожному елементу замапиться і відмальює компоненту Contact
                                    return (
                                        <div className='contacts' key={key}>
                                            <span style={{ color: 'black' }}>{key}:
                                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name={`contacts.${key}`}
                                                    className='input__field' type={key} style={{marginLeft: 10, marginTop: 10}} />
                                            </span>
                                        </div>
                                    )
                                })}</span>
                    </div>
                    <Button type='primary' danger htmlType='submit' onClick={outFromEditMode} style={{ marginRight: 30 }}>
                        {language === 'english' ? 'Back' : 'Назад'}
                    </Button>
                    <Button type='primary' htmlType='submit' disabled={formik.isSubmitting} >
                        {language === 'english' ? 'Save' : 'Зберегти'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
})