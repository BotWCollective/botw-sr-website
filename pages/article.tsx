import Layout from '../components/Layout';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid'

import {fetcher} from '@/lib/fetcher';

import { format, formatDistance } from 'date-fns'
import formatISO9075  from 'date-fns/formatISO9075'

import ButtonPrimary from '../components/ButtonPrimary'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Markdown from '@/components/Markdown'
import Editor from '@/components/MarkdownEditor'

// For throttle
import _ from 'lodash';

const Leaderboards = ({user}) => {
    let markdown = '';


    let [codeEditorText, setCodeEditorText] = useState(markdown);
    let [showEditor, setShowEditor] = useState(true);
    let [articleList, setArticleList] = useState([]);
    let [articleText, setArticleText] = useState( markdown );
    let [id, setId] = useState("");
    let [created, setCreated] = useState(new Date(1970,1,1));
    let [title, setTitle] = useState("");
    let [username, setUsername] = useState("");
    let [published, setPublished] = useState(false);
    let [autoSave, setAutoSave] = useState(false);
    let [lastSaved, setLastSaved] = useState(0);
    let [lastModified, setLastModified] = useState(0);

    const isLoggedIn = () => {
        return user && user.username;
    };

    const saveArticlePost = (article) => {
        if(!isLoggedIn()) {
            error_notify('Not logged in, unable to save articles');
            return false;
        }
        if(article.id.length <= 0) {
            return false;
        }
        return (async () => {
            const {data: data, error: err} = await fetcher(`/api/articles/${article.id}`, 'POST', article);
            if(err) {
                error_notify(err);
                return false;
            }
            if(data){
                setLastSaved(Date.now());
                setLastModified(Date.now());
                return true;
            }
            return false;
        })();
    };

    // Get Current Article Values
    const currentArticle = () => {
        return { id, created, title, username, published, text: articleText };
    };

    // Auto-Save Functions
    const throttled_saveArticlePost = useCallback(_.throttle(saveArticlePost, 3500, { trailing: true }), []);
    useEffect(() => {
        if(autoSave) {
            const current = currentArticle();
            throttled_saveArticlePost(current);
        }
        setLastModified(Date.now());
    }, [articleText]);
    useEffect(() => {
        if(autoSave) {
            const current = currentArticle();
            throttled_saveArticlePost(current);
        }
        setLastModified(Date.now());
    }, [published, title]);

    const publishArticle = async(event) => {
        event.preventDefault();
        setPublished(!published);
    };

    // Save Article Button Press
    const saveArticle = async (event) => {
        event.preventDefault();
        const article = currentArticle();
        if(await saveArticlePost(article)) {
            success_notify('Article saved', 500);
        }
    };

    // Click on Article Link
    const loadArticle = async (event, id) => {
        event && event.preventDefault();
        const {data, error} = await fetcher(`/api/articles/${id}`, 'GET');
        if(error) { error_notify(error);  }
        if(data) { setArticle(data[0]); }
    };

    const setArticle = (data) => {
        setLastSaved(0);
        setId(data.id);
        setCreated(data.created);
        setUsername(data.username);
        setTitle(data.title);
        setCodeEditorText(data.text);
    };

    const updateArticleList = async() => {
        const {data, error } = await fetcher('/api/articles', 'GET');
        if(error) { error_notify( error ); } 
        if(data) {setArticleList(data); return data;}
        return null;
    };

    // Run on Page Load/Initialization
    useEffect(() => {
        async function init() {
            const data = await updateArticleList();
            if(data && data.length > 0) {
                loadArticle(null, data[0].id);
            }
        }
        init();
    }, []);

    const updateArticleText = (value) => {
        setArticleText(value);
    };
    const updateArticleTitle = async (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    }


    // Create New Empty Article
    const newArticle = async (event) => {
        event.preventDefault();
        if(!isLoggedIn()) {
            return error_notify('Not logged in, unable to create articles');
        }
        let art = {
            username: user.username,
            title: "empty title",
            created: Date.now(),
            id: uuidv4(),
            text: "# Empty Document",
        };
        setArticle(art);
        saveArticlePost(art);
        await updateArticleList();
    };

    const deleteArticle = async (event, id) => {
        event.preventDefault();
        if(!isLoggedIn()) {
            return error_notify('Not logged in, unable to delete articles');
        }
        let article = articleList.find(art => art.id == id);
        if(!article)
            return;

        const res = confirm(`Delele article: ${article.title}`)
        if(!res) {
            return;
        }
        const {data: data, error: err} = await fetcher(`/api/articles/${id}`, 'DELETE');
        if(err) {
            error_notify(err);
        }
        if(data) {
            success_notify('Article deleted', 1000);
        }
        await updateArticleList();
    };

    function showHideEditor(event) {
        event.preventDefault();
        setCodeEditorText(articleText);
        setShowEditor(!showEditor);
    }

    const error_notify = (message) => toast.error(message, {
        theme: 'dark',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });
    const success_notify = (message, autoClose = 3000) => toast.success(message, {
        theme: 'dark',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    return (
        <Layout title="Fort Hateno: Article" user={user}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            draggable={false}
          />

          <div style={{margin: "2em"}}>
            <div style={{background: "gray"}}>
              Articles
              <ul>
                {articleList.map(art =>
                    <li key={art.id}>
                      <Link href="#">
                        <a onClick={(ev) => loadArticle(ev, art.id) }>
                          {art.title} - {art.username} - {formatISO9075(new Date().setTime(art.created))}
                        </a></Link> -  <a href="#" onClick={(ev) => deleteArticle(ev, art.id)}>Delete</a>
                    </li>
                )}
              </ul>
            </div>
            <h1>Editor</h1>
            <ButtonPrimary onClick={(ev) => showHideEditor(ev)}>
              Show/Hide Editor
            </ButtonPrimary>
            <ButtonPrimary onClick={(ev) => newArticle(ev) }>New Article</ButtonPrimary>
            <ButtonPrimary onClick={(ev) => saveArticle(ev) }>Save Article</ButtonPrimary>
            <ButtonPrimary onClick={(ev) => publishArticle(ev) }>{(published) ? "Unpublish Article" : "Publish Article"}</ButtonPrimary>
            <input type="checkbox" id="autosave_id" value={autoSave} onClick={() => setAutoSave(!autoSave)}/>

            <label htmlFor="autosave_id">Auto-Save</label>
            <div>
              <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown Help</a>
            </div>
            <div>
              Title <input style={{width:"30em"}} value={title} onInput={(ev) => updateArticleTitle(ev) }/>
            </div>
            <div>ID: {id}</div>
            <div>Username: {username}</div>
            <div>Published: {(published) ? "published" : "not published"}</div>
            <div>Created: {formatISO9075(new Date().setTime(created))}</div>
            { lastSaved != 0 && <div>Last Save: {formatISO9075(lastSaved)}</div>}
            { lastSaved != 0 && <div>Modified {formatDistance(lastModified, lastSaved)} ago</div> }
            { lastSaved == 0 && <div>Not Saved</div>}
            <div style={{display: "flex", flexFlow: "row nowrap", height: "35em"}}>
              { showEditor &&
              <div style={{width:"100%", height:"100%", background: "#292C33", margin: "0em", overflow: "auto"}}>
                <Editor className="markdown-editor" value={codeEditorText} update={(val) => updateArticleText(val)} />
              </div>
              }
              <div style={{
                  width:"100%",
                  background: "#292C33",
                  padding: "1em",
                  marginLeft: "0.1em",
                  overflow:"auto"}}>
                <Markdown txt={articleText}/>
              </div>
            </div>
          </div>
        </Layout>
    );
};

/*




*/
import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default Leaderboards;
