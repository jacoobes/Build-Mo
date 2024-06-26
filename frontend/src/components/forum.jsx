import React from 'react'
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.jsx'
import { PlusIcon } from '@radix-ui/react-icons'

const ForumPage = () => {
    const [posts, setPosts] = React.useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    React.useEffect(() => {
        fetch("/api/posts")
        .then(res => res.json())
        .then((posts) => {
            setPosts(posts)
        })
        .catch(console.error)
    }, [])
    const handleSubmit = (post) => {
       if(!user) {
           navigate("/login");    
       } else {
           navigate("/post-create");
       }
    }
    const onClickCard = (card) => {
        navigate("/posts/"+card._id)
    }
  return (
    <div className="container mx-auto py-8">
      <Button onClick={handleSubmit}><PlusIcon/></Button>
      {posts.map(post => 
            (<Card key={post._id} className="hover:bg-border bg-card" onClick={() => onClickCard(post)}>
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title ?? "fix me"}</CardTitle>
                  <p className="text-secondary text-sm mt-4 ">{post.userId.username ?? "??"}</p>
                </CardHeader>
                <CardContent className="flex flex-row space-x-4">
                    {post.pictures.length && <img src={"/api/"+post.pictures[0]}/>}
                    <div className="flex mb-4">
                        <span>{post.text}</span>
                    </div>
                </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default ForumPage;
