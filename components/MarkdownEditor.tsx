import { useEffect, useRef, useState } from 'react'

import { EditorState } from '@codemirror/state';
import {EditorView, keymap, lineNumbers } from "@codemirror/view"
import {defaultKeymap, history} from "@codemirror/commands"
import { markdown } from '@codemirror/lang-markdown';
//import { oneDark } from '@codemirror/theme-one-dark';

import {tags} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"

const style = HighlightStyle.define([
    {tag: tags.keyword, color: "#fc6"},
    {tag: tags.link, color: 'plum' },
    {tag: tags.comment, color: "#f5d", fontStyle: "italic"},
    {tag: tags.heading, color: '#ad8eaa', fontWeight: 'bold'},
    {tag: tags.list, color: '#A8BD91' },
    {tag: tags.url, color: '#A8BD91' },
    {tag: tags.literal, color: 'salmon' },
    {tag: tags.monospace, color: '#969DA4' },
    {tag: tags.strong, fontWeight: 'bold' },
    {tag: tags.emphasis, fontStyle: 'italic' },
])

let theme = EditorView.theme( {
    "&": {
        color: "white",
        backgroundColor: "black"
    },
    ".cm-gutters": {
        backgroundColor: "black",
        color: "#777",
        border: "none"
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "white"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#666"
    },
    ".cm-content": {
        caretColor: "white"
    },
}, {dark: true});

import {syntaxHighlighting} from "@codemirror/language"

const Editor = (props) => {
    const editor = useRef();
    const [view, setView] = useState(null);
    const onUpdate = EditorView.updateListener.of((v) => {
        props.update(v.state.doc.toString());
    });
    //props.value = props.value ;//|| 'Write some markdown here';
    if(!props.update) {
        props.update = (txt) => {};
    }

    let contents = `${props.value}`;

    useEffect(() => {
        const state = EditorState.create({
            doc: contents,
            extensions: [
                keymap.of(defaultKeymap),
                onUpdate,
                //oneDark,
                syntaxHighlighting(style),
                theme,
                markdown(),
                lineNumbers(),
                history(),
            ],
        });
        const _view = new EditorView({
            state: state,
            parent: editor.current,
        });
        setView(_view);
        return () => {
            _view.destroy();
        };
    }, []);
    useEffect(() => {
        if(view) {
            view.dispatch({ 'changes': { from: 0, to: view.state.doc.length, insert: props.value }});
        }
    }, [props.value]);
    return <div ref={editor} style={{position: "relative"}}></div>;
};

export default Editor;
