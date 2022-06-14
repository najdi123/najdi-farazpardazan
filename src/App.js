import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Detail, Home} from "./pages";
import Layout from "./layout";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/:id" element={<Detail/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
