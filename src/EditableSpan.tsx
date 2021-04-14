import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const changeOnEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.changeTitle(title)
        }
    }
    return (
        editMode
            ? <TextField
                id={"standard-basic"}
                label={"Change Task"}
                variant={"outlined"}
                color={'secondary'}
                value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
                autoFocus={true}
                onKeyPress={changeOnEnter}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})


export default EditableSpan;
