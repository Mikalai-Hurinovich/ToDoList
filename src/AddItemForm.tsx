import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                size={'small'}
                label={'Title...'}
                variant={'outlined'}
                color={'secondary'}
                onChange={changeTitle}
                value={title}
                onKeyPress={onKeyPressAddItem}
                error={error}
                helperText={error && 'Title is Required!'}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})

export default AddItemForm;
