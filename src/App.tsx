import React, {useEffect} from 'react';
import hentApiHelse from './api/hentApiHelse';

const App = () => {
    useEffect(() => {
        hentApiHelse();
    }, []);

    return <div className="App">
        <div>tilretteleggingsbehov innsyn</div>
    </div>;

};

export default App;
