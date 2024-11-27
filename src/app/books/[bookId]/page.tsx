'use client'
import { BookIcon, ChevronLeft, StarIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

import PostReview from "./post-review-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { db } from '../../../../pages/api/dpConfig'
import { getTableColumns,eq, desc } from 'drizzle-orm'
import { Book, Review } from '../../../../pages/api/schema'
import { BookListProps, ReviewProps } from '../../../../types'




const BookPage =  ( {params }: {params : {bookId:number}} ) => {
  const [reviews, setReview] = useState<ReviewProps[]>([])
  const [book, setBookInfo] = useState<BookListProps>()
  useEffect(() => {

    if (params.bookId) {
      getBookInfo();
   } else {
      console.error("Book ID is missing");
   }
   


  }, [params.bookId]);

  useEffect(() => {

    getAllReviews();

}, [params.bookId]);

  const getAllReviews = async () => {
      const result = await db
        .select() 
        .from(Review)
        .where(eq(Review.budgetId, params.bookId))
        .orderBy(desc(Review.id));
      setReview(result);
  };

  const getBookInfo = async () => {

    const result = await db
      .select({
        ...getTableColumns(Book),
      })
      .from(Book)
      .leftJoin(Review, eq(Book.id, Review.budgetId))
      .where(eq(Book.id, params.bookId))

    setBookInfo(result[0]);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div>
        <Button variant="link" asChild>
          <Link href="/books">
            <ChevronLeft /> Back to books
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
          {book?.imageUrl ? (
                <Image width={200} height={300} loading="lazy" src={book?.imageUrl} alt={book?.title} className="w-full flex-1 md:w-auto h-[300px] rounded " />): (
                  <div className=' w-[200px] md:w-[400px] h-[300px]'>
                    <div className="flex-1 flex  flex-col gap-2 items-center justify-center h-full w-full  mb-4 rounded-lg bg-gray-200">
                    <BookIcon className="w-10 h-10" />
                    <p>No Image</p>
                </div>
                </div>
                )
                
            }
            <div className='flex-1'>
              <CardTitle className="md:text-3xl text-xl mb-2 ">{book?.title}</CardTitle>
              <CardDescription className="text-xl mb-4">by {book?.author}</CardDescription>
              <p className="text-muted-foreground">{book?.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          {reviews.map((review) => (
            <Card key={review?.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center gap-2">

                  <CardTitle>{review?.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex justify-between items-center'>
                  <p>{review?.review}</p>
                  <div className="flex items-center gap-1 mb-2">
                  {[...Array(review?.rate)].map((_, i) => (
                    <StarIcon key={i} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                </div>
                
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter>
        {book?.id ? (
          <PostReview bookId={book?.id} refreshData={getAllReviews} />
        ) : (
          <p>Loading...</p>
        )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default BookPage
