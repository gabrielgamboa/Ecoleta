import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {
    async index(req: Request, res: Response) {
        //cidade, UF, items
        const {city, uf, items} = req.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json(points);
    }
    
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(400).json({ message: 'Point not found.' })
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return res.json({point, items});
    }
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        // Caso a segunda query não funcione, a primeira não funcionará com esse TRANSACTION
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        //  ao final da função INSERT do knex, ele retorna o ID do registro criado
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })

        await trx('point_items').insert(pointItems);

        await trx.commit();
        
        return res.json({
            id: point_id,
            ...point,
        })
    }
}

export default PointsController;