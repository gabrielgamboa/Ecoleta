import React from 'react';

//objeto contendo o que os componentes vao receber de propriedades

interface HeaderProps {
    title: string;
}
// todo componente deve ter letra maiúscula
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;