import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    createAt: column.date({ default: new Date() }),
    role: column.text({references: ()=> Role.columns.id}), // user, admin, super-user
  }
})

const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true}),
    name: column.text({ unique: true }),
  }

})


//productos
const Product = defineTable({
  columns:{
    id: column.text({primaryKey: true, unique: true}),
    stock: column.number(),
    slug: column.text(),
    price: column.number(),
    size: column.text(),
    type: column.text(),
    tag: column.text(),
    description: column.text(),
    gender: column.text(),

    user: column.text({references: ()=> User.columns.id}),
  }
})

const ProductImage = defineTable({
  columns:{
    id: column.text({primaryKey: true}),
    product: column.text({references: ()=> Product.columns.id}),
    image: column.text(),
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Role,
    Product,
    ProductImage,
  },
});
