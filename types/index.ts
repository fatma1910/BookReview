export interface BookProp {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    image: string;
}


export interface BookListProps {
    id: number ;
    title: string;
    author: string;
    genre: string;
    description: string;
    imagePublicId: string | null;
    imageUrl: string | null;
  }

export interface ReviewProps {
    name: string;
    id: number;
    review: string;
    rate: string;
    budgetId: number | null;
  }
  