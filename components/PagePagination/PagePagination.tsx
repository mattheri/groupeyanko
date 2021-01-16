import React from 'react';
import cn from 'classnames';
import styles from './pagepagination.module.scss';

type PaginationProps = {
    length: number,
    active: number,
    toggle: React.Dispatch<React.SetStateAction<number>>
}

export function PagePagination({ length, active, toggle }: PaginationProps) {

    const indexes = [];

    for (let i = 1; i <= length; i++) {
        indexes.push(i);
    };

    return (
        <section className={styles.pagination}>
            {length > 1 &&
            <>
                <button className={styles.paginationControls} disabled={active === 0} onClick={() => toggle(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-start" viewBox="0 0 16 16">
                    <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z"/>
                </svg>
                </button>

                <button className={styles.paginationControls} disabled={active === 0} onClick={() => toggle(curr => curr = curr - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                </svg>
                </button>

                {indexes.map(index => {
                    return <div key={index} className={cn({
                        [styles.paginationBtn]: true,
                        [styles.active]: active === index - 1
                    })} onClick={() => toggle(index - 1)}>{index}</div>
                })}

                <button className={styles.paginationControls} disabled={active === length - 1} onClick={() => toggle(curr => curr = curr + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                </svg>
                </button>

                <button className={styles.paginationControls} disabled={active === length - 1} onClick={() => toggle(length - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-end" viewBox="0 0 16 16">
                    <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633L10.804 8 5 11.367V4.633z"/>
                </svg>
                </button>
            </>
        }
        </section>
    );
}