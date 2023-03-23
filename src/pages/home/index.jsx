import { React, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";

import {Page, Form, SideBox, Container} from "./style";

export default function DownloadPage() {

    const [name, setName] = useState("");
    const [extension, setExtension] = useState("");
    const [files, setFiles] = useState([]);
    const [checkedFiles, setCheckedFiles] = useState([]);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}`)
        promise.then((res) => {
            setFiles(res.data);
            console.log(files)
            console.log('AAAAAAAAAAAAAAAAAAAA')
        })
        promise.catch((err) => {
            setFiles("error");
            console.log(err.response.data)
            console.log('BBBBBBBBBBBBBBBBBBBB')
        });
    }, []);

    function nameFilter(e){
        e.preventDefault();
        setDisable(true)
        console.log(checkedFiles)
        
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/${name}`);
        promise.then(res => {
            setFiles(res.data);
            setDisable(false);
        });
        promise.catch((e) => {
            console.log(e.response.data);
            return setDisable(false);
        })
        
    }

    function extensionFilter(e){
        e.preventDefault();
        setDisable(true);

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/extension/${extension}`);
        promise.then(res => {
            setFiles(res.data);
            setDisable(false);
            console.log(res.data)
        });
        promise.catch((e) => {
            console.log(e.response.data);
            return setDisable(false);
        })
    }

    function reloadFilters(e){
        e.preventDefault();
        setDisable(true);

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}`);
        promise.then(res => {
            setFiles(res.data);
            setDisable(false);
            console.log(res.data);
        });
        promise.catch((e) => {
            console.log(e.response.data);
            return setDisable(false);
        })
    }

    function downloadFiles(checkedFiles){
        console.log('chamou download')
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/download/1`, {
            params: {
                info: checkedFiles
            }
        });
        promise.then(res => {
            console.log(res.data);
        });
        promise.catch((e) => {
            console.log(e.response.data);
        })
    }

    function checkedBox(id, name){
        console.log('chamou checked')
        let count = 0;
        for(let i=0; i<checkedFiles.length; i++){
            if(checkedFiles[i].name===name){
                count++
                setCheckedFiles(oldValues => {
                    return oldValues.filter(checkedFile => checkedFile.name !== name)
                })
            }
        }

        count===0? setCheckedFiles(checkedFiles => [...checkedFiles, {'id': id, 'name': name}]) && console.log(checkedFiles) : console.log(checkedFiles)
    }

    return(
        <Page>
            <header>
                <h1>Download Manager</h1>
            </header>
            <section>
                <Form onSubmit={nameFilter}>
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={disable}
                        required
                    />
                    {disable === false ?
						(<button type="submit">Filter</button>) :
						(<button type="submit" className="disabled-button" disabled = {true}>
							<ThreeDots
								color='#1b1b1b'
								height={30}
								width={70}
							/>
						</button>)
					}
                </Form>
                <Form onSubmit={extensionFilter}>
                    <input
                        type="text"
                        placeholder="extension"
                        value={extension}
                        onChange={e => setExtension(e.target.value)}
                        disabled={disable}
                        required
                    />
                    {disable === false ?
						(<button type="submit">Filter</button>) :
						(<button type="submit" className="disabled-button" disabled = {true}>
							<ThreeDots
								color='#1b1b1b'
								height={30}
								width={70}
							/>
						</button>)
					}
                </Form>
                <Form onSubmit={reloadFilters}>
                {disable === false ?
						(<button>Reload</button>) :
						(<button className="disabled-button" disabled = {true}>
							<ThreeDots
								color='#1b1b1b'
								height={30}
								width={70}
							/>
						</button>)
					}
                </Form>
            </section>
                <Container>
                    {files.map(file => {
                        return(
                            <article>
                                <form>
                                    <input
                                        type="button"
                                        onClick={() => {
                                            checkedBox(file.id, file.name)
                                            console.log(checkedFiles)
                                        }}
                                    />
                                </form>
                                <p className="name">{file.name}</p>
                                <p className="ext">{file.ext}</p>
                                <p className="stored">{file.stored_in}</p>
                                <p className="created">{file.created_at.substring(0, 10)}</p>
                            </article>
                        )
                    })}
                </Container>
                <SideBox>
                    <div>
                    {checkedFiles.map(checkedFile => {
                        return(
                            <p>{checkedFile.name}</p>
                        )
                    })}
                    </div>
                    {checkedFiles.length === 0 ? 
                        (<button className="disabled-button" disabled={true}>Download</button>):
                        (<button className="enabled-button" onClick={() => downloadFiles(checkedFiles)}>Download</button>)}
                </SideBox>
        </Page>
    )
}