'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Review } from "../../../../pages/api/schema"
import { db } from "../../../../pages/api/dpConfig"
import { useUser } from "@clerk/nextjs"


const initialReview = {
    name: '', rating: 5, review: '' 
}

interface CreateReviewProps {
  refreshData: () => void;
}


const PostReview = ({bookId ,refreshData}: {bookId:number , refreshData: () => void}) => {
    const [newReview, setNewReview] = useState(initialReview);
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const { user } = useUser();
    

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        const result = await db
          .insert(Review)
          .values({
            name: newReview.name,
            rate: newReview.rating.toString(), 
            review: newReview.review,
            budgetId: bookId,
          })
          .returning({ insertedId: Review.id });
    
        if (result) {
          refreshData();
          setNewReview(initialReview);
          toast({
            title: "Your review has been posted",
            description: "Thank you for your feedback!",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong!",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error inserting review:", error);
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit}  
        className="w-full"
        >
            <h4 className="text-xl font-semibold mb-4">Add a Review</h4>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user">Name</Label>
                  <Input
                    id="user"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={newReview.rating || ''}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  required
                />
              </div>
              <Button disabled={loading} type="submit" className="flex items-center gap-2">
                {loading? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ):null}
                Submit Review </Button>
            </div>
          </form>
    </div>
  )
}

export default PostReview