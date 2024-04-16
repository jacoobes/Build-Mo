import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
const ForumForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [pictures, setPictures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      console.log(formData)

/** The append() method of the FormData interface appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
 * The difference between FormData.set and append() is that if the specified key already exists, FormData.set will overwrite all existing values with the new one,
 * whereas append() will append the new value onto the end of the existing set of values.
 **/
      pictures.forEach((picture) => {
        formData.append(`pictures`, picture);
      });
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
        // Reset the form fields
        setTitle('');
        setText('');
        setPictures([]);
      } else {
        throw new Error('Error creating post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPictures(files);
  };

  return (
        <form onSubmit={handleSubmit} className="rounded-lg" encType="multipart/form-data">
            <Card>
              <CardHeader>
                  <div className="mb-4">
                    <Label htmlFor="title" className="block font-bold mb-2 text-xl">
                      Title
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full" />
                  </div>
              </CardHeader>
              <CardContent> 
              <div className="mb-4">
                <Label htmlFor="text" className="block font-bold mb-2 text-xl">
                  Text
                </Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="w-full h-32 border rounded-md p-2 focus:outline-none focus:ring-2"
                ></Textarea>
              </div>
              <div className="mb-4">
                <Label htmlFor="pictures" className="block font-bold mb-2">
                  Pictures
                </Label>
                <Input
                  type="file"
                  id="pictures"
                  multiple
                  onChange={handlePictureUpload}/>
                    <div className="flex flex-wrap">
                      {pictures.map((picture, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(picture)}
                          alt={`Picture ${index}`}
                          className="w-32 h-32 object-cover m-2" />
                      ))}
                    </div>
              </div>
                  <Button type="submit">
                    Submit
                  </Button>
              </CardContent>
        </Card>
    </form>
  );
};

export default ForumForm;
