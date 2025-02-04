'use client'
import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmit(true);

        if(!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok){
                router.push('/')
            }
        } catch (error){
            console.log(error);
        } finally{
            setSubmit(false);
        }
    }

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({ 
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId){getPromptDetails()};
    }, [promptId])

  return (
    <Form 
    type='Edit'
    post={post}
    setPost={setPost}
    submit={submit}
    handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt;