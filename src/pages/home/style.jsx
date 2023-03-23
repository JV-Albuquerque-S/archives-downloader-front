import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        background-color: #e4e4e4;
        height: 150px;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
    }

    h1 {
        font-size: 40px;
        font-family: 'Kanit', sans-serif;
        padding-bottom: 10px;
        color: #383838;
    }

    section {
        display: flex;
        width: 40vw;
        justify-content: center;
    }
`

export const Form = styled.form`
    width: 280px;
    height: 100px;
    display: flex;
    align-items: center;
    font-family: 'Kanit', sans-serif;
    margin-right: 80px;

    input {
        background-color: rgb(208, 230, 245);
        height: 25px;
        width: 80%;
        border-top: rgb(208, 230, 245);
        border-left: rgb(208, 230, 245);
        border-right: rgb(208, 230, 245);
        font-size: 20px;
        font-family: 'Kanit', sans-serif;
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
}

    .disabled-button{
        background-color: #756e4d;
        color: #3f3c3c;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: rgb(177, 193, 204);
        color: #000000;
        font-family: 'Kanit', sans-serif;
        font-size: 20px;
        height: 35px;
        width: 50%;
        border-radius: 6px;
        border: none;
        margin-left: 15px;
    }
`

export const Container = styled.article`
    width: 40vw;
    background-color: rgb(188, 203, 212);
    border-radius: 30px;
    
    article {
        padding-top: 20px;
        padding-left: 20px;
        padding-bottom: 20px;
        border: solid;
        border-top: none;
        border-left: none;
        border-right: none;
        border-color: rgb(208, 230, 245);
        border-width: 2px;
        display: flex;
    }

    p {
        margin-right: 35px;
        height: 19px;
        flex-wrap: nowrap;
        overflow: scroll;
        overflow-y: hidden;
    }
    
    p::-webkit-scrollbar {
        display: none;
    }

    .name {
        width: 120px;
    }

    .ext {
        width: 50px;
    }

    .stored {
        width: 160px;
    }
`