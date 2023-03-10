import React, { useState } from "react"
import ExhibitionForm from '../shared/ExhibitionForm'



const EditExhibition = (props) => {
    const { user, updateExhibition, triggerRefresh, msgAlert } = props

    const [exhibition, setExhibition] = useState(props.exhibition)

    const onChange = (e) => {
        e.persist()

        setExhibition(prevExhibition => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the previous exhibition ', updatedName)
            console.log('this is the updated exhibition ', updatedValue)


            const updatedExhibition = {
                [updatedName] :  updatedValue
            }
            return {
                ...prevExhibition, ...updatedExhibition
            }

        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateExhibition(user, exhibition)
            .then(res => { navigate(`/exhibitions/`)})
            .then(() => {
                msgAlert({
                    heading: 'Yeah!',
                    message: 'Successfully edited exhibition',
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Uh oh!',
                    message: 'Failed to edi exhibition',
                    variant: 'danger'
                })
            })
    }

    return (
        <ExhibitionForm
            exhibition={exhibition}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Update your Exhibition!"
        />
    )
}

export default EditExhibition