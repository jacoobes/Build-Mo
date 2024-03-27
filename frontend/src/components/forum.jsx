import React from 'react'
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
const ForumPage = () => {
    const [posts, setPosts] = React.useState([]);
    const [usr] = useLocalStorage("user", null);
    const navigate = useNavigate();
    if(false) {
        React.useEffect(() => {
            fetch("myshi")
                .then(res => res.json())
                .then(setPosts)
                .catch(console.error)
        })
    }
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
                  <CardTitle className="text-xl">{post.name ?? "fix me"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content ?? "lorem ipsum"}</p>
                </CardContent>
                <CardContent>
                  <Button variant="secondary">Comment</Button>
                </CardContent>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div>
                      <p className="">{post.user ?? "Leroy"}</p>
                      <p>{"Comments"}</p>
                    </div>
                  </div>
                </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default ForumPage;
