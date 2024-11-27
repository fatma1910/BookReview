'use client'
import React, { useEffect, useState } from "react";
import { db } from "../../../pages/api/dpConfig";
import { Book } from "../../../pages/api/schema";
import { getTableColumns } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import NewBookForm from "./_components/NewBookForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { BookListProps } from "../../../types";

const page = () => {
  const [allBooks, setAllBooks] = useState<BookListProps[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookListProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Book),
        })
        .from(Book)
        .orderBy(desc(Book.id));
      setAllBooks(result);
      setFilteredBooks(result); 
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, allBooks]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-[900px] mx-4 my-12 space-y-8">
          <div className="flex justify-between flex-col gap-4 sm:flex-row">
            <h1 className="text-3xl font-semibold">Books</h1>
            <div className="flex items-center justify-center">
              <Input
                name="search"
                type="text"
                placeholder="Search for a book"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <NewBookForm refreshData={getAllBooks} />
          </div>
          {filteredBooks.length === 0 && (
            <div className="flex flex-col h-[550px] w-full border p-12 gap-4 items-center justify-center">
              <Image
                src={"/noData.svg"}
                alt={"not found image"}
                width={200}
                height={200}
              />
              <p>No books found</p>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center mx-auto">
            {filteredBooks.map((book) => (
              <Card key={book?.id}>
                <CardHeader>
                  <CardTitle className="md:text-xl">{book?.title}</CardTitle>
                  <CardDescription>{book?.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  {book?.imageUrl ? (
                    <Image
                      width={150}
                      height={200}
                      loading="lazy"
                      src={book?.imageUrl}
                      alt={book?.title}
                      className="w-full h-[300px] rounded"
                    />
                  ) : (
                    <div className="flex-shrink-0 flex flex-col gap-2 items-center justify-center w-full h-[300px] mb-4 rounded-lg bg-gray-200">
                      <BookIcon className="w-10 h-10" />
                      <p>No Image</p>
                    </div>
                  )}
                  <p className="line-clamp-2 mt-5">{book?.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant={"secondary"} className="w-full">
                    <Link href={`/books/${book?.id}`}>Read Reviews</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
