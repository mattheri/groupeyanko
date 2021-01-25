import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../Button/Button';
import Link from 'next/link';
import styles from './filter.module.scss';
import Col from 'react-bootstrap/Col';
import { Category } from '../../next-env';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { Search } from '../Search/Search';
import { delayPrefetch } from '../../utils/utils';

type FilterProps = {
    categories?: Category[]
}

export function Filter() {
    
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState<Category[]>([]);
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
            if (!categories.length) {
                const response = (await axios.get('/api/categories')).data;
                setCategories(response);
            }
        })();
    }, []);

    return (
        <>
            <Search onClick={handleOpen} toggle={open} />
            <AnimatePresence>
                {open && !categories && <Skeleton />}
                {open && categories &&
                    <Col
                        key={1}
                        as={motion.aside}
                        layout
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ marginLeft: '5%', x: -50, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    layoutId={''}
                        xs={10}
                        md={6}
                        lg={2}
                    className={styles.filter}>
                    <ul>
                            {handleSortCategories().map((parentCategory, i) => {
                                return (
                                    <li onClick={handleOpen}>
                                        <Link prefetch={delayPrefetch(1000, i)} key={i} href={{
                                            pathname: '/category/[id]',
                                            query: { id: `${parentCategory.category.id}` }
                                        }}>
                                            {parentCategory.category.name}
                                        </Link>
                                        {parentCategory.sub.length > 0 &&
                                            <ul>
                                                {parentCategory.sub.map(category =>
                                                    <li>
                                                        <Link prefetch={delayPrefetch(1000, i)} key={i} href={{
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