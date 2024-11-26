"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea";
interface CreateBudgetProps {
    refreshData: () => void;
}

const NewBookForm = ({ refreshData }:CreateBudgetProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.error("Image file is missing");
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(image);
  
    reader.onloadend = async () => {
      const imageData = reader.result;
  

      const response = await fetch("/api/CreateBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          genre,
          description,
          file: imageData,
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to create book");
        return;
      }
      const responseBody = await response.json();
  
      console.log("Book added successfully");

        refreshData();
        router.push(`/books/${responseBody.id}`)
    };
  };
  
  

  return (
    <Dialog >
          <DialogTrigger asChild>
            <Button >Add Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new book</DialogTitle>
              <DialogDescription>
                if you didn&apos;t find a book you&apos;re looking for, add one here.
              </DialogDescription>
            </DialogHeader>
            <form
            onSubmit={handleSubmit}
            className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                name='title'
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
                />
              </div>
              <div >
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                name='author'
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div>
                <Label htmlFor="isbn" className="text-right">
                    Genre
                </Label>
                <Input
                name='genre'
                  id="genre"
                  value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div >
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input 
                name="file" 
                id="picture" 
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)
                }
                required
                />
                </div>
            <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
    </Dialog>
  );
};

export default NewBookForm;
