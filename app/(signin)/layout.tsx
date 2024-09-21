import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
    return <div className="container mx-auto min-h-96 h-[90vh] grid place-items-center">
        {props.children}
    </div>;
}

export default Layout;