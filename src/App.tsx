import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import Router from "./Router";
import Nav from "./components/Nav";
import React from "react";
Amplify.configure(config);

export default function App() {
    return (
        <>
            <Nav />
            <Router />
        </>
  );
}
