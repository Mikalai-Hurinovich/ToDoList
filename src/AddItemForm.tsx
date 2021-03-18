import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
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
            <input className={error ? 'error' : ''}
                   onChange={changeTitle}
                   value={title}
                   onKeyPress={onKeyPressAddItem}/>
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
            {error && <div className={'error-message'}>Title is Required!</div>}
        </div>
    )
}

export default AddItemForm;
