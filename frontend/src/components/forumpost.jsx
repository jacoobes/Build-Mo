import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/hooks/useAuth';

const Post = () => {
  const { postId } = useParams();
  const nav = useNavigate();
  const { user } = useAuth()
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([
    {
      id: 1,
      userId: '642a9b9c8e6b9f0d2c8d6e7a',
      content: 'This is a great book recommendation!',
      createdAt: '2023-04-05T12:00:00.000Z',
    },
    {
      id: 2,
      userId: '642a9b9c8e6b9f0d2c8d6e7b',
      content: "I've been meaning to read this book, thanks for the recommendation!",
      createdAt: '2023-04-05T12:30:00.000Z',
    },
  ]);

  const submitComment = (e) => {
    e.preventDefault();
    setComment("");
  }
  useEffect(() => {
      if(Number.isNaN(Number.parseInt(postId))) {
        nav("/")
      } else {
        fetch("/api/posts/"+forumId)
        .then(setPost)
        .catch(() => console.error("shit went bad"))
      }
  },[]);
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{post.title}</h2>
          </div>
          <div className="mt-4">
            <p>{post.text}</p>
          </div>
          <div className="mt-4">
            <Carousel>
              <CarouselContent>
                {post.pictures.map((picture, index) => 
                (<CarouselItem>
                    <img key={index} src={picture} alt={`Picture ${index}`} className="mb-4" />
                </CarouselItem>))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="mt-4 text-gray-500">
            <span>Posted by User {post.userId}</span>
          </div>
        </div>
        <div className="shadow-md p-6">
          <form onSubmit={submitComment}>
              <div className="flex w-full items-center space-x-2">
                <Input name="query" placeholder="Add response" value={comment} onChange={e => setComment(e.target.value)}/>
                <Button type="submit">
                    <PaperPlaneIcon/>
                </Button>
              </div>
          </form>
        </div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <Link href={`/user/${comment.userId}`} className="text-blue-500 hover:text-blue-700">
                  User {comment.userId}
                </Link>
                <span className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))}      
      </div>
    </div>
  );
}

export default Post
