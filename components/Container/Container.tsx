import React from 'react';
import cn from 'classnames';
import styles from './container.module.scss';

export type GripProps = {
    /* gap between each element */
    gap?: number,
    /**
     * maximum number of columns
     */
    maxCol?: number,
    grow?: boolean
}

export type ContainerProps = {
    as?: 'section' | 'div' | 'article' | 'header',
    className?: string,
    center?: boolean,
    noGutters?: boolean,
    addStyles?: React.CSSProperties,
    grid?: GripProps
}
/**
 * This element uses flex column justified center to place elements in. It has a max-width of 992px.
 * @param as string Represent the HTML you want the container to be rendered in
 * @param className string Add a custom class to the container
 * @param center boolean centers the content in the container using flex
 * @param noGutters boolean removes padding-left and padding-right
 * @param grid object add a gap in pixels (defaults to 15px), the desired number of columns (defaults to 3) and 
 * if the boxes can grow to the container width (defaults to false). The boxes have a word-break value of break-word to respect,
 * the width when using grow: false.
 * @param addStyles object add custom styles to the container
 */
export function Container({
    as: As = 'div',
    className,
    center,
    noGutters,
    grid,
    addStyles,
    children }: React.PropsWithChildren<ContainerProps>) {
    
    const classnames = cn({
        [styles.container]: true,
        [styles.center]: center,
        [styles.noGutters]: noGutters,
        [styles.grid]: grid,
        [styles.gridNoGrow]: grid && !grid.grow,
        [styles.className]: className
    });

    let childStyles: React.CSSProperties = {};
    let gridStyles: React.CSSProperties = {};

    if (grid) {
        const { gap = 15, maxCol = 3, grow = false } = grid;

        if (grow) {
            childStyles = {
                marginBottom: `${gap / 2}px`,
                marginRight: `${gap / 2}px`,
                flex: `${grow ? '1' : '0'} 0 ${(100 / maxCol) - gap}%`
            }
        } else {
            gridStyles = {
                display: 'grid',
                gridTemplateColumns: `1fr `.repeat(maxCol)
            }
            childStyles = {
                marginBottom: `${gap / 2}px`,
                marginRight: `${gap / 2}px`,
                wordBreak: 'break-word'
            }
        }
    }

    const child = React.Children.map(children,
        (c: JSX.Element) => React.cloneElement(
            c,
            { ...c.props, style: { ...childStyles } },
            [c.props.children]
        ));

    return (
        <As style={{ ...addStyles, ...gridStyles }} className={classnames}>
            {child}
        </As>
    );
}