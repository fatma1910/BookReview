"use client";

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/dpConfig';
import { getTableColumns , desc } from 'drizzle-orm';
import { Book } from '../../../utils/schema';
import { BookProp } from '../../../types';



const page = () => {
    const [incomelist, setIncomelist] = useState<BookProp[]>();
    const { user } = useUser();
    useEffect(() => {
        if (user) {
          getIncomelist();
        }
      }, [user]);
    
      const getIncomelist = async () => {
        const result = await db
          .select({
            ...getTableColumns(Book),
            
          })
          .from(Book)
          .orderBy(desc(Book.id));
    
        setIncomelist(result);
      };
  return (
    <div>
        {incomelist ? (
      incomelist.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}

export default page