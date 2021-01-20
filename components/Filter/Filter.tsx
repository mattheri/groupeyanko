import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button/Button';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import Link from 'next/link';
import styles from './filter.module.scss';
import Col from 'react-bootstrap/Col';

export function Filter() {

    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const handleSortCategories = () => {
        const parents = appState.categories.map(category => {
            if (!category.parent) {
                return {
                    ref: category.id,
                    category: category,
                    sub: []
                }
            }
        }).filter(Boolean);

        appState.categories.forEach(category => {
            if (category._links.up) {
                parents.forEach(parent => {
                    if (parent.ref === category.parent) {
                        parent.sub.push(category);
                    }
                })
            }
        })
        return parents;
    }

    React.useEffect(() => console.log(appState.categories), [appState.categories]);

    return (
        <>
            <Col as={motion.aside} layout animate={{ x: 0 }} xs={2} className={styles.filter}>
                <ul>
                    {handleSortCategories().map(parentCategory => {
                        return (
                            <li>
                                <Link href={{
                                    pathname: '/category/[id]',
                                    query: { id: `${parentCategory.category.id}`}
                                }}>
                                    {parentCategory.category.name}
                                </Link>
                                {parentCategory.sub.length > 0 && 
                                    <ul>
                                        {parentCategory.sub.map(category =>
                                            <li>
                                                <Link href={{
                                                    pathname: '/category/[id]',
                                                    query: { id: `${category.id}`}
                                                }}>{category.name}</Link>
                                            </li>)}
                                    </ul>
                                }
                            </li>
                        )
                    })}
                </ul>
            </Col>
        </>
    );
}