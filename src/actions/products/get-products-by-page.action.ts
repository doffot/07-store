

import {  defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { count, db, Product } from 'astro:db';

export const getProductsByPage = defineAction({
    accept: 'json',
    input: z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(12),
    }),
    handler: async ( {page, limit}) => {
        page = page < 1 ? 1 : page;

        const[totalRecord] = await db.select({ count: count() }).from(Product)
        const totalPage = Math.ceil(totalRecord.count / limit);

        if(page > totalPage) {
            return {
                products: [],
                page: totalPage,
                totalPage: totalPage,
            }
        }

        const products = await db.select().from(Product).limit(limit).offset((page - 1) * 12);

        return{
            products: products,
            totalPage: totalPage,
        };
    },
})