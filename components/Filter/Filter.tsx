import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../Button/Button';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import Link from 'next/link';
import styles from './filter.module.scss';
import Col from 'react-bootstrap/Col';
import { Category } from '../../next-env';
import axios from 'axios';

type FilterProps = {
    categories?: Category[]
}

export function Filter() {
    
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState<Category[]>();
    const handleOpen = () => setOpen(!open);
    const handleSortCategories = () => {
        const parents = categories.map(category => {
            if (!category.parent) {
                return {
                    ref: category.id,
                    category: category,
                    sub: []
                }
            }
        }).filter(Boolean);

        categories.forEach(category => {
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

    React.useEffect(() => {
        (async () => {
            const response = (await axios.get('/api/categories')).data;
            setCategories(response);

            console.log(categories);
        })();
    }, [])

    return (
        <>
            <Button className={styles.filterBtn} onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </Button>
            <AnimatePresence>
                {open && categories.length > 0 &&
                    <Col
                        key={1}
                        as={motion.aside}
                        layout
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    layoutId={''}
                        xs={10}
                        md={6}
                        lg={2}
                        className={styles.filter}>
                        <ul>
                            {handleSortCategories().map(parentCategory => {
                                return (
                                    <li>
                                        <Link href={{
                                            pathname: '/category/[id]',
                                            query: { id: `${parentCategory.category.id}` }
                                        }}>
                                            {parentCategory.category.name}
                                        </Link>
                                        {parentCategory.sub.length > 0 &&
                                            <ul>
                                                {parentCategory.sub.map(category =>
                                                    <li>
                                                        <Link href={{
                                                            pathname: '/category/[id]',
                                                            query: { id: `${category.id}` }
                                                        }}>{category.name}</Link>
                                                    </li>)}
                                            </ul>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>}
                </AnimatePresence>
        </>
    );
}