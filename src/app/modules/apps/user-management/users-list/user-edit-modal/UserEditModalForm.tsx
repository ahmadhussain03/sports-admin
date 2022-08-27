import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
//   const {setItemIdForUpdate} = useListView()
//   const {refetch} = useQueryResponse()

//   const [userForEdit] = useState<User>({
//     ...user,
//     avatar: user.avatar || initialUser.avatar,
//     role: user.role || initialUser.role,
//     position: user.position || initialUser.position,
//     name: user.name || initialUser.name,
//     email: user.email || initialUser.email,
//   })

//   const cancel = (withRefresh?: boolean) => {
//     if (withRefresh) {
//       refetch()
//     }
//     setItemIdForUpdate(undefined)
//   }

//   const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
//   const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

//   const formik = useFormik({
//     initialValues: userForEdit,
//     validationSchema: editUserSchema,
//     onSubmit: async (values, {setSubmitting}) => {
//       setSubmitting(true)
//       try {
//         if (isNotEmpty(values.id)) {
//           await updateUser(values)
//         } else {
//           await createUser(values)
//         }
//       } catch (ex) {
//         console.error(ex)
//       } finally {
//         setSubmitting(true)
//         cancel(true)
//       }
//     },
//   })

  return (
    <>
      {(isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
