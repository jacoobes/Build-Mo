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
    text: 'Had a great time at the beach today! #summervibes',
    pictures: [
      'https://picsum.photos/400',
    ]
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7b',
    title: 'Book Recommendation',
    text: 'Just finished reading a fascinating book. Highly recommend it!',
    pictures: ['https://picsum.photos/200/300']
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7c',
    title: 'New Recipe',
    text: 'Trying out a new recipe for dinner tonight. Wish me luck!',
    pictures: []
  },
  {
    userId: '642a9b9c8e6b9f0d2c8d6e7a',
    title: 'Morning Hike',
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

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
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
            (<Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title ?? "fix me"}</CardTitle>
                  <p className="text-sm">{post.user ?? "Leroy"}</p>
                </CardHeader>
                <CardContent>
                    {post.pictures.length 
                        ? <img src={post.pictures[0]}/>
                        : "" }
                    <div className="flex items-center mb-4">  
                        <div>
                            
                        </div>
                    </div>
                    <Button variant="secondary">Comment</Button>
                </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default ForumPage;
