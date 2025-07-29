declare module 'react-router-bootstrap' {
    import { ComponentType } from 'react';
    import { NavLinkProps } from 'react-router-dom';
    import { NavbarBrandProps, NavLinkProps as BootstrapNavLinkProps } from 'react-bootstrap';

    export const LinkContainer: ComponentType<NavLinkProps>;
    export const IndexLinkContainer: ComponentType<NavLinkProps>;
} 