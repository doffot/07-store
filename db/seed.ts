import { db, Role, User, Product,ProductImage } from 'astro:db';  
import { v4 as UUID } from 'uuid';  
import bcrypt from 'bcryptjs';  
import { seedProducts } from './seed-data';

export default async function seed() {  
    // Definir roles  
    const roles = [  
        { id: 'admin', name: 'Administrador' },  
        { id: 'user', name: 'Usuário del sistema' }  
    ];  

    // Definir usuarios  
    const johnDoe = {  
        id: UUID(),  
        name: 'John Doe',  
        email: 'john.doe@google.com',  
        password: bcrypt.hashSync('123456'),  
        role: 'admin',  
    };  

    const janeDoe = {  
        id: UUID(),  
        name: 'Jane Doe',  
        email: 'jane.doe@google.com',  
        password: bcrypt.hashSync('123456'),  
        role: 'user',  
    };  

    
        await db.insert(Role).values(roles);  
        await db.insert(User).values([johnDoe, janeDoe]);  

        const queries: any= [];

        seedProducts.forEach( (p) =>{

            const product = {
                id: UUID(),
                description: p.description,
                gender: p.gender,
                price: p.price, 
                sizes: p.sizes.join(','),
                stock: p.stock, 
                tags: p.tags.join(','),
                title: p.title,
                type: p.type,
                user: johnDoe.id,
            };

         queries.push(db.insert(Product).values(product));   

        })
      
}  
