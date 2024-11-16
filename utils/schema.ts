import {  integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core"; 


export const Book = pgTable ("book",{
    id: serial("id").primaryKey(),
    title: varchar("title").notNull(),
    author: varchar("author").notNull(),
    genre: varchar("genre").notNull(),
    description: varchar("description").notNull(),
    image: varchar("image").notNull(),
} )

export const Review = pgTable ('review',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    rate: numeric('rate').notNull(),
    review: varchar('review').notNull(),
    budgetId: integer('budgetId').references(()=>Book.id),
} )