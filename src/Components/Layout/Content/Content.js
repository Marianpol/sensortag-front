import React from 'react';

const Content = ({children}) => {
    return (
        <main>
            <section>
                {children}
            </section>
        </main>
    )
}

export default Content;