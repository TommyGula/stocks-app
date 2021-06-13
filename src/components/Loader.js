import React from 'react';

import '../styles/components/Loader.css';

const Loader = () => {
    return(
        <tr className="Loader_tr">
            <td colSpan='7' className="Loader_td">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </td>
        </tr>
    )
};

export default Loader;