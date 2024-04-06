import React from 'react'
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
const fakePosts = [
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7a',
    title: 'Beach Day',
    id: 1,
    text: 'Had a great time at the beach today! #summervibes',
    pictures: [
      'https://picsum.photos/250',
    ]
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7b',
    title: 'Book Recommendation',
    id: 2,
    text: 'Just finished reading a fascinating book. Highly recommend it!',
    pictures: ['https://picsum.photos/200/300']
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7c',
    title: 'New Recipe',
    id: 3,
    text: 'Trying out a new recipe for dinner tonight. Wish me luck!',
    pictures: []
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7a',
    title: 'Morning Hike',
    id: 4,
    text: 'Had an amazing hike this morning. Nature is truly beautiful.',
    pictures: [
      'https://picsum.photos/200',
    ]
  }
];
const ForumPage = () => {
    const [posts, setPosts] = React.useState([]);
    const [usr] = useLocalStorage("user", null);
    const navigate = useNavigate();
    React.useEffect(() => {
        (async () => {
            setPosts(fakePosts)

        })()
    })
    const handleSubmit = (post) => {
         console.log(post)
       if(!usr?.id) {
           navigate("/login");    
       } else {
           
       }
    }
    const onClickCard = (card) => {
        navigate("/forums/"+card.id)
    }
  return (
    <div className="container mx-auto py-8">
      <Card className="card mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Post Title" className="mb-4" onChange={(e) => console.log(e) } />
          {/* <Textarea placeholder="Post Content" rows={5} className="mb-4" /> */}
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
      {posts.map(post => 
            (<Card className="hover:bg-border bg-card" onClick={() => onClickCard(post)}>
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title ?? "fix me"}</CardTitle>
                  <p className="text-secondary text-sm mt-4 ">{post.user ?? "Leroy"}</p>
                </CardHeader>
                <CardContent className="flex flex-row space-x-4">
                    {post.pictures.length  && <img src={post.pictures[0]}/>}
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
