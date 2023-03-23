import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";

import {Page, Form, SideBox, Container} from "./style";

export default function DownloadPage() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [extension, setExtension] = useState("");
    const [files, setFiles] = useState([]);
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

    /*function showFiles() {
        if(files === null){
            return <ThreeDots width={51} height={13} color="#D1D1D4" />
        }
        else if(files === "") {
            return <>No files uploaded yet.</>
        }
        else if(files === "error") {
            return <>An error occured while trying to fetch the files, please refresh the page.</>
        }
        else{
            return (
                files.map((file) => {
                    if(file!=null){
                        return (
                            <Page>

                            </Page>
                        )
                    }
                })
            );
        }
    }*/

    //const callShowFiles = showFiles();

    function nameFilter(e){
        e.preventDefault();
        setDisable(true)
        
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
            console.log(res.data)
        });
        promise.catch((e) => {
            console.log(e.response.data);
            return setDisable(false);
        })
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
                                    <input type="checkbox" />
                                </form>
                                <p className="name">{file.name}</p>
                                <p className="ext">{file.ext}</p>
                                <p className="stored">{file.stored_in}</p>
                                <p className="created">{file.created_at}</p>
                            </article>
                        )
                    })}
                </Container>
        </Page>
    )
}